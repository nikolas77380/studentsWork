const query = document.querySelector("input");
const listFilm = [];
window.onload = async function () {
  clearPage();
  const result = await getFilms();
  createCardFilm();
};

//ожидание ввода и создание списка
query.addEventListener("input", async (event) => {
  const search = event.target.value;
  if (search.length < 3) {
    clearPage();
    const result = await getFilms();
    createCardFilm();
  } else {
    clearPage();
    const response = await getFilms(search);
    createCardFilm();
  }
});

//Поиск фильмов
async function getFilms(arg) {
  try {
    if (arg === undefined) {
      search = "https://api.tvmaze.com/show";
      const res = await axios.get(search);
      res.data.forEach((item) => {
        let img = item.image;
        if (img === null) {
          img =
            "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg";
        } else {
          img = item.image.original;
        }
        const res = {
          name: item.name,
          summary: item.summary,
          url: item.url,
          image: img,
          score: item.rating.average,
        };
        listFilm.push(res);
      });
    } else {
      search = `https://api.tvmaze.com/search/shows?q=${arg}`;
      const res = await axios.get(search);
      res.data.forEach((item) => {
        let img = item.show.image;
        if (item.show.image === null) {
          img =
            "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg";
        } else {
          img = item.show.image.original;
        }
        const res = {
          name: item.show.name,
          summary: item.show.summary,
          url: item.show.url,
          image: img,
          score: item.score,
        };
        listFilm.push(res);
      });
    }
  } catch {
    console.log("somthin wrong");
  }
}

//Создание карточки фильма
function createCardFilm() {
  listFilm.forEach((item) => {
    const img = item.image;
    const rowContainer = document.querySelector("#rowContainer");
    const div = document.createElement("div");
    const stars = starSummary(item.score);
    div.classList.add("col");

    div.innerHTML = `
              <div class="card">
                <img
                  src=${img}
                />
                <div class="card-body">
                  <h3>${item.name}</h3>
                  <p class="card-text">
                  ${item.summary}
                  </p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                    <a href=${item.url} class="button">
                        <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary">
                        Visit site
                      </button>
                    </a>  
                    
                    </div class =stars>
                    <small>
                        ${stars}      
                    </small>
                  </div>
                </div>
              </div>`;
    rowContainer.append(div);
  });
}
// очистка от поиска
function clearPage() {
  const clear = document.querySelector("#rowContainer");
  clear.innerHTML = "";
  listFilm.splice(0);
}

//рейтинг
//создание звезд по типу
function createStar(isFilled) {
  if (isFilled) {
    return '<span class="fa fa-star text-success"></span>';
  } else {
    return '<span class="fa fa-star"></span>';
  }
}
//подсчет звезд
function starSummary(arg) {
  if (arg <= 1) {
    let rating = (arg * 100) / 20;
    let stars = Math.round(rating);
    let html = "";
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        html += createStar(true);
      } else {
        html += createStar(false);
      }
    }
    return html;
  }else {
    let rating = arg;
    let stars = Math.round(rating);
    let html = "";
    for (let i = 0; i < 10; i++) {
      if (i < stars) {
        html += createStar(true);
      } else {
        html += createStar(false);
      }
    }
    return html;
  }
}
