let moment = require('moment')
let cardName = "admin@hackerton-network"

let composer = require('composer-client');
let BusinessNetworkConnection = composer.BusinessNetworkConnection;

let connection = new BusinessNetworkConnection();
let definition = "";
let factory = "";
main();

async function main() {
    definition = await connection.connect(cardName);
    factory = definition.getFactory();
    // 모두 제거
    var before = moment().unix()
    console.log("데이터 제거 중..");
    await removeAll('org.hackerton.Hospital');
    await removeAll('org.hackerton.Requester');
    await removeAll('org.hackerton.EmergencyCar');
    await removeAll('org.hackerton.EmergencyBed');
    var after = moment().unix()
    console.log(after - before)

    // 요청자 추가
    console.log("요청자 추가 중...");
    var before = moment().unix()
    await addRequester(10, 5);
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 요청자 목록 읽기
    var before = moment().unix()
    let RequesterList = await getAll('org.hackerton.Requester');
    for (let i = 0; i < RequesterList.length; i++) {
        console.log(`요청자 : ${RequesterList[i].RequesterID}: ${RequesterList[i].x}, ${RequesterList[i].y}`);
    }
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 병원 추가
    var before = moment().unix()
    await addHospital("A병원", "1");
    await addHospital("B병원", "2");
    await addHospital("C병원", "3");
    await addHospital("D병원", "4");
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 병원 목록 읽기
    var before = moment().unix()
    let HospitalList = await getAll('org.hackerton.Hospital');
    console.log("병원============")
    for (let i = 0; i < HospitalList.length; i++) {
        console.log(`병원 : ${HospitalList[i].HospitalID}: ${HospitalList[i].name}`);
    }
    var after = moment().unix()
    console.log(after - before)
    console.log("===============")

    // 관계 추가

    let HospitalA = factory.newRelationship('org.hackerton', 'Hospital', '1');
    let HospitalB = factory.newRelationship('org.hackerton', 'Hospital', '2');
    let HospitalC = factory.newRelationship('org.hackerton', 'Hospital', '3');
    let HospitalD = factory.newRelationship('org.hackerton', 'Hospital', '4');

    // 구급차 추가    
    await addCar(1, 10, HospitalA);

    // 구급차 읽기
    console.log("구급차");
    // 응급실 추가
    let bedA = await addBed(2, 15, HospitalA);
    let bedB = await addBed(10, 15, HospitalB);
    let bedC = await addBed(2, 2, HospitalC);
    let bedD = await addBed(10, 2, HospitalD);

    // 응급실 읽기
    let EmergencyBedList = await getAll('org.hackerton.EmergencyBed');
    console.log("응급실 좌석=========")
    for (let i = 0; i < EmergencyBedList.length; i++) {
        console.log(`좌석: ${EmergencyBedList[i].BedID}: ${EmergencyBedList[i].x}, ${EmergencyBedList[i].y}, ${EmergencyBedList[i].owner}`);
    }
    // 의사 추가

    // 스케줄 추가

    // 쿼리
    console.log("===============")
    let find_bed_result = await query_FindEmergencyBed(10,5);
    console.log(`결과 2`)
    console.log(`${find_bed_result}`)
    bedA.isOccupied = true;
    bedB.isOccupied = true;
    await updateBed(bedA);
    await updateBed(bedB);
    console.log("===============")
    let find_bed_result_after = await query_FindEmergencyBed(10,5);
    console.log(`결과 2`)
    console.log(`${find_bed_result_after}`)
    console.log("===============")
}

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
async function addHospital(name, id){
    let registry = await connection.getParticipantRegistry('org.hackerton.Hospital');
    let currentTime = moment().unix();

    hospital = factory.newResource('org.hackerton','Hospital', id);
    hospital.name = name;
    await registry.add(hospital);
    return hospital
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
    return newData;
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
async function query_FindEmergencyBed(x,y){
    let beds = await connection.query('FindEmergencyBed');
}

async function updateBed(bed){
    let registry = await connection.getParticipantRegistry('org.hackerton.EmergencyBed');
    await registry.update(bed);
}