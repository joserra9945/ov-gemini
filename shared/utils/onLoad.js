/* eslint-disable no-param-reassign */
export const onLoad = (url, selector, callback) => {
  if (typeof url !== 'string') {
    throw new Error('Invalid URL: ', url);
  } else if (typeof selector !== 'string') {
    throw new Error('Invalid selector selector: ', selector);
  } else if (typeof callback !== 'function') {
    throw new Error('Callback provided is not a function: ', callback);
  }

  const xhr = new XMLHttpRequest();
  let finished = false;
  // eslint-disable-next-line no-multi-assign
  xhr.onabort = xhr.onerror = function xhrError() {
    finished = true;
    callback(null, xhr.statusText);
  };

  xhr.onreadystatechange = function xhrStateChange() {
    if (xhr.readyState === 4 && !finished) {
      finished = true;
      let section;
      try {
        section = xhr.responseXML.querySelector(selector);
        callback(section);
      } catch (e) {
        callback(null, e);
      }
    }
  };

  xhr.open('GET', url);
  xhr.responseType = 'document';
  xhr.send();
};
