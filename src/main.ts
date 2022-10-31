// Typing Effect is only available for JavaScript
// About Tabs
var tabLinks: HTMLDivElement[] = Array.prototype.slice.call(document.getElementsByClassName("tab-links") as HTMLCollectionOf<HTMLDivElement>);
var tabContents: HTMLDivElement[] = Array.prototype.slice.call(document.getElementsByClassName("tab-contents") as HTMLCollectionOf<HTMLDivElement>);

function openTab(tabName: string) {
    for (const tabLink of tabLinks) {
        tabLink.classList.remove('active-link');
    }
    for (const tabContent of tabContents) {
        tabContent.classList.remove('active-tab');
    }
    (event?.currentTarget as HTMLDivElement).classList.add('active-link');
    document.getElementById(tabName)?.classList.add('active-tab');
}

// Form Validation
var nameError:HTMLSpanElement = document.getElementById("nameError") as HTMLSpanElement;
var emailError:HTMLSpanElement = document.getElementById("emailError") as HTMLSpanElement;
var  messageError:HTMLSpanElement = document.getElementById("messageError") as HTMLSpanElement;
var messageElement:HTMLInputElement = document.getElementById("messageElement") as HTMLInputElement;
// Form Validation & Submitting to Google Sheets
// constants for submission
const scriptURL = "https://script.google.com/macros/s/AKfycbytEj7Q213a_ZeD79ncO2Cdnb3t7IeWBXzCVlGdcMshqZdJpnlV_U5Ap0AjesTLlZsS/exec"
const form = document.forms['submit-to-google-sheets'];

// form error messages
var nameError: HTMLSpanElement = document.getElementById("nameError") as HTMLSpanElement;
var emailError: HTMLSpanElement = document.getElementById("emailError") as HTMLSpanElement;
var messageError: HTMLSpanElement = document.getElementById("messageError") as HTMLSpanElement;
var messageElement: HTMLInputElement = document.getElementById("message") as HTMLInputElement;

form.addEventListener('submit', e => {
    e.preventDefault();

    // values of input fields
    const name: string = (document.getElementById("name") as HTMLInputElement).value;
    const email:string = (document.getElementById("email") as HTMLInputElement).value;
    let message:string = (document.getElementById("message") as HTMLInputElement).value;
    const msg: HTMLSpanElement = document.getElementById("msg") as HTMLSpanElement;

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
var sideMenu: HTMLUListElement = document.getElementById("sideMenu") as HTMLUListElement;
var menuIcon: HTMLElement = document.getElementsByClassName("fas")[1] as HTMLElement;
function openMenu() {
    sideMenu.style.right = "0";
    // close menu
    const items: HTMLLIElement[] = Array.prototype.slice.call(document.getElementsByClassName('item') as HTMLCollectionOf<HTMLLIElement>);
    for (let item of items) {
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