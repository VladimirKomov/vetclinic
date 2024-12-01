import {db} from "../models/db.js";
import {deleteFile, generateExcelFile} from "../utils/excelHelper.js";

// common function for getting animals and event
const getAnimalWithEvents = async (id) => {
    return await db.transaction(async (trx) => {
        // get animal
        const animal = await trx("animals").where({id}).first();
        if (!animal) {
            throw new Error("Животное не найдено");
        }

        // get events for animals
        const events = await trx("events").where({animal_id: id});

        return {animal, events};
    });
};

// Get a list of all the animals
export const getAllAnimals = async (req, res) => {
    try {
        const animals = await db("animals").select("*");
        res.json(animals);
    } catch (err) {
        res.status(500).json({error: "Failed to get animals"});
    }
};

// Add a new animal
export const addAnimal = async (req, res) => {
    const {name, species, birth_date} = req.body;
    try {
        const [id] = await db("animals").insert({name, species, birth_date}).returning("id");
        res.status(201).json({id, message: "Animal added successfully"});
    } catch (err) {
        res.status(500).json({error: "Did not add animal"});
    }
};

// Get animal with events
export const getAnimalById = async (req, res) => {
    const {id} = req.params;

    try {
        // use common function
        const {animal, events} = await getAnimalWithEvents(id);
        res.json({...animal, events});
    } catch (err) {
        if (err.message === "Животное не найдено") {
            res.status(404).json({error: err.message});
        } else {
            res.status(500).json({error: "Ошибка при получении данных"});
        }
    }
};

// Add the event for animal
export const addEvent = async (req, res) => {
    const {id} = req.params;
    const {type, description, event_date} = req.body;

    try {
        const animal = await db("animals").where({id}).first();
        if (!animal) {
            return res.status(404).json({error: "Animal not found"});
        }
        const [eventId] = await db("events")
            .insert({animal_id: id, type, description, event_date})
            .returning("id");
        res.status(201).json({eventId, message: "Event added successfully"});
    } catch (err) {
        res.status(500).json({error: "Did not add event"});
    }
};

// Exporting animal and event data to Excel
export const exportAnimalToExcel = async (req, res) => {
    const {id} = req.params;

    try {
        // common function for getting animals and events
        const {animal, events} = await getAnimalWithEvents(id);

        // generate excel file
        const filePath = await generateExcelFile(animal, events);

        // send file
        res.download(filePath, async (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({error: "Failed to export data"});
            } else {
                // delete file
                await deleteFile(filePath);
            }
        });
    } catch (err) {
        // catch errors
        if (err.message === "Animal not found") {
            res.status(404).json({error: err.message});
        } else {
            console.error("Error exporting data:", err);
            res.status(500).json({error: "Error exporting data"});
        }
    }
};



