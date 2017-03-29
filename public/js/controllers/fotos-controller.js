// public/js/controllers/fotos-controller.js

angular.module('alurapic').controller('FotosController', function($scope, recursoFoto){

	$scope.fotos = [];
	$scope.filtro = '';
	$scope.mensagem = '';

	recursoFoto.query(function(fotos){
		$scope.fotos = fotos;
	}, function(erro){
		console.log(erro);
	});

	// substituida por resource
	// $http.get('/v1/fotos')
	// .then(function(retorno){
	// 	console.log(retorno);
	// 	$scope.fotos = retorno.data;
	// })
	// .catch(function(erro){
	// 	console.log(erro);
	// });

	$scope.remover = function(foto){

		recursoFoto.delete({fotoId: foto._id}, function(){
			var indiceFoto = $scope.fotos.indexOf(foto);
			$scope.fotos.splice(indiceFoto, 1);
			$scope.mensagem = 'foto ' + foto.titulo + ' removida';
			console.log('foto removida');
		}, function(erro){
			console.log(erro);
			$scope.mensagem = 'erro ao apagar a foto ' + foto.titulo;
		});

		// substituida pelo resource
		// $http.delete('/v1/fotos/' + foto._id)
		// .success(function(){
		// 	var indiceFoto = $scope.fotos.indexOf(foto);
		// 	$scope.fotos.splice(indiceFoto, 1);
		// 	$scope.mensagem = 'foto ' + foto.titulo + ' removida';
		// 	console.log('foto removida');

		// })
		// .error(function(erro){
		// 	$scope.mensagem = 'erro ao apagar a foto ' + foto.titulo;
		// })
	};


});
