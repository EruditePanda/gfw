export const initialState = {
  isLoading: true,
  plantationData: [],
  units: [
    {
      value: 'Ha',
      label: 'Hectare - Ha'
    },
    {
      value: '%',
      label: 'Percent Area - %'
    }
  ],
  settings: {
    unit: 'Ha',
    startYear: 2011,
    endYear: 2015
  }
};

const setTotalAreaPlantationsIsLoading = (state, { payload }) => ({
  ...state,
  isLoading: payload
});

const setTotalAreaPlantationsValues = (state, { payload }) => ({
  ...state,
  isLoading: false,
  plantationData: payload
});

const setTotalAreaPlantationsSettingsUnit = (state, { payload }) => ({
  ...state,
  settings: {
    ...state.settings,
    unit: payload
  }
});

export default {
  setTotalAreaPlantationsIsLoading,
  setTotalAreaPlantationsValues,
  setTotalAreaPlantationsSettingsUnit
};