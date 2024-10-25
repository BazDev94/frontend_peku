import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IncomingMessage } from 'http';
import { Income, Transaction } from 'src/app/interfaces/utils';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit,AfterViewInit {
  constructor(public pekuService:PekuService,public utils:UtilsService,private cdr: ChangeDetectorRef) { }
  private _liveAnnouncer = inject(LiveAnnouncer);

  // tiles: any[] = [
  //   {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
  //   {text: 'Two', cols: 2, rows: 2, color: 'lightgreen'},
  //   {text: 'Three', cols: 1, rows: 1, color: 'red'},

  // ];
  tiles: { text: string; cols: number; rows: number; color: string; }[] = [];
  
  data : any = []

  aIncomes: any = [];
  displayedColumns: string[] = ['user','amount', 'description', 'source','date','azione'];
  dataSource = new MatTableDataSource<Income>();
  clickedRows = new Set<Income>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getBudgetSommary();
    this.paginator.color = 'accent';
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'date', start: 'desc',disableClear: false }); 
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.getAllBudgets();
    this.getBudgetSommary();
    this.setupTiles();
    this.getIncome() ;
  }
  
  getAllBudgets() {
    this.pekuService.getBudgets().subscribe((res) => {
      console.log("-->",res);
    });
  }

  getIncome() {
    this.pekuService.getIncome().subscribe((res) => {
      // budget_summary
      this.aIncomes = res
      console.log("-->budget_summary",res);
    });
  }

  getBudgetSommary() {
    this.pekuService.getBSBudgets(1).subscribe((res) => {
      // budget_summary
      this.data = res
      console.log("-->budget_summary",res);
    });
  }
  AllocateMonthlyIncomeBudget() {
    let yearmonth = {"year":2024,"month":1, "user":1}

    this.pekuService.postAMIBudgets(yearmonth).subscribe((res) => {
      console.log("-->allocate_monthly_incomeBudget",res);
    });
  }

  ResetBudgetMonthly(){
    const user = {"user":1}
    this.pekuService.postRMBBudgets(user).subscribe((res) => {
      console.log("-->reset_monthly_budget",res);
    }
  );
  }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: any) {
      console.log(sortState.direction);
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
  
  

  // ngOnInit(): void {
  // }


  setupTiles(): void {
    const totalAllocated = this.data.reduce((total:any, item:any):any => total + item.allocated_amount, 0);
    
    // Default values for colspan and rowspan to maintain rectangular shape
    const baseColspan = 2;
    const baseRowspan = 1;

    this.tiles = this.data.map((item: { allocated_amount: number; category_name: string; })  => {
      const percentage = (item.allocated_amount / totalAllocated) * 100;
      // Adjust the rowspan to maintain a proportional rectangular shape
      const proportionalRowspan = Math.max(1, Math.round((percentage / 100) * 2)); // Example calculation
      
      return {
        text: `${item.category_name} (${percentage.toFixed(1)}%)`,
        cols: baseColspan,
        rows: proportionalRowspan,
        color: this.getColorForCategory(item.category_name)
      };
    });
  }
  getColorForCategory(category: string): string {
    const colors: { [key: string]: string } = {
      'Necessities': '#FFCDD2',
      'Entertainment': '#C5CAE9',
      'Savings': '#C8E6C9'
    };
    return colors[category] || '#FFFFFF'; // Default color
  }



}
