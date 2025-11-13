import React, { useEffect, useState } from 'react';
import HabitsCard from '../components/HabitsCard';
import useAxiosSecure from '../hooks/useAxiosSecure';

const PublicHabits = () => {
    const {instance} = useAxiosSecure();
    const [habits,setHabits] = useState([]);
    const [filteredHabits,setFilteredHabits] =useState([]);
    useEffect(() => {
        instance.get('/all-habits')
        .then(reslut => {
            setHabits(reslut.data)
            setFilteredHabits(reslut.data)
            
        })
        .catch(err => {
            console.log(err)
        })
    },[instance])
    // handle search
    const handleSearch = (value) => {
      const searchValue = value.trim().toLowerCase();
      if(!searchValue){
        setFilteredHabits(habits);
      }
      if(searchValue){
        const filterd =  habits.filter(habit => habit?.title?.trim().toLowerCase().includes(searchValue))
        setFilteredHabits(filterd)
      }
      // handleSorting

    }
          const handleSorting = (value) => {
        console.log(value)
       if(value === "All"){
        return setFilteredHabits(habits);
       }
       if(value){
        const sorted = habits.filter(habit => habit.category === value)
        setFilteredHabits(sorted)
       }

      }
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
        <div className='flex justify-between items-center p-5'>
          <div><h1 className='text-2xl font-bold'>Available Habits({filteredHabits.length})</h1></div>
          <div><label className="input outline-0 rounded-4xl">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input onChange={(e) =>handleSearch(e.target.value)} type="search " name='search' className='w-60 focus:outline-0' required placeholder="Search" />
</label></div>
<div><select onChange={(e) => handleSorting (e.target.value)} defaultValue="Pick a color" className="select outline-0">
  <option disabled={true}>Sort by Category</option>
   <option value="All">All</option>
  <option value="Morning">Morning</option>
  <option value="Study">Study</option>
  <option value="Evening">Evening</option>
  <option value="Fitness">Fitness</option>
  <option value="Work">Work</option>
</select></div>
        </div>
            <div className='grid grid-cols-4 gap-5'>
                {
                    filteredHabits.map(habit => <HabitsCard habit={habit}/>)
                }
            </div>
        </div>
    );
};

export default PublicHabits;