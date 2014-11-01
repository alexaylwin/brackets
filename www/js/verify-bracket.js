$(document).ready(function(){
	function createBracket(){
		var seDisplay = $("#verify-bracket-se");
		var rrDisplay = $("#verify-bracket-rr");
		
		rrGroups = [];
		
		if( (teams.length % 4) == 0)
		{
			console.log("RR groups of 4");
			totalGroups = teams.length / 4;
			for(i = 0; i < totalGroups; i++)
			{
				rrGroups.push([]);
			}
			console.log("total groups:" + rrGroups.length);
			for(i = 0; i < teams.length; i++)
			{
				//WILL NOT WORK FOR 4 TOTAL TEAMS?
				var availableGroups = [];
				for(j = 0; j < rrGroups.length; j++)
				{
					if(rrGroups[j].length < 4)
					{
						console.log("group " + j + " available");
						availableGroups.push(j);
					}
				}
				
				group = getRandomInt(0, availableGroups.length-1);
				console.log("group:" + availableGroups[group]);
				rrGroups[availableGroups[group]].push(teams[i]);
				console.log("Added team " + teams[i].name + " to rr group " + group);
			}
		} 
		/**else if((teams.length % 2) == 0) {
			
			console.log("RR groups of 3");
			totalGroups = teams.length / 3;
			for(i = 0; i < teams.length; i++) {
				rrGroups.push([]);
			}
			console.log("total groups:" + rrGroups.length);
			for(i = 0; i < teams.length; i++) {
				
			}
						
		}**/
		
		var seTier1;
		
		for(i = 0; i < rrGroups.length; i++) {
			rrDisplay.append("<div style=\"margin-left:8px;\">Group " + i + "</div>");
			rrDisplay.append("<ul class=\"rr-list\">");
			for(j = 0; j < rrGroups[i].length; j++){
				rrDisplay.find("ul").append("<li>Team "+rrGroups[i][j].name+"</li>");
			}
			rrDisplay.append("</ul><br/>");
		}
		
	}
	
	$("#verify-assign").find(".next-button").click(createBracket);
});