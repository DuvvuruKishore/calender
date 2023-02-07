import { add, daysInWeek, differenceInDays, eachDayOfInterval, endOfMonth, format, isEqual, isSameMonth, isToday, parse, startOfMonth, startOfToday, sub } from 'date-fns';
import React, { useState } from 'react';
import { Interface } from 'readline';
import '../App.css';

interface changeProps{
  value?:Date;
  onChange:(value:Date)=>void
}

function Calender(changeProps:any) {
  const {value=new Date(),onChange}= changeProps
  // console.log(value);
  const startDate=startOfMonth(value);
  const endDate=endOfMonth(value);
  const diff=differenceInDays(endDate,startDate)+1;
 const startempty=startDate.getDay();
 const prev=()=>onChange(sub(value,{months:1}))
 const future=()=>onChange(add(value,{months:1}))
 let today = startOfToday()
 let [selectedDay, setSelectedDay] = useState(today);
 let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))

 let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

 let days = eachDayOfInterval({
  start: firstDayCurrentMonth,
  end: endOfMonth(firstDayCurrentMonth),
})

    const week=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  return (
    <div className="calendar-wrapper App">
      <div className='calendarheader'>
        <h5 onClick={prev}>{"<"}</h5>
    <h3>{format(value,'LLLL yyyy')}</h3>
    <h5 onClick={future}>{">"}</h5>
    </div>
    <ol className="calendar">
       {week.map((data)=>{
        return <li className="day-name">{data}</li>
       })}
      {Array.from({length:startempty}).map((_,index)=>{
      return <li></li>
     })}
     {/* {Array.from({length:diff}).map((_,index)=>{
      const date=index+1
       

      return <div>
        <li>
          <button
          style={{backgroundColor:'black',color:"white"}}
          className={isEqual(date,selectedDay)?"changeColor":"updateColor"}
          > {date}</button>
        </li>
       
        </div>
     })}
      */}


{days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={
                    // dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  }
                >
                  <button
                    // type="button"
                    onClick={() => setSelectedDay(day)}
                     className={`${isEqual(day, selectedDay) && 'startingday'},
                     ${isEqual(day,selectedDay)&& isToday(day)&&!isSameMonth(day,firstDayCurrentMonth)?"updateColor":""} ,
                     ${!isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      'text-gray-900'},
                      ${!isEqual(day,selectedDay)&&"changeColor"}`}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  
                </div>
))}
    </ol>
  </div>
  )
}

export default Calender