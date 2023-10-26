
function sendFormData(event) {
    console.log("sending form");
    event.preventDefault();
    if (!isFormValid()) return false;

    let request = new XMLHttpRequest();
    request.open("POST", "https://formcarry.com/s/jfnPbjBfup");
    request.setRequestHeader("ACCEPT", "application/json");

    let data = new FormData();
    
    let inputEls = document.getElementsByClassName("local-save");
    [...inputEls].forEach(inputEl => {
        data.append(inputEl.id, inputEl.value);
    });
    
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          const status = request.status;
          if (status === 0 || (status >= 200 && status < 400)) {
            alert("Form was sended successfully.");
          } else {
            alert(`An error was occured while sending form. Error code: ${status}.`);
          }
        }
      };

    request.send(data);
    closeModal();
}

function isFormValid() {
    let nameEl = document.getElementById("user-name");
    if (nameEl.value == "") {
        alert("Please, enter name.");
        return false;
    }

    let emailEl = document.getElementById("user-email");
    if (emailEl.value != "" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailEl.value)) {
        alert("Incorrect Email format.");
        return false;
    }

    let phoneEl = document.getElementById("user-phone");
    if (phoneEl.value != "" && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(phoneEl.value)) {
        alert("Incorrect Phone format.");
        return false;
    }


    let organisationEl = document.getElementById("user-organisation");


    let messageEl = document.getElementById("user-message");
    if (messageEl.value == "") {
        alert("Please, enter message.");
        return false;
    }

    let acceptionEl = document.getElementById("user-acception");
    if (!acceptionEl.checked) {
        alert("Accept Politics privacy.");
        return false;
    }

    return true;
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