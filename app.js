var app = angular.module('noticeApp', ['ng-bootstrap-datepicker']);

app.controller('NoticeCtrl', function($scope) {
    $scope.dt = new Date();


    $scope.datepickerOptions = {
        format: 'dd/mm/yyyy',
        language: 'fr',
        autoclose: true,
        weekStart: 0
    }

    $scope.dateStart = moment().format("DD/MM/YYYY");
    $scope.dateEnd = moment().add(1, 'years').format("DD/MM/YYYY");

    $scope.calculateNotice = function(newValue, oldValue /*for log only */){
        var momentEnd = moment($scope.dateStart, "DD/MM/YYYY");

        years = momentStart.diff(momentEnd, 'years');
        momentStart.subtract(years, 'years');

        months = momentStart.diff(momentEnd, 'months');
        momentStart.subtract(months, 'months');

        weeks = momentStart.diff(momentEnd, 'weeks');
        momentStart.subtract(weeks, 'weeks');

        days = momentStart.diff(momentEnd, 'days');

        $scope.elapsedTime = (years ? years + " année(s) " : "") +
            (months ? months + " mois" : "") +
            (weeks ? weeks + " semaine(s)" : "") +
            (days ? days + " jour(s)" : "");
    }

    $scope.$watch('dateStart', $scope.calculateNotice);
    $scope.$watch('dateEnd', $scope.calculateNotice);

});