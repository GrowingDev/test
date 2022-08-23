import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { KitData } from '../../models/kit-data.model';
import { CustomSensorService } from '../../services/custom-sensor.service';
import { KitService } from '../../services/kit.service';

@Component({
  selector: 'app-add-new-sensor-dialog',
  templateUrl: './add-new-sensor-dialog.component.html',
  styleUrls: ['./add-new-sensor-dialog.component.scss'],
})
export class AddNewSensorDialogComponent implements OnInit {
  saving = false;

  sensorNameCtrl: FormControl = new FormControl(undefined, [
    Validators.required,
  ]);

  addNewSensorForm: FormArray = new FormArray([this.sensorNameCtrl]);
  constructor(
    private customSensorService: CustomSensorService,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<AddNewSensorDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public kitID: string,
  ) {}

  ngOnInit(): void {

  }

  save(): void {
    this.addNewSensorForm.markAllAsTouched();
    if (this.addNewSensorForm.invalid) {
      return;
    }

    this.saving = true;

    this.customSensorService.addCustomSensor(this.kitID,this.sensorNameCtrl.value).subscribe({
      next: (kit) => {
        this.dialogRef.close(kit);
      },
      error: () => {
        this.saving = false;
      },
    });
  }
}
