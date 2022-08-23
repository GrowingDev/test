import { Component, OnInit } from '@angular/core';
import { KitData } from '../../models/kit-data.model';
import { LoadingState } from '../../models/LoadingState';
import { SensorService } from '../../services/sensor.service';
import { KitService } from '../../services/kit.service';
import { ActivatedRoute } from '@angular/router';
import { AddNewSensorDialogComponent } from '../add-new-sensor-dialog/add-new-sensor-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.scss'],
})
export class KitComponent implements OnInit {
  kit?: KitData;
  kitID?: any;
  dataLoadingState = LoadingState.Loading;
  readonly loadingState = LoadingState;

  constructor(
    private sensorService: SensorService,
    private kitService: KitService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.kitID = params.get('id');
      console.log(this.kitID);
    });

    this.kitService.selectedKit.subscribe({
      next: (kit) => {
        this.kit = kit;
  
        this.dataLoadingState = LoadingState.Success;
      },
      error: () => {
        console.log('an error occured');
        this.dataLoadingState = LoadingState.Error;
      },
    });
    this.sensorService.getLatestSensorData(this.kitID).subscribe({
      next: (sensors) => {
        console.log(sensors);
      },
      error: () => console.log(),
    });
  }

  openAddNewCustomSensorDialog(): void {
    this.dialog.open(AddNewSensorDialogComponent, { data: this.kitID });
  }
}
