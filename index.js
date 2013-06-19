/**
 * Module dependencies.
 */

var template = require('./template')
  , item = require('./item')
  , domify = require('domify')
  , classes = require('classes');


module.exports = Toolbar;

/**
 *
 */

function Toolbar (options) {

    if (!(this instanceof Toolbar)) return new Toolbar(options);

    var templateEl = domify(template)
      , contentEl = templateEl.querySelector('#content')
      , itemEl
      , txtEl
      , iconEl
      , items;

    this.el = templateEl;

    options = options || {};
    items = options.items || [];

    items.forEach(function (it) {
        itemEl = domify(item);
        txtEl = itemEl.querySelector('p');
        iconEl = itemEl.querySelector('.icon');

        if ("string" === typeof it.status) classes(itemEl).add(it.status || "");
        if ("string" === typeof it.icon) classes(iconEl).add(it.icon || "");

        txtEl.innerHTML = it.text || "";

        contentEl.appendChild(itemEl);
    });

    return this;
}