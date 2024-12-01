import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals, addAnimal } from "../redux/animalsSlice";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import AddAnimalModal from "../components/AddAnimalModal";
import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch(); // Redux dispatch
    const { animals, loading, error } = useSelector((state) => state.animals); // Select animals state

    const [isModalOpen, setModalOpen] = useState(false); // State for managing the modal

    useEffect(() => {
        // Fetch the list of animals on component mount
        dispatch(fetchAnimals());
    }, [dispatch]);

    // Handle adding a new animal
    const handleAddAnimal = (formData) => {
        dispatch(addAnimal(formData));
    };

    // Render loading or error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Animal List</h1>

            {/* Button to open the modal for adding an animal */}
            <button onClick={() => setModalOpen(true)} className={styles.addButton}>
                Add Animal
            </button>

            {/* Display a list of animal cards */}
            <div className={styles.animalList}>
                {animals.map((animal) => (
                    <Link
                        to={`/animals/${animal.id}`}
                        key={animal.id}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <AnimalCard
                            name={animal.name} // Animal name
                            species={animal.species} // Animal species
                            age={calculateAge(animal.birth_date)} // Calculate and display animal age
                        />
                    </Link>
                ))}
            </div>

            {/* Modal for adding a new animal */}
            <AddAnimalModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddAnimal={handleAddAnimal}
            />
        </div>
    );
};

// Helper function to calculate an animal's age from its birth date
const calculateAge = (birthDate) => {
    const ageDifMs = Date.now() - new Date(birthDate).getTime(); // Difference in milliseconds
    const ageDate = new Date(ageDifMs); // Convert to a date object
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age in years
};

export default Home;
