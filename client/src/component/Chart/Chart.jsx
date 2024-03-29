import React from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line} from "react-chartjs-2"
import { dateFormate } from '../../../utils/Dateformate';


ChartJs.register( 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,);





function Chart() {
    const {incomes,expenses} = useGlobalContext()
    const data ={
        labels:incomes.map((income)=>{
            return dateFormate(income.income_date)
        }),

        datasets:[{
            label:"Income",
            data:[...incomes.map((income)=>{
                const{amount}=income
               return amount;
            })],
            backgroundColor:"green",
            tension:0.2
        },
        {
            label:"Expense",
            data:[...expenses.map((exp)=>{
                const{amount}=exp
               return amount;
            })],
            backgroundColor:"red",
            tension:0.2
        }
        ]
    }
  return (
    <div className=" bg-slate-300 h-full p-4 border-[2px] border-solid border-white rounded-2xl">
        <Line data={data}/>
    </div>
  )
}

export default Chart