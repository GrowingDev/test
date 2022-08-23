import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { CustomSensorData } from 'src/app/kit-management/models/custom-sensor.-data.model';

import { CustomSensorService } from 'src/app/kit-management/services/custom-sensor.service';
import { SensorService } from 'src/app/kit-management/services/sensor.service';
import { AddCustomSensorOarametersDialogComponent } from '../../add-custom-sensor-oarameters-dialog/add-custom-sensor-oarameters-dialog.component';
import { AddSensorMeasurementDialogComponent } from '../../add-sensor-measurement-dialog/add-sensor-measurement-dialog.component';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<CustomSensorData>;
  @Input() kitID!: string;
  readonly dataSource = new MatTableDataSource<CustomSensorData>();
  ELEMENT_DATA: CustomSensorData[] = [];
  displayedColumns: string[] = [
    'name',
    'value',
    'min',
    'max',
    'description',
    'timestamp',
    'star',
  ];

  selectedSensor?: string;
  dataToDisplay = [...this.ELEMENT_DATA];

  constructor(
    private sensorService: SensorService,
    private customSensorService: CustomSensorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const sensors$ = this.customSensorService.getCustomSensors(this.kitID);
    const sensorData$ = this.customSensorService.getCustomSensorsData(
      this.kitID
    );
    const paramaters$ = this.sensorService.getAllKitParameters(this.kitID);
    combineLatest([sensors$, sensorData$, paramaters$]).subscribe({
      next: ([sensors, sensorsData, parameters]) => {
        let newList: CustomSensorData[] = [];
        sensors.map((sensor) => {
  
          let entry: CustomSensorData = {
            name: sensor.name,
            timestamp: this.findTimeStamp(sensorsData, sensor.name),
            value: this.findValue(sensorsData, sensor.name),
            min: this.findMin(parameters, sensor.name),
            max: this.findMax(parameters, sensor.name),
            description: 'No Description found',
          };
          newList.push(entry);
        });

        this.dataSource.data = newList;
      },
      error: (error) => console.log(error),
    });
  }

  findValue(sensors: any[], name: string): number {
    const data = sensors.find((sensor) => {
      return sensor.name === name;
    });

    if (data) {
      return data.value;
    } else {
      return 0;
    }
  }
  findTimeStamp(sensors: any[], name: string): string {
    const data = sensors.find((sensor) => {
      return sensor.name === name;
    });

    if (data) {
      return data.timestamp;
    } else {
      return "";
    }
  }
  findMin(parameters: any[], name: string): string {
    console.log(parameters);
    const data = parameters.find((parameter) => {
      return parameter.sensor === name;
    });

    if (data) {
      return data.min;
    } else {
      return '0';
    }
  }
  findMax(parameters: any[], name: string): string {
    console.log(parameters);
    const data = parameters.find((parameter) => {
      return parameter.sensor === name;
    });

    if (data) {
      return data.max;
    } else {
      return '0';
    }
  }
  setSensorName(sensorName: string): void {
    this.selectedSensor = sensorName;
  }

  openAddCustomSensorParametersDialog(): void {
    const ref = this.dialog.open(AddCustomSensorOarametersDialogComponent, {
      data: { kitID: this.kitID, sensorName: this.selectedSensor },
    });
    ref.afterClosed().subscribe({
      next: () => {
        this.loadData();
      },
    });
  }
  openAddCustomSensorMeasurementDialog(): void {
    const ref = this.dialog.open(AddSensorMeasurementDialogComponent, {
      data: { kitID: this.kitID, sensorName: this.selectedSensor },
    });
    ref.afterClosed().subscribe({
      next: () => {
        this.loadData();
      },
    });
  }

  showSensorHistory(): void {}
}
