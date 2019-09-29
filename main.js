//name of the object
const name = "rooms";
//preset list of flags for said object, priority is assumed
const flags = ["priority", "capacity", "projector", "terminal", "whiteboard", "windows"];
//preset types of the flags
const types = ["int", "int", "bool", "bool", "bool", "bool"];
//firebase config and call
var config = {
	apiKey: "AIzaSyDrcLe6_5LBPf_xsfCoWOGkFQepLz004SQ",
	authDomain: "ramhacks2019-24f47.firebaseapp.com",
	databaseURL: "https://ramhacks2019-24f47.firebaseio.com",
	projectId: "ramhacks2019-24f47",
	storageBucket: "",
	messagingSenderId: "356820442691",
	appId: "1:356820442691:web:98a4bd51bcdf1b16e97ef6",
	measurementId: "G-9P34LYCGV8"
};
var app = firebase.initializeApp(config);
var fb = firebase.firestore(app);


//To create test data, would be set by another method/program.
function createRooms() {

	for(let i = 0; i < 500; i++){
		let tcapacity = minmaxRand(20,1000);
		let tterminal = (minmaxRand(0,100) >= 50) ? "true" : "false";
		let tprojector = (tterminal == "true" && minmaxRand(0,100) >= 50) ? "true" : "false";
		let twhiteboard = (minmaxRand(0,100) >= 50) ? "true" : "false";
		let twindows = (minmaxRand(0,100) >= 50) ? "true" : "false";
		let tpriority = minmaxRand(0, 11);
		let tname = ("" + minmaxRand(0, 99)).padStart(2, '0') + ("" + minmaxRand(0,999)).padStart(3, '0');


		fb.collection(name).doc(tname).set({
			flags: {
				capacity: tcapacity,
				terminal: tterminal,
				projector: tprojector,
				whiteboard: twhiteboard,
				windows: twindows,
				priority: tpriority,
			},
			dates: []
		});
	}
}

function minmaxRand(min, max){
	return Math.floor(Math.random() * (+max - +min)) + +min;
}



//Created methods.
function reserveItem(objName, start, end, date){
	new Promise((resolve, reject) => {
		fb.collection(name).doc(objName).get().then(doc => {
			if (doc.exists) {
				let Adates = doc.data().dates;
				if(Adates.length >= 1){
					for(let i = 0; i < Adates.length; i ++){
						let sStart = Adates[i].startTime;
						let sEnd = Adates[i].endTime;
						if(Number(date) == Adates[i].day){
							if(Number(start) < Number(end)){
								if(Number(start) <= Number(sStart) && Number(end) <= Number(sStart)){
									console.log("Valid");
									resolve(true);
								}
								else if(Number(start) >= Number(sEnd) && Number(end) >= Number(sEnd)){
									console.log("Valid");
									resolve(true);
								}
								else{
									console.log("Invalid");
									resolve(false);
								}
							}
							else{
								console.log("Invalid");
								resolve(false);
							}
						}
						else {
							resolve(true);
						}
					}
				}
				else{
					resolve(true);
				}
			}else {
				console.log("Invalid");
				resolve(false);
			}
		});
	}).then(isValid => {
		console.log("Is Valid: " + isValid);
		if(isValid){
			fb.collection(name).doc(objName).update({
				dates: firebase.firestore.FieldValue.arrayUnion({day: date, startTime: start, endTime: end, user: userId})
			});
		}
	});

	
}