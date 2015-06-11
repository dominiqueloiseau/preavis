'use strict'

var app = angular.module('noticeApp', ['mgcrea.ngStrap' /*datePicker*/ ]);


window.calculateElapsedTime = function(dateStart, dateEnd) {
    var momentStart = moment(dateStart);
    var momentEnd = moment(dateEnd);

    var years, months, weeks, days;

    years = momentEnd.diff(momentStart, 'years');
    momentEnd.subtract(years, 'years');

    months = momentEnd.diff(momentStart, 'months');
    momentEnd.subtract(months, 'months');

    weeks = momentEnd.diff(momentStart, 'weeks');
    momentEnd.subtract(weeks, 'weeks');

    days = momentEnd.diff(momentStart, 'days');

    return (years ? years + " année(s) " : "") +
        (months ? months + " mois " : "") +
        (weeks ? weeks + " semaine(s) " : "") +
        (days ? days + " jour(s) " : "");
}

var NoticeCtrl = function($scope) {

    $scope.dateStart = moment().toDate();
    $scope.dateEnd = moment().add(1, 'days').toDate();

    $scope.calculateNotice = function(newValue, oldValue /*for log only */ ) {
        $scope.elapsedTime = window.calculateElapsedTime($scope.dateStart, $scope.dateEnd);
    }

    $scope.$watch('dateStart', $scope.calculateNotice);
    $scope.$watch('dateEnd', $scope.calculateNotice);

};

app.controller('NoticeCtrl', NoticeCtrl);