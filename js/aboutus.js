const whole = document.getElementById('whole');
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
                        <a class="nav-link fs-6 active" href="/aboutus">About Us</a>
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
        <div class="about-content">
            <h1 class="text-center mb-4 playwrite-gb-j-geda">About Cook Fresh</h1>
            <div class="row align-items-center mb-4">
                <div class="col-md-6">
                    <p>Welcome to Cook Fresh, your ultimate destination for discovering delicious recipes and exploring culinary delights from around the world. Our mission is to inspire home cooks and food enthusiasts to try new dishes and expand their culinary horizons.</p>
                    <p>At Cook Fresh, we believe that cooking should be an enjoyable and accessible experience for everyone. That's why we've created a user-friendly platform that allows you to easily search for meals, view recipes, and get inspired by a wide variety of dishes.</p>
                </div>
                <div class="col-md-6">
                    <img src="/logooo.png" alt="Cooking together" class="img-fluid rounded-3 shadow">
                </div>
            </div>
            
            <h2 class="mt-5 mb-4">Our Features</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="feature-card">
                        <i class="fas fa-search feature-icon"></i>
                        <h3>Easy Search</h3>
                        <p>Find your favorite dishes with our powerful search functionality.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card">
                        <i class="fas fa-globe feature-icon"></i>
                        <h3>Global Cuisine</h3>
                        <p>Explore recipes from various cuisines around the world.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card">
                        <i class="fas fa-list-ul feature-icon"></i>
                        <h3>Detailed Instructions</h3>
                        <p>Get step-by-step instructions and ingredient lists for each recipe.</p>
                    </div>
                </div>
            </div>
            
            <div class="api-section mt-5">
                <h2 class="mb-4">API Integration</h2>
                <p>Our website utilizes two powerful APIs to provide you with a comprehensive culinary experience:</p>
                <div class="row">
                    <div class="col-md-6">
                        <h4><a href="https://www.themealdb.com/api.php" target="_blank">TheMealDB API</a></h4>
                        <ul>
                            <li>Extensive database of recipes</li>
                            <li>Detailed meal information and instructions</li>
                            <li>High-quality images of dishes</li>
                            <li>Categorization of meals for easy browsing</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h4><a href="https://developer.edamam.com/food-database-api" target="_blank">Edamam Food Database API</a></h4>
                        <ul>
                            <li>Comprehensive nutritional information</li>
                            <li>Detailed ingredient data</li>
                            <li>Allergen identification</li>
                            <li>Health labels for dietary preferences</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <h2 class="mt-5 mb-4">Our Team</h2>
            <div class="row">
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="/nidhi.jpg">
                        <h4>Nidhi Pradhan</h4>
                        <p>Head Chef</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="/hero.jpg">
                        <h4>Anjal Rajchal</h4>
                        <p>Lead Developer</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="team-member">
                        <img src="/sachet.jpg">
                        <h4>Sachet Kayastha</h4>
                        <p>Nutritionist</p>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-5">
                <p>We're constantly working to improve our platform and add new features to enhance your culinary journey. Thank you for choosing Search Meals as your go-to recipe resource.</p>
                <a href="/main" class="btn btn-success btn-lg mt-3">Start Exploring Recipes</a>
            </div>
        </div>
    </div>

    
`
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