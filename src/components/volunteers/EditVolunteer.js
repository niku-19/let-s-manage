import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useNavigate, Link } from "react-router-dom";
import {
  updateVolunteer,
  fetchAllVolunteers
} from "../../redux/volunteersSlice.js";

const EditVolunteer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { volunteerID } = useParams();

  const volunteer = useSelector((state) =>
    state.volunteers.find((vol) => vol._id === volunteerID)
  );
  console.log(volunteerID, "volunteerID");
  // Initialize form data with volunteer data or empty default.
  const [formData, setFormData] = useState({
    name: volunteer?.name || "",
    contact: volunteer?.contact || "",
    skills: volunteer?.skills.join(", ") || "",
    availability: volunteer?.availability || "",
    areasOfInterest: volunteer?.areasOfInterest.join(", ") || ""
  });

  useEffect(() => {
    if (volunteer) {
      setFormData({
        name: volunteer.name,
        contact: volunteer.contact,
        skills: volunteer.skills.join(", "),
        availability: volunteer.availability,
        areasOfInterest: volunteer.areasOfInterest.join(", ")
      });
    } else {
      dispatch(fetchAllVolunteers());
    }
  }, [volunteer, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      areasOfInterest: formData.areasOfInterest
        .split(",")
        .map((area) => area.trim())
    };
    dispatch(updateVolunteer({ volunteerID, data: updatedData })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/volunteers");
        } else {
          console.error("Failed to update volunteer: ", result.error);
        }
      }
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-5">Edit Volunteer</h2>
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

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary btn-lg mr-2"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Update Volunteer
          </button>
          <Link to="/volunteers" className="btn btn-danger btn-lg">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditVolunteer;
