import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from '../components/home/home.component';
import {LoginComponent} from '../components/login/login.component';
import {AccountComponent} from '../components/account/account.component'
import { UserListComponent } from '../components/user-list/user-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path: 'account', component: AccountComponent},
  {path: 'users', component: UserListComponent},
  // {path: 'login/user/:id', component: LoginComponent}, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
