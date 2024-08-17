import React from 'react';

const GradientBackground = () => {
  const commonStyle = {
    background: 'linear-gradient(0deg, #00e1ff 15%, rgba(255, 255, 255, 0) 100%)',
    mask: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 35%, rgba(0, 0, 0, 0.5) 65%, rgba(0, 0, 0, 0) 100%) add'
  };

  return (
    <>
      <div className="absolute bottom-0 left-1/2 z-10 h-[600px] w-[500px] -translate-x-1/2" style={commonStyle}></div>
      <div className="absolute left-1/2 ml-[-60px] hidden h-[800px] w-[120px] -translate-x-[-300px] rotate-[20deg] md:block lg:bottom-[-140px]" style={commonStyle}></div>
      <div className="absolute bottom-[-140px] left-1/2 ml-[-60px] hidden h-[800px] w-[120px] -translate-x-[300px] rotate-[-20deg] md:block" style={commonStyle}></div>
      <div className="absolute bottom-[-220px] left-1/2 ml-[-150px] hidden h-[1000px] w-[300px] -translate-x-[600px] rotate-[-40deg] md:block" style={commonStyle}></div>
      <div className="absolute bottom-[-220px] left-1/2 ml-[-150px] hidden h-[1000px] w-[300px] -translate-x-[-600px] rotate-[40deg] md:block" style={commonStyle}></div>
    </>
  );
};

export default GradientBackground;