import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FilteringComponent } from './filtering/filtering.component';
import { SortingComponent, } from './sorting/sorting.component';
import { SmsSendComponent } from "./SmsSend/sms-send.component";
import { CongeComponent } from './conge/filtering.component';
import { MatTableModule } from '@angular/material/table' 
import { activateholiadayslist } from "src/app/services/activateholiadayslist";

import { AuthActivateHolidaysGuard } from 'src/app/services/canActivateHolidays.guard';

export const routes = [
  { path: '', redirectTo: 'datepicker', pathMatch: 'full'},
  { path: 'datepicker', canActivate:[AuthActivateHolidaysGuard], component: DatepickerComponent, data: { breadcrumb: 'Datepicker' } },
  { path: 'Holidays-list',canActivate:[AuthActivateHolidaysGuard] , component: CongeComponent, data: { breadcrumb: 'Holidays list' } },
  { path: 'liste-maintenance', component: SortingComponent, data: { breadcrumb: 'Sorting table' } },
 //{ path: 'Envoie-sms',, component: SmsSendComponent, data: { breadcrumb: 'Envoie Des SmS' } },
  { path: 'holidays-requests-list',canActivate:[activateholiadayslist], component: FilteringComponent, data: { breadcrumb: 'holidays requests list' } },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SharedModule,
    MatTableModule
  ],
  declarations: [
    DatepickerComponent, 
    FormFieldComponent, 
    FilteringComponent,
    SmsSendComponent,
    CongeComponent
  ]
})
export class FormControlsModule { }