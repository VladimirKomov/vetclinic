import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./AddEventModal.module.css";

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
    // State to manage form data for adding a new event
    const [form, setForm] = useState({
        type: "Visit", // Default event type
        description: "", // Event description
        event_date: "", // Event date
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onAddEvent(form); // Pass form data to the parent component
        setForm({ type: "Visit", description: "", event_date: "" }); // Reset form fields
        onClose(); // Close the modal
    };

    // If the modal is not open, render nothing
    if (!isOpen) return null;

    // Render the modal content
    return ReactDOM.createPortal(
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                <h2>Add a New Event</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label>
                        Type:
                        <select
                            value={form.type}
                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                        >
                            <option value="Visit">Visit</option>
                            <option value="Treatment">Treatment</option>
                            <option value="Observation">Observation</option>
                        </select>
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            value={form.event_date}
                            onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                        />
                    </label>
                    <button type="submit" className={styles.submitButton}>
                        Add Event
                    </button>
                </form>
            </div>
        </div>,
        document.body // Render modal as a child of the document body
    );
};

export default AddEventModal;
