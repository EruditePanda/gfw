define([
  'jquery',
  'backbone',
  'underscore',
  'handlebars',
  'uri',
  'text!countries/templates/widgets/modals/treeCoverLossAlertsModal.handlebars'
], function(
  $,
  Backbone,
  _,
  Handlebars,
  UriTemplate,
  tpl) {

  'use strict';

  var TreeCoverLossAlertsModal = Backbone.View.extend({
    el: 'body',

    events: {
      'click .js-open-tree-cover-loss-alerts-modal' : 'showModal',
      'click .background-modal' : 'closeModal',
      'click .js-icon-cross-close' : 'closeModal',
    },

    template: Handlebars.compile(tpl),

    initialize: function() {
      this.$el.append(this.template());
    },

    showModal: function() {
      $(this.el).addClass('-relative');
      $('.background-modal').removeClass('-hidden');
      $('.-tree-cover-loss-alerts-modal').removeClass('-hidden');
    },

    closeModal: function() {
      $('.background-modal').addClass('-hidden')
      $('.-tree-cover-loss-alerts-modal').addClass('-hidden');
      $(this.el).removeClass('-relative');
    }
  });
  return TreeCoverLossAlertsModal;

});
