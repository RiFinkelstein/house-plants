import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPlants = () => {
    const [plants, setPlants] = useState([]);
    const [filteredPlants, setFilteredPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        const fetchPlants = async () => {
            //Get all plants in db -- future, can include pagination
            try {
                const { data } = await axios.get(
                    'https://house-plants2.p.rapidapi.com/all-lite',
                    {
                        headers: {
                            'X-RapidAPI-Key': '1d503dcaf6msh16e5c9388202823p113234jsn88390c1130e4',
                            'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com',
                        },
                    }
                );
                setPlants(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPlants();
    }, []);

    useEffect(() => {
        // Filter plants by category
        if (filterCategory !== '') {
            const filteredByCategory = plants.filter(
                (plant) => plant.category === filterCategory
            );
            setFilteredPlants(filteredByCategory);
        } else {
            setFilteredPlants(plants);
        }
    }, [filterCategory, plants]);

    useEffect(() => {
        // Search plants by Latin name or family
        if (searchTerm !== '') {
            const filteredBySearchTerm = plants.filter(
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

    const handleFilterChange = (event) => {
        setFilterCategory(event.target.value);
    };

    console.log(plants);

    return (
        <div>
            <div>
                <label htmlFor='category'>Filter by Category:</label>
                <select id='category' onChange={handleFilterChange}>
                    <option value=''>All</option>
                    <option value='Ferns'>Ferns</option>
                    <option value='Succulents'>Succulents</option>
                    <option value='Flowering'>Flowering</option>
                </select>
            </div>
            <div>
                <label htmlFor='search'>Search by Latin Name or Family:</label>
                <input
                    type='text'
                    id='search'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Latin Name</th>
                        <th>Family</th>
                        <th>Category</th>
                        <th>Style</th>
                        <th>Growth</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {plants.map((plant) => (
                        <tr key={plant.id}>
                            <td>{plant['Latin name']}</td>
                            <td>{plant.Family}</td>
                            <td>{plant.Categories}</td>
                            <td>{plant.Style}</td>
                            <td>{plant.Growth}</td>
                            <td>
                                <Link to={`/plants/${plant.id}`} state={{ id: plant.id }}>
                                    <button>Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPlants;