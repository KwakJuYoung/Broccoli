'use strict';

angular.module('broccoliApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.searchResults = [];
    $scope.targetTags = [{'name': '맛스타그램', isActive: true, defaultTag: true}];
    $scope.searchTag = function() {
      if($scope.searchingTag === '') {
        return;
      }

      this.addTag($scope.searchingTag);

      $http.get('/api/things').success(function(results) {
        console.log(results);
        results.forEach(function(r) {
          $scope.searchResults.push({
            'tagName' : r.name,
            'count' : Math.floor((Math.random() * 10000) + 1)
          });
        });
      });

      $scope.searchingTag = '';
    };

    $scope.addTag = function(tag) {
      $scope.targetTags.push({
        'name': tag,
        'isActive': true,
        'defaultTag': false
      });
    };
    $scope.removeTag = function(index) {
      $scope.targetTags.splice(index, 1);
      this.showTargetTags();
    };
    $scope.showTargetTags = function(){
      var activeTags = [];
      $scope.targetTags.forEach(function(t) {
        if (t.isActive == true) {
          activeTags.push(t.name);
        }
      });
      console.log(activeTags);
    };
  })
  .directive('searchedtag', function() {
    return {
      replace: true,
      transclude: true,
      scope: {
        name: '@tagName',
        defaultTag : '@defaultTag',
        isActive: '=isActive',
        showTags: '&showTags',
        removeTag : '&removeTag'
      },
      template: '<div><button type="button" class="tag tag-primary" ng-mouseover="showRemoveBtn()" ng-mouseout="hideRemoveBtn()">{{"#"+name}}</button>' +
                '<div class="remove-tag" ng-show="showDelete" ng-mouseover="showRemoveBtn()" ng-mouseout="hideRemoveBtn()" ng-click="removeTag()">X</div></div>',
      controller: function($scope) {
        $scope.showDelete= false;

        $scope.toggleActive = function() {
          if ($scope.defaultTag == 'true') {
            return false;
          }

          $scope.$apply(function() {
            $scope.isActive = !$scope.isActive
          });

          return true;
        };
        $scope.showRemoveBtn = function() {
          if ($scope.defaultTag == 'true') {
            return;
          }
          $scope.showDelete = true;

        };
        $scope.hideRemoveBtn = function() {
          $scope.showDelete = false;
        };
      },
      link : function(scope, element) {
        element.bind("click", function() {
          if (scope.toggleActive()) {
            scope.showTags();
          }
        });

        scope.$watch('isActive', function(newValue) {
          var tag = angular.element(element[0].querySelector('.tag'));
          if (newValue == false) {
            tag.addClass("tag-inactive");
          } else {
            tag.removeClass("tag-inactive");
          }
          element.blur();
          tag.blur();
        });
      }
    }
  });
