/**
 * The Header view.
 */
define([
  'jquery',
  'backbone',
  'underscore',
  'mps',
  'handlebars',
  'presenters/SourceWindowPresenter',
  'text!templates/sourcewindow.handlebars',
], function($,Backbone, _,mps, Handlebars, Presenter, tpl) {

  'use strict';

  var SourceWindowModel = Backbone.Model.extend({
    defaults: {
      hidden: true,
    }
  });

  var SourceWindowView = Backbone.View.extend({

    el: 'body',

    template: Handlebars.compile(tpl),

    events: {
      'click .source' : 'show',
      'click .close': 'hide'
    },

    initialize: function() {
      // Model
      this.presenter = new Presenter(this);
      this.model = new SourceWindowModel();

      // Cache
      this.$htmlbody = $('html, body');
      this.$window = $(window);
      this.$document = $(document);
      this.$sourceWindow = $('#window');
      this.$backdrop = $('#backdrop');
      this.mobile = (this.$window.width() > 850) ? false : true;

      // Init
      this.render();
      this.model.on("change:hidden", this._toggle, this);
    },

    _initBindings: function() {
      this.mobile = (this.$window.width() > 850) ? false : true;
      this.scrollTop = this.$document.scrollTop();
      if(this.mobile) {
        this.$htmlbody.addClass('active');
        this.$htmlbody.animate({ scrollTop: this.scrollTop },0);
      }
      // document keyup
      this.$document.on('keyup', _.bind(function(e) {
        if (e.keyCode === 27) {
          this.hide();
        }
      },this));
      // backdrop
      this.$backdrop.on('click', _.bind(function() {
        this.hide();
      },this));
    },

    _stopBindings: function() {
      if(this.mobile) {
        this.$htmlbody.removeClass('active');
        this.$htmlbody.animate({ scrollTop: this.scrollTop },0);
      }
      this.$document.off('keyup');
      this.$backdrop.off('click');
    },

    _toggle: function() {
      if (this.model.get('hidden') === true) {
        this._stopBindings();
        this.$sourceWindow.removeClass('active iframe');
        this.$backdrop.removeClass('active');
      } else if (this.model.get('hidden') === false) {
        this._initBindings();
        this.$sourceWindow.addClass('active');
        this.$backdrop.addClass('active');
      }
    },

    hide: function(e) {
      e && e.preventDefault();
      this.model.set('hidden', true);
      return this;
    },

    show: function(e) {
      e && e.preventDefault() && e.stopPropagation();
      this.model.set('hidden', false);
      this.$contentWrapper.animate({ scrollTop: 0 }, 0);
      var data_slug = $(e.currentTarget).data('source');
      var data_iframe = $(e.currentTarget).data('iframe');
      (data_iframe) ? this.$sourceWindow.addClass('iframe') : this.$sourceWindow.removeClass('iframe');

      this.callAPI(data_slug);
      // this.$content.html($('#' + data_slug).clone());
      ga('send', 'event', document.title.replace('| Global Forest Watch',''), 'Info', data_slug);
      return this;
    },

    callAPI: function(slug) {
      $.ajax({
        url: 'http://54.88.79.102/gfw-sync/metadata/tree_cover_loss',
        success: function(data) {
          console.log(data);
          var data = this.parse(data);
          this.$content.html(this.template(data));
        }.bind(this),

        error: function(error) {
          console.log(error);
        }
      })
    },

    parse: function(data) {
      return {
        function_: data['Function'],
        cautions: data['Cautions'],
        citation: data['Citation'],
        license: data['License'],
        tags: data['Tags'],
        overview: data['Overview'],
        title: data['Title'],
        source: data['Source'],
        frequency_of_updates: data['Frequency of Updates'],
        translated_overview: data['Translated Overview'],
        translated_title: data['Translated_Title'],
        resolution: data['Resolution'],
        geographic_coverage: data['Geographic Coverage'],
        date_of_content: data['Date of Content'],
      }
    },

    showByParam: function(data_slug,link){
      this.model.set('hidden', false);
      var $clone = $('#' + data_slug).clone();
      this.$content.html($clone);
      if (link) {
        $clone.find('.set-link').attr('href',link);
      }
      ga('send', 'event', document.title.replace('| Global Forest Watch',''), 'Info', data_slug);
      return this;
    },

    render: function() {
      this.$content = this.$sourceWindow.find('.content');
      this.$contentWrapper = this.$sourceWindow.find('.content-wrapper');
      this.$close = this.$sourceWindow.find('.close');
      return this.$sourceWindow;
    },

  });
  return SourceWindowView;
});
