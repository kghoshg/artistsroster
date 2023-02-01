import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    artist: "",
    rate: "",
    streams: "",
    payout_complete: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      artist: form.artist,
      rate: form.rate,
      streams: form.streams,
      payout_complete: form.payout_complete
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Artist</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="artist">Artist: </label>
          <input
            type="text"
            className="form-control"
            id="artist"
            value={form.artist}
            onChange={(e) => updateForm({ artist: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate: </label>
          <input
            type="text"
            className="form-control"
            id="rate"
            value={form.rate}
            onChange={(e) => updateForm({ rate: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="streams">Streams: </label>
          <input
            type="text"
            className="form-control"
            id="streams"
            value={form.streams}
            onChange={(e) => updateForm({ streams: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="payout_amount">Payout Amount: </label>
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Artist"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
