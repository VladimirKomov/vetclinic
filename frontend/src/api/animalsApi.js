import axios from "axios";

const API_BASE_URL = "http://api/animals";

// get a list if animals
export const fetchAnimalsApi = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

// get animals with events
export const fetchAnimalDetailsApi = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// create an animal
export const addAnimalApi = async (animal) => {
    const response = await axios.post(API_BASE_URL, animal);
    return response.data;
};

// create an event for the animal
export const addAnimalEventApi = async (id, event) => {
    const response = await axios.post(`${API_BASE_URL}/${id}/events`, event);
    return response.data;
};
