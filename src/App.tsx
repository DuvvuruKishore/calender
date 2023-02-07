import React, { useState } from 'react';
import './App.css';
import Calender from './components/Calender';


function App() {
  const [currentDate,setCurrentDate]=useState(new Date())
  return (
    <div className="App">
      <Calender value={currentDate} onChange={setCurrentDate}/>
     </div>
  );
}

export default App;
