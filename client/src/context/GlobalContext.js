import { createContext,useContext } from "react";

export const GlobalContext = createContext({

    addIncome:async(income)=>{},
    getIncome:async()=>{},
    deleteIncome:async(id)=>{},
    addExpenses:async(expenses)=>{},
    getExpenses:async()=>{},
    deleteExpenses:async(id)=>{},
    signUp:async(data)=>{},
    totalIncome:()=>{},
    totalExpenses:()=>{},
    history:()=>{},
    
})

export const GlobalContextProvider = GlobalContext.Provider;

export const useGlobalContext =()=>{
    return useContext(GlobalContext)
}