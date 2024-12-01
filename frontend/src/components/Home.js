import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals } from "../redux/animalsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { animals, loading, error } = useSelector((state) => state.animals);

    useEffect(() => {
        dispatch(fetchAnimals());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Animals</h1>
            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>{animal.name} - {animal.species}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
