import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
function Announcement() {
    const images = [
        {url: "src/assets/images/1.jpeg"},
        {url: "src/assets/images/2.jpeg"},
        {url: "src/assets/images/3.jpeg"},
        {url: "src/assets/images/4.jpeg"},
    ]
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