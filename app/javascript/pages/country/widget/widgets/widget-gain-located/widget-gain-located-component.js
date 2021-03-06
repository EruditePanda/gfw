import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import WidgetPieChart from 'pages/country/widget/components/widget-pie-chart';
import WidgetNumberedList from 'pages/country/widget/components/widget-numbered-list';
import WidgetDynamicSentence from 'pages/country/widget/components/widget-dynamic-sentence';

import './widget-gain-located-styles.scss';

class WidgetGainLocated extends PureComponent {
  render() {
    const {
      data,
      chartData,
      settings,
      handlePageChange,
      embed,
      sentence
    } = this.props;

    return (
      <div className="c-widget-gain-located">
        <WidgetDynamicSentence sentence={sentence} />
        {data &&
          chartData &&
          data.length > 0 && (
            <div className="locations-container">
              <WidgetPieChart
                className="locations-pie-chart"
                data={chartData}
                dataKey="percentage"
              />
              <WidgetNumberedList
                className="locations-list"
                data={data}
                settings={settings}
                handlePageChange={handlePageChange}
                linksDisabled={embed}
              />
            </div>
          )}
      </div>
    );
  }
}

WidgetGainLocated.propTypes = {
  data: PropTypes.array,
  chartData: PropTypes.array,
  settings: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  embed: PropTypes.bool,
  sentence: PropTypes.string
};

export default WidgetGainLocated;
