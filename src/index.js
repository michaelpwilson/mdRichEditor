angular.module('mdRichEditor', materialComponents)
	// used for theming the rich editor
	.config(mdRichEditorConfig)
	// service for adding items to the toolbar
	.service('mdRichEditorToolbarService', mdRichEditorTbService)
	// content editable directive
	.directive("contenteditable", contentEditable)
	// main rich editor directive
	.directive('mdRichEditor', mdRichEditorDirective);	