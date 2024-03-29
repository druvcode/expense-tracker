import React from 'react'

function Button({name,icon,onClick,bg,bpadx,bpady,color,bRad}) {
  return (
    <button className={`pointer-events-auto ${bRad} ${bg} ${bpadx} ${bpady} text-[0.8125rem] font-semibold leading-5 ${color} hover:bg-indigo-500 flex justify-center items-center gap-2`} onClick={onClick}>
        {icon}
        {name}
    </button>
  )
}

export default Button