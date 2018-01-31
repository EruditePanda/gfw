import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import WidgetComposedChart from 'pages/country/widget/components/widget-composed-chart';
import WidgetDynamicSentence from 'pages/country/widget/components/widget-dynamic-sentence';

import './widget-glad-alerts-styles.scss';

class WidgetTreeLoss extends PureComponent {
  render() {
    const { data, config, sentence, handleMouseMove } = this.props;

    return (
      <div className="c-widget-glad-alerts">
        {sentence && <WidgetDynamicSentence sentence={sentence} />}
        {data && (
          <WidgetComposedChart
            className="loss-chart"
            data={data}
            config={config}
            handleMouseMove={handleMouseMove}
          />
        )}
      </div>
    );
  }
}

WidgetTreeLoss.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
  sentence: PropTypes.string,
  handleMouseMove: PropTypes.func
};

export default WidgetTreeLoss;