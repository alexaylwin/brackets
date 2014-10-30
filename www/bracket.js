//Main function
//Input: t - number of teams
//		 g - number of games
//Output: An array of arrays containing tuples
function makeBracket(t, g)
{
	//Pseduo Code:
	/*
		Initialize an array tg[t] with all teams to g games
		For each team i, for each game j, do:
			- If tg[i] < 4
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