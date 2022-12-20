"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (context, inject) => inject('mail', {
  send: async config => {
    try {
      await context.app.$axios.$post('/mail/send', config);
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
});

exports.default = _default;
module.exports = exports.default;