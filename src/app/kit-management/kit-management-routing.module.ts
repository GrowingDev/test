import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityKitsComponent } from './components/community-kits/community-kits.component';
import { KitManagementComponent } from './components/kit-management/kit-management.component';
import { KitComponent } from './components/kit/kit.component';
import { MyKitsComponent } from './components/my-kits/my-kits.component';

const routes: Routes = [
  {
    path: '',
    component: KitManagementComponent,
    children: [
      { path: 'my-kits', component: MyKitsComponent},
      { path: 'community-kits', component: CommunityKitsComponent },
      { path: 'kit/:id', component: KitComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitManagementRoutingModule {}
