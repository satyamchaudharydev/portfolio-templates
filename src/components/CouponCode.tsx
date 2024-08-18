import React from 'react';
import { motion } from 'framer-motion';

const CouponCode = ({handleClick, code}: {handleClick: () => void, code: string} ) => {
 
  return (
    <div className="flex justify-center items-center">
      <div className="flex">
        <motion.div
          className="bg-transparent text-white font-bold py-2 px-3 flex items-center rounded-l   border border-white border-dashed text-base"
        >
          {code}
        </motion.div>
        <motion.button
          className="bg-white text-primary font-semibold py-2 px-3 hover:bg-gray-100 rounded-r  transition-colors duration-200"
          onClick={() => handleClick()}
        >
          USE CODE
        </motion.button>
      </div>
    </div>
  );
};

export default CouponCode;