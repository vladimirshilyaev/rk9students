(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	__webpack_require__(2);
	var core_1 = __webpack_require__(3);
	var angular2_universal_1 = __webpack_require__(4);
	var app_module_1 = __webpack_require__(5);
	core_1.enableProdMode();
	var platform = angular2_universal_1.platformNodeDynamic();
	function default_1(params) {
	    return new Promise(function (resolve, reject) {
	        var requestZone = Zone.current.fork({
	            name: 'angular-universal request',
	            properties: {
	                baseUrl: '/',
	                requestUrl: params.url,
	                originUrl: params.origin,
	                preboot: false,
	                // TODO: Render just the <app> component instead of wrapping it inside an extra HTML document
	                // Waiting on https://github.com/angular/universal/issues/347
	                document: '<!DOCTYPE html><html><head></head><body><app></app></body></html>'
	            },
	            onHandleError: function (parentZone, currentZone, targetZone, error) {
	                // If any error occurs while rendering the module, reject the whole operation
	                reject(error);
	                return true;
	            }
	        });
	        return requestZone.run(function () { return platform.serializeModule(app_module_1.AppModule); }).then(function (html) {
	            resolve({ html: html });
	        }, reject);
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal-polyfills");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("zone.js");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("@angular/core");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("angular2-universal");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var angular2_universal_1 = __webpack_require__(4);
	var auth_service_1 = __webpack_require__(6);
	var angular2_jwt_1 = __webpack_require__(7);
	var app_component_1 = __webpack_require__(9);
	var app_routing_module_1 = __webpack_require__(14);
	var cad_module_1 = __webpack_require__(16);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    AppModule = __decorate([
	        core_1.NgModule({
	            bootstrap: [app_component_1.AppComponent],
	            declarations: [
	                app_component_1.AppComponent
	            ],
	            providers: [
	                angular2_jwt_1.AUTH_PROVIDERS,
	                auth_service_1.Auth,
	            ],
	            imports: [
	                angular2_universal_1.UniversalModule,
	                app_routing_module_1.AppRoutingModule,
	                cad_module_1.CadModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppModule);
	    return AppModule;
	}());
	exports.AppModule = AppModule;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var angular2_jwt_1 = __webpack_require__(7);
	var Auth0Lock = __webpack_require__(8).default;
	var options = {
	    languageDictionary: {
	        emailInputPlaceholder: "email@email.com",
	        title: "WebCad"
	    },
	    theme: {
	        logo: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/47e1c322329083.56310816f1004.png'
	    },
	};
	var Auth = (function () {
	    function Auth() {
	        // Configure Auth0
	        this.lock = new Auth0Lock('wFZh1IypbUquG9MyaG1nvWLeB2kzwiU5', 'aridlife.auth0.com', options);
	        // Add callback for lock `authenticated` event
	        this.lock.on("authenticated", function (authResult) {
	            localStorage.setItem('id_token', authResult.idToken);
	        });
	    }
	    Auth.prototype.login = function () {
	        // Call the show method to display the widget.
	        this.lock.show();
	    };
	    ;
	    Auth.prototype.authenticated = function () {
	        // Check if there's an unexpired JWT
	        // This searches for an item in localStorage with key == 'id_token'
	        return angular2_jwt_1.tokenNotExpired();
	    };
	    ;
	    Auth.prototype.logout = function () {
	        // Remove token from localStorage
	        localStorage.removeItem('id_token');
	    };
	    ;
	    Auth = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Auth);
	    return Auth;
	}());
	exports.Auth = Auth;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("angular2-jwt");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("auth0-lock");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var auth_service_1 = __webpack_require__(6);
	var AppComponent = (function () {
	    function AppComponent(auth) {
	        this.auth = auth;
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: __webpack_require__(10),
	            styles: [__webpack_require__(11)],
	            providers: [auth_service_1.Auth]
	        }), 
	        __metadata('design:paramtypes', [auth_service_1.Auth])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"welcome\" *ngIf=\"!auth.authenticated()\">\r\n    <h1 class=\"welcome__greeting\">Welcome to Webcad</h1>\r\n    <button (click)=\"auth.login()\" class=\"welcome__button\">Sign in</button>\r\n    <button (click)=\"auth.logout()\" class=\"welcome__button\">Log out</button>\r\n</div>\r\n\r\n<router-outlet></router-outlet>"

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(12);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  background-color: #111111; }\n\n.welcome {\n  background-color: #111111;\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  text-align: center; }\n\n.welcome__greeting {\n  font-size: 3em;\n  border-width: 0px;\n  color: gainsboro; }\n\n.welcome__button {\n  border-radius: 10px;\n  font-size: 3em;\n  border-width: 0px;\n  background-color: gainsboro;\n  margin-left: 20px; }\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(15);
	var AppRoutingModule = (function () {
	    function AppRoutingModule() {
	    }
	    AppRoutingModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                router_1.RouterModule.forRoot([
	                    { path: '', redirectTo: 'cad', pathMatch: 'full' },
	                    { path: '**', redirectTo: 'cad' }
	                ])
	            ],
	            exports: [
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppRoutingModule);
	    return AppRoutingModule;
	}());
	exports.AppRoutingModule = AppRoutingModule;


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("@angular/router");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var common_1 = __webpack_require__(17);
	var auth_service_1 = __webpack_require__(6);
	var angular2_jwt_1 = __webpack_require__(7);
	var cad_component_1 = __webpack_require__(18);
	var headerbar_component_1 = __webpack_require__(22);
	var workspace_component_1 = __webpack_require__(27);
	var cad_routing_module_1 = __webpack_require__(31);
	var models_service_1 = __webpack_require__(23);
	var CadModule = (function () {
	    function CadModule() {
	    }
	    CadModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                common_1.CommonModule,
	                cad_routing_module_1.CadRoutingModule
	            ],
	            declarations: [
	                headerbar_component_1.HeaderbarComponent,
	                cad_component_1.CadComponent,
	                workspace_component_1.WorkspaceComponent
	            ],
	            providers: [
	                models_service_1.ModelsService,
	                angular2_jwt_1.AUTH_PROVIDERS,
	                auth_service_1.Auth,
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CadModule);
	    return CadModule;
	}());
	exports.CadModule = CadModule;


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("@angular/common");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var auth_service_1 = __webpack_require__(6);
	var CadComponent = (function () {
	    function CadComponent(auth) {
	        this.auth = auth;
	    }
	    CadComponent = __decorate([
	        core_1.Component({
	            selector: 'cad',
	            template: __webpack_require__(19),
	            styles: [__webpack_require__(20)],
	            providers: [auth_service_1.Auth]
	        }), 
	        __metadata('design:paramtypes', [auth_service_1.Auth])
	    ], CadComponent);
	    return CadComponent;
	}());
	exports.CadComponent = CadComponent;


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "<div *ngIf=\"auth.authenticated()\">\r\n    <headerbar></headerbar>\r\n    <div class=\"workspace-wrapper\">\r\n        <workspace></workspace>\r\n    </div>\r\n</div>"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(21);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".workspace-wrapper {\n  padding-top: 30px;\n  height: 100vh; }\n", ""]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var models_service_1 = __webpack_require__(23);
	var auth_service_1 = __webpack_require__(6);
	var HeaderbarComponent = (function () {
	    function HeaderbarComponent(modelsService, auth) {
	        this.modelsService = modelsService;
	        this.auth = auth;
	    }
	    HeaderbarComponent.prototype.openFileContextClickHandler = function () {
	        document.getElementById('open-file-dlg').click();
	    };
	    HeaderbarComponent.prototype.openedFileChanged = function (fileInput) {
	        this.modelsService.openFile(fileInput.target.files[0]);
	    };
	    HeaderbarComponent = __decorate([
	        core_1.Component({
	            selector: 'headerbar',
	            template: __webpack_require__(24),
	            styles: [__webpack_require__(25)],
	            providers: [models_service_1.ModelsService, auth_service_1.Auth]
	        }), 
	        __metadata('design:paramtypes', [models_service_1.ModelsService, auth_service_1.Auth])
	    ], HeaderbarComponent);
	    return HeaderbarComponent;
	}());
	exports.HeaderbarComponent = HeaderbarComponent;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var ModelsService = (function () {
	    function ModelsService() {
	    }
	    ModelsService.prototype.openFile = function (file) {
	        this.file = file;
	    };
	    ModelsService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ModelsService);
	    return ModelsService;
	}());
	exports.ModelsService = ModelsService;


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<nav class=\"navbar navbar-fixed-top navbar-inverse headerbar\">\r\n    <div class=\"fluid-container\">\r\n        <div class=\"navbar-header\">\r\n            <a class=\"navbar-brand\" href=\"/\">WebCAD</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li><button class=\"btn btn-primary btn-margin\" (click)=\"auth.login()\" *ngIf=\"!auth.authenticated()\">Log In</button></li>\r\n                <li><button class=\"btn btn-primary btn-margin\" (click)=\"auth.logout()\" *ngIf=\"auth.authenticated()\">Log Out</button></li>\r\n                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Файл</a>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li (click)=\"openFileContextClickHandler()\">\r\n                            <input id=\"open-file-dlg\" (change)=\"openedFileChanged($event)\" type=\"file\" accept=\"application/sla\">\r\n                            Открыть\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n\r\n            <div class=\"btn-group navbar-right\">\r\n                <div class=\"user-controll\">\r\n                    <button type=\"button\" class=\"btn btn-xs btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                        <span class=\"glyphicon glyphicon-user\"> </span> Batman1995 <span class=\"caret\"></span>\r\n                    </button>\r\n                    <ul class=\"dropdown-menu\">\r\n                        <li><a href=\"#\">Личный кабинет</a></li>\r\n                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\">Выйти</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>"

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(26);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".headerbar {\n  height: 30px;\n  min-height: 30px;\n  margin-bottom: 0; }\n  .headerbar .navbar-brand {\n    padding: 5px 15px;\n    height: 30px; }\n  .headerbar .navbar-nav li a {\n    padding-bottom: 5px;\n    padding-top: 5px; }\n  .headerbar .navbar-right {\n    margin-right: 5px; }\n  .headerbar .user-controll {\n    padding-top: 3px;\n    margin-right: 10px; }\n  .headerbar #open-file-dlg {\n    display: none; }\n  .headerbar .dropdown-menu {\n    cursor: pointer; }\n", ""]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var WorkspaceComponent = (function () {
	    function WorkspaceComponent() {
	    }
	    WorkspaceComponent = __decorate([
	        core_1.Component({
	            selector: 'workspace',
	            template: __webpack_require__(28),
	            styles: [__webpack_require__(29)]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], WorkspaceComponent);
	    return WorkspaceComponent;
	}());
	exports.WorkspaceComponent = WorkspaceComponent;


/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"workspace\">\r\n    Hello world! I'm workspace!\r\n</div>"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(30);
	
	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)();
	// imports
	
	
	// module
	exports.push([module.id, ".workspace {\n  background-color: #3b3b3b;\n  height: 100%;\n  color: white; }\n", ""]);
	
	// exports


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(3);
	var router_1 = __webpack_require__(15);
	var cad_component_1 = __webpack_require__(18);
	var CadRoutingModule = (function () {
	    function CadRoutingModule() {
	    }
	    CadRoutingModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                router_1.RouterModule.forChild([
	                    { path: 'cad', component: cad_component_1.CadComponent }
	                ])
	            ],
	            exports: [
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CadRoutingModule);
	    return CadRoutingModule;
	}());
	exports.CadRoutingModule = CadRoutingModule;


/***/ }
/******/ ])));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODBmMDU2NDdhMmU5MDA3OTQxNGIiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ6b25lLmpzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLXVuaXZlcnNhbFwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvYXBwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3NlcnZpY2VzL2F1dGgvYXV0aC5zZXJ2aWNlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXIyLWp3dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dGgwLWxvY2tcIiIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LnNjc3M/Mjk0MyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvbW9kdWxlcy9hcHAtcm91dGluZy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvcm91dGVyXCIiLCJ3ZWJwYWNrOi8vLy4vQ2xpZW50QXBwL2FwcC9tb2R1bGVzL2NhZC9jYWQubW9kdWxlLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhbmd1bGFyL2NvbW1vblwiIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jYWQvY2FkLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvY2FkL2NhZC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvY2FkL2NhZC5jb21wb25lbnQuc2Nzcz8wODVkIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9jYWQvY2FkLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9oZWFkZXJiYXIvaGVhZGVyYmFyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQuc2Nzcz82OTgzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9oZWFkZXJiYXIvaGVhZGVyYmFyLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQuc2Nzcz80NTE4Iiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy8uL0NsaWVudEFwcC9hcHAvbW9kdWxlcy9jYWQvY2FkLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3RDQSxxQkFBTyxDQUE4QixDQUFDO0FBQ3RDLHFCQUFPLENBQVMsQ0FBQztBQUNqQixrQ0FBK0IsQ0FBZSxDQUFDO0FBQy9DLGdEQUFvQyxDQUFvQixDQUFDO0FBQ3pELHdDQUEwQixDQUFrQixDQUFDO0FBRTdDLHNCQUFjLEVBQUUsQ0FBQztBQUNqQixLQUFNLFFBQVEsR0FBRyx3Q0FBbUIsRUFBRSxDQUFDO0FBRXZDLG9CQUF5QixNQUFXO0tBQ2hDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1NBQy9CLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ2xDLElBQUksRUFBRSwyQkFBMkI7YUFDakMsVUFBVSxFQUFFO2lCQUNSLE9BQU8sRUFBRSxHQUFHO2lCQUNaLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRztpQkFDdEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxNQUFNO2lCQUN4QixPQUFPLEVBQUUsS0FBSztpQkFDZCw2RkFBNkY7aUJBQzdGLDZEQUE2RDtpQkFDN0QsUUFBUSxFQUFFLG1FQUFtRTtjQUNoRjthQUNELGFBQWEsRUFBRSxVQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEtBQUs7aUJBQ3RE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QUF5QixDQUFlLENBQUM7QUFDekMsb0NBQTZCLEVBQWlCLENBQUM7QUFHL0MsMkNBQTZCLEVBQW9DLENBQUM7QUFjbEU7S0FBQTtLQUFnQyxDQUFDO0tBVmpDO1NBQUMsZUFBUSxDQUFDO2FBQ04sT0FBTyxFQUFFO2lCQUNMLHFCQUFZLENBQUMsUUFBUSxDQUFDO3FCQUNsQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLDRCQUFZLEVBQUU7a0JBQzNDLENBQUM7Y0FDTDthQUNELE9BQU8sRUFBRTtpQkFDTCxxQkFBWTtjQUNmO1VBQ0osQ0FBQzs7eUJBQUE7S0FDOEIsdUJBQUM7QUFBRCxFQUFDO0FBQXBCLHlCQUFnQixtQkFBSSIsImZpbGUiOiJtYWluLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODBmMDU2NDdhMmU5MDA3OTQxNGJcbiAqKi8iLCJpbXBvcnQgJ2FuZ3VsYXIyLXVuaXZlcnNhbC1wb2x5ZmlsbHMnO1xyXG5pbXBvcnQgJ3pvbmUuanMnO1xyXG5pbXBvcnQgeyBlbmFibGVQcm9kTW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybU5vZGVEeW5hbWljIH0gZnJvbSAnYW5ndWxhcjItdW5pdmVyc2FsJztcclxuaW1wb3J0IHsgQXBwTW9kdWxlIH0gZnJvbSAnLi9hcHAvYXBwLm1vZHVsZSc7XHJcblxyXG5lbmFibGVQcm9kTW9kZSgpO1xyXG5jb25zdCBwbGF0Zm9ybSA9IHBsYXRmb3JtTm9kZUR5bmFtaWMoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwYXJhbXM6IGFueSkgOiBQcm9taXNlPHsgaHRtbDogc3RyaW5nLCBnbG9iYWxzPzogYW55IH0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdFpvbmUgPSBab25lLmN1cnJlbnQuZm9yayh7XHJcbiAgICAgICAgICAgIG5hbWU6ICdhbmd1bGFyLXVuaXZlcnNhbCByZXF1ZXN0JyxcclxuICAgICAgICAgICAgcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAgICAgYmFzZVVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdFVybDogcGFyYW1zLnVybCxcclxuICAgICAgICAgICAgICAgIG9yaWdpblVybDogcGFyYW1zLm9yaWdpbixcclxuICAgICAgICAgICAgICAgIHByZWJvb3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogUmVuZGVyIGp1c3QgdGhlIDxhcHA+IGNvbXBvbmVudCBpbnN0ZWFkIG9mIHdyYXBwaW5nIGl0IGluc2lkZSBhbiBleHRyYSBIVE1MIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBXYWl0aW5nIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3VuaXZlcnNhbC9pc3N1ZXMvMzQ3XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogJzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjwvaGVhZD48Ym9keT48YXBwPjwvYXBwPjwvYm9keT48L2h0bWw+J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkhhbmRsZUVycm9yOiAocGFyZW50Wm9uZSwgY3VycmVudFpvbmUsIHRhcmdldFpvbmUsIGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiBhbnkgZXJyb3Igb2NjdXJzIHdoaWxlIHJlbmRlcmluZyB0aGUgbW9kdWxlLCByZWplY3QgdGhlIHdob2xlIG9wZXJhdGlvblxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0Wm9uZS5ydW48UHJvbWlzZTxzdHJpbmc+PigoKSA9PiBwbGF0Zm9ybS5zZXJpYWxpemVNb2R1bGUoQXBwTW9kdWxlKSkudGhlbihodG1sID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7IGh0bWw6IGh0bWwgfSk7XHJcbiAgICAgICAgfSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vQ2xpZW50QXBwL2Jvb3Qtc2VydmVyLnRzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhcjItdW5pdmVyc2FsLXBvbHlmaWxsc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhcjItdW5pdmVyc2FsLXBvbHlmaWxsc1wiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiem9uZS5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiem9uZS5qc1wiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29yZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhcjItdW5pdmVyc2FsXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyMi11bml2ZXJzYWxcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFVuaXZlcnNhbE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLXVuaXZlcnNhbCc7XHJcblxyXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSAnLi9zZXJ2aWNlcy9hdXRoL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFVVEhfUFJPVklERVJTIH0gZnJvbSAnYW5ndWxhcjItand0JztcclxuXHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvYXBwLXJvdXRpbmcubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FkTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2NhZC9jYWQubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFsgQXBwQ29tcG9uZW50IF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBBVVRIX1BST1ZJREVSUyxcclxuICAgICAgICBBdXRoLFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBVbml2ZXJzYWxNb2R1bGUsIC8vIE11c3QgYmUgZmlyc3QgaW1wb3J0LiBUaGlzIGF1dG9tYXRpY2FsbHkgaW1wb3J0cyBCcm93c2VyTW9kdWxlLCBIdHRwTW9kdWxlLCBhbmQgSnNvbnBNb2R1bGUgdG9vLlxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgQ2FkTW9kdWxlXHJcbiAgICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL0NsaWVudEFwcC9hcHAvYXBwLm1vZHVsZS50c1xuICoqLyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdG9rZW5Ob3RFeHBpcmVkIH0gZnJvbSAnYW5ndWxhcjItand0JztcclxuXHJcbmxldCBBdXRoMExvY2sgPSByZXF1aXJlKCdhdXRoMC1sb2NrJykuZGVmYXVsdDtcclxuXHJcbmxldCBvcHRpb25zID0ge1xyXG4gICAgbGFuZ3VhZ2VEaWN0aW9uYXJ5OiB7XHJcbiAgICAgICAgZW1haWxJbnB1dFBsYWNlaG9sZGVyOiBcImVtYWlsQGVtYWlsLmNvbVwiLFxyXG4gICAgICAgIHRpdGxlOiBcIldlYkNhZFwiXHJcbiAgICB9LFxyXG4gICAgdGhlbWU6IHtcclxuICAgICAgICBsb2dvOiAnaHR0cHM6Ly9taXItczMtY2RuLWNmLmJlaGFuY2UubmV0L3Byb2plY3RfbW9kdWxlcy9kaXNwLzQ3ZTFjMzIyMzI5MDgzLjU2MzEwODE2ZjEwMDQucG5nJ1xyXG4gICAgfSxcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEF1dGgge1xyXG4gICAgLy8gQ29uZmlndXJlIEF1dGgwXHJcbiAgICBsb2NrID0gbmV3IEF1dGgwTG9jaygnd0ZaaDFJeXBiVXF1RzlNeWFHMW52V0xlQjJrendpVTUnLCAnYXJpZGxpZmUuYXV0aDAuY29tJywgb3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gQWRkIGNhbGxiYWNrIGZvciBsb2NrIGBhdXRoZW50aWNhdGVkYCBldmVudFxyXG4gICAgICAgIHRoaXMubG9jay5vbihcImF1dGhlbnRpY2F0ZWRcIiwgKGF1dGhSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgYXV0aFJlc3VsdC5pZFRva2VuKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW4oKSB7XHJcbiAgICAgICAgLy8gQ2FsbCB0aGUgc2hvdyBtZXRob2QgdG8gZGlzcGxheSB0aGUgd2lkZ2V0LlxyXG4gICAgICAgIHRoaXMubG9jay5zaG93KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBhdXRoZW50aWNhdGVkKCkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZXJlJ3MgYW4gdW5leHBpcmVkIEpXVFxyXG4gICAgICAgIC8vIFRoaXMgc2VhcmNoZXMgZm9yIGFuIGl0ZW0gaW4gbG9jYWxTdG9yYWdlIHdpdGgga2V5ID09ICdpZF90b2tlbidcclxuICAgICAgICByZXR1cm4gdG9rZW5Ob3RFeHBpcmVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBsb2dvdXQoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XHJcbiAgICB9O1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9DbGllbnRBcHAvYXBwL3NlcnZpY2VzL2F1dGgvYXV0aC5zZXJ2aWNlLnRzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW5ndWxhcjItand0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyMi1qd3RcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dGgwLWxvY2tcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImF1dGgwLWxvY2tcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGgvYXV0aC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2FwcC5jb21wb25lbnQuaHRtbCcpLFxuICAgIHN0eWxlczogW3JlcXVpcmUoJy4vYXBwLmNvbXBvbmVudC5zY3NzJyldLFxuICAgIHByb3ZpZGVyczogW0F1dGhdXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGgpIHt9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJ3ZWxjb21lXFxcIiAqbmdJZj1cXFwiIWF1dGguYXV0aGVudGljYXRlZCgpXFxcIj5cXHJcXG4gICAgPGgxIGNsYXNzPVxcXCJ3ZWxjb21lX19ncmVldGluZ1xcXCI+V2VsY29tZSB0byBXZWJjYWQ8L2gxPlxcclxcbiAgICA8YnV0dG9uIChjbGljayk9XFxcImF1dGgubG9naW4oKVxcXCIgY2xhc3M9XFxcIndlbGNvbWVfX2J1dHRvblxcXCI+U2lnbiBpbjwvYnV0dG9uPlxcclxcbiAgICA8YnV0dG9uIChjbGljayk9XFxcImF1dGgubG9nb3V0KClcXFwiIGNsYXNzPVxcXCJ3ZWxjb21lX19idXR0b25cXFwiPkxvZyBvdXQ8L2J1dHRvbj5cXHJcXG48L2Rpdj5cXHJcXG5cXHJcXG48cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLmNvbXBvbmVudC5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2FwcC9hcHAuY29tcG9uZW50LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTExMTE7IH1cXG5cXG4ud2VsY29tZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTExMTExO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG5cXG4ud2VsY29tZV9fZ3JlZXRpbmcge1xcbiAgZm9udC1zaXplOiAzZW07XFxuICBib3JkZXItd2lkdGg6IDBweDtcXG4gIGNvbG9yOiBnYWluc2Jvcm87IH1cXG5cXG4ud2VsY29tZV9fYnV0dG9uIHtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBmb250LXNpemU6IDNlbTtcXG4gIGJvcmRlci13aWR0aDogMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ2FpbnNib3JvO1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9hcHAvYXBwLmNvbXBvbmVudCdcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvclJvb3QoW1xyXG4gICAgICAgICAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnY2FkJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcclxuICAgICAgICAgICAgeyBwYXRoOiAnKionLCByZWRpcmVjdFRvOiAnY2FkJyB9XHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vQ2xpZW50QXBwL2FwcC9tb2R1bGVzL2FwcC1yb3V0aW5nLm1vZHVsZS50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiQGFuZ3VsYXIvcm91dGVyXCJcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXV0aC9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBVVRIX1BST1ZJREVSUyB9IGZyb20gJ2FuZ3VsYXIyLWp3dCc7XHJcblxyXG5pbXBvcnQgeyBDYWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NhZC9jYWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSGVhZGVyYmFyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9oZWFkZXJiYXIvaGVhZGVyYmFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFdvcmtzcGFjZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYWRSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9jYWQtcm91dGluZy5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgTW9kZWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBDYWRSb3V0aW5nTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgSGVhZGVyYmFyQ29tcG9uZW50LFxyXG4gICAgICAgIENhZENvbXBvbmVudCxcclxuICAgICAgICBXb3Jrc3BhY2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBNb2RlbHNTZXJ2aWNlLFxyXG4gICAgICAgIEFVVEhfUFJPVklERVJTLFxyXG4gICAgICAgIEF1dGgsXHJcbiAgICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FkTW9kdWxlIHsgfVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vQ2xpZW50QXBwL2FwcC9tb2R1bGVzL2NhZC9jYWQubW9kdWxlLnRzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFuZ3VsYXIvY29tbW9uXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJAYW5ndWxhci9jb21tb25cIlxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGggfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoL2F1dGguc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2FkJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9jYWQuY29tcG9uZW50Lmh0bWwnKSxcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL2NhZC5jb21wb25lbnQuc2NzcycpXSxcbiAgICBwcm92aWRlcnM6IFsgQXV0aCBdXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FkQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGgpIHtcclxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2NhZC9jYWQuY29tcG9uZW50LnRzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgKm5nSWY9XFxcImF1dGguYXV0aGVudGljYXRlZCgpXFxcIj5cXHJcXG4gICAgPGhlYWRlcmJhcj48L2hlYWRlcmJhcj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwid29ya3NwYWNlLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgPHdvcmtzcGFjZT48L3dvcmtzcGFjZT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2NhZC9jYWQuY29tcG9uZW50Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vY2FkLmNvbXBvbmVudC5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2NhZC9jYWQuY29tcG9uZW50LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIud29ya3NwYWNlLXdyYXBwZXIge1xcbiAgcGFkZGluZy10b3A6IDMwcHg7XFxuICBoZWlnaHQ6IDEwMHZoOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvY2FkL2NhZC5jb21wb25lbnQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kZWxzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZSdcclxuaW1wb3J0IHsgQXV0aCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2F1dGgvYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdoZWFkZXJiYXInLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaGVhZGVyYmFyLmNvbXBvbmVudC5odG1sJyksXHJcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL2hlYWRlcmJhci5jb21wb25lbnQuc2NzcycpXSxcclxuICAgIHByb3ZpZGVyczogW01vZGVsc1NlcnZpY2UsIEF1dGhdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSGVhZGVyYmFyQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgb3BlbmVkRmlsZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kZWxzU2VydmljZTogTW9kZWxzU2VydmljZSwgcHJpdmF0ZSBhdXRoOiBBdXRoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5GaWxlQ29udGV4dENsaWNrSGFuZGxlcigpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1maWxlLWRsZycpLmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5lZEZpbGVDaGFuZ2VkKGZpbGVJbnB1dDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbHNTZXJ2aWNlLm9wZW5GaWxlKGZpbGVJbnB1dC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2hlYWRlcmJhci9oZWFkZXJiYXIuY29tcG9uZW50LnRzXG4gKiovIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTW9kZWxzU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBmaWxlOiBGaWxlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHVibGljIG9wZW5GaWxlKGZpbGU6IEZpbGUpIHtcclxuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9DbGllbnRBcHAvYXBwL3NlcnZpY2VzL21vZGVscy9tb2RlbHMuc2VydmljZS50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8bmF2IGNsYXNzPVxcXCJuYXZiYXIgbmF2YmFyLWZpeGVkLXRvcCBuYXZiYXItaW52ZXJzZSBoZWFkZXJiYXJcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJmbHVpZC1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwibmF2YmFyLWhlYWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcIm5hdmJhci1icmFuZFxcXCIgaHJlZj1cXFwiL1xcXCI+V2ViQ0FEPC9hPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGlkPVxcXCJuYXZiYXJcXFwiIGNsYXNzPVxcXCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcXFwiPlxcclxcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwibmF2IG5hdmJhci1uYXZcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+PGJ1dHRvbiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1tYXJnaW5cXFwiIChjbGljayk9XFxcImF1dGgubG9naW4oKVxcXCIgKm5nSWY9XFxcIiFhdXRoLmF1dGhlbnRpY2F0ZWQoKVxcXCI+TG9nIEluPC9idXR0b24+PC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPjxidXR0b24gY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tbWFyZ2luXFxcIiAoY2xpY2spPVxcXCJhdXRoLmxvZ291dCgpXFxcIiAqbmdJZj1cXFwiYXV0aC5hdXRoZW50aWNhdGVkKClcXFwiPkxvZyBPdXQ8L2J1dHRvbj48L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XFxcImRyb3Bkb3duXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJkcm9wZG93bi10b2dnbGVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgcm9sZT1cXFwiYnV0dG9uXFxcIiBhcmlhLWhhc3BvcHVwPVxcXCJ0cnVlXFxcIiBhcmlhLWV4cGFuZGVkPVxcXCJmYWxzZVxcXCI+0KTQsNC50Ls8L2E+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XFxcImRyb3Bkb3duLW1lbnVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAoY2xpY2spPVxcXCJvcGVuRmlsZUNvbnRleHRDbGlja0hhbmRsZXIoKVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwib3Blbi1maWxlLWRsZ1xcXCIgKGNoYW5nZSk9XFxcIm9wZW5lZEZpbGVDaGFuZ2VkKCRldmVudClcXFwiIHR5cGU9XFxcImZpbGVcXFwiIGFjY2VwdD1cXFwiYXBwbGljYXRpb24vc2xhXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAg0J7RgtC60YDRi9GC0YxcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICA8L3VsPlxcclxcblxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImJ0bi1ncm91cCBuYXZiYXItcmlnaHRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1c2VyLWNvbnRyb2xsXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi14cyBidG4tZGVmYXVsdCBkcm9wZG93bi10b2dnbGVcXFwiIGRhdGEtdG9nZ2xlPVxcXCJkcm9wZG93blxcXCIgYXJpYS1oYXNwb3B1cD1cXFwidHJ1ZVxcXCIgYXJpYS1leHBhbmRlZD1cXFwiZmFsc2VcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXJcXFwiPiA8L3NwYW4+IEJhdG1hbjE5OTUgPHNwYW4gY2xhc3M9XFxcImNhcmV0XFxcIj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwiZHJvcGRvd24tbWVudVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiPtCb0LjRh9C90YvQuSDQutCw0LHQuNC90LXRgjwvYT48L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSByb2xlPVxcXCJzZXBhcmF0b3JcXFwiIGNsYXNzPVxcXCJkaXZpZGVyXFxcIj48L2xpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48YSBocmVmPVxcXCIjXFxcIj7QktGL0LnRgtC4PC9hPjwvbGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L25hdj5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9oZWFkZXJiYXIuY29tcG9uZW50LnNjc3NcIik7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIFxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5oZWFkZXJiYXIge1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgbWluLWhlaWdodDogMzBweDtcXG4gIG1hcmdpbi1ib3R0b206IDA7IH1cXG4gIC5oZWFkZXJiYXIgLm5hdmJhci1icmFuZCB7XFxuICAgIHBhZGRpbmc6IDVweCAxNXB4O1xcbiAgICBoZWlnaHQ6IDMwcHg7IH1cXG4gIC5oZWFkZXJiYXIgLm5hdmJhci1uYXYgbGkgYSB7XFxuICAgIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICAgIHBhZGRpbmctdG9wOiA1cHg7IH1cXG4gIC5oZWFkZXJiYXIgLm5hdmJhci1yaWdodCB7XFxuICAgIG1hcmdpbi1yaWdodDogNXB4OyB9XFxuICAuaGVhZGVyYmFyIC51c2VyLWNvbnRyb2xsIHtcXG4gICAgcGFkZGluZy10b3A6IDNweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XFxuICAuaGVhZGVyYmFyICNvcGVuLWZpbGUtZGxnIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmhlYWRlcmJhciAuZHJvcGRvd24tbWVudSB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL2hlYWRlcmJhci9oZWFkZXJiYXIuY29tcG9uZW50LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnd29ya3NwYWNlJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWwnKSxcbiAgICBzdHlsZXM6IFtyZXF1aXJlKCcuL3dvcmtzcGFjZS5jb21wb25lbnQuc2NzcycpXVxufSlcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VDb21wb25lbnQge1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9DbGllbnRBcHAvYXBwL2NvbXBvbmVudHMvd29ya3NwYWNlL3dvcmtzcGFjZS5jb21wb25lbnQudHNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwid29ya3NwYWNlXFxcIj5cXHJcXG4gICAgSGVsbG8gd29ybGQhIEknbSB3b3Jrc3BhY2UhXFxyXFxuPC9kaXY+XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3dvcmtzcGFjZS93b3Jrc3BhY2UuY29tcG9uZW50Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4gICAgICAgIHZhciByZXN1bHQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICBcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vQ2xpZW50QXBwL2FwcC9jb21wb25lbnRzL3dvcmtzcGFjZS93b3Jrc3BhY2UuY29tcG9uZW50LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIud29ya3NwYWNlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzYjNiM2I7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL0NsaWVudEFwcC9hcHAvY29tcG9uZW50cy93b3Jrc3BhY2Uvd29ya3NwYWNlLmNvbXBvbmVudC5zY3NzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2FkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jYWQvY2FkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEhlYWRlcmJhckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBXb3Jrc3BhY2VDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3dvcmtzcGFjZS93b3Jrc3BhY2UuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKFtcclxuICAgICAgICAgICAgeyBwYXRoOiAnY2FkJywgY29tcG9uZW50OiBDYWRDb21wb25lbnQgfVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIFJvdXRlck1vZHVsZVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2FkUm91dGluZ01vZHVsZSB7IH1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL0NsaWVudEFwcC9hcHAvbW9kdWxlcy9jYWQvY2FkLXJvdXRpbmcubW9kdWxlLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==