import React from 'react'
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../../utils/icons'
import Button from '../Button/Button'
import { useGlobalContext } from '../../context/GlobalContext'
import { dateFormate } from '../../../utils/Dateformate'

function IncomeItem({id,amount,date,category,description,deleteItem,indicator_color,type}) {


  const categoryIcon = () =>{
    switch(category) {
        case 'salary':
            return money;
        case 'freelancing':
            return freelance
        case 'investments':
            return stocks;
        case 'stocks':
            return users;
        case 'bitcoin':
            return bitcoin;
        case 'bank':
            return card;
        case 'youtube':
            return yt;
        case 'other':
            return piggy;
        default:
            return ''
    }
}

const expenseCatIcon = () => {
  switch (category) {
      case 'education':
          return book;
      case 'groceries':
          return food;
      case 'health':
          return medical;
      case 'subscriptions':
          return tv;
      case 'takeaways':
          return takeaway;
      case 'clothing':
          return clothing;
      case 'travelling':
          return freelance;
      case 'other':
          return circle;
      default:
          return ''
  }
}

  return (
    <div className="bg-zinc-800 border-[2px] border-solid border-blue-50 rounded-[20px] p-2 mb-3 flex items-center 
    gap-3 w-full text-white">
        <div className="icon w-12 h-12 rounded-[20px] flex items-center justify-center border-[2px] border-solid border-blue-50 text-3xl">
            {type==="expense" ?expenseCatIcon() :categoryIcon()}
        </div>
        <div className="content flex-col ">
          <h5 className={`text-xl relative pl-8 before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-full ${indicator_color}`}>{dollar} {amount}</h5>
          <div className="inner-Content flex items-center justify-between gap-3">
            <div className="about flex items-center gap-4">
              <p className="flex items-center gap-3 text-white opacity-85">{calender} {dateFormate(date)}</p>
              <p className='flex items-center gap-3'>{comment} {description}</p>
            </div>
            <div className="btn">
            <Button icon={trash} bpadx={"px-4"} bpady={"py-4"} bRad={"rounded-full"} bg={"bg-red-400 opacity-80"} color={"text-white"} onClick={()=>{deleteItem(id)}}/>
          </div>
          </div>

        </div>
    </div>
  )
}

export default IncomeItem