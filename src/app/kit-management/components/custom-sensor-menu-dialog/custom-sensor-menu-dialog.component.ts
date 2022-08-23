import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SensorMenuData } from '../../models/sensor-menu-data.model';
import { SensorService } from '../../services/sensor.service';


@Component({
  selector: 'app-custom-sensor-menu-dialog',
  templateUrl: './custom-sensor-menu-dialog.component.html',
  styleUrls: ['./custom-sensor-menu-dialog.component.scss']
})
export class CustomSensorMenuDialogComponent implements OnInit {
  saving = false;

  valueCtrl: FormControl = new FormControl(undefined, [Validators.required]);

  addNewSensorForm: FormArray = new FormArray([this.valueCtrl]);
  constructor(
    private sensorService: SensorService,
    private dialogRef: MatDialogRef<CustomSensorMenuDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: SensorMenuData
  ) {}

  ngOnInit(): void {}

  save(): void {
    this.addNewSensorForm.markAllAsTouched();
    if (this.addNewSensorForm.invalid) {
      return;
    }

    this.saving = true;

    this.sensorService
      .addSensorMeasurement(
        this.data.kitID,
        this.data.sensorName,
        this.valueCtrl.value
      )
      .subscribe({
        next: (kit) => {
          this.dialogRef.close(kit);
        },
        error: () => {
          this.saving = false;
        },
      });
  }
}
