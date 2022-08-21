import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitManagementRoutingModule } from './kit-management-routing.module';
import { KitManagementComponent } from './components/kit-management/kit-management.component';

@NgModule({
  declarations: [
    KitManagementComponent
  ],
  imports: [
    CommonModule,
    KitManagementRoutingModule
  ]
})
export class KitManagementModule { }
