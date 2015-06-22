// Ionic Starter App

//global variables

//Key for accessing the datapoints for the graph
 var saveKey = 'percentSave';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chats.instructions',{
      url: '/instructions',
      templateUrl: 'templates/instructions.html'
    })
    .state('tab.chats.calculator',{
      url: '/calculator',
      templateUrl: 'templates/calculator.html'
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.pubs', {
    url: '/publications',
    views:{
      'tab-pubs':{
        templateUrl: 'templates/tab-pubs.html'
      }
    }
  })
  .state('tab.account-privacy', {
    url: '/account/privacy',
    views: {
      'tab-account': {
        templateUrl: 'templates/privacy.html'
      }
    }
  })

    .state('tab.dash-results', {
    url: '/dash/results',
    views: {
      'tab-dash': {
        templateUrl: 'templates/results.html'
      }
    }
  })
  
   .state('tab.dash-information', {
      url: '/dash/information',
      views: {
        'tab-dash': {
        templateUrl: 'templates/information.html', 
        controller: 'AboutCtrl'
      }
   }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.directive('surveyQuestion', function(){
  return {
    restrict:'E',
    templateUrl: 'templates/survey-question-template.html',
    controller: function($scope, $ionicSlideBoxDelegate){
      $scope.nextQuestion = function(){
        $ionicSlideBoxDelegate.next();
      };
      
      $scope.previousQuestion = function(idToRemove){
        delete $scope.answers[idToRemove]; //Remove last element
        $ionicSlideBoxDelegate.previous();
      };
      
      $scope.hidePreviousButton = function(){
        return $ionicSlideBoxDelegate.currentIndex() == 0;
      };
      
      $scope.hideNextButton = function(){
        //The last index is the results page
        return $ionicSlideBoxDelegate.currentIndex() == ($ionicSlideBoxDelegate.slidesCount() - 2);
      };    
        
      $scope.setAnswer = function(id, value, text){
        $scope.answers[id] = {"text": text, "value":value};
        $scope.nextQuestion();    
        if(Object.keys($scope.answers).length === $scope.questions.length){
          $scope.calculateResults();
        } 
      };
    },
    controllerAs:'survey'
    
  };
});

Chart.defaults.global.colours = [
    { // light grey
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "#6B5D79",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#6B5D79",
        pointHighlightFill: "#6B5D79",
        pointHighlightStroke: "#6B5D79"
    }
];


