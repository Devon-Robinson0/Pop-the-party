// Form inputs
const form = document.querySelector("form");
const inspirationInput = document.getElementById("inspiration");
const submitBtn = document.getElementById("prepare-btn");
const date = document.getElementById("date");
// Form Gallery selection text & badges
const fromGalleryBadge = document.getElementById("from-gallery-badge");
const fromGalleryText = document.getElementById("from-gallery-text");

form.addEventListener("invalid", (event) => {
    event.preventDefault();
}, true);

submitBtn.addEventListener("click", () => {
    console.log(date.value);
    if (date.value !== "") {
        const today = new Date();
        const formatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        if (date.value < formatted) {
            date.setCustomValidity("Date must be in the future or empty");
        }
    } else {
        date.setCustomValidity("");
    }

    // Display errors
    const errorMsgs = document.querySelectorAll(".error-msg");
    errorMsgs.forEach(msg => {
        msg.hidden = true;
    });

    const invalidFields = form.querySelectorAll(
            "input:invalid, textarea:invalid"
        );
    
    invalidFields.forEach(field => {
        const errorMsg = [...field.parentElement.children].find(
            child => child !== field && child.classList.contains("error-msg")
        );
        if (errorMsg) {
            errorMsg.hidden = false;
        }
    });
});

const fromGalleryItem = localStorage.getItem("from-gallery-item") ?? false;;

if (fromGalleryItem === "true") {
    const inspiration = JSON.parse(localStorage.getItem("inspiration")) ?? {};

    inspirationInput.value = inspiration.name;

    fromGalleryBadge.style.display = "inline-flex";
    fromGalleryText.hidden = false;
} else {
    fromGalleryBadge.style.display = "none";
    fromGalleryText.hidden = true;
}

localStorage.setItem("from-gallery-item", false);