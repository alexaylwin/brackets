$(document).ready(function(){
	function createBracket(){
		var bracketConfig = bracketConfigs[teams.length];
		var b = new Bracket();
		b.init(bracketConfig);

		var availableTeams = teams;
		for(var i = 0; i < b.roundRobin.length; i++)
		{
			for(var j = 0; j < b.roundRobin[i].length; j++)
			{
				var ct = getRandomInt(0, availableTeams.length - 1);
				b.roundRobin[i][j] = availableTeams[ct];
				availableTeams.splice(ct, 1);
			}
		}
		
		for(var i = 0; i < b.singleElimination.length; i++)
		{
			for(var j = 0; j < b.singleElimination[i].length; j++)
			{
				if(i == 0)
				{
					var teamA = new Team(playersPerTeam, bracketConfig.singleEliminationMatches[j].teamA);
					var teamB = new Team(playersPerTeam, bracketConfig.singleEliminationMatches[j].teamB);
				} else {
					var teamA = new Team(playersPerTeam, "TBD");
					var teamB = new Team(playersPerTeam, "TBD");
				}
				b.singleElimination[i][j] = new Match(teamA, teamB);
			}
		}
	
		bracket = b;
		b.printBracket();
		populateBracketDisplay();
	}
	
	function populateBracketDisplay(){
		var seDisplay = $("#verify-bracket-se");
		var rrDisplay = $("#verify-bracket-rr");		
		
		//Populate round robin
		var alphabetList = ["A", "B", "C", "D", "E", "F", "G", "H"];
		for(var i = 0; i < bracket.roundRobin.length; i++)
		{
			rrDisplay.append('<span class="bracket-group-title">Round Robin Group ' + alphabetList[i] + '</span>');
			rrDisplay.append('<ul class="bracket-roundrobin-group"></ul>');
			var currentList = $(rrDisplay.find("ul")[i]);
			for(var j = 0; j < bracket.roundRobin[i].length; j++)
			{
				currentList.append("<li>Team " + bracket.roundRobin[i][j].name + "</li>");
			}
		}
		
		//Populate SE bracket
		for(var i = 0; i < bracket.singleElimination.length; i++)
		{
			var roundNum = i + 1;
			seDisplay.append('<span class="bracket-group-title">Single Elimination Round ' + roundNum + '</span>' );
			seDisplay.append('<ul class="bracket-singleelimiation-group"></ul>');
			var currentList = $(seDisplay.find("ul")[i]);
			for(j = 0; j < bracket.singleElimination.length; j++)
			{
				currentList.append("<li>" + bracket.singleElimination[i][j].teamA.name + " v.s. " + bracket.singleElimination[i][j].teamB.name + "</li>");
			}
		}

	}
	
	$("#verify-assign").find(".next-button").click(createBracket);
});