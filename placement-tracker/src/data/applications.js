import { useEffect, useState } from "react";

const STORAGE_KEY = "placement-tracker-applications";

export function getApplications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  window.dispatchEvent(new Event("applications-updated"));
}

export function useApplications() {
  const [applications, setApplications] = useState(getApplications);

  useEffect(() => {
    const refresh = () => setApplications(getApplications());
    window.addEventListener("applications-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("applications-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return applications;
}
