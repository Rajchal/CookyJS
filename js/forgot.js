const whole = document.getElementById('whole');
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
        <div class="row justify-content-center">
            <!-- First Card -->
            <div class="col-lg-5 col-md-6">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header" style="background-color: #70A15F;color: white;">
                        <h3 class="text-center font-weight-light my-4" id="err">Change Password</h3>
                    </div>
                    <div class="card-body">
                        <form id="forgot-password-form">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <button type="submit" class="btn btn-success" id="verificationButt">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

      `;

async function lol() {
    try {
        const response = await fetch('/api-logged');
        const data = await response.json();
        const user = data.loggedIn;
        if (user) {
         const userId = data.userId;
            document.getElementById('logik').innerHTML = `
               <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   <i class="fa fa-user-circle" href='/main' style="font-size:30px"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                 <li><a class="dropdown-item" href="#"> &nbsp;&nbsp;${userId}</a></li>
                 <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="fa fa-cog fa-spin" style="font-size:18px"></i> &nbsp;Change password</a></li>
                    
                    <li><a class="dropdown-item" href="#"><i class="fa fa-sign-out"></i> &nbsp;Signout</a></li>
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
//alert
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
//alert end
//reset
document.getElementById('forgot-password-form').addEventListener('submit', async (event) => {
 event.preventDefault();
 const emailButton = document.getElementById('verificationButt');
         emailButton.innerHTML=`
         <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
         <span role="status">Changing...</span>
         `;
         emailButton.disabled = true;
 const email = document.getElementById('email').value;
 const response = await fetch('/send-reset-password-email', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email })
 });
 const data = await response.json();
showAlert(data.message);
setTimeout(() => {
 window.location.replace('/login');
}, 2000);
});
//reset end
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