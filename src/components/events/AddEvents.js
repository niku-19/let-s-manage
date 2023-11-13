import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../redux/eventSlice";
import { useNavigate, Link } from "react-router-dom";
const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    description: "",
    volunteerRoles: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
      volunteerRoles: formData.volunteerRoles
        .split(",")
        .map((role) => role.trim())
    };
    dispatch(createEvent(eventData));
    setFormData({
      eventName: "",
      date: "",
      location: "",
      description: "",
      volunteerRoles: ""
    });
    navigate("/events");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-primary text-center mb-4">Add a New Event</h2>
          <form onSubmit={handleSubmit}>
            {/* Event Name Field */}
            <div className="form-group mb-3">
              <label htmlFor="eventName" className="font-weight-bold">
                Event Name
              </label>
              <input
                value={formData.eventName}
                onChange={handleChange}
                className="form-control"
                id="eventName"
                name="eventName"
                placeholder="Spring Festival"
                required
              />
            </div>

            {/* Date Field */}
            <div className="form-group mb-3">
              <label htmlFor="date" className="font-weight-bold">
                Date
              </label>
              <input
                value={formData.date}
                onChange={handleChange}
                className="form-control"
                id="date"
                name="date"
                type="date"
                required
              />
            </div>

            {/* Location Field */}
            <div className="form-group mb-3">
              <label htmlFor="location" className="font-weight-bold">
                Location
              </label>
              <input
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                id="location"
                name="location"
                placeholder="Central Park"
                required
              />
            </div>

            {/* Description Field */}
            <div className="form-group mb-3">
              <label htmlFor="description" className="font-weight-bold">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="form-control"
                id="description"
                name="description"
                placeholder="A fun event to celebrate spring!"
                required
              />
            </div>

            {/* Volunteer Roles Field */}
            <div className="form-group mb-3">
              <label htmlFor="volunteerRoles" className="font-weight-bold">
                Volunteer Roles (comma-separated)
              </label>
              <input
                value={formData.volunteerRoles}
                onChange={handleChange}
                className="form-control"
                id="volunteerRoles"
                name="volunteerRoles"
                placeholder="Coordinator, Helper, Security"
              />
            </div>

            {/* Submit Button */}
            {/* Submit and Cancel Buttons */}
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary btn-lg mr-2" type="submit">
                Add Event
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

export default AddEvent;
