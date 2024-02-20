// const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
// const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
// const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");
const GRIDSIDE = 600;
let squarePerSide = 16;

const container = document.querySelector(".container")
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;

const sketchArea = document.querySelector("#sketch-area");
sketchArea.style.width = sketchArea.style.height = `${GRIDSIDE}px`;

function changeBackgroundColor() {
    this.style.backgroundColor = "black";
}

function createGridCells(squarePerSide){
    const numOfSquares = (squarePerSide * squarePerSide);
    const widthOrHeight = `${(GRIDSIDE / squarePerSide) - 2}px`;
    for (let i = 0; i < numOfSquares; i++){
        const gridCell = document.createElement("div");

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        gridCell.classList.add("cell");

        sketchArea.appendChild(gridCell);

        gridCell.addEventListener("mouseover", changeBackgroundColor);

    }
}

function removeGridCells() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function () {
    let txt = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = txt;
    removeGridCells();
    createGridCells(this.value);
}

createGridCells(16);