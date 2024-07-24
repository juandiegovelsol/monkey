import React, { useState } from "react";

const initialStylists = [
  {
    id: 1,
    name: "Stylist 1",
    availability: [
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
    ],
  },
  {
    id: 2,
    name: "Stylist 2",
    availability: [
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
    ],
  },
];

function App() {
  const [stylists, setStylists] = useState(initialStylists);
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);

  const handleStylistChange = (e) => {
    const stylistId = parseInt(e.target.value);
    const selectedStylist = stylists.find(
      (stylist) => stylist.id === stylistId
    );
    setSelectedStylist(selectedStylist);
    setSelectedTime(""); // Reset selected time when stylist changes
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const bookAppointment = () => {
    if (!selectedStylist || !selectedTime || !name || !email || !phone) {
      alert("Please fill out all fields");
      return;
    }

    const booking = {
      stylist: selectedStylist.name,
      time: selectedTime,
      name,
      email,
      phone,
    };

    setBookings((prevBookings) => [...prevBookings, booking]);

    // Update availability correctly
    setStylists((prevStylists) =>
      prevStylists.map((stylist) => {
        if (stylist.id === selectedStylist.id) {
          return {
            ...stylist,
            availability: stylist.availability.filter(
              (time) => time !== selectedTime
            ),
          };
        }
        return stylist;
      })
    );

    // Reset form fields
    setSelectedStylist(""); // Reset stylist when booking
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <label htmlFor="stylist">Stylist:</label>
      <select
        id="stylist"
        value={selectedStylist}
        onChange={handleStylistChange}
      >
        <option value="" disabled>
          Select a stylist
        </option>
        {stylists.map((stylist) => (
          <option key={stylist.id} value={stylist.id}>
            {stylist.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="time">Time:</label>
      <select id="time" value={selectedTime} onChange={handleTimeChange}>
        <option value="" disabled>
          Select a time
        </option>
        {selectedStylist ? (
          selectedStylist.availability.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
      <br />
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" value={name} onChange={handleNameChange} />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      <br />
      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="phone"
        value={phone}
        onChange={handlePhoneChange}
      />
      <br />
      <button onClick={bookAppointment}>Book Appointment</button>
      <h2>Bookings:</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.stylist} - {booking.time} - {booking.name} -{" "}
            {booking.email} - {booking.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
