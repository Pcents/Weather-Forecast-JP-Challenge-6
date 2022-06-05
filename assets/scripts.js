var APIKey = "0fc4c11a5280d62b8043bc2aabd77ad1";
var searchHist = document.querySelector(".search-cont");
var searchInput = document.querySelector(".searchBtn");
var oldSearch = document.querySelector(".old-search");
// var city = searchBar;

// function city-data(){
//     api.openweathermap.org / data / 2.5 / weather ? q = searchBar & appid=APIKey

// };

// when i hit search is collects whats in the form and wont allow the 
// page to refresh, good
$(".searchBtn").on("click", function (e) {
    console.log(".searchBtn");
    var searchBar = $(this).siblings(".form-control").val();
    console.log(searchBar);
    e.preventDefault();
    var btnCreate = document.createElement("button");
    btnCreate.textContent = searchBar;
    btnCreate.value = searchBar;
    oldSearch.append(btnCreate);

});

// when i press search i want to create a new button with what was searched
searchInput.addEventListener("click", buttonHist);
console.log(searchInput);
function buttonHist() {
    var searchBar = $(this).siblings(".form-control").val();


};