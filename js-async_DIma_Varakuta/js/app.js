
function searchShows(query) {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(response => response.json())
        .then(data => {
     
            document.getElementById("results").innerHTML = "";
            
           
            data.forEach(show => {
                const card = createShowCard(show.show);
                document.getElementById("results").appendChild(card);
            });
        });
}

function createShowCard(show) {
    const card = document.createElement("div");
    card.classList.add("col-md-4");
    card.innerHTML = `
        <div class="card mb-4">
            <img src="${show.image ? show.image.medium : 'https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg'}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text" style="height: 50px; overflow: auto;">${show.summary || "Нет описания"}</p>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-between">
                    <div class="stars" style="color: gold;">${show.rating.average ? (show.rating.average / 2) : 0} &#9733;</div>
                    <a href="${show.url}" target="_blank" class="btn btn-primary">Посетить сайт</a>
                </div>
            </div>
        </div>
    `;
    return card;
}
document.getElementById("searchInput").addEventListener("input", event => {
    const query = event.target.value;
    if (query.length >= 3) {
        searchShows(query);
    }
});


