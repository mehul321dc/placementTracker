
import { useNavigate } from "react-router-dom";
import { useApplications } from "../data/applications";

function Dashboard() {
  const navigate = useNavigate();
  const applications = useApplications();
  const countStatus = (status) => applications.filter((item) => item.status === status).length;
  const stats = [
    { title: "Total Applications", value: String(applications.length).padStart(2, "0"), change: "All tracked opportunities", icon: "▦", color: "blue" },
    { title: "Applied", value: String(countStatus("Applied")).padStart(2, "0"), change: "Applications submitted", icon: "◷", color: "purple" },
    { title: "Interviews", value: String(countStatus("Interview")).padStart(2, "0"), change: "Interview in progress", icon: "◉", color: "orange" },
    { title: "Offers", value: String(countStatus("Offer")).padStart(2, "0"), change: "Congratulations!", icon: "✓", color: "green" }
  ];
  const journey = [
    ["Applied", countStatus("Applied"), "blue"],
    ["Online Assessment", countStatus("OA"), "purple"],
    ["Interview", countStatus("Interview"), "orange"],
    ["Offer", countStatus("Offer"), "green"],
    ["Rejected", countStatus("Rejected"), "red"]
  ];
  const recentApplications = applications.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="welcome-row">
        <div>
          <h1>Welcome back, Mehul! 👋</h1>
          <p>Here's what's happening with your placement journey.</p>
        </div>

        <button className="primary-btn" onClick={() => navigate("/applications/new")}>
          + Add Application
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div className="stat-card" key={item.title}>
            <div className={`stat-icon ${item.color}`}>{item.icon}</div>
            <p>{item.title}</p>
            <h2>{item.value}</h2>
            <span>{item.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Application Overview</h3>
              <p>Track your placement progress</p>
            </div>
            <span className="period-tag">All time</span>
          </div>

          <div className="chart-placeholder">
            <div className="chart-bars">
              {[
                countStatus("Applied"),
                countStatus("OA"),
                countStatus("Interview"),
                countStatus("Offer"),
                countStatus("Rejected")
              ].map((count, index) => (
                <div className="chart-column" key={index}>
                  <div style={{ height: `${applications.length ? Math.max(12, (count / applications.length) * 100) : 12}%` }}></div>
                  <span>{["Applied", "OA", "Interview", "Offer", "Rejected"][index]}</span>
                </div>
              ))}
            </div>
            <p>Status distribution preview</p>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Placement Journey</h3>
              <p>Application status distribution</p>
            </div>
          </div>

          <div className="journey-list">
            {journey.map(([name, count, color]) => (
              <div className="journey-item" key={name}>
                <span className={`dot ${color}`}></span>
                <span>{name}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel recent-panel">
        <div className="panel-heading">
          <div>
            <h3>Recent Applications</h3>
            <p>Your latest placement opportunities</p>
          </div>
          <button className="text-btn" onClick={() => navigate("/applications")}>
            View all →
          </button>
        </div>

        {recentApplications.length === 0 ? (
          <div className="empty-dashboard">
            <div className="empty-icon">▤</div>
            <h3>No applications yet</h3>
            <p>Add your first opportunity to start tracking your placement journey.</p>
            <button className="primary-btn" onClick={() => navigate("/applications/new")}>
              Add your first application
            </button>
          </div>
        ) : (
          <div className="recent-list">
            {recentApplications.map((item) => (
              <button className="recent-item" key={item.id} onClick={() => navigate(`/applications/${item.id}`)}>
                <div>
                  <strong>{item.company}</strong>
                  <span>{item.role}</span>
                </div>
                <span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
