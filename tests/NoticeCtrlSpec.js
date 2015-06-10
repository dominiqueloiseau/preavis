
/*window.angular = { // mock angular
  module: function() {
    return {
      controller: function() {}
    }
  }
}*/

require("../app.js");
describe("NoticeCtrl", function() {
  it("should init ctrl", function() {
    new NoticeCtrl({});
  });

  it("should calculate 1 day", function() {
    expect(true).toBe(true);
  });
});