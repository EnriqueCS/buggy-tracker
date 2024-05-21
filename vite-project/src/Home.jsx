import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsFillTrashFill } from "react-icons/bs";
import yellowSvg from "./assets/svg/yellow.svg";
import redSvg from "./assets/svg/red.svg";
import graySvg from "./assets/svg/gray.svg";
import blueSvg from "./assets/svg/blue.svg";
import blackSvg from "./assets/svg/black.svg";
import greenSvg from "./assets/svg/green.svg";
import orangeSvg from "./assets/svg/orange.svg";
import whiteSvg from "./assets/svg/white.svg";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [matthewCount, setMatthewCount] = useState(0); // State for Matthew count
  const [francesCount, setFrancesCount] = useState(0); // State for Frances count


  // use this for localhost version

  // takes the data from the mongoDB cluster
  // const fetchTodos = () => {
  //   axios.get("http://localhost:3001/get")
  //     .then((result) => {
  //       // puts the rows from top to bottom, so that the new ones are at the top
  //       setTodos(result.data.reverse());
  //     })
  //     .catch((err) => console.log(err));
  // };

// use "http://localhost:3001/get/ for mongo compass
  const fetchTodos = () => {
    axios.get("https://buggy-tracker-phi.vercel.app/api/get/")
      .then((result) => {
        // puts the rows from top to bottom, so that the new ones are at the top
        setTodos(result.data.reverse());
      })
      .catch((err) => console.log(err));
  };


// use "http://localhost:3001/delete/ for mongo compass
  const handleDelete = (id) => {
    axios.delete("https://buggy-tracker-phi.vercel.app/api/delete/" + id)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  // displays all the data on the page
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    // Count occurrences of names Matthew and Frances
    const matthewOccurrences = todos.filter(todo => todo.task === "Matthew").length;
    const francesOccurrences = todos.filter(todo => todo.task === "Frances").length;
    // Update state with counts
    setMatthewCount(matthewOccurrences);
    setFrancesCount(francesOccurrences);
  }, [todos]); // Update counts when todos list changes


  // gives the selection for which buggy image will be selected
  const getSvgForTodo = (color) => {
    const svgMap = {
      yellow: yellowSvg,
      red: redSvg,
      gray: graySvg,
      blue: blueSvg,
      black: blackSvg,
      green: greenSvg,
      orange: orangeSvg,
      white: whiteSvg,
    };

    // maps the color from svgMap to the imported svgs
    return svgMap[color] ? <img src={svgMap[color]} className="svg" alt={color} /> : null;
  };


  const formatDate = (dateString) => {
    const dateParts = dateString.split('/'); // Split the string into parts
    const month = parseInt(dateParts[0], 10); // Parse the month
    const day = parseInt(dateParts[1], 10); // Parse the day
    const year = parseInt(dateParts[2], 10); // Parse the year

    // Create a new Date object with the parsed values
    const dateObject = new Date(year + 2000, month - 1, day); // Adjust year by adding 2000 (assuming 2-digit year is from 2000-2099)

    // Format the date
    return dateObject.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };


  return (
    <div className="home">
    {/* takes the state from the set counter */}
      <h2>Matthew: {matthewCount} Buggies🚀</h2>
      <h2>Frances: {francesCount} Buggies🚀</h2>

      <Create onTaskAdded={fetchTodos} />
      {todos.length === 0 ? (
        <div>No Buggies</div>
      ) : (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Name</th>
              <th>Color</th>
              <th>Location</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo._id}>
                <td className="number">{todos.length - index}</td>
                <td className="date">{formatDate(todo.date)}</td>
                {/* <td className="task">{todo.task}</td>
                 */}
                <td className={todo.task === "Matthew" ? "row-matthew" : todo.task === "Frances" ? "row-frances" : ""}>{todo.task}</td>

                <td className="">{getSvgForTodo(todo.color)}</td>
                <td className="">{todo.address}</td>
                <td className="delete">
                  <BsFillTrashFill onClick={() => handleDelete(todo._id)} className="delete-btn" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
