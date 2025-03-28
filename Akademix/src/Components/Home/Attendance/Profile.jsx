  import React from 'react'

  function Profile({name="Admin" , uId="12323003"}) {
    return (
      <div className='w-full h-full flex  object-fill relative justify-around items-center'>
          <div className='object-cover w-[8%] rounded-[100%] h-[80%]  flex items-center justify-center overflow-hidden'>
              <img className='object-cover rounded-[100%]' src="src/assets/download.jpeg" alt="Pfp"  />
          </div>
          <div className=' gap-2 text-lg w-[10%] h-[50%] flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center gap-2'><p className='text-xl'>Welcome,</p>
              <p className='text-2xl'>{name}</p>
              </div>
              <div>
              <p className='font-bold text-2xl '>{uId}</p>

              </div>
          </div>
      </div>
    )

  }

  export default Profile