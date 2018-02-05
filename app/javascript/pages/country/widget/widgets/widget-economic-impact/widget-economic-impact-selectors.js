import { createSelector } from 'reselect';
import findIndex from 'lodash/findIndex';
import { format } from 'd3-format';
import { sortByKey, getColorPalette } from 'utils/data';
import { formatCurrency } from 'utils/format';

// get list data
const getData = state => state.data;
const getSettings = state => state.settings;
const getLocationsMeta = state => state.meta || null;
const getLocationNames = state => state.locationNames;
const getColors = state => state.colors;

// get lists selected
export const getFilteredData = createSelector(
  [getData, getSettings],
  (data, settings) => {
    if (!data || !data.fao) return null;

    const { year } = settings;
    const gdps = data.fao.filter(
      item =>
        item.gdpusd2012 &&
        item.gdpusd2012 !== '' &&
        item.gdpusd2012 !== '-9999' &&
        item.year === 9999
    );

    return data.fao
      .filter(
        d =>
          d.country !== 'LBN' &&
          d.usdrev !== null &&
          d.usdexp !== null &&
          d.usdexp !== '' &&
          d.year === year
      )
      .map(item => {
        const usdexp = parseInt(item.usdexp, 10);
        const net = (item.usdrev - usdexp) * 1000;
        const countryGdp = gdps.filter(d => d.country === item.country);
        const gdp = countryGdp.length
          ? parseFloat(countryGdp[0].gdpusd2012)
          : 0;
        return {
          iso: item.country,
          rev: item.usdrev * 1000,
          exp: usdexp * 1000,
          net_usd: net,
          net_perc: gdp ? net / gdp * 100 : 0,
          gdp,
          year: item.year
        };
      });
  }
);

export const getSortedData = createSelector(
  [getFilteredData, getSettings],
  (data, settings) => {
    if (!data || !data.length) return null;

    const { unit } = settings;
    return sortByKey(data, unit, true).map((d, i) => ({
      ...d,
      rank: i + 1
    }));
  }
);

export const chartData = createSelector(
  [getFilteredData, getSettings, getLocationNames],
  (data, settings, locationNames) => {
    if (!data || !data.length) return null;

    return data.filter(item => item.iso === locationNames.current.value);
  }
);

export const rankData = createSelector(
  [getSortedData, getSettings, getLocationsMeta, getLocationNames, getColors],
  (data, settings, meta, locationNames, colors) => {
    if (!data || !data.length) return null;

    const locationIndex = findIndex(
      data,
      d => d.iso === locationNames.current.value
    );
    let trimStart = locationIndex - 2;
    let trimEnd = locationIndex + 3;
    if (locationIndex < 2) {
      trimStart = 0;
      trimEnd = 5;
    }
    if (locationIndex > data.length - 3) {
      trimStart = data.length - 5;
      trimEnd = data.length;
    }
    const dataTrimmed = data.slice(trimStart, trimEnd);
    return dataTrimmed.map(d => {
      const locationData = meta.find(l => d.iso === l.value);
      return {
        ...d,
        label: (locationData && locationData.label) || '',
        color: colors.main,
        path: `/country/${d.iso}`,
        value: settings.unit === 'net_usd' ? d.net_usd : d.net_perc
      };
    });
  }
);

export const chartConfig = createSelector([getColors], colors => {
  const colorRange = getColorPalette(colors.ramp, 2);
  return {
    yKeys: {
      bars: {
        exp: {
          fill: colorRange[0]
        },
        rev: {
          fill: colorRange[1]
        }
      }
    },
    xAxis: {
      tickFormatter: () => 'Expenditure - Revenue'
    },
    tooltip: [
      {
        key: 'exp',
        label: 'Expenditure',
        color: colorRange[0],
        unit: 'net_usd'
      },
      {
        key: 'rev',
        label: 'Revenue',
        color: colorRange[1],
        unit: 'net_usd'
      }
    ],
    unit: 'net_usd'
  };
});

export const getSentence = createSelector(
  [getFilteredData, getSettings, getLocationNames],
  (data, settings, locationNames) => {
    if (!data) return '';

    const { year } = settings;
    const currentLocation =
      locationNames && locationNames.current && locationNames.current.label;
    const selectedFAO = data.filter(
      item => item.iso === locationNames.current.value
    );
    return `According to the FAO the forestry sector contributed a net <b>${formatCurrency(
      selectedFAO[0].net_usd,
      false
    )} USD</b> to the economy in <b>${year}</b>, which is approximately <b>${format(
      '.2f'
    )(selectedFAO[0].net_perc)}%</b> of <b>${currentLocation}'s</b> GDP.`;
  }
);
