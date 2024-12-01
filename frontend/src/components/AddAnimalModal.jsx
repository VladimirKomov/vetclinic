import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./AddAnimalModal.module.css";

const AddAnimalModal = ({ isOpen, onClose, onAddAnimal }) => {
    const [form, setForm] = useState({
        name: "",
        species: "",
        birth_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddAnimal(form);
        setForm({ name: "", species: "", birth_date: "" });
        onClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
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
        document.body
    );
};

export default AddAnimalModal;
