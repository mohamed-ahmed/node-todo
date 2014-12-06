angular.module('branchService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Branches', ['$http',function($http) {
		return {
			get : function(repo_name) {
				return $http.get('/api/branches/' + repo_name);
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