//Assign players and create teams
function printPlayers()
{
	var statusBox = $("#status");
	for(j = 0; j < teams.length; j++)
	{
		console.log(console.log() + "\nTeam #" + j);
		console.log(console.log() + "\n" + teams[j].printPlayers());
	}
};

//Convience method for random int
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
