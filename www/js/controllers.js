angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('InstCtrl', function($scope) {})

.controller('CalcCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CalcTabCtrl', function($scope) {
  $scope.activeTabId=1;
  $scope.setActiveTab=function(tabId) {
    $scope.activeTabId=tabId;
  };
}) 

.controller('SurveyController', function($scope, $ionicSlideBoxDelegate){
  
  //Hack to disable slidebox
  $scope.disableSwipe = function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  };
  
  //Hardcoded values for the calculator from http://http://www.ivfpredict.com/js/ivfpredict.js
  
  $scope.t1 = [
         [0.4109,0.1391,0.0,-0.0909,-0.1571,-0.1545],
         [0.5934,0.2912,0.2,0.17,0.0525,0.0849],
         [0.2423,-0.2176,-0.2586,-0.2915,-0.3462,-0.2723],
         [0.5398,0.0927,0.0513,0.0146,-0.0368,-0.1145],
         [0.3773,-0.1350,-0.0336,-0.6042,-0.8615,-0.4659],
         [0.0293,-0.4004,-0.3816,0.7505,-0.3373,-0.8469]
        ];
        
  $scope.t2 = [
         [0.0,0.0129],
         [0.0,-0.4216],
         [0.0,-0.3436],
         [0.0,-1.2512],
         [0.0,-2.1049],
         [0.0,-2.7981]
        ];

  $scope.t3 = [
         [0.0,-0.1455,-0.0763,-0.0526,-1.1661,-0.2728,-0.22],
         [0.1481,-0.0861,0.1688,0.0981,0.3989,0.1678,0.1450]
        ];
  $scope.t4 = [
         [0.0,-0.1613,-0.0368],
         [0.0,-0.1663,-0.1928]
        ];

  $scope.t5 = [0.0,-0.3210,-0.3489,-0.2496,-0.5931,-0.3863];
  
  // 0 means no previous IVF, never been pregnant
  // 1         ditt         , spontaneous pregnancy
  // 2         ditto        , normal live birth
  // 3 means previous unsuccessful IVF
  // 4 means previous IVF, got pregnant, no baby
  // 5 means previous successful IVF       
  $scope.t6 = [0.0,0.0276,0.1735,0.1280,0.0123,0.4593];
     
  $scope.t7 = [0.0,0.29,0.4458];
  
    //Actual controller begins here
    
    $scope.percentage = 0.0;
    
    $scope.answers = {};
  
    $scope.questions = [
        {
          label: "Woman's age",
          model: "age",
          options:[
            {text:"18-34",value:0}, {text:"35-37",value:1},
            {text:"38-39",value:2}, {text:"40-42",value:3}, {text:"43-44",value:4}, {text:"45-50",value:5}
            ]
        },
        {
          label:"Trying for",
          model: "duration",
          options:[
            {text:"Less than 1 year",value:0}, {text:"1 year",value:1}, {text:"2 years",value:1}, {text:"3 years",value:1},
            {text:"4 years",value:2}, {text:"5 years",value:2}, {text:"6 years",value:2}, {text:"7 years",value:3},
            {text:"8 years",value:3}, {text:"9 years",value:3}, {text:"10 years",value:4}, {text:"11 years",value:4},
            {text:"12 years",value:4}, {text:"More than 12 years",value:5}]
        },
        {
          label:"Own or donor eggs",
          model: "source",
          options:[
            {text:"Own eggs", value:0},
            {text:"Donor eggs", value:1}]
        },
        {
          label:"Cause",
          model:"cause",
          options:[
            {text:"Unknown", value:0},
            {text:"Damaged Tubes", value:1},
            {text:"Irregular Ovulation", value:2},
            {text:"Endometriosis", value:3},
            {text:"Cervical", value:4},
            {text:"Low Sperm Count", value:5},
            {text:"More Than One Cause", value: 6}
            ]
        },
        {
          label:"IVF Attempts",
          model:"attempts",
          options:[
            {text:"First", value:0},
            {text:"Second", value:1},
            {text:"Third or More", value:2}
          ]
        },
        {
          label:"Unsuccesful Attempts",
          model:"unsuccesful",
          options:[
            {text:"Zero", value:0},
            {text:"One", value:1},
            {text:"Two", value:2},
            {text:"Three", value:3},
            {text:"Four", value:4},
            {text:"Five or More", value:5}
          ]
        },
        {
          label:"Pregnancy History",
          model:"history",
          options:[
            {text:"No IVF, no pregnancy", value:0},
            {text:"No IVF, pregnant only", value:1},
            {text:"No IVF, live birth", value:2},
            {text:"IVF, no pregnancy", value:3},
            {text:"IVF, pregnant only", value:4},
            {text:"IVF, live birth", value:5}
          ]
        },
        {
          label:"Medication",
          model:"medication",
          options:[
            {text:"Antioestrogen", value:0},
            {text:"Gonadotrophin", value:1},
            {text:"Hormone replacement", value:2}
          ]
        },
        {
          label:"Will ICSI be used?",
          model:"icsi",
          options:[
            {text:"No", value:0},
            {text:"Yes", value:1}
          ]
        }
      ];
      
      //The contents of this function were copied from http://http://www.ivfpredict.com/js/ivfpredict.js
      $scope.calculateResults = function(){
        $scope.percentage = 5;
        var ans = $scope.answers;
        
        
        var yup = 
                  $scope.t1[ans["age"]][ans["duration"]] + 
                  $scope.t2[ans["age"]][ans["source"]] +
                  $scope.t3[ans["icsi"]][ans["cause"]] + 
                  $scope.t4[ans["icsi"]][ans["attempts"]] +
                  $scope.t5[ans["unsuccesful"]] + 
                  $scope.t6[ans["history"]] + 
                  $scope.t7[ans["medication"]];
        
        var y = -1.1774;
     
        y = y + yup;
    
        var prob = (100 * Math.exp(y))/(1 + Math.exp(y));
     
        prob = Math.round(prob * 10) / 10;
        
        $scope.percentage = prob;

      };
      
      $scope.restartTest = function(){
        $scope.answers = {};
        $ionicSlideBoxDelegate.slide(0);
      };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
