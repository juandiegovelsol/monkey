import React, { useState } from "react";
import { Modal, Card, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Simulated TV data
const tvs = [
  {
    id: 1,
    name: "TV 1",
    description: "This is TV 1",
    image: "https://via.placeholder.com/150",
    price: 1000,
    specs: {
      screen_size: "40 inches",
      resolution: "4K",
      smart_tv: "Yes",
    },
  },
  {
    id: 2,
    name: "TV 2",
    description: "This is TV 2",
    image: "https://via.placeholder.com/150",
    price: 1200,
    specs: {
      screen_size: "50 inches",
      resolution: "4K",
      smart_tv: "Yes",
    },
  },
  {
    id: 3,
    name: "TV 3",
    description: "This is TV 3",
    image: "https://via.placeholder.com/150",
    price: 1500,
    specs: {
      screen_size: "60 inches",
      resolution: "8K",
      smart_tv: "Yes",
    },
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTv, setSelectedTv] = useState(null);
  const [compare, setCompare] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleTvClick = (tv) => {
    setSelectedTv(tv);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCompareChange = (event, tv) => {
    if (event.target.checked) {
      setCompare([...compare, tv]);
    } else {
      setCompare(compare.filter((t) => t.id !== tv.id));
    }
  };

  const handleCompareModalClose = () => {
    setShowCompareModal(false);
  };

  React.useEffect(() => {
    if (compare.length === 2) {
      setShowCompareModal(true);
    } else {
      setShowCompareModal(false);
    }
  }, [compare]);

  return (
    <div className="container mt-5">
      <h1>TV Store</h1>
      <div className="row">
        {tvs.map((tv) => (
          <div key={tv.id} className="col-md-4 mb-3">
            <Card>
              <Card.Img variant="top" src={tv.image} />
              <Card.Body>
                <Card.Title>{tv.name}</Card.Title>
                <Card.Text>{tv.description}</Card.Text>
                <Form.Check
                  type="checkbox"
                  label="Compare"
                  onChange={(event) => handleCompareChange(event, tv)}
                />
                <Button variant="primary" onClick={() => handleTvClick(tv)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTv && selectedTv.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTv && selectedTv.description}</p>
          <p>Price: ${selectedTv && selectedTv.price}</p>
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={showCompareModal} onHide={handleCompareModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compare TVs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {compare.length === 2 && (
            <Table bordered>
              <thead>
                <tr>
                  <th>Specs</th>
                  <th>{compare[0].name}</th>
                  <th>{compare[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Screen Size</td>
                  <td>{compare[0].specs.screen_size}</td>
                  <td>{compare[1].specs.screen_size}</td>
                </tr>
                <tr>
                  <td>Resolution</td>
                  <td>{compare[0].specs.resolution}</td>
                  <td>{compare[1].specs.resolution}</td>
                </tr>
                <tr>
                  <td>Smart TV</td>
                  <td>{compare[0].specs.smart_tv}</td>
                  <td>{compare[1].specs.smart_tv}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default App;

