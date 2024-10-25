import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { error } from 'console';
import { Transaction } from 'src/app/interfaces/utils';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent implements OnInit {
  obj: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any
,  public dialogRef: MatDialogRef<EditTransactionComponent>
,  public pekuService: PekuService
, public utils: UtilsService

  ) {
    console.log("dato dal service ...", data);

    if(data.editMode === 'income'){
      this.obj = data.income;
    }else if(data.editMode === 'transaction'){
      this.obj = data.transaction;
    }
    // this.data = data;
    console.log("dato dal service ...", this.data);
   }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  Save(data:Transaction): void {
    console.log("data",data.id);
    data.date = this.utils.formatDateToYYYYMMDD(data.date);
    if(!data.id){
      this.Add(data);
      // this.dialogRef.close();
    }
    else{
      this.Update(data);
      // this.dialogRef.close();
    }
 }

  Delete(data:Transaction){
    this.pekuService.deleteTransactions(data).subscribe((res) => {
      console.log(res);
      alert(`Il valore è stato eliminato.`);
      this.dialogRef.close();
    }
    );
  }

  Add(data:Transaction){
    this.pekuService.postTransactions(data).subscribe((res) => {
      // alert(`Il valore è stato aggiornato.`);
    }
    , error => {
      console.log("__>",error);

      alert(`Errore :.`+ error.message);
    }
    );
    // this.dialogRef.close();
  }

  Update(data:Transaction){
    this.pekuService.putTransactions(data).subscribe((res) => {
      alert(`Il valore è stato aggiornato.`);
      console.log(res);
    }, error => {
      console.log("__>",error);
      alert(`Errore :.`+ error.error);
    }
    );
    // this.dialogRef.close();
  }


  DeleteIncome(data:any){
    this.pekuService.deleteIncome(data).subscribe((res) => {
      console.log(res);
      alert(`Il valore è stato eliminato.`);
      this.dialogRef.close();
    }
    );
  }

  AddIncome(data:any){
    this.pekuService.postIncome(data).subscribe((res) => {
      // alert(`Il valore è stato aggiornato.`);
    }
    , error => {
      console.log("__>",error);

      alert(`Errore :.`+ error.message);
    }
    );
    // this.dialogRef.close();
  }

  UpdateIncome(data:any){
    this.pekuService.putIncome(data).subscribe((res) => {
      alert(`Il valore è stato aggiornato.`);
      console.log(res);
    }, error => {
      console.log("__>",error);
      alert(`Errore :.`+ error.error);
    }
    );
    // this.dialogRef.close();
  }

}
