angular.module('repoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Repos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/repos');
			}
			/*,
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}*/
		}
	}]);