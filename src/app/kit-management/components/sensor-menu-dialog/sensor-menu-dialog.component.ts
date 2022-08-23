import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SensorMenuData } from '../../models/sensor-menu-data.model';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-sensor-menu-dialog',
  templateUrl: './sensor-menu-dialog.component.html',
  styleUrls: ['./sensor-menu-dialog.component.scss'],
})
export class SensorMenuDialogComponent implements OnInit {
  saving = false;
  kitID!: any;
  minCtrl: FormControl = new FormControl(undefined, [Validators.required]);
  maxCtrl: FormControl = new FormControl(undefined, [Validators.required]);
  addParameterForm: FormArray = new FormArray([this.minCtrl, this.maxCtrl]);
  constructor(
    private sensorService: SensorService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<SensorMenuDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: SensorMenuData
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.kitID = params.get('id');

    });
  }

  save(): void {
    this.addParameterForm.markAllAsTouched();
    if (this.addParameterForm.invalid) {
      return;
    }

    this.saving = true;

    this.sensorService
      .addSensorParameter(this.data.kitID,this.data.sensorName, this.minCtrl.value,this.maxCtrl.value)
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          this.saving = false;
        },
      });
  }
}
