import React ,{useState,useEffect} from "react"
import Orb from "./component/Orb"
import Navigation from "./component/Nav/Navigation"
import Income from "./component/Income/Income"
import Dashboard from "./component/Dashboard/Dashboard"
import { GlobalContextProvider, useGlobalContext } from "./context/GlobalContext"
import axios from "axios"
import Expenses from "./component/Expenses/Expenses"


 
function App() {

const baseUrl= "http://localhost:3000/api/v1/"
const [signupErr, setsignupErr] = useState([])
const [incomes,setIncomes]=useState([])
const [expenses, setExpenses] = useState([])
const [err,setErr]=useState(null)
const [active, setActive] = useState(1)
function displayData(){

    switch(active){
      case 1: return(
        <Dashboard/>
      )
      case 2: return <Dashboard/>
      
      case 3: return(<Income/>)
      case 4: return(<Expenses/>)
      default:return(<Dashboard/>)
    }
}

const addIncome = async(income)=>{
  const response = await axios.post(`${baseUrl}add-income`,income)
  .catch((err)=>{
    setErr(err.response.data.message)
  })
  getIncome()
}
const addExpenses=async(expense)=>{
  const response = await axios.post(`${baseUrl}add-expense`,expense)
  .catch((err)=>{
    setErr(err.response.data.message)
  })
  getExpenses()
}

const getIncome = async()=>{
  const response = await axios.get(`${baseUrl}get-income`)
  setIncomes(response.data)
}
const getExpenses = async()=>{
  const response = await axios.get(`${baseUrl}get-expense`)
  setExpenses(response.data)
}
const deleteIncome = async(id)=>{
  const response = await axios.delete(`${baseUrl}delete-income/${id}`)
  getIncome()
}
const deleteExpenses = async(id)=>{
  const response = await axios.delete(`${baseUrl}delete-expense/${id}`)
  getExpenses()
}
const totalIncome=()=>{
  let total=0
incomes.forEach((income)=>{
  total=total+parseFloat(income.amount)
})
return total
}
const totalExpenses=()=>{
  let totalExpense=0
expenses.forEach((expense)=>{
  totalExpense=totalExpense+parseFloat(expense.amount)
})
return (totalExpense)
}
useEffect(() => {
  getIncome()
  getExpenses()
}, [])

const history=()=>{
  let transactionHistory=[...incomes,...expenses]
  transactionHistory.sort((a,b)=>{
      return new Date(b.created_at) - new Date(a.created_at)
  })
  return (transactionHistory.slice(0,3))
}
const signUp=async(data)=>{
  const response =await axios.post(`${baseUrl}register`,data)
  .catch((err)=>{
    setsignupErr(err.response.data.message)
  })
}

  return (
    
    <GlobalContextProvider value={{addIncome,getIncome,deleteIncome,totalIncome,addExpenses,getExpenses,deleteExpenses,signUp,totalExpenses,history,incomes,expenses}}>
    <div className="h-screen bg-zinc-400 relative text-slate-400">
      <Orb/>

      <div className="h-full flex gap-8 p-8">
        <Navigation active={active} setActive={setActive}/>
        <main className="flex-1 bg-zinc-800 border border-solid border-white backdrop-blur-sm rounded-3xl text-slate-200 p-4 overflow-x-hidden">
          {displayData()}
        </main>
      </div>
  
    </div>
    </GlobalContextProvider>
)

}

export default App
