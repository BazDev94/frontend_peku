import { Component, OnInit, ViewChild, AfterViewInit,inject, ChangeDetectorRef} from '@angular/core';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from '../../services/utils.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Transaction } from 'src/app/interfaces/utils';

import {MatSort} from '@angular/material/sort';

import {LiveAnnouncer} from '@angular/cdk/a11y';




@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})

export class TransactionsComponent implements OnInit, AfterViewInit {
  constructor(public pekuService:PekuService,public utils:UtilsService,private cdr: ChangeDetectorRef) {
   }
   private _liveAnnouncer = inject(LiveAnnouncer);

  aTransactions: any = [];
  displayedColumns: string[] = ['id','amount', 'category', 'description', 'date','azione'];
  dataSource = new MatTableDataSource<Transaction>();
  clickedRows = new Set<Transaction>();
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getAllTransactions();
    this.paginator.color = 'accent';
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'date', start: 'desc',disableClear: false }); 
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();


  }

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.pekuService.getTransactions().subscribe((res) => {
      this.dataSource.data = res; // Aggiorna solo i dati senza sostituire l'intero dataSource
     });
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
}
