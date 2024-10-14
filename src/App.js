import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./Pages/Home";
import Photo from "./Pages/Photo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="photo/:id" element={<Photo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
