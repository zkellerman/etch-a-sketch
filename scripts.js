const container = document.querySelector(".container");

function updateGridSize(size) {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  let totalSquares = size * size;
  for (let i = 1; i <= totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // square size = (container width - (size * L&R 1px border)) / size
    let squareSize = (750 - (size * 2)) / size;
    square.style.height = `${squareSize}px`;
    square.style.width = `${squareSize}px`;

    square.addEventListener("mouseover", () => {
      if (square.style.backgroundColor === '')
        square.style.backgroundColor = getRandomColor();

      let opacity = parseFloat(square.style.opacity);
      
      if (isNaN(opacity)) opacity = 0.1
      else if (opacity < 1) opacity += 0.1
      
      square.style.opacity = `${opacity}`;
    });

    container.appendChild(square);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const gridInfoArea = document.querySelector(".gridInfo");
const changeSizeButton = document.querySelector("#changeGrid");
const gridSizeParagraph = gridInfoArea.lastElementChild;

changeSizeButton.addEventListener("click", () => {
  let promptMessage = 'Enter how many squares per side there should be (Min: 16, Max: 100):';
  let size = prompt(promptMessage);
  if (size < 16 || size > 100)
    alert('Invalid size. Value must be between 16 and 100.');
  else {
    updateGridSize(size);
    gridSizeParagraph.textContent = `Current Size: ${size}x${size}`;
  }
});

updateGridSize(16);