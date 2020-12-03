const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const militaryType = require('./models/militaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

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


    get transportMilitaryPlanes(){
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
        let experimentalPlanes  = [];
        for (let plane of this.planes) {
            if (plane instanceof ExperimentalPlane) {
                experimentalPlanes.push(plane);
            }
        }

        return experimentalPlanes;
    }



    sortByMaxDistance() {
        this.planes.sort((a, b) => (a.maxFlightDistance > b.maxFlightDistance) ? 1 : -1);
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.maxSpeed > b.maxSpeed) ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.maxLoadCapacity > b.maxLoadCapacity) ? 1 : -1);
        return this;
    }

    get planes() {
        return this._planes; 
    }


    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;
