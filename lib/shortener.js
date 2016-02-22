var HashMap = require('hashmap');
var map = new HashMap();

function shortify(param, sitename){
  param = (isNaN(param)) ? param : parseInt(param);

  if (typeof param === 'number'){
    var search = map.has(param);
    // id found, return original URL
    if (search){
      return {
        'redir'       :1,
        'original_url':map.get(param)
      }
    }
    // id not found, return error
    else{
      return {
        'error': "No short url found for given input"
      }
    }
  }
  // param is a string
  else{
    var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
    var regex = new RegExp(expression);
    // param is an URL
    if (param.match(regex)){
      var key = map.search(param); 

      // not yet mapped
      if (!key){
        var key = map.count() + 1;
        map.set(key, param);
      }
      return {
        "original_url": param,
        "short_url"   : sitename + '/' + key
      }
    }
    // param is not an URL
    else{
      return {
        "original_url": "invalid",
        "short_url"   : ""
      }
    }
  }
}

exports.shortify = shortify;