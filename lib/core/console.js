const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const colors = require('./colors');
const pkg = require("../../package.json");
const env = require("./env");
require('console.table');

const self = exports;

const PREFIX_LOG = "[" + pkg.displayName + "][L]: ",
  PREFIX_INFO = "[" + pkg.displayName + "][I]: ",
  PREFIX_WARN = "[" + pkg.displayName + "][W]: ",
  PREFIX_ERROR = "[" + pkg.displayName + "][E]: ";

self._convertMsg = function (msg) {
  msg = msg || '';
  if (msg instanceof Error) {
    return msg.message + env.EOL + msg.stack;
  } else if (!utils.isString(msg)) {
    return JSON.stringify(msg);
  } else {
    return msg;
  }
};

self.log = function (msg, noPrefix) {
  msg = self._convertMsg(msg);
  console.log(noPrefix ? msg : (PREFIX_LOG + msg));
};

self.info = function (msg, noPrefix) {
  msg = self._convertMsg(msg);
  msg = colors.green(msg);
  console.info(noPrefix ? msg : (PREFIX_INFO + msg));
};

self.warn = function (msg, noPrefix) {
  msg = self._convertMsg(msg);
  msg = colors.yellow(msg);
  console.warn(noPrefix ? msg : (PREFIX_WARN + msg));
};

self.error = function (msg, noPrefix) {
  msg = self._convertMsg(msg);
  msg = colors.red(msg);
  console.error(noPrefix ? msg : (PREFIX_ERROR + msg));
};

self.table = function (data) {
  console.table(data);
};