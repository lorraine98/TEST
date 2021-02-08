const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.greeting');

const USER_NAME_LS_KEY = 'USER_NAME_LS_KEY';
const SHOWING_CLASS_NAME = 'showing';

function saveUserName(userName) {
    localStorage.setItem(USER_NAME_LS_KEY, userName);
}

function handleSubmit(event) {
    event.preventDefault();
    const inputValue = input.value;
    paintGreeting(inputValue);
    saveUserName(inputValue);
}

function askForName() {
    form.classList.add(SHOWING_CLASS_NAME);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CLASS_NAME);
    greeting.classList.add(SHOWING_CLASS_NAME);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const userName = localStorage.getItem(USER_NAME_LS_KEY)
    if (userName === null) {
        askForName();
    } else {
        paintGreeting(userName);
    }
}

function init() {
    loadName();
}
init();