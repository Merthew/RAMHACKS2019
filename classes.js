var soulSeas = ["chaotic", "ordered", "unstable"];
var soulStars = [3,4,8,12];

class Player {
	constructor(username, password){
		this.username = username;
		this.password = password;
		this.soulSea = soulSeas[randomMinMax(0,2)];
		this.soulStars = soulStars[randomMinMax(0,3)];
		
		this.soulForce = 0;
		this.strength = 0;
	}
	
	stringOut() {
		var temp = "Username: " + this.username + "\nPassword: " + this.password + "\n=================\nSoul Sea: " + this.soulSea + "\nStars: " + this.soulStars + "\nSoul Force: " + this.soulForce + "\nStrength: " + this.strength;
		return temp;
	}
}

function randomMinMax(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

