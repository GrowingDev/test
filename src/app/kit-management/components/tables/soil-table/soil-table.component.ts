import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { CustomSensorService } from 'src/app/kit-management/services/custom-sensor.service';
import { AddNewSensorDialogComponent } from '../../add-new-sensor-dialog/add-new-sensor-dialog.component';
import { AddSensorMeasurementDialogComponent } from '../../add-sensor-measurement-dialog/add-sensor-measurement-dialog.component';
import { SensorMenuDialogComponent } from '../../sensor-menu-dialog/sensor-menu-dialog.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-soil-table',
  templateUrl: './soil-table.component.html',
  styleUrls: ['./soil-table.component.scss'],
})
export class SoilTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;
  @Input() kitID!: string;
  selectedSensor?: string;
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'Moist' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'Temp' },
  ];
  displayedColumns: string[] = ['position', 'symbol', 'name', 'weight', 'star'];
  dataSource = [...this.ELEMENT_DATA];

  constructor(
    private customSensorService: CustomSensorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customSensorService
      .getCustomSensors(this.kitID)
      .subscribe((data) => console.log(data));
  }

  addData() {
    const randomElementIndex = Math.floor(
      Math.random() * this.ELEMENT_DATA.length
    );
    this.dataSource.push(this.ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
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
  }
  openAddSensorMeasurementDialog(): void {
    this.dialog.open(AddSensorMeasurementDialogComponent,{ data: {kitID: this.kitID, sensorName: this.selectedSensor} });
  }
  showSensorHistory(): void {}
}
