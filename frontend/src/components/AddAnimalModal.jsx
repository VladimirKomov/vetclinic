import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./AddAnimalModal.module.css";

const AddAnimalModal = ({ isOpen, onClose, onAddAnimal }) => {
    // State to manage form data for adding a new animal
    const [form, setForm] = useState({
        name: "",
        species: "",
        birth_date: "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onAddAnimal(form); // Pass form data to the parent component
        setForm({ name: "", species: "", birth_date: "" }); // Reset form fields
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
                <h2>Add a New Animal</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
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
                    <button type="submit" className={styles.submitButton}>
                        Add Animal
                    </button>
                </form>
            </div>
        </div>,
        document.body // Render modal as a child of the document body
    );
};

export default AddAnimalModal;
