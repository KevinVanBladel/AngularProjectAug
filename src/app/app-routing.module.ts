import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training/training.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { AccountComponent } from './account/account.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { TrainingenComponent } from './trainingen/trainingen.component';

const routes: Routes = [
  { path: '', redirectTo: "/training", pathMatch: 'full' },
  { path: 'training', component: TrainingComponent},
  { path: 'trainingen', component: TrainingenComponent },
  { path: 'training/:id', component: TrainingEditComponent },
  { path: 'account', component: AccountComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/:id', component: AccountEditComponent},
  { path: '**', redirectTo: 'training' } //invalid path goes to training
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
