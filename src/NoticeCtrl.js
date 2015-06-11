'use strict'

var app = angular.module('noticeApp',  ['mgcrea.ngStrap'/*datePicker*/]);
app.controller('NoticeCtrl', NoticeCtrl);

var NoticeCtrl = function($scope) {

    $scope.dateStart = moment().toDate();
    $scope.dateEnd = moment().add(1, 'days').toDate();

    $scope.calculateNotice = function(newValue, oldValue /*for log only */){
        var momentStart = moment($scope.dateStart);
        var momentEnd = moment($scope.dateEnd);
        
        var years, months, weeks, days;
        
        years = momentEnd.diff(momentStart, 'years');
        momentEnd.subtract(years, 'years');

        months = momentEnd.diff(momentStart, 'months');
        momentEnd.subtract(months, 'months');

        weeks = momentEnd.diff(momentStart, 'weeks');
        momentEnd.subtract(weeks, 'weeks');

        days = momentEnd.diff(momentStart, 'days');

        $scope.elapsedTime = (years ? years + " année(s) " : "") +
            (months ? months + " mois " : "") +
            (weeks ? weeks + " semaine(s) " : "") +
            (days ? days + " jour(s) " : "");
    }

    $scope.$watch('dateStart', $scope.calculateNotice);
    $scope.$watch('dateEnd', $scope.calculateNotice);

};

