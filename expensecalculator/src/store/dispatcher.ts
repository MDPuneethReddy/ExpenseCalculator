import { ActionType } from "./reducer";

const updateAmount = (data: any) => {
    return { 
        type: ActionType.UpdateAmount, payload: { data }
    };
};
const updateTotalDebitAmount=(data:any)=>{
    return {
         type:ActionType.UpdateTotalDebitAmount,payload:{data}
    }
}
const updateTotalCreditAmount=(data:any)=>{
    return {
         type:ActionType.UpdateTotalCreditAmount,payload:{data}
    }
}
const updateMyList=(data:any)=>{
    return {
         type:ActionType.UpdateMyList,payload:{data}
    }
}
const setCurrentUser=(data:any)=>{
    return {
         type:ActionType.SetCurrentUser,payload:{data}
    }
}
const updateCreditCategory=(data:any)=>{
    return {
         type:ActionType.UpdateCreditCategory,payload:{data}
    }
}
const updateDebitCategory=(data:any)=>{
    return {
         type:ActionType.UpdateDebitCategory,payload:{data}
    }
}
export {
  updateAmount,
  updateTotalDebitAmount,
  updateTotalCreditAmount,
  updateMyList,
  setCurrentUser,
  updateCreditCategory,
  updateDebitCategory,
};