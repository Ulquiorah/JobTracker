import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/style.css'
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}