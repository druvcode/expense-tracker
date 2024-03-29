import React from 'react'
import Chart from '../Chart/Chart'
import { dollar } from '../../../utils/icons'
import { useGlobalContext } from '../../context/GlobalContext'
import History from '../History/History';

function Dashboard() {
  const {totalExpenses,totalIncome,incomes,expenses}=useGlobalContext();
  return (

    <div>
      <div className='innerlayout'>
      <h1>All Transactions</h1>
      <div className='stats-col grid grid-cols-[repeat(5,1fr)] gap-8'>
        <div className='chart-con col-[1/4] h-[270px]'>
          <Chart/>
          <div className='amount-con grid grid-cols-[repeat(4,1fr)] gap-6 mt-6'>
            <div className="total-income col-[span_2]  border-[2px] border-solid border-white p-4 rounded-2xl">
          <h2>Total Income</h2>
          <p className="text-3xl font-bold">{dollar} {totalIncome()}</p>
            </div>
            <div className="total-expense col-[span_2] border-[2px] border-solid border-white p-4 rounded-2xl">
          <h2>Total expense</h2>
          <p className="text-3xl font-bold">{dollar} {totalExpenses()}</p>
            </div>
            <div className="total-balance col-[2/4] border-[2px] border-solid border-white p-4 rounded-2xl flex flex-col items-center justify-center">
          <h2>Total Balance</h2>
          <p className="text-3xl font-bold">{dollar} {totalIncome()-totalExpenses()}</p>
            </div>
          </div>
        </div>
        <div className='history-col col-[4/6]'>
          <History/>
          <div>
            <h2 className='flex items-center justify-between my-2 text-xl'>Min<span className='text-2xl'>Income</span>Max</h2>
            <div className='border border-solid border-white p-4 rounded-2xl flex items-center justify-between' >
            <p className="font-semibold text-2xl">
            {incomes.length!=0 ? Math.min(...incomes.map((item)=>item.amount)) : "0"}
            </p>
            <p className="font-semibold text-2xl">
            {incomes.length!=0 ? Math.max(...incomes.map((item)=>item.amount)) : "0"}
            </p>
            </div>
          </div>
          <div>
            <h2 className='flex items-center justify-between my-4 text-xl'>Min<span className='text-2xl'>Expense</span>Max</h2>
            <div className='border border-solid border-white p-4 rounded-2xl flex items-center justify-between'>
            <p className="font-semibold text-2xl">
              {expenses.length!=0 ? Math.min(...expenses.map((item)=>item.amount)) : "0"}
            </p>
            <p className="font-semibold text-2xl">
            {expenses.length!=0 ? Math.max(...expenses.map((item)=>item.amount)) : "0"}
            </p>
            </div>
          </div>
        </div>
      </div>

      </div>

    </div>
  )
}

export default Dashboard