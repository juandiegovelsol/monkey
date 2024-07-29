import React, { useState } from "react";

function App() {
  const [devices, setDevices] = useState([]);
  const [kWhCost, setKWhCost] = useState(0);

  const handleAddDevice = (event) => {
    event.preventDefault();

    const newDevice = {
      name: event.target.deviceName.value,
      energy: parseFloat(event.target.energy.value),
      hours: parseFloat(event.target.hours.value),
      quantity: parseInt(event.target.quantity.value, 10),
    };

    setDevices([...devices, newDevice]);
  };

  const calculateMonthlyCost = (device) => {
    const dailyWh = device.energy * device.hours * device.quantity;
    const monthlyWh = dailyWh * 30;
    const monthlykWh = monthlyWh / 1000;
    return monthlykWh * kWhCost;
  };

  const totalMonthlykWh = devices.reduce((total, device) => {
    return total + (device.energy * device.hours * device.quantity * 30) / 1000;
  }, 0);

  return (
    <div>
      <h1>Home Energy Calculator</h1>
      <form onSubmit={handleAddDevice}>
        <div>
          <label htmlFor="deviceName">Device Name:</label>
          <input type="text" id="deviceName" name="deviceName" required />
        </div>
        <div>
          <label htmlFor="energy">Energy Consumption (Wh):</label>
          <input type="number" id="energy" name="energy" required />
        </div>
        <div>
          <label htmlFor="hours">Daily Hours of Use:</label>
          <input type="number" id="hours" name="hours" required />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" required />
        </div>
        <button type="submit">Add Device</button>
      </form>

      <h2>Device List</h2>
      <table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Energy (Wh)</th>
            <th>Hours/Day</th>
            <th>Quantity</th>
            <th>Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr key={index}>
              <td>{device.name}</td>
              <td>{device.energy}</td>
              <td>{device.hours}</td>
              <td>{device.quantity}</td>
              <td>${calculateMonthlyCost(device).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total Monthly Energy Consumption:</td>
            <td>{totalMonthlykWh.toFixed(2)} kWh</td>
          </tr>
          <tr>
            <td colSpan="4">kWh Cost:</td>
            <td>
              <input
                type="number"
                value={kWhCost}
                onChange={(e) => setKWhCost(parseFloat(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="4">Estimated Total Monthly Cost:</td>
            <td>${(totalMonthlykWh * kWhCost).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
