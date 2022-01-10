import "./App.css";
import Form from "./components/form/Form";
import Success from "./components/form/Success";
import Exist from "./components/form/Exist";

import { BrowserRouter as Router , Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Form />}/>
        <Route path="/success"  element={<Success />}/>
        <Route path="/userExist"  element={<Exist />}/>
      </Routes>
    </Router>
  );
}

export default App;
