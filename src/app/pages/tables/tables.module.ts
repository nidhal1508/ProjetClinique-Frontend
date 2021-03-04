import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { SortingComponent } from './sorting/sorting.component';
import { FilteringComponent } from './filtering/filtering.component';
import { TablesService } from './tables.service';
import { SmstableComponent } from "./smstable/sms-table.component";
import { FormFieldComponent } from '../form-controls/form-field/form-field.component';
import { AuthActivateMaintGuard } from 'src/app/services/canActivateMaint.guard';
 
export const routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full'},
  { path: 'sorting', component: SortingComponent, data: { breadcrumb: 'Sorting table' } },
  { path: 'liste-maintenance', canActivate:[AuthActivateMaintGuard] ,component: SortingComponent, data: { breadcrumb: 'Sorting table' } },
  { path: 'Demande-Maintenance', component: FormFieldComponent, data: { breadcrumb: 'Form Field' } },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule
  ],
  declarations: [
    SortingComponent,  
    SmstableComponent,
    FilteringComponent
  ],
  providers: [
    TablesService
  ]
})
export class TablesModule { }
