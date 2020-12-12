/* eslint-disable max-len */
const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');
const militaryType = require('./models/militaryType');

class Airport {
  constructor(planes) {
    this._planes = planes;
  }
  get passengerPlanes() {
    let passengerPlanes = [];
    for (let plane of this.planes) {
      if (plane instanceof PassengerPlane) {
        passengerPlanes.push(plane);
      }
    }

    return passengerPlanes;
  }

  get militaryPlanes() {
    let militaryPlanes = [];
    for (let plane of this.planes) {
      if (plane instanceof MilitaryPlane) {
        militaryPlanes.push(plane);
      }
    }

    return militaryPlanes;
  }
  get passengerPlaneWithMaxPassengersCapacity() {
    let passengerPlanes = this.passengerPlanes;
    let planeWithMaxPassangerCapacity = passengerPlanes[0];
    for (let i = 0; i < passengerPlanes.length; i++) {
      if (passengerPlanes[i].passengersCapacity > planeWithMaxPassangerCapacity.passengersCapacity) {
        planeWithMaxPassangerCapacity = passengerPlanes[i];
      }
    }

    return planeWithMaxPassangerCapacity;
  }

  get transportMilitaryPlanes() {
    let transportMilitaryPlanes = [];
    let militaryPlanes = this.militaryPlanes;
    for (let i = 0; i < militaryPlanes.length; i++) {
      if (militaryPlanes[i].militaryType === militaryType.transport) {
        transportMilitaryPlanes.push(militaryPlanes[i]);
      }
    }

    return transportMilitaryPlanes;
  }

  get bomberMilitaryPlanes() {
    let bomberMilitaryPlanes = [];
    let militaryPlanes = this.militaryPlanes;
    for (let i = 0; i < militaryPlanes.length; i++) {
      if (militaryPlanes[i].militaryType === militaryType.bomber) {
        bomberMilitaryPlanes.push(militaryPlanes[i]);
      }
    }

    return bomberMilitaryPlanes;
  }

  get experimentalPlanes() {
    let experimentalPlanes = [];
    for (let plane of this.planes) {
      if (plane instanceof ExperimentalPlane) {
        experimentalPlanes.push(plane);
      }
    }

    return experimentalPlanes;
  }

  /**
   *
   *
   * @return {String} Plane with max Flight Distance
   * @memberof Airport
   */
  sortByMaxDistance() {
    this.planes.sort((a, b) => (a.maxFlightDistance > b.maxFlightDistance) ? 1 : -1);
    return this;
  }

  /**
   *
   *
   * @return {String} Plane with Max Speed
   * @memberof Airport
   */
  sortByMaxSpeed() {
    this.planes.sort((a, b) => (a.maxSpeed > b.maxSpeed) ? 1 : -1);
    return this;
  }

  /**
   *
   *
   * @return {String} Plane with Max Load Capacity
   * @memberof Airport
   */
  sortByMaxLoadCapacity() {
    this.planes.sort((a, b) => (a.maxLoadCapacity > b.maxLoadCapacity) ? 1 : -1);
    return this;
  }

  get planes() {
    return this._planes;
  }


  /**
   *
   *
   * @static
   * @param {Array} planes
   * @return {String} JSON String with planes which are in the array
   * @memberof Airport
   */
  static print(planes) {
    return JSON.stringify(planes);
  }
}

module.exports = Airport;

