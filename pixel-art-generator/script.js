let container = document.querySelector(".container");
let gridbutton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-width");
let gridHeigth = document.getElementById("heigth-width");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase.btn");
let paintBtn = document.getElementById("paint.btn");
let widthValue = document.getElementById("width-value");
let heigthValue = document.getElementById("heigth-value");

let event = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridbutton.addEventListener("click", ()=>{
    container.innerHTML = "";
    let count = 0;
    for(let i = 0; i < gridHeight.value; i++){
        count +=2;
        let div = document.createEvent("div");
        div.classList.add("gridRow");

        for(let j=0; j < gridWidth.value; j++){
            count+=2;
            let col = document.createEvent("div");
            col.classList.add("gridCol");
        }
    }
})