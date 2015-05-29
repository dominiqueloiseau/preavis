var app = angular.module('noticeApp', ['ng-bootstrap-datepicker']);

app.controller('NoticeCtrl', function($scope) {
    $scope.dt = new Date();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
    $scope.datepickerOptions = {
        format: 'dd/mm/yyyy',
        language: 'fr',
        autoclose: true,
        weekStart: 0
    }

    $scope.date = new Date();

});