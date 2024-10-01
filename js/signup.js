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

        //signn
        document.addEventListener('DOMContentLoaded', () => {
            const emailForm = document.getElementById('emailForm');
            const verificationForm = document.getElementById('verificationForm');
            const inputs = document.querySelectorAll('.verification-code-input input');
            let verificationCode = '';

            emailForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const email = document.getElementById('inputEmail').value;

                if (!validateEmail(email)) {
                    showAlert('Please enter a valid email address.');
                    return;
                }

                const emailExists = await checkEmail(email);
                if (emailExists) {
                    showAlert('This email is already registered.');
                } else {
                    const emailButton = document.getElementById('verificationButt');
                    emailButton.innerHTML=`
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Verifying...</span>
                    `;
                    emailButton.disabled = true;
                    const response = await sendVerificationCode(email);
                    if (response.success) {
                        verificationCode = response.verificationCode; // Store the verification code for later verification
                        showHappy('Verification code sent to your email. Please verify.');
                        emailForm.style.display = 'none';
                        verificationForm.style.display = 'block';
                    } else {
                        showAlert('Error sending verification code.');
                    }
                }
            });

            inputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                    if (input.value.length === 1 && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                });

                input.addEventListener('keydown', (event) => {
                    if (event.key === 'Backspace' && index > 0 && input.value.length === 0) {
                        inputs[index - 1].focus();
                    }
                });

                input.addEventListener('paste', (event) => {
                    event.preventDefault();
                    const pasteData = event.clipboardData.getData('text');
                    const pasteArray = pasteData.split('').slice(0, inputs.length);

                    pasteArray.forEach((char, i) => {
                        inputs[i].value = char;
                    });

                    if (pasteArray.length === inputs.length) {
                        inputs[inputs.length - 1].focus();
                    } else {
                        inputs[pasteArray.length].focus();
                    }
                });
            });

            verificationForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const inputCode = Array.from(inputs).map(input => input.value).join('');
                const email = document.getElementById('inputEmail').value;
                const firstName = document.getElementById('inputFirstName').value;
                const lastName = document.getElementById('inputLastName').value;
                const password = document.getElementById('inputPassword').value;
                const confirmPassword = document.getElementById('inputConfirmPassword').value;

                if (!validatePassword(password)) {
                    showAlert('Password must be at least 8 characters long.');
                    return;
                }

                if (password !== confirmPassword) {
                    showAlert('Passwords do not match.');
                    return;
                }

                const response = await verifyCodeAndRegister({ email, verificationCode, inputCode, firstName, lastName, password });
                if (response.success) {
                    showHappy('Registration successful. Redirecting to login page...');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 2000);
                } else {
                    showAlert('Error during registration.');
                }
            });
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        function validatePassword(password) {
            return password.length >= 8;
        }

        async function checkEmail(email) {
            try {
                const response = await fetch('/check-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const data = await response.json();
                return data.exists;
            } catch (error) {
                console.error('Error checking email:', error);
                return false;
            }
        }

        async function sendVerificationCode(email) {
            try {
                const response = await fetch('/send-verification-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                return await response.json();
            } catch (error) {
                console.error('Error sending verification code:', error);
                return { success: false };
            }
        }

        async function verifyCodeAndRegister(userData) {
            try {
                const response = await fetch('/verify-code-and-register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                return await response.json();
            } catch (error) {
                console.error('Error during registration:', error);
                return { success: false };
            }
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
            }, 3000); // Adjust the timeout duration as needed
        }
        function showHappy(message) {
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