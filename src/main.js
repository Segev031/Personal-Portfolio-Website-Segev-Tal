// Typing Effect
var typed = new Typed(".auto-type", {
    strings: ["Mobile App Developer", "Cross-Platform Developer", "Web Developer", "Wix Website Designer", "Software Engineer"],
    typeSpeed: 100,
    backDelay: 1500,
    backSpeed: 100,
    loop: true
});

// About Tabs
var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");

function openTab(tabName) {
    for (const tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }
    for (const tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
}

// Form Validation & Submitting to Google Sheets
// constants for submission
const scriptURL = "https://script.google.com/macros/s/AKfycbytEj7Q213a_ZeD79ncO2Cdnb3t7IeWBXzCVlGdcMshqZdJpnlV_U5Ap0AjesTLlZsS/exec"
const form = document.forms['submit-to-google-sheets'];

// form error messages
var nameError = document.getElementById("nameError");
var emailError = document.getElementById("emailError");
var messageError = document.getElementById("messageError");
var messageElement = document.getElementById("message");

form.addEventListener('submit', e => {
    e.preventDefault();

    // values of input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    const msg = document.getElementById("msg");

    // reset messages
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    messageError.innerHTML = ""

    // validate name with regex pattern
    if (!name.match(/^([\w]{2,})+\s+([\w\s]{2,})+$/i)) {
        nameError.innerHTML = "You must enter your full name";
        return false;
    }
    // validate email with regex pattern
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        emailError.innerHTML = "You must provide a valid email address";
        return false;
    }
    // check length of message
    if (message.length < 16) {
        messageError.innerHTML = "Your message must be at least 16 characters (you have " + message.length + " characters)";
        messageElement.onkeyup = () => {
            message = messageElement.value;
            if (message.length > 15) {
                messageError.innerHTML = "";
            } else {
                messageError.innerHTML = "Your message must be at least 16 characters (you have " + message.length + " characters)";
            }
        }
        return false;
    }
    // submit data to Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.style.display = "block";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = '<i class="fas fa-solid fa-xmark"></i>Error: " + error.message';
            msg.style.color = 'red';
            msg.style.display = "block";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
});


// Menu For Mobile Devices
var sideMenu = document.getElementById("sideMenu");
var menuIcon = document.getElementsByClassName("fas")[1];
function openMenu() {
    sideMenu.style.right = "0";
    // close menu
    const items = document.getElementsByClassName('item');
    for (item of items) {
        item.onclick = closeMenu;
    }
}
function closeMenu() {
    menuIcon.style.display = "none";
    sideMenu.style.right = "-30%";
    setTimeout(() => {
        menuIcon.style.display = "block";
    }, 1);
}