angular
  .module('myApp', ['ngMaterial', 'mdRichEditor'])
  .config(function(mdRichEditorProvider) {})
  .controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
	  
      $scope.html = '<h2>mdRichEditor</h2>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>' +
		'<p>Cras ac leo pulvinar elit malesuada blandit ac vulputate lacus. Mauris tristique enim at erat tempor gravida.' +
			' Sed ultricies augue id commodo efficitur. Aenean cursus augue elit, vel efficitur arcu facilisis ac. Proin id' +
			'felis fermentum, porta ante ac, pulvinar ex. Duis convallis, eros eu cursus placerat, lacus urna elementum lorem,' +
		'ultricies aliquam ligula felis nec neque.</p>';

	  $scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	  }
	
  }]);