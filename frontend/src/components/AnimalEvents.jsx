import React from "react";
import styles from "./AnimalEvents.module.css";
import {format} from "date-fns";

const AnimalEvents = ({ events }) => {
    // If no events are available, show a message
    if (events.length === 0) {
        return <p>No events found for this animal.</p>;
    }

    // Readable date format
    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMMM d, yyyy");
    };

    // Render a list of events
    return (
        <ul className={styles.eventList}>
            {events.map((event) => (
                <li key={event.id} className={styles.eventItem}>
                    <p><strong>Type:</strong> {event.type}</p> {/* Event type */}
                    <p><strong>Description:</strong> {event.description}</p> {/* Event description */}
                    <p><strong>Date:</strong> {formatDate(event.event_date)}</p> {/* Event date */}
                </li>
            ))}
        </ul>
    );
};

export default AnimalEvents;
