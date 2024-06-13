
//selecting the slider 
const slider = document.querySelector("input");
//selecting the slider label
const sliderLabel = document.querySelector("#slider-label");
//selecting the game-sketch section
const sketchArea = document.querySelector(".game-sketch");


//function to reflect slider value on screen
const onSliderInput = () => {
    //reflect the input onto slider label
    sliderLabel.textContent = slider.value;
    gridGenerator();
}

//function to generate grid depending on slider
const gridGenerator = () => {
    clearGrid();
    //select width and height of game-sketch section
    const rect = sketchArea.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    //px dimensions per pixel 
    let pWidth = width / slider.value;
    let pHeight = height / slider.value;
    //total pixels
    let totalPixels = slider.value ** 2;
    console.log(totalPixels);
    console.log(`Pixel height = ${pHeight}`)
    console.log(`Pixel width = ${pWidth}`)
    
    createPixel(pWidth, pHeight, totalPixels);

}

//function to create pixels
const createPixel = (width, height, num) => {
    
    for (let i = 0; i < num; i++) {
        const element = document.createElement("div");
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.classList.add("pixel");
        element.addEventListener("mouseover", () => {
            element.classList.add("pixel-hover");
        })
        sketchArea.appendChild(element);
    }
}

//function to cleear grid after each slider move
const clearGrid = () => {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        sketchArea.removeChild(pixel);
    });
}

//initial grid generation
gridGenerator();

//listen for slider movements and reflect in sliderLabel
slider.addEventListener("input", onSliderInput);