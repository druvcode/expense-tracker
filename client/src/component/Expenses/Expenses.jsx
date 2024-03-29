import React, { useEffect } from 'react'


import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from '../IncomeItem/IncomeItem'
import ExpensesForm from '../ExpensesForm/ExpensesForm'

function Expenses() {
  const{getExpenses,deleteExpenses,totalExpenses,expenses}=useGlobalContext()
  useEffect(() => {
    getExpenses()
  }, [])

  
  return (
    <div className='incomestyle flex flex-col'>
        <div className='inner layout'>
          <h1 className='text-2xl'>Expenses</h1>
          <h2 className='flex items-center justify-center border-[1px] border-solid border-white rounded-2xl p-2 my-3 gap-2 text-2xl'>Total Expenses : <span className='text-red-400 font-semibold text-4xl'>${totalExpenses()}</span></h2>
          <div className='incom-content flex gap-2'>
            <div className='from-container'>
              <ExpensesForm/>
            </div>
            <div className="incomes flex-1">
              {expenses.map((expense)=>{
              const {expense_id,amount,category_name,description,expense_date}=expense
              return <IncomeItem 
              key={expense_id}
              id={expense_id}
              amount={amount}
              date={expense_date}
              category={category_name}
              description={description}
              deleteItem={deleteExpenses}
              type={"expense"}
              indicator_color={"before:bg-red-400"}
              />
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Expenses