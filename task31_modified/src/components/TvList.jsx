import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Modal, Table } from "react-bootstrap";
import ComparisonTable from "./ComparisonTable";
import tvData from "../data";

function TvList() {
  const [showModalD, setShowModalD] = useState(false);
  const [selectedTv, setSelectedTv] = useState(null);
  const [selectedTvs, setSelectedTvs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCompareChange = (tvId) => {
    if (selectedTvs.includes(tvId)) {
      setSelectedTvs(selectedTvs.filter((id) => id !== tvId));
    } else if (selectedTvs.length < 2) {
      setSelectedTvs([...selectedTvs, tvId]);
    }
  };
  useEffect(() => {
    if (selectedTvs.length > 1) {
      setShowModal(true);
    }
  }, [selectedTvs]);

  const handleShowModal = (tv) => {
    setSelectedTv(tv);
    setShowModalD(true);
  };

  const handleCloseModalD = () => {
    setShowModalD(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTvs([]); // Reset selected TVs after closing modal
  };

  return (
    <div>
      <h1>TV Selection</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {tvData.map((tv) => (
          <Col key={tv.id}>
            <Card>
              <Card.Img variant="top" src={tv.imageUrl} />
              <Card.Body>
                <Card.Title>
                  {tv.brand} {tv.model}
                </Card.Title>
                <Card.Text>Size: {tv.size}"</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(tv)}>
                  View Details
                </Button>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id={`compare-${tv.id}`}
                    checked={selectedTvs.includes(tv.id)}
                    onChange={() => handleCompareChange(tv.id)}
                  />
                  <label htmlFor={`compare-${tv.id}`}>Compare</label>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModalD} onHide={handleCloseModalD}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTv && selectedTv.brand}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTv && selectedTv.model}</p>
          <p>Price: ${selectedTv && selectedTv.price}</p>
        </Modal.Body>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>TV Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTvs.length === 2 && (
            <ComparisonTable
              tv1={tvData.find((tv) => tv.id === selectedTvs[0])}
              tv2={tvData.find((tv) => tv.id === selectedTvs[1])}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TvList;
