
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplications, saveApplications } from "../data/applications";

function AddApplication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    company: "",
    role: "",
    type: "Full-time",
    package: "",
    deadline: "",
    source: "campus",
    status: "Applied",
    notes: ""
  });

  useEffect(() => {
    if (!id) return;
    const existing = getApplications().find((item) => item.id === id);
    if (existing) setForm(existing);
  }, [id]);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;

    const applications = getApplications();
    if (id) {
      saveApplications(applications.map((item) =>
        item.id === id ? { ...item, ...form, company: form.company.trim(), role: form.role.trim() } : item
      ));
    } else {
      saveApplications([
        {
          ...form,
          id: crypto.randomUUID(),
          company: form.company.trim(),
          role: form.role.trim(),
          createdAt: new Date().toISOString()
        },
        ...applications
      ]);
    }
    navigate("/applications");
  };

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h3>{id ? "Edit Application" : "New Application"}</h3>
          <p>{id ? "Update this placement opportunity." : "Add a company to your placement tracker."}</p>
        </div>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input name="company" value={form.company} onChange={updateField} placeholder="e.g. Google" required />

        <label>Job Role</label>
        <input name="role" value={form.role} onChange={updateField} placeholder="e.g. Software Engineer" required />

        <label>Application Type</label>
        <select name="type" value={form.type} onChange={updateField}>
          <option>Full-time</option>
          <option>Internship</option>
        </select>

        <label>Package / Stipend</label>
        <input name="package" value={form.package} onChange={updateField} placeholder="e.g. 12 LPA" />

        <label>Application Deadline</label>
        <input name="deadline" type="date" value={form.deadline} onChange={updateField} />

        <label>Application Source</label>
        <select name="source" value={form.source} onChange={updateField}>
          <option value="campus">Campus</option>
          <option value="off-campus">Off-campus</option>
          <option value="referral">Referral</option>
        </select>

        <label>Application Status</label>
        <select name="status" value={form.status} onChange={updateField}>
          <option>Applied</option>
          <option>OA</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={updateField} placeholder="Add additional information..." rows="4"></textarea>

        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="primary-btn">
            Save Application
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddApplication;
