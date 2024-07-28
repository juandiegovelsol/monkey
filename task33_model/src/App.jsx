import React, { useState } from "react";
import dishes from "./data";
import Carousel from "./Carousel";
import DishDetails from "./DishDetails";

function App() {
  const [selectedDish, setSelectedDish] = useState(null);

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
  };

  const handleReturnHome = () => {
    setSelectedDish(null);
  };

  return (
    <div className="App">
      {selectedDish ? (
        <DishDetails dish={selectedDish} onReturnHome={handleReturnHome} />
      ) : (
        <Carousel dishes={dishes} onDishSelect={handleDishSelect} />
      )}
    </div>
  );
}

export default App;
