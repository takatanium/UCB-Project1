

const BASE_URL = ''

// IIFE to test API CALL
(function testCall() {
  $.ajax({
    url: null,
    dataType: 'json',
    method: 'GET',
    success: function(res) {
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  })
})();
