import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [filterCars, setFilterCars] = useState([]);
  const [name, setName] = useState("");
  const [mark, setMark] = useState("");
  const [model, setModel] = useState("");
  const [series, setSeries] = useState("");
  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");

  var APICallString = "http://localhost:4000/query?";
  useEffect(() => {
    handleCheckboxParams();
  }, []);

  // search function
  const searchForPlayer = async (query) => {
    let searchQuery = "";
    searchQuery += searchText;
    console.log("sorgu", searchText);
    if (searchQuery) searchQuery += "&name=" + searchText;
    await axios.get(APICallString + query + searchQuery).then(function (res) {
      setFilterCars([...res.data]);
    });
  };

  // checkbox control
  const handleCheckboxParams = (checkbox) => {
    let queryString = "";
    console.log("a3", checkbox);
    document.querySelectorAll("input[type=checkbox]").forEach((e) => {
      if (e.checked == true) queryString += e.value + "=" + e.name + "&";
      console.log("kontrol", e.checked);
    });
    console.log("Query URL:", queryString);
    searchForPlayer(queryString);
  };

  // Send data
  const sendInputData = () => {
    var datasend = axios.post("http://localhost:4000/", {name, mark, model, series, image, country})
    // var datasend = axios.get(
    //   `http://localhost:4000/add?name=${name}&mark=${mark}&model=${model}&series=${series}&image=${image}&country=${country}&`,
    //   { name, mark, model, series, image, country }
    // );
    console.log(name, mark, model, series, image, country, datasend);
  };

  return (
    <div className="App">
      <div className="Container">
        <input
          type="text"
          onChange={(e) => (setSearchText(e.target.value), searchForPlayer(e))}
        ></input>
        {/* <button onClick={(e) => searchForPlayer(e)}>Search</button> */}
        <input
          type="checkbox"
          name="Porsche"
          value="mark"
          onChange={(e) => handleCheckboxParams(e.target.name)}
        />
        Porsche
        <input
          type="checkbox"
          name="Bugatti"
          value="mark"
          onChange={(e) => handleCheckboxParams(e.target.name)}
        />
        Bugatti
        <input
          type="checkbox"
          name="Tesla"
          value="mark"
          onChange={(e) => handleCheckboxParams(e.target.name)}
        />
        Tesla
      </div>
      {JSON.stringify(filterCars) !== "{}" ? (
        <>
          <p>{filterCars.name}</p>
          {filterCars.map((x) => (
            <div>
              <img src={x.image} alt="Image" />
              <h6>{x.mark + " " + x.model + " " + x.series}</h6>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No Data</p>
        </>
      )}
      <div>
        Full Name:{" "}
        <input type="textbox" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        Mark: <input type="textbox" onChange={(e) => setMark(e.target.value)} />
      </div>
      <div>
        Model:{" "}
        <input type="textbox" onChange={(e) => setModel(e.target.value)} />
      </div>
      <div>
        Series:{" "}
        <input type="textbox" onChange={(e) => setSeries(e.target.value)} />
      </div>
      <div>
        Image URL:{" "}
        <input type="textbox" onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        Country: {" "}
        <select
          class="custom-select"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option selected>Choose...</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United State</option>
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
        </select>
      </div>
      <div>
        <button onClick={(e) => sendInputData(e)}>Add</button>
      </div>
    </div>
  );
}

export default App;
