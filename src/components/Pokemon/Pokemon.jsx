import React from "react";
import { Link } from "react-router-dom";

const Pokemon = ({ name, image, id }) => {
  return (
    <div className="shadow-[rgba(247,255,117,0.75)_0px_0px_12px_4px] p-2 ">
      <Link to={`/pokemon/${id}`}>
        <div className="text-white text-center mb-2 font-bold text-2xl capitalize tracking-[5px]"> {name} </div>
        <div className="bg-black w-[300px] h-[300px]">
          <img className="w-[100%] h-[100%] " src={image} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
