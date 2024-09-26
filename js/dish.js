const whole = document.getElementById('whole');
whole.innerHTML=`<div id="background-container"></div>
    <nav class="navbar navbar-expand-lg bg-white shadow p-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="/main">
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
    
    <div class="container dish-container">
        <div class="row">
            <div class="col-md-6">
                <img id="dish-image" class="dish-image" alt="Dish Image">
            </div>
            <div class="col-md-6 dish-details">
                <div class="dish-box">
                    <div class="dish-ingredien">
                        <h1 id="dish-name" class="headdy"></h1><br>
                        <p id="dish-category" class="dish-cat"></p>
                        <p id="dish-area" class="dish-ar"></p><br>  
                    </div>
                </div>
                <button id="toggle-video" class="toggle-button"  aria-expanded="false">
                    <i class="fas fa-play"></i>
                    <span class="show-text">Show Recipe Video</span>
                    <span class="hide-text sr-only">Hide Recipe Video</span>
                </button>
                <div id="video-container" class="video-container" aria-hidden="true"></div>
                
              
                <h2>Ingredients</h2>
                <ul id="dish-ingredients" class="dish-ingredients"></ul>
                <h2>Instructions</h2>
                <ol id="dish-instructions" class="dish-instructions"></ol>
            </div>
        </div>
    </div>

    <div id="ingredient-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title"></h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <img id="modal-image" class="ingredient-modal-image" src="" alt="">
                <div id="modal-content" class="ingredient-modal-details"></div>
            </div>
        </div>
    </div>`;
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
    async function lol() {
        try {
            const response = await fetch('/api-logged');
            const data = await response.json();
            const user = data.loggedIn;
            console.log('User:', user);
            if (user) {
             const userId = data.userId;
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
                document.getElementById('logik').innerHTML = `<li class="nav-item">
                        <a class="nav-link" href="/login" style="color: #70A15F; margin-right: 30px;">Login</a>
                    </li>
                    <li class="nav-item">
                       <a href="/signup"> <button class="btn btn-success rounded-5" style="margin-right: 20px;" type="button">Sign Up</button>
                       </a>                       
                    </li>`
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    lol();
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

currentImageIndex = nextImageIndex;
nextImageIndex = (nextImageIndex + 1) % backgroundImages.length;
if(nextImageIndex == 20){
         currentImage.remove();
         currentImage.remove();currentImage.remove();
         currentImage.opacity = '0';
         currentImage.opacity = '0';
         currentImage.opacity = '0';
         nextImageIndex = 1;}
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

// Change background image every 3 seconds
setInterval(changeBackgroundImage, 3000);

 function getQueryParam() {
     const pathSegments = window.location.pathname.split('/');
     return decodeURIComponent(pathSegments[pathSegments.length - 1]);
 }

 async function fetchDishDetails(dishName) {
     try {
         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
         const data = await response.json();
         if (data.meals && data.meals.length > 0) {
             return data.meals[0];
         } else {
             throw new Error('Dish not found');
         }
     } catch (error) {
         console.error('Error fetching dish details:', error);
         document.getElementById('dish-name').textContent = 'Error: Dish not found';
         return null;
     }
 }

 async function fetchIngredientInfo(ingredient) {
     const resp = await fetch('/api-edamam');
            const dat = await resp.json();
            const e_id=dat.e_id;
            const e_key=dat.e_key;
     const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(ingredient)}&app_id=${e_id}&app_key=${e_key}`;
     try {
         const response = await fetch(url);
         if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
         }
         const data = await response.json();
         if (data.hints && data.hints.length > 0) {
             return data.hints[0].food;
         } else {
             console.warn(`No food data found for ingredient: ${ingredient}`);
             return null;
         }
     } catch (error) {
         console.error('Error fetching ingredient info:', error);
         return null;
     }
 }

 function showIngredientModal(ingredient, measure, imageUrl, food) {
     const modal = document.getElementById('ingredient-modal');
     const modalTitle = document.getElementById('modal-title');
     const modalImage = document.getElementById('modal-image');
     const modalContent = document.getElementById('modal-content');

     modalTitle.textContent = ingredient;
     modalImage.src = imageUrl;
     modalImage.alt = ingredient;
     
     let contentHTML = `<p><strong>Measure:</strong> ${measure}</p>`;

     if (food && food.nutrients) {
         const nutrients = food.nutrients;
         contentHTML += `
             <h4>Nutrients (per 100g):</h4>
             <ul class="nutrient-list">
                 <li>Calories: ${nutrients.ENERC_KCAL ? nutrients.ENERC_KCAL.toFixed(2) : 'N/A'} kcal</li>
                 <li>Protein: ${nutrients.PROCNT ? nutrients.PROCNT.toFixed(2) : 'N/A'}g</li>
                 <li>Fat: ${nutrients.FAT ? nutrients.FAT.toFixed(2) : 'N/A'}g</li>
                 <li>Carbohydrates: ${nutrients.CHOCDF ? nutrients.CHOCDF.toFixed(2) : 'N/A'}g</li>
                 <li>Fiber: ${nutrients.FIBTG ? nutrients.FIBTG.toFixed(2) : 'N/A'}g</li>
             </ul>
         `;
     } else {
         contentHTML += '<p>No detailed nutritional information found for this ingredient.</p>';
     }
     
     modalContent.innerHTML = contentHTML;
     modal.style.display = 'block';
 }

 async function displayDishDetails(dish) {
     if (!dish) return;

     document.getElementById('dish-name').textContent = dish.strMeal;
     document.getElementById('dish-category').textContent = `Category: ${dish.strCategory}`;
     document.getElementById('dish-area').textContent = `Area: ${dish.strArea}`;
     document.getElementById('dish-image').src = dish.strMealThumb;
     document.getElementById('dish-image').alt = dish.strMeal;

     const ingredientsList = document.getElementById('dish-ingredients');
     ingredientsList.innerHTML = ''; // Clear existing ingredients

     for (let i = 1; i <= 20; i++) {
         const ingredient = dish[`strIngredient${i}`];
         const measure = dish[`strMeasure${i}`];
         if (ingredient && ingredient.trim()) {
             const listItem = document.createElement('li');
             const food = await fetchIngredientInfo(ingredient);
             
             const img = document.createElement('img');
             img.alt = ingredient;
             img.className = 'ingredient-image';
             
             if (food && food.image) {
                 img.src = food.image;
                 img.onerror = function() {
                     this.onerror = null;
                     this.src = 'https://via.placeholder.com/50?text=No+Image';
                     this.classList.add('error');
                 };
             } else {
                 img.src = 'https://via.placeholder.com/50?text=No+Image';
                 img.classList.add('error');
             }
             
             listItem.appendChild(img);
             listItem.appendChild(document.createTextNode(`${ingredient} - ${measure}`));
             
             const infoButton = document.createElement('button');
             infoButton.textContent = 'Info';
             infoButton.className = 'info-button';
             infoButton.setAttribute('aria-label', `Nutritional information for ${ingredient}`);
             infoButton.addEventListener('click', () => showIngredientModal(ingredient, measure, img.src, food));
             listItem.appendChild(infoButton);

             ingredientsList.appendChild(listItem);
         }
     }

     const instructionsList = document.getElementById('dish-instructions');
     instructionsList.innerHTML = ''; // Clear existing instructions
     const instructions = dish.strInstructions.split('\n');
     instructions.forEach(instruction => {
         if (instruction.trim()) {
             const listItem = document.createElement('li');
             listItem.textContent = instruction;
             instructionsList.appendChild(listItem);
         }
     });

     if (dish.strYoutube) {
         const videoContainer = document.getElementById('video-container');
         videoContainer.innerHTML = ''; // Clear existing video
         const videoFrame = document.createElement('iframe');
         videoFrame.width = '100%';
         videoFrame.height = '315';
         videoFrame.src = `https://www.youtube.com/embed/${dish.strYoutube.split('v=')[1]}`;
         videoFrame.frameBorder = '0';
         videoFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
         videoFrame.allowFullscreen = true;
         videoContainer.appendChild(videoFrame);
     }
 }

 function toggleVideo() {
const videoContainer = document.getElementById('video-container');
const toggleButton = document.getElementById('toggle-video');
const buttonText = toggleButton.querySelector('span');
const isHidden = videoContainer.style.display === 'none' || videoContainer.style.display === '';

videoContainer.style.display = isHidden ? 'block' : 'none';
videoContainer.setAttribute('aria-hidden', !isHidden);
toggleButton.setAttribute('aria-expanded', isHidden);
buttonText.textContent = isHidden ? 'Hide Recipe Video' : 'Watch Recipe Video';
}

 document.addEventListener('DOMContentLoaded', async () => {
     const dishName = getQueryParam();
    
     
    if (dishName) {
         const dish = await fetchDishDetails(dishName);
         if (dish) {
             await displayDishDetails(dish);
         }
     } else {
         document.getElementById('dish-name').textContent = 'Error: No dish name provided';
     }

     document.getElementById('toggle-video').addEventListener('click', toggleVideo);

     const modal = document.getElementById('ingredient-modal');
     const closeBtn = document.getElementsByClassName('close')[0];
     const toggleButton = document.getElementById('toggle-video');
const videoContainer = document.getElementById('video-container');
videoContainer.style.display = 'none';

toggleButton.addEventListener('click', toggleVideo);

     closeBtn.onclick = function() {
         modal.style.display = 'none';
     }

     window.onclick = function(event) {
         if (event.target == modal) {
             modal.style.display = 'none';
         }
     }
 });