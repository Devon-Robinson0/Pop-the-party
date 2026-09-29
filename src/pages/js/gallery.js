const galleryList = document.getElementById("gallery");
const photoNum = document.getElementById("photo-no");
// Modal
const galleryModal = document.getElementById("gallery-modal");
const closeBtn = document.getElementById("close-modal");
const galleryTitle = document.getElementById("modal-title");
const galleryImgHolder = document.getElementById("modal-img-holder");

function addFilterListeners() {
    const filters = document.querySelectorAll('input[name="filter"]');

    filters.forEach(f => {
        f.addEventListener("change", () => {
            loadGallery();
        });
    });
}

async function loadGallery() {
    const response = await fetch("../assets/json/gallery-imgs.json");

    if (!response.ok) {
        throw new Error("Could not load gallery imgs JSON file");
    }

    const gallery = await response.json();

    galleryList.innerHTML = "";

    let itemCount = 0;
    gallery.forEach(item => {
        const filter = document.querySelector('input[name="filter"]:checked').value;

        if (!(item.filter === filter) && filter !== "all") 
            return;

        galleryList.insertAdjacentHTML("beforeend", `
            <li id="${item.id}" class="${item.filter}">
                <div class="img-holder">
                    <img src="../assets/gallery-imgs/${item.filename}" alt="${item.alt}" />
                </div>
                <h2>${item.name}</h2>
                <p class="muted-text">${item.filter}</p>
            </li>
            `);
        
        itemCount++;
    });

    photoNum.textContent = itemCount;

    const galleryItems = galleryList.querySelectorAll("li");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const match = gallery.find(m => m.id === Number(item.id));

            galleryTitle.textContent = match.name;
            galleryImgHolder.innerHTML = `
                <img src="../assets/gallery-imgs/${match.filename}" alt="${match.alt}" />
            `;

            galleryModal.showModal();
        });
    });
}

closeBtn.addEventListener("click", () => {
    galleryModal.close();
});

addFilterListeners();
loadGallery();
