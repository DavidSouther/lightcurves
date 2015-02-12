StarListController.$inject = ['$http'];
function StarListService($http){
	$http.get('/data.json').success(function(data){
		this.list = data;
	}.bind(this));
}

StarListController.$inject = [ 'StarListService' ];
function StarListController(StarListService){
	this.stars = StarListService;
}

function StarList(){
	this.templateUrl = 'starlist';
	this.controller = StarListController;
}

angular.module('starlist', [
	'starlist.template'
])
.service('StarListService', StarListService)
.component('starlist', StarList);
;
