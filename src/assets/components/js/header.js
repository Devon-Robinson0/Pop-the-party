async function loadHeader() {
  const response = await fetch("../assets/components/header.html");

  if (!response.ok) {
    throw new Error(`Could not load header: ${response.status}`);
  }

  const headerHTML = await response.text();
  document.querySelector("#header").innerHTML = headerHTML;

  // Open or close the mobile menu
  const nav = document.querySelector(".site-nav");
  const menuButton = document.querySelector(".menu-toggle");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  // Highlight the current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".site-links a").forEach((link) => {
    const linkPage = new URL(link.href).pathname.split("/").pop();

    link.classList.toggle("active", linkPage === currentPage);
  });
}

loadHeader().catch((error) => {
  console.error("Header failed to load:", error);
});
