const whole=document.getElementById('whole');
const title=document.getElementById('title');
title.innerText=`Cookfresh-Search Meals`;
whole.innerHTML=`
<div id="background-container"></div>
    <nav class="navbar navbar-expand-lg bg-white shadow p-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/logoo.png" alt="" width="95" height="60" class="d-inline-block align-text-top">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link fs-6" href="/aboutus">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fs-6" href="/recommendations">Recommendations</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link fs-6" href="/categories">Categories</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="logik">
                        
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div id="alert-placeholder" class="position-fixed w-100 d-flex justify-content-center" style="top: 70px; z-index: 1050;"></div>
    <div class="container">
        <div class="search-container">
            <h1 class="text-center mb-4 playwrite-gb-j-geda">Search Meals</h1>
            <div class="input-group mb-3">
                <input type="text" id="search-input" class="form-control" placeholder="Enter meal name" aria-label="Search meals" aria-describedby="search-button">
                <button class="btn btn-success" type="button" id="search-button">Search</button>
            </div>
            <div id="suggestions" class="suggestions"></div>
        </div>
        <div id="search-results" class="row"></div>
    </div>
`;
function showAlert(message) {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    const alert = `
        <div class="alert alert-success alert-dismissible fade show alert-drop" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.innerHTML = alert;
    setTimeout(() => {
        const alertElement = document.querySelector('.alert');
        if (alertElement) {
            alertElement.classList.remove('show');
            alertElement.classList.add('hide');
            setTimeout(() => alertElement.remove(), 500);
        }
    }, 3000); 
}
async function fetchUser() {
    const response =  await fetch('/api-logged');
    const data =  await response.json();
    const user = data.loggedIn;
    
    if (user) {
        const userId=data.userId;
        document.getElementById('logik').innerHTML = `
           <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="fa fa-user-circle" href='/main' style="font-size:30px"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" disabled> &nbsp;&nbsp;${userId}</button></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="/change"><i class="fa fa-cog fa-spin" style="font-size:18px"></i> &nbsp;Change password</a></li>
               
                <li><button class="dropdown-item" onclick="loli();"><i class="fa fa-sign-out"></i> &nbsp;Signout</button></li>
            </ul>
        </li>
        `;
    }
    else{
        document.getElementById('logik').innerHTML =`<li class="nav-item">
                <a class="nav-link" href="/login" style="color: #70A15F; margin-right: 30px;">Login</a>
            </li>
            <li class="nav-item">
               <a href="/signup"> <button class="btn btn-success rounded-5" style="margin-right: 20px;" type="button">Sign Up</button>
               </a>       
            </li>`
    }
}
    fetchUser();

    
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const suggestionsContainer = document.getElementById('suggestions');
const backgroundContainer = document.getElementById('background-container');

let debounceTimer;

// Background image shuffling
const backgroundImages = [
'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80'
];

let currentImageIndex = 0;
let nextImageIndex = 1;


function changeBackgroundImage() {
const currentImage = backgroundContainer.querySelector('.background-image.active');
const nextImage = backgroundContainer.querySelector('.background-image:not(.active)');

if (currentImage) {
    currentImage.style.opacity = '0';
    setTimeout(() => {
        currentImage.remove();
    }, 2000);
}

nextImage.style.backgroundImage = `url(${backgroundImages[nextImageIndex]})`;
nextImage.style.opacity = '0.3';
nextImage.classList.add('active');
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        window.location.reload();
    }
});
currentImageIndex = nextImageIndex;
nextImageIndex = (nextImageIndex + 1) % backgroundImages.length;

const newNextImage = document.createElement('div');
newNextImage.className = 'background-image';
newNextImage.style.backgroundImage = `url(${backgroundImages[nextImageIndex]})`;
backgroundContainer.appendChild(newNextImage);
}

// Initial background setup
const initialImage = document.createElement('div');
initialImage.className = 'background-image active';
initialImage.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
initialImage.style.opacity = '0.3';
backgroundContainer.appendChild(initialImage);

const nextImage = document.createElement('div');
nextImage.className = 'background-image';
nextImage.style.backgroundImage = `url(${backgroundImages[nextImageIndex]})`;
backgroundContainer.appendChild(nextImage);

// Change background image every 10 seconds
setInterval(changeBackgroundImage, 3000);

async function searchMeals(query) {
const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const data = await response.json();
return data.meals;
}

function displayResults(meals) {
searchResults.innerHTML = '';
if (meals) {
    meals.forEach(meal => {
        const mealCard = `
            <div class="col-md-4 mb-4">
                <div class="card" onclick="redirectToPage('${meal.strMeal}')">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            </div>
        `;
        searchResults.innerHTML += mealCard;
    });
} else {
    searchResults.innerHTML = '<p class="text-center">No meals found. Try another search.</p>';
}
}

function displaySuggestions(meals) {
suggestionsContainer.innerHTML = '';
if (meals) {
    meals.slice(0, 5).forEach(meal => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.textContent = meal.strMeal;
        suggestionItem.onclick = () => {
            searchInput.value = meal.strMeal;
            suggestionsContainer.innerHTML = '';
            displayResults([meal]);
        };
        suggestionsContainer.appendChild(suggestionItem);
    });
}
}

function redirectToPage(dishName) {
window.location.href = `/dish/${encodeURIComponent(dishName)}`;
}

searchInput.addEventListener('input', () => {
clearTimeout(debounceTimer);
debounceTimer = setTimeout(async () => {
    const query = searchInput.value.trim();
    if (query) {
        const meals = await searchMeals(query);
        displaySuggestions(meals);
    } else {
        suggestionsContainer.innerHTML = '';
    }
}, 300);
});

searchButton.addEventListener('click', async () => {
const query = searchInput.value.trim();
if (query) {
    const meals = await searchMeals(query);
    displayResults(meals);
    suggestionsContainer.innerHTML = '';
}
});

searchInput.addEventListener('keypress', async (e) => {
if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
        const meals = await searchMeals(query);
        displayResults(meals);
        suggestionsContainer.innerHTML = '';
    }
}
});
async function loli() {
event.preventDefault();
const response = await fetch('/signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
});
if (response.ok) {
    showAlert('You have been signed out. redirecting...');
    setTimeout(() => {
        
        window.location.href = '/login'; // Redirect to login page after sign out
    }, 2000); // Wait for 2 seconds before showing alert and redirecting
} else {
    console.error('Sign out failed');
}
};
// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
if (!suggestionsContainer.contains(e.target) && e.target !== searchInput) {
    suggestionsContainer.innerHTML = '';
}
});