import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimalDetails, clearSelectedAnimal, addAnimalEvent } from "../redux/animalsSlice";
import AnimalEvents from "../components/AnimalEvents";
import AddEventModal from "../components/AddEventModal";
import styles from "./AnimalDetails.module.css";
import { exportAnimalEventsApi } from "../api/animalsApi";
import { format } from "date-fns";

const AnimalDetails = () => {
    const { id } = useParams(); // Get the animal ID from the URL
    const navigate = useNavigate(); // For navigation
    const dispatch = useDispatch(); // Redux dispatch
    const { selectedAnimal, loading, error } = useSelector((state) => state.animals); // State selectors
    const [isModalOpen, setModalOpen] = useState(false); // State for the modal

    useEffect(() => {
        // Fetch animal details when component mounts
        dispatch(fetchAnimalDetails(id));

        // Clear selected animal when component unmounts
        return () => {
            dispatch(clearSelectedAnimal());
        };
    }, [dispatch, id]);

    // Handle adding a new event
    const handleAddEvent = (eventData) => {
        dispatch(addAnimalEvent({ id: selectedAnimal.id, event: eventData }))
            .unwrap()
            .then((newEvent) => {
                console.log("Event successfully added:", newEvent); // Log success
            })
            .catch((error) => {
                console.error("Failed to add event:", error); // Log failure
            });
    };

    // Handle exporting events as an Excel file
    const handleExport = async () => {
        try {
            const fileData = await exportAnimalEventsApi(selectedAnimal.id);

            // Create a temporary URL for the file
            const url = window.URL.createObjectURL(new Blob([fileData]));
            const link = document.createElement("a");
            link.href = url;

            // Set the file name for download
            link.setAttribute("download", `animal_${selectedAnimal.id}_events.xlsx`);

            // Trigger the download and clean up
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting events:", error); // Log error
        }
    };

    // Readable date format
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM d, yyyy");
    };

    // Render loading, error, or no animal found states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedAnimal) return <p>No animal found.</p>;

    return (
        <div className={styles.container}>
            <h1>{selectedAnimal.name} - {selectedAnimal.species}</h1>
            <p><strong>Birth Date:</strong> {formatDate(selectedAnimal.birth_date)}</p>

            {/* Button to open the modal for adding an event */}
            <button
                className={styles.addButton}
                onClick={() => setModalOpen(true)}
            >
                Add Event
            </button>

            {/* Button to export events */}
            <button
                className={styles.exportButton}
                onClick={handleExport}
            >
                Export Events
            </button>

            <h2>Events</h2>

            {/* Display the list of events */}
            <AnimalEvents events={selectedAnimal.events} />

            {/* Modal for adding a new event */}
            <AddEventModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAddEvent={handleAddEvent}
            />
        </div>
    );
};

export default AnimalDetails;
