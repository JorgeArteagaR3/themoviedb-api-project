const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: "d1770de77ffb7b48f7629704782abfec",
    },
});
//UTILS

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((image) => {
        if (image.isIntersecting) {
            const url = image.target.getAttribute("data-img");
            image.target.setAttribute("src", url);
        }
    });
});
const likedMoviesList = () => {
    const item = JSON.parse(localStorage.getItem("liked_movies"));
    let movies;
    item ? (movies = item) : (movies = {});
    return movies;
};
const likedMovie = (movie) => {
    const likedMovies = likedMoviesList();
    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }
    localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
};

const createMovie = (arr, container, lazyload = false) => {
    container.innerHTML = "";
    createMoreMovie(arr, container, lazyload);
};

const createMoreMovie = (arr, container, lazyload) => {
    arr.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        const moviePoster = document.createElement("img");
        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        moviePoster.classList.add("movie-img");
        moviePoster.setAttribute("alt", movie.title);
        moviePoster.setAttribute(
            lazyload ? "data-img" : "src",
            "https://image.tmdb.org/t/p/w500/" + movie.poster_path
        );
        moviePoster.addEventListener("click", () => {
            location.hash = "#movie=" + movie.id;
        });
        if (lazyload) {
            lazyLoader.observe(moviePoster);
            if (moviePoster.dataset.img.includes("null")) {
                // moviePoster.dataset.img =
                //     "https://www.popcorn.app/assets/app/images/placeholder-movieimage.png";
                movieContainer.innerText = movie.title;
                moviePoster.classList.add("inactive");
                movieContainer.style.background = "#ffa41c";
            }
        }
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("like-btn--liked");
            likedMovie(movie);
            createFavouriteMoviesList();
        });
        if (likedMoviesList()[movie.id]) {
            likeBtn.classList.add("like-btn--liked");
        }
        movieContainer.appendChild(moviePoster);
        movieContainer.appendChild(likeBtn);
        container.appendChild(movieContainer);
    });
};
const createFavouriteMoviesList = () => {
    const moviesListArr = Object.values(likedMoviesList());
    createMovie(moviesListArr, likedMovieListContainer, false);
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

    maxPage = data.total_pages;
    console.log(maxPage);

    createMovie(movies, trendingPreviewMoviesContainer, true);
}

async function getCategoriesPreview() {
    const genreTitle = document.createElement("h2");
    genreTitle.innerText = "Genres";
    categoriesListContainer.prepend(genreTitle);
    const { data, status } = await api("genre/movie/list");
    categoriesListContainer.innerHTML = "";
    categoriesListContainer.appendChild(genreTitle);

    const genres = data.genres;

    createCategories(genres, categoriesListContainer);
}

const getTrendingMoviesByCategory = async (id, name) => {
    headerGenreTitle.innerText = name;

    const { data } = await api("discover/movie", {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    createMovie(movies, genericListContainer, true);
};
const seeMoreMoviesByCategory = (id) => {
    return async () => {
        seeMorePages("discover/movie", { with_genres: id });
    };
};
const getMoviesBySearch = async (query) => {
    const { data } = await api("search/movie", {
        params: {
            query: query,
        },
    });
    const movies = data.results;

    createMovie(movies, genericListContainer, true);
};
const seeMoreMoviesBySearch = (query) => {
    return async () => {
        seeMorePages("search/movie", { query });
    };
};
async function getTrendingMoviesList() {
    const { data, status } = await api("trending/movie/day");
    const movies = data.results;
    genericListContainer.innerHTML = "";
    createMovie(movies, genericListContainer, true);
}

async function getMovieById(id) {
    const { data, status } = await api("/movie/" + id);
    movieDetailTitle.textContent = data.original_title;
    backgroundContainer.style.background = `url(${
        "https://image.tmdb.org/t/p/w500/" + data.poster_path
    }) no-repeat `;
    backgroundContainer.style.backgroundSize = "cover";
    movieScore.textContent = data.vote_average;
    movieDetailImg.src = "https://image.tmdb.org/t/p/w500/" + data.poster_path;
    movieDetailDescription.textContent = data.overview;
    movieDetailGenresContainer.innerHTML = "";
    createCategories(data.genres, movieDetailGenresContainer);
}
const seeMoreTrendingPages = async () => {
    const endpoint = "trending/movie/day";
    seeMorePages(endpoint);
};
const seeMorePages = async (endpoint, extraParams = {}) => {
    if (isInfiniteScrollLoading) return;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    let bottomPageScroll = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = seeMoreCount < maxPage;
    if (bottomPageScroll && pageIsNotMax) {
        isInfiniteScrollLoading = true;
        const { data } = await api(endpoint, {
            params: {
                page: seeMoreCount++,
                ...extraParams,
            },
        });
        const movies = data.results;
        createMoreMovie(movies, genericListContainer, true);
        isInfiniteScrollLoading = false;

        console.log(data);
        console.log(seeMoreCount);
    }
};

async function getSimilarMovies(id) {
    const { data, status } = await api(`/movie/${id}/similar`);
    createMovie(data.results, relatedMoviesContainer, true);
}
