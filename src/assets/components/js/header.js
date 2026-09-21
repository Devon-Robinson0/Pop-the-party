async function loadHeader() {
  const response = await fetch("../assets/components/header.html");
  const headerHTML = await response.text();

  document.querySelector("#header").innerHTML = headerHTML;
}

loadHeader();

document.addEventListener("click", (event) => {
  const button = event.target.closest(".menu-toggle");

  if (!button) return;

  const nav = button.closest(".site-nav");
  nav.classList.toggle("is-open");
});
