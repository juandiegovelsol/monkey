import React, { useState } from "react";

function App() {
  const [activities, setActivities] = useState([]);

  const [formData, setFormData] = useState({
    activity: "",
    rate: "",
    unit: "l/min", // Default unit
    time: "",
    timeUnit: "minutes", // Default time unit
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert everything to liters and seconds for consistent calculations
    let litersPerSecond;
    switch (formData.unit) {
      case "l/min":
        litersPerSecond = formData.rate / 60;
        break;
      case "l/s":
        litersPerSecond = parseFloat(formData.rate);
        break;
      case "gal/min":
        litersPerSecond = (formData.rate * 3.78541) / 60;
        break;
      case "gal/s":
        litersPerSecond = formData.rate * 3.78541;
        break;
      case "qt/min":
        litersPerSecond = (formData.rate * 0.946353) / 60;
        break;
      case "qt/s":
        litersPerSecond = formData.rate * 0.946353;
        break;
      default:
        litersPerSecond = 0;
    }

    let seconds;
    switch (formData.timeUnit) {
      case "seconds":
        seconds = parseFloat(formData.time);
        break;
      case "minutes":
        seconds = formData.time * 60;
        break;
      case "hours":
        seconds = formData.time * 3600;
        break;
      default:
        seconds = 0;
    }

    const totalLiters = litersPerSecond * seconds;
    const cubicMeters = totalLiters / 1000;

    setActivities([
      ...activities,
      {
        activity: formData.activity,
        cubicMeters: cubicMeters.toFixed(2), // Round to 2 decimal places
      },
    ]);

    // Clear the form
    setFormData({
      activity: "",
      rate: "",
      unit: "l/min",
      time: "",
      timeUnit: "minutes",
    });
  };

  // Sort activities by cubic meters (descending)
  const sortedActivities = [...activities].sort(
    (a, b) => b.cubicMeters - a.cubicMeters
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">
        Home Water Footprint Calculator
      </h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="activity" className="block mb-2">
              Activity:
            </label>
            <input
              type="text"
              id="activity"
              name="activity"
              value={formData.activity}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="rate" className="block mb-2">
              Water Consumption Rate:
            </label>
            <div className="flex">
              <input
                type="number"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="border p-2 rounded w-2/3"
                required
              />
              <select
                name="unit"
                id="unit"
                value={formData.unit}
                onChange={handleChange}
                className="border p-2 rounded w-1/3"
              >
                <option value="l/min">liters/min</option>
                <option value="l/s">liters/sec</option>
                <option value="gal/min">gallons/min</option>
                <option value="gal/s">gallons/sec</option>
                <option value="qt/min">quarts/min</option>
                <option value="qt/s">quarts/sec</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="time" className="block mb-2">
              Time Used Per Day:
            </label>
            <div className="flex">
              <input
                type="number"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="border p-2 rounded w-2/3"
                required
              />
              <select
                name="timeUnit"
                id="timeUnit"
                value={formData.timeUnit}
                onChange={handleChange}
                className="border p-2 rounded w-1/3"
              >
                <option value="seconds">seconds</option>
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Activity
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Water Consumption List</h2>
      <ul>
        {sortedActivities.map((activity, index) => (
          <li
            key={index}
            className={`mb-2 p-2 rounded ${
              index < 2 ? "bg-yellow-200" : "" // Highlight top 2
            }`}
          >
            {activity.activity}: <strong>{activity.cubicMeters} m³</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
