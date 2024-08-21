import { Injectable, Injector } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../../app/services/api.service";
import { map } from "rxjs/operators";
import { Budget, SideNavToggle, Transaction } from '../interfaces/utils';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PekuService {

  constructor(private injector: Injector ,private apiService: ApiService,) { }


  LoginUser(userProfile: any): Observable<any> {

    let completeUrl = 'user/login/';
    console.log('url:', completeUrl);
    return this.apiService.post(completeUrl, userProfile).pipe(
      map((data) => {
        localStorage.setItem('data', data.jwt);
        localStorage.setItem('currentUser', JSON.stringify(data));
        return data;
      })
    );
  }
  getToken(){
    return localStorage.getItem('data')
  }
  // Transactions API
  getTransactions(): Observable<Transaction[]> {
    const completeUrl = 'transaction/';
    return this.apiService.get(completeUrl)as Observable<Transaction[]>;
  }
  getMETransaction(Year:any,Month:any): Observable<Budget[]> {
    const completeUrl = 'transaction/monthly_expenses/?year='+Year+'&month='+Month;
    return this.apiService.get(completeUrl)as Observable<Budget[]>;
  }
  postTransactions(obj:Transaction): Observable<Transaction> {
    const completeUrl = 'transaction/';
    return this.apiService.post(completeUrl,obj)as Observable<Transaction>;
  }
  putTransactions(obj:Transaction): Observable<Transaction[]> {
    const completeUrl = 'transaction/' + obj.id + '/';
    return this.apiService.put(completeUrl,obj)as Observable<Transaction[]>;
  }
  deleteTransactions(obj:Transaction): Observable<Transaction[]> {
    const completeUrl = 'transaction/' + obj.id + '/';;
    return this.apiService.delete(completeUrl,)as Observable<Transaction[]>;
  }
  // Budgets API
  getBudgets(): Observable<Budget[]> {
    const completeUrl = 'budget/';
    return this.apiService.get(completeUrl)as Observable<Budget[]>;
  }
  getBSBudgets(user:number): Observable<Budget[]> {
    // user= 1
    // budget_summary

    const completeUrl = 'budget/budget_summary/?user='+user;
    return this.apiService.get(completeUrl)as Observable<Budget[]>;
  }
  postBudgets(obj:Budget): Observable<Budget[]> {
    const completeUrl = 'budget/';
    return this.apiService.post(completeUrl,obj)as Observable<Budget[]>;
  }
  postAMIBudgets(YearAndMonth:any): Observable<Budget[]> {
    // allocate_monthly_income
    // servirebbe anche USerID
    const completeUrl = 'budget/allocate_monthly_income';
    return this.apiService.post(completeUrl,YearAndMonth)as Observable<Budget[]>;
  }
  postURBudgets(user:any): Observable<Budget[]> {
    // update_remaining
    // servirebbe anche USerID
    user= 1
    const completeUrl = 'budget/update_remaining';
    return this.apiService.post(completeUrl,user)as Observable<Budget[]>;
  }
  postRMBBudgets(user:any): Observable<Budget[]> {
    // reset_monthly_budget
    // servirebbe anche USerID
    user= 1
    const completeUrl = 'budget/update_remaining';
    return this.apiService.post(completeUrl,user)as Observable<Budget[]>;
  }
  putBudgets(obj:Budget): Observable<Budget[]> {
    const completeUrl = 'budget/'+ obj.id + '/';
    return this.apiService.put(completeUrl,obj)as Observable<Budget[]>;
  }
  deleteBudgets(obj:Budget): Observable<Budget[]> {
    const completeUrl = 'budget/'+ obj.id + '/';
    return this.apiService.delete(completeUrl)as Observable<Budget[]>;
  }

  // GOALS API
  getGoals(): Observable<any> {
    const completeUrl = 'saving_goal/';
    return this.apiService.get(completeUrl)as Observable<any>;
  }
  postGoals(obj:any): Observable<any> {
    const completeUrl = 'saving_goal/';
    return this.apiService.post(completeUrl,obj)as Observable<any>;
  }
  putGoals(obj:any): Observable<any> {
    const completeUrl = 'saving_goal/'+ obj.id + '/';
    return this.apiService.put(completeUrl,obj)as Observable<any>;
  }
  deleteGoals(obj:any): Observable<any> {
    const completeUrl = 'saving_goal/'+ obj.id + '/';
    return this.apiService.delete(completeUrl)as Observable<any>;
  }
  // CATEGORIES API
  getCategories(): Observable<any> {
    const completeUrl = 'category/';
    return this.apiService.get(completeUrl)as Observable<any>;
  }
  postCategories(obj:any): Observable<any> {
    const completeUrl = 'category/';
    return this.apiService.post(completeUrl,obj)as Observable<any>;
  }
  putCategories(obj:any): Observable<any> {
    const completeUrl = 'category/'+ obj.id + '/';
    return this.apiService.put(completeUrl,obj)as Observable<any>;
  }
  deleteCategories(obj:any): Observable<any> {
    const completeUrl = 'category/'+ obj.id + '/';
    return this.apiService.delete(completeUrl)as Observable<any>;
  }
  
}
