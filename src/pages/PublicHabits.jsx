import React, { useEffect, useState } from 'react';
import HabitsCard from '../components/HabitsCard';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PublicHabits = () => {
    const {instance} = useAxiosSecure();
    const [habits,setHabits] = useState([]);
    useEffect(() => {
        instance.get('/all-habits')
        .then(reslut => {
            setHabits(reslut.data)
            
        })
        .catch(err => {
            console.log(err)
        })
    },[instance])
    return (
        <div>
            <div className='grid grid-cols-2 gap-2'>
                        <div class="relative w-full h-[350px]">
  
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSad0Rk8fTlfid2yZNgk9MdylIz_zTpSoBp4A&s" class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    
  </div>
</div>
                        <div class="relative w-full h-[350px]">
  
  <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_570/https://theincmagazine.com/wp-content/uploads/2022/10/The-Value-of-Reading-and-Why-It-Matters-for-Students-1024x570.jpg" class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    
  </div>
</div>
                        <div class="relative w-full h-[350px]">
  
  <img src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/12/flat_stomach_GettyImages1214342263_Header-1024x575.jpg?w=1155&h=1528" class="w-full h-full object-cover" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    
  </div>
</div>
                        <div class="relative w-full h-[350px]">
  
  <img className='h-full w-full'  src="https://media.istockphoto.com/id/1054282608/photo/its-time-to-wake-up.jpg?s=612x612&w=0&k=20&c=p5ZDRaaFvJ4vGPcWCkkaTrpFVg8Rjm9oY3vD_RqrJ4Q=" />


  <div class="absolute inset-0 bg-black opacity-50"></div>

  <div class="absolute inset-1 flex flex-col items-center gap-5 justify-center text-white">
    <h1 class="text-xl text-white font-bold ms-10 text-left ">Small Steps Today, Big Wins Tomorrow.</h1>
    
  </div>
</div>
            </div>
                    <div className="flex flex-col gap-2 justify-center items-center my-3 mb-10">
          <h1 className="text-4xl font-semibold">
            My <span className="color-primary">Habits</span>
          </h1>
          <h3>Track your daily progress and stay consistent</h3>
          <p className="opacity-70 text-sm">
            Stay on track with your daily goals. Review your active habits,
            check your streaks, and keep growing — one day at a time.
          </p>
        </div>
            <div className='grid grid-cols-4 gap-5'>
                {
                    habits.map(habit => <HabitsCard habit={habit}/>)
                }
            </div>
        </div>
    );
};

export default PublicHabits;