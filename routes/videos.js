var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk('localhost:27017/codyshop');

router.get("/", function(req, res){
	var collection = db.get('videos');
	collection.find({}, function(err, videos){
		if (err){
			throw err;
		}
		res.json(videos);
	});
});
//这里不能用console.debug输出？
router.post("/", function(req, res){
	var collection  = db.get('videos');
	collection.insert({
		title:req.body.title,
		description:req.body.description
	}, function(err, videos){
		if(err){
			throw err;
		}
		res.json(videos);
	});

});

router.get('/:id', function(req, res){
	var collection = db.get('videos');
	collection.findOne({_id:req.params.id}, function(err, v){
		if(err){
			throw err;
		} 
		res.json(v);
	});
});


router.put('/:id',function(req, res){
	var collection = db.get('videos');
	collection.update({_id:req.params.id}, {
		title: req.body.title,
		description: req.body.description
	},function(err, v){
		if(err){
			throw err;
		} 
		res.json(v);
	});	
});

router.delete('/:id', function(req, res){
	var collection = db.get('videos');
	collection.remove({_id:req.params.id}, function(err, v){
		if(err){
			throw err;
		} 
		res.json(v);
	});
});
module.exports = router;