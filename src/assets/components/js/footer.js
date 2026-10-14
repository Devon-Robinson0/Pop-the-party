async function loadFooter() {
  const response = await fetch("/assets/components/footer.txt", {
    cache: "no-store"
  });

  

  if (!response.ok) {
    throw new Error(`Could not load Footer: ${response.status}`);
  }

  const footerHTML = await response.text();
  document.querySelector("#footer").innerHTML = footerHTML;
}

loadFooter().catch((error) => {
  console.error("Footer failed to load:", error);
});
