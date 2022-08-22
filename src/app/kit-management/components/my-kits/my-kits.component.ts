import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { KitData } from '../../models/kit-data.model';
import { LoadingState } from '../../models/LoadingState';
import { KitService } from '../../services/kit.service';
import { AddNewKitDialogComponent } from '../add-new-kit-dialog/add-new-kit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-kits',
  templateUrl: './my-kits.component.html',
  styleUrls: ['./my-kits.component.scss'],
})
export class MyKitsComponent implements OnInit {
  dataLoadingState = LoadingState.Loading;
  readonly loadingState = LoadingState;
  myKits: KitData[] = [];
  constructor(private kitService: KitService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.kitService
      .getMyKits()
      .pipe(delay(300))
      .subscribe({
        next: (kits) => {
          this.myKits = kits;
          this.dataLoadingState = LoadingState.Success;
        },
        error: () => {
          this.dataLoadingState = LoadingState.Error;
        },
      });
  }

  openAddKNewKitDialog(): void {
    const dialogRef = this.dialog.open(AddNewKitDialogComponent);
    dialogRef
      .afterClosed()
      .subscribe((data) => (data ? this.myKits.push(data) : null));
  }
}
