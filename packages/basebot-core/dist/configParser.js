"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getSingleModule = exports.getAllModules = exports.getAllModels = void 0;var env = process.env.NODE_ENV || 'development';

var getAllModels = function getAllModels(modules) {
  return Object.assign(modules.filter(function (module) {return module({}).models;}).map(function (module) {return module({}).models;}));
};exports.getAllModels = getAllModels;

var getAllModules = function getAllModules(module) {
  var valid = module.filter(function (pkg) {return !pkg[1].env || !Array.isArray(pkg[1].env) || pkg[1].env.includes(env);}).map(function (pkg) {return pkg[0];});
  return valid;
};exports.getAllModules = getAllModules;

var getSingleModule = function getSingleModule(module) {
  if (!module || !Array.isArray(module)) return null;
  return getvalue(module, 0);
};exports.getSingleModule = getSingleModule;

function getvalue(packages, i) {
  var pkg = packages[i];
  if (!pkg || !Array.isArray(pkg)) return null;
  var config = pkg[1] || {};
  if (
  !config.env ||
  !Array.isArray(config.env) ||
  config.env.includes(env))
  {
    return pkg[0];
  } else {
    return getvalue(modules, i + 1);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWdQYXJzZXIuanMiXSwibmFtZXMiOlsiZW52IiwicHJvY2VzcyIsIk5PREVfRU5WIiwiZ2V0QWxsTW9kZWxzIiwibW9kdWxlcyIsIk9iamVjdCIsImFzc2lnbiIsImZpbHRlciIsIm1vZHVsZSIsIm1vZGVscyIsIm1hcCIsImdldEFsbE1vZHVsZXMiLCJ2YWxpZCIsInBrZyIsIkFycmF5IiwiaXNBcnJheSIsImluY2x1ZGVzIiwiZ2V0U2luZ2xlTW9kdWxlIiwiZ2V0dmFsdWUiLCJwYWNrYWdlcyIsImkiLCJjb25maWciXSwibWFwcGluZ3MiOiIySkFBQSxJQUFNQSxHQUFHLEdBQUdDLE9BQU8sQ0FBQ0QsR0FBUixDQUFZRSxRQUFaLElBQXdCLGFBQXBDOztBQUVPLElBQU1DLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUFDLE9BQU8sRUFBSTtBQUNyQyxTQUFPQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0YsT0FBTyxDQUFDRyxNQUFSLENBQWUsVUFBQUMsTUFBTSxVQUFJQSxNQUFNLENBQUMsRUFBRCxDQUFOLENBQVdDLE1BQWYsRUFBckIsRUFBNENDLEdBQTVDLENBQWdELFVBQUFGLE1BQU0sVUFBSUEsTUFBTSxDQUFDLEVBQUQsQ0FBTixDQUFXQyxNQUFmLEVBQXRELENBQWQsQ0FBUDtBQUNELENBRk0sQzs7QUFJQSxJQUFNRSxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUFILE1BQU0sRUFBSTtBQUNyQyxNQUFNSSxLQUFLLEdBQUdKLE1BQU0sQ0FBQ0QsTUFBUCxDQUFjLFVBQUFNLEdBQUcsVUFBSSxDQUFDQSxHQUFHLENBQUMsQ0FBRCxDQUFILENBQU9iLEdBQVIsSUFBZSxDQUFDYyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPYixHQUFyQixDQUFoQixJQUE2Q2EsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPYixHQUFQLENBQVdnQixRQUFYLENBQW9CaEIsR0FBcEIsQ0FBakQsRUFBakIsRUFBNEZVLEdBQTVGLENBQWdHLFVBQUFHLEdBQUcsVUFBSUEsR0FBRyxDQUFDLENBQUQsQ0FBUCxFQUFuRyxDQUFkO0FBQ0EsU0FBT0QsS0FBUDtBQUNELENBSE0sQzs7QUFLQSxJQUFNSyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFULE1BQU0sRUFBSTtBQUN2QyxNQUFJLENBQUNBLE1BQUQsSUFBVyxDQUFDTSxLQUFLLENBQUNDLE9BQU4sQ0FBY1AsTUFBZCxDQUFoQixFQUF1QyxPQUFPLElBQVA7QUFDdkMsU0FBT1UsUUFBUSxDQUFDVixNQUFELEVBQVMsQ0FBVCxDQUFmO0FBQ0QsQ0FITSxDOztBQUtQLFNBQVNVLFFBQVQsQ0FBbUJDLFFBQW5CLEVBQTZCQyxDQUE3QixFQUFnQztBQUM5QixNQUFNUCxHQUFHLEdBQUdNLFFBQVEsQ0FBQ0MsQ0FBRCxDQUFwQjtBQUNBLE1BQUksQ0FBQ1AsR0FBRCxJQUFRLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixHQUFkLENBQWIsRUFBaUMsT0FBTyxJQUFQO0FBQ2pDLE1BQU1RLE1BQU0sR0FBR1IsR0FBRyxDQUFDLENBQUQsQ0FBSCxJQUFVLEVBQXpCO0FBQ0E7QUFDRSxHQUFDUSxNQUFNLENBQUNyQixHQUFSO0FBQ0EsR0FBQ2MsS0FBSyxDQUFDQyxPQUFOLENBQWNNLE1BQU0sQ0FBQ3JCLEdBQXJCLENBREQ7QUFFQXFCLEVBQUFBLE1BQU0sQ0FBQ3JCLEdBQVAsQ0FBV2dCLFFBQVgsQ0FBb0JoQixHQUFwQixDQUhGO0FBSUU7QUFDQSxXQUFPYSxHQUFHLENBQUMsQ0FBRCxDQUFWO0FBQ0QsR0FORCxNQU1PO0FBQ0wsV0FBT0ssUUFBUSxDQUFDZCxPQUFELEVBQVVnQixDQUFDLEdBQUcsQ0FBZCxDQUFmO0FBQ0Q7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCdcblxuZXhwb3J0IGNvbnN0IGdldEFsbE1vZGVscyA9IG1vZHVsZXMgPT4ge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihtb2R1bGVzLmZpbHRlcihtb2R1bGUgPT4gbW9kdWxlKHt9KS5tb2RlbHMpLm1hcChtb2R1bGUgPT4gbW9kdWxlKHt9KS5tb2RlbHMpKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsTW9kdWxlcyA9IG1vZHVsZSA9PiB7XG4gIGNvbnN0IHZhbGlkID0gbW9kdWxlLmZpbHRlcihwa2cgPT4gIXBrZ1sxXS5lbnYgfHwgIUFycmF5LmlzQXJyYXkocGtnWzFdLmVudikgfHwgcGtnWzFdLmVudi5pbmNsdWRlcyhlbnYpKS5tYXAocGtnID0+IHBrZ1swXSlcbiAgcmV0dXJuIHZhbGlkXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVNb2R1bGUgPSBtb2R1bGUgPT4ge1xuICBpZiAoIW1vZHVsZSB8fCAhQXJyYXkuaXNBcnJheShtb2R1bGUpKSByZXR1cm4gbnVsbFxuICByZXR1cm4gZ2V0dmFsdWUobW9kdWxlLCAwKVxufVxuXG5mdW5jdGlvbiBnZXR2YWx1ZSAocGFja2FnZXMsIGkpIHtcbiAgY29uc3QgcGtnID0gcGFja2FnZXNbaV1cbiAgaWYgKCFwa2cgfHwgIUFycmF5LmlzQXJyYXkocGtnKSkgcmV0dXJuIG51bGxcbiAgY29uc3QgY29uZmlnID0gcGtnWzFdIHx8IHt9XG4gIGlmIChcbiAgICAhY29uZmlnLmVudiB8fFxuICAgICFBcnJheS5pc0FycmF5KGNvbmZpZy5lbnYpIHx8XG4gICAgY29uZmlnLmVudi5pbmNsdWRlcyhlbnYpXG4gICkge1xuICAgIHJldHVybiBwa2dbMF1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZ2V0dmFsdWUobW9kdWxlcywgaSArIDEpXG4gIH1cbn1cbiJdfQ==