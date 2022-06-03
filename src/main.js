const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        "Content-type": "application/json;charset=utf-8",
    },
    params: {
        api_key: "d1770de77ffb7b48f7629704782abfec",
    },
});

async function getTrendingMovies() {
    const { data, status } = await api("trending/movie/day");
    const movies = data.results;
    const trendingPreviewMoviesContainer = document.querySelector(
        "#trendingPreview .trendingPreview-movieList"
    );
    trendingPreviewMoviesContainer.innerHTML = "";
    movies.forEach((movie) => {
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

        trendingPreviewMoviesContainer.appendChild(moviePoster);
    });
}

async function getCategoriesPreview() {
    const { data, status } = await api("genre/movie/list");

    const genres = data.genres;
    const categoriesListContainer = document.querySelector(
        ".categoriesPreview-container"
    );

    categoriesListContainer.innerHTML = "";
    const genreTitle = document.createElement("h2");
    genreTitle.innerText = "Genre";
    categoriesListContainer.appendChild(genreTitle);

    genres.forEach((genre) => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitleColor = document.createElement("div");
        categoryTitleColor.classList.add("category-title-color");
        categoryTitleColor.setAttribute("id", "id" + genre.id);

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.innerText = genre.name;

        categoryContainer.appendChild(categoryTitleColor);
        categoryContainer.appendChild(categoryTitle);
        categoriesListContainer.appendChild(categoryContainer);
    });
}
