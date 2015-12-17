function mdRichEditorDirective($compile, $sce, mdRichEditorToolbarService, $filter, $mdBottomSheet, $mdToast) {
  return {
    restrict: 'E',
    scope: {
      content: '=ngModel'
    },
    link: function(scope, element) {
	  
	  var editor = '',
	  	  // editable content
	  	  contenteditable = '<div id="mdRichEditorEditable" style="position: relative; overflow: hidden;"><div class="md-padding"' +
		  'style="border-bottom: 3px solid rgb(255, 152, 0); max-height: 267px; overflow-y: scroll;"' +
	   	  'contenteditable ng-model="content"></div></div>{{content}}',
		  // template for insert link bottom sheet
		  bottomSheetTemplate = '<md-bottom-sheet class="md-list" style="padding: 0;">' +
		  '<md-content md-theme="richeditor-dark" style="padding: 8px 16px 88px;">' + 
			'<form ng-submit="insertLink()">' +
				'<md-list>' +
					'<md-list-item>' + 
						'<md-input-container>' +
							'<label>Link URL</label>' +
							'<input type="url" ng-model="link.url">' +
						'</md-input-container>' +
					'</md-list-item>' + 
					'<md-list-item>' + 
						'<md-input-container>' +
							'<label>Link Text</label>' +
							'<input type="text" ng-model="link.text">' +
						'</md-input-container>' +
					'</md-list-item>' + 
					'<md-list-item>' + 
						'<md-button type="submit" class="md-raised md-primary">Insert</md-button>' +
					'</md-list-item>' + 
				'</md-list>' +
				'</form>' +
			'</md-content>' +
		 '</md-bottom-sheet>';
	   
	  element
		.addClass("md-whiteframe-z1");
		
      // initialize the toolbar
	  // NOTE: remove this for ng-repeat and we can just use a template for the directive!
      mdRichEditorToolbarService.init(angular.element('<md-toolbar  md-theme="richeditor-dark"><div class="md-toolbar-tools"></md-toolbar>'), mdRichEditorToolbarData.length);
      
      angular.forEach(mdRichEditorToolbarData, function(menu, index) {
      
		mdRichEditorToolbarService.add(menu, index);
      
      });
	 
	  // no need for this after the above is gone
	  editor = mdRichEditorToolbarService.toolbar[0].outerHTML + contenteditable;
	  element.append($compile(editor)(scope));
	  
	  function doAction(toolActions, selectedNode, r, $event) {
		  
		  // extract the selected text from the selected node
		  var parentNode = r.startContainer.parentNode,
		  	  selectedText = selectedNode.substring(r.startOffset, r.endOffset);
		  
		if(toolActions.hasOwnProperty('tag')) {

			var newNode = document.createElement(toolActions.tag);
			r.surroundContents(newNode);

			if(toolActions.hasOwnProperty('style')) {
				parentNode.style += toolActions.style;
			}
			
		}  else if(toolActions.name === "insertLink") {
			
			console.log("hello");
			
			$mdBottomSheet.show({
			  template: bottomSheetTemplate,
			  controller: function($scope) {
				  $scope.link = {
					  url: "",
					  text: selectedText
				  };
				  
				$scope.insertLink = function() {					
					
					var newNode = document.createElement("a");
				
					console.log(r.surroundContents(newNode));

					$mdBottomSheet.hide();

					$mdToast.show({
						template: '<md-toast><span flex>Inserted link!</span><md-button ng-click="closeToast()">Close</md-button></md-toast>',
						hideDelay: 1500,
						parent: angular.element(document.getElementById("mdRichEditorEditable"))
					});		  
				  };  
			  },
			  parent: angular.element(document.getElementById("mdRichEditorEditable")),
			  targetEvent: $event
			});
		}
		
	  }
      
      scope.action = function(tool, index, $event) {
		  
		    // get the user's selection
		    var selection = document.getSelection(),
		  	    r = selection.getRangeAt(0),
				// get the nesecarry action for the tool
				toolActions  = $filter('filter')(mdRichEditorToolbarData[index], { name: tool }, true)[0];
			
			// check if the start and end of the user's selection is the same container
			if(r.startContainer == r.endContainer) {
				
				// get the selected container's parent html
				var selectedNode = r.startContainer.parentNode.innerHTML;
				// run the nesecary action
				doAction(toolActions, selectedNode, r, $event);
				scope.content = angular.element(element.children()[1]).children()[0].innerHTML;
				
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