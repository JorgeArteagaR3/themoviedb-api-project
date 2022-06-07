let seeMoreCount = 2;
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: "d1770de77ffb7b48f7629704782abfec",
    },
});

const createMovie = (arr, container) => {
    container.innerHTML = "";
    createMoreMovie(arr, container);
};
const createMoreMovie = (arr, container) => {
    arr.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        const moviePoster = document.createElement("img");
        moviePoster.classList.add("movie-img");
        moviePoster.setAttribute("alt", movie.title);
        moviePoster.setAttribute(
            "src",
            "https://image.tmdb.org/t/p/w500/" + movie.poster_path
        );

        movieContainer.appendChild(moviePoster);

        container.appendChild(moviePoster);
        moviePoster.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });
    });
};
function createCategories(arr, container) {
    arr.forEach((genre) => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitleColor = document.createElement("div");
        categoryTitleColor.classList.add("category-title-color");
        categoryTitleColor.setAttribute("id", "id" + genre.id);

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.innerText = genre.name;

        categoryContainer.addEventListener("click", () => {
            location.hash = `#category=${genre.id}-${genre.name}`;
        });

        categoryContainer.appendChild(categoryTitleColor);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}
async function getTrendingMovies() {
    const { data, status } = await api("trending/movie/day");
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector(
        "#trendingPreview .trendingPreview-movieList"
    );
    createMovie(movies, trendingPreviewMoviesContainer);
}

async function getCategoriesPreview() {
    const { data, status } = await api("genre/movie/list");
    const genres = data.genres;
    categoriesListContainer.innerHTML = "";
    const genreTitle = document.createElement("h2");
    genreTitle.innerText = "Genres";
    categoriesListContainer.appendChild(genreTitle);
    createCategories(genres, categoriesListContainer);
}

const getTrendingMoviesByCategory = async (id, name) => {
    const { data } = await api("discover/movie", {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    headerGenreTitle.innerText = name;

    createMovie(movies, genericListContainer);
};
const getMoviesBySearch = async (query) => {
    const { data } = await api("search/movie", {
        params: {
            query: query,
        },
    });
    const movies = data.results;

    createMovie(movies, genericListContainer);
};

async function getTrendingMoviesList() {
    const { data, status } = await api("trending/movie/day");
    const movies = data.results;
    genericListContainer.innerHTML = "";
    createMovie(movies, genericListContainer);
    const seeMoreButton = document.createElement("button");
    seeMoreBtnContainer.innerHTML = "";
    seeMoreBtnContainer.appendChild(seeMoreButton);
    seeMoreButton.classList.add("seeMore-btn");
    seeMoreButton.textContent = "see more";
    seeMoreButton.setAttribute("type", "button");
    seeMoreBtnContainer.classList.remove("inactive");

    seeMoreButton.addEventListener("click", () => {
        seeMoreButtonTrending();
        seeMoreCount += 1;
    });
}

async function getMovieById(id) {
    const { data, status } = await api("/movie/" + id);
    movieDetailTitle.textContent = data.original_title;
    movieScore.textContent = data.vote_average;
    movieDetailImg.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
    movieDetailDescription.textContent = data.overview;
    movieDetailGenresContainer.innerHTML = "";
    createCategories(data.genres, movieDetailGenresContainer);
}
const seeMoreButtonTrending = async () => {
    const { data } = await api("trending/movie/day", {
        params: {
            page: seeMoreCount,
        },
    });
    const movies = data.results;
    createMoreMovie(movies, genericListContainer);
};

async function getSimilarMovies(id) {
    const { data, status } = await api(`/movie/${id}/similar`);
    console.log(data.results);
    createMovie(data.results, relatedMoviesContainer);
}
