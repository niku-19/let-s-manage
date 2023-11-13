import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVolunteers,
  createVolunteer,
  deleteVolunteer,
} from "../../redux/volunteersSlice.js";
import { Link } from "react-router-dom";

const ListVolunteers = () => {
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.volunteers);

  useEffect(() => {
    dispatch(fetchAllVolunteers());
  }, [dispatch]);
  const handleDelete = (id) => {
    dispatch(deleteVolunteer(id));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2 className="text-primary">Volunteers</h2>
        <Link to="/volunteers/add" className="btn btn-success">
          <i className="fas fa-plus mr-2"></i> Add Volunteer
        </Link>
      </div>

      <table className="table table-bordered table-striped table-hover">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
              <td>{volunteer.name}</td>
              <td>{volunteer.contact}</td>
              <td>
                <div
                  style={{
                    display: "flex",
                    gap: ".5rem",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    to={`/volunteers/edit/${volunteer._id}`}
                    className="btn btn-sm btn-primary mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(volunteer._id)}
                  >
                    Delete
                  </button>{" "}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListVolunteers;
