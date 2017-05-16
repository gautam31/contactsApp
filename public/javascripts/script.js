var app = angular.module("myShoppingList", ['ui.bootstrap', "ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html",
            controller: "homeCtrl"
        })
        .when("/contact/:id", {
            templateUrl: "contact.html",
            controller: "contactCtrl"
        })
        .when("/createMessage/:id", {
            templateUrl: "msg.html",
            controller: "msgCtrl"
        }) 
        .otherwise({
            redirectTo: '/'
        });

});

app.controller("homeCtrl", function($scope, $rootScope, $location, $http) {


    $http.get("getContactList")
        .then(function(response) {

            $scope.contacts = response.data
            $rootScope.contacts = response.data
        });



    $scope.gotoContactDetails = function(contact) {

        //$window.location.href = `contact/${contact.id}`;
        $location.path(`/contact/${contact.id}`);

    }

    $http.get("getMessages")
        .then(function(response) {

            $scope.messages = response.data

        });



});


app.controller("contactCtrl", function($scope, $rootScope, $routeParams, $location) {
    var id = $routeParams.id;
    var arr = $rootScope.contacts
    var result = arr.filter(function(value) {
        return value['id'] == id;
    })

    $scope.user = result[0]

    $scope.sendOTP = function(id) {
        //call post function with id
    }

    $scope.createMessage = function(id) {
        console.log("inside createMessage")
       $location.path(`/createMessage/${id}`);
    }

});

app.controller("msgCtrl", function($scope, $rootScope, $routeParams, $http) {
    var id = $routeParams.id;
    var arr = $rootScope.contacts
    var result = arr.filter(function(value) {
        return value['id'] == id;
    })

    $scope.user = result[0];
    var otp = `${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}${parseInt(Math.random()*10)}`

    $scope.otpMessage = "Hi your OTP is "+ otp;
    //$scope.button="tryHarder";
    

    $scope.sendOTP = function(id) {
        var otpMessage= $scope.otpMessage;
        console.log(otpMessage);
        //call post function with i
        if(otpMessage.indexOf(""+ otp)=== -1) {
            $scope.status= "OTP is missing";
            console.log("missing otp")
        }
        //msg= "Hi your otp is 7645";
        else {
            console.log("inside otp");
            $http.get("sendOTPS?id="+id+"&msg="+msg)
            .then(function(response) {
                console.log(response)
            });
        }
        
    }

});
