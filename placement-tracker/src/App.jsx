
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Application";
import AddApplication from "./pages/AddApplication";
import CompanyDetail from "./pages/CompanyDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/new" element={<AddApplication />} />
            <Route path="/applications/:id" element={<CompanyDetail />} />
            <Route path="/applications/:id/edit" element={<AddApplication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
