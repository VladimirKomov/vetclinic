import { db } from "../models/db.js";

// Get a list of all the animals
export const getAllAnimals = async (req, res) => {
    try {
        const animals = await db("animals").select("*");
        res.json(animals);
    } catch (err) {
        res.status(500).json({ error: "Failed to get animals" });
    }
};

// Add a new animal
export const addAnimal = async (req, res) => {
    const { name, species, birth_date } = req.body;
    try {
        const [id] = await db("animals").insert({ name, species, birth_date }).returning("id");
        res.status(201).json({ id, message: "Animal added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Did not add animal" });
    }
};

// Get animal with events
export const getAnimalById = async (req, res) => {
    const { id } = req.params;
    try {
        const animal = await db("animals").where({ id }).first();
        if (!animal) {
            return res.status(404).json({ error: "Animal not found" });
        }
        const events = await db("events").where({ animal_id: id });
        res.json({ ...animal, events });
    } catch (err) {
        res.status(500).json({ error: "Did not get animal with events" });
    }
};

// Add the event for animal
export const addEvent = async (req, res) => {
    const { id } = req.params;
    const { type, description, event_date } = req.body;

    try {
        const animal = await db("animals").where({ id }).first();
        if (!animal) {
            return res.status(404).json({ error: "Animal not found" });
        }
        const [eventId] = await db("events")
            .insert({ animal_id: id, type, description, event_date })
            .returning("id");
        res.status(201).json({ eventId, message: "Event added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Did not add event" });
    }
};
