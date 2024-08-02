const groceryList = document.getElementById("groceryList");
const progressBar = document.getElementById("progressBar");
const progressGradient = document.getElementById("progressGradient");
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
  progressGradient.style.width = `${100 - progressPercentage}%`;
}
