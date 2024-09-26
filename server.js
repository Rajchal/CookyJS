const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;


// Rate limiter middleware
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 3 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many verification requests from this IP, please try again after 15 minutes'
        });
    }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'MuJiKhatES@cHeat27',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'css')));

const mongo_id=process.env.MONGO_ID;
const mongo_key=process.env.MONGO_PASS;
// MongoDB connection
mongoose.connect(`mongodb+srv://${mongo_id}:${mongo_key}@cooky.x8dcz.mongodb.net/your_db_name`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User model
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    verificationToken: String,
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('User', UserSchema);

// Route to check if email is already registered
app.post('/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to send verification code
async function sendVerificationCode(email, verificationCode) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Cook Fresh" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Email Verification',
        html: `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <p>Dear User,</p>
                <p>Please use the following verification code to complete your registration:</p>
                <p style="font-size: 24px; font-weight: bold; color: #70A15F;">${verificationCode}</p>
                <p>Thank you for registering with us.</p>
                <p>Please ignore if you didn't requested this code.<br>Best Regards,<br>Cook fresh Eat fresh</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
}

// Route to send password reset email
app.post('/send-reset-password-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `http://${req.headers.host}/reset/${resetToken}`;
        await sendResetEmail(email, resetUrl);

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

async function sendResetEmail(email, resetUrl) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"Cook Fresh" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset',
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <p>Dear User,</p>
                <p>You requested a password reset. Click the button below to reset your password:</p>
                <a href="${resetUrl}" id="reset-link" style="background-color: #70A15F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;"
                       onmouseover="this.style.backgroundColor='#5a8a4a';" onmouseout="this.style.backgroundColor='#70A15F';">
                        Reset Password
                    </a>
                <p>Thank you</p>
                <p>Please ignore if you didn't requested the change.<br>Best Regards,<br>Cook fresh Eat fresh</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
}
app.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Sign out failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Signed out successfully' });
    });
});
// Route to reset password
app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Route to send verification code
app.post('/send-verification-code',emailLimiter, async (req, res) => {
    const { email } = req.body;
    try {
        const verificationCode = crypto.randomBytes(3).toString('hex'); // Generate a 6-character verification code
        await sendVerificationCode(email, verificationCode);
        res.json({ success: true, verificationCode }); // Send the verification code back to the client for testing purposes
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to verify code and register user
app.post('/verify-code-and-register', async (req, res) => {
    const { email, verificationCode, inputCode, firstName, lastName, password } = req.body;
    try {
        if (verificationCode !== inputCode) {
            return res.status(400).json({ success: false, message: 'Invalid verification code' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, isVerified: true,resetPasswordToken : undefined,resetPasswordExpires : undefined});
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Authentication middleware
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        const dishName = req.params.name;
        res.redirect('/login?error=' + dishName);
    }
}

// Routes
app.get('/api-logged', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, userId: req.session.firstName+' '+req.session.lastName, email: req.session.email });
    } else {
        res.json({ loggedIn: false });
    }


});
app.get('/api-edamam', (req, res) => {
    res.json({ e_id:process.env.EDAMAM_APP_ID, e_key: process.env.EDAMAM_APP_KEY });


});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, 'aboutus.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});
app.get('/change', (req, res) => {
    res.sendFile(path.join(__dirname, 'forgot-password.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/reset/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'reset-password.html'));
});

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/categories', (req, res) => {
    res.sendFile(path.join(__dirname, 'cat.html'));
});

app.get('/recommendations', (req, res) => {
    res.sendFile(path.join(__dirname, 'rec.html'));
});

app.get('/dish/:name', isAuthenticated, (req, res) => {
    const dishName = req.params.name;
    res.sendFile(path.join(__dirname, 'dish.html'));
});

app.post('/login', async (req, res) => {
    try {
        const { email, password,dishy } = req.body;
        const user = await User.findOne({ email });
        if(dishy!='red'){
            if (!user) {
                return res.redirect('/login?error=' + dishy+'&err=Invalid email, please resister first');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.userId = user._id;
                req.session.firstName = user.firstName;
                req.session.lastName = user.lastName;
                res.redirect('/dish/' + dishy);
            } else {
                res.redirect('/login?error=' + dishy+'&err=Invalid password, forgot password?');
            }
        }
        else{
            if (!user) {
                return res.redirect('/login?err=Invalid email, please register first');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.session.userId = user._id;
                req.session.firstName = user.firstName;
                req.session.lastName = user.lastName;
                res.redirect('/');
            } else {
                res.redirect('/login?err=Invalid password, forgot password?');
            }
        }
        
        
    } catch (error) {
        console.error('Error during login:', error);
        res.redirect('/login');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});