angular.module('lightcurve', [
	'curve.template',
	'curve.star.template',
	'starlist',
	'graphing',
	'ui.router'
]).config(function($stateProvider){
	$stateProvider.state('star', {
		templateUrl: 'curve/star',
		url: 'lightcurve/:kid',
		controllerAs: 'state',
		controller: function($stateParams, StarListService){
			this.quarters = StarListService.list[$stateParams.kid];
		}
	})
	.state('star.lightcurve', {
		templateUrl: 'curve',
		url: '/:q',
		controllerAs: 'state',
		resolve: {
			curveData: function($stateParams, $http){
				return $http.get(
					'/data/koi/KOI_' + $stateParams.q + '/' + $stateParams.kid + '.json'
				)
				.then(function(response){
					return response.data;
				})
				.catch(function(err){
					console.log(err);
				})
				;
			}
		},
		controller: function (curveData){
			this.cadence = curveData.points
			this.min = curveData.min;
			this.max = curveData.max;

			this.interp = {
				x: function(a, i){
					return i;
				},
				y: function(a){
					return a[1];
				}
			}
		},
	});
});
