//commonly used tools
var tools = {

  /**
   * [getRandom description]
   * @param  {[type]} max [description]
   * @return {[type]}     [description]
   */
  getRandom: function(max) {
    return Math.floor(Math.random() * max);
  },

  /**
   * [capFirst description]
   * @param  {[type]} string [description]
   * @return {[type]}        [description]
   */
  capFirst: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * [getMaxAttrIndex description]
   * @param  {[type]} arr [description]
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  getMaxAttrIndex: function(arr, key) {
    var res = Math.max.apply(
      Math,
      arr.map(function(o) {
        return o[key];
      })
    );
    return arr.findIndex(function(o) {
      return o[key] == res;
    });
  },

  /**
   * [shuffle description]
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  shuffle: function(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }
    return arr;
  },

  /**
   * [hasWhiteSpace description]
   * @param  {[type]}  arr [description]
   * @return {Boolean}     [description]
   */
  hasWhiteSpace: function(arr) {
    return arr.indexOf(" ") >= 0;
  },

  /**
   * [splitWords description]
   * @param  {[type]} arr [description]
   * @return {[type]}     [description]
   */
  splitWords: function(arr) {
    return arr.substr(0, arr.indexOf(" "));
  },

  /**
   * [getMaxOfArray description]
   * @param  {[type]} numArray [description]
   * @return {[type]}          [description]
   */
  getMaxOfArray: function(numArray) {
    return Math.max.apply(null, numArray);
  },

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  cutDecimal: function(x) {
    return x.toFixed(3);
  }

};
