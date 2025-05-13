import React, { useEffect, useState } from "react";
import { event, users } from "../utils/axios"; // Assuming `users.get('/:id')` works
import "./crops.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [farmerNames, setFarmerNames] = useState({}); // Store fetched names by ID

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await event.get("/");
        const eventList = response.data.results;

        setEvents(eventList);

        // Extract all unique farmer IDs
        const uniqueFarmerIds = [
          ...new Set(
            eventList
              .filter((e) => e.farmerId)
              .map((e) => e.farmerId.toString())
          ),
        ];

        // Fetch farmer names by ID
        const namePromises = uniqueFarmerIds.map(async (id) => {
          try {
            const res = await users.get(`/${id}`);
            return { id, name: res.data.name }; // Adjust according to your API
          } catch (err) {
            console.error("Failed to fetch user with ID:", id);
            return { id, name: "Unknown" };
          }
        });

        const nameResults = await Promise.all(namePromises);
        const namesMap = {};
        nameResults.forEach(({ id, name }) => {
          namesMap[id] = name;
        });

        setFarmerNames(namesMap);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>No events found.</p>;

  return (
    <div className="crop-container">
      <h2 className="crop-heading">Upcoming Events</h2>
      <div className="crop-grid">
        {events.map((event) => (
          <div key={event._id} className="crop-card">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1471&q=80"
              alt={event.eventName}
              className="crop-img"
            />
            <div className="crop-info">
              <h3>{event.eventName}</h3>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Farmer:</strong>{" "}
                {farmerNames[event.farmerId] || "Loading..."}
              </p>
              <p>
                Email Us at{" "}
                <a style={{ color: "green" }} href={`mailto:${event.email}`}>
                  {event.email}
                </a>{" "}
                for more details.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
