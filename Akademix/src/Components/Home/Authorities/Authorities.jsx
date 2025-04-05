import React from 'react'
function Authorities({info}) {
  return (
    <div className='w-full h-full rounded-md flex flex-col justify-between items-center'>
        <div className={`image rounded-full h-[30%] w-[30%] mt-2 bg-cover `}
            style={{backgroundImage: info.imageLink?`url(${info.imageLink})`:""}}
        >
        </div>
        <div className="MidSec  text-lg w-full h-[10%] flex justify-center items-center bg-orange-400 ">
            <p className='font-bold'>{info.Designation}</p>
        </div>
        <div className='info w-full text-sm h-[50%] pb-7 flex flex-col text-gray-600 pl-2 justify-center gap-2 '>
            <p className='font-bold text-lg text-black'>{info.Name}</p>    
            <p>{info.Role}</p>
            <p>{info.contact}</p>
        </div>
    </div>  
  )
}

export default Authorities