import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { AccountComponent } from './account/account.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { TrainingenComponent } from './trainingen/trainingen.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'training', component: TrainingComponent},
  { path: 'trainingen', component: TrainingenComponent },
  { path: 'add', component: TrainingEditComponent },
  { path: 'training/edit/:id', component: TrainingEditComponent },
  { path: 'account', component: AccountComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/:id', component: AccountEditComponent},
  { path: '**', redirectTo: 'home' } //invalid path goes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
