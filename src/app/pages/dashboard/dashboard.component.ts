
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  CurrentBudget: any;
  MonthlyExpenses: any;
  GoalsProgress: any;
  today = new Date();
  userExpenses: { [userId: number]: any[] } = {};
  userCurrentBudget: { [userId: number]: any[] } = {};
  years: number[] = [2022, 2023, 2024];
  months: { value: number, label: string }[] = [
    { value: 1, label: 'GEN' },
    { value: 2, label: 'FEB' },
    { value: 3, label: 'MAR' },
    { value: 4, label: 'APR' },
    { value: 5, label: 'MAG' },
    { value: 6, label: 'GIU' },
    { value: 7, label: 'LUG' },
    { value: 8, label: 'AGO' },
    { value: 9, label: 'SET' },
    { value: 10, label: 'OTT' },
    { value: 11, label: 'NOV' },
    { value: 12, label: 'DIC' }
  ];
  userSelections: { [userId: number]: { year: number, month: number } } = {};

  constructor(private pekuService: PekuService, public utils: UtilsService) {
    this.utils.users = [{ nome: "Baz", id: 1 }, { nome: "Cla", id: 2 }];

   }

  ngOnInit(): void {
    this.initializeUserSelections();
    this.loadDashboardData();
    this.utils.users.forEach(user => {
      this.updateUserBudget(user.id);
    }
    );
  }

  initializeUserSelections(): void {
    this.utils.users.forEach(user => {
      this.userSelections[user.id] = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      };
    });
  }

  onYearChange(userId: number): void {
    this.updateUserBudget(userId);
  }

  onMonthChange(userId: number): void {
    this.updateUserBudget(userId);
  }

  updateUserBudget(userId: number): void {
    const { year, month } = this.userSelections[userId];
    this.RetriveBudgetByUser(userId, year, month);
    this.AllocateBudgetByUser(userId, year, month);
    this.monthlyExpenses(userId, year, month);
  }

  loadDashboardData(): void {
    this.goalsProgress();
  }

  RetriveBudgetByUser(id: number, year: number, month: number): void {
    this.pekuService.getBudgetsByUser(id, year, month).subscribe(
      data => {
        this.userCurrentBudget[id] = data;
        console.log("Current Budget", data);
      },
      error => {
        console.error("Error fetching Current Budget", error);
      }
    );
  }

  AllocateBudgetByUser(userId: number, year: number, month: number): void {
    const obj = { year: year, month: month, user: userId };
    this.pekuService.postAMIBudgets(obj).subscribe(
      data => {
        this.userExpenses[userId] = data;
        console.log(`Monthly Expenses for User ${userId}`, data);
      },
      error => {
        console.error(`Error fetching Monthly Expenses for User ${userId}`, error);
      }
    );
  }

  monthlyExpenses(userId: number, year: number, month: number): void {
    this.pekuService.getMETransaction(year, month, userId).subscribe(
      data => {
        this.userExpenses[userId] = data;
        console.log(`Monthly Expenses for User ${userId}`, data);
      },
      error => {
        console.error(`Error fetching Monthly Expenses for User ${userId}`, error);
      }
    );
  }

  goalsProgress(): void {
    this.pekuService.getGoals().subscribe(
      data => {
        this.GoalsProgress = data;
        console.log("Goals Progress", data);
      },
      error => {
        console.error("Error fetching Goals Progress", error);
      }
    );
  }

  getColorClasses(item: number): any {
    return {
      [`text-${this.utils.getCategoryColor(item)}-emphasis`]: !!item,
      [`bg-${this.utils.getCategoryColor(item)}-subtle`]: !!item,
      [`border-${this.utils.getCategoryColor(item)}-subtle`]: !!item,
    };
  }

  getProgressPercentage(currentAmount: number, targetAmount: number): number {
    if (targetAmount === 0) {
      return 0; // Evitare la divisione per zero
    }
    const percentage = (currentAmount / targetAmount) * 100;
    return Math.round(percentage); // Limita il valore massimo a 100%
  }
}
