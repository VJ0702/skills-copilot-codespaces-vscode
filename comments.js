// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');   // File system module
const path = require('path');   // Path module
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error reading file');
            return;
        }
        res.status(200).send(JSON.parse(data));
    });
});

// Post comment
app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error reading file');
            return;
        }
        let comments = JSON.parse(data);
        let newComment = {
            id: comments.length + 1,
            comment: req.body.comment
        }
    });
    comments.push(newComment);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error writing file');
            return;
        }
        res.status(200).send('Comment added');
    });
});