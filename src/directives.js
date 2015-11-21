function mdRichEditorDirective($compile, $sce, mdRichEditorToolbarService, $filter, $mdBottomSheet) {
  return {
    restrict: 'E',
    scope: {
      content: '=ngModel'
    },
    link: function(scope, element) {
	  
	  element
		.addClass("md-whiteframe-z1");
		
      // initialize the toolbar
      mdRichEditorToolbarService.init(angular.element('<md-toolbar  md-theme="richeditor-dark"><div class="md-toolbar-tools"></md-toolbar>'), mdRichEditorToolbarData.length);
      
      angular.forEach(mdRichEditorToolbarData, function(menu, index) {
      
		mdRichEditorToolbarService.add(menu, index);
      
      });
      
      // compile and append!
      element.append($compile(mdRichEditorToolbarService.toolbar)(scope));
	  
		var contenteditable = '<div id="mdRichEditorEditable" style="position: relative; overflow: hidden;"><div class="md-padding"' +
			'style="border-bottom: 3px solid rgb(255, 152, 0); max-height: 267px; overflow-y: scroll;"' +
		'contenteditable ng-model="content"></div></div>';
			
	  element.append($compile(contenteditable)(scope));
	  
	  function wrap(selectedNode, beginTag, begin, endTag, end, endOf, selectedText) {
		 //console.log(selectedNode, beginTag, begin, endTag, end, endOf, selectedText);
		 console.log(end, endOf, selectedNode);
		 return selectedNode.slice(0, begin) + beginTag + selectedText + endTag + selectedNode.slice(end, endOf);
	  }
      
      scope.action = function(tool, index, $event) {
		  
		// get the start and end of the selection
        var selection    = document.getSelection(),
			toolActions  = $filter('filter')(mdRichEditorToolbarData[index], { name: tool }, true)[0],
			plainHTML    = angular.element(element).children()[1].innerHTML,
			bottomSheetTemplate;

		if(selection) {
			
			// get the range of selection
			var range    = selection.getRangeAt(0),
			begin        = range.startOffset,
			end          = range.endOffset;
	
			var parentNode = selection.anchorNode.parentNode,
			selectedNode = parentNode.innerHTML,
			selectedText = selectedNode.substring(begin, end),
			beginTag,
			endTag;
			
		}	
		
		if(toolActions.hasOwnProperty('tags')) {
			beginTag     = toolActions.tags[0],
			endTag       = toolActions.tags[1];
				
			selection.anchorNode.parentNode.innerHTML = wrap(selectedNode, beginTag, begin, endTag, end, selectedNode.length, selectedText);
			
			if(toolActions.hasOwnProperty('style')) {
			
				parentNode.style += toolActions.style;
			
			}
			
		}  else if(toolActions.name === "insertLink") {
			
			bottomSheetTemplate = '<md-bottom-sheet class="md-list" style="padding: 0;">' +
			'<md-content md-theme="richeditor-dark" style="padding: 8px 16px 88px;">' + 
					'<form ng-submit="insertLink()">' +
						'<md-list>' +
							'<md-list-item>' + 
								'<md-input-container>' +
									'<label>Link URL</label>' +
									'<input ng-model="link.url">' +
								'</md-input-container>' +
							'</md-list-item>' + 
							'<md-list-item>' + 
								'<md-input-container>' +
									'<label>Link Text</label>' +
									'<input ng-model="link.text">' +
								'</md-input-container>' +
							'</md-list-item>' + 
							'<md-list-item>' + 
								'<md-button type="submit" class="md-raised md-primary">Insert</md-button>' +
							'</md-list-item>' + 
						'</md-list>' +
					'</form>' +
				'</md-content>' +
			'</md-bottom-sheet>';
			
			$mdBottomSheet.show({
			  template: bottomSheetTemplate,
			  controller: function($scope) {
				  
				  $scope.link = {
					  url: "",
					  text: selectedText
				  };
				  
					function href(selectedNode, begin, end, endOf) {
						return selectedNode.slice(0, begin) + '<a href="' + $scope.link.url + '">' + $scope.link.text + "</a>" + selectedNode.slice(end, endOf);
					}
				  
				  $scope.insertLink = function() {
					
					parentNode.innerHTML = href(selectedNode, begin, end, selectedNode.length);
					
					console.log("hello");
					$mdBottomSheet.hide();
							  
				  };
				  
			  },
			  parent: angular.element(document.getElementById("mdRichEditorEditable")),
			  targetEvent: $event
			});
			
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