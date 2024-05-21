import React, { useState } from "react";
import axios from "axios";
// import DropdownMenu from "./Dropdown";
// import Home from "./Home"
// import "./Create.css"; // Import CSS file for styling

const Create = (props) => {
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  // const [color, setColor] = useState("");
  const [address, setAddress] = useState("");
  // const [selectedSvg, setSelectedSvg] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // State for selected color

  axios.defaults.withCredentials = true;
  // const isValidDate = (inputDate) => {
  //   // Check if the input string matches the format MM/DD/YY
  //   const regex = /^\d{2}\/\d{2}\/\d{2}$/;
  //   if (!regex.test(inputDate)) {
  //     return false; // Return false if the format is incorrect
  //   }
  
  //   // Check if the parsed date is valid
  //   const formattedDate = formatDate(inputDate);
  //   return formattedDate !== 'Invalid Date'; // Return true if the formatted date is not 'Invalid Date'
  // };
  
  const handleAdd = () => {
    // Check if the date format is incorrect

    // if (!isValidDate(date)) {
    //   alert("Please enter a valid date in MM/DD/YY format");
    //   return;
    // } 

  
    // use local host for this one
    axios.post("http://localhost:5173/add", { date, task, color: selectedColor, address })
      .then((result) => {
        console.log(result.data);
        location.reload(result);
      })
      .catch((err) => console.log(err));
    }
  

  
  // const handleSvgSelection = (svg) => {
  //   setSelectedSvg(svg);
  // };

  const handleNameChange = (e) => {
    setTask(e.target.value)
  }

  // Function to handle color selection
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="create-container">
      <input
        type="text"
        name=""
        placeholder="Enter Date MM/DD/YY"
        className="text"
        onChange={(e) => setDate(e.target.value)}
      />
      {/* <input
        type="text"
        name=""
        placeholder="Enter Name"
        className="text"
        onChange={(e) => setTask(e.target.value)}
      /> */}

      <select 
        value={task} 
        onChange={handleNameChange}
        className="text"
      >
        <option value="">Select Name</option>
        <option className="matthew" value="Matthew">Matthew</option>
        <option className="frances" value="Frances">Frances</option>

        {/* className={todo.done ? "line_through" : ""} */}
      </select>


      {/* Replace input for color with dropdown */}
      <select
        value={selectedColor}
        onChange={handleColorChange}
        className="text"
      >
        <option className="" value="">Select Color</option>
        <option className="yellow" value="yellow">Yellow</option>
        <option className="red" value="red">Red</option>
        <option className="gray" value="gray">Gray</option>
        <option className="blue" value="blue">Blue</option>
        <option className="black" value="black">Black</option>
        <option className="green" value="green">Green</option>
        <option className="orange" value="orange">Orange</option>
        <option className="white" value="white">White</option>

        {/* Add more options as needed */}
      </select>

      <input
        type="text"
        name=""
        className="text"
        placeholder="Enter location"
        onChange={(e) => setAddress(e.target.value)}
      />
      {/* <DropdownMenu handleSvgSelection={handleSvgSelection} /> */}
      <button type="button" className="btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Create;

