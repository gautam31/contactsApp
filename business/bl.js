var exports = module.exports = {};
var twilio = require('twilio');
var jsonfile = require('jsonfile')

var arr = [{ 'name': 'vas', 'phone': '+919962251771', 'id': '1' }]


exports.getContactList = function(callback) {
    callback(null, arr)
}

exports.getContact = function(id, callback) {
    var result = arr.filter(function(value) {
        return value['id'] == id;
    })
    callback(null, result[0])
}

exports.sendOTP = function(id,msg, callback) {
    var result = arr.filter(function(value) {
        return value['id'] == id;
    })
    var user = result[0]
    var accountSid = 'AC4b14051ba26993e3fc77cf6ec6949b44';
    var authToken = '8d9e40c7e3466595b526b169de4329cc';

    var otp = `${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}`

    var client = new twilio(accountSid, authToken);
    client.messages.create({
        body: `${msg}  OTP: ${otp}`,
        from: '+12103990587', // Text this number
        to: user['phone'] // From a valid Twilio number
    }, function(err, message) {
        if (err) {
            console.error(err.message);
            callback(err)
        } else {
            var file = '/tmp/data.json'
            jsonfile.readFile(file, function(err, obj) {
                if (!obj) {
                    obj = []
                }
                var objToWrite = { message: `Your OTP is ${otp}` }
                obj.push(objToWrite)

                jsonfile.writeFile(file, obj, function(err) {
                    callback(err, 'otp sent')
                })
            })


        }
    });


}

exports.getMessages = function(callback) {

    var file = '/tmp/data.json'
    jsonfile.readFile(file, function(err, obj) {
        callback(err, obj)
    })
}
