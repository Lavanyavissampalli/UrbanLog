import React, { useEffect, useState } from "react";
import axios from "axios";

function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <h2>Reported Issues</h2>
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {issues.map(issue => (
            <li
              key={issue.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16
              }}
            >
              <h3>
                {issue.title} <span style={{ fontWeight: "normal", color: "#888" }}>[{issue.status}]</span>
              </h3>
              <p>{issue.description}</p>
              {issue.image && (
                <img
                  src={`http://localhost:5000/uploads/${issue.image}`}
                  alt={issue.title}
                  style={{ maxWidth: 200, marginBottom: 8 }}
                />
              )}
              <p>Lat: {issue.latitude}, Lng: {issue.longitude}</p>
              <p>
                Created At:{" "}
                {new Date(
                  typeof issue.created_at === "number"
                    ? issue.created_at
                    : Date.parse(issue.created_at)
                ).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IssueList;
