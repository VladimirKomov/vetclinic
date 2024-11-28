# **Technical Test: Development of a Veterinary Interface**
 
## **Context**
 
A veterinary clinic needs a simple web application to:  
- Record events for each animal (visits, treatments, observations, etc.).  
- Generate a detailed Excel report for each animal listing all associated events.  
 
---
 
## **Expected Deliverables**
 
- A user interface developed with **Vue.js**.  
- A backend API developed with **Node.js** and **Express**.  
- A relational database (**PostgreSQL** or **MySQL**).  
- A feature to export an animal’s data into an Excel file.  
 
---
 
## **Functional Specifications**
 
### **Main Page**  
- List of animals (name, species, age).  
- Ability to add a new animal (name, species, date of birth).  
 
### **Animal Details**  
- A section to display all events related to an animal.  
- A form to add a new event:  
  - **Event Type**: Visit, Treatment, Observation (dropdown menu).  
  - **Description** (text input).  
  - **Date** (date picker).  
 
### **Export**  
- A button to download an Excel report of the events for a specific animal.  
 
---
 
## **Technical Constraints**
 
### **Frontend**  
- Use **Vue.js 3** (or **Vue 2** if specified).  
- State management with **Pinia** or **Vuex**.  
- Communication with the backend via REST API calls.  
 
### **Backend**  
- Use **Node.js** with **Express**.  
- Set up a relational database with the following tables:  
  - `animals` (id, name, species, birth_date).  
  - `events` (id, animal_id, type, description, event_date).  
- Provide the following REST endpoints:  
  - `GET /animals`: Lists all animals.  
  - `POST /animals`: Adds a new animal.  
  - `GET /animals/:id`: Fetches details of an animal along with its events.  
  - `POST /animals/:id/events`: Adds an event for an animal.  
  - `GET /animals/:id/export`: Generates an Excel file for an animal.  
 
### **Excel Export**  
- Use a library like **exceljs** or **xlsx** on the backend.  
 
---
 
## **Evaluation Criteria**
 
### **Clean and Readable Code**  
- Well-structured project.  
- Use of best practices (**ESLint**, layer separation, etc.).  
 
### **Compliance with Specifications**  
- Complete and functional CRUD features.  
- Operational Excel export.  
 
### **Time Management**  
- **Estimated time for the test**: 6 hours.  
 
---
 
## **Example Tasks to Guide the Candidate**
 
### **Initialization**  
- Set up a Vue.js and Node.js project.  
- Configure a relational database.  
 
### **Frontend**  
- Create a homepage displaying the list of animals.  
- Create a form to add animals and events.  
 
### **Backend**  
- Implement the REST endpoints.  
- Develop the Excel export functionality.  
 
---
 
## **Instructions for the Candidate**
 
- Use a **Bitbucket repository** to store the code.  
- Add a **README file** explaining:  
  - How to install and run the project.  
  - Technical choices made.  
  - Any known limitations.  
 
---
 
**Good luck! 🚀**