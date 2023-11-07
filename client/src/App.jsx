import { Route, Routes } from "react-router-dom";
import Detail from "./views/detail/detail.component";
import Form from "./views/form/form.component";
import Home from "./views/home/home.component";
import LandingPage from "./views/landing/landing.component";

function App() {
  return (
    <div>
      <Routes>
        <Route exat path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<LandingPage />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
