// Form inputs
const form = document.querySelector("form");
const inspirationInput = document.getElementById("inspiration");
const cakeTypeInput = document.getElementById("type");
const flavourInput = document.getElementById("favourite");
const extrasInput = document.getElementById("extra");
const submitBtn = document.getElementById("prepare-btn");
const date = document.getElementById("date");
// Form Gallery selection text & badges
const fromGalleryBadge = document.getElementById("from-gallery-badge");
const fromGalleryText = document.getElementById("from-gallery-text");

const saved = JSON.parse(sessionStorage.getItem("draft")) ?? {};

for (const field of form.elements) {
    if (!field.name || !(field.name in saved)) continue;

    if (field.type === "checkbox" || field.type === "radio") {
        field.checked = saved[field.name].includes(field.value);
    } else {
        field.value = saved[field.name][0];
    }
}

form.addEventListener("input", () => {
    const data = new FormData(form);
    const saved = {};

    for (const name of new Set(data.keys())) {
        saved[name] = data.getAll(name);
    }

    sessionStorage.setItem("draft", JSON.stringify(saved));
});

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

const fromGalleryItem = sessionStorage.getItem("from-gallery-item") ?? false;;

if (fromGalleryItem === "true") {
    const inspiration = JSON.parse(sessionStorage.getItem("inspiration")) ?? {};

    inspirationInput.value = inspiration.name;

    fromGalleryBadge.style.display = "inline-flex";
    fromGalleryText.hidden = false;
} else {
    fromGalleryBadge.style.display = "none";
    fromGalleryText.hidden = true;
}

sessionStorage.setItem("from-gallery-item", false);

const fromCustomPop = sessionStorage.getItem("from-custom-pop") ?? false;

if (fromCustomPop === "true") {
    const customPop = JSON.parse(sessionStorage.getItem("custom-pop")) ?? {};

    cakeTypeInput.value = customPop.cakeType;
    flavourInput.value = customPop.cakeFlavour;

    const coatingStr = customPop.coating === "default" ? "Coating: unsure" : `Coating: ${customPop.coating}\n\n`;

    extrasInput.value = `${coatingStr}${customPop.extras}`;
}

sessionStorage.setItem("from-custom-pop", false);

const fromPopPicks = sessionStorage.getItem("from-pop-picks") ?? "";

if (fromPopPicks) {
    cakeTypeInput.value = fromPopPicks;
}

sessionStorage.setItem("from-pop-picks", "");