
const searchInput = document.querySelector("#search");
const rowContainer = document.querySelector("#rowContainer");


rowContainer.style.display = "none";

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value;

    if (searchText.length >= 3) {

        rowContainer.innerHTML = "";

        fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data);
            })
            .catch((error) => {
                console.error("Error when requesting API:", error);
            });
    } else {
        rowContainer.style.display = "none";
    }
});

function displayResults(data) {
    rowContainer.style.display = "flex";
    data.forEach((item) => {
        const show = item.show;
        const imageUrl = show.image ? show.image.medium : "https://as1.ftcdn.net/v2/jpg/01/01/89/46/1000_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg";
        const stars = "★".repeat(Math.round(show.rating.average / 2));
        const description = show.summary || "No description";

        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
    <div class="card shadow-sm">
      <img style="width: 100%; height: 250px" src="${imageUrl}" />
      <div class="card-body">
        <h3>${show.name}</h3>
        <p class="card-text">${description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="${show.url}" target="_blank" class="btn btn-sm btn-outline-secondary">Visit site</a>
          </div>
          <small>${stars}</small>
        </div>
      </div>
    </div>
  `;

        rowContainer.appendChild(card);
    });
}