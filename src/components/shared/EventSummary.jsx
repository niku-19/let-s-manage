import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllEvents } from "../../redux/eventSlice.js";
import { fetchAllVolunteers } from "../../redux/volunteersSlice";

const EventSummary = () => {
  const dispatch = useDispatch();
  const { eventID } = useParams();

  const events = useSelector((state) => state.events);
  const volunteers = useSelector((state) => state.volunteers);

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchAllVolunteers());
  }, [dispatch]);

  const event = events.find((e) => e._id === eventID);

  if (!event) {
    return <div className="container mt-5">Event not found.</div>;
  }

  const registeredVolunteers = volunteers.filter((volunteer) =>
    event.volunteerRoles.includes(volunteer.role)
  );

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Event Summary</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{event.eventName}</h5>
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <h5 className="card-title">Registered Volunteers</h5>
          <ul>
            {registeredVolunteers.map((volunteer) => (
              <li key={volunteer._id}>{volunteer.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
