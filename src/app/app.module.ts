// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule  } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// import { FooterComponent } from "./components/footer/footer.component";
// import { HeaderComponent } from "./components/header/header.component";
// import { BudgetComponent } from './components/budget/budget.component';
// import { TransactionsComponent } from './components/transactions/transactions.component';
// import { SidenavComponent } from './components/sidenav/sidenav.component';
// import { ReportsComponent } from './components/reports/reports.component';
// import { HomeComponent } from './pages/home/home.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

// import {OverlayModule} from '@angular/cdk/overlay';
// import {CdkMenuModule} from '@angular/cdk/menu';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule} from '@angular/material/table';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import {MatSort, Sort, MatSortModule} from '@angular/material/sort';


// import {
//   MatDialog,
//   MAT_DIALOG_DATA,
//   MatDialogTitle,
//   MatDialogContent,
// } from '@angular/material/dialog';

// const CDK_MODULES = [
//   CdkMenuModule,
//   OverlayModule,
// ];
// const MATERIAL_MODULES = [
//   MatMenuModule,
//   MatButtonModule,
//   MatSlideToggleModule,
//   MatTableModule,
//   MatPaginatorModule,
//   MatSort, 
//   MatSortModule,
//   MatPaginator,
//   MatDialog,
//   MAT_DIALOG_DATA,
//   MatDialogTitle,
//   MatDialogContent,
// ];
// const COMPONENTS = [
//   AppComponent,
//   BudgetComponent,
//   TransactionsComponent,
//   SidenavComponent,
//   ReportsComponent,
//   HomeComponent,
//   DashboardComponent,
//   FooterComponent,
//   HeaderComponent,
//   SidenavComponent,
// ]
// const GENERAL_MODULES = [
//   HttpClientModule,
//   BrowserModule,
//   AppRoutingModule,
//   BrowserAnimationsModule,
// ];

// @NgModule({
//   declarations: [
//     COMPONENTS,
//   ],
//   imports: [
//     ...MATERIAL_MODULES,
//     ...CDK_MODULES,
//     ...GENERAL_MODULES,
//   ],
//   providers: [
//     provideAnimationsAsync(),

//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
// export function initApp() {}
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { BudgetComponent } from './components/budget/budget.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReportsComponent } from './components/reports/reports.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';

import { MatDialogTitle,MatDialogContent } from '@angular/material/dialog';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule} from '@angular/forms';

const CDK_MODULES = [
  CdkMenuModule,
  OverlayModule,
];
const MATERIAL_MODULES = [
  MatDividerModule,
  MatGridListModule,
  MatFormFieldModule, 
  MatInputModule, 
  MatDatepickerModule,
  FormsModule, MatFormFieldModule, MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogTitle,
  MatDialogContent,
  MatCardModule,

  MatSelectModule,
  ReactiveFormsModule,
  
];
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
  EditTransactionComponent,
];
const GENERAL_MODULES = [
  HttpClientModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS, 
  ],
  imports: [
    ...MATERIAL_MODULES, 
    ...CDK_MODULES, 
    ...GENERAL_MODULES, 
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function initApp() {}
