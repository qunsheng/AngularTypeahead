var typeAhead = angular.module('app', []);
            	 
/************************************************************** 
 * 
 * Controller
 * 
 **************************************************************/ 
typeAhead.controller('TypeAheadController',function($scope,dataFactory){
	// get data from json file and put into $scope.items
	dataFactory.get('states.json').then(function(data){
		$scope.items=data;
	});
	// use $scope.name hold slected item
	$scope.name="";
	// function get called when item selected
	$scope.onItemSelected=function(){
		console.log('selected='+$scope.name);
	};
});
            	 
/************************************************************** 
 * 
 * typeahead directive
 * 
 **************************************************************/ 
typeAhead.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
		items: '=', // Used to pass the JSON list to the isolated scope.
		prompt:'@', // One way binding for passing placeholder text for the typeahead input field.
		title: '@', // corresponds to the name of the state
		subtitle:'@', // represents abbreviation
		model: '=', // Two way binding to store the selection.
		onSelect:'&' // Method binding, used to execute the function in the controller scope once the selection is over.
	},
	link:function(scope,elem,attrs){
	   // handle selection by click
	   scope.handleSelection=function(selectedItem){
	   	 // set scope.model
		 scope.model=selectedItem;
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect(); // call onSelect function
		  },200);
	  };
	  scope.current=0;
	  scope.selected=true;
	  // check item is current or not for set active class for css
	  scope.isCurrent=function(index){
		 return scope.current==index;
	  };
	  // set current index by mouse over, for css use
	  scope.setCurrent=function(index){
		 scope.current=index;
	  };
	},
    templateUrl: 'templates/templateurl.html'
 };
});
            	 
/************************************************************** 
 * 
 * Building a Factory for Getting Data
 * 
 **************************************************************/ 
typeAhead.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
});