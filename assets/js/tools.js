//commonly used tools
var tools = {
	// returns a random number
	getRandom: function(max) {
		return Math.floor(Math.random() * max);
	},

  capFirst: function(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	},

  getMaxAttrIndex: function(arr, key) {
		var res = Math.max.apply(Math,arr.map(function(o){return o[key];}))
		return arr.findIndex(function(o){ return o[key] == res; })
  },

  shuffle: function(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
    return arr;
	}

};