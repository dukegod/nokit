/* global nokit */
/* global it */
/* global describe */
var assert = require("assert");
var app = require("./app");
var console = nokit.console;

describe('console', function() {

  it('console.log', function() {
    assert.notEqual(console.log, null);
    console.log("test");
  });

  it('console.info', function() {
    assert.notEqual(console.info, null);
    console.info("test");
  });

  it('console.error', function() {
    assert.notEqual(console.error, null);
    console.error("test");
  });

  it('console.warn', function() {
    assert.notEqual(console.warn, null);
    console.warn("test");
  });

});