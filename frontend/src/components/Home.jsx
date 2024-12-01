import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals, addAnimal } from "../redux/animalsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { animals, loading, error } = useSelector((state) => state.animals);

    const [form, setForm] = useState({
        name: "",
        species: "",
        birth_date: "",
    });

    useEffect(() => {
        dispatch(fetchAnimals());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAnimal(form));
        setForm({ name: "", species: "", birth_date: "" });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Animals</h1>
            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>
                        {animal.name} - {animal.species} - {calculateAge(animal.birth_date)}
                    </li>
                ))}
            </ul>

            <h2>Add a New Animal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </label>
                <label>
                    Species:
                    <input
                        type="text"
                        value={form.species}
                        onChange={(e) => setForm({ ...form, species: e.target.value })}
                    />
                </label>
                <label>
                    Birth Date:
                    <input
                        type="date"
                        value={form.birth_date}
                        onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                    />
                </label>
                <button type="submit">Add Animal</button>
            </form>
        </div>
    );
};

// Helper function to calculate age
const calculateAge = (birthDate) => {
    const ageDifMs = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default Home;
