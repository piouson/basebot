"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _awsSdk = require("aws-sdk");

var lex = new _awsSdk.LexRuntime({
  region: process.env.AWS_REGION });var _default =


function _default(logger) {
  if (!process.env.AWS_REGION || !process.env.LEX_BOT_NAME || !process.env.LEX_BOT_ALIAS) throw new Error('AWS_REGION, LEX_BOT_NAME and LEX_BOT_ALIAS must be set');
  var debug = logger('middleware:lex', 'debug');
  return {
    receive: receive,
    heard: heard };

  function receive(bot, message, next) {
    if (!message.text) {
      next();
      return;
    }

    if (message.is_echo || message.type === 'self_message') {
      next();
      return;
    }
    var params = {
      botAlias: process.env.LEX_BOT_ALIAS,
      botName: process.env.LEX_BOT_NAME,
      inputText: message.text,
      userId: message.user,
      requestAttributes: message.requestAttributes,
      sessionAttributes: message.sessionAttributes };

    if (message.text) {
      var request = lex.postText(params, function (err, data) {
        if (err) {
          next(err);
        } else {
          message.lex = {
            intent: data.intentName,
            slots: data.slots,
            session: data.sessionAttributes,
            response: data.message,
            dialogState: data.dialogState,
            slotToElicit: data.slotToElicit };

          debug('response received from Lex:', message.lex);
          if (data.intentName) {
            message.intent === data.intentName;
          }
          next();
        }
      });
    } else {
      next();
    }
  }

  function heard(bot, message, next) {
    if (message.lex && message.lex.dialogState === 'Fulfilled' && message.lex.intentName !== null) {
      return bot.reply(message, message.lex.response);
    }
    next();
  }
};exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbImxleCIsIkxleFJ1bnRpbWUiLCJyZWdpb24iLCJwcm9jZXNzIiwiZW52IiwiQVdTX1JFR0lPTiIsImxvZ2dlciIsIkxFWF9CT1RfTkFNRSIsIkxFWF9CT1RfQUxJQVMiLCJFcnJvciIsImRlYnVnIiwicmVjZWl2ZSIsImhlYXJkIiwiYm90IiwibWVzc2FnZSIsIm5leHQiLCJ0ZXh0IiwiaXNfZWNobyIsInR5cGUiLCJwYXJhbXMiLCJib3RBbGlhcyIsImJvdE5hbWUiLCJpbnB1dFRleHQiLCJ1c2VySWQiLCJ1c2VyIiwicmVxdWVzdEF0dHJpYnV0ZXMiLCJzZXNzaW9uQXR0cmlidXRlcyIsInJlcXVlc3QiLCJwb3N0VGV4dCIsImVyciIsImRhdGEiLCJpbnRlbnQiLCJpbnRlbnROYW1lIiwic2xvdHMiLCJzZXNzaW9uIiwicmVzcG9uc2UiLCJkaWFsb2dTdGF0ZSIsInNsb3RUb0VsaWNpdCIsInJlcGx5Il0sIm1hcHBpbmdzIjoidUdBQUE7O0FBRUEsSUFBTUEsR0FBRyxHQUFHLElBQUlDLGtCQUFKLENBQWU7QUFDekJDLEVBQUFBLE1BQU0sRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBREssRUFBZixDQUFaLEM7OztBQUllLGtCQUFDQyxNQUFELEVBQVk7QUFDekIsTUFBSSxDQUFDSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsVUFBYixJQUEyQixDQUFDRixPQUFPLENBQUNDLEdBQVIsQ0FBWUcsWUFBeEMsSUFBd0QsQ0FBQ0osT0FBTyxDQUFDQyxHQUFSLENBQVlJLGFBQXpFLEVBQXdGLE1BQU0sSUFBSUMsS0FBSixDQUFVLHdEQUFWLENBQU47QUFDeEYsTUFBTUMsS0FBSyxHQUFHSixNQUFNLENBQUMsZ0JBQUQsRUFBbUIsT0FBbkIsQ0FBcEI7QUFDQSxTQUFPO0FBQ0xLLElBQUFBLE9BQU8sRUFBUEEsT0FESztBQUVQQyxJQUFBQSxLQUFLLEVBQUxBLEtBRk8sRUFBUDs7QUFJQSxXQUFTRCxPQUFULENBQWtCRSxHQUFsQixFQUF1QkMsT0FBdkIsRUFBZ0NDLElBQWhDLEVBQXNDO0FBQ3BDLFFBQUksQ0FBQ0QsT0FBTyxDQUFDRSxJQUFiLEVBQW1CO0FBQ2pCRCxNQUFBQSxJQUFJO0FBQ0o7QUFDRDs7QUFFRCxRQUFJRCxPQUFPLENBQUNHLE9BQVIsSUFBbUJILE9BQU8sQ0FBQ0ksSUFBUixLQUFpQixjQUF4QyxFQUF3RDtBQUN0REgsTUFBQUEsSUFBSTtBQUNKO0FBQ0Q7QUFDRCxRQUFJSSxNQUFNLEdBQUc7QUFDWEMsTUFBQUEsUUFBUSxFQUFFakIsT0FBTyxDQUFDQyxHQUFSLENBQVlJLGFBRFg7QUFFWGEsTUFBQUEsT0FBTyxFQUFFbEIsT0FBTyxDQUFDQyxHQUFSLENBQVlHLFlBRlY7QUFHWGUsTUFBQUEsU0FBUyxFQUFFUixPQUFPLENBQUNFLElBSFI7QUFJWE8sTUFBQUEsTUFBTSxFQUFFVCxPQUFPLENBQUNVLElBSkw7QUFLWEMsTUFBQUEsaUJBQWlCLEVBQUVYLE9BQU8sQ0FBQ1csaUJBTGhCO0FBTVhDLE1BQUFBLGlCQUFpQixFQUFFWixPQUFPLENBQUNZLGlCQU5oQixFQUFiOztBQVFBLFFBQUlaLE9BQU8sQ0FBQ0UsSUFBWixFQUFrQjtBQUNoQixVQUFJVyxPQUFPLEdBQUczQixHQUFHLENBQUM0QixRQUFKLENBQWFULE1BQWIsRUFBcUIsVUFBVVUsR0FBVixFQUFlQyxJQUFmLEVBQXFCO0FBQ3RELFlBQUlELEdBQUosRUFBUztBQUNQZCxVQUFBQSxJQUFJLENBQUNjLEdBQUQsQ0FBSjtBQUNELFNBRkQsTUFFTztBQUNMZixVQUFBQSxPQUFPLENBQUNkLEdBQVIsR0FBYztBQUNaK0IsWUFBQUEsTUFBTSxFQUFFRCxJQUFJLENBQUNFLFVBREQ7QUFFWkMsWUFBQUEsS0FBSyxFQUFFSCxJQUFJLENBQUNHLEtBRkE7QUFHWkMsWUFBQUEsT0FBTyxFQUFFSixJQUFJLENBQUNKLGlCQUhGO0FBSVpTLFlBQUFBLFFBQVEsRUFBRUwsSUFBSSxDQUFDaEIsT0FKSDtBQUtac0IsWUFBQUEsV0FBVyxFQUFFTixJQUFJLENBQUNNLFdBTE47QUFNWkMsWUFBQUEsWUFBWSxFQUFFUCxJQUFJLENBQUNPLFlBTlAsRUFBZDs7QUFRQTNCLFVBQUFBLEtBQUssQ0FBQyw2QkFBRCxFQUFnQ0ksT0FBTyxDQUFDZCxHQUF4QyxDQUFMO0FBQ0EsY0FBSThCLElBQUksQ0FBQ0UsVUFBVCxFQUFxQjtBQUNuQmxCLFlBQUFBLE9BQU8sQ0FBQ2lCLE1BQVIsS0FBbUJELElBQUksQ0FBQ0UsVUFBeEI7QUFDRDtBQUNEakIsVUFBQUEsSUFBSTtBQUNMO0FBQ0YsT0FsQmEsQ0FBZDtBQW1CRCxLQXBCRCxNQW9CTztBQUNMQSxNQUFBQSxJQUFJO0FBQ0w7QUFDRjs7QUFFRCxXQUFTSCxLQUFULENBQWdCQyxHQUFoQixFQUFxQkMsT0FBckIsRUFBOEJDLElBQTlCLEVBQW9DO0FBQ2xDLFFBQUlELE9BQU8sQ0FBQ2QsR0FBUixJQUFlYyxPQUFPLENBQUNkLEdBQVIsQ0FBWW9DLFdBQVosS0FBNEIsV0FBM0MsSUFBMER0QixPQUFPLENBQUNkLEdBQVIsQ0FBWWdDLFVBQVosS0FBMkIsSUFBekYsRUFBK0Y7QUFDN0YsYUFBT25CLEdBQUcsQ0FBQ3lCLEtBQUosQ0FBVXhCLE9BQVYsRUFBbUJBLE9BQU8sQ0FBQ2QsR0FBUixDQUFZbUMsUUFBL0IsQ0FBUDtBQUNEO0FBQ0RwQixJQUFBQSxJQUFJO0FBQ0w7QUFDRixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGV4UnVudGltZSB9IGZyb20gJ2F3cy1zZGsnXG5cbmNvbnN0IGxleCA9IG5ldyBMZXhSdW50aW1lKHtcbiAgcmVnaW9uOiBwcm9jZXNzLmVudi5BV1NfUkVHSU9OXG59KVxuXG5leHBvcnQgZGVmYXVsdCAobG9nZ2VyKSA9PiB7XG4gIGlmICghcHJvY2Vzcy5lbnYuQVdTX1JFR0lPTiB8fCAhcHJvY2Vzcy5lbnYuTEVYX0JPVF9OQU1FIHx8ICFwcm9jZXNzLmVudi5MRVhfQk9UX0FMSUFTKSB0aHJvdyBuZXcgRXJyb3IoJ0FXU19SRUdJT04sIExFWF9CT1RfTkFNRSBhbmQgTEVYX0JPVF9BTElBUyBtdXN0IGJlIHNldCcpXG4gIGNvbnN0IGRlYnVnID0gbG9nZ2VyKCdtaWRkbGV3YXJlOmxleCcsICdkZWJ1ZycpXG4gIHJldHVybiB7XG4gICAgcmVjZWl2ZSxcbiAgaGVhcmR9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZSAoYm90LCBtZXNzYWdlLCBuZXh0KSB7XG4gICAgaWYgKCFtZXNzYWdlLnRleHQpIHtcbiAgICAgIG5leHQoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2UuaXNfZWNobyB8fCBtZXNzYWdlLnR5cGUgPT09ICdzZWxmX21lc3NhZ2UnKSB7XG4gICAgICBuZXh0KClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgYm90QWxpYXM6IHByb2Nlc3MuZW52LkxFWF9CT1RfQUxJQVMsXG4gICAgICBib3ROYW1lOiBwcm9jZXNzLmVudi5MRVhfQk9UX05BTUUsXG4gICAgICBpbnB1dFRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgIHVzZXJJZDogbWVzc2FnZS51c2VyLFxuICAgICAgcmVxdWVzdEF0dHJpYnV0ZXM6IG1lc3NhZ2UucmVxdWVzdEF0dHJpYnV0ZXMsXG4gICAgICBzZXNzaW9uQXR0cmlidXRlczogbWVzc2FnZS5zZXNzaW9uQXR0cmlidXRlc1xuICAgIH1cbiAgICBpZiAobWVzc2FnZS50ZXh0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IGxleC5wb3N0VGV4dChwYXJhbXMsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lc3NhZ2UubGV4ID0ge1xuICAgICAgICAgICAgaW50ZW50OiBkYXRhLmludGVudE5hbWUsXG4gICAgICAgICAgICBzbG90czogZGF0YS5zbG90cyxcbiAgICAgICAgICAgIHNlc3Npb246IGRhdGEuc2Vzc2lvbkF0dHJpYnV0ZXMsXG4gICAgICAgICAgICByZXNwb25zZTogZGF0YS5tZXNzYWdlLFxuICAgICAgICAgICAgZGlhbG9nU3RhdGU6IGRhdGEuZGlhbG9nU3RhdGUsXG4gICAgICAgICAgICBzbG90VG9FbGljaXQ6IGRhdGEuc2xvdFRvRWxpY2l0XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlYnVnKCdyZXNwb25zZSByZWNlaXZlZCBmcm9tIExleDonLCBtZXNzYWdlLmxleClcbiAgICAgICAgICBpZiAoZGF0YS5pbnRlbnROYW1lKSB7XG4gICAgICAgICAgICBtZXNzYWdlLmludGVudCA9PT0gZGF0YS5pbnRlbnROYW1lXG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0KClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoZWFyZCAoYm90LCBtZXNzYWdlLCBuZXh0KSB7XG4gICAgaWYgKG1lc3NhZ2UubGV4ICYmIG1lc3NhZ2UubGV4LmRpYWxvZ1N0YXRlID09PSAnRnVsZmlsbGVkJyAmJiBtZXNzYWdlLmxleC5pbnRlbnROYW1lICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYm90LnJlcGx5KG1lc3NhZ2UsIG1lc3NhZ2UubGV4LnJlc3BvbnNlKVxuICAgIH1cbiAgICBuZXh0KClcbiAgfVxufVxuIl19