var firebaseConfig = {
	apiKey: "AIzaSyDrcLe6_5LBPf_xsfCoWOGkFQepLz004SQ",
	authDomain: "ramhacks2019-24f47.firebaseapp.com",
	databaseURL: "https://ramhacks2019-24f47.firebaseio.com",
	projectId: "ramhacks2019-24f47",
	storageBucket: "",
	messagingSenderId: "356820442691",
	appId: "1:356820442691:web:98a4bd51bcdf1b16e97ef6",
	measurementId: "G-9P34LYCGV8"
};
var fb = firebase.initializeApp(firebaseConfig);

function createRooms() {
	
	for(let i = 0; i < 500; i++){
		let tcapacity = minmaxRand(20,1000);
		let tterminal = (minmaxRand(0,100) >= 50) ? true : false;
		let tprojector = (tterminal && minmaxRand(0,100) >= 50) ? true : false;
		let twhiteboard = (minmaxRand(0,100) >= 50) ? true : false;
		let twindows = (minmaxRand(0,100) >= 50) ? true : false;
		let tpriority = minmaxRand(0, 11);
		
		
		fb.database().ref('rooms/1' + i + "/flags").set({
			capacity: tcapacity,
			terminal: tterminal,
			projector: tprojector,
			whiteboard: twhiteboard,
			windows: twindows,
			priority: tpriority,
		});
	}
}

function minmaxRand(min, max){
	return Math.floor(Math.random() * (+max - +min)) + +min; 
}


function addonedate(num, name, inT, out, room){
	fb.database().ref('rooms/1' + room + "/dates/" + num + "/" + name).set({
		startTime: inT,
		endTime: out,
	});
}

function displayToday(roomNum) {
	new Promise((resolve, reject) => {	
		let ref = fb.database().ref('rooms/' + roomNum + '/dates/0');
		ref.on('value', snapshot => {
			console.log(snapshot);
			console.log(snapshot.val());
			let k = Object.keys(snapshot.val());
			resolve(k);
		});
	}).then(k => {
		console.log(k);
	});
}

function incrementCapacity(){
	let promise1 = new Promise(function(resolve, reject) {
		let capacity = 0;
		let ref = fb.database().ref('rooms/10/capacity');
		ref.on('value', function(snapshot) {
			capacity = snapshot.val();
			resolve(capacity);
		});
	}).then(function(capacity){
		capacity += 1;
		fb.database().ref('rooms/10/capacity').set(capacity);
	});
}

var index;

function print1(index){
	let ref = fb.database().ref('rooms');
	ref.on('value', printOut, printErr);
	this.index = index;
}

function printOut(data){
	var rooms = data.val();
	var roomName = Object.keys(rooms);
	var k = rooms[(roomName[index].toString())].flags;
	console.log(k);
	var keys = Object.keys(k);
	var n = "";
	for(let i = 0; i < keys.length; i ++){
		var l = k[keys[i]];
		n += l + "\n";
	}
	output.innerHTML = n;

}

function printErr(data){
	console.log("ERROR BROKEN");
}

function addDate(index){
	
}