import React from 'react'
import { signout } from '../../../utils/icons'
import{ menuItems} from "../../../utils/menuItems"
import { Link } from 'react-router-dom'



function Navigation({active,setActive}) {

  return (
<nav className="px-6 py-8 w-[300px] h-full bg-zinc-800 border border-solid border-white backdrop-blur-sm rounded-3xl text-slate-200 flex flex-col justify-between gap-8 ">
        <div className="flex item-center gap-4 h-[100px] items-center">
        <img className="h-16 w-16 rounded-full object-cover" src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg" alt="" />
 
            <div className='h-[100px] flex flex-col justify-center'>
                <h2 className="text-xl text-gray-100" >Dhruv</h2>
                <p className='text-sm'>Your money</p>
            </div>
        </div>

            <ul className="flex-1 flex flex-col">
                {menuItems.map((item)=>{
                    return(
                        <li
                        onClick={()=>{
                            setActive(item.id)}}
                         key={item.id} className={`flex gap-4 items-center my-2 font-medium cursor-pointer relative pl-4 
                         ${active===item.id? "text-green-700" :"text-red-400"}`}>
                            {/* <Link to={item.link}> */}
                            {item.icon}
                            <span>{item.title}</span>
                            {/* </Link> */}
                        </li>
                    )
                })}
            </ul>
            <div>
                <li>
                    {signout} Sign out
                </li>
                

            </div>
    </nav>
  )
}

export default Navigation