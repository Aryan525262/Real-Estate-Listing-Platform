import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
   const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();
    const handleLocation = ()=>{
      if(inputValue.trim()){
        navigate("/residencies",{state: {location: inputValue}});
      }
    }
    const handleClick = (e)=>{
      console.log(e.target.value)
      setInputValue(e.target.value);
    }
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        style={{color:"black"}}
        placeholder="Search by title/city/country..."
        type="text"
        value={inputValue}
        onChange={handleClick}
      />
      <button className="button" onClick={handleLocation}>Search</button>
    </div>
  );
};

export default SearchBar;