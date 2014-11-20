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
 

    	$scope.Lat1=0;//po sition.coords.latitude;
    	$scope.Long1=0;//position.coords.longitude;
    	$scope.Heading1=0;//position.coords.heading;
    	$scope.Lat2=0;
    	$scope.Long2=0;
    	$scope.Heading2=0;
    	$scope.a="";
    	$scope.b="";
    	$scope.c="";

        var onSuccessH = function(heading) {
    	$scope.Heading1=heading.magneticHeading;
  /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
	};

    var onSuccessH2 = function(heading) {

    	$scope.Heading2=heading.magneticHeading;
  /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
	};




    var onSuccess = function(position) {
    	$scope.Lat1=position.coords.latitude;
    	$scope.Long1=position.coords.longitude;
//    	$scope.Heading1=position.coords.heading;
  /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
	};
    var onSuccess2 = function(position) {
    	$scope.Lat2=position.coords.latitude;
    	$scope.Long2=position.coords.longitude;
  //  	$scope.Heading2=position.coords.heading;
  /* alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
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
      var delta_latitude=Math.abs($scope.Lat1-$scope.Lat2);
    	var delta_longitude=Math.abs($scope.Long1-$scope.Long2);

    	var EarthCircEquator=24901.55*1.609;
      var EarthCircPoles=24859.85*1.609;

      var LatScaleFactor=Math.cosd(($scope.Lat1+$scope.Lat2)/2);
      var KMperLonDegree=EarthCircEquator/360*LatScaleFactor;
      var KMperLatDegree=EarthCircPoles/360;
      debugger;
      var ss1=delta_longitude*KMperLonDegree;
      var ss2=delta_latitude*KMperLatDegree;

      var a=Math.sqrt(Math.pow(ss1,2)+Math.pow(ss2,2));
      var aa=Math.abs($scope.Heading1-$scope.Heading2);
    	var theta=Math.asind(ss2/a);
    	var phi=180-90-theta;
      var cc=360-phi-$scope.Heading1;

      var bb=180-aa-cc;
      var b=Math.sind(bb)*a/Math.sind(aa);
      var c=Math.sind(cc)*a/Math.sind(aa);
    	
    	$scope.a=a;
    	$scope.b=b;
    	$scope.c=c;

    }
    $scope.getDimension1 = function() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);


		navigator.compass.getCurrentHeading(onSuccessH, onError);
		$scope.calculate();
    }

        $scope.getDimension2 = function() {
		navigator.geolocation.getCurrentPosition(onSuccess2, onError);

		navigator.compass.getCurrentHeading(onSuccessH2, onError);

		$scope.calculate();

    }

// onError Callback receives a PositionError object
//
	function onError(error) {
    	alert('code: '    + error.code    + '\n' +
        	  'message: ' + error.message + '\n');
	}

  });
