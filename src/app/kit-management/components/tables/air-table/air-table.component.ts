import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';
import { SensorData } from 'src/app/kit-management/models/sensor-data.model';

import { SensorService } from 'src/app/kit-management/services/sensor.service';
import { AddNewSensorDialogComponent } from '../../add-new-sensor-dialog/add-new-sensor-dialog.component';
import { AddSensorMeasurementDialogComponent } from '../../add-sensor-measurement-dialog/add-sensor-measurement-dialog.component';
import { SensorMenuDialogComponent } from '../../sensor-menu-dialog/sensor-menu-dialog.component';

@Component({
  selector: 'app-air-table',
  templateUrl: './air-table.component.html',
  styleUrls: ['./air-table.component.scss'],
})
export class AirTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table!: MatTable<SensorData>;
  @Input() kitID!: string;
  source = interval(60000);
  subscription!: Subscription;
  readonly dataSource = new MatTableDataSource<SensorData>();

  ELEMENT_DATA: SensorData[] = [
    {
      id: 1,
      name: 'Hydrogen',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'NO',
    },
    { id: 2, name: 'Helium', value: 0, min: '0', max: '0', symbol: 'H2' },
    {
      id: 3,
      name: 'Lithium',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'C2H6OH',
    },
    {
      id: 4,
      name: 'Beryllium',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'C3H8',
    },
    {
      id: 5,
      name: 'Boron',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'C4H10',
    },
    { id: 6, name: 'Carbon', value: 0, min: '0', max: '0', symbol: 'CO' },
    {
      id: 7,
      name: 'Nitrogen',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'NH3',
    },
    {
      id: 8,
      name: 'Oxygen',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'CH4',
    },
    {
      id: 9,
      name: 'Fluorine',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'GBHum',
    },
    {
      id: 10,
      name: 'Neon',
      value: 0,
      min: '0',
      max: '0',
      symbol: 'GBTemp',
    },
  ];
  displayedColumns: string[] = [
    'id',
    'symbol',
    'name',
    'value',
    'min',
    'max',
    'star',
  ];

  selectedSensor?: string;
  constructor(
    private dialog: MatDialog,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    this.subscription = this.source.subscribe((val) =>
      this.getLatestSensorData()
    );

    this.getLatestSensorData();
    this.getLatestParameters();
    this.setValues();
  }

  setValues() {}
  getLatestParameters() {
    this.sensorService
      .getAllKitParameters(this.kitID)
      .subscribe((parameters) => {
        parameters.map((parameter) => {
          this.ELEMENT_DATA.map((data) => {
            if (data.symbol === parameter.sensor) {
              data.max = parameter.max;
              data.min = parameter.min;
            }
          });
        });
      });
  }

  getLatestSensorData() {
    this.sensorService.getLatestSensorData(this.kitID).subscribe({
      next: (data) => {
        console.log(data);

        for (const [key, value] of Object.entries(data)) {
          this.ELEMENT_DATA.map((sensor) => {
            if (sensor.symbol === key) {
              sensor.value = value;
            }
          });
        }
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: () => console.log(),
    });
  }

  setSensorName(sensorName: string): void {
    this.selectedSensor = sensorName;
  }
  openAddNewSensorDialog(): void {
    this.dialog.open(AddNewSensorDialogComponent, { data: this.kitID });
  }
  openSensorMenuDialog(): void {
    this.dialog.open(SensorMenuDialogComponent, {
      data: { kitID: this.kitID, sensorName: this.selectedSensor },
    });
    this.getLatestParameters();
  }
  openAddSensorMeasurementDialog(): void {
    this.dialog.open(AddSensorMeasurementDialogComponent, {
      data: { kitID: this.kitID, sensorName: this.selectedSensor },
    });
    this.getLatestSensorData();
  }

  showSensorHistory(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
