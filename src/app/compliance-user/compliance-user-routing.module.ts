import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceEditComponent } from './compliance-edit/compliance-edit.component';
import { ComplianceUsersComponent } from './compliance-users/compliance-users.component';
const routes: Routes = [
    {

        path: '',
        redirectTo: 'all',
    },
    {
        path: "all",
        component: ComplianceUsersComponent,
        
    }, {
        path: "edit/:reportId",
        component: ComplianceEditComponent,
        
    }, {
        path: "profile",
        component: ComplianceEditComponent,
       
    }, {
        path: "add",
        component: ComplianceEditComponent,
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
