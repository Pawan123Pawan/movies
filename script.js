// http://www.omdbapi.com/?i=tt3896198&apikey=726ba094
let api_key = "726ba094";
// const query = "Javan";
let searchBox = document.getElementById("search");
let container = document.getElementById("movie-list");
let error = document.getElementById("error");
const api = document.getElementById("api");



document.getElementById("clickApi").addEventListener("click", () => {
    api_key=api.value;
});
api.addEventListener("keydown", (event) => {
    if(event.key ==="Enter"){
        api_key=api.value;
    }
});



async function fetchData(query1){
    const url = `http://www.omdbapi.com/?s=${query1}&apikey=${api_key}`;
    try{
        const res = await fetch(url);
        const result = await res.json();
        renderVideoData(result.Search)
        document.getElementById("loader").style.display="none";
    }
    catch(error){
        document.getElementById("loader").style.display="block";
        setTimeout(()=>{
            window.location.replace("./error.html");
        },5000)
    }
}
fetchData();




function renderVideoData(data){
    data.forEach((data, index) => {
        const card = document.createElement("div");
        card.className = "movie-card";
        let myCard = `
            <div class="movie-card" target="_blank" id="movie-card" onclick="location.href = 'https://www.imdb.com/title/${
                data.imdbID
            }'"
            }
            }" >
                <img
                src="${
                    data.Poster === "N/A"
                    ? `https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`
                    : data.Poster
                }"
                alt="Poster"
                />
                <div class="name">
                <div class="index">${index+1}</div>
                <div class="title">${data.Title}</div>
                </div>
            </div>`;
        card.innerHTML = myCard;
        container.appendChild(card);
    });
}


function removeItem(){
    const remove = document.querySelectorAll("#movie-list div")
    remove.forEach(ele => ele.remove());
}



const search = document.getElementById("myId");
const dataSearch = document.getElementsByClassName("search")[0];

dataSearch.addEventListener("click" ,()=>{
    let input = search.value;
    if(input!==""){
        removeItem();
        fetchData(input);
    }
    search.value = "";
})
search.addEventListener("keydown", (event)=>{
    if(event.key ==="Enter"){
        event.preventDefault();
        removeItem();
        fetchData(search.value);
        search.value = "";
    } 
})