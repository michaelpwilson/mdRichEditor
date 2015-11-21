// required material components
var materialComponents = [
		'material.components.toolbar',
		'material.components.input',
		'material.components.tooltip'
];

function mdRichEditorConfig($mdThemingProvider) {

    $mdThemingProvider.theme('richeditor-dark', 'default')
	.primaryPalette('orange')
	.dark();
	
}

function mdRichEditorProvider() {
    this.$get = function () {
      return this;
    };
}

function htmlToPlainTextFilter() {
	return function(text) {
	  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	};
}