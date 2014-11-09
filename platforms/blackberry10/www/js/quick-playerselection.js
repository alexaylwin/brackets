$(document).ready(function(){
	$("#quick-playerselection").find(".next-button").click(function(){
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
