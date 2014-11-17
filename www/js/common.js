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
var bracket = null;

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
	this.name = name;
	
	this.addPlayer = function(newPlayer){
		if(this.members.length < this.maxPlayers)
		{
			//console.log("Player added to team [" + this.name + "]" + " player: [" + newPlayer.name + "]");
			this.members.push(newPlayer);
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

//Bracket class
function Bracket(){
	this.roundRobin;
	this.singleElimination;
	
	this.init = function(bracketConfig){
		var roundRobinSizes = bracketConfig.roundRobins;
		var singleEliminationSize = bracketConfig.singleElimination;
		
		//Set up round robin matches
		this.roundRobin = new Array();
		var emptyTeam = new Team(playersPerTeam, "-1");
		for(var i = 0; i < roundRobinSizes.length; i++)
		{
			var rr = new Array();
			for(j = 0; j < roundRobinSizes[i]; j++)
			{
				rr.push(emptyTeam);
			}
			this.roundRobin.push(rr);
		}
		
		
		//Set up single elimination matches
		this.singleElimination = new Array();
		
		//singleEliminationSize is # of teams, we want # of matches
		var se = singleEliminationSize / 2;
		//How do we calculate the team names in these matches? 
		//Link between RR and SE match games
		while(se >= 1)
		{
			var tierArray = new Array();
			for(var i = 0; i < se; i++)
			{
				tierArray.push(new Match(emptyTeam,emptyTeam));
			}
			this.singleElimination.push(tierArray);
			se = se / 2;
		}
	}
	
	this.printBracket = function(){
		console.log("Round Robin:");
		for(var i = 0; i < this.roundRobin.length; i++)
		{
			for(var j = 0; j < this.roundRobin[i].length; j++)
			{
				console.log("Team #"+this.roundRobin[i][j].name);
			}
			console.log("----");
		}
		console.log("Single Elimination:");		
		for(var i = 0; i < this.singleElimination.length; i++)
		{
			for(j = 0; j < this.singleElimination[i].length; j++)
			{
				console.log("Team "+this.singleElimination[i][j].teamA.name+" v.s. Team "+this.singleElimination[i][j].teamB.name+"");
			}
			console.log("----");
		}
	}
}

function Match(teamA, teamB){
	this.teamA = teamA;
	this.teamB = teamB;
}

//Assign players to teams
function assignPlayer()
{	
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
		teams[freeTeams[playerTeam]].addPlayer(p);
		assignedPlayers++;
		console.log("Assigned player [" + p.name + "] to team [" + freeTeams[playerTeam] + "].");
		return {player:p.name, team:teams[freeTeams[playerTeam]]};
	} else {
		console.log("All Players Assigned." );
		return false;
	}
};

function allPlayersAssigned()
{
	if(assignedPlayers < totalPlayers)
	{
		return false;
	} else {
		return true;
	}
}

var bracketConfigs = [{},{},{},{},{
	teams:4,
	roundRobins:[4],
	singleElimination:2,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"}
	]
},
{
	teams:5,
	roundRobins:[5],
	singleElimination:2,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"}
	]
},
{
	teams:6,
	roundRobins:[3,3],
	singleElimination:2,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"}
	]
},
{
	teams:7,
	roundRobins:[3,4],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"},
		{teamA:"Winner B1",
		 teamB:"Winner B2"}		 
	]
},
{
	teams:8,
	roundRobins:[4,4],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"},
		{teamA:"Winner B1",
		 teamB:"Winner B2"}		 
	]
},
{
	teams:9,
	roundRobins:[5,4],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"},
		{teamA:"Winner B1",
		 teamB:"Winner B2"}		 
	]
},
{
	teams:10,
	roundRobins:[5,5],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"},
		{teamA:"Winner B1",
		 teamB:"Winner B2"}		 
	]
},
{
	teams:11,
	roundRobins:[3,3,3,2],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"},
		{teamA:"Winner C",
		 teamB:"Winner D"}		 
	]	
	
},
{
	teams:12,
	roundRobins:[3,3,3,3],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"},
		{teamA:"Winner C",
		 teamB:"Winner D"}		 
	]	
},
{
	teams:13,
	roundRobins:[3,3,3,4],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"},
		{teamA:"Winner C",
		 teamB:"Winner D"}		 
	]	
},
{
	teams:14,
	roundRobins:[3,3,4,4],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"},
		{teamA:"Winner C",
		 teamB:"Winner D"}		 
	]	
},
{
	teams:15,
	roundRobins:[4,4,4,3],
	singleElimination:4,
	singleEliminationMatches:[
		{teamA:"Winner A",
		 teamB:"Winner B"},
		{teamA:"Winner C",
		 teamB:"Winner D"}		 
	]	
},
{
	teams:16,
	roundRobins:[4,4,4,4],
	singleElimination:8,
	singleEliminationMatches:[
		{teamA:"Winner A1",
		 teamB:"Winner A2"},
		{teamA:"Winner B1",
		 teamB:"Winner B2"},
		{teamA:"Winner C1",
		 teamB:"Winner C2"},		 		 
		{teamA:"Winner D1",
		 teamB:"Winner D2"}		 
	]	
}];

//Create bracket
/**
function makeBracket(t, g)
{
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
**/