import React from 'react';


const Banner = () => {
    return (
        <div class="relative w-full h-[300px] lg:h-[500px]">
  
  <img src="https://images.pexels.com/photos/3764537/pexels-photo-3764537.jpeg?cs=srgb&dl=pexels-olly-3764537.jpg&fm=jpg" 
  class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-2xl text-center lg:text-5xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    <button className='btn border-0 my-btn-2'>Explore</button>
  </div>
</div>

    );
};

export default Banner;