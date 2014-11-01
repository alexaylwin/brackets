$(document).ready(function(){
	$("#quick-playerselection").find(".next-button").click(function(){
		console.log("setting values");
		window.playersPerTeam = $("#teamsize").val();
		window.totalPlayers = $("#players").val();
	});
});
