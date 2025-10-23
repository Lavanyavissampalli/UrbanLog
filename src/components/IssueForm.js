import React, { useState } from "react";
import axios from "axios";

function IssueForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    image: null
  });

  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("latitude", form.latitude);
    data.append("longitude", form.longitude);
    if (form.image) {
      data.append("image", form.image);
    }
    try {
      await axios.post("http://localhost:5000/api/issues", data);
      setMessage("Issue reported!");
      setForm({ title: "", description: "", latitude: "", longitude: "", image: null });
    } catch (err) {
      setMessage("Error submitting issue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "24px auto" }}>
      <h2>Report Issue</h2>
      <input
        required
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        required
        type="number"
        step="any"
        name="latitude"
        placeholder="Latitude"
        value={form.latitude}
        onChange={handleChange}
      />
      <input
        required
        type="number"
        step="any"
        name="longitude"
        placeholder="Longitude"
        value={form.longitude}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
      />
      <button type="submit" style={{ marginTop: 10 }}>Submit Issue</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default IssueForm;
