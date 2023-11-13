import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateEvent, fetchAllEvents } from "../../redux/eventSlice";

const EditEvent = () => {
  const { eventID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state) =>
    state.events.find((e) => e._id === eventID)
  );

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "",
    volunteerRoles: ""
  });

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.eventName,
        date: event.date.split("T")[0], // Format the date to "YYYY-MM-DD"
        location: event.location,
        description: event.description,
        volunteerRoles: event.volunteerRoles.join(", ")
      });
    } else {
      dispatch(fetchAllEvents()); // Fetch events if not available
    }
  }, [event, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...formData,
      volunteerRoles: formData.volunteerRoles
        .split(",")
        .map((role) => role.trim())
    };
    dispatch(updateEvent({ eventID, eventData: updatedEvent }));
    navigate("/events"); // Adjust to your route path
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-primary text-center mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="form-group mb-3">
              <label htmlFor="eventName" className="font-weight-bold">
                Event Name
              </label>
              <input
                className="form-control"
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="Event Name"
                required
              />
            </div>

            {/* Date */}
            <div className="form-group mb-3">
              <label htmlFor="date" className="font-weight-bold">
                Date
              </label>
              <input
                className="form-control"
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="form-group mb-3">
              <label htmlFor="location" className="font-weight-bold">
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group mb-3">
              <label htmlFor="description" className="font-weight-bold">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Event description"
                required
              />
            </div>

            {/* Volunteer Roles */}
            <div className="form-group mb-3">
              <label htmlFor="volunteerRoles" className="font-weight-bold">
                Volunteer Roles
              </label>
              <input
                className="form-control"
                type="text"
                id="volunteerRoles"
                name="volunteerRoles"
                value={formData.volunteerRoles}
                onChange={handleChange}
                placeholder="Role 1, Role 2, ..."
              />
            </div>

            {/* Update Button */}
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-lg mr-2" type="submit">
                Update Event
              </button>
              <Link to="/events" className="btn btn-danger btn-lg">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
