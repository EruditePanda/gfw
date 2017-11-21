import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-me';
import numeral from 'numeral';

class Header extends PureComponent {
  componentDidMount() {
    const { setInitialData } = this.props;
    setInitialData(this.props);
  }

  countriesSelectOnChange = event => {
    const { selectCountry } = this.props;
    selectCountry(event.value);
  };

  regionsSelectOnChange = event => {
    const { selectRegion } = this.props;
    selectRegion(event.value);
  };

  render() {
    const countries = [];
    const regions = [{ value: '', label: 'Jurisdiction' }];
    let countrySelected = '';
    let regionSelected = 'Jurisdiction';
    let jurisdictionSelected = false;
    const {
      iso,
      countriesList,
      countryRegions,
      countryRegion,
      totalCoverHeader,
      totalForestHeader,
      percentageForestHeader,
      totalCoverLoss
    } = this.props;
    countriesList.forEach(item => {
      if (iso === item.iso) {
        countrySelected = item.name;
      }
      countries.push({ value: item.iso, label: item.name });
    });
    countryRegions.forEach(item => {
      if (countryRegion) {
        jurisdictionSelected = true;
        if (countryRegion === item.id.toString()) {
          regionSelected = item.name;
        }
      } else {
        jurisdictionSelected = false;
      }
      regions.push({ value: item.id, label: item.name });
    });
    return (
      <div className="c-header">
        <div className="row">
          <div className="large-6 medium-12 small-12 columns container-select">
            <div className="c-header__select">
              <svg className="icon icon-angle-arrow-down c-header__select-arrow">
                <use xlinkHref="#icon-angle-arrow-down" />
              </svg>
              <Select
                value={countrySelected}
                options={countries}
                onChange={this.countriesSelectOnChange}
              />
            </div>
            <div className="c-header__select -jurisdiction">
              <svg className="icon icon-angle-arrow-down c-header__select-arrow">
                <use xlinkHref="#icon-angle-arrow-down" />
              </svg>
              <Select
                value={regionSelected}
                options={regions}
                onChange={this.regionsSelectOnChange}
              />
            </div>
          </div>
          <div className="large-6 medium-12 small-12 columns c-header__info">
            <p>
              In 2010, this {!jurisdictionSelected ? 'country' : 'jurisdiction'}{' '}
              had{' '}
              <strong>
                {numeral(Math.round(totalForestHeader / 1000000)).format('0,0')}{' '}
                MHa
              </strong>{' '}
              tree cover, that represents{' '}
              <strong>
                {numeral(Math.round(percentageForestHeader)).format('0,0')}%
              </strong>{' '}
              of its
              <strong>
                {' '}
                {numeral(Math.round(totalCoverHeader / 1000000)).format(
                  '0,0'
                )}{' '}
                MHa.
              </strong>
            </p>
            <p>
              Excluding plantations,{' '}
              <strong>
                {numeral(Math.round(totalCoverLoss / 1000)).format('0,0')} Ha
              </strong>{' '}
              of tree cover loss occured in <strong>2015.</strong>
            </p>
          </div>
        </div>
        <div className="c-header__tabs">
          <div className="row">
            <ul>
              <li className="-selected">Summary</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  iso: PropTypes.string.isRequired,
  countryRegion: PropTypes.number.isRequired,
  countriesList: PropTypes.array.isRequired,
  countryRegions: PropTypes.array.isRequired,
  setInitialData: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired,
  totalCoverHeader: PropTypes.number.isRequired,
  totalForestHeader: PropTypes.number.isRequired,
  percentageForestHeader: PropTypes.number.isRequired,
  totalCoverLoss: PropTypes.number.isRequired
};

export default Header;