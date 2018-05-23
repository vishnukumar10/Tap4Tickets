(function() {


}).call(this);


var app = angular.module('myApp', []);

app.service('Map', function($q) {
    
    this.init = function() {
        var options = {
            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
            zoom: 13,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
});

app.controller('newPlaceCtrl', function($scope, Map) {
    
    $scope.place = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    //  $scope.send = function() {
    //      alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    //  }
    
    // Map.init();
});



// $('.datepicker').pickadate({
//     min: new Date(),
//     selectMonths: true, // Creates a dropdown to control month
//     selectYears: 15, // Creates a dropdown of 15 years to control year
//     firstDay: 1
//   });

// var picker = $('#beginDate').pickadate('picker');
// picker.set('select', new Date());
// var picker = $('#endDate').pickadate('picker');
// picker.set('select', new Date());


//  $('select').material_select();



//  //Number Picker Plugin - TobyJ
// (function ($) {
//   $.fn.numberPicker = function() {
//     var dis = 'disabled';
//     return this.each(function() {
//       var picker = $(this),
//           p = picker.find('button:last-child'),
//           m = picker.find('button:first-child'),
//           input = picker.find('input'),                 
//           min = parseInt(input.attr('min'), 10),
//           max = parseInt(input.attr('max'), 10),
//           inputFunc = function(picker) {
//             var i = parseInt(input.val(), 10);
//             if ( (i <= min) || (!i) ) {
//               input.val(min);
//               p.prop(dis, false);
//               m.prop(dis, true);
//             } else if (i >= max) {
//               input.val(max);
//               p.prop(dis, true); 
//               m.prop(dis, false);
//             } else {
//               p.prop(dis, false);
//               m.prop(dis, false);
//             }
//           },
//           changeFunc = function(picker, qty) {
//             var q = parseInt(qty, 10),
//                 i = parseInt(input.val(), 10);
//             if ((i < max && (q > 0)) || (i > min && !(q > 0))) {
//               input.val(i + q);
//               inputFunc(picker);
//             }
//           };
//       m.on('click', function(){changeFunc(picker,-1);});
//       p.on('click', function(){changeFunc(picker,1);});
//       input.on('change', function(){inputFunc(picker);});
//       inputFunc(picker); //init
//     });
//   };
// }(jQuery));


$(document).on('ready', function(){
  
  $('.plusminus').numberPicker();
  
  //add dynamically:
  $('<div class="plusminus horiz"><button></button><input type="number" name="qty" value="1" min="1" max="5"><button></button></div>').numberPicker().appendTo('body');
  
});



// JAVASCRIPT FOR DATEPICKER

(function() {
  var date_picker, el, end_date_input, start_date_input;

  el = $('.container');

  start_date_input = el.find('.start_date');

  end_date_input = el.find('.end_date');

  date_picker = el.find('.date-picker').datepicker({
    numberOfMonths: 2,
    onSelect: function(dateText, inst) {
      var current, new_current;
      current = el.data('current');
      current || (current = 'start_date');
      el.data(current, $(this).datepicker('getDate'));
      el.find("." + current).val(dateText);
      if (current === "start_date") {
        new_current = "end_date";
        el.data(new_current, null);
        el.find("." + new_current).val('');
      } else {
        new_current = "start_date";
      }
      return el.data('current', new_current);
    },
    beforeShowDay: function(date) {
      var className;
      if (el.data('start_date') && el.data('end_date') && el.data('start_date').getTime() <= date.getTime() && el.data('end_date').getTime() >= date.getTime()) {
        className = 'date-range-selected';
      } else {
        className = '';
      }
      return [true, className];
    }
  });

  el.on('change', 'select', function() {
    var end_Date, end_date, first, last, start_date, today, value, yesterday;
    value = $(this).val();
    today = new Date();
    switch (value) {
      case 'today':
        start_date = end_date = today;
        break;
      case 'yesterday':
        yesterday = new Date(today.setDate(today.getDate() - 1));
        start_date = end_date = yesterday;
        break;
      case 'week':
        first = today.getDate() - today.getDay();
        last = first + 6;
        start_date = new Date(today.setDate(first));
        end_date = new Date(today.setDate(last));
        break;
      case 'month':
        start_date = new Date(today.getFullYear(), today.getMonth(), 1);
        end_date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'year':
        start_date = new Date(today.getFullYear(), 0, 1);
        end_date = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        start_date = end_Date = null;
    }
    if (start_date && end_date) {
      start_date.setHours(0, 0, 0, 0);
      end_date.setHours(0, 0, 0, 0);
      start_date_input.val($.datepicker.formatDate(date_picker.datepicker('option', 'dateFormat'), start_date));
      end_date_input.val($.datepicker.formatDate(date_picker.datepicker('option', 'dateFormat'), end_date));
      el.data('start_date', start_date);
      el.data('end_date', end_date);
    } else {
      el.data('start_date', null);
      el.data('end_date', null);
    }
    return date_picker.datepicker('refresh');
  });

}).call(this);



// END OF JAVASCRIPT FOR DATEPICKER