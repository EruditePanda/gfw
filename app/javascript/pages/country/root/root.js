import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getActiveAdmin } from 'pages/country/widget/widget-selectors';
import CATEGORIES from 'pages/country/data/categories.json';
import RootComponent from './root-component';
import actions from './root-actions';
import { getWidgets } from './root-selectors';

export { initialState } from './root-reducers';
export { default as reducers } from './root-reducers';
export { default as actions } from './root-actions';

const mapStateToProps = ({ root, countryData, location }) => ({
  gfwHeaderHeight: root.gfwHeaderHeight,
  isMapFixed: root.isMapFixed,
  showMapMobile: root.showMapMobile,
  links: CATEGORIES,
  isGeostoreLoading: countryData.isGeostoreLoading,
  category: root.category,
  widgets: getWidgets({
    category: root.category,
    adminLevel: getActiveAdmin(location.payload)
  })
});

class RootContainer extends PureComponent {
  handleShowMapMobile = () => {
    this.props.setShowMapMobile(!this.props.showMapMobile);
  };

  render() {
    return createElement(RootComponent, {
      ...this.props,
      handleShowMapMobile: this.handleShowMapMobile,
      handleScrollCallback: this.handleScrollCallback
    });
  }
}

RootContainer.propTypes = {
  setShowMapMobile: PropTypes.func,
  showMapMobile: PropTypes.bool
};

export default connect(mapStateToProps, actions)(RootContainer);