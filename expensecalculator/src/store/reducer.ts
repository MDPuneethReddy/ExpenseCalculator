import { Action, Reducer } from "redux";
export enum ActionType {
  UpdateAmount = "UPDATE_AMOUNT",
  UpdateTotalDebitAmount="UPDATE_TOTAL_DEBIT_AMOUNT",
  UpdateTotalCreditAmount="UPDATE_TOTAL_CREDIT_AMOUNT",
  UpdateMyList="UPDATE_MY_LIST",
  SetCurrentUser="SET_CURRENT_USER",
  UpdateCreditCategory="UPDATE_CREDIT_CATEGORY",
  UpdateDebitCategory="UPDATE_DEBIT_CATEGORY",
  UpdateEachCreditCategory="UPDATE_EACH_CREDIT_CATEGORY",
  UpdateEachDebitCategory="UPDATE_EACH_DEBIT_CATEGORY"
}

export interface InitialState {
    currentUser:any,
    amount:number,
    totalDebitAmount:number,
    totalCreditAmount:number,
    myList:Array<any>,
    creditCategory:Array<any>,
    debitCategory:Array<any>
    eachCreditCategory:Array<any>,
    eachDebitCategory:Array<any>
}
export const initialState: InitialState = {
    currentUser:undefined,
    amount:0,
    totalDebitAmount:0,
    totalCreditAmount:0,
    myList:[],
    creditCategory:[],
    debitCategory:[],
    eachCreditCategory:[],
    eachDebitCategory:[]
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export const reducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action:any
) => {
  if (action.type === ActionType.UpdateAmount) {
    return { ...state, amount: action.payload.data };
  }
  else if (action.type === ActionType.UpdateTotalDebitAmount) {
    return { ...state, totalDebitAmount: action.payload.data };
  }
  else if (action.type === ActionType.UpdateTotalCreditAmount) {
    return { ...state, totalCreditAmount: action.payload.data };
  }
  else if (action.type === ActionType.UpdateMyList) {
    return { ...state, myList: action.payload.data };
  }
  else if (action.type === ActionType.SetCurrentUser) {
    return { ...state, currentUser: action.payload.data };
  }
  else if (action.type === ActionType.UpdateCreditCategory) {
    return { ...state, creditCategory: action.payload.data };
  }
  else if (action.type === ActionType.UpdateDebitCategory) {
    return { ...state, debitCategory: action.payload.data };
  }
  else if (action.type === ActionType.UpdateEachCreditCategory) {
    return { ...state, eachCreditCategory: action.payload.data };
  }
  else if (action.type === ActionType.UpdateEachDebitCategory) {
    return { ...state, eachDebitCategory: action.payload.data };
  }
  
   else 
    return state;
};