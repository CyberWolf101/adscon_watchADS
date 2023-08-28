// import React, { useState, useEffect } from "react";

// // const useCountdown = () => {
//   const [remainingTime, setRemainingTime] = useState(0);
//   const targetHourFromDB = JSON.parse(localStorage.getItem('trade_end_time')) 

//   const currentDate = new Date();
  
//   const targetMinuteFromDB = 59
  
  
//   useEffect(() => {
//     const calculateRemainingTime = () => {
//       const currentDate = new Date();

//       const targetDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         currentDate.getDate(),
//         targetHourFromDB,
//         targetMinuteFromDB
//       );

//       let timeRemaining = targetDate - currentDate;

//       if (timeRemaining <= 0) {
//         // If the target time has already passed today, set the target time for the next day
//         targetDate.setDate(targetDate.getDate() + 1);
//         timeRemaining = targetDate - currentDate;
//       }

//       setRemainingTime(timeRemaining);
//     };

//     // Calculate the remaining time immediately after component mount
//     calculateRemainingTime();

//     // Recalculate remaining time every second
//     const interval = setInterval(calculateRemainingTime, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [targetHourFromDB, targetMinuteFromDB]);

//   const hours = Math.floor(remainingTime / (1000 * 60 * 60));
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//   return {
//     hours,
//     minutes,
//     seconds,
//   };
// };

// export default useCountdown;




import React, { useState, useEffect } from "react";

const useCountdown = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const targetHourFromDB = parseInt(JSON.parse(localStorage.getItem('trade_end_time')));
  const targetMinuteFromDB = 59;

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentDate = new Date();

      const targetDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        targetHourFromDB,
        targetMinuteFromDB
      );

      // If the current time is greater than or equal to the target time for today,
      // set the target time for the next day.
      if (currentDate >= targetDate) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      let timeRemaining = targetDate - currentDate;
      setRemainingTime(timeRemaining);
    };

    // Calculate the remaining time immediately after component mount
    calculateRemainingTime();

    // Recalculate remaining time every second
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetHourFromDB, targetMinuteFromDB]);

  const hours = Math.max(Math.floor(remainingTime / (1000 * 60 * 60)), 0);
  const minutes = Math.max(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)), 0);
  const seconds = Math.max(Math.floor((remainingTime % (1000 * 60)) / 1000), 0);

  return {
    hours,
    minutes,
    seconds,
  };
};

export default useCountdown;


























// import React, { useState, useEffect } from "react";
// import useAuth from "./auth";


// const useCountdown = () => {
//      const { user, isLoading: authLoading } = useAuth()
//     let date = new Date()

//     let start_hours = date.getHours()

//     let end_hours = JSON.parse(localStorage.getItem('trade_end_time') )
//     const fetchedHours = parseInt(end_hours) - parseInt(start_hours);

//   const initialTimeInMilliseconds = fetchedHours * 60 * 60 * 1000;
//   const [remainingTime, setRemainingTime] = useState(initialTimeInMilliseconds);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const hours = Math.floor(remainingTime / (1000 * 60 * 60));
//   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//   return {
//     hours,
//     minutes,
//     seconds,
//   };
// };

// export default useCountdown;
















// useCountdown.js
// import React, { useState, useEffect } from "react";
// import useAuth from "./auth";

// const useCountdown = () => {
//     const { user, isLoading: authLoading } = useAuth()
//     let date = new Date()

//     let start_hours = date.getHours()

//     // let end_hours = parseInt(user.trade_end_time) 
//     let end_hours = JSON.parse(localStorage.getItem('trade_end_time') )
//     const initialHours = parseInt(end_hours) - parseInt(start_hours);
//     const [remainingTime, setRemainingTime] = useState(initialHours * 60 * 60 * 1000);
   
  
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000);
//         }, 1000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, []);

//     const hours = Math.floor(remainingTime / (1000 * 60 * 60));
//     const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

//     return {
//         hours,
//         minutes,
//         seconds,
//     };
// };

// export default useCountdown;































