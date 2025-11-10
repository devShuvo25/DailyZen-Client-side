import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaFlagCheckered } from 'react-icons/fa';
import { GiCheckeredFlag } from 'react-icons/gi';
import { GrWheelchairActive } from 'react-icons/gr';
import { IoSunnyOutline } from 'react-icons/io5';

const MyHabits = () => {
    return (
        <div>
                    <div class="relative w-full h-[500px]">
  
  <img src="https://www.themodestman.com/wp-content/uploads/2025/07/image6-44.jpg" class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-5xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    <h1 className='text-4xl font-semibold'>You’ve completed 5 habits today! Keep up the great streak!”</h1>
    <button className='btn border-0 my-btn-2'>Explore</button>
  </div>
</div>

<div className='p-5'>
    <div className='flex flex-col gap-2 justify-center items-center my-3 mb-10'>
        <h1 className='text-4xl font-semibold'>My <span className='color-primary'>Habits</span></h1>
        <h3>Track your daily progress and stay consistent</h3>
        <p className='opacity-70 text-sm'>Stay on track with your daily goals. Review your active habits, check your streaks, and keep growing — one day at a time.</p>
    </div>
    {/* card */}
    <div className='flex justify-center items-center gap-10 my-10'>
        <div className='h-[180px]  bg-green-100 w-[200px] flex flex-col items-center justify-center gap-2 rounded-lg'>
            <IoSunnyOutline size={35} className='color-acent'/>
            <h3 className='text-xl font-semibold'>Habits Added</h3>
            <div className='rounded-[50%]  h-[70px] w-[70px] flex justify-center items-center'>
            <h1 className='text-6xl font-bold color-primary'>8</h1>
            </div>
        </div>
        <div className='h-[160px]  bg-green-100 w-[200px] flex flex-col items-center justify-center gap-2 rounded-lg'>
            <CiCalendarDate  size={35} className='color-acent'/>
            <h3 className='text-xl font-semibold'>Current Streak</h3>
            <h1 className='text-6xl font-bold color-primary'>12</h1>
        </div>
        <div className='h-[160px]  bg-green-100 w-[200px] flex flex-col items-center justify-center gap-2 rounded-lg'>
            <GiCheckeredFlag size={35} className='color-acent'/>
            <h3 className='text-xl font-semibold'>Completed</h3>
            <h1 className='text-6xl font-bold color-primary'>4</h1>
        </div>
        <div className='h-[160px]  bg-green-100 w-[200px] flex flex-col items-center justify-center gap-2 rounded-lg'>
            <GrWheelchairActive size={35} className='color-acent'/>
            <h3 className='text-xl font-semibold'>Active Habits</h3>
            <h1 className='text-6xl font-bold color-primary'>5</h1>
        </div>
    </div>
    {/* table of my  habits */}
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className='color-acent'>Category</th>
        <th className='color-acent'>Title</th>
        <th className='color-acent'>Current Streak</th>
        <th className='color-acent'>Created Date</th>
        <th className='color-acent'>Update</th>
        <th className='color-acent'>Delete</th>
        <th className='color-acent'>Mark Complete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
       <th>
        Title
       </th>
        <td>
          Zemlak, Daniel and Leannon
        </td>
        <td>Purple</td>
        <td>
            17/05/2025
        </td>
        <th>
          <button className="btn my-btn btn-xs">Update</button>
        </th>
        <th>
          <button className="btn my-btn-2 btn-xs">Delete</button>
        </th>
        <th className='text-center'>
          <input type="checkbox" name="mark-complete" id="" />
        </th>
      </tr>
    </tbody>
    {/* foot */}
  </table>
</div>
</div>
        </div>
    );
};

export default MyHabits;