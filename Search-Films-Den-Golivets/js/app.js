//    ---------------------------  Search

let show;
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const searchMessage = document.getElementById('searchMessage');

searchMessage.style.display = 'none';

//  ------------------------------  Axios для More Information

async function getMovieInfoById(id) {
    try {
        const url = `https://api.tvmaze.com/shows/${id}?embed=cast`;
        const response = await axios.get(url);
    return response.data;
    } catch (error) {
        console.error('Error fetching movie info:', error);
    return null;
    }
}

// ------------------------------   Axios для Search

async function searchShows() {
    const searchText = searchInput.value;
    const rowContainer = document.getElementById('rowContainer');    

    searchMessage.style.display = 'none';
    rowContainer.innerHTML = '';

    if (searchText.length < 3) {
        searchMessage.textContent = 'Need more letters!';
        searchMessage.style.display = 'block';
        return;
    }
    try {
        const url = `https://api.tvmaze.com/search/shows?q=${searchText}`;
        const res = await axios.get(url);
        show = res.show;
        const data = res.data;

        data.forEach(res => {
            const show = res.show;
            const card = createMovieCard(show); 
            rowContainer.appendChild(card);

        const movieModal = document.getElementById('movieModal');   // ----------------------  Добавление Элементов модального окна в HTML
        const movieModalTitle = document.getElementById('movieModalTitle');
        const movieModalImage = document.getElementById('movieModalImage');
        const movieModalSummary = document.getElementById('movieModalSummary');
        const movieModalRating = document.getElementById('movieModalRating');
        const movieModalVisit = document.getElementById('movieModalVisit');
        movieModalVisit.classList.add('custom-btn');
        movieModalVisit.classList.add('btn2');

    card.addEventListener('click', async () => {                      
        const originalSummary = show.summary;                       // -----------------------   Добавление подробной информации  в  модальное окно                                                                
        movieModalTitle.textContent = show.name;
        movieModalImage.src = show.image ? show.image.medium : './assets/movie-poster.webp';
        movieModalSummary.textContent = originalSummary ? stripHTMLTags(originalSummary) : 'No summary available.';
        movieModalRating.innerHTML = createStarRaiting(show.rating.average);
        movieModalVisit.href = show.url;
        movieModal.style.display = 'block'; 
    
    if (show.id) {                                                // -----------------------   Добавление более подробной инфы Шоу в м.о.
        const movieInfo = await getMovieInfoById(show.id);
        if (movieInfo) {
            const additionalInfo = document.createElement('div');
            additionalInfo.classList.add('additional-info');
            additionalInfo.innerHTML = `<h4>More Information:</h4>`;                    
        if (movieInfo.network) {
            additionalInfo.innerHTML += `<p>Network: ${movieInfo.network.name}</p>`;
        }
        if (movieInfo.schedule) {
            additionalInfo.innerHTML += `<p>Schedule: ${movieInfo.schedule.days.join(', ')} at ${movieInfo.schedule.time}</p>`;
        }
        if (movieInfo.status) {
            additionalInfo.innerHTML += `<p>Status: ${movieInfo.status}</p>`;
        }
        if (movieInfo.type) {
            additionalInfo.innerHTML += `<p>Show Type: ${movieInfo.type}</p>`;
        }
        if (movieInfo.genres) {
            additionalInfo.innerHTML += `<p>Genres: ${movieInfo.genres.join(', ')}</p>`;
        }
            movieModalSummary.appendChild(additionalInfo);
        }
    }
});

// ------------------      Закрытие модального окна при клике вне его области

movieModal.addEventListener('click', (event) => {
    if (event.target === movieModal) {
        movieModal.style.display = 'none';
    }
});

// -------------------     Закрытие модального окна при клике на кнопку "Close"

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', () => {
    movieModal.style.display = 'none';
});
    const images = document.querySelectorAll('.image');
    images.forEach((image) => {
        image.classList.add('show');
    });
    });
    } 
    catch(error) {
        console.error('Error data', error);
    }
};

//  --------------------    Ввод с Enter

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchShows();
    }
});

// --------------------- Сlick, вне окна поиска

document.addEventListener('click', (event) => {
    const isSearchInput = searchInput.contains(event.target);
    const isSearchButton = searchButton.contains(event.target);

    if (!isSearchInput && !isSearchButton) {
        searchMessage.style.display = 'none';
    }
});

searchButton.addEventListener('click', searchShows);

//  ------------------------- Удаление тегов с описания

function stripHTMLTags(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// ---------------------------------  Карточки шоу

function createMovieCard(show) {
    const card = document.createElement('div');
    card.className = 'col';
    card.innerHTML = `
        <div class="card shadow-sm">
        <img src="${show.image ? show.image.medium : './assets/movie-poster.webp'}" class="image" />
    </div>
    `;
    card.classList.add('fade-in');
    return card;
}

// ---------------------------------  Рейтинг Звезд

function createStarRaiting(average) {
    if (average == null) {
        return 'No Rating';
    }

    const maxStars = 5;
    const allStars = Math.floor(average / 2);
    let half = average % 2 === 1;

    let stars = '';
    for (let i = 0; i < maxStars; i++ ) {
        if (i < allStars) {
            stars += '<span class="fa fa-star text-success"></span>';
        } else if (half) {
            stars += '<span class="fa fa-star-half-o text-success"></span>';
            half = false;
        } else {
            stars += '<span class="fa fa-star-o text-success"></span>';
        }
    }
    return stars;
}

//  -----------------------  Лупа --------------------

const loop = document.querySelector('.loop');
const textWidth = loop.previousSibling.clientWidth;
const animationDuration = 10000;
const delay = 4000; 

function startLoop() {
    loop.style.animation = 'none';
    loop.style.left = `-${textWidth + 20}px`;
    void loop.offsetWidth;
    loop.style.animation = `moveLoop ${animationDuration}ms linear, blink 10s steps(1, start) infinite`;
    setTimeout(() => {
        loop.style.animation = 'none';
    setTimeout(() => {
        loop.style.animation = `moveLoop ${animationDuration}ms linear, blink 10s steps(1, start) infinite`;
    }, delay);
    }, animationDuration);
}

startLoop();
setInterval(startLoop, animationDuration + delay);
// ------------------------------------------------------------

document.querySelector( "#retrobg-sun" ).onclick = () => {
	document.querySelector( "#retrobg" ).classList.toggle( "retrobg-shutdown" );
};