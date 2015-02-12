var _module = angular.module;
var _slice = Array.prototype.slice;
angular.module = function(moduleName, dependencies){
  var module = null;
  if(!(dependencies instanceof Array)){
    return _module.call(null, moduleName); // Just the getter
  }

  // dependencies.push('songFlux');
  module = _module.call(null, moduleName, dependencies); // A new module

  module.action = module.action || function(ActionCtor){
    ActionFactory.$inject = [ 'songFactory' ];
    function ActionFactory(song){
      ActionCtor.prototype.getDispatcher = function(){
        this.dispatcher = this.dispatcher || song.getDispatcher(this.module || moduleName);
        return this.dispatcher;
      };
      ActionCtor.prototype.dispatch = function(){
        this.getDispatcher().dispatch(this);
      };
      return ActionCtor;
    }
    module.factory(ActionCtor.name, ActionFactory);
    return module;
  };

  module.component = module.component || function(name, ComponentCtor){
    if (arguments.length === 1) {
      ComponentCtor = name;
      name = ComponentCtor.directive;
    }
    module.directive(name, function(){
      var directive = new ComponentCtor();

      directive.controller = directive.controller || function NoopCtrl(){};
      directive.scope = directive.scope || {};
      directive.restrict = directive.restrict || 'EA';

      directive.replace = directive.replace || false;
      directive.controllerAs = 'state';
      directive.bindToController = true;

      return directive;
    });

    return module;
  };

  module.store = module.store || function(name, StoreConstructor){
    if(arguments.length === 1){
      StoreConstructor = name;
      name = StoreConstructor.name;
    }
    var injectables = StoreConstructor.$inject || [];
    injectables.push('songFactory');
    StoreFactory.$inject = injectables;
    function StoreFactory(){
      var song = arguments[arguments.length - 1];
      var args = _slice.call(arguments, 0, arguments.length - 1);

      StoreConstructor.prototype.getDispatcher = function(){
        this.dispatcher = this.dispatcher || song.getDispatcher(this.module || moduleName);
        return this.dispatcher;
      };

      StoreConstructor.prototype.register = function(ActionCtor, fn){
        this.getDispatcher().register(ActionCtor, fn.bind(this));
      };

      function StoreConstructorApply(){
        StoreConstructor.apply(this, args);
        EventEmitter.call(this);
      }
      StoreConstructorApply.prototype = StoreConstructor.prototype;
      for(var m in EventEmitter.prototype){
        StoreConstructorApply.prototype[m] = EventEmitter.prototype[m];
      }

      return new StoreConstructorApply();
    }

    module.factory(name, StoreFactory);
    return module;
  };

  module.page = module.page || function(stateName, config){
    module.config(function($stateProvider){
      $stateProvider.state(stateName, config);
    });
  };

  return module;
};
