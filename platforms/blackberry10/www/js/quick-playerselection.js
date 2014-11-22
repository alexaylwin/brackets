$(document).ready(function(){
	$("#quick-playerselection").find(".next-button").click(function(){
		
		window.teams = [];
		window.totalPlayers = 0;
		window.playersPerTeam = 0;
		window.assignedPlayers = 0;
		window.currentPlayer = 0;
		window.bracket = null;
				
		playersPerTeam = $("#teamsize").val();
		totalPlayers = $("#players").val();
		teams = [];
		var totalTeams = totalPlayers / playersPerTeam;
		for(i = 0; i < totalTeams; i++)
		{
			teams.push(new Team(playersPerTeam, i+1));
		}
		console.log("Created [" + totalTeams + "] empty teams.");
	});
});
