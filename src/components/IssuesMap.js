import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function IssuesMap() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div style={{ height: "500px", width: "100%", margin: "24px auto" }}>
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map(issue =>
          issue.latitude && issue.longitude ? (
            <Marker
              key={issue.id}
              position={[issue.latitude, issue.longitude]}
            >
              <Popup>
                <strong>{issue.title}</strong>
                <br />
                {issue.description}
                <br />
                Status: {issue.status}
                {issue.image && (
                  <div>
                    <img src={`http://localhost:5000/uploads/${issue.image}`} alt={issue.title} width={120} />
                  </div>
                )}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

export default IssuesMap;
