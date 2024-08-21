import { Injectable } from '@angular/core';
import { Category, Transaction } from '../interfaces/utils';
import { MatDialog } from '@angular/material/dialog';
import { transition } from '@angular/animations';
import { EditTransactionComponent } from '../components/edit-transaction/edit-transaction.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  aCat: any;

  constructor(    private dialog: MatDialog,
  ) { }

  getCategoryIcon(cat: number) {
    if (this.aCat) {
      let aCat: Array<Category> = []; 
      aCat = this.aCat.filter((item: { id: number; }) => item.id === cat);

      if (aCat.length > 0) return aCat[0].icon;
      if (aCat.length == 0) return "n.a.";

    }
    return "n.a.";
  }
  getCategoryColor(cat: number) {
    if (this.aCat) {
      let aCat: Array<Category> = [];
      aCat = this.aCat.filter((item: { id: number; }) => item.id === cat);

      if (aCat.length > 0) return aCat[0].color;
      if (aCat.length == 0) return "n.a.";

    }
    return "n.a.";
  }
  getCategoryDescription(cat: number) {
    if (this.aCat) {
      let aCat: Array<Category> = [];
      aCat = this.aCat.filter((item: { id: number; }) => item.id == cat);

      if (aCat.length > 0) return aCat[0].name;
      if (aCat.length == 0) return "n.a.";

    }
    return "n.a.";
  }
  openEditDialog(transaction?: Transaction): void {
    console.log('transaction', transaction);
    if (!transaction) {
      transaction = {
        id: 0,
        name: '',
        date: Date.now().toString(),
        amount: 0,
        category: '',
        description: ''
      };
    }
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      maxWidth: '60vh',
      minWidth: '500px',
      // disableClose: false,
      // width: '400px',
      data: { ...transaction }
    });

    dialogRef.afterClosed().subscribe((result: Transaction) => {
      if (result) {
        console.log('The dialog was closed', result);
      }
    });
  }
  formatDateToYYYYMMDD(date: any): string {
    if (!(date instanceof Date)) {
      return date;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mese da 1 a 12
    const day = String(date.getDate()).padStart(2, '0'); // Giorno da 1 a 31
    return `${year}-${month}-${day}`;
  }

}
