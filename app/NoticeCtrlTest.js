'use strict'
describe("NoticeCtrl > ", function() {

    var newScope = function() {
        return {
            $watch: function() {}
        }
    };
    var scope;

    it("should init ctrl", function() {
        new NoticeCtrl(newScope());
    });

    beforeEach(function() {
        scope = newScope();
        new NoticeCtrl(scope);
    });

    describe("Elapsed time calculation > ", function() {

        it("should calculate 1 day by default", function() {
            // When
            scope.calculateNotice();

            // Then
            expect(scope.elapsedTime).toBe("1 jour(s) ");
        });

        it("should calculate 2 days ", function() {
            // Given
            var dateStart = new Date(2015, 5 /* == June!*/ , 9);
            var dateEnd = new Date(2015, 5, 11);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("2 jour(s) ");
        });

        it("should calculate 1 week ", function() {
            // Given
            var dateStart = new Date(2015, 5, 9);
            var dateEnd = new Date(2015, 5, 16);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("1 semaine(s) ");
        });

        it("should calculate 4 weeks when between 31th of May and 28 of June", function() {
            // Given
            var dateStart = new Date(2015, 4, 31);
            var dateEnd = new Date(2015, 5, 28);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("4 semaine(s) ");
        });

        it("should calculate 4 weeks and 1 day when between 31th of May and 29 of June", function() {
            // Given
            var dateStart = new Date(2015, 4, 31);
            var dateEnd = new Date(2015, 5, 29);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("4 semaine(s) 1 jour(s) ");
        });

        it("should calculate 1 month when between 1st of May and 1st of June", function() {
            // Given
            var dateStart = new Date(2015, 4, 1);
            var dateEnd = new Date(2015, 5, 1);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("1 mois ");
        });

        it("should calculate 1 month 2 weeks 3 days", function() {
            // Given
            var dateStart = new Date(2015, 4, 1);
            var dateEnd = new Date(2015, 5, 18);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("1 mois 2 semaine(s) 3 jour(s) ");
        });

        it("should calculate 1 year", function() {
            // Given
            var dateStart = new Date(2015, 5, 1);
            var dateEnd = new Date(2016, 5, 1);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("1 année(s) ");
        });

        it("should calculate 5 years 4 months 3 weeks and 2 days", function() {
            // Given
            var dateStart = new Date(2010, 0, 1);
            var dateEnd = new Date(2015, 4, 24);

            // Then
            expect(calculateElapsedTime(dateStart, dateEnd)).toBe("5 année(s) 4 mois 3 semaine(s) 2 jour(s) ");
        });
    });

});