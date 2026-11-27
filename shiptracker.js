
/* =========================
   HAMBURGER MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuBtn.innerHTML = "✕";
            menuBtn.setAttribute("aria-expanded", "true");
        } else {
            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        }

    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");
            menuBtn.innerHTML = "☰";
            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

}


/* =========================
   SHIPMENT TRACKING
========================= */

const trackingInput = document.getElementById("trackingInput");
const trackBtn = document.getElementById("trackBtn");
const trackingMessage = document.getElementById("trackingMessage");

const trackingCard = document.getElementById("trackingCard");
const trackingIdDisplay = document.getElementById("trackingIdDisplay");
const currentStatusText = document.getElementById("currentStatusText");
const estimatedDelivery = document.getElementById("estimatedDelivery");

if (trackingInput && trackBtn && trackingMessage) {

    function trackShipment() {

        let trackingID = trackingInput.value.trim();

        if (trackingID === "") {

            trackingMessage.textContent = "Please enter your Tracking ID.";
            trackingMessage.classList.add("show");
            trackingMessage.classList.remove("success");

            if (trackingCard) {
                trackingCard.classList.remove("show");
            }

            return;
        }

        const pattern = /^[A-Za-z]{2}[0-9]{9}$/;

        if (!pattern.test(trackingID)) {

            trackingMessage.textContent =
                "Invalid Tracking ID. Enter 2 letters followed by 9 digits.";

            trackingMessage.classList.add("show");
            trackingMessage.classList.remove("success");

            if (trackingCard) {
                trackingCard.classList.remove("show");
            }

            return;
        }

        trackingID = trackingID.toUpperCase();

        trackingMessage.textContent = "Tracking ID accepted successfully!";
        trackingMessage.classList.add("show", "success");

        if (trackingCard) {

            trackingCard.classList.add("show");

            if (trackingIdDisplay) {
                trackingIdDisplay.textContent = "Tracking ID: " + trackingID;
            }

            if (currentStatusText) {
                currentStatusText.textContent = "Package is in transit";
            }

            if (estimatedDelivery) {
                estimatedDelivery.textContent = "On the way";
            }

        }

    }

    trackBtn.addEventListener("click", trackShipment);

    trackingInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            trackShipment();
        }

    });

}


/* =========================
   CONTACT FORM SUBMISSION
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const trackingID = document.getElementById("tracking").value.trim();

        // Validate name

        if (name.length < 2) {
            showFormMessage("Please enter your full name.", false);
            return;
        }

        // Validate phone

        const cleanPhone = phone.replace(/[\s-]/g, "");
        const phonePattern = /^(?:\+91)?[6-9][0-9]{9}$/;

        if (!phonePattern.test(cleanPhone)) {
            showFormMessage("Please enter a valid Indian phone number.", false);
            return;
        }

        // Validate optional Tracking ID

        const trackingPattern = /^[A-Za-z]{2}[0-9]{9}$/;

        if (trackingID !== "" && !trackingPattern.test(trackingID)) {
            showFormMessage(
                "Tracking ID must contain 2 letters followed by 9 digits.",
                false
            );
            return;
        }

        showFormMessage(
            "Your enquiry has been submitted successfully! (Demo only - no data was sent.)",
            true
        );

        contactForm.reset()+;

    });

    function showFormMessage(message, success) {

        const formMessage = document.getElementById("formMessage");

        if (!formMessage) {
            return;
        }

        formMessage.textContent = message;33
        formMessage.classList.add("show");

        if (success) {
            formMessage.classList.add("success");
            formMessage.classList.remove("error");
        } else {
            formMessage.classList.add("error");
            formMessage.classList.remove("success");
        }

    }

}


/* =========================
   CUSTOMER REGISTRATION
========================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    const regName = document.getElementById("regName");
    const regEmail = document.getElementById("regEmail");
    const regPhone = document.getElementById("regPhone");
    const regPassword = document.getElementById("regPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const registerMessage = document.getElementById("registerMessage");
    const toggleRegPassword = document.getElementById("toggleRegPassword");

    // Show or hide registration password

    if (toggleRegPassword) {

        toggleRegPassword.addEventListener("click", function () {

            if (regPassword.type === "password") {
                regPassword.type = "text";
                toggleRegPassword.innerText = "Hide";
            } else {
                regPassword.type = "password";
                toggleRegPassword.innerText = "Show";
            }

        });

    }

    // Registration form submission

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = regName.value.trim();
        const email = regEmail.value.trim().toLowerCase();
        const phone = regPhone.value.trim();
        const password = regPassword.value;
        const confirm = confirmPassword.value;

        // Validate name

        if (name.length < 2) {
            registerMessage.innerText = "Please enter your full name.";
            registerMessage.style.color = "red";
            return;
        }

        // Validate phone

        const phonePattern = /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(phone)) {
            registerMessage.innerText = "Please enter a valid 10-digit Indian phone number.";
            registerMessage.style.color = "red";
            return;
        }

        // Validate password

        if (password.length < 6) {
            registerMessage.innerText = "Password must contain at least 6 characters.";
            registerMessage.style.color = "red";
            return;
        }

        // Confirm password

        if (password !== confirm) {
            registerMessage.innerText = "Passwords do not match.";
            registerMessage.style.color = "red";
            return;
        }

        // Get existing users

        let users = JSON.parse(localStorage.getItem("shiptrackerUsers")) || [];

        // Check if email already exists

        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            registerMessage.innerText = "This email is already registered. Please login.";
            registerMessage.style.color = "red";
            return;
        }

        // Save new user

        const newUser = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("shiptrackerUsers", JSON.stringify(users));

        registerMessage.innerText = "Registration successful! You can now login.";
        registerMessage.style.color = "green";

        registerForm.reset();

    });

}


/* =========================
   CUSTOMER LOGIN
========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginMessage = document.getElementById("loginMessage");

    // Show or hide password

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            if (password.type === "password") {
                password.type = "text";
                togglePassword.innerText = "Hide";
            } else {
                password.type = "password";
                togglePassword.innerText = "Show";
            }

        });

    }

    // Login form submission

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const enteredPassword = password.value;

        // Get registered users

        let users = JSON.parse(localStorage.getItem("shiptrackerUsers")) || [];

        // Find matching account

        const loggedInUser = users.find(function (user) {

            return user.email === email &&
                   user.password === enteredPassword;

        });

        if (loggedInUser) {

            loginMessage.innerText = "Welcome " + loggedInUser.name + "! Login successful.";
            loginMessage.style.color = "green";

        } else {

            loginMessage.innerText = "Invalid email or password. Please register first.";
            loginMessage.style.color = "red";

        }

    });

}
