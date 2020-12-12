const assert = require('chai').assert;

const MilitaryPlane = require('c:/data/aircompany_js/Planes/MilitaryPlane');
const PassengerPlane = require('c:/data/aircompany_js/Planes/PassengerPlane');
const Airport = require('c:/data/aircompany_js/Airport');
const ExperimentalPlane = require('c:/data/aircompany_js/Planes/ExperimentalPlane');
const experimentalTypes = require('c:/data/aircompany_js/models/experimentalTypes');
const classificationLevel = require('c:/data/aircompany_js/models/classificationLevel');
const militaryType = require('c:/data/aircompany_js/models/militaryType');

describe('Smoke', () => {
  const planes = [
    new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
    new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
    new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
    new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
    new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
    new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
    new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
    new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
    new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.bomber),
    new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.bomber),
    new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.bomber),
    new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.fighter),
    new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.fighter),
    new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.transport),
    new ExperimentalPlane('Bell X-14', 277, 482, 500, experimentalTypes.highAltitude, classificationLevel.secret),
    new ExperimentalPlane('Ryan X-13 Vertijet', 560, 307, 500, experimentalTypes.vtol, classificationLevel.topSecret),
  ];
  let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

  it('Check at least one Military Plane with transport type exists', () => {
    let airport = new Airport(planes);
    let flag = false;
    for (let militaryPlane of airport.transportMilitaryPlanes) {
      if (militaryPlane.militaryType === militaryType.transport) {
        flag = true;
        break;
      }
    }
    assert.isTrue(flag);
  });

  it('Check passenger plane with max capacity', () => {
    let airport = new Airport(planes);
    assert.isTrue(airport.passengerPlaneWithMaxPassengersCapacity !== planeWithMaxPassengerCapacity);
  });


  it('Check sorting by max load capacity', () => {
    let airport = new Airport(planes);
    airport.sortByMaxLoadCapacity();
    let planesSortedByMaxLoadCapacity = airport.planes;
    let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
    for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
      let currentPlane = planesSortedByMaxLoadCapacity[i];
      let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
      if (currentPlane.maxLoadCapacity > nextPlane.maxLoadCapacity) {
        nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
        break;
      }
    }
    assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
  });

  it('Check at least one Military Plane with bomber type exists', () => {
    let airport = new Airport(planes);
    let flag = false;
    for (let militaryPlane of airport.bomberMilitaryPlanes) {
      if (militaryPlane.militaryType === militaryType.bomber) {
        flag = true;
      }
    }

    assert.isTrue(flag);
  });

  it('Check that experimentsl planes has classification level higher than unclassified', () => {
    let airport = new Airport(planes);
    let hasUnclassifiedPlanes = false;
    for (let experimentalPlane of airport.experimentalPlanes) {
      if (experimentalPlane.classificationLevel === classificationLevel.unclassified) {
        hasUnclassifiedPlanes = true;
      }
      assert.isFalse(hasUnclassifiedPlanes);
    }
  });
});


