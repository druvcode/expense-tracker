
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Button/Button';
import { plus } from '../../../utils/icons';
function Form() {

    const {addIncome} = useGlobalContext()

    const [input,Setinput]=useState({
        amount:"",
        category:"",
        description:"",
        income_date:""
    })
    const {amount,category,description,income_date}=input;

    const handleInput = name => e=>{
        Setinput({...input,[name]:e.target.value})
    }
    const handleSubmit = e=>{
        e.preventDefault()
        addIncome(input)
        Setinput({
            amount:"",
            category:"",
            description:"",
            income_date:""
        })
    }
  return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 text-zinc-700 font-medium'>
            <div className="input">
                <input type="text" 
                value={amount}
                name={'amount'}
                placeholder='Enter Amount'
                onChange={handleInput('amount')} className="w-full px-4 py-2 rounded-md border border-solid border-black"/>
            </div>

            <div className="input">
                <input type="date"
                id="date" 
                value={income_date}
                 placeholder='enter a date' 
                 onChange={(e)=>{
                     Setinput({...input,income_date:e.target.value})
                 }}className="w-full px-4 py-2 rounded-md border border-solid border-black"
                  />
            </div>
            <div className="input flex justify-end">
                <select required value={category} name="category" id="category" onChange={handleInput('category')} className="px-2 py-2 rounded-md border border-solid border-black">
                <option value=""  disabled >Select Option</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investiments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="bank">Bank Transfer</option>  
                    <option value="youtube">Youtube</option>  
                    <option value="other">Other</option>

                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')} className="w-full px-4 py-2 rounded-md border border-solid border-black" ></textarea>
            </div>
            <div className="submitbtn">
                 <Button name={"Add Income"} icon={plus} bg={"bg-indigo-600"} bRad={"rounded-md"} color={"text-white"} bpadx={"px-3"} bpady={"py-2"}/>
            </div>
        </form>
  )
}

export default Form