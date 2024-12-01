import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchAnimalDetails, clearSelectedAnimal, addAnimalEvent} from "../redux/animalsSlice";
import AnimalEvents from "../components/AnimalEvents";
import AddEventModal from "../components/AddEventModal";
import styles from "./AnimalDetails.module.css";
import {exportAnimalEventsApi} from "../api/animalsApi.js";

const AnimalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedAnimal, loading, error } = useSelector((state) => state.animals);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAnimalDetails(id));

        return () => {
            dispatch(clearSelectedAnimal());
        };
    }, [dispatch, id]);

    const handleAddEvent = (eventData) => {
        dispatch(addAnimalEvent({ id: selectedAnimal.id, event: eventData }))
            .unwrap()
            .then((newEvent) => {
                console.log("Event successfully added:", newEvent);
            })
            .catch((error) => {
                console.error("Failed to add event:", error);
            });
    };

    const handleExport = async () => {
        try {
            const fileData = await exportAnimalEventsApi(selectedAnimal.id);

            // Creating a temporary URL for uploading a file
            const url = window.URL.createObjectURL(new Blob([fileData]));
            const link = document.createElement("a");
            link.href = url;

            // Setting the file name for the download
            link.setAttribute("download", `animal_${selectedAnimal.id}_events.xlsx`);

            // Add link for DOM
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting events:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedAnimal) return <p>No animal found.</p>;

    return (
        <div className={styles.container}>
            <h1>{selectedAnimal.name} - {selectedAnimal.species}</h1>
            <p><strong>Birth Date:</strong> {selectedAnimal.birth_date}</p>

            <button
                className={styles.addButton}
                onClick={() => setModalOpen(true)}
            >
                Add Event
            </button>

            <button
                className={styles.exportButton}
                onClick={handleExport}
            >
                Export Events
            </button>

            <h2>Events</h2>

            <AnimalEvents events={selectedAnimal.events}/>

            <AddEventModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddEvent={handleAddEvent}
            />

        </div>
    );
};

export default AnimalDetails;
