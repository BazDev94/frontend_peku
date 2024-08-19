import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";

import { BudgetComponent } from './components/budget/budget.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReportsComponent } from './components/reports/reports.component';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
const COMPONENTS = [
  AppComponent,
  BudgetComponent,
  TransactionsComponent,
  SidenavComponent,
  ReportsComponent,
  HomeComponent,
  DashboardComponent,
  FooterComponent,
  HeaderComponent,
  SidenavComponent,
]


@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
