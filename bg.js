const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImg(randomNumber){
    const image = new Image(1920, 1080);
    image.src = `img/${randomNumber}.jpg`;
    image.classList.add('bgimg');
    body.prepend(image);
}

function generateRandomNum(){
    const number = Math.floor(Math.random()*IMG_NUMBER)
    return number;
}

function init(){
    const randomNumber = generateRandomNum();
    paintImg(randomNumber);
}
init();