/**
 * Landsat Maptype.
 */
define([], function () {

  'use strict';

  var LandsatMaptype = function(year) {
    var config = {
      name: 'Landsat '+year,
      alt: 'Global forest height',
      maxZoom: 17,
      isPng: true,
      tileSize: new google.maps.Size(256, 256),
      getTileUrl: function(ll, z) {
        var x = Math.abs(ll.x % (1 << z)); // jshint ignore:line
        var url = window.gfw.config.GFW_API_HOST + '/gee/landsat_composites/{0}/{1}/{2}.png?year={3}'.format(z, x, ll.y, year);
        if (year[0] === 2015) {
          url = 'https://storage.googleapis.com/landsat-cache/2015/{0}/{1}/{2}.png'.format(z, x, ll.y);
        }
        if (year[0] === 2016) {
          url = 'https://storage.googleapis.com/landsat-cache/2016/{0}/{1}/{2}.png'.format(z, x, ll.y);
        }
        return url;
      },
    };

    return new google.maps.ImageMapType(config);
  };

  return LandsatMaptype;
});
