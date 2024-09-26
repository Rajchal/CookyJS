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
 const searchInput = document.getElementById('search-input');
 const searchButton = document.getElementById('search-button');
 const searchResults = document.getElementById('search-results');
 const suggestionsContainer = document.getElementById('suggestions');
 const backgroundContainer = document.getElementById('background-container');

 let debounceTimer;
 let numbi=0;
 let cardHTML =[];

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

 // Change background image every 10 seconds
 setInterval(changeBackgroundImage, 3000);

 async function fetchRandomDish() {
     const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
     const data = await response.json();
     return data.meals[0];
 }

 async function createCard() {
     const dish = await fetchRandomDish();
    
     
     cardHTML[numbi]=`
         <div class="swiper-slide">
             <div class="card" onclick="redirectToPage('${dish.strMeal}')">
                 <img src="${dish.strMealThumb}" class="card-img-top lazyload" alt="${dish.strMeal}">
                 <div class="card-body">
                     <h5 class="card-title">${dish.strMeal}</h5>
                 </div>
             </div>
             
         </div>
     `;
     
 }

 async function loadCards() {
    const loadi=`<div class="swiper-slide">
             
             
                 <div class="fs-1 spinner-border text-success custom-spinner" >
                    
                 

             </div>
         </div>`;
     const containee=document.getElementById('card-container');
     containee.innerHTML+=loadi;
     for (let i = 0; i < 10; i++) { // Load more cards for better swiping experience
         await createCard();
         numbi++;
     }
     containee.innerHTML='';
     for(let i=0;i<10;i++){
         const cardContainer = document.getElementById('card-container');
         cardContainer.innerHTML += cardHTML[i];
     }

     // Initialize Swiper
     new Swiper('.swiper-container', {
         loop: true,
         navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
         },
         slidesPerView: 4, // Show 3 cards at a time
         spaceBetween: 30, // Space between cards
         centeredSlides: true, // Center the active slide
         effect: 'slide', // Use slide effect
         speed: 600, // Adjust speed if needed
     });
 }

 function redirectToPage(dishName) {
     window.location.href = `/dish/${encodeURIComponent(dishName)}`;
 }

 loadCards();