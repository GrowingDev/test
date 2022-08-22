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
@NgModule({
  declarations: [
    KitManagementComponent,
    MyKitsComponent,
    CommunityKitsComponent,
    KitCardComponent,
    KitComponent,
    AddNewKitDialogComponent,
    ErrorMessageComponent
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
  ],
})
export class KitManagementModule {}
