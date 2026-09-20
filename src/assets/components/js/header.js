async function loadHeader() {
  const response = await fetch("/src/assets/components/header.html");

  const headerHTML = await response.text();

  document.querySelector("#header").innerHTML = headerHTML;
}

loadHeader();