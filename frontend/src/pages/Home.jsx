import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Smart Resume Matcher</h1>
        <p className="small">
          Upload your resume and paste a job description — the backend will
          analyze and save matches to your account.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link className="link" to="/register">
            Get Started — Register
          </Link>
        </div>
      </div>
    </div>
  );
}
