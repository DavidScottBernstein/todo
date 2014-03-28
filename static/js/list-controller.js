window.ListController = function($scope, $rootScope) {
  $scope.list = [];
  $.ajax({
    url: '/api/load/',
    success: function(result) {
      $scope.list = JSON.parse(result).list;
      $rootScope.$digest();
    }
  });

  $scope.addItem = function() {
    $scope.list.push($scope.inputText);
    $scope.inputText = '';
    $.ajax({
      url: '/api/save/',
      data: {
        list: $scope.list
      }
    });
  };
};
