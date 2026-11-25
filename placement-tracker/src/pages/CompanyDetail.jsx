
import { useNavigate, useParams } from "react-router-dom";
import { getApplications } from "../data/applications";

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const application = getApplications().find((item) => item.id === id);

  if (!application) {
    return (
      <section className="panel">
        <h3>Application not found</h3>
        <button className="primary-btn" onClick={() => navigate("/applications")}>Back to Applications</button>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>{application.company}</h3>
          <p>{application.role}</p>
        </div>
        <button className="primary-btn" onClick={() => navigate(`/applications/${id}/edit`)}>Edit Application</button>
      </div>

      <div className="detail-grid">
        <div><span>Status</span><strong>{application.status}</strong></div>
        <div><span>Type</span><strong>{application.type}</strong></div>
        <div><span>Package</span><strong>{application.package || "—"}</strong></div>
        <div><span>Deadline</span><strong>{application.deadline || "—"}</strong></div>
        <div><span>Source</span><strong>{application.source}</strong></div>
      </div>
      <div className="detail-notes">
        <h4>Notes</h4>
        <p>{application.notes || "No notes added."}</p>
      </div>
    </section>
  );
}

export default CompanyDetail;
