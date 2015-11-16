
function mdRichEditorDirective($compile, $sce, mdRichEditor, mdRichEditorToolbarService, $filter) {
  return {
    restrict: 'E',
    scope: {
      content: '=ngModel'
    },
    link: function(scope, element) {
	  
	  element.addClass("md-whiteframe-z1");
		
      // initialize the toolbar
      mdRichEditorToolbarService.init(angular.element('<md-toolbar><div class="md-toolbar-tools"></md-toolbar>'), mdRichEditorToolbarData.length);
      
      angular.forEach(mdRichEditorToolbarData, function(menu, index) {
      
		mdRichEditorToolbarService.add(menu, index);
      
      });
      
      // compile and append!
      element.append($compile(mdRichEditorToolbarService.toolbar)(scope));
	  
	        var contenteditable = '<div id="mdRichEditorEditable" class="md-padding"' +
			'style="overflow-y: scroll; min-height: 450px; max-height: 450px; border-bottom: 2px solid rgb(63,81,181);"' +
			'contenteditable ng-model="content"></div>';
			
	  element.append($compile(contenteditable)(scope));
	  
     /* var editor = '<md-input-container class="md-block">'
        + '<textarea id="mdRichEditorText" ng-model="content" md-maxlength="150"></textarea>'
      + '</md-input-container>';
      
      element.append($compile(editor)(scope));*/
	  
	  function wrap(selectedNode, beginTag, begin, endTag, end, endOf, selectedText) {
		 return selectedNode.slice(0, begin) + beginTag + selectedText + endTag + selectedNode.slice(end, endOf);
	  }
      
      scope.action = function(tool, index) {
		  
		// get the start and end of the selection
        var selection    = document.getSelection(),
			range        = selection.getRangeAt(0),
			// the beginning of the selection
			begin        = range.startOffset,
			end          = range.endOffset,
			toolActions  = $filter('filter')(mdRichEditorToolbarData[index], { name: tool }, true)[0],
			plainHTML    = angular.element(element).children()[1].innerHTML,
			parentNode   = selection.anchorNode.parentNode,
			selectedNode = parentNode.innerHTML,
			selectedText = selectedNode.substring(begin, end),
			beginTag,
			endTag;
			
		console.log(toolActions);
			
		if(toolActions.hasOwnProperty('tags')) {
			beginTag     = toolActions.tags[0],
			endTag       = toolActions.tags[1];
				
			selection.anchorNode.parentNode.innerHTML = wrap(selectedNode, beginTag, begin, endTag, end, selectedNode.length, selectedText);
			
		} if(toolActions.hasOwnProperty('style')) {
			
			parentNode.style += toolActions.style;
			
		}
			
			if(parent.id == "mdRichEditorEditable") {
				scope.content = parent.innerHTML;
			} else if(typeof parent.parentNode !== "undefined" && parent.parentNode.id == "mdRichEditorEditable") {
				scope.content = parent.parentNode.innerHTML;
			}
			
      }
    }
  };
}

function contentEditable() {
	  return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ngModel) {

		  function read() {
			ngModel.$setViewValue(element.html());
		  }

		  ngModel.$render = function() {
			element.html(ngModel.$viewValue || "");
		  };

		  element.bind("blur keyup change", function() {
			scope.$apply(read);
		  });
		}
	  };
}