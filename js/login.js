const whole=document.getElementById('whole');
whole.innerHTML=`
<div id="background-container"></div>
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
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li class="nav-item">
                            <a href="/signup"><button class="btn btn-success rounded-5" style="margin-right: 20px;" type="button">Sign Up</button></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <div id="alert-placeholder" class="position-fixed w-100 d-flex justify-content-center" style="top: 70px; z-index: 1050;"></div>
    <main>
        
            <div class="container">
                <div class="row justify-content-center">
                    <!-- First Card -->
                    <div class="col-lg-5 col-md-6">
                        <div class="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header" style="background-color: #70A15F;color: white;">
                                <h3 class="text-center font-weight-light my-4" id="err">Login</h3>
                            </div>
                            <div class="card-body">
                                <form action="/login" method="POST">
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputEmail" name="email" type="email" placeholder="name@example.com" required />
                                        <label for="inputEmail">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="inputPassword" name="password" type="password" placeholder="Password" required />
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <div id="additional">
                                        <input type="hidden" name="dishy" value="red">
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <a class="small" href="/change">Forgot Password?</a>
                                        <button id="login" class="btn btn-success" type="submit" >Login</button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-center py-3">
                                <div class="small"><a href="signup.html">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                    <!-- Second Card -->
                    <div id="second-card-placeholder" ></div>
                </div>
            </div>
        
    </main>`;
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const err = urlParams.get('error');
    const e=urlParams.get('err');
    let ch=0;
    if(e){
        showAlert(e);
        ch=1;
    }
    
    if (err) {
        fetchDishDetails(err);
        if(ch==0){
            showAlert('Please log in to view the details of this dish.');
        }   
        
        const dishy = document.getElementById('additional');
        dishy.innerHTML = `<input type="hidden" name="dishy" value="${err}">`;
    }
});

async function fetchDishDetails(dishName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dishName}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
            console.log('Data:');
            const meal = data.meals[0];
            displayDishCard(meal);
        }
    } catch (error) {
        console.error('Error fetching dish details:', error);
    }
}

function displayDishCard(meal) {
    
    const placeholder = document.getElementById('second-card-placeholder');
    const secondCard = `
        <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header text-white" style="background-color: #dc3545;">
                    <h5 class="card-text text-center">Log in to view the details of this dish!!!</h5>
                </div>
                <div class="card-body">
                    <div class="card shadow-lg">
                        <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="${meal.strMeal}" style="max-height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title text-center">${meal.strMeal}</h5>
                        </div>
                    </div>
                </div>
            </div>
    `;
    placeholder.classList.add('col-lg-5', 'col-md-6');
    placeholder.innerHTML = secondCard;
}
function showAlert(message) {
    const alertPlaceholder = document.getElementById('alert-placeholder');
    const alert = `
        <div class="alert alert-danger alert-dismissible fade show alert-drop" role="alert">
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
const backgroundContainer = document.getElementById('background-container');
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
//login check
