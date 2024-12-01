import React from "react";
import styles from "./AnimalEvents.module.css";

const AnimalEvents = ({ events }) => {
    if (events.length === 0) {
        return <p>No events found for this animal.</p>;
    }

    return (
        <ul className={styles.eventList}>
            {events.map((event) => (
                <li key={event.id} className={styles.eventItem}>
                    <p><strong>Type:</strong> {event.type}</p>
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Date:</strong> {event.event_date}</p>
                </li>
            ))}
        </ul>
    );
};

export default AnimalEvents;
