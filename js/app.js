

const input = document.querySelector('#search');
const otherImg = 'https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg';


function createMovieCard(film) {
  const filmImage = film.show.image.medium ? film.show.image.medium : otherImg
  const movieCards = document.querySelectorAll('.card-body');
  const movieName = film.show.name;
  const movieDescribe = film.show.summary;
  const movieUrl = film.show.officialSite;
  const score = film.score;
  const numberOfStars = Math.floor(score*5);
  

  const movieCard = document.createElement('div');
  movieCard.innerHTML = `
    <div class="card shadow-sm">
    <img
      style="width: 100%; height: 250px"
      src='${film.show.image?.medium}'
    />
    <div class="card-body">
      <h3> ${movieName} </h3>
      <div class="card-text">
        ${movieDescribe}
      </div>
      <div
        class="d-flex justify-content-between align-items-center"
      >
      <div class="btn-group">
        <a type="button" class="btn btn-sm btn-outline-secondary" href="${movieUrl}" >
        Visit site
        </a>
      </div>
        <small class="star-block">
        </small>
      </div>
    </div>
  </div>
    `;

    const contentBlock = document.querySelector('#rowContainer');
    contentBlock.appendChild(movieCard);

    for (let k= 0; k<numberOfStars; k++) {
      console.log(k);
      const stars = document.createElement('span');
      stars.classList.add('fa', 'fa-star', 'text-success');
      movieCard.querySelector('.star-block').appendChild(stars);
    }
}



input.addEventListener('input',async function(event) {
    const request = event.target.value;


    if (request.length > 2) {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${request}`);
        const film = response.data;
        console.log(response);
        console.log(film.length);

        for (let i=0; i < film.length; i++) {
            console.log(i);
            createMovieCard(film[i]);
       
        }
    }  
    
})

