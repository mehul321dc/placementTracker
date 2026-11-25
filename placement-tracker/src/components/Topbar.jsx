
import { useLocation } from "react-router-dom";

function Topbar() {
  const location = useLocation();

  const titles = {
    "/": "Dashboard",
    "/applications": "Applications",
    "/applications/new": "Add Application"
  };

  const title = titles[location.pathname] || "Company Details";

  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">Workspace / {title}</p>
        <h2>{title}</h2>
      </div>

      <div className="topbar-right">
        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Open navigation"
          onClick={() => window.dispatchEvent(new Event("placement-toggle-sidebar"))}
        >
          ☰
        </button>
        <div className="date-label">
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        </div>
        <div className="top-avatar">MV</div>
      </div>
    </header>
  );
}

export default Topbar;
