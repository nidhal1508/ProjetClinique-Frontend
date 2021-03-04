import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './user-info/user-info.component';

export const routes = [
  {
      path: '', 
      component: ProfileComponent,
      children:[
        { path: '', redirectTo: 'user-info', pathMatch: 'full'},
        { path: 'user-info', component: UserInfoComponent, data: { breadcrumb: 'User Information' } }
      ]
  }
];

@NgModule({
  declarations: [
    ProfileComponent, 
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
