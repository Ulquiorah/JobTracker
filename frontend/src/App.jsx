import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/style.css'
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Profil from "./pages/Profil";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics/>} />
            <Route path="/profil" element={<Profil/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}