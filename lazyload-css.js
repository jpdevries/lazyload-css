module.exports = function lazyLoadCSS(src, id = undefined, media = 'all', rel = 'stylesheet', type = 'text/css') {
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
    } else {
      const li = document.head.querySelector(`link[href="${src}"]`);
      if(li) {
        resolve(li);
        return;
      }
    }
    link.onload = function(event) {
      resolve(link);
    }
    document.head.appendChild(link);
  })
}
