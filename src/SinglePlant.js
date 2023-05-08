import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePlant = () => {
    const location = useLocation();
    const { id } = location.state;
    const [singlePlant, setSinglePlant] = useState([]);

    useEffect(() => {
        const fetchSinglePlant = async () => {
            try {
                const { data } = await axios.get(
                    `https://house-plants2.p.rapidapi.com/id/${id}`,
                    {
                        headers: {
                            'X-RapidAPI-Key': '1d503dcaf6msh16e5c9388202823p113234jsn88390c1130e4',
                            'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
                        }
                    }
                );
                setSinglePlant(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSinglePlant();
    }, []);

    console.log(singlePlant);

    return (
        <>
            <h3>Plant Name: {singlePlant['Common name']}</h3>
            <img src={singlePlant.Img} alt={singlePlant['Common name']} />
            <p>Latin Name: {singlePlant['Latin name']}</p>
            <p>Family: {singlePlant.Family}</p>
            <p>Category: {singlePlant.Categories}</p>
            <p>Origin: {singlePlant.Origin}</p>
            <p>Growth: {singlePlant.Growth}</p>
            <p>Light Ideal: {singlePlant['Light ideal']}</p>
            <p>Light Tolerated: {singlePlant['Light tolered']}</p>
            <p>Pruning: {singlePlant.Pruning}</p>
            <p>Watering: {singlePlant.Watering}</p>
            <p>Other names: {singlePlant['Other names']}</p>
            <p>Disease: {singlePlant.Disease}</p>
        </>
    );
};

export default SinglePlant;
