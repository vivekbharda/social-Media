var  postModel = require('../model/post.model');
var  userModel = require('../model/user.model');
let postController = {};


postController.addPost = function(req,res){
	var userId = req.body.userId;
	var post = new postModel(req.body);
	console.log('addPost',post);
	post.save(function(err,savedpost){
		if (err) { res.status(500).send("Server Error")}
		else {
			userModel
			.findOne({_id:userId})
			.exec((err, user)=>{
				if (err) { res.status(500).send("Server Error") }
				else {
					user.post.push(savedpost._id);
					user.save();
					res.status(200).send(savedpost);
				}
			})
		}
	})
}

postController.getPosts = function(req,res){
	postModel.find({},function(err,posts){
		res.send({posts:posts});
	})

}

postController.getPostById = function(req,res){
	console.log('req.parmas' , req.params);

	postModel.find({ _id : req.params.id })
	.exec().then(function(posts,err){
		if(err) return res.status(500).json({ErrorMsg : err});
		else return res.status(200).json(posts)
	});


	
}

postController.updatePost = function(req,res){
	
}

postController.deletePost = function(req,res){
	
}

module.exports = postController;