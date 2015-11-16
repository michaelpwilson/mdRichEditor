angular
	.module('mdRichEditor', [
		'material.components.toolbar',
		'material.components.input',
		'material.components.tooltip'
	])
	.provider('mdRichEditor', mdRichEditorProvider)
	.service('mdRichEditorToolbarService', mdRichEditorTbService)
	.directive('mdRichEditor', mdRichEditorDirective)
	.directive("contenteditable", contentEditable)
	.filter('htmlToPlaintext', function() {
		return function(text) {
		  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
		};
	});

function mdRichEditorProvider() {
    this.$get = function () {
      return this;
    };
}