describe("NoticeCtrl", function() {
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

  it("should calculate 1 day by default", function() {
    // When
    scope.calculateNotice();
    
    // Then
    expect(scope.elapsedTime).toBe("1 jour(s) ");
  });
  
});