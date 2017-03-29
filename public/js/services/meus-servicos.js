angular.module('meusServicos', ['ngResource'])
	.factory('recursoFoto', function($resource){

		//devolve $resource já configurado
		return $resource('/v1/fotos/:fotoId', null, {
			'update': {
				method: 'PUT'
			}
		});
	});