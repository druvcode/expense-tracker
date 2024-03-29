import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'

function History() {

    const {history}=useGlobalContext()
    const [...transactionHistory] = history()
  return (
    <div className='flex gap-4 flex-col'>
        <h2>Recent History</h2>
        {transactionHistory.map((item)=>{

            const {income_id,expense_id,amount,category_name} = item
            return(
                <div key={(income_id)?income_id : expense_id} className='border-[2px] border-solid border-white flex items-center justify-between p-4 rounded-2xl '>
                    <p className={(income_id) ?"text-green-400" :"text-red-400"}>{category_name}</p>
                    <p className={(income_id) ?"text-green-400" :"text-red-400"}>{
                        (income_id)?`+ ${amount}` : `- ${amount}`
                    }</p>
                </div>
            )
        })}
    </div>
  )
}

export default History