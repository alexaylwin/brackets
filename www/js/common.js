//Main function
//Input: t - number of teams
//		 g - number of games
//Output: An array of arrays containing tuples

//People - 16 - 8 teams - single elimination?

//Global Variables
var teams = [];
var totalPlayers = 0;
var playersPerTeam = 0;
var assignedPlayers = 0;
var currentPlayer = 0;

//Player class
function Player(name)
{
	this.name = name;
};

//Team class
function Team(maxPlayers, name)
{
	this.maxPlayers = maxPlayers;
	this.members = [];
	this.newPlayer = "";
	this.name = name;
	
	this.addPlayer = function(){
		if(this.members.length < this.maxPlayers)
		{
			console.log("Player added to team [" + this.name + "]" + " player: [" + this.newPlayer.name + "]");
			this.members.push(this.newPlayer);
			this.newPlayer = "";
		}
	}
	
	
	this.printPlayers = function(){
		var ret = "Players: ";
		for(i = 0; i < this.members.length; i++) {
			ret = ret+ this.members[i].name + " ";
		}
		return ret;
	}
	
	this.hasFreeSpot = function(){
		console.log("Free spot on team [" + this.name + "] - players: [" + this.members.length + "]/["+this.maxPlayers+"]");
		return this.members.length < this.maxPlayers;
	}
};


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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function assignPlayer()
{
	//var playersInput = $("#playersInput");
	//var pptInput = $("#pptInput");
	//var statusBox = $("#status");

	if(teams.length == 0)
	{
		//playersPerTeam = pptInput.val();
		//totalPlayers = playersInput.val();
		//playersInput.attr("disabled", "disabled");
		//pptInput.attr("disabled", "disabled");
		var totalTeams = totalPlayers / playersPerTeam;
		for(i = 0; i < totalTeams; i++)
		{
			teams.push(new Team(playersPerTeam, i));
		}
		console.log("Created [" + totalTeams + "] empty teams.");
	} else {

	}
	
	if(assignedPlayers < totalPlayers)
	{
		currentPlayer++;
		var freeTeams = [];
		for(i = 0; i < teams.length; i++)
		{
			if(teams[i].hasFreeSpot())
			{
				freeTeams.push(i);
			}
		}
		var playerTeam = getRandomInt(0, freeTeams.length-1);
		var p = new Player(currentPlayer)
		teams[freeTeams[playerTeam]].newPlayer = p;
		teams[freeTeams[playerTeam]].addPlayer();
		assignedPlayers++;
		console.log("Assigned player [" + p.name + "] to team [" + freeTeams[playerTeam] + "].");
		return {player:p.name, team:teams[freeTeams[playerTeam]]};
	} else {
		console.log("All Players Assigned." );
		return false;
	}
};

//Create bracket
function makeBracket(t, g)
{
	//Pseduo Code:
	/*
		Initialize an array tg[t] with all teams to g games
		For each team i, for each game j, do:
			- If tg[i] < 4al
			- Assign the team to play i+1
	
	*/
	//INITIALIZE
	var tg = new Array();
	for(var i = 0; i < t; i++)
	{
		tg[i] = g;
	}
	var output = Array();
	for(var i = 0; i < t; i++)
	{
		output[i] = new Array();
	}
	//END INITIALIZE
	
	//Main
	for(var i = 0; i < t - 1; i++)
	{
		var vs = i+1;
		for(var j = 0; j < tg[i]; j++)
		{
			if(tg[vs] > 0)
			{
				output[i][j] = vs;
				tg[vs] = tg[vs] - 1;
				vs = vs + 1;
			}
		}
	}
	//End Main
	
	for(var i = 0; i < t - 1; i++)
	{
		for(j = 0; j < g; j++)
		{
			if(output[i][j])
			{
				document.write("<span>Team " + i + " v.s. Team" + output[i][j] + "</span>");
				document.write("<br />");
			}
		}
	}	
}