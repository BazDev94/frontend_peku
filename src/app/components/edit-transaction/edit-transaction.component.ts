import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Transaction } from 'src/app/interfaces/utils';
import { PekuService } from 'src/app/services/peku.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent implements OnInit {
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any
,  public dialogRef: MatDialogRef<EditTransactionComponent>
,  public pekuService: PekuService
, public utils: UtilsService

  ) {
    this.data = data;
    console.log("dato dal service ...", this.data);
   }

  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  Save(data:Transaction): void {
    data.date = this.utils.formatDateToYYYYMMDD(data.date);
    if(data.id == 0){
      this.Add(data);
      alert(`Il valore è statol inserito.`);
      this.dialogRef.close();
    }
    else{
      this.Update(data);
      alert(`Il valore è stato aggiornato.`);
      this.dialogRef.close();
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
      console.log(res);
    }
    );
    this.dialogRef.close();
  }

  Update(data:Transaction){
    this.pekuService.putTransactions(data).subscribe((res) => {
      console.log(res);
    }
    );
    this.dialogRef.close();
  }


}
