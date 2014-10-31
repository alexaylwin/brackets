$(document).ready(function(){
	$("#quick-playerselection").find(".next-button").click(function(){
		console.log("setting values");
		playersPerTeam = $("#teamsize").val();
		totalPlayers = $("#players").val();
	});
});
