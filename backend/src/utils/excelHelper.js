import XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";
import {fileURLToPath} from "url";

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// generate excel file
export const generateExcelFile = async (animal, events) => {
    // generate data for excel
    const animalSheet = [
        {Property: "ID", Value: animal.id},
        {Property: "Name", Value: animal.name},
        {Property: "Species", Value: animal.species},
        {Property: "Birth Date", Value: animal.birth_date},
    ];

    const eventsSheet = events.map((event) => ({
        ID: event.id,
        Type: event.type,
        Description: event.description || "",
        "Event Date": event.event_date,
        "Created At": event.created_at,
        "Updated At": event.updated_at,
    }));

    // create xlsx file
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(animalSheet),
        "Animal Info"
    );
    XLSX.utils.book_append_sheet(
        workbook,
        XLSX.utils.json_to_sheet(eventsSheet),
        "Animal Events"
    );

    // path for temporally file
    const filePath = path.join(
        __dirname,
        `../../exports/animal_${animal.id}.xlsx`
    );

    // save five
    XLSX.writeFile(workbook, filePath);

    return filePath; // path for file
};

// delete temporally file
export const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
        console.log(`Temporary file ${filePath} has been deleted.`);
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
    }
};
