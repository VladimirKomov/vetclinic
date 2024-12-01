import express from "express";
import { getAllAnimals, addAnimal, getAnimalById, addEvent } from "../controllers/animals.js";

const router = express.Router();

router.get("/", getAllAnimals); // All animals
router.post("/", addAnimal); // Add new animal
router.get("/:id", getAnimalById); // Get an animal and its events
router.post("/:id/events", addEvent); // Add an event for animal

export default router;
