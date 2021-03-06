// Generated by LiveScript 1.5.0
(function(){
  var window, SOMECOLORS, settings, execLogs, printObject, printArray, printString, transformObject, transformArray, transformString, defaultConsole, print, MoonLog, this$ = this;
  window = window != null || (typeof self != 'undefined' && self !== null) || this;
  SOMECOLORS = ['#E44424', '#67BCDB', '#A2AB58', '#2B2B2B', '#DE1B1B', '#FFFFFF', '#404040', '#6DBDD6', '#B71427', '#FFE658', '#585858', '#118C4E', '#C1E1A6', '#FF9009'];
  settings = {
    backgrounds: [],
    colors: [],
    stringifyObjects: null,
    useTable: null,
    styles: {
      time: "background: black;color: white;",
      mark: "font-size:50px;color: red;",
      json: "font-size:15px;color: blue;background-color: white;",
      'default': "font-size:30px; color:red;"
    }
  };
  execLogs = function(args){
    return args.forEach(function(arg){
      if (typeof arg === 'object' && !(arg instanceof Array)) {
        return printObject(transformObject(arg));
      } else if (arg instanceof Array) {
        return printArray(transformArray(arg));
      } else if (typeof arg === 'string') {
        return printString(transformString(arg));
      } else {
        return console.info(arg);
      }
    });
  };
  printObject = function(it){
    if (settings.stringifyObjects) {
      return console.info.apply(null, it);
    } else {
      return console.table(it);
    }
  };
  printArray = function(it){
    return console.table(it);
  };
  printString = function(it){
    return console.info.apply(null, it);
  };
  transformObject = function(it){
    if (settings.stringifyObjects) {
      return transformString(JSON.stringify(it, null, 4), settings.styles.json);
    } else if (settings.useTable) {
      return [it];
    } else {
      return it;
    }
  };
  transformArray = function(it){
    var found, foundIndex, tmp;
    found = false;
    foundIndex = null;
    tmp = [];
    it.forEach(function(child, index){
      var found, foundIndex;
      if (child instanceof Array && !found) {
        found = true;
        return foundIndex = index;
      } else {
        return tmp.push(child);
      }
    });
    if (found) {
      execLogs(it.slice(foundIndex + 1));
    }
    return tmp;
  };
  transformString = function(it, style){
    style == null && (style = settings.styles['default']);
    return ["%c " + it, style];
  };
  defaultConsole = function(it){
    return console.info.apply(this$, it);
  };
  print = function(it, style, console){
    console == null && (console = console.info);
    return console(transformString(it, style));
  };
  MoonLog = (function(){
    MoonLog.displayName = 'MoonLog';
    var prototype = MoonLog.prototype, constructor = MoonLog;
    function MoonLog(arg$){
      var ref$, backgrounds, ref1$, colors, stringifyObjects, db;
      ref$ = arg$ != null
        ? arg$
        : {}, backgrounds = (ref1$ = ref$.backgrounds) != null
        ? ref1$
        : ['#fff'], colors = (ref1$ = ref$.colors) != null
        ? ref1$
        : ['#000'], stringifyObjects = ref$.stringifyObjects, db = ref$.db;
      this.db = db;
      settings.backgrounds = backgrounds;
      settings.colors = colors;
      settings.stringifyObjects = stringifyObjects;
    }
    MoonLog.prototype.run = function(it){
      if (this.db) {
        this.db.put(new Date(), it);
      }
      execLogs(it);
    };
    MoonLog.prototype.info = function(){
      var args, res$, i$, to$;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      this.run(args);
    };
    MoonLog.prototype.chart = function(arr, opts){
      var str, styles;
      opts == null && (opts = {});
      str = "";
      styles = [];
      arr.forEach(function(value, i){
        str += " %c " + value;
        return styles.push("bottom: 200px; line-height: 400px; position: absolute; border-top: " + value + "px solid " + SOMECOLORS[i] + "; margin-left:20px;");
      });
      styles.unshift(str);
      return console.info.apply(null, styles);
    };
    MoonLog.prototype.mark = function(string){};
    MoonLog.prototype.print = print;
    MoonLog.prototype.printHistory = function(){
      var this$ = this;
      if (this.db) {
        return this.db.createReadStream().on('data', function(data){
          console.log(typeof data.value);
          this$.info.apply(this$, data.value);
        }).on('error', function(err){
          console.log('Oh my!', err);
        }).on('close', function(){
          console.log('Stream closed');
        }).on('end', function(){
          console.log('Stream closed');
        });
      }
    };
    return MoonLog;
  }());
  module.exports = MoonLog;
}).call(this);
