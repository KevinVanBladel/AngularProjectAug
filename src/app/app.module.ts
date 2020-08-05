import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingenComponent } from './trainingen/trainingen.component';
import { TrainingComponent } from './training/training.component';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { AccountComponent } from './account/account.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { trainingService } from './services/training.service';
import { activiteitService } from './services/activiteit.service';
import { gebruikerService } from './services/gebruiker.service';
import { wedstrijdService } from './services/wedstrijd.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    TrainingenComponent,
    TrainingComponent,
    TrainingEditComponent,
    AccountComponent,
    AccountsComponent,
    AccountEditComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    trainingService,
    wedstrijdService,
    activiteitService,
    gebruikerService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
