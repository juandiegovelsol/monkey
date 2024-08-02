const groceryList = document.getElementById("groceryList");
const progressBar = document.getElementById("progressBar");
const checkboxes = groceryList.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateProgressBar();
  });
});

function updateProgressBar() {
  const totalItems = checkboxes.length;
  const checkedItems = groceryList.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  const progressPercentage = (checkedItems / totalItems) * 100;

  progressBar.style.width = `${progressPercentage}%`;

  // Update progress bar color
  progressBar.classList.remove("red", "orange", "yellow", "green");
  if (progressPercentage >= 75) {
    progressBar.classList.add("green");
  } else if (progressPercentage >= 50) {
    progressBar.classList.add("yellow");
  } else if (progressPercentage >= 25) {
    progressBar.classList.add("orange");
  } else {
    progressBar.classList.add("red");
  }
}
