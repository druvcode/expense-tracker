import React, { useEffect } from 'react'

import Form from '../form/Form'
import { useGlobalContext } from '../../context/GlobalContext'
import IncomeItem from '../IncomeItem/IncomeItem'

function Income() {
  const{addIncome,getIncome,deleteIncome,totalIncome,incomes}=useGlobalContext()
  useEffect(() => {
    getIncome()
  }, [])

  
  return (
    <div className='incomestyle flex flex-col'>
        <div className='inner layout'>
          <h1 className='text-2xl'>Income</h1>
          <h2 className='flex items-center justify-center border-[1px] border-solid border-white rounded-2xl p-2 my-3 gap-2 text-2xl'>Total Income : <span className='text-green-400 font-semibold text-4xl'>${totalIncome()}</span></h2>
          <div className='incom-content flex gap-2'>
            <div className='from-container'>
              <Form/>
            </div>
            <div className="incomes flex-1">
              {incomes.map((income)=>{
              const {income_id,amount,category_name,description,income_date}=income
              return <IncomeItem 
              key={income_id}
              id={income_id}
              amount={amount}
              date={income_date}
              category={category_name}
              description={description}
              deleteItem={deleteIncome}
              type={"income"}
              indicator_color={"before:bg-green-400"}
              />
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Income