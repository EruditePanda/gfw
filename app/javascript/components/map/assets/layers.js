import ForestCover from './layers/forestCover';
import ForestCover2010 from './layers/forestCover2010';
import ForestGain from './layers/forestGain';
import IntactForest from './layers/intact-forest';
import Loss from './layers/loss';
import plantationsByType from './layers/plantationsByType';
import Glad from './layers/glad';
import PlantationsBySpecies from './layers/plantations-by-species';
import Viirs from './layers/viirs';

const layersMap = {
  forest2000: ForestCover,
  forest2010: ForestCover2010,
  forestGain: ForestGain,
  ifl_2013_deg: IntactForest,
  loss: Loss,
  plantations_by_type: plantationsByType,
  plantations_by_species: PlantationsBySpecies,
  umd_as_it_happens: Glad,
  viirs_fires_alerts: Viirs
};

export default layersMap;
