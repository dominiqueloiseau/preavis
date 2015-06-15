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
    describe("Resignation > ", function() {
        describe("After 2014 > http://www.emploi.belgique.be/defaultTab.aspx?id=42198", function() {

            it("should calculate 1 week of notice when one month seniority", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 1, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(1);
            });

            it("should calculate 1 week of notice when 2 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 2, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(1);
            });

            it("should calculate 2 weeks of notice when 3 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 3, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(2);
            });

            it("should calculate 2 weeks of notice when 4 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 4, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(2);
            });

            it("should calculate 2 weeks of notice when 5 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 5, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(2);
            });

            it("should calculate 3 weeks of notice when 6 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 6, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(3);
            });

            it("should calculate 3 weeks of notice when 7 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 7, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(3);
            });

            it("should calculate 3 weeks of notice when 11 months", function() {
                // Given
                var dateStart = new Date(2015, 0, 1);
                var dateEnd = new Date(2015, 11, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(3);
            });

            it("should calculate 4 weeks of notice when 1 year", function() {
                // Given
                var dateStart = new Date(2014, 7, 1);
                var dateEnd = new Date(2015, 7, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(4);
            });

            it("should calculate 4 weeks of notice when 1 year and 5 months", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2015, 5, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(4);
            });

            it("should calculate 5 weeks of notice when 1 year and 6 months", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2015, 6, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(5);
            });

            it("should calculate 5 weeks of notice when 1 year and 11 months", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2015, 11, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(5);
            });

            it("should calculate 6 weeks of notice when 2 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2016, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(6);
            });

            it("should calculate 6 weeks of notice when 3 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2017, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(6);
            });

            it("should calculate 7 weeks of notice when 4 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2018, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(7);
            });

            it("should calculate 7 weeks of notice when 4 years 11 months and 31 days", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2018, 11, 31);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(7);
            });

            it("should calculate *9* weeks of notice when 5 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2019, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(9);
            });

            it("should calculate *9* weeks of notice when 5 years 11 months 31 days", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2019, 11, 31);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(9);
            });

            it("should calculate 10 weeks of notice when 6 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2020, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(10);
            });

            it("should calculate 10 weeks of notice when 6 years 11 months 31 days", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2020, 11, 31);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(10);
            });

            it("should calculate *12* weeks of notice when 7 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2021, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(12);
            });

            it("should calculate *12* weeks of notice when 7 years 11 months 31 days", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2021, 11, 31);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(12);
            });

            it("should calculate 13 weeks of notice when 8 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2022, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(13);
            });
            
             it("should calculate 13 weeks of notice when more than 8 years", function() {
                // Given
                var dateStart = new Date(2014, 0, 1);
                var dateEnd = new Date(2150, 0, 1);

                // Then
                expect(resignationNoticeInWeeks(dateStart, dateEnd)).toBe(13);
            });
        });
    });
});