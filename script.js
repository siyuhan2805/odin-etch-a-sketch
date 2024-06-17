//global variable containing current colour 
let currentClr = "black";

//selecting the slider 
const slider = document.querySelector("input");
//selecting the slider label
const sliderLabel = document.querySelector("#slider-label");
//selecting the game-sketch section
const sketchArea = document.querySelector(".game-sketch");
//selecting the "clear" button
const clearBtn = document.querySelector(".btn-clear");
//selectio
const clrBtns = document.querySelectorAll(".clr-btn");
const clrSettings = document.querySelector(".btn-colours");
const clrSection = document.querySelector("aside");


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
            element.style.backgroundColor = currentClr;
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

//function to clear dark pixels after "clear" button is pressed
const clearDarkGrid = () => {
    const darkPixels = document.querySelectorAll(".pixel");
    darkPixels.forEach(pixel => {
        pixel.style.removeProperty("background-color");
    })
}

//function to make the opacity of btns as "unselected" so user can select new btn
const clearBtns = () => {
    clrBtns.forEach(btn => {
        btn.style.opacity = "0.7";
    })
}

//initial grid generation
gridGenerator();

//listen for slider movements and reflect in sliderLabel
slider.addEventListener("input", onSliderInput);
//listen to clear the board
clearBtn.addEventListener("click", clearDarkGrid);
//listen to dropdown colour picker
clrSettings.addEventListener("click", () => {
    if (clrSection.classList.contains("hidden")) {
        clrSection.classList.remove("hidden");
        clrSection.classList.add("visible");
        clrSection.style.display = "flex";
        clrSection.style.animation = "settingsSlideDown 1000ms linear 0s 1 normal";
        setTimeout(() => {
            clrSection.style.zIndex = 1;
        }, 1000);
        
        
    }
    else if (clrSection.classList.contains("visible")) {
        clrSection.classList.remove("visible");
        clrSection.classList.add("hidden");
        clrSection.style.animation = "settingsSlideUp 1000ms linear 0s 1 normal";
        clrSection.style.zIndex = -1;
        setTimeout(() => {
            clrSection.style.display = "none"
        }, 1000);
    }
})


//add click listeners to each colour btn for colour change
clrBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        //clear selection visual of other buttons
        clearBtns();
        //add the style of opacity change
        btn.style.opacity = "1";
        //set currentClr global var to the colour value
        const computedStyle = window.getComputedStyle(e.target);
        currentClr= computedStyle.backgroundColor;
    })
})

