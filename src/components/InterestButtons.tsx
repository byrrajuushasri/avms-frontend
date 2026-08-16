"use client";

import {
  FaHeart,
 
} from "react-icons/fa";

export default function InterestButtons() {
  return (
    <div className="mt-10">

      {/* Action Buttons */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {/* Send Interest */}

        <button className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 rounded-xl shadow-lg transition duration-300">
          <FaHeart />
          Send Interest
        </button>

         
         

      </div>

       
         
      </div>

   
  );
}