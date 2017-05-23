define([
  'underscore'
], function(
  _
) {

  /**
  * List of the datasets of the platform
  */

  var datasetList = {
    'glad-alerts': {
      title: 'GLAD tree cover loss alerts',
      long_title: 'weekly GLAD tree cover loss alerts',
      sub_title: 'weekly, 30m, select countries, UMD/GLAD',
      layerSlug: ['umd_as_it_happens'],
      slug: 'glad-alerts',
      slug_source: 'umd_landsat_alerts',
      layer_id: null,
      order: 10
    },
    'terrai-alerts': {
      title: 'Terra-i tree cover loss alerts',
      long_title: 'monthly Terra-i tree cover loss alerts',
      sub_title: 'monthly, 250m, humid tropics, CIAT',
      layerSlug: ['terrailoss'],
      slug: 'terrai-alerts',
      slug_source: 'terra_i_alerts',
      layer_id: null,
      order: 20
    },
    'imazon-alerts': {
      title: 'SAD tree cover loss alerts',
      long_title: 'monthly SAD tree cover loss alerts',
      sub_title: 'monthly, 250m, Brazilian Amazon, Imazon',
      layerSlug: ['imazon'],
      slug: 'imazon-alerts',
      slug_source: 'imazon_sad',
      layer_id: null,
      order: 30
    },
    'viirs-active-fires': {
      title: 'VIIRS active fires alerts',
      long_title: 'daily VIIRS active fires alerts',
      sub_title: 'updated two times daily, 375m, global, NASA',
      layerSlug: ['viirs_fires_alerts'],
      slug: 'viirs-active-fires',
      slug_source: 'viirs_fires',
      layer_id: null,
      order: 40
    },
    'guira-loss': {
      title: 'Gran Chaco deforestation data',
      long_title: 'monthly Gran Chaco deforestation data',
      sub_title: 'monthly, 30m, Gran Chaco, Guyra',
      layerSlug: ['guyra'],
      slug: 'guira-loss',
      slug_source: 'gran_chaco_deforestation',
      layer_id: null,
      order: 50
    },
    'umd-loss-gain': {
      title: 'Tree cover loss data',
      long_title: 'annual tree cover loss data',
      sub_title: 'annual, 30m, global, Hansen/UMD/Google/USGS/NASA',
      layerSlug: ['loss','gain'],
      slug: 'umd-loss-gain',
      slug_source: 'tree_cover_loss',
      layer_id: null,
      order: 60
    },
    'prodes-loss': {
      title: 'PRODES deforestation data',
      long_title: 'annual PRODES deforestation data',
      sub_title: 'annual, 30m, Brazilian Amazon, INPE',
      layerSlug: ['prodes'],
      slug: 'prodes-loss',
      slug_source: 'prodes',
      layer_id: null,
      order: 70
    },
    'forma250GFW': {
      title: 'FORMA alerts data',
      long_title: 'FORMA alerts data',
      sub_title: 'daily, 250m, tropics, WRI/Google',
      layerSlug: ['forma'],
      slug: 'forma',
      slug_source: 'forma',
      layer_id: null,
      order: 80
    },
    'forma-alerts': {
      title: 'FORMA active clearing alerts data',
      long_title: 'FORMA active clearing alerts data',
      sub_title: 'daily, 250m, tropics, WRI/Google',
      layerSlug: ['forma-alerts'],
      slug: 'forma-alerts',
      slug_source: 'forma',
      layer_id: null,
      order: 80
    },
    'story': {
      title: 'User stories',
      long_title: '',
      sub_title: 'stories submitted by GFW users',
      layerSlug: ['story'],
      slug: 'story',
      slug_source: 'user_stories',
      layer_id: 580,
      order: 90
    }
  };

  /**
  * List of the datasets that allows subscriptions
  */

  var subscriptionsAllowed = [
    'loss',
    'imazon',
    'terrailoss',
    'prodes',
    'guyra',
    'umd_as_it_happens',
    'umd_as_it_happens_per',
    'umd_as_it_happens_cog',
    'umd_as_it_happens_idn',
    'viirs_fires_alerts',
    'forma_activity',
    'forma_month_3'
  ];

  var datasetHelper = {

    /**
     * Returns the list of key datasets
     * @returns {Object} key languages list
     */
    getList: function() {
      return datasetList;
    },

    /**
     * Returns a filtered list of key datasets
     * @param {Object} datasets slugs
     * @returns {Object} key languages list
     */
    getFilteredList: function(datasets, selected) {
      var layersSelected = selected || [];
      var filteredDatasets = [];

      // Global layers
      filteredDatasets.push(_.extend({}, datasetList['umd-loss-gain']));
      filteredDatasets.push(_.extend({}, datasetList['viirs-active-fires']));
      filteredDatasets.push(_.extend({}, datasetList['story']));

      if (datasets) {
        for (var dataset in datasetList) {
          var currentDataset = _.extend({}, datasetList[dataset]);

          if (datasets.indexOf(currentDataset.layerSlug[0]) !== -1) {
            filteredDatasets.push(currentDataset);
          }
        }
      }

      filteredDatasets = _.map(filteredDatasets, function(dataset) {
        if (layersSelected.indexOf(dataset.slug) !== -1 ||
          layersSelected.indexOf(dataset.layerSlug[0]) !== -1) {
          dataset.checked = true;
        }
        return dataset;
      });

      filteredDatasets = _.sortBy(filteredDatasets, function(data) {
        return data.order;
      })

      return filteredDatasets;
    },

    /**
     * Returns a list of the key datasets
     * with the selected option passed by param
     * @param {string} selected language
     * @returns {Array} list of languages with selection
     */
    getListSelected: function(selectedDatasets) {
      var selectedList = {};
      for (var dataset in datasetList) {
        selectedList[dataset] = _.extend({}, datasetList[dataset]);

        if (selectedDatasets && (selectedDatasets.indexOf(dataset) != -1 || 
          selectedDatasets.indexOf(selectedList[dataset].layerSlug[0]) != -1)) {
          selectedList[dataset].checked = true
        }
      }
      return selectedList;
    },

    /**
     * Returns a list of the datasets
     * that allow subscriptions
     * @returns {Array} list of the datasets
     */
    getListSubscriptionsAllowed: function() {
      return subscriptionsAllowed;
    }

  }

  return datasetHelper;

});
