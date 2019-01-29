var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userController = require('./controller/user.controller');
var postController = require ('./controller/post.controller');
var cors = require('cors');


var app = express();





//Database Connection

mongoose.connect('mongodb://localhost/social_media', {
    useNewUrlParser: true 
}); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//Define User Routes

app.post('/user', userController.signUp );
app.get('/user', userController.getUser );
app.post('/user/login',userController.login);
app.post('/user/add-friend', userController.addFriend);

//Define Post Routes

app.post('/post', postController.addPost);
app.get('/post/:id', postController.getPostById);
app.put('/post', postController.updatePost);
app.get('/post', postController.getPosts );
app.delete('/post',postController.deletePost);


//Define Search User
app.get('/user/search',userController.searchUser);

app.listen(4000);