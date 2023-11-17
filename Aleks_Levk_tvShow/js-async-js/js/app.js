const search = document.querySelector("#search");
const container = document.querySelector("#rowContainer")


search.addEventListener('input', function(){
    const searchText = search.value;

    if(searchText.length >= 3){
        container.innerHTML = "";

        fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`)
        .then((response) => response.json())
        .then((data) => {
            newCard(data);
        })
        .catch((error) => {
            console.error("Ошибка доступа к API", error);
        })
    } 
})

function newCard(data){
    container.style.display = "flex";
    data.forEach((item) => {
        const show = item.show;
        const imageUrl = show.image ? show.image.medium : "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg"
        const stars ='★'.repeat(Math.round(show.rating.average / 2));
        const description = show.summary || "No description";

        const movie = document.createElement("div");
        movie.classList.add('col');
        movie.innerHTML = `<div class = "card shadow-sm">
                              <img class="film-Preview" style="width:100%" src="${imageUrl}" />
                              <div class="card-body">
                                   <h3>${show.name}<h3>
                                   <p class="card-text">${description} </p>
                                   <div class="d-flex justify-content-between align-items-center">
                                   <div class="btn-group">
                                        <a href="${show.url}" target="_blank" class="btn btn-sm btn-outline-secondary"> Visit site</a>
                                    </div>
                                    <small>${stars}</small>
                                    </div>
                                </div>
                            </div>`;

        container.appendChild(movie);
    });
}