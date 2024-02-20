const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const sketchArea = document.querySelector("#sketch-area");
const gridToggle = document.querySelector("#grid-toggle");

let squarePerSide = 16;
let gridVisible = false;
let isDrawing = false

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridCells();
    createGridCells();
}

function changeBackgroundColor(e) {
    if (e.type === "mousedown") {
        isDrawing = true;
        e.target.style.backgroundColor = "black";
    }
    else if (e.type === "mouseover" && isDrawing) {
        e.target.style.backgroundColor = "black";
    }
    else {
        isDrawing = false;
    }
}

function createGridCells(){
    const numOfSquares = (squarePerSide * squarePerSide);

    for (let i = 0; i < numOfSquares; i++){
        const gridCell = document.createElement("div");
        let widthOrHeight = 0;

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squarePerSide) -2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        }
        else if (!gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squarePerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        gridCell.addEventListener("mousedown", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => changeBackgroundColor(e));

        sketchArea.appendChild(gridCell);
    }
}

function removeGridCells() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function () {
    squarePerSide = this.value;
    sliderValue.textContent = `${this.value} x ${this.value} (Resolution)`;
    
    removeGridCells();
    createGridCells();
}

gridToggle.addEventListener("click", toggleGrid);

createGridCells();