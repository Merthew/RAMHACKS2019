var userPrio;
var userId;

function verfyAccount(){
	var email = document.getElementById("Iusername").value;
	var pass = document.getElementById("Ipassword").value;
	
	firebase.auth().signInWithEmailAndPassword(email, pass).then(function(res){
		document.getElementById("login").style.display = "none";
		fb.collection("users").doc(firebase.auth().currentUser.uid).get().then(doc =>{
			userPrio = doc.data().priority;
			userId = firebase.auth().currentUser.uid;
		});
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		
		console.log(errorCode);
		console.log(errorMessage);
	});
	
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
	  .then(function() {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	  })
	  .catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
	  });
	
	
	
}

function createSearchFlags(){
	
	var d = new Date();
	var day = d.getDate();
	var month = (d.getMonth() + 1);
	var year = d.getFullYear();
	
	if(month <= 9){
		month = "0" + month;
	}
	
	var min = year + "-" + month + "-" + day;
	var max = (year + 1) + "-" + month + "-" + day;
	
	document.getElementById("Idate").min = min;
	document.getElementById("Idate").max = max;
	
	for(let i = 0; i < flags.length; i++){
		if(flags[i] == "priority"){
			
		}
		else if(types[i] == "bool"){
			var node = document.createElement("LI");
			node.id="L" + i;
			var dno = document.createElement("DIV");
			dno.className = "radio_no_D";
			var no = document.createElement("INPUT");
			no.type = "radio";
			no.name = flags[i];
			no.id = flags[i] + "no";
			no.className = "radio_no";
			dno.appendChild(no);
			
			var dnu = document.createElement("DIV");
			dnu.className = "radio_nu_D";
			var nu = document.createElement("INPUT");
			nu.type = "radio";
			nu.name = flags[i];
			nu.id = flags[i] + "nu";
			nu.checked = "checked";
			nu.className = "radio_no";
			dnu.appendChild(nu);
			
			var dyes = document.createElement("DIV");
			dyes.className = "radio_yes_D";
			var yes = document.createElement("INPUT");
			yes.type = "radio";
			yes.name = flags[i];
			yes.id = flags[i] + "yes";
			yes.className = "radio_yes";
			dyes.appendChild(yes)
			
			var label = document.createTextNode(flags[i]);
			node.appendChild(dno);
			node.appendChild(dnu);
			node.appendChild(dyes);
			node.appendChild(label);
			document.getElementById("searchBar").appendChild(node);
		}
		else if(types[i] == "int"){
			var node = document.createElement("LI");
			node.id = "L" + i;
			var min = document.createElement("INPUT");
			min.type = "number";
			min.placeholder = "min";
			min.id = flags[i] + "min";
			min.className = "flag_input";
			
			var label = document.createTextNode(flags[i]);
			
			node.appendChild(min);
			node.appendChild(label);
			document.getElementById("searchBar").appendChild(node);
		}

	}
	
		
	var bsub = document.createElement("INPUT");
	bsub.type = "button";
	bsub.value = "Submit";
	bsub.style.border = "outset";
	bsub.style.m
	bsub.onclick = function() {drawAvalibilities();};
	
	document.getElementById("searchBar").appendChild(bsub);
}

var queryList = [];

function drawAvalibilities(){
	new Promise((resolve, reject) => {
		console.log(">>Submitted.");
		var param = [];
		for(let i = 0; i < flags.length; i ++){
			if(flags[i] == "priority"){
				param.push(null);
			}
			else if(types[i] == "bool"){
				if(document.getElementById(flags[i]+"no").checked){
					param.push("false");
				}
				else if(document.getElementById(flags[i]+"nu").checked){
					param.push(null);
				}else{
					param.push("true");
				}
			}
			else if(types[i] == "int"){
				let min = document.getElementById("" + flags[i] + "min").value;
				param.push(min);
			}
		}


		
		var objRef = fb.collection(name);
		for(let i = 1; i < flags.length; i++){
			if(param[i] != null){
				if(typeof param[i] == 'number'){
					console.log("current element is a number");
					let key = "flags." + flags[i];
					var query = objRef.where(key, ">=", param[i]);
					query.get().then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							console.log(doc.id, " => ", doc.data());
							queryList.push([i, doc.id]);
						});
					}).catch(function(error) {
						console.log("Error getting documents: ", error);
					});
				}
				else {
					console.log("current element is not a number");
					let key = "flags." + flags[i];
					var query = objRef.where(key, "==", param[i]);
					
					query.get().then(querySnapshot => {
						querySnapshot.forEach( doc => {
							console.log(doc.id, " => ", doc.data());
							queryList.push([i, doc.id]);
						});
					}).catch(function(error) {
						console.log("Error getting documents: ", error);
					});
				}
			}
			else {
				console.log("Everything null?");
			}
		}
		
		
		var iDate = document.getElementById("Idate").value;
		resolve(iDate);
	}).then(is => {
		console.log(queryList);
		
		for(let i = 0; i < queryList.length; i ++){
			//drawEntry(
		}
	});
	
}

function countList(num){
	var count = 0;
	for(var i = 0; i < queryList.length; ++i){
		if(queryList[i] == num)
			count++;
	}
	return count;
}

function drawEntry(objName, iDate){
	var lables = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "16:30", "17:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
	var node = document.createElement("LI");
	node.id = "l" + objName;
	var textN = document.createElement("DIV");
	textN.className = "v_label";
	textN.innerHTML = objName;
	node.appendChild(textN);
	for(let i = 0; i < 24; i ++){
		var nDiv = document.createElement("DIV");
		nDiv.className = "v_div";
		nDiv.id = objName + "_" + i
		nDiv.title = lables[i];
		node.appendChild(nDiv);
	}
	document.getElementById("area").appendChild(node);
	
	
	fb.collection(name).doc(objName).get().then(doc => {
		var date = doc.data().dates;
		for(let i = 0; i < date.length; i ++){
			if(date[i].day == iDate){
				console.log("date" + date[i].day);
				
			}
		}
	});
}	