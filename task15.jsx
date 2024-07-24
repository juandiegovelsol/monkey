import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    service: "",
    petName: "",
    dateTime: "",
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState({
    petSitting: [
      { time: "9:00 AM", available: false },
      { time: "10:00 AM", available: true },
      { time: "11:00 AM", available: true },
      // ... more time slots
    ],
    dogWalking: [
      { time: "1:00 PM", available: true },
      { time: "2:00 PM", available: true },
      { time: "3:00 PM", available: true },
      // ... more time slots
    ],
    houseVisit: [
      { time: "5:00 PM", available: true },
      { time: "6:00 PM", available: true },
      { time: "7:00 PM", available: true },
      // ... more time slots
    ],
    // ... time slots for other services
  });

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation logic
    if (!formData.service || !formData.petName || !formData.dateTime) {
      console.log("Revervation can't be made, there is missing information");
    }
    // Updates available time slots
    const { service, petName, dateTime } = formData;
    let copyAvailableTimeSlots = { ...availableTimeSlots };
    const slotIndex = copyAvailableTimeSlots[service].findIndex(
      (slot) => slot.time === dateTime
    );

    if (slotIndex !== -1) {
      copyAvailableTimeSlots[service][slotIndex].available = false;
    }
    setAvailableTimeSlots({ ...copyAvailableTimeSlots });
    setFormData({
      service: "",
      petName: "",
      dateTime: "",
    });

    // Send booking data to backend (simulated here)
    console.log("Booking submitted:", formData);
  };

  return (
    <div>
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="petName">Pet Name:</label>
          <input
            type="text"
            name="petName"
            id="petName"
            required
            onChange={handleFormChange}
            value={formData.petName}
          />
        </div>
        <div>
          <label htmlFor="service">Select service:</label>
          <select
            name="service"
            id="service"
            required
            onChange={handleFormChange}
            value={formData.service}
          >
            <option value="" disabled selected>
              Select your service
            </option>
            <option value={"petSitting"}>Pet sitting</option>
            <option value={"dogWalking"}>Dog walking</option>
            <option value={"houseVisit"}>House visit</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateTime">Select Date and Time:</label>
          <select
            name="dateTime"
            id="dateTime"
            required
            onChange={handleFormChange}
            value={formData.dateTime}
          >
            <option value="" disabled selected>
              Select a time
            </option>
            {availableTimeSlots[formData.service] &&
              availableTimeSlots[formData.service].map((slot, index) => (
                <option
                  key={index}
                  value={slot.time}
                  disabled={!slot.available}
                >
                  {slot.time}
                </option>
              ))}
          </select>
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default App;
