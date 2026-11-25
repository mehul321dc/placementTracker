
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications, saveApplications, useApplications } from "../data/applications";

function Applications() {
  const navigate = useNavigate();
  const applications = useApplications();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => applications.filter((item) => {
    const matchesSearch = `${item.company} ${item.role}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || item.status === status;
    const matchesType = type === "All" || item.type === type;
    return matchesSearch && matchesStatus && matchesType;
  }), [applications, search, status, type]);

  const removeApplication = (id) => {
    saveApplications(getApplications().filter((item) => item.id !== id));
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>All Applications</h3>
          <p>Manage your placement and internship applications.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/applications/new")}
        >
          + Add Application
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-icon">▤</div>
          <h3>No applications yet</h3>
          <p>Add your first placement opportunity to start tracking your journey.</p>
          <button className="primary-btn" onClick={() => navigate("/applications/new")}>Add Application</button>
        </div>
      ) : (
        <>
          <div className="application-toolbar">
            <input
              className="search-input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company or role..."
              aria-label="Search applications"
            />
            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
              <option>All</option>
              <option>Applied</option>
              <option>OA</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter by type">
              <option>All</option>
              <option>Full-time</option>
              <option>Internship</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-dashboard">
              <h3>No matching applications</h3>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            <div className="application-table-wrap">
              <table className="application-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      <td><button className="table-link" onClick={() => navigate(`/applications/${item.id}`)}>{item.company}</button></td>
                      <td>{item.role}</td>
                      <td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                      <td>{item.type}</td>
                      <td>{item.deadline || "—"}</td>
                      <td>
                        <div className="table-actions">
                          <button onClick={() => navigate(`/applications/${item.id}/edit`)}>Edit</button>
                          <button className="delete-action" onClick={() => removeApplication(item.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Applications;
