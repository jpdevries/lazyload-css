var href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
id = 'font-awesome-4.7.0';

describe("lazyLoadCSS", function () {
  beforeEach(function () {
    const links =  document.head.querySelectorAll('link');
    for(var i = 0; i < links.length; i++) links[i].remove();
  });

  it("returns a promise", function () {
    expect(lazyLoadCSS(href, id)).toEqual(jasmine.any(Promise));
  });

  it("should append a stylesheet to the <head>", function (done) {
    lazyLoadCSS(href, {
      id: id
    }).then(function (sheet) {
      expect(!!document.getElementById('' + id)).toBe(true);
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should not append the same script to the DOM more than once", function (done) {
    lazyLoadCSS(href, {
      id: id
    }).then(function () {
      lazyLoadCSS(href, {
        id: id
      }).then(function () {
        expect(document.head.querySelectorAll('link[id="' + id + '"]').length).toBe(1);
        done();
      });
    });
  });

  it("should append the same script to the DOM more than once if forced to", function (done) {
    lazyLoadCSS(href, {
      id: id
    }).then(function () {
      lazyLoadCSS(href, {
        id: id,
        force: true
      }).then(function () {
        expect(document.head.querySelectorAll('link[id="' + id + '"]').length > 1).toBe(true);
        done();
      });
    });
  });

  it("should add a media attribute", function(done) {
    lazyLoadCSS(href, {
      id: id
    }).then(function (sheet) {
      expect(document.getElementById(id).getAttribute('media')).toBe('all');
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should add a configurable media attribute", function(done) {
    const id = 'media';
    if(document.getElementById(id)) document.getElementById(id).remove();

    lazyLoadCSS(href, {
      id: id,
      media: 'screen'
    }).then(function (sheet) {
      expect(document.getElementById(id).getAttribute('media')).toBe('screen');
      if(document.getElementById(id)) document.getElementById(id).remove();
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should add a configurable rel attribute", function(done) {
    const id = 'rel';

    lazyLoadCSS(href, {
      id: id,
      media: 'all',
      rel: 'stylesheet'
    }).then(function (sheet) {
      expect(document.getElementById(id).getAttribute('rel')).toBe('stylesheet');
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should add a configurable type attribute", function(done) {
    const id = 'type';

    lazyLoadCSS(href, {
      id: id,
      type: 'text/css'
    }).then(function (sheet) {
      expect(document.getElementById(id).getAttribute('type')).toBe('text/css');
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should support a string id as the second parameter", function(done) {
    lazyLoadCSS(href, 'string').then(function(sheet) {
      expect(sheet.getAttribute('id')).toBe('string');
      done();
    }).catch(function(err) {
      fail(err);
      done();
    });
  });


});
