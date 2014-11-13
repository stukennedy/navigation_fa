angular.module('integrationApp',['famous.angular', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state("main", {
        url: "/",
        templateUrl: "views/home.html"
    })
    .state("about", {
        url: "/about",
        templateUrl: "views/about.html"
    })
    .state("projects", {
        url: "/projects",
        templateUrl: "views/projects.html"
    })
    .state("audio", {
        url: "/audio",
        templateUrl: "views/audio.html"
    })
    .state("news", {
        url: "/news",
        templateUrl: "views/news.html"
    })
    .state("contact", {
        url: "/contact",
        templateUrl: "views/contact.html"
    })
    ;
});
