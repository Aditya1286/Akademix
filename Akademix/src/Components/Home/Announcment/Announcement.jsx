import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
function Announcement({images=[{}]}) {
  return (
    <div className='w-full h-full z-1 object-cover relative  '>
        <SimpleImageSlider
        width={"100%"}
        height={"100%"}
        autoPlay={true}
        images={images}
        autoPlayDelay={3}
        />
    </div>
  )
}

export default Announcement 