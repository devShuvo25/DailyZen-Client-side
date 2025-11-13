import React from 'react';
import BadHabitsCard from './BadHabitsCard';
import { LuClockAlert } from 'react-icons/lu';

const BadHabits = () => {
    return (
    <div class="relative w-full lg:h-[600px] mb-0.5">
  
  <img src="https://cdn.shopify.com/s/files/1/0255/2417/4922/files/Habits_for_Mental_Health_1.jpg?v=1724754680" class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col  items-center gap-5 justify-between py-5 pt-10 text-white">
    <h1 class="text-2xl  lg:text-5xl text-white font-bold ms-10 text-left ">People with bad habits</h1>
   
    <p className='text-center mx-20'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic debitis voluptas vitae vel nesciunt aliquam aut earum pariatur nisi laudantium aperiam cumque alias, sint itaque harum. Consequatur vero aperiam, sapiente pariatur accusantium ipsam quibusdam voluptatem id aliquid, consectetur quasi quos!</p>
    <div className=' hidden lg:flex  bottom-8 text-white left-5  flex  items-center justify-between gap-2  '>

            <div className="flex flex-col justify-center items-center
             lg:w-[400px] border-[1px] border-gray-400 rounded-2xl
              p-5 gap-2 ">
              <div>
                <LuClockAlert size={30} className="color-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Procrastination</h2>
              <p className='text-sm opacity-70'>
                Delaying important tasks leads to stress and missed opportunities. Why
                it’s harmful: It reduces productivity and creates anxiety over
                unfinished work.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center 
             lg:w-[400px] border-[1px] border-gray-400 rounded-2xl
              p-5 gap-2 ">
              <div>
                <LuClockAlert size={30} className="color-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Procrastination</h2>
              <p className='text-sm opacity-70'>
                Delaying important tasks leads to stress and missed opportunities. Why
                it’s harmful: It reduces productivity and creates anxiety over
                unfinished work.
              </p>
            </div>

            <div className="flex flex-col justify-center items-center
             lg:w-[400px] border-[1px] border-gray-400 rounded-2xl
              p-5 gap-2 ">
              <div>
                <LuClockAlert size={30} className="color-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Procrastination</h2>
              <p className='text-sm opacity-70'>
                Delaying important tasks leads to stress and missed opportunities. Why
                it’s harmful: It reduces productivity and creates anxiety over
                unfinished work.
              </p>
            </div>
          </div>
  </div>
          
          
          
</div>

    );
};

export default BadHabits;