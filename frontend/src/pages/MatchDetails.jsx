import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    fetchMatches(1);
  }, []);

  async function fetchMatches(p = 1) {
    try {
      const res = await api.get(`/matches?page=${p}&limit=10`);
      setMatches(res.data.data);
      setMeta(res.data.meta);
      setPage(p);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load matches");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) {
      toast.error("Please upload a resume and paste a job description");
      return;
    }

    const form = new FormData();
    form.append("resume", resumeFile);
    form.append("jobDescription", jobDescription);
    form.append("saveResume", "true"); // optional

    try {
      setLoading(true);
      const res = await api.post("/match", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const savedMatch = res.data.match;
      toast.success("Match saved");
      // prepend to current list for immediate UX
      setMatches((prev) => [savedMatch, ...(prev || [])]);
      setJobDescription("");
      setResumeFile(null);
      // refresh meta by fetching page 1 (optional)
      fetchMatches(1);
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data?.error || "Failed to create match");
    } finally {
      setLoading(false);
    }
  }

  function onFile(e) {
    const f = e.target.files?.[0];
    if (f) setResumeFile(f);
  }

  return (
    <div className="container">
      <div className="space-between" style={{ marginBottom: 12 }}>
        <div>
          <h2>Welcome, {user?.name || user?.email}</h2>
          <div className="small">
            Create a resume match or view your history
          </div>
        </div>
        <div>
          <button
            className="logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Match a Resume</h3>
        <form onSubmit={handleSubmit}>
          <label>Resume (PDF)</label>
          <input type="file" accept="application/pdf" onChange={onFile} />

          <label>Job Description</label>
          <textarea
            rows="6"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button className="btn" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze & Save"}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="space-between">
          <h3>Your Matches</h3>
          <div className="small">Total: {meta?.total ?? "—"}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          {(!matches || matches.length === 0) && (
            <div className="small">No matches yet.</div>
          )}

          {matches.map((m) => (
            <div
              key={m._id}
              className="match-item"
              onClick={() => navigate(`/matches/${m._id}`)}
            >
              <div className="row">
                <div style={{ flex: 1 }}>
                  <strong>Score: {m.score ?? "—"}</strong>
                  <div className="small">
                    {m.jobDescription?.slice(0, 120) || "—"}
                  </div>
                </div>
                <div style={{ minWidth: 140, textAlign: "right" }}>
                  <div className="small">
                    {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              disabled={page <= 1}
              onClick={() => fetchMatches(page - 1)}
            >
              Prev
            </button>
            <button
              className="btn"
              disabled={!meta || page * meta.limit >= meta.total}
              onClick={() => fetchMatches(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
