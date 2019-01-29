var  userModel = require('../model/user.model');
let userController = {};



userController.signUp = function(req,res){
	console.log('add new user');

	var user = new userModel(req.body);

	console.log('add user',user);
	user.save(function(err,saveduser){
		console.log(err,saveduser);
		res.send(saveduser);
		console.log(saveduser);
	})
}

userController.getUser = function(req,res){

}

userController.login = function(req,res){
	// var email = req.body.email;

	if (req.body.password && req.body.email) {

		var email = req.body.email;
		var password = req.body.password

		userModel.findOne({email:email , password : password}).select('-password').exec().then(function(founduser, err){
			console.log("founduser" , founduser , err);
			if(err){
				res.status(500).send(err);
			}else if(founduser == null){
				res.status(403).json({msg:"Unauthorized Access"});
			}else{
				res.status(200).json(founduser);
			}
		})
	}else{
		return res.status(400).send({ errMsg: 'Bad Data'});
	}


}
userController.searchUser = function(req,res){
	var key = req.query.key;
	console.log(key);
	userModel.find({
		$or:[{lastName:key},{firstName:key}]	
	})
	.select("-password")
	.exec((err, result)=>{
		if (err) { console.log("ERROR=====================",err); }
		else { 
			console.log("RESULT=====================",result);
			res.status(200).json({result: result})
		}
	});
}
userController.addFriend = function(req,res){
	var currentUser = req.body.requestedUser;
	console.log(currentUser);
	var user =  req.body.userTobeFollowed;
	console.log(user);
	userModel.findOne({_id: currentUser}, function(err,founduser){
		console.log(founduser);
		founduser.friends.push(user);
		founduser.save();
		res.send(founduser);
	})
}

module.exports = userController;