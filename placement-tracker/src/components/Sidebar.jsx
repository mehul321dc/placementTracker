
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggle = () => setOpen((current) => !current);
    window.addEventListener("placement-toggle-sidebar", toggle);
    return () => window.removeEventListener("placement-toggle-sidebar", toggle);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
    {open && <button className="sidebar-overlay" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <aside className={`sidebar${open ? " open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">P</div>
        <div>
          <h2>Placement</h2>
          <span>TRACKER</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="menu-label">WORKSPACE</p>

        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }>
          <span>▦</span> Dashboard
        </NavLink>

        <NavLink to="/applications" className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }>
          <span>▤</span> Applications
        </NavLink>

        <NavLink to="/applications/new" className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }>
          <span>＋</span> Add Application
        </NavLink>
      </div>

      <div className="sidebar-bottom">
        <div className="help-card">
          <h4>Stay organized!</h4>
          <p>Keep track of every opportunity and never miss a deadline.</p>
        </div>

        <div className="profile">
          <div className="avatar">MV</div>
          <div>
            <strong>Mehul Verma</strong>
            <span>Student Account</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}

export default Sidebar;
