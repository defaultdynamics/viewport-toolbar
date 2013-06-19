/**
 * Module dependencies.
 */

var template = require('./template')
  , item = require('./item')
  , domify = require('domify')
  , classes = require('classes')
  , bind = require('bind')
  , uuid = require('uuid')
  , _items = {};


module.exports = Toolbar;

/**
 * Constructor
 */

function Toolbar (options) {

    if (!(this instanceof Toolbar)) return new Toolbar(options);

    var self = this
      , templateEl = domify(template)
      , contentEl = templateEl.querySelector('#content')
      , items
      , idx = 0;

    this.el = templateEl;
    
    options = options || {};
    items = options.items || [];

    items.forEach(function (it) {
      var id = uuid()
        , itemEl = domify(item)
        , iconEl = itemEl.querySelector('.icon')
        , txtEl = itemEl.querySelector('p');

      if ("string" !== typeof it.icon) throw new Error("Toolbar item needs an icon name");

      itemEl.id = id;

      if (it.status) {
        classes(itemEl).add(it.status || "");  
      }
      
      classes(iconEl).add(it.icon || "");

      txtEl.innerHTML = it.text || "";

      _items[id] = {
        idx: idx,
        handler: it.handler,
        el: itemEl
      };

      self.bindItem(itemEl);

      contentEl.appendChild(itemEl);

      idx++;
    });

    return this;
}

/**
 * bind event
 */

Toolbar.prototype.bindItem = function (el) {
  el.addEventListener('click', bind(this, 'onItemTap', el));
},

/**
 * onItemTap event listener.
 */

Toolbar.prototype.onItemTap = function (el) {
  var handler = _items[el.id].handler
    , activeEl = this.el.querySelector('.active')
    , direction = (_items[activeEl.id].idx > _items[el.id].idx) ? 'left' : 'right';

  classes(activeEl).remove('active');
  classes(el).add('active');

  if ("function" === typeof handler) {
    handler(el, direction);
  }
};

/**
 * Destroy current toolbar
 */

Toolbar.prototype.destroy = function () {

};