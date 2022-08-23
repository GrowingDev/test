import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitManagementRoutingModule } from './kit-management-routing.module';
import { KitManagementComponent } from './components/kit-management/kit-management.component';
import { MyKitsComponent } from './components/my-kits/my-kits.component';
import { CommunityKitsComponent } from './components/community-kits/community-kits.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { KitCardComponent } from './components/kit-card/kit-card.component';
import { MatCardModule } from '@angular/material/card';
import { KitComponent } from './components/kit/kit.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddNewKitDialogComponent } from './components/add-new-kit-dialog/add-new-kit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { AirTableComponent } from './components/tables/air-table/air-table.component';
import { WaterTableComponent } from './components/tables/water-table/water-table.component';
import { SoilTableComponent } from './components/tables/soil-table/soil-table.component';
import { CustomTableComponent } from './components/tables/custom-table/custom-table.component';
import {MatTableModule} from '@angular/material/table';
import { AddNewSensorDialogComponent } from './components/add-new-sensor-dialog/add-new-sensor-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import { CustomSensorMenuDialogComponent } from './components/custom-sensor-menu-dialog/custom-sensor-menu-dialog.component';
import { SensorMenuDialogComponent } from './components/sensor-menu-dialog/sensor-menu-dialog.component';
import { AddSensorMeasurementDialogComponent } from './components/add-sensor-measurement-dialog/add-sensor-measurement-dialog.component';
import { AddCustomSensorOarametersDialogComponent } from './components/add-custom-sensor-oarameters-dialog/add-custom-sensor-oarameters-dialog.component';
@NgModule({
  declarations: [
    KitManagementComponent,
    MyKitsComponent,
    CommunityKitsComponent,
    KitCardComponent,
    KitComponent,
    AddNewKitDialogComponent,
    ErrorMessageComponent,
    AirTableComponent,
    WaterTableComponent,
    SoilTableComponent,
    CustomTableComponent,
    AddNewSensorDialogComponent,
    CustomSensorMenuDialogComponent,
    SensorMenuDialogComponent,
    AddSensorMeasurementDialogComponent,
    AddCustomSensorOarametersDialogComponent
  ],
  imports: [
    CommonModule,
    KitManagementRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule

  ],
})
export class KitManagementModule {}
