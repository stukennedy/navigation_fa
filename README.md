Simple website using Famo.us-Angular
===


In my previous tutorial I showed how you can quickly get [Famo.us](http://famo.us) and [AngularJS](http://angularjs.org) working together using [Famous-Angular](https://github.com/Famous/famous-angular) to create a simple array of boxes.

####What shall we make?
Now let's take it one step further and create a simple website that uses Famo.us to handle animation of a navigation pane and some simple page fade transitions.

Here it is in action as my music website [Stu Kennedy](http://stukennedy.com)

We want the animation to work whether you click on the navigation bar or on a link that should change the navigation, so the navigation bar need to respond to route changes. I decided to go with Angular's optional ui-router module.

####Before you start, tools you will need
* Download and install [git](http://git-scm.com/downloads)
* Download and install [nodeJS](http://nodejs.org/download/)
* Install bower `npm install bower`

####Create your app:
Install bower libraries:- 
```bash
bower install famous-angular
bower install angular-ui-router
bower install bootstrap
``` 
this should download the dependencies into `bower_components`. 

Create an index.html which looks like this

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="integrationApp">
    <head>
        <title></title>
        <link rel="stylesheet" href="bower_components/famous-angular/dist/famous-angular.min.css"/>
        <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">
        <link rel="stylesheet" href="css/main.css"/>
    </head>
    <body>
        <fa-app style="height: 700px; width: 1400px; margin: 0;">
            <fa-view>
                <fa-modifier fa-translate="[250,0]">
                    <fa-surface fa-size="[800,50]">
                        <center><h1>my website</h1></center>
                    </fa-surface>
                </fa-modifier>
            </fa-view>
            <fa-view>
                <fa-modifier fa-translate="[20,80]" fa-size="[180,300]">
                    <ng-include ng-controller="NavbarCtrl" src="'views/navbar.html'"></ng-include>
                </fa-modifier>
            </fa-view>
            <fa-view ng-controller="ContentCtrl">
                <fa-modifier fa-translate="[250,80]" fa-opacity="opacity.get()">
                    <fa-surface fa-size="[800,600]" class="main_content">
                        <ui-view></ui-view>
                    </fa-surface>
                </fa-modifier>
            </fa-view>
            <fa-view>
                <fa-modifier fa-translate="[250,685]">
                    <fa-surface fa-size="[800,50]" class="footer">
                        © 2014 Stu Kennedy
                    </fa-surface>
                </fa-modifier>
            </fa-view>
        </fa-app>

        <!-- Angular libs -->
        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>

        <!-- Famous libs -->
        <script src="bower_components/famous/dist/famous-global.min.js"></script>
        <script src="bower_components/famous-angular/dist/famous-angular.min.js"></script>

        <!-- Application -->
        <script src="scripts/app.js"></script>
        <script src="scripts/controllers/navbar.js"></script>
        <script src="scripts/controllers/content.js"></script>
    </body>
</html>
```
---

####Create the Angular module:

We will now create a `scripts/app.js` file to create the Angular app and inject famous.angular. Let's add `ui.router` so that we can define all the routes for pages in our website.

```js
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
```
---

####Create the Famo.us Template
let's go back to `index.html` and create some Famo.us views to contain the various parts of our website. Inside the `<body>` tag put the following
```html
<fa-app style="height: 700px; width: 1400px; margin: 0;">
    <fa-view>
        <fa-modifier fa-translate="[250,0]">
            <fa-surface fa-size="[800,50]">
                <center><h1>my website</h1></center>
            </fa-surface>
        </fa-modifier>
    </fa-view>
    <fa-view>
        <fa-modifier fa-translate="[20,80]" fa-size="[180,300]">
            <ng-include ng-controller="NavbarCtrl" src="'views/navbar.html'"></ng-include>
        </fa-modifier>
    </fa-view>
    <fa-view ng-controller="ContentCtrl">
        <fa-modifier fa-translate="[250,80]" fa-opacity="opacity.get()">
            <fa-surface fa-size="[800,600]" class="main_content">
                <ui-view></ui-view>
            </fa-surface>
        </fa-modifier>
    </fa-view>
    <fa-view>
        <fa-modifier fa-translate="[250,685]">
            <fa-surface fa-size="[800,50]" class="footer">
                © 2014 Stu Kennedy
            </fa-surface>
        </fa-modifier>
    </fa-view>
</fa-app>
```
Here we are creating a header, a navigation bar, a content pane and a footer.

We now need to create the navigation bar itself, which we just ng-included in-line above using `<ng-include ng-controller="NavbarCtrl" src="'views/navbar.html'">` ... this is where the magic happens.
    
----
####Create the Navigation Bar:

The navigation bar comprises two parts; the template `views/navbar.html` and the controller, which we will put in 'scripts/controllers/navbar.js'

Here is the template

```html
<fa-view ng-repeat="box in boxes">
    <fa-modifier fa-translate="[0, (height+5)*$index, 0]">
        <fa-modifier fa-translate="box.trans.get()">
            <fa-surface fa-size="[width,height]"
                        fa-click="click($index)"
                        class="menu">
                <i class="glyphicon glyphicon-{{box.icon}}"></i>
                {{box.text}}
            </fa-surface>
        </fa-modifier>
    </fa-modifier>
</fa-view>
<fa-view>
    <fa-modifier fa-translate="cursor.get()">
        <fa-surface
                    fa-size="[10,height]"
                    class="cursor">
        </fa-surface>
    </fa-modifier>
</fa-view>
```
This iterates over an array on the `$scope` called `boxes` which holds a Famo.us `Transitionable` for each menu item.

As you can see, the array of menu items are modified according to each respective Transitionable, which we will affect from the controller. Other parameters are also set in the controller, such as the size of the boxes. We also have a cursor surface which will be moved vertically to highlight the selected item.

Here is the controller:

```js
angular.module('integrationApp')
.controller('NavbarCtrl',function ($scope, $rootScope, $famous, $location) {
    var Transitionable  = $famous["famous/transitions/Transitionable"];
    var i;
    $scope.cursor = new Transitionable([0,0,0]);
    $scope.width = 130;
    $scope.height = 30;

    $scope.boxes = [{text: 'Home', url: '/', icon: 'home'},
                    {text: 'About', url: '/about', icon: 'user'},
                    {text: 'Projects', url: '/projects', icon: 'list'},
                    {text: 'Audio', url: '/audio', icon: 'headphones'},
                    {text: 'News', url: '/news', icon: 'warning-sign'},
                    {text: 'Contact', url: '/contact', icon: 'envelope'}];
    $scope.selected = null;

    for (i = 0; i < $scope.boxes.length; i++)
        $scope.boxes[i].trans = new Transitionable([0,0,0]);

    $scope.animate = function (index) {
        $scope.boxes[index].trans.set([30,0,50], {duration: 500, curve: 'easeOut'});

        $scope.cursor.set([0,index*($scope.height + 5),50], {duration: 500, curve: 'easeOut'});
        var pos_1 = Math.min(index,$scope.selected);
        var pos_2 = Math.max(index,$scope.selected);
        for (var i = pos_1 + 1; i < pos_2; i++) {
            $scope.boxes[i].trans.set([15,0,50], {duration: 500, curve: 'easeOut'});
            $scope.boxes[i].trans.set([0,0,50], {duration: 100, curve: 'easeOut'});
        }

        if (index != $scope.selected && $scope.selected !== null)
            $scope.boxes[$scope.selected].trans.set([0,0,0], {duration: 500, curve: 'easeOut'});
        $scope.selected = index;
    };

    $scope.click = function (index) {
        $location.path( $scope.boxes[index].url );
    };

    $rootScope.$on('$locationChangeStart', function(event) {
        $rootScope.$broadcast('transition_out');
    });

    $rootScope.$on('$locationChangeSuccess', function(event) {
        var i;
        $rootScope.$broadcast('transition_in');
        var url = $location.path();
        for (i = 0; i < $scope.boxes.length; i++) {
            if ($scope.boxes[i].url === url) {
                if($scope.selected !== i)
                    $scope.animate(i);
            }
        }
    });

});
```

Here, we setup the parameters for the menu items (text, url, icon) and load in some Transitionables ready to work on the respective `<fa-modifier>` tags in the template. The event `$locationChangeSuccess` is caught from ui-router and we determine from the `$location.path()` which box should be selected. We then animate the correct box.

The animate method deselects the previous selected box (which we store in `$scope.selected`) and then selected the new box. It also animates the cursor to move next to the newly selected box. Additionally if the cursor has to move over other boxes to get to the new selection we move those boxes out of the way temporarily using the `for` loop.

---

####Stylesheet

We won't be able to see anything without the stylesheet, which sets the `background-color` for the surfaces amongst other things, so here it is

```css
root {
    display: block;
}

body {
    font-family: 'Quicksand', sans-serif;
    font-size: 18px;
    background-color: #231F20;
    color: #fff;
}

h1 {
    font-family: 'Quicksand', sans-serif;
    font-size: 48px;
    color: #CFCFCD;
}

h3 {
    color: #EC1D25;
}

a {
    color: #EC1D25;
}

hr {
    border-color: #444;
}

i {
    color: #CFCFCD;
}

input, textarea {
    background-color: #000;
    border-color: #444;
    border-width: 1px;
    border-style: solid;
    padding: 4px;
}

.menu {
    padding-left: 10px;
    padding-top: 3px;
    font-family: Helvetica;
    font-family: 'Quicksand', sans-serif;
    font-size: 18px;
    cursor: pointer;
    background-color: #333;
    border-color: #444;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    color: #EC1D25;
}

.cursor {
    background-color: #333;
    border-color: #444;
    border-width: 1px;
    border-style: solid;
}

.main_content {
    padding: 20px;
    border-style: solid;
    border-width: 1px;
    border-color: #444;
    background-color: #333;
    border-radius: 10px;
}

.footer {
    font-family: Helvetica;
    font-family: 'Quicksand', sans-serif;
    font-size: 10px;
}
```
---
####Fading content pane

So we're nearly done, we need to create some content in the `views` folder for our router to find. But there is one more thing ... you may have noticed in our Navbar controller we `$broadcast` two events `transition_in` and `transition_out`. We can pick these up on our `$rootScope` and handle a fade out and fade in.

Let's create `scripts/controllers/content.js`

```js
angular.module('integrationApp')
.controller('ContentCtrl',function ($scope, $rootScope, $famous) {
    var Transitionable  = $famous["famous/transitions/Transitionable"];
    $scope.opacity = new Transitionable(0);
    $rootScope.$on('transition_out', function () {
        $scope.opacity.set(0);
    });

    $rootScope.$on('transition_in', function () {
        $scope.opacity.set(1, {duration: 3000, curve: 'easeOut'});
    });
});
```
This sets a Transitionable on the `fa-opacity` attribute of our content pane modifier. We then pickup the close and open events, hopefully fading out before the router changes then content and then fading in slowly.

####That's it! We're done ... just run the index.html file in your browser
