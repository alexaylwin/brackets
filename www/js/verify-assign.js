$(document).ready(function(){
	function populateTeamDisplay(){
		var display = $("#verify-assign-teamDisplay");
		for(i = 0; i < teams.length; i++){
			var li = "<li> Team #" + teams[i].name + ": ";
			for(j = 0; j < teams[i].members.length; j++){
				li = li + teams[i].members[j].name + " ";
			}
			li = li + "</li>";
			display.append(li);
		}
	}
	
	$("#picture-assign").find(".next-button").click(populateTeamDisplay);
});