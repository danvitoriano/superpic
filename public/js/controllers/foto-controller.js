angular.module('alurapic')
	.controller('FotoController', function($scope, recursoFoto, $routeParams){

		// substituido pela factory recursoFoto
		// var recursoFoto = $resource('/v1/fotos/:fotoId', null, {
		// 	'update': {
		// 		method: 'PUT'
		// 	}
		// });


		$scope.foto = {};
		$scope.mensagem = '';

		// se for passado um fotoId como paramentro para alterar uma foto
		if($routeParams.fotoId){

			recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto){
				$scope.foto = foto;
			}, function(erro){
				console.log(erro);
				$scope.mensagem = 'não achou a foto';
			});
			
			// substituida pelo resource
			// $http.get('/v1/fotos/' + $routeParams.fotoId)
			// .success(function(foto){
			// 	$scope.foto = foto;
			// })
			// .error(function(erro){
			// 	console.log(erro);
			// 	$scope.mensagem = 'não achou a foto';
			// })
		}

		$scope.submeter = function(){
			// console.log($scope.foto);
			if($scope.formulario.$valid){

				// se for alteração
				if($routeParams.fotoId){

					recursoFoto.update({fotoId: $scope.foto._id}, 
						$scope.foto, function(){
							$scope.mensagem = 'foto ' + $scope.foto.titulo + ' alterada com sucesso';
						}, function(erro){
							console.log(erro);
						$scope.mensagem = 'ERRO ao alterar foto ' + $scope.foto.titulo;	
						})

					// substituido por resource
					// $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
					// .success(function(){
					// 	$scope.mensagem = 'foto ' + $scope.foto.titulo + ' alterada com sucesso';
					// })
					// .error(function(erro){
					// 	console.log(erro);
					// 	$scope.mensagem = 'ERRO ao alterar foto ' + $scope.foto.titulo;
					// })
				} else { // se for cadastro

					recursoFoto.save($scope.foto, function(){
						$scope.foto = {};
						$scope.formulario.$setPristine();
						$scope.mensagem = 'foto added';
					}, function(erro){
						console.log(erro);
						$scope.mensagem = 'ERRO ao cadastrar';
					})

					// substituida por resource
					// $http.post('/v1/fotos', $scope.foto)
					// .success(function(){
					// 	$scope.foto = {};
					// 	$scope.formulario.$setPristine();
					// 	$scope.mensagem = 'foto added';
					// })
					// .error(function(erro){
					// 	console.log(erro);
					// 	$scope.mensagem = 'ERRO ao cadastrar';
					// })
				}
			}
		};
	});