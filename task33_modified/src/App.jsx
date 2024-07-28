import React, { useState } from "react";
import dishes from "./data";
import Carousel from "./Carousel";
import DishDetails from "./DishDetails";

function App() {
  const [selectedDish, setSelectedDish] = useState(null);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const DishesLength = dishes.length;

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
  };
  const handleDishChange = (moveTo = "prev", index) => {
    if (moveTo === "next") {
      if (index < DishesLength - 1) {
        setSelectedDish(dishes[index++]);
        setCurrentDishIndex(index++);
      } else {
        setSelectedDish(dishes[0]);
        setCurrentDishIndex(0);
      }
    } else {
      if (index > 0) {
        setSelectedDish(dishes[index--]);
        setCurrentDishIndex(index--);
      } else {
        setSelectedDish(dishes[DishesLength - 1]);
        setCurrentDishIndex(DishesLength - 1);
      }
    }
  };

  const handleReturnHome = () => {
    setSelectedDish(null);
  };

  return (
    <div className="App">
      {selectedDish ? (
        <DishDetails
          dish={dishes[currentDishIndex]}
          onReturnHome={handleReturnHome}
          handleDishChange={handleDishChange}
          currentDishIndex={currentDishIndex}
        />
      ) : (
        <Carousel
          dishes={dishes}
          onDishSelect={handleDishSelect}
          currentDishIndex={currentDishIndex}
          setCurrentDishIndex={setCurrentDishIndex}
        />
      )}
    </div>
  );
}

export default App;
