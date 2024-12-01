import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import Home from "./components/Home";
import AnimalDetails from "./components/AnimalDetails";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
    return (
        // redux store
        <Provider store={store}>
            {/*react router*/}
            <Router>
                <Routes>
                    {/*paths are relative to the root of the application*/}
                    <Route path="/" element={<Home />} />
                    <Route path="/animals/:id" element={<AnimalDetails />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App
