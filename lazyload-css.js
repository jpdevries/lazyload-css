module.exports = function lazyLoadCSS(src, opts = {}) {
  return new Promise(function(resolve, reject) {
    if(!src) {
      throw new Error('src parameter must be specified');
      return;
    }

    const defaults = {
      media: 'all',
      rel: 'stylesheet',
      type: 'text/css',
      force: false
    };

    const {id, media, rel, type, force} = Object.assign({}, defaults, (typeof opts === 'string') ? {
      id: opts
    } : opts);

    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('type', type);
    link.setAttribute('href', src);
    link.setAttribute('media', media);
    if(id) {
      if(!force && document.getElementById(id)) {
        resolve(document.getElementById(id));
        return;
      }
      link.setAttribute('id', id);
    } else {
      const li = document.head.querySelector(`link[rel="${rel}"][href="${src}"]`);
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
