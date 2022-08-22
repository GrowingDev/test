import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MainRoutingModule } from './main-routing.module';
import { MainWrapperComponent } from './components/main-wrapper/main-wrapper.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MainSidebarComponent } from './components/main-sidebar/main-sidebar.component';

@NgModule({
  declarations: [
    MainWrapperComponent,
    MainHeaderComponent,
    MainSidebarComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
  ],
})
export class MainModule {}
