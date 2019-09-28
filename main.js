var database = firebase.database();

function setInfo() {
	database.ref('users').set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}