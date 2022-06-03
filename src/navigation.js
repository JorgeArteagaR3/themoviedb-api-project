window.addEventListener("hashchange", navigator, false);
window.addEventListener("DOMContentLoaded", navigator, false);

searchBtn.addEventListener("click", () => {
    location.hash = "#search=";
});
seeMoreBtn.addEventListener("click", () => {
    location.hash = "#trends";
});
arrow.addEventListener("click", () => {
    location.hash = "#home";
});
function navigator() {
    console.log({ location });
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
    genericListContainer.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    searchForm.classList.remove("inactive");
    trendingContainerSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");

    arrow.classList.add("inactive");
    headersSection.style.height = "100%";

    getCategoriesPreview();
    getTrendingMovies();
};
const trendsPage = () => {
    headerGenreTitle.style.marginTop = "0.5em";
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
};

const movieDetailsPage = () => {
    headersSection.classList.add("inactive");
    headerGenreTitle.classList.add("inactive");
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
};

const categoriesPage = () => {
    headerGenreTitle.style.marginTop = "0.5em";
    headerTitle.classList.add("inactive");
    searchForm.classList.add("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
};

const searchPage = () => {
    headerGenreTitle.style.marginTop = "0.5em";
    headerTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
    trendingContainerSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    movieDetailContainer.classList.add("inactive");
    arrow.classList.remove("inactive");
    genericListContainer.classList.remove("inactive");
    headerGenreTitle.classList.remove("inactive");
};
