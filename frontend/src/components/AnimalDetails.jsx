import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimalDetails, clearSelectedAnimal } from "../redux/animalsSlice";
import { addAnimalEvent } from "../redux/eventsSlice";

const AnimalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedAnimal, loading, error } = useSelector((state) => state.animals);

    const [eventForm, setEventForm] = useState({
        type: "",
        description: "",
        event_date: "",
    });

    useEffect(() => {
        dispatch(fetchAnimalDetails(id));
        return () => {
            dispatch(clearSelectedAnimal());
        };
    }, [dispatch, id]);

    const handleEventSubmit = (e) => {
        e.preventDefault();
        dispatch(addAnimalEvent({ id, event: eventForm }));
        setEventForm({ type: "", description: "", event_date: "" });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedAnimal) return <p>No animal found.</p>;

    return (
        <div>
            <h1>{selectedAnimal.name} - {selectedAnimal.species}</h1>
            <h2>Events</h2>
            <ul>
                {selectedAnimal.events.map((event) => (
                    <li key={event.id}>
                        {event.type} - {event.description} ({event.event_date})
                    </li>
                ))}
            </ul>

            <h3>Add Event</h3>
            <form onSubmit={handleEventSubmit}>
                <label>
                    Type:
                    <select
                        value={eventForm.type}
                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
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
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        value={eventForm.event_date}
                        onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    />
                </label>
                <button type="submit">Add Event</button>
            </form>

            <button onClick={() => navigate(`/animals/${id}/export`)}>
                Export Events to Excel
            </button>
            <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};

export default AnimalDetails;
