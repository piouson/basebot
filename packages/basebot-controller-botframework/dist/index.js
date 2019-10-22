"use strict";var Botkit = require('botkit/lib/CoreBot');
var builder = require('botbuilder');

function BotFrameworkBot(configuration) {
  // Create a core botkit bot
  var bf_botkit = Botkit(configuration || {});

  /*
                                                  * customize the bot definition, which will be used when new connections
                                                  * spawn!
                                                  */
  bf_botkit.defineBot(function (botkit, config) {
    var bot = {
      botkit: botkit,
      config: config || {},
      utterances: botkit.utterances };


    bot.send = function (message, cb) {
      function done(err) {
        if (cb) {
          cb(err);
        }
      }

      if (!message || !message.address) {
        if (cb) {
          cb(new Error('Outgoing message requires a valid address...'));
        }
        return;
      }

      // Copy message minus user & channel fields
      var bf_message = {};
      for (var key in message) {
        switch (key) {
          case 'user':
          case 'channel':
            // ignore
            break;
          default:
            bf_message[key] = message[key];
            break;}

      }
      if (!bf_message.type) {
        bf_message.type = 'message';
      }

      // Ensure the message address has a valid conversation id.
      if (!bf_message.address.conversation) {
        bot.connector.startConversation(bf_message.address, function (err, adr) {
          if (!err) {
            // Send message through connector
            bf_message.address = adr;
            bot.connector.send([bf_message], done);
          } else {
            done(err);
          }
        });
      } else {
        // Send message through connector
        bot.connector.send([bf_message], done);
      }
    };

    bot.reply = function (src, resp, cb) {
      var msg = {};

      if (typeof resp === 'string') {
        msg.text = resp;
      } else {
        msg = resp;
      }

      msg.user = src.user;
      msg.channel = src.channel;
      msg.address = src.address;
      msg.to = src.user;

      bot.say(msg, cb);
    };

    bot.findConversation = function (message, cb) {
      botkit.debug('CUSTOM FIND CONVO', message.user, message.channel);
      for (var t = 0; t < botkit.tasks.length; t++) {
        for (var c = 0; c < botkit.tasks[t].convos.length; c++) {
          if (
          botkit.tasks[t].convos[c].isActive() &&
          botkit.tasks[t].convos[c].source_message.user == message.user &&
          botkit.tasks[t].convos[c].source_message.channel == message.channel &&
          botkit.excludedEvents.indexOf(message.type) == -1 // this type of message should not be included
          ) {
              botkit.debug('FOUND EXISTING CONVO!');
              cb(botkit.tasks[t].convos[c]);
              return;
            }
        }
      }

      cb();
    };

    // Create connector
    bot.connector = new builder.ChatConnector(config);

    return bot;
  });

  bf_botkit.middleware.normalize.use(function (bot, message, next) {
    /*
                                                                         * Break out user & channel fields from event
                                                                         * - These fields are used as keys for tracking conversations and storage.
                                                                         * - Prefixing with channelId to ensure that users & channels for different
                                                                         *   platforms are unique.
                                                                         */

    var prefix = message.address.channelId + ':';
    message.user = prefix + message.address.user.id;
    message.channel = prefix + message.address.conversation.id;

    // MS supplies a type field that is 'message' for most messages, but we want it to be our more generic message_received event
    if (message.type == 'message') {
      message.type = 'message_received';
    }

    next();
  });

  bf_botkit.middleware.format.use(function (bot, message, platform_message, next) {
    // clone the incoming message
    for (var k in message) {
      platform_message[k] = message[k];
    }

    next();
  });

  // set up a web route for receiving outgoing webhooks and/or slash commands

  bf_botkit.createWebhookEndpoints = function (webserver, bot, cb) {
    // Listen for incoming events
    bf_botkit.log(
    '** Serving webhook endpoints for the Microsoft Bot Framework at: ' +
    'http://' + bf_botkit.config.hostname + ':' +
    bf_botkit.config.port + '/botframework/receive');
    webserver.post('/botframework/receive', bot.connector.listen());

    // Receive events from chat connector
    bot.connector.onEvent(function (events, done) {
      for (var i = 0; i < events.length; i++) {
        var bf_event = events[i];

        bf_botkit.ingest(bot, bf_event, null);
      }

      if (done) {
        done(null);
      }
    });

    if (cb) {
      cb();
    }

    bf_botkit.startTicking();

    return bf_botkit;
  };

  return bf_botkit;
}

module.exports = BotFrameworkBot;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJvdGtpdCIsInJlcXVpcmUiLCJidWlsZGVyIiwiQm90RnJhbWV3b3JrQm90IiwiY29uZmlndXJhdGlvbiIsImJmX2JvdGtpdCIsImRlZmluZUJvdCIsImJvdGtpdCIsImNvbmZpZyIsImJvdCIsInV0dGVyYW5jZXMiLCJzZW5kIiwibWVzc2FnZSIsImNiIiwiZG9uZSIsImVyciIsImFkZHJlc3MiLCJFcnJvciIsImJmX21lc3NhZ2UiLCJrZXkiLCJ0eXBlIiwiY29udmVyc2F0aW9uIiwiY29ubmVjdG9yIiwic3RhcnRDb252ZXJzYXRpb24iLCJhZHIiLCJyZXBseSIsInNyYyIsInJlc3AiLCJtc2ciLCJ0ZXh0IiwidXNlciIsImNoYW5uZWwiLCJ0byIsInNheSIsImZpbmRDb252ZXJzYXRpb24iLCJkZWJ1ZyIsInQiLCJ0YXNrcyIsImxlbmd0aCIsImMiLCJjb252b3MiLCJpc0FjdGl2ZSIsInNvdXJjZV9tZXNzYWdlIiwiZXhjbHVkZWRFdmVudHMiLCJpbmRleE9mIiwiQ2hhdENvbm5lY3RvciIsIm1pZGRsZXdhcmUiLCJub3JtYWxpemUiLCJ1c2UiLCJuZXh0IiwicHJlZml4IiwiY2hhbm5lbElkIiwiaWQiLCJmb3JtYXQiLCJwbGF0Zm9ybV9tZXNzYWdlIiwiayIsImNyZWF0ZVdlYmhvb2tFbmRwb2ludHMiLCJ3ZWJzZXJ2ZXIiLCJsb2ciLCJob3N0bmFtZSIsInBvcnQiLCJwb3N0IiwibGlzdGVuIiwib25FdmVudCIsImV2ZW50cyIsImkiLCJiZl9ldmVudCIsImluZ2VzdCIsInN0YXJ0VGlja2luZyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJhQUFBLElBQUlBLE1BQU0sR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQXBCO0FBQ0EsSUFBSUMsT0FBTyxHQUFHRCxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFFQSxTQUFTRSxlQUFULENBQXlCQyxhQUF6QixFQUF3QztBQUN0QztBQUNBLE1BQUlD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RCxHQTVCRDs7QUE4QkEsU0FBT0EsU0FBUDtBQUNEOztBQUVEZ0UsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkUsZUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQm90a2l0ID0gcmVxdWlyZSgnYm90a2l0L2xpYi9Db3JlQm90JylcbnZhciBidWlsZGVyID0gcmVxdWlyZSgnYm90YnVpbGRlcicpXG5cbmZ1bmN0aW9uIEJvdEZyYW1ld29ya0JvdChjb25maWd1cmF0aW9uKSB7XG4gIC8vIENyZWF0ZSBhIGNvcmUgYm90a2l0IGJvdFxuICB2YXIgYmZfYm90a2l0ID0gQm90a2l0KGNvbmZpZ3VyYXRpb24gfHwge30pXG5cbiAgLypcbiAgICAgKiBjdXN0b21pemUgdGhlIGJvdCBkZWZpbml0aW9uLCB3aGljaCB3aWxsIGJlIHVzZWQgd2hlbiBuZXcgY29ubmVjdGlvbnNcbiAgICAgKiBzcGF3biFcbiAgICAgKi9cbiAgYmZfYm90a2l0LmRlZmluZUJvdChmdW5jdGlvbihib3RraXQsIGNvbmZpZykge1xuICAgIHZhciBib3QgPSB7XG4gICAgICBib3RraXQ6IGJvdGtpdCxcbiAgICAgIGNvbmZpZzogY29uZmlnIHx8IHt9LFxuICAgICAgdXR0ZXJhbmNlczogYm90a2l0LnV0dGVyYW5jZXNcbiAgICB9XG5cbiAgICBib3Quc2VuZCA9IGZ1bmN0aW9uKG1lc3NhZ2UsIGNiKSB7XG4gICAgICBmdW5jdGlvbiBkb25lKGVycikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYihlcnIpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLmFkZHJlc3MpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IobmV3IEVycm9yKCdPdXRnb2luZyBtZXNzYWdlIHJlcXVpcmVzIGEgdmFsaWQgYWRkcmVzcy4uLicpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBDb3B5IG1lc3NhZ2UgbWludXMgdXNlciAmIGNoYW5uZWwgZmllbGRzXG4gICAgICB2YXIgYmZfbWVzc2FnZSA9IHt9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbWVzc2FnZSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgY2FzZSAnY2hhbm5lbCc6XG4gICAgICAgICAgLy8gaWdub3JlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBiZl9tZXNzYWdlW2tleV0gPSBtZXNzYWdlW2tleV1cbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWJmX21lc3NhZ2UudHlwZSkge1xuICAgICAgICBiZl9tZXNzYWdlLnR5cGUgPSAnbWVzc2FnZSdcbiAgICAgIH1cblxuICAgICAgLy8gRW5zdXJlIHRoZSBtZXNzYWdlIGFkZHJlc3MgaGFzIGEgdmFsaWQgY29udmVyc2F0aW9uIGlkLlxuICAgICAgaWYgKCFiZl9tZXNzYWdlLmFkZHJlc3MuY29udmVyc2F0aW9uKSB7XG4gICAgICAgIGJvdC5jb25uZWN0b3Iuc3RhcnRDb252ZXJzYXRpb24oYmZfbWVzc2FnZS5hZGRyZXNzLCBmdW5jdGlvbihlcnIsIGFkcikge1xuICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAvLyBTZW5kIG1lc3NhZ2UgdGhyb3VnaCBjb25uZWN0b3JcbiAgICAgICAgICAgIGJmX21lc3NhZ2UuYWRkcmVzcyA9IGFkclxuICAgICAgICAgICAgYm90LmNvbm5lY3Rvci5zZW5kKFtiZl9tZXNzYWdlXSwgZG9uZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9uZShlcnIpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2VuZCBtZXNzYWdlIHRocm91Z2ggY29ubmVjdG9yXG4gICAgICAgIGJvdC5jb25uZWN0b3Iuc2VuZChbYmZfbWVzc2FnZV0sIGRvbmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgYm90LnJlcGx5ID0gZnVuY3Rpb24oc3JjLCByZXNwLCBjYikge1xuICAgICAgdmFyIG1zZyA9IHt9XG5cbiAgICAgIGlmICh0eXBlb2YgKHJlc3ApID09PSAnc3RyaW5nJykge1xuICAgICAgICBtc2cudGV4dCA9IHJlc3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1zZyA9IHJlc3BcbiAgICAgIH1cblxuICAgICAgbXNnLnVzZXIgPSBzcmMudXNlclxuICAgICAgbXNnLmNoYW5uZWwgPSBzcmMuY2hhbm5lbFxuICAgICAgbXNnLmFkZHJlc3MgPSBzcmMuYWRkcmVzc1xuICAgICAgbXNnLnRvID0gc3JjLnVzZXJcblxuICAgICAgYm90LnNheShtc2csIGNiKVxuICAgIH1cblxuICAgIGJvdC5maW5kQ29udmVyc2F0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgY2IpIHtcbiAgICAgIGJvdGtpdC5kZWJ1ZygnQ1VTVE9NIEZJTkQgQ09OVk8nLCBtZXNzYWdlLnVzZXIsIG1lc3NhZ2UuY2hhbm5lbClcbiAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgYm90a2l0LnRhc2tzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgYm90a2l0LnRhc2tzW3RdLmNvbnZvcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGJvdGtpdC50YXNrc1t0XS5jb252b3NbY10uaXNBY3RpdmUoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYm90a2l0LnRhc2tzW3RdLmNvbnZvc1tjXS5zb3VyY2VfbWVzc2FnZS51c2VyID09IG1lc3NhZ2UudXNlciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYm90a2l0LnRhc2tzW3RdLmNvbnZvc1tjXS5zb3VyY2VfbWVzc2FnZS5jaGFubmVsID09IG1lc3NhZ2UuY2hhbm5lbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgYm90a2l0LmV4Y2x1ZGVkRXZlbnRzLmluZGV4T2YobWVzc2FnZS50eXBlKSA9PSAtMSAvLyB0aGlzIHR5cGUgb2YgbWVzc2FnZSBzaG91bGQgbm90IGJlIGluY2x1ZGVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBib3RraXQuZGVidWcoJ0ZPVU5EIEVYSVNUSU5HIENPTlZPIScpXG4gICAgICAgICAgICBjYihib3RraXQudGFza3NbdF0uY29udm9zW2NdKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiKClcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgY29ubmVjdG9yXG4gICAgYm90LmNvbm5lY3RvciA9IG5ldyBidWlsZGVyLkNoYXRDb25uZWN0b3IoY29uZmlnKVxuXG4gICAgcmV0dXJuIGJvdFxuICB9KVxuXG4gIGJmX2JvdGtpdC5taWRkbGV3YXJlLm5vcm1hbGl6ZS51c2UoZnVuY3Rpb24oYm90LCBtZXNzYWdlLCBuZXh0KSB7XG4gICAgLypcbiAgICAgICAgICogQnJlYWsgb3V0IHVzZXIgJiBjaGFubmVsIGZpZWxkcyBmcm9tIGV2ZW50XG4gICAgICAgICAqIC0gVGhlc2UgZmllbGRzIGFyZSB1c2VkIGFzIGtleXMgZm9yIHRyYWNraW5nIGNvbnZlcnNhdGlvbnMgYW5kIHN0b3JhZ2UuXG4gICAgICAgICAqIC0gUHJlZml4aW5nIHdpdGggY2hhbm5lbElkIHRvIGVuc3VyZSB0aGF0IHVzZXJzICYgY2hhbm5lbHMgZm9yIGRpZmZlcmVudFxuICAgICAgICAgKiAgIHBsYXRmb3JtcyBhcmUgdW5pcXVlLlxuICAgICAgICAgKi9cblxuICAgIHZhciBwcmVmaXggPSBtZXNzYWdlLmFkZHJlc3MuY2hhbm5lbElkICsgJzonXG4gICAgbWVzc2FnZS51c2VyID0gcHJlZml4ICsgbWVzc2FnZS5hZGRyZXNzLnVzZXIuaWRcbiAgICBtZXNzYWdlLmNoYW5uZWwgPSBwcmVmaXggKyBtZXNzYWdlLmFkZHJlc3MuY29udmVyc2F0aW9uLmlkXG5cbiAgICAvLyBNUyBzdXBwbGllcyBhIHR5cGUgZmllbGQgdGhhdCBpcyAnbWVzc2FnZScgZm9yIG1vc3QgbWVzc2FnZXMsIGJ1dCB3ZSB3YW50IGl0IHRvIGJlIG91ciBtb3JlIGdlbmVyaWMgbWVzc2FnZV9yZWNlaXZlZCBldmVudFxuICAgIGlmIChtZXNzYWdlLnR5cGUgPT0gJ21lc3NhZ2UnKSB7XG4gICAgICBtZXNzYWdlLnR5cGUgPSAnbWVzc2FnZV9yZWNlaXZlZCdcbiAgICB9XG5cbiAgICBuZXh0KClcbiAgfSlcblxuICBiZl9ib3RraXQubWlkZGxld2FyZS5mb3JtYXQudXNlKGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgcGxhdGZvcm1fbWVzc2FnZSwgbmV4dCkge1xuICAgIC8vIGNsb25lIHRoZSBpbmNvbWluZyBtZXNzYWdlXG4gICAgZm9yICh2YXIgayBpbiBtZXNzYWdlKSB7XG4gICAgICBwbGF0Zm9ybV9tZXNzYWdlW2tdID0gbWVzc2FnZVtrXVxuICAgIH1cblxuICAgIG5leHQoKVxuICB9KVxuXG4gIC8vIHNldCB1cCBhIHdlYiByb3V0ZSBmb3IgcmVjZWl2aW5nIG91dGdvaW5nIHdlYmhvb2tzIGFuZC9vciBzbGFzaCBjb21tYW5kc1xuXG4gIGJmX2JvdGtpdC5jcmVhdGVXZWJob29rRW5kcG9pbnRzID0gZnVuY3Rpb24od2Vic2VydmVyLCBib3QsIGNiKSB7XG4gICAgLy8gTGlzdGVuIGZvciBpbmNvbWluZyBldmVudHNcbiAgICBiZl9ib3RraXQubG9nKFxuICAgICAgJyoqIFNlcnZpbmcgd2ViaG9vayBlbmRwb2ludHMgZm9yIHRoZSBNaWNyb3NvZnQgQm90IEZyYW1ld29yayBhdDogJyArXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly8nICsgYmZfYm90a2l0LmNvbmZpZy5ob3N0bmFtZSArICc6JyArXG4gICAgICAgICAgICAgICAgYmZfYm90a2l0LmNvbmZpZy5wb3J0ICsgJy9ib3RmcmFtZXdvcmsvcmVjZWl2ZScpXG4gICAgd2Vic2VydmVyLnBvc3QoJy9ib3RmcmFtZXdvcmsvcmVjZWl2ZScsIGJvdC5jb25uZWN0b3IubGlzdGVuKCkpXG5cbiAgICAvLyBSZWNlaXZlIGV2ZW50cyBmcm9tIGNoYXQgY29ubmVjdG9yXG4gICAgYm90LmNvbm5lY3Rvci5vbkV2ZW50KGZ1bmN0aW9uKGV2ZW50cywgZG9uZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGJmX2V2ZW50ID0gZXZlbnRzW2ldXG5cbiAgICAgICAgYmZfYm90a2l0LmluZ2VzdChib3QsIGJmX2V2ZW50LCBudWxsKVxuICAgICAgfVxuXG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBkb25lKG51bGwpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmIChjYikge1xuICAgICAgY2IoKVxuICAgIH1cblxuICAgIGJmX2JvdGtpdC5zdGFydFRpY2tpbmcoKVxuXG4gICAgcmV0dXJuIGJmX2JvdGtpdFxuICB9XG5cbiAgcmV0dXJuIGJmX2JvdGtpdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdEZyYW1ld29ya0JvdFxuIl19