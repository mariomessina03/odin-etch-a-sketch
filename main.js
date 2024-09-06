let gridSideLength = 16;

const sketchTable = document.querySelector("#sketch-table");
const buttonSetCells = document.querySelector("#set-cells");

function updateCellSizes() {
  const computedStyle = getComputedStyle(sketchTable);
  const sketchTableWidth = parseFloat(computedStyle.width);
  const sketchTableHeight = parseFloat(computedStyle.height);

  const cellWidth = sketchTableWidth / gridSideLength;
  const cellHeight = sketchTableHeight / gridSideLength;

  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.style.width = `${cellWidth}px`;
    cell.style.height = `${cellHeight}px`;
  });
}

sketchTable.style.width = "600px";
sketchTable.style.height = "600px";

let mouseDown = false;
document.addEventListener("mousedown", function (e) {
  if (e.button === 0) {
    mouseDown = true;
  }
});
document.addEventListener("mouseup", function () {
  mouseDown = false;
});

buttonSetCells.addEventListener("click", function () {
  let userInput;

  while (true) {
    userInput = prompt(
      "Please enter a value for the grid cells (min 1, max 100):"
    );
    userInput = Number(userInput);

    if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
      gridSideLength = userInput; // Aggiorna gridSideLength
      deleteGridCells();
      createGridCells(gridSideLength);
      break;
    } else {
      alert("Invalid input. Please enter a number between 1 and 100.");
    }
  }
});

function createGridCells(gridSideLength) {
  for (let i = 0; i < gridSideLength * gridSideLength; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    sketchTable.appendChild(cell);

    cell.addEventListener("mouseenter", function () {
      cell.classList.add("cell-hovered");

      if (mouseDown) {
        cell.classList.add("colored");
      }
    });

    cell.addEventListener("mouseleave", function () {
      cell.classList.remove("cell-hovered");
    });
  }

  updateCellSizes();
}

function deleteGridCells() {
  while (sketchTable.firstChild) {
    sketchTable.removeChild(sketchTable.firstChild);
  }
}

createGridCells(gridSideLength);
