import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const STATUS_COLORS = { Pending: "#f7b32b", "In Progress": "#6dd47e", Resolved: "#45b6fe" };

function Dashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  const statusCounts = ["Pending", "In Progress", "Resolved"].map(status => ({
    name: status,
    value: issues.filter(issue => issue.status === status).length
  }));

  return (
    <div>
      <h2>Issue Status Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={statusCounts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {statusCounts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Dashboard;
