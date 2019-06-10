"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var cachedTokens = {};var _default =

function _default(logger, storage) {return (/*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bot, message, next) {var userId, pushToken;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                if (message.pushToken && message.user && message.pushToken !== cachedTokens[message.user]) {
                  debug('Saving push token for user: ', message.user);
                  userId = message.user;
                  pushToken = message.pushToken;
                  cachedTokens[userId] = pushToken;
                  controller.storage.users.save({ id: userId, pushToken: pushToken });
                }
                next();case 2:case "end":return _context.stop();}}}, _callee);}));return function (_x, _x2, _x3) {return _ref.apply(this, arguments);};}());};exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImNhY2hlZFRva2VucyIsImxvZ2dlciIsInN0b3JhZ2UiLCJib3QiLCJtZXNzYWdlIiwibmV4dCIsInB1c2hUb2tlbiIsInVzZXIiLCJkZWJ1ZyIsInVzZXJJZCIsImNvbnRyb2xsZXIiLCJ1c2VycyIsInNhdmUiLCJpZCJdLCJtYXBwaW5ncyI6Inl0QkFBQSxJQUFNQSxZQUFZLEdBQUcsRUFBckIsQzs7QUFFZSxrQkFBQ0MsTUFBRCxFQUFTQyxPQUFULHdHQUFxQixpQkFBZUMsR0FBZixFQUFvQkMsT0FBcEIsRUFBNkJDLElBQTdCO0FBQ2xDLG9CQUFJRCxPQUFPLENBQUNFLFNBQVIsSUFBcUJGLE9BQU8sQ0FBQ0csSUFBN0IsSUFBcUNILE9BQU8sQ0FBQ0UsU0FBUixLQUFzQk4sWUFBWSxDQUFDSSxPQUFPLENBQUNHLElBQVQsQ0FBM0UsRUFBMkY7QUFDekZDLGtCQUFBQSxLQUFLLENBQUMsOEJBQUQsRUFBaUNKLE9BQU8sQ0FBQ0csSUFBekMsQ0FBTDtBQUNNRSxrQkFBQUEsTUFGbUYsR0FFMUVMLE9BQU8sQ0FBQ0csSUFGa0U7QUFHbkZELGtCQUFBQSxTQUhtRixHQUd2RUYsT0FBTyxDQUFDRSxTQUgrRDtBQUl6Rk4sa0JBQUFBLFlBQVksQ0FBQ1MsTUFBRCxDQUFaLEdBQXVCSCxTQUF2QjtBQUNBSSxrQkFBQUEsVUFBVSxDQUFDUixPQUFYLENBQW1CUyxLQUFuQixDQUF5QkMsSUFBekIsQ0FBOEIsRUFBRUMsRUFBRSxFQUFFSixNQUFOLEVBQWNILFNBQVMsRUFBVEEsU0FBZCxFQUE5QjtBQUNEO0FBQ0RELGdCQUFBQSxJQUFJLEdBUjhCLHdEQUFyQiw4RSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNhY2hlZFRva2VucyA9IHt9XG5cbmV4cG9ydCBkZWZhdWx0IChsb2dnZXIsIHN0b3JhZ2UpID0+IGFzeW5jIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgbmV4dCkge1xuICBpZiAobWVzc2FnZS5wdXNoVG9rZW4gJiYgbWVzc2FnZS51c2VyICYmIG1lc3NhZ2UucHVzaFRva2VuICE9PSBjYWNoZWRUb2tlbnNbbWVzc2FnZS51c2VyXSkge1xuICAgIGRlYnVnKCdTYXZpbmcgcHVzaCB0b2tlbiBmb3IgdXNlcjogJywgbWVzc2FnZS51c2VyKVxuICAgIGNvbnN0IHVzZXJJZCA9IG1lc3NhZ2UudXNlclxuICAgIGNvbnN0IHB1c2hUb2tlbiA9IG1lc3NhZ2UucHVzaFRva2VuXG4gICAgY2FjaGVkVG9rZW5zW3VzZXJJZF0gPSBwdXNoVG9rZW5cbiAgICBjb250cm9sbGVyLnN0b3JhZ2UudXNlcnMuc2F2ZSh7IGlkOiB1c2VySWQsIHB1c2hUb2tlbiB9KVxuICB9XG4gIG5leHQoKVxufVxuIl19