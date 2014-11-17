$(document).ready(function(){
	function addPlayer()
	{
		ret = assignPlayer();
		if(ret)
		{
			$("#quick-assign-team").html("Team " + ret.team.name);
		} else {
			$("#quick-assign-team").html("Teams Done!");
		}
	}

		$("#quick-assign-assignPlayer").click(addPlayer);

});
