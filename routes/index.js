var express = require('express');
var router = express.Router();
var bl = require('../business/bl.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//get list of contacts
router.get('/getContactList', function(req, res, next) {
    bl.getContactList(function(err, result) {

        res.json(result)
    })
});


//get contact by id
router.get('/getContact', function(req, res, next) {
	var id = req.query.id
    bl.getContact(id, function(err, result) {

        res.json(result)
    })
});

router.get('/sendOTPS', function(req, res, next) {
    var id = req.query.id
    var msg = req.query.msg

    bl.sendOTP(id, msg, function(err, result) {

        res.json(result)
    })
});

//send otp to contact
router.post('/sendOTP', function(req, res, next) {
	var id = req.body.id

    bl.sendOTP(id, function(err, result) {

        res.json(result)
    })
});

//list of all messages
router.get('/getMessages', function(req, res, next) {
	
	bl.getMessages( function(err, result) {

        res.json(result)
    })
});




module.exports = router;
