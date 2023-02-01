import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    artist: "",
    rate: "",
    streams: "",
    payout_complete: 0
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ artist: "", rate: "", streams: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Add New Artist</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            className="form-control"
            id="artist"
            value={form.artist}
            onChange={(e) => updateForm({ artist: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate</label>
          <input
            type="text"
            className="form-control"
            id="rate"
            value={form.rate}
            onChange={(e) => updateForm({ rate: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="streams">Streams</label>
          <input
            type="text"
            className="form-control"
            id="streams"
            value={form.streams}
            onChange={(e) => updateForm({ streams: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="payout_amount">Payout Amount:</label>
          <input
            type="text"
            className="form-control"
            id="payout_amount"
            value={form.streams * form.rate}
            onChange={(e) => updateForm({ payout_amount: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="payout_complete">Payout Complete: </label>
          <input
            type="checkbox"
            checked={form.payout_complete}
            id="payout_complete"
            onChange={(e) => updateForm({ payout_complete: !form.payout_complete })}
          />
        </div>
      
        <div className="form-group">
          <input
            type="submit"
            value="Add artist"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
