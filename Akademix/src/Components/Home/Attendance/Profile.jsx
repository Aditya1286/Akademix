import React from 'react'

function Profile({name="Admin" , id="12323003"}) {
  return (
    <div className='w-full h-full flex  object-fill relative justify-around items-center'>
        <div className='object-cover w-[6%] rounded-[100%] h-[80%]  flex items-center justify-center overflow-hidden'>
            <img className='object-cover rounded-[100%]' src="src/assets/download.jpeg" alt="Pfp"  />
        </div>
        <div className=' gap-2 text-lg w-[10%] h-[50%] flex justify-center items-center'>
            <p >Welcome,</p><br></br>
            <p className='font-bold'>{name}</p>
        </div>
    </div>
  )

}

export default Profile