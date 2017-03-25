var href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
id = 'font-awesome-4.7.0';

describe("lazyLoadCSS", function () {
  beforeEach(function () {});

  it("returns a promise", function () {
    expect(lazyLoadCSS(href, id)).toEqual(jasmine.any(Promise));
  });

  it("should append a stylesheet to the <head>", function (done) {
    lazyLoadCSS(href, id).then(function (sheet) {
      expect(!!document.getElementById('' + id)).toBe(true);
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should not append the same script to the DOM more than once", function (done) {
    lazyLoadCSS(href, id).then(function () {
      lazyLoadCSS(href, id).then(function () {
        expect(document.head.querySelectorAll('link[id="' + id + '"]').length).toBe(1);
        done();
      });
    });
  });
});
