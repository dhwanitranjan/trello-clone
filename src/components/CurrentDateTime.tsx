import React, { useState, useEffect } from "react";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState({
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
    timeZoneName: new Date().toLocaleTimeString("en-US", {
      timeZoneName: "shortGeneric",
    }),
    timeZone: new Date().toLocaleTimeString("en-US", { timeZoneName: "short" }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime({
        currentTime: new Date().toLocaleTimeString(),
        currentDate: new Date().toLocaleDateString(),
        timeZoneName: new Date().toLocaleTimeString("en-US", {
          timeZoneName: "shortGeneric",
        }),
        timeZone: new Date().toLocaleTimeString("en-US", {
          timeZoneName: "short",
        }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="position-absolute d-flex right-0 bottom-0 bg-black text-white rounded-1">
      <span className="mx-1">{currentTime.timeZoneName.split(" ")[2]}</span>
      <span className="me-1">
        {currentTime.timeZoneName.split(" ")[3]} Zone
      </span>
      <span className="me-1">({currentTime.timeZone.split(" ")[2]}) </span>
      <span className="me-1">{currentTime.currentDate}</span>
      <span className="me-1">{currentTime.currentTime}</span>
    </div>
  );
};

export default CurrentDateTime;
