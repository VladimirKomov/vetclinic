import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./AddEventModal.module.css";

const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
    const [form, setForm] = useState({
        type: "Visit",
        description: "",
        event_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent(form);
        setForm({ type: "Visit", description: "", event_date: "" });
        onClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
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
        document.body
    );
};

export default AddEventModal;
