/* globals describe, it */

// Steps for using a plugin:
// First, you must load in ShellJS:
var shell = require('shelljs');
// After that, you can load the plugin:
var pluginOpen = require('..');
/*
 * You can load a plugin with either of the following syntaxes:
 * `require('shelljs-plugin-open');` or
 * `var pluginOpen = require('shelljs-plugin-open');`
*/

// Now, require whichever other modules you want to require:
require('should');

// override console.error() to cover up common.error() calls
console.error = function () { };

describe('plugin-open', function () {
  it('gets added to the shelljs instance', function () {
    (typeof shell.open).should.equal('function');
  });

  it('exports the plugin implementation', function () {
    (typeof pluginOpen).should.equal('object');
    pluginOpen.should.have.property('open');
    (typeof pluginOpen.open).should.equal('function');
  });

  it('cannot open files that are missing', function () {
    var ret = shell.open('missingFile.txt');
    ret.code.should.equal(1);
    ret.stdout.should.equal('');
    ret.stderr.should.equal('open: Unable to locate file: missingFile.txt');
  });

  it('opens URLs', function () {
    var ret = shell.open('https://www.google.com');
    ret.code.should.equal(0);
    ret.stderr.should.equal('');
  });

  it('opens files asynchronously', function () {
    var ret = shell.open('test/');

    // if this gets to this point, it must have been asynchronous
    ret.code.should.equal(0);
    ret.stdout.should.equal('');
    ret.stderr.should.equal('');
  });

  it('handles glob characters', function () {
    var ret = shell.open('te?t/*st.js');
    ret.code.should.equal(0);
    ret.stdout.should.equal('');
    ret.stderr.should.equal('');
  });
});
