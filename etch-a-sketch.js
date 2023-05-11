const gridContainer = document.querySelector("#grid-container");
let gridSizeButton = document.querySelector("#grid-size-button");
let normalModeButton = document.querySelector("#normal-mode-button");
let gradualModeButton = document.querySelector("#gradual-mode-button");
let rainbowModeButton = document.querySelector("#rainbow-mode-button");
let mode = "normal";
let gridSize = 16;
populateGrid(16, mode);

gridSizeButton.addEventListener("click", promptForSquareCount);

normalModeButton.addEventListener("click", () => {
  mode = "normal";
  populateGrid(gridSize, "normal")});

gradualModeButton.addEventListener("click", () => {
  mode = "gradual";
  populateGrid(gridSize, "gradual")});

rainbowModeButton.addEventListener("click", () => {
  mode = "rainbow";
  populateGrid(gridSize, "rainbow")});

function promptForSquareCount(){
  gridSize = parseInt(prompt("How many squares per side? (Max 100)"),10);
  if (!(gridSize<=100 && gridSize>=1)){
    alert("Must be between 1 and 100");
    promptForSquareCount();
  };
  populateGrid(gridSize, mode);
}

function createSquare(size, mode){
  let squareDiv = document.createElement("div");
  squareDiv.style["height"] = size + "px";
  squareDiv.style["width"] = size + "px";
  if (mode === "normal"){
    squareDiv.addEventListener("mouseover", (e) => {
      e.currentTarget.style["background-color"]="black"; 
    });
  }
  if (mode === "gradual"){
    let shadesOfGray = ["hsl(0,0%,100%)","hsl(0,0%,90%)","hsl(0,0%,80%)",
          "hsl(0,0%,70%)","hsl(0,0%,60%)","hsl(0,0%,50%)","hsl(0,0%,40%)",
           "hsl(0,0%,30%)","hsl(0,0%,20%)","hsl(0,0%,10%)", "hsl(0, 0%, 0%)"];
    let i = 0;
    squareDiv.addEventListener("mouseover", (e) => {
      if (i < 10){
        e.currentTarget.style["background-color"]=shadesOfGray[i]; 
        i++;
      };
    });
  }
  if (mode === "rainbow"){
    squareDiv.addEventListener("mouseover", (e) => {
      e.currentTarget.style["background-color"]="#" +
         Math.floor(Math.random()*16777215).toString(16); 
    });
  }

  return squareDiv;
}

function populateGrid(gridSize, mode){
  gridContainer.replaceChildren();
  for(let i=0; i<(gridSize**2); i++){
    gridContainer.appendChild(createSquare(960/gridSize, mode));
  }
}
