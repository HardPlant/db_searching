let moment = require('moment')
let cardName = "admin@hackerton-network"

let composer = require('composer-client');
let BusinessNetworkConnection = composer.BusinessNetworkConnection;

let connection = new BusinessNetworkConnection();
let definition = "";
let factory = definition.getFactory();
main();

async function main() {
    definition = await connection.connect(cardName);

    var before = moment().unix()
    await removeAll('org.hackerton.Hospital');
    var after = moment().unix()
    console.log(after - before)

    var before = moment().unix()
    await addHospital("A병원");
    await addHospital("B병원");
    await addHospital("C병원");
    await addHospital("D병원");
    await addHospital("E병원");
    var after = moment().unix()
    console.log(after - before)

    var before = moment().unix()
    let HospitalList = await getAll('org.hackerton.Hospital');
    for (let i = 0; i < HospitalList.length; i++) {
        console.log(`${HospitalList[i].HospitalID}: ${HospitalList[i].name}`);
    }
    var after = moment().unix()
    console.log(after - before)
}

function login() {}

function session() {}

async function request(requester, x, y) {
    let serializer = definition.getSerializer();

    let registry = connection.getAssetRegistry('org.hackerton.Patient');
    
    let currentTime = moment().unix();

    patient = factory.newResource('org.hackerton', 'Patient', currentTime)
    patient.requester = requester
    patient.x = x
    patient.y = y

    await this.registry.addAll([request]);

    let request = serializer.fromJSON({
        "$class": 'org.hackerton.requestEmergencyCar',
        'patient': patient,
        'requester': requester,
        'x': x,
        'y': y
    })

    await connection.submitTransaction(request)
}

async function addDoctor(name, major, hospital){
    let registry = await connection.getParticipantRegistry('org.hackerton.Doctor');
    let currentTime = moment().unix();
    let newDoctor = factory.newResource('org.hackerton','Doctor', currentTime.toString());
    newDoctor.name = name;
    newDoctor.major = major;
    newDoctor.hospital = hospital;
    await registry.add(newDoctor);
}
async function addRequester(x, y){
    let registry = await connection.getParticipantRegistry('org.hackerton.Requester');
    let currentTime = moment().unix();
    let newData = factory.newResource('org.hackerton','Requester', currentTime.toString());
    newData.x = x;
    newData.y = y;
    await registry.add(newData);
}
async function addHospital(name){
    let registry = await connection.getParticipantRegistry('org.hackerton.Hospital');
    let currentTime = moment().unix();

    hospital = factory.newResource('org.hackerton','Hospital', currentTime.toString());
    hospital.name = name;
    await registry.add(hospital);
}
async function addCar(x, y, owner){
    let registry = await connection.getParticipantRegistry('org.hackerton.EmergencyCar');
    let currentTime = moment().unix();
    let newData = factory.newResource('org.hackerton','EmergencyCar', currentTime.toString());
    newData.x = x;
    newData.y = y;
    newData.isOccupied = false;
    newData.owner = owner;
    await registry.add(newData);
}
async function addBed(x, y, owner){
    let registry = await connection.getParticipantRegistry('org.hackerton.EmergencyBed');
    let currentTime = moment().unix();
    let newData = factory.newResource('org.hackerton','EmergencyBed', currentTime.toString());
    newData.x = x;
    newData.y = y;
    newData.isOccupied = false;
    newData.owner = owner;
    await registry.add(newData);

}
async function addSchedule(doctor, start, end){
    let registry = await connection.getAssetRegistry('org.hackerton.Schedule');
    let currentTime = moment().unix();
    let newData = factory.newResource('org.hackerton','Schedule', currentTime.toString());
    newData.doctor = doctor;
    newData.start = start;
    newData.end = end;
    await registry.add(newData);
}
async function addPatient(requester, x, y){
    let registry = await connection.getAssetRegistry('org.hackerton.Patient');
    let currentTime = moment().unix();
    let newData = factory.newResource('org.hackerton','Patient', currentTime.toString());
    newData.requester = requester;
    newData.x = x;
    newData.y = y;
    await registry.add(newData);
}

async function getAll(FDQN) {
    let registry = await connection.getParticipantRegistry(FDQN);
    let list = await registry.getAll();

    return list;
}
async function removeAll(FDQN) {
    let registry = await connection.getParticipantRegistry(FDQN);
    let list = await registry.getAll();
    await registry.removeAll(list)
}
