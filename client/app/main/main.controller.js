'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addTack() {
    console.log('/?sdfdsfsdfssdfs')
    if (this.newTack) {
      this.$http.post('/api/tack', this.newTack);
      this.newTack = {};
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('tackiApp')
  .controller('MainController', MainController);

})();
