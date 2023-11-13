import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents } from "../../redux/eventSlice.js";
import { fetchAllVolunteers } from "../../redux/volunteersSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();

  const volunteers = useSelector((state) => state.volunteers);
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchAllVolunteers());
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Side - Volunteers */}
        <div className="col-md-7">
          <h2 className="text-primary mb-4">Volunteers</h2>
          {volunteers.map((volunteer) => (
            <div key={volunteer._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{volunteer.name}</h5>
                <p>
                  <strong>Contact:</strong> {volunteer.contact}
                </p>
                {/* You can add more details here */}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Event Summaries */}
        <div className="col-md-5">
          <h2 className="text-primary mb-4">Events</h2>
          {events.map((event) => (
            <div key={event._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{event.eventName}</h5>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                {/* You can add more event details here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
