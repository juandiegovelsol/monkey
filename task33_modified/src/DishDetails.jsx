import React from "react";

function DishDetails({
  dish,
  onReturnHome,
  handleDishChange,
  currentDishIndex,
}) {
  const { name, image, fullDescription, ingredients, reviews } = dish;

  return (
    <div className="dish-details">
      <button onClick={() => handleDishChange("prev", currentDishIndex)}>
        Previous
      </button>
      <button onClick={onReturnHome}>Return to Home</button>
      <button onClick={() => handleDishChange("next", currentDishIndex)}>
        Next
      </button>
      <br />
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{fullDescription}</p>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Reviews:</h3>
      {/* Display reviews here */}
    </div>
  );
}

export default DishDetails;