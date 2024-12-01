import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnimalEvent } from "../redux/slices/eventsSlice";

const AddEventForm = ({ animalId }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.events);

    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAnimalEvent({ id: animalId, event: { type, description, event_date: eventDate } }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Visit">Visit</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Observation">Observation</option>
                </select>
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Date:
                <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Event"}
            </button>
        </form>
    );
};

export default AddEventForm;
