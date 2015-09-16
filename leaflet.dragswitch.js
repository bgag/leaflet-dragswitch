/* global L:true */

'use strict';


/**
 * Handler to enable/disable dragging of markers for a complete layer
 */
L.DragSwitch = L.Handler.extend({
  initialize: function (layer, options) {
    this._layer = layer;
    this._options = options || {};
    this._enabled = false;
  },
  enable: function () {
    var self = this;

    self._enabled = true;

    self._layer.getLayers().forEach(function (dragLayer) {
      if (self._options.enabledIcon) {
        if (typeof self._options.enabledIcon === 'function') {
          dragLayer.setIcon(self._options.enabledIcon(dragLayer));
        } else {
          dragLayer.setIcon(self._options.enabledIcon);
        }
      }

      dragLayer.dragging.enable();
    });
  },
  disable: function () {
    var self = this;

    self._enabled = false;

    self._layer.getLayers().forEach(function (dragLayer) {
      if (self._options.disabledIcon) {
        if (typeof self._options.disabledIcon === 'function') {
          dragLayer.setIcon(self._options.disabledIcon(dragLayer));
        } else {
          dragLayer.setIcon(self._options.disabledIcon);
        }
      }

      // workaround for leaflet bug
      dragLayer.dragging.enable();
      dragLayer.dragging.disable();
    });
  },
  enabled: function () {
    return this._enabled;
  },
  update: function () {
    var self = this;

    if (self._enabled) {
      self.enable();
    } else {
      self.disable();
    }
  }
});