import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals, addAnimal } from "../redux/animalsSlice";
import { Link } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import AddAnimalModal from "../components/AddAnimalModal";
import styles from "./Home.module.css";

const Home = () => {
    const dispatch = useDispatch();
    const { animals, loading, error } = useSelector((state) => state.animals);

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAnimals());
    }, [dispatch]);

    const handleAddAnimal = (formData) => {
        dispatch(addAnimal(formData));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Animal List</h1>

            <button onClick={() => setModalOpen(true)} className={styles.addButton}>
                Add Animal
            </button>

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
                            name={animal.name}
                            species={animal.species}
                            age={calculateAge(animal.birth_date)}
                        />
                    </Link>
                ))}
            </div>

            <AddAnimalModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddAnimal={handleAddAnimal}
            />
        </div>
    );
};

const calculateAge = (birthDate) => {
    const ageDifMs = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default Home;
