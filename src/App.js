import AddEvent from "./components/events/AddEvents";
import EditEvent from "./components/events/EditEvents";
import ListEvent from "./components/events/ListEvents";
import NavigationBar from "./components/shared/Header";
import HomePage from "./components/shared/Homepage";
import AddVolunteer from "./components/volunteers/AddVolunteer";
import EditVolunteer from "./components/volunteers/EditVolunteer";
import ListVolunteers from "./components/volunteers/ListVolunteer";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<ListEvent />} />
        <Route path="/event/add" element={<AddEvent />} />
        <Route path="/event/edit/:eventID" element={<EditEvent />} />
        <Route path="/volunteers" element={<ListVolunteers />} />
        <Route path="/volunteers/add" element={<AddVolunteer />} />
        <Route
          path="/volunteers/edit/:volunteerID"
          element={<EditVolunteer />}
        />
      </Routes>
    </div>
  );
}
