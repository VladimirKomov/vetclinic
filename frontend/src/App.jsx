import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import AnimalDetails from "./components/AnimalDetails";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/animals/:id" element={<AnimalDetails />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App
