import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { KitData } from '../../models/kit-data.model';
import { KitService } from '../../services/kit.service';

@Component({
  selector: 'app-add-new-kit-dialog',
  templateUrl: './add-new-kit-dialog.component.html',
  styleUrls: ['./add-new-kit-dialog.component.scss'],
})
export class AddNewKitDialogComponent implements OnInit {
  saving = false;
  kitIDCtrl: FormControl = new FormControl(undefined, [Validators.required]);
  kitNameCtrl: FormControl = new FormControl(undefined, [Validators.required]);
  kitLocationCtrl: FormControl = new FormControl(undefined, [
    Validators.required,
  ]);
  addNewKitForm: FormArray = new FormArray([
    this.kitIDCtrl,
    this.kitNameCtrl,
    this.kitLocationCtrl,
  ]);
  constructor(
    private kitService: KitService,
    private dialogRef: MatDialogRef<AddNewKitDialogComponent>
  ) {}

  ngOnInit(): void {}

  save(): void {
    this.addNewKitForm.markAllAsTouched();
    if (this.addNewKitForm.invalid) {
      return;
    }

    this.saving = true;

    const newKit: KitData = {
      kitID: this.kitIDCtrl.value,
      userID: '1001',
      kitName: this.kitNameCtrl.value,
      Location: this.kitLocationCtrl.value,
    };
    this.kitService.addNewKit(newKit).subscribe({
      next: (kit) => {
        this.dialogRef.close(kit);
      },
      error: () => {
        this.saving = false;
      },
    });
  }
}
