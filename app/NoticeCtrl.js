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

window.resignationNoticeInWeeks = function(dateStart, dateEnd) {
    var momentStart = moment(dateStart);
    var momentEnd = moment(dateEnd);
    var months = momentEnd.diff(momentStart, 'months', true);
    if (months < 3) return 1;
    if (months < 6) return 2;
    if (months < 12) return 3;
    if (months < 18) return 4;
    if (months < 24) return 5;

    var years = momentEnd.diff(momentStart, 'years', true);
    if (years < 4) return 6;
    if (years < 5) return 7;
    if (years < 6) return 9; //!
    if (years < 7) return 10;
    if (years < 8) return 12;
    return 13;
}

var NoticeCtrl = function($scope) {

    $scope.dateStart = moment().toDate();
    $scope.dateEnd = moment().add(1, 'days').toDate();

    $scope.calculateNotice = function(newValue, oldValue /*for log only */ ) {
        $scope.elapsedTime = window.calculateElapsedTime($scope.dateStart, $scope.dateEnd);

        var isResignation = true;

        if (isResignation) {
            if (moment($scope.dateStart).year() < 2014) {
                $scope.error = "L'application ne calcule pas encore les préavis avant 2014, veuillez réessayer plus tard";
                $scope.notice = undefined;
            } else {
                //http://www.emploi.belgique.be/defaultTab.aspx?id=42198
                $scope.notice = window.resignationNoticeInWeeks($scope.dateStart, $scope.dateEnd);
                $scope.error = undefined;
            }
        }

    }

    $scope.$watch('dateStart', $scope.calculateNotice);
    $scope.$watch('dateEnd', $scope.calculateNotice);

};

app.controller('NoticeCtrl', NoticeCtrl);