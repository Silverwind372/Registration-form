const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'user.json');

function loadUsers() {
    if (fs.existsSync(usersFilePath)) {
        const data = fs.readFileSync(usersFilePath);
        try {
            const loadedUsers = JSON.parse(data);
            console.log('Loaded users:', loadedUsers);  // Debugging line
            return loadedUsers;
        } catch (error) {
            console.error('Error parsing users file:', error);
            return [];
        }
    }
    return [];
}

function saveUsers(users) {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        console.log('Users saved successfully');  // Debugging line
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

let users = loadUsers();

// Signup endpoint
app.post('/signup', (req, res) => {
    const { firstName, lastName, birthday, phone, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.status(400).send({ message: 'Invalid email address' });
    }
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return res.status(400).send({ message: 'Invalid phone number' });
    }

    const existingUser = users.find(
        (user) => user.email === email || user.phone === phone
    );

    if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
        firstName,
        lastName,
        birthday,
        phone,
        email,
        password: hashedPassword,
    };

    users.push(user);
    saveUsers(users);

    res.status(200).send({ message: 'Signup successful' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    const user = users.find(
        (user) => user.email === identifier || user.phone === identifier
    );

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid password' });
    }

    res.status(200).send({ message: 'Login successful' });
});

// Profile endpoint
app.get('/profile', (req, res) => {
    // Assume that user authentication is done and userId is retrieved
    const userId = req.userId; // This would be set after authentication

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        password: user.password // It's usually not a good idea to send this in production
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
