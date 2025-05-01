const url = "travel_recommendation_api.json";

const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const searchInput = document.getElementById('searchInput');
const categories = ["countries", "temples", "beaches"];
const results = document.getElementById('results')

let recommendations = [];


fetch(url)
.then(response =>{
    return response.json()
})
.then(data =>{
    recommendations = data;
})


searchButton.addEventListener('click', beginSearch());
clearButton.addEventListener('click', reset())

function beginSearch(){

    function searchKeyWord(){
        // Convert the input into lowercase
        const searchTerm = (searchInput.value).toLowerCase();
        // check if the value in the input match a category
        const category = categories.find((v) => v.includes(searchTerm));
        // if the category is identified, we present suggestion
        if(category !== undefined){
            const data = category === 'countries' ? recommendations[category][1].cities :recommendations[category]
            displayRecommendations(data, category)
        } else{
            searchInput.value = '';
            window.alert('not a valid category')   
        }
    }

    return searchKeyWord
}




function GetLocalTime(country){

    const timeZones = {
        "Sydney, Australia" : "Australia/Sydney",
        "Melbourne, Australia" : "Australia/Melbourne",
        "Tokyo, Japan" : "Asia/Tokyo",
        "Kyoto, Japan" : "Asia/Tokyo",
        "Rio de Janeiro, Brazil" : "America/Rio_de_Janeiro",
        "São Paulo, Brazil" : "America/Sao_Paulo"
    }

    const options = { 
        timeZone: timeZones[country], 
        hour12: false, 
        hour: 'numeric',
        minute: 'numeric', 
        second: 'numeric'
    };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    return currentTime
}

function displayRecommendations(data, category){
    results.innerHTML = '';
    for(let i= 0; i < data.length;i++){
        // reco data
        const recoData = data[i];

        // reco holder
        const reco = document.createElement('div');
        reco.classList.add('reco')

        // Img for the reco
        const img = document.createElement('img');
        img.setAttribute('src', recoData.imageUrl);
        
        // Name for the reco
        const name = document.createElement('h2');
        name.innerHTML = recoData.name + (category === "countries" ? ` (${GetLocalTime(recoData.name)})` : '');

        // Description
        const description = document.createElement('p');
        description.textContent = recoData.description;
        
        // add all new elements to the reco div
        reco.appendChild(img);
        reco.appendChild(name);
        reco.appendChild(description);
        // add the reco div to the results div
        results.appendChild(reco)
    }
}

function reset(){
    function clear(){
        // remove the recos from results
        results.innerHTML = '';
        // clear the input field
        searchInput.value = '';
    }

    return clear;
}



