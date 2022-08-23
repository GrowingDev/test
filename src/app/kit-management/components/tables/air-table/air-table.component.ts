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
  selector: 'app-air-table',
  templateUrl: './air-table.component.html',
  styleUrls: ['./air-table.component.scss'],
})
export class AirTableComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;
  @Input() kitID!: string;

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'NO' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'H2' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'C2H6OH' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'C3H8' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'C4H10' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'CO' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'NH3' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'CH4' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'GBHum' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'GBTemp' },
  ];
  displayedColumns: string[] = ['position', 'symbol', 'name', 'weight', 'star'];
  dataSource = [...this.ELEMENT_DATA];
  selectedSensor?: string;
  constructor(private customSensorService: CustomSensorService,  private dialog: MatDialog ) {}

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
    this.dialog.open(AddNewSensorDialogComponent,{ data: this.kitID });
  }
  openSensorMenuDialog(): void {
    this.dialog.open(SensorMenuDialogComponent,{ data: {kitID: this.kitID, sensorName: this.selectedSensor} });
  }
  openAddSensorMeasurementDialog(): void {
    this.dialog.open(AddSensorMeasurementDialogComponent,{ data: {kitID: this.kitID, sensorName: this.selectedSensor} });
  }

  showSensorHistory(): void {}
}
