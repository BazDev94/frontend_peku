import { Component, OnInit } from '@angular/core';
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
  constructor(private pekuService: PekuService,public utils:UtilsService) { }

  ngOnInit(): void {
    // this.today = new Date();

    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.currentBudget();
    this.monthlyExpenses();
    this.goalsProgress();
  }

  getBudgetAmountByCategory(categoryId: number, field: string): number {
    const budget = this.CurrentBudget?.find((b: any) => b.category === categoryId);
    return budget ? parseFloat(budget[field]) : 0;
  }

  currentBudget(): void {
    this.pekuService.getBudgets().subscribe(
      data => {
        this.CurrentBudget =  data;
        console.log("Current Budget",  data);
      },
      error => {
        console.error("Error fetching Current Budget", error);
      }
    );
  }

  monthlyExpenses(): void {
    const year = this.today.getFullYear();
    const month = this.today.getMonth() + 1;
    this.pekuService.getMETransaction(year,month).subscribe(
      data => {
        this.MonthlyExpenses = data;
        console.log("Monthly Expenses",  data);
      },
      error => {
        console.error("Error fetching Monthly Expenses", error);
      }
    );
  }

  goalsProgress(): void {
    this.pekuService.getGoals().subscribe(
      data => {
        this.GoalsProgress =  data;
        console.log("Goals Progress",  data);
      },
      error => {
        console.error("Error fetching Goals Progress", error);
      }
    );
  }

  getColorClasses(item: number): any {
    console.log("color", item);  
    // let classcolor :      [`text-${item}-emphasis`]: !!item,    [`bg-${item}-subtle`]: !!item,    [`border-${item}-subtle`]: !!item,
    console.log("color", !!item);
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
