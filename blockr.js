// blockr.io v1 API methods 
// See http://blockr.io/documentation/api for full API spec

var Blockr = (function() {
  // Different coin info is retrieved via different subdomains
  var COIN_SUBDOMAINS = [ "btc", "btct", "ltc", "dgc", "qrk", "ppc", "mec" ];
  
  // Used to construct query urls for v1 of the API
  var V1_URL_FRAGMENT = ".blockr.io/api/v1";
  
  // Some queries can specify a confirmation count. This is the upper bound allowed.
  var CONF_LIMIT = 15;

  // Make API calls via https
  var httpsEnabled = false;
  
  // Determines which crypto-coin we are querying about.
  var coinSubdomain = "btc";
  
  function get_base_url() {
    return (httpsEnabled ? "https://" : "http://") + coinSubdomain + V1_URL_FRAGMENT;
  }
  
  // Retrieves the data and returns it via the callback.
  function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var data;
        if (xhr.status == 200) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch(e) {
            data = { "status" : "error", "message" : e.toString() };
          }
        } else {
          data = { "status" : "error", "message" : xhr.statusText };
        }
        callback(data);
      }
    };
    xhr.send();
  }
  
  // Generates Coin-related API Call Functions
  function createCoinFunc(urlFragment) {
    return function(callback) {
      var url = get_base_url() + "/coin" + urlFragment;
      get(url, callback);
    }
  }
  
  // Generates ExchangeRate-related API Call Functions
  function createExchangeRateFunc(urlFragment) {
    return function(callback) {
      var url = get_base_url() + "/exchangerate" + urlFragment;
      get(url, callback);
    }
  }

  // Generates Block-related API Call Functions
  function createBlockFunc(urlFragment) {
    return function(block, callback) {
      var url = get_base_url() + "/block" + urlFragment + block;
      get(url, callback);
    };
  }
  
  // Generates Transaction-related API Call Functions
  function createTxFunc(urlFragment) {
    return function(tx_hash, callback) {
      var url = get_base_url() + "/tx" + urlFragment + tx_hash;
      get(url, callback);
    };
  }
  
  // Generates Address-related API Call Functions
  function createAddressFunc(urlFragment, allowConfArg) {
    return function(addr, callback, opt_confs) {
      var url = get_base_url() + "/address" + urlFragment + addr;
      if (allowConfArg && opt_confs && opt_confs > 0 && opt_confs <= CONF_LIMIT) {
        url += "?confirmations=" + opt_confs;
      }
      get(url, callback);
    };
  }
  
  return {
    // Settings
    setHttpsEnabled : function(enabled) { httpsEnabled = enabled; },
    
    setCoinSubdomain : function(subdomain) {
      if (COIN_SUBDOMAINS.indexOf(subdomain) != -1) {
        coinSubdomain = subdomain;
      }
    },
    
    // API methods
    coin : {
      info : createCoinFunc("/info/")
    },
    
    exchangerate : {
      current : createExchangeRateFunc("/current/")
    },
    
    block : {
      info : createBlockFunc("/info/"),
      txs  : createBlockFunc("/txs/"),
      raw  : createBlockFunc("/raw/")
    },
    
    tx : {
      info : createTxFunc("/info/"),
      raw  : createTxFunc("/raw/")
    },
    
    address : {
      info        : createAddressFunc("/info/", true),
      balance     : createAddressFunc("/balance/", true),
      txs         : createAddressFunc("/txs/", false),
      unspent     : createAddressFunc("/unspent/", false),
      unconfirmed : createAddressFunc("/unconfirmed/", false)
    },
    
  };
})();


Blockr.Blockr.coin.info(function(o) {
    console.log(o);
});