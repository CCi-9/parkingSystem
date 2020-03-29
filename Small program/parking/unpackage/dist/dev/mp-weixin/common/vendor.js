(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 12:
/*!***************************************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/components/andy-ADNavBar/ADNavBarUtil.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 设置各平台状态栏和导航栏的高度
var setADNavBar = function setADNavBar() {
  uni.getSystemInfo({
    success: function success(e) {










      _vue.default.prototype.StatusBarHeight = e.statusBarHeight;
      var custom = wx.getMenuButtonBoundingClientRect();
      _vue.default.prototype.Custom = custom;
      _vue.default.prototype.CustomBarHeight = custom.bottom + custom.top - e.statusBarHeight;





    } });

};var _default =

{
  setADNavBar: setADNavBar };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 178:
/*!************************************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/components/plate-number/plate-del.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    } else {
      console.error(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 200:
/*!****************************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/components/uni-icons/icons.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 26:
/*!*****************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/static/bg/logo.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4AezBCXzThf34/9cnECgUmQimKEbtxKuFyTxQqQeeKEOCBAoiSTjbUIxOnf1u6r7TTb+oy8LctBQo4TKMVgVFTIwosE1UPJnQGhFXL8IlIkdDS2nev/bx/fv4+9tvCyEEJe37+TREBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZDRFBKKaVUZjNEBKWUUkplNkNEUEoppVRmM0QEpZRSSmU2Q0RQSimlVGYzRASllFJKZTZD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9sEHH1BWVsYnn3xCszygmjTq2rUr48aN42c/+xkmk4lU1NXVsWDBAp577jni8Tjp1qNHD4qKirjqqqtI1a5du6ioqGDFihWICGmyGph63HHH1TgcDoYOHUq7du1Qqq0zRASl1P+KRqPMnj2b1157jWZ5QBWQT5qYTCaGDh2Ky+WiS5cupCIej/Piiy8yb9489uzZw9GWl5dHSUkJZ599Nqn66KOPKCsro6amhjSqBgqtVmtNcXExF198MUq1ZYaIoFRbt3//fp566imWLFnCwYMH84AqIJ80uuiii3C73Zx66qmkat26dZSVlVFbW8v3yTAMrrvuOiZOnMgJJ5xAql599VUqKir46quvSKNqoPCCCy6omTJlCqeddhpKtUWGiKBUWxWPx3nppZeYO3cu33zzTR5QBeSTRr169cLtdnPJJZeQqq1btzJjxgxef/11fkhZWVmMGTOGESNGYDabScWBAwdYtGgRVVVVNDY2kkbVJpOpcMiQITUul4uuXbuiVFtiiAhKtUXvv/8+M2bMoLa2lmYbgHzSqHPnztx6663Y7XbatWtHKvbv38+iRYt49tlnaWxs5Fhx0kknUVxcTEFBAanatm0bs2fP5q9//StpVp2dnV3ocDhqhg0bRrt27VCqLTBEBKXaks2bNzNz5kzeeOMNmuUB1aSRYRjccMMNjB8/nm7dupGqcDjMnDlz2LVrF8eqfv36UVJSQm5uLqlav349Tz75JJ988glpVt2rV69Ct9tdc8kll6BUa2eICEq1BXV1dSxcuJDnn3+egwcP5gFVQD5p1KdPH6ZOnUrv3r1JVXV1NWVlZWzcuJFMYDKZGDx4MOPHj6dr166kKhgMMnfuXL755hvSrLpfv36FJSUlNbm5uSjVWhkiglKtWTwe58UXX2TevHns2bMnD6gC8kkji8XC5MmTGThwIKnasWMHs2bNYvXq1WSi7OxsHA4Hw4YNo127dqSirq6OhQsX8vzzz3Pw4EHSyWQyVd944419xo8fz49+9COUam0MEUGp1urdd9+lvLycTz/9lGYbgHzSqGPHjowaNYpRo0bRoUMHUnHgwAEqKyuprKykoaGBTGe1WnG73fTv359Ubd68mbKyMt566y3SrXPnzvm33nprjd1up127dijVWhgiglKtzZdffkl5eTlr166lWR5QTZoNHDiQoqIiTjzxRFK1atUq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R4ApDKPx48dTLBY59dRT2Rv33HMPS5cu5aWXXkIamaZNm8ZFF13EUUcdRas2b97MLbfcwt13340QgmGyHvjUYYcd1n/hhRcyY8YMJOnNpgghkKR/hJ///OfcfPPNvPTSS5OBNcAUhtHkyZPp7u7mne98J63avn07vb293HnnnezcuRNpZDjiiCP4whe+QD6fZ2+EYcgtt9zC5s2bGUZTMplM/6xZszAMgwMOOABJ2hcUIQSS9I/y6quv0tvby49//GN27tw5GVjPMOrq6uKss87is5/9LOPGjaNVzz77LJVKhQceeADpH2fs2LGcd955nH/++aiqSqueeOIJvv/97/Poo48yjNYDU48//njmz5/P0UcfjSTtS4oQAkn6R3vqqaeoVCr88Y9/pOERYArDaMKECcydO5cZM2awN+677z6WLFnChg0bkPatk046Cdu2OeKII2jV1q1b6enp4ac//SkDAwMMk/XApw4//PD+uXPn8uEPfxhJ+kdQhBBI0kjx61//mqVLl7Jx48bJwBpgCsPo/e9/PxdffDFHH300rdqxYwerV69m1apVvPbaa0hvLk3TmD9/PtOmTWNv/Od//ifVapVNmzYxTNYDn1JVtf/cc89l9uzZ7LfffkjSP4oihECSRpLXX3+dH/zgB/zoRz9ix44dk4E1wBSGSSaT4ZxzzsEwDPbff39a9cILL3DTTTdx7733Ig2/Aw88EMMwmDVrFmPGjKFV//M//8OiRYtYt24dw2gK0D99+nTmz5/P29/+diTpH00RQiBJI1GSJFQqFe6//34aJgPrGUZvfetbmTdvHieffDJ748EHH+SGG27gqaeeQhoeM2bMYO7cuUyYMIFWbd++ndtvv5077riDgYEBhsl6YOqRRx6JbduceOKJSNJIoQghkKSR7P9rD26foy4PNY5/75CQhADKg0UFWhjjOOwiOk2LisxgC32CRgtqQCqlQQqYZHlz3px/w24IIo8FoRJRrKVMLShWS6YUqziwK9ACRypPBUQghEBgr8NMX3TOdDyj7A/MDdfn8+c//5mWlhaOHDnCFSJh3/72t2lsbGTw4MFcrUKhwPr161m5ciUdHR3Y1amurqapqYl0Ok0x3nnnHRYuXMiJEydIULq8vDw/depUpk2bRllZGWbdSZCEWXfX1dXFSy+9xNq1a7lw4cIuIE2CysrKmDp1Kk89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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 37:
/*!******************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/common/appConfig.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 底部菜单栏高度
var TabbarHeight = 130;var _default =

{
  TabbarHeight: TabbarHeight };exports.default = _default;

/***/ }),

/***/ 4:
/*!*********************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/pages.json ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@alpha","_id":"@dcloudio/uni-stat@2.0.0-alpha-25120200103005","_inBundle":false,"_integrity":"sha512-nYoIrRV2e5o/vzr6foSdWi3Rl2p0GuO+LPY3JctyY6uTKgPnuH99d7aL/QQdJ1SacQjBWO+QGK1qankN7oyrWw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@alpha","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"alpha","saveSpec":null,"fetchSpec":"alpha"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-alpha-25120200103005.tgz","_shasum":"a77a63481f36474f3e86686868051219d1bb12df","_spec":"@dcloudio/uni-stat@alpha","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"6be187a3dfe15f95dd6146d9fec08e1f81100987","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-alpha-25120200103005"};

/***/ }),

/***/ 7:
/*!**************************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/pages.json?{"type":"style"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/index/index": { "navigationBarTitleText": "AD组件示例" }, "pages/ParkingOperate/ParkingOperate": {}, "pages/PersonalCenter/PersonalCenter": {}, "pages/PersonalCenter/MyMessage": {}, "pages/index/registration": { "navigationBarTitleText": "注册" }, "pages/PersonalCenter/ParkingRecord": {}, "pages/PersonalCenter/BandingCar": {}, "pages/PersonalCenter/MyWallet": {}, "pages/ParkingOperate/ReservedParking": {}, "pages/ParkingOperate/TimeExpand": {}, "pages/ParkingOperate/QuicklyRecharge": {}, "pages/ParkingOperate/MakeUpFee": {} }, "globalStyle": { "navigationStyle": "custom" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*************************************************************************!*\
  !*** E:/ParkingSystem/Small program/parking/pages.json?{"type":"stat"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__ABD8C10" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map