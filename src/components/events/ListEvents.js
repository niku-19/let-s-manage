import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents, deleteEvent } from "../../redux/eventSlice";
import { Link } from "react-router-dom";
const ListEvent = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">All Events</h1>
        <Link to="/event/add" className="btn btn-success">
          + Add Event
        </Link>
      </div>

      <div className="grid">
        {events.map((event) => (
          <div key={event._id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-primary">{event.eventName}</h2>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="mb-3">
                <strong>Description:</strong> {event.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Link
                  to={`/event/edit/${event._id}`}
                  className="btn btn-warning mr-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEvent;
