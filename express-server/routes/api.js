const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const dbHost = 'mongodb://database/weight-log';

mongoose.connect(dbHost);

const weightSchema = new mongoose.Schema({
	weight: Number,
	timestamp: Number
});

const WeightLog = mongoose.model('WeightLog', weightSchema);

router.get('/weight', (req,res) => {
	WeightLog.find({}, (err, users) => {
		if(err) res.status(500).send(err);
		res.status(200).json(users);
	});
});

router.post('/weight', (req,res)=>{
	let weightEntry = new WeightLog({
		weight: req.body.weight,
		timestamp : req.body.timestamp || (new Date()).valueOf()
	});
	weightEntry.save(error => {
		if(error) res.status(500).send(error);
		res.status(201).json({message: 'weight added successfully'});
	});
});


module.exports = router;
