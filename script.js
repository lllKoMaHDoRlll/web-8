
function sendFormData(event) {
    console.log("sending form");
    event.preventDefault();
    let request = new XMLHttpRequest();
    request.open("POST", "https://formcarry.com/s/jfnPbjBfup");
    request.setRequestHeader("ACCEPT", "application/json");

    let data = new FormData();
    
    let inputEls = document.getElementsByClassName("local-save");
    [...inputEls].forEach(inputEl => {
        data.append(inputEl.id, inputEl.value);
    });
    
    request.send(data);
}

function showModal () {
    history.pushState({form: true}, "", "#form");
    let modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    history.replaceState({form: false}, "", "/");
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

function controlModal() {
    if(location.hash == "#form") {
        showModal();
    }
    else {
        closeModal();
    }
}

function loadInput(inputEl) {
    inputEl.value = localStorage.getItem(inputEl.id);
}

function saveInput(event) {
    localStorage.setItem(event.target.id, event.target.value);
}

document.addEventListener('DOMContentLoaded', function () {
    if (history.state == null) {
        history.pushState({form: false}, "", "/");
    }
    if (history.state.form) {
        showModal();
    }
    
    let feedbackButtonEl = document.getElementById("feedback-button");    
    feedbackButtonEl.addEventListener('click', showModal);

    
    window.addEventListener('click', function (event) {
        let modal = document.getElementById("modal");
        if (event.target == modal) {
            closeModal();
        }
    });

    let closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", closeModal);

    let inputEls = document.getElementsByClassName("local-save");

    [...inputEls].forEach(inputEl => {
        loadInput(inputEl);
    });
    
    [...inputEls].forEach(inputEl => {
        inputEl.addEventListener("input", saveInput);
    });

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", sendFormData);

    window.addEventListener("popstate", controlModal);
});