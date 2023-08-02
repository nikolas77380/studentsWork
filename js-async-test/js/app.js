let search = document.querySelector("#search");
const container = document.querySelector("#rowContainer");
let films = [];
let filmYears = [];
let filterFunktion = false;

search.addEventListener("input", handleSearch);

async function handleSearch(event) {
  if (search.value.length >= 3) {
    try {
      const text = search.value;
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${text}`
      );
      container.innerHTML = "";
      const data = response.data;
      films = response.data;

      const years = films.reduce((acc, curr) => {
        const year = curr.show.premiered;
        if (!acc.includes(year)) {
          acc.push(year);
        }
        return acc;
      }, []);
      filmYears = years;
      console.log(years);
      console.log(data);
      return render(data);
    } catch (error) {
      console.log("Error:", error);
    }
  } else {
    clearButtons();
  }
}

function render(films) {
  for (let i = 0; i < films.length; i++) {
    const result = films[i];
    createMovieCard(result);
  }
  if (!filterFunktion) {
    filterFunc();
    filterFunktion = true;
  }
}

function createMovieCard(result) {
  const movieCard = document.createElement("div");
  movieCard.setAttribute("class", "col");
  const movieCardd = document.createElement("div");
  movieCardd.setAttribute("class", "card shadow-sm");
  const name = document.createElement("h3");
  const summary = document.createElement("p");
  summary.classList.add("summaryWrapper");
  const filmName = result.show.name;
  name.innerHTML = `${filmName}`;

  const filmSummary = result.show.summary;
  summary.innerHTML = `${filmSummary}`;

  const image = result.show.image
    ? result.show.image.medium
    : "https://img.freepik.com/free-photo/movie-background-collage_23-2149876028.jpg";
  const img = document.createElement("img");
  img.classList.add("image");
  img.src = image;
  img.alt = filmName;

  const rating = result.score * 5;
  const ratingStars = "★".repeat(rating);
  const ratingD = document.createElement("div");
  ratingD.classList.add("rating");
  ratingD.textContent = ratingStars;

  const a = document.createElement("a");
  a.setAttribute("class", "btn btn-sm btn-outline-secondary");
  a.href = result.show.url;
  a.textContent = "Visit site";
  const btnG = document.createElement("div");
  btnG.setAttribute("class", "btn-group");
  const bDiv = document.createElement("div");
  bDiv.setAttribute(
    "class",
    "d-flex justify-content-between align-items-center"
  );

  container.appendChild(movieCard);
  movieCard.appendChild(movieCardd);
  movieCardd.appendChild(img);
  movieCardd.appendChild(name);
  movieCardd.appendChild(summary);
  movieCardd.appendChild(bDiv);
  bDiv.appendChild(btnG);
  btnG.appendChild(a);
  bDiv.appendChild(ratingD);
}

let filmsList = document.querySelector("#Sort");

filmsList.addEventListener("change", selectChange);

function selectChange() {
  const selectedValue = filmsList.value;
  const sortedFilms = sortFilms(selectedValue);
  container.innerHTML = "";
  render(sortedFilms);
}

function sortFilms(selectedValue) {
  let sortedArray = [...films];

  sortedArray.sort((a, b) => {
    switch (selectedValue) {
      case "nameAsc":
        return a.show.name.localeCompare(b.show.name);
      case "nameDesc":
        return b.show.name.localeCompare(a.show.name);
      case "ratingAsc":
        a.show.rating.average > b.show.rating.average;
        return 1;
      case "ratingDesc":
        b.show.rating.average < a.show.rating.average;
        return -1;
    }
  });

  return sortedArray;
}

let filmsYear = document.querySelector("#filter");

const filterChange = function () {
  const selectedYear = filmsYear.value;
  const filteredFilms = filterFilms(selectedYear);
  container.innerHTML = "";
  render(filteredFilms);
};

filmsYear.addEventListener("click", filterChange);

function filterFilms(selectedYear) {
  return films.filter((film) => {
    const year = film.show.premiered;
    console.log(year.substr(0, 4));
    return year === selectedYear;
  });
}

function filterFunc() {
  const filterContainer = document.querySelector("#filter");
  filterContainer.innerHTML = "";

  for (let i = 0; i < filmYears.length; i++) {
    const value = filmYears[i];
    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-secondary");
    button.textContent = value.substr(0, 4);
    button.addEventListener("click", () => {
      filmsYear.value = value;
      return value;
    });
    console.log(value);
    filterContainer.appendChild(button);
  }
}
filterFunc();
// function clearButtons() {
//   document.querySelector("#filter").remove();
//   filmYears = [];
//   films = [];
// }
