// enquire Btns
const enquireBtn = document.getElementById("enquire-my-pop");
const enquireCakepops = document.getElementById("enquire-cakepops");
const enquireClassicCakesicles = document.getElementById("enquire-classic-cakesicles");
const enquireCustomCakesicles = document.getElementById("enquire-custom-cakesicles");

// custom pop fields
const cakeFlavourInput = document.getElementById("cake-flavour");
const extrasInput = document.getElementById("extra-info");

enquireBtn.addEventListener("click", () => {
    const cakeType = document.querySelector('input[name="cake-type"]:checked').value;
    const cakeFlavour = cakeFlavourInput.value;
    const coating = document.querySelector('input[name="coating"]:checked').value;
    const extras = extrasInput.value;

    const customPop = {
        cakeType,
        cakeFlavour,
        coating,
        extras
    };
    sessionStorage.setItem("custom-pop", JSON.stringify(customPop));
    sessionStorage.setItem("from-custom-pop", true);

    window.location.href = "./contact.html";
});

enquireCakepops.addEventListener("click", () => {
    sessionStorage.setItem("from-pop-picks", "cakepop");

    window.location.href = "./contact.html";
});
enquireClassicCakesicles.addEventListener("click", () => {
    sessionStorage.setItem("from-pop-picks", "classic-cakesicle");

    window.location.href = "./contact.html";
});
enquireCustomCakesicles.addEventListener("click", () => {
    sessionStorage.setItem("from-pop-picks", "custom-cakesicle");

    window.location.href = "./contact.html";
});