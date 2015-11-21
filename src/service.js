function mdRichEditorTbService() {
  var ToolbarService = {
		// attachs the menuBar
		init: function(toolbelt, toolsCount) {
		  this.toolbar = toolbelt;
		},
		// adds a menu to the menuBar
		add: function(item, menuindex) {
			
			if(!item) { throw new Error(); }
			
			angular.forEach(item, function(tool, toolindex) {
			   var button;
			   
			   button = "<md-button class=\"md-icon-button\" ng-click=\"action('" + tool.name + "', " + menuindex + ", $event)\">" +
				'<md-tooltip md-direction="bottom">' + tool.name + '</md-tooltip>' +
				"<i class=\"md-icon " + tool.icon + "\"></i>" +
			   '</md-button>';
			   
			   ToolbarService.toolbar.children().append(button);
			});

			ToolbarService.toolbar.children().append('<span flex>');
		
		}
	};
	return ToolbarService;
}