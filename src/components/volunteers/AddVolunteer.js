import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createVolunteer } from "../../redux/volunteersSlice";
import { useNavigate, Link } from "react-router-dom";
const AddVolunteer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    skills: "",
    availability: "",
    areasOfInterest: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const volunteerData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      areasOfInterest: formData.areasOfInterest
        .split(",")
        .map((area) => area.trim())
    };
    dispatch(createVolunteer(volunteerData));
    // Reset the form after submission
    setFormData({
      name: "",
      contact: "",
      skills: "",
      availability: "",
      areasOfInterest: ""
    });
    navigate("/volunteers");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-5">Add a New Volunteer</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-light p-5 border rounded shadow-lg"
      >
        {/* Name Field */}
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="name">
            Name
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            id="name"
            name="name"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Contact Field */}
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="contact">
            Contact
          </label>
          <input
            value={formData.contact}
            onChange={handleChange}
            className="form-control"
            id="contact"
            name="contact"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        {/* Skills Field */}
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="skills">
            Skills (comma-separated)
          </label>
          <input
            value={formData.skills}
            onChange={handleChange}
            className="form-control"
            id="skills"
            name="skills"
            placeholder="Photography, Teaching"
            required
          />
        </div>

        {/* Availability Field */}
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="availability">
            Availability
          </label>
          <input
            value={formData.availability}
            onChange={handleChange}
            className="form-control"
            id="availability"
            name="availability"
            placeholder="Mondays & Wednesdays"
            required
          />
        </div>

        {/* Areas of Interest Field */}
        <div className="form-group">
          <label className="font-weight-bold" htmlFor="areasOfInterest">
            Areas of Interest (comma-separated)
          </label>
          <input
            value={formData.areasOfInterest}
            onChange={handleChange}
            className="form-control"
            id="areasOfInterest"
            name="areasOfInterest"
            placeholder="Environment, Education"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary btn-lg" type="submit">
            Add Volunteer
          </button>
          <button>
            <Link to="/volunteers" className="btn btn-danger btn-lg">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteer;
