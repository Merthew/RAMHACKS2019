function verfyAccount(){
	document.getElementById("login").style.display = "none";
}

function createSearchFlags(){
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
			
			var max = document.createElement("INPUT");
			max.type = "number";
			max.placeholder = "max";
			max.id = flags[i] + "max";
			max.className = "flag_input";
			
			var label = document.createTextNode(flags[i]);
			
			node.appendChild(min);
			node.appendChild(max);
			node.appendChild(label);
			document.getElementById("searchBar").appendChild(node);
		}

	}
	
		
	var bsub = document.createElement("INPUT");
	bsub.type = "button";
	bsub.value = "Submit";
	bsub.style.border = "outset";
	bsub.style.m
	
	document.getElementById("searchBar").appendChild(bsub);
}