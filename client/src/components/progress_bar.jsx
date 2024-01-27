import React from 'react'

function Progressbar({value=15,total=100,show=false}) {
  return (
    <div  className={`fixed inset-0 bg-black/40 flex items-center justify-center ${show?'':'hidden'}`}>
        <div className=' h-4 bg-sky-200 w-80 shadow-md rounded-md border border-gray-400 overflow-hidden'>
            <div className='h-full bg-sky-500' style={{width:`${(value/total)*100}%`}}></div>
        </div>
    </div>
  )
}

export  {Progressbar}