window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);
searchInput.addEventListener("keypress", (e) => {
    let searchData = searchInput.value;
    e.keyCode == 13 ? (location.hash = `#search=${searchData}`) : "";
});
searchBtn.addEventListener("click", () => {
    let searchData = searchInput.value;
    location.hash = `#search=${searchData}`;
});
seeMoreBtn.addEventListener("click", () => {
    location.hash = "#trends";
});

secondArrow.addEventListener("click", () => {
    location.hash = window.history.back();
});
arrow.addEventListener("click", () => {
    location.hash = window.history.back();
});
function navigator() {
    window.scrollTo(0, 0);

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    } else if (location.hash.startsWith("#search=")) {
        searchPage();
    } else if (location.hash.startsWith("#movie=")) {
        movieDetailsPage();
    } else if (location.hash.startsWith("#category=")) {
        categoriesPage();
    } else {
        homePage();
    }
}

const homePage = () => {
    headersSection.classList.remove("inactive");
    headerGenreTitle.classList.add("inactive");
    genericListContainer.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");
    trendingContainerSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    arrowContainer.classList.add("inactive");
    arrow.classList.remove("arrowOnDetail");
    arrow.classList.add("inactive");
    headersSection.style.height = "100%";

    getCategoriesPreview();
    getTrendingMovies();
};
const trendsPage = () => {
    headerGenreTitle.style.marginTop = "0";
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
    arrowContainer.classList.remove("inactive");
    headerGenreTitle.innerText = "Trending";
    getTrendingMoviesList();
};

const movieDetailsPage = (id) => {
    headersSection.classList.add("inactive");
    headerGenreTitle.classList.add("inactive");
    arrowContainer.classList.add("inactive");
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.remove("inactive");
    arrow.classList.add("inactive");
    genericListContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    arrow.classList.add("arrowOnDetail");
    headersSection.style.height = "0";

    const [_, movieId] = location.hash.split("=");
    getMovieById(movieId);
};

const categoriesPage = () => {
    headerGenreTitle.style.marginTop = "0";
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
    arrowContainer.classList.remove("inactive");

    const [unncesesary, idname] = location.hash.split("=");
    const [id, name] = idname.split("-");
    const newname = decodeURI(name);
    getTrendingMoviesByCategory(id, newname);
};

const searchPage = () => {
    headerGenreTitle.style.marginTop = "0";
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
    headerGenreTitle.innerText = "Results";
    arrowContainer.classList.remove("inactive");
    const [_, searchQuery] = location.hash.split("=");
    getMoviesBySearch(decodeURI(searchQuery));
};
