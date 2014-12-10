'use strict';

/**
 * @ngdoc function
 * @name perambulatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the perambulatorApp
 */
angular.module('perambulatorApp')
  .controller('MainCtrl', function ($scope) {
 
      var gWatchID1=null;
    	$scope.Lat1=0;//po sition.coords.latitude;
    	$scope.Long1=0;//position.coords.longitude;
    	$scope.Heading1=0;//position.coords.heading;
    	$scope.Lat2=0;
    	$scope.Long2=0;
    	$scope.Heading2=0;
    	$scope.a="";
    	$scope.b="";
    	$scope.c="";
		  $scope.mu="";
		  $scope.lambda="";
      var onSuccessH = function(position) {
        //debugger;
      	$scope.Heading1=position.coords.heading;
        $scope.Lat1=position.coords.latitude;
        $scope.Long1=position.coords.longitude;
        $scope.calculate();
        $scope.$apply();
  	};

    var onSuccessH2 = function(position) {
      $scope.Lat2=position.coords.latitude;
      $scope.Long2=position.coords.longitude;
    	$scope.Heading2=position.coords.heading;
      $scope.calculate();
      $scope.$apply();

	};

    
    Math.asind = function(x) {
       return Math.asin(x)*180/Math.PI;
    };

    Math.cosd = function(x) {
      return Math.cos(x*Math.PI/180);
    };

    Math.sind = function(x) {
      return Math.sin(x*Math.PI/180);
    };

    $scope.calculate = function() {

      if($scope.Heading2=="0"||$scope.Heading1=="0")
      {
        return;
      }

      var delta_latitude=Math.abs($scope.Lat1-$scope.Lat2);
    	var delta_longitude=Math.abs($scope.Long1-$scope.Long2);

    	var EarthCircEquator=24901.55*1.609;
      var EarthCircPoles=24859.85*1.609;

      var LatScaleFactor=Math.cosd(($scope.Lat1+$scope.Lat2)/2);
      var KMperLonDegree=EarthCircEquator/360*LatScaleFactor;
      var KMperLatDegree=EarthCircPoles/360;
      //debugger;
      var ss1=delta_longitude*KMperLonDegree;
      var ss2=delta_latitude*KMperLatDegree;

     
		
  		var x1 = Math.sind($scope.Heading1);
  		var x2 = Math.sind($scope.Heading2);
  		var y1= Math.cosd($scope.Heading1);
  		var y2 = Math.cosd($scope.Heading2);
  		
  		var numlambda = -y2*ss1+x2*ss2;
  		var nummu = -y1*ss1+x1*ss2;
  		var den = -x1*y2+x2*y1;
  		$scope.mu = nummu/den;
  		$scope.lambda = numlambda/den;
    }
    $scope.getDimension1 = function() {

	//	  navigator.geolocation.getCurrentPosition(onSuccess, onError);
		  if(gWatchID1==null) {
        startWatch1();
		  }else {
        stopWatch1();
        stopWatch2();
      }
      $scope.calculate();
    }

    $scope.getDimension2 = function() {
		//  navigator.geolocation.getCurrentPosition(onSuccess2, onError);
		//  navigator.compass.getCurrentHeading(onSuccessH2, onError);
		  if(gWatchID1==null) {
        startWatch2();
      }else {
        stopWatch1();
        stopWatch2();
      }
      $scope.calculate();

    }

    function startWatch1() {

        // Update compass every 3 seconds
        var options = { frequency: 500 };

        if (gWatchID1==null)
            gWatchID1 = navigator.geolocation.watchPosition(onSuccessH, onError, options);
    }


    function stopWatch1  () {
        if (gWatchID1!=null) {
            navigator.geolocation.clearWatch(gWatchID1);
            gWatchID1= null;
        }
    }

    function startWatch2() {

        // Update compass every 3 seconds
        var options = { frequency: 500 };

        if (gWatchID1==null)
            gWatchID1 = navigator.geolocation.watchPosition(onSuccessH2, onError, options);
    }


    function stopWatch2  () {
        if (gWatchID1!=null) {
            navigator.geolocation.clearWatch(gWatchID1);
            gWatchID1= null;
        }
    }

// onError Callback receives a PositionError object
//
	function onError(error) {
    	alert('code: '    + error.code    + '\n' +
        	  'message: ' + error.message + '\n');
	}

  });
