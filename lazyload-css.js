module.exports = function lazyLoadCSS(src, id = undefined, rel = 'stylesheet', type = 'text/css', media = 'all') {
  return new Promise(function(resolve, reject) {
    if(!src) {
      throw new Error('src parameter must be specified');
      return;
    }

    var link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('type', type);
    link.setAttribute('href', src);
    link.setAttribute('media', media);
    if(id) {
      if(document.getElementById(id)) {
        resolve(document.getElementById(id));
        return;
      }
      link.setAttribute('id', id);
    }
    document.querySelector('html > head').appendChild(link);
    resolve(link);
  })
}
