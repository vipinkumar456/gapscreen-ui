import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
    {

        path: '',
        redirectTo: 'all',
    },
    {
        path: "all",
        component: UsersComponent,
        
    }, {
        path: "edit/:username",
        component: UserEditComponent,
        
    }, {
        path: "profile",
        component: UserEditComponent,
       
    }, {
        path: "add",
        component: UserEditComponent,
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
