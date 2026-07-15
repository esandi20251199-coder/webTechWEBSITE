/* ============================================================
   validation.js
   Travel Enquiry Form - custom JavaScript validation
   ------------------------------------------------------------
   Coursework rule: HTML5 validation must NOT be used.
   The <form> has the "novalidate" attribute, so the browser
   does no checking. ALL checking below is done by JavaScript.

   Techniques used (all from CM1605 lectures):
   - document.getElementById()            (L08 / L09)
   - addEventListener("submit", ...)      (L09)
   - .value to read form fields           (L08)
   - if / else conditions                 (L06)
   - Date object to compare dates         (L07)
   - innerHTML to show messages           (L09)
   ============================================================ */

// Wait until the whole page (the DOM) has loaded before running,
// so that all the form elements already exist. (L09 - load event)
document.addEventListener("DOMContentLoaded", function () {

    // Find the form by its id. If this page has no such form, stop.
    var form = document.getElementById("enquiry-form");
    if (form === null) {
        return;
    }

    // A regular expression that describes a valid email pattern:
    // some characters, then @, then characters, then a dot, then characters.
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Run our checkForm() function every time the form is submitted.
    form.addEventListener("submit", function (event) {

        // Stop the browser's default action (sending the form / reloading).
        event.preventDefault();

        // Read the three mandatory fields by their id, then their value.
        var fullname = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var depart = document.getElementById("depart").value;

        // Start by assuming everything is correct.
        var valid = true;

        // Clear any old messages before checking again.
        document.getElementById("fullname-error").innerHTML = "";
        document.getElementById("email-error").innerHTML = "";
        document.getElementById("depart-error").innerHTML = "";
        document.getElementById("form-success").innerHTML = "";
        document.getElementById("form-success").className = "success-msg";

        // ---- Check 1: Full name must not be empty ----
        // .trim() removes spaces so " " does not count as filled.
        if (fullname.trim() === "") {
            document.getElementById("fullname-error").innerHTML = "Please enter your full name.";
            valid = false;
        }

        // ---- Check 2: Email must not be empty AND must match the pattern ----
        if (email.trim() === "") {
            document.getElementById("email-error").innerHTML = "Please enter your email address.";
            valid = false;
        } else if (emailPattern.test(email) === false) {
            document.getElementById("email-error").innerHTML = "Please enter a valid email address (e.g. name@example.com).";
            valid = false;
        }

        // ---- Check 3: Departure date must not be empty AND must be in the future ----
        if (depart === "") {
            document.getElementById("depart-error").innerHTML = "Please choose a departure date.";
            valid = false;
        } else {
            // Turn today's date and the chosen date into Date objects (L07).
            var today = new Date();
            today.setHours(0, 0, 0, 0); // ignore the time part, compare only the day
            var chosen = new Date(depart);

            if (chosen <= today) {
                document.getElementById("depart-error").innerHTML = "Departure date must be in the future.";
                valid = false;
            }
        }

        // ---- If every check passed, show an interactive success message ----
        if (valid === true) {
            var firstName = fullname.trim().split(" ")[0];
            var successBox = document.getElementById("form-success");
            successBox.className = "success-msg success-msg-visible";
            successBox.innerHTML =
                '<span class="success-icon" aria-hidden="true">&#10003;</span>' +
                '<strong class="success-title">Thank you, ' + firstName + '!</strong>' +
                '<span class="success-text">Your travel enquiry has been received.</span>' +
                '<span class="success-text">Our team will reply within <strong>2 working days</strong>.</span>';
            form.reset();
            document.getElementById("travellers").value = "1";
            successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    // Keep number of travellers at 1 or above (no zero or negative values).
    var travellersInput = document.getElementById("travellers");
    if (travellersInput !== null) {
        travellersInput.addEventListener("input", function () {
            if (this.value === "" || Number(this.value) < 1) {
                this.value = "1";
            }
        });
        travellersInput.addEventListener("change", function () {
            if (Number(this.value) < 1) {
                this.value = "1";
            }
        });
    }

    // When a category is chosen, tick the matching interest checkbox (apply filter).
    var categorySelect = document.getElementById("category");
    if (categorySelect !== null) {
        categorySelect.addEventListener("change", function () {
            var value = this.value;
            if (value === "") {
                return;
            }
            var checkbox = null;
            if (value === "historical") {
                checkbox = document.getElementById("i-history");
            } else if (value === "scenic") {
                checkbox = document.getElementById("i-scenic");
            } else if (value === "cities") {
                checkbox = document.getElementById("i-cities");
            } else if (value === "beaches") {
                checkbox = document.getElementById("i-beach");
            } else if (value === "mountains") {
                checkbox = document.getElementById("i-mountain");
            } else if (value === "wildlife") {
                checkbox = document.getElementById("i-wildlife");
            }
            if (checkbox !== null) {
                checkbox.checked = true;
            }
        });
    }
});
