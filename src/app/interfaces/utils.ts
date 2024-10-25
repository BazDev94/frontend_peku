// INTERFACE UTILS
export interface SideNavToggle {
    screenWidth:number;
    collapsed:boolean;
  }


// INTERFACE BACKEND
export interface User{
    id:number;
    email:string;
    name:string;
}

export interface Category{
    id:number;
    name:string;
    color:number;
    icon:string;
}
export interface Transaction{
    id?:number;
    name:string;
    date:string;
    amount:number;
    category:number;
    description:string;
    user?:number;
}

export interface Budget {
    id:number;
    category:string;
    allocated_amount:number;
    spent_amount:number;
    remaining_amount:number;
    user:number;

  }

export interface SavingGoal {
  user          : number;
  goal_name     : string;
  target_amount : number;
  current_amount: number;
  target_date   : Date;
  }

export interface Income {
  id?         : number
  user        : number
  source      : string
  amount      : number
  date        : string
  description : string
}

export interface Investment  {
  user            :number;
  investment_type :string;
  initial_amount  :number;
  current_value   :number;
  purchase_date   :Date;
}

export interface TransMonth   {
    category__name: string,
    total: number
}
