import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { link } from 'react-router-dom'

const App = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilteredCatogory] = useState('');
}

useEffect(() => {
  const fetchPlants = async () => {
    try {
      const { data } = await axios.get(
        'https://house-plants2.p.rapidapi.com/all-lite',
        {
          headers: {
            'X-RapidAPI-Key': '1291f87070msh67d2360d8dc5ed4p1009c4jsn55d9e3021249',
            'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com',
          },
        }
      );
      setPlants(data);
      // setFilteredPlants(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchPlants();
}, []);

useEffect(() => {
  //filter plants by catogory
  if (filterCatogory !== '') {
    const filterByCategory = plants.filter(
      (plant) => plant.catogory == filterCategory
    );
    setFilteredPlants(filterByCategory);
  } else {
    setFilteredPlants(plants);
  }
}, [filterCategory, plants]);

useEffect(() => {
  //search plants bt latin name or family
  if (searchTerm !== '') {
    const filteredBySearchTerm = plant.filter(
      (plant) =>
        plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.family.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filteredBySearchTerm);
  } else {
    setFilteredPlants(plants);
  }
}, [searchTerm, plants]);

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const hanfleFilterChange = (event) => {
  setFilteredCatogory(event.target.value);
};

console.log(plants);

return (
  <div>
    <div>
      <label htmlFor='category'> Filter by Category:</label>
      <select id='category' onChange={handleFilterChange}>
        <option value=''>All</option>
        <option value='ferns'>Ferns</option>
        <option value='Succulents'>Succulents</option>
        <option value='Flowering'>Flowering</option>
      </select>
    </div>
    <div>
      <label htmlFor='search'> Search by Lating Name or Family</label>
      <input type='text' id='search' value={searchTerm} onChange={handleSearchChange} />
    </div>
    <table>
      <thead>
        <tr>
          <th>Latin Name</th>
          <th>Family</th>
          <th>Style</th>
          <th>Growth</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {plants.map((plant) => (
          <tr key={plant.id}>
            <td>{plant['latin name']}</td>
            <td>{plant.family}</td>
            <td>{plant.catogories}</td>
            <td>{plant.Style}</td>
            <td>{plant.Growth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export default App;
