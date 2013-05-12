
$(function()
{
	var gridSize = 10;
	$("#gridSize").val(gridSize);

	function createGrid(size)
	{
		var i = 0;
		var j = 0;

		var html = "";

		html += "<table class='grid'>";

		for(i=size-1;i>=0;i--)
		{
			html += "<tr>";

			for(j=0;j<size;j++)
			{
				html += "<td id='loc_"+i+"_"+j+"'><span class='subText'>" + i + "," + j +"</span></td>";
			}

			html += "</tr>";
		}

		html += "</table>";

		$("#boardGrid").html(html);
	}

	function getArrow(dir)
	{
		if(dir == "north")
		{
			return "&uarr;"
		}

		if(dir == "south")
		{
			return "&darr;"
		}

		if(dir == "west")
		{
			return "&larr;"
		}

		if(dir == "east")
		{
			return "&rarr;"
		}
	}

	function doLeft(dir)
	{
		var arrAndDirection = new Array();

		if(dir == "north")
		{
			arrAndDirection[0] = "&larr;"
			arrAndDirection[1] = "west"
		}

		if(dir == "south")
		{
			arrAndDirection[0] = "&rarr;"
			arrAndDirection[1] = "east"
		}

		if(dir == "west")
		{
			arrAndDirection[0] = "&darr;"
			arrAndDirection[1] = "south"
		}

		if(dir == "east")
		{
			arrAndDirection[0] = "&uarr;"
			arrAndDirection[1] = "north"
		}

		return arrAndDirection;
	}

	function doRight(dir)
	{
		var arrAndDirection = new Array();

		if(dir == "north")
		{
			arrAndDirection[0] = "&rarr;"
			arrAndDirection[1] = "east"
		}

		if(dir == "south")
		{
			arrAndDirection[0] = "&larr;"
			arrAndDirection[1] = "west"
		}

		if(dir == "west")
		{
			arrAndDirection[0] = "&uarr;"
			arrAndDirection[1] = "north"
		}

		if(dir == "east")
		{
			arrAndDirection[0] = "&darr;"
			arrAndDirection[1] = "south"
		}

		return arrAndDirection;
	}

	function findNextCoor(curLeftCoor, curRightCoor, curDirection)
	{
		var newCoor = new Array();

		var max = parseInt($("#gridSize").val()) - 1;

		newCoor[0] = parseInt(curLeftCoor);
		newCoor[1] = parseInt(curRightCoor);

		if( (curDirection == "north") && (curLeftCoor < max) )
		{
			newCoor[0] += 1;
		}

		if( (curDirection == "south") && (curLeftCoor > 0) )
		{
			newCoor[0] -= 1;
		}

		if( (curDirection == "west") && (curRightCoor > 0) )
		{
			newCoor[1] -= 1;
		}

		if( (curDirection == "east") && (curRightCoor < max) )
		{
			newCoor[1] += 1;
		}

		return newCoor;
	}

	function print()
	{
		var curLeftCoor = $("#avatorLeft").val();
		var curRightCoor = $("#avatorRight").val();
		var curDirection = $("#avatorDir").val();

		if( (curLeftCoor == "") || (curRightCoor == "") || (curDirection == "") )
		{
			$("#results").html('Place the Avator first.');
		}

		else
		{
			$("#results").html('Avator is at [' + curLeftCoor + ', ' + curRightCoor + '] facing ' + curDirection);
		}
	}

	createGrid(gridSize);

	$("#place").click(function()
	{
		var curLeftCoor = $("#avatorLeft").val();
		var curRightCoor = $("#avatorRight").val();
		var curDirection = $("#avatorDir").val();

		var setLeftCoor = $("#leftCoor").val();
		var setRightCoor = $("#rightCoor").val();
		var setDirection = $("#direction").val();

		var prevLocation = "loc_" + curLeftCoor + "_" + curRightCoor;

		$("#"+prevLocation+"").html("<span class='subText'>" + curLeftCoor + "," + curRightCoor +"</span>");

		$("#avatorLeft").val(setLeftCoor);
		$("#avatorRight").val(setRightCoor);
		$("#avatorDir").val(setDirection);

		var arrHtml = getArrow(setDirection);

		var location = "loc_" + setLeftCoor + "_" + setRightCoor;
		$("#"+location+"").append("<span class='arrow'>" + arrHtml + "</span>");

//		print();
	});

	$("#turnLeft").click(function()
	{
		var curLeftCoor = $("#avatorLeft").val();
		var curRightCoor = $("#avatorRight").val();
		var curDirection = $("#avatorDir").val();

		var location = "loc_" + curLeftCoor + "_" + curRightCoor;
		var arrow = doLeft(curDirection);

		$("#avatorDir").val(arrow[1]);

		$("#"+location+"").html("<span class='subText'>" + curLeftCoor + "," + curRightCoor +"</span>");

		$("#"+location+"").append("<span class='arrow'>" + arrow[0] + "</span>");

//		print();
	});

	$("#turnRight").click(function()
	{
		var curLeftCoor = $("#avatorLeft").val();
		var curRightCoor = $("#avatorRight").val();
		var curDirection = $("#avatorDir").val();

		var location = "loc_" + curLeftCoor + "_" + curRightCoor;
		var arrow = doRight(curDirection);

		$("#avatorDir").val(arrow[1]);

		$("#"+location+"").html("<span class='subText'>" + curLeftCoor + "," + curRightCoor +"</span>");

		$("#"+location+"").append("<span class='arrow'>" + arrow[0] + "</span>");

//		print();
	});

	$("#forward").click(function()
	{
		var curLeftCoor = $("#avatorLeft").val();
		var curRightCoor = $("#avatorRight").val();
		var curDirection = $("#avatorDir").val();

		var nxtCoor = findNextCoor(curLeftCoor, curRightCoor, curDirection);

		var setLeftCoor = nxtCoor[0];
		var setRightCoor = nxtCoor[1];
		var setDirection = curDirection;

		var prevLocation = "loc_" + curLeftCoor + "_" + curRightCoor;

		$("#"+prevLocation+"").html("<span class='subText'>" + curLeftCoor + "," + curRightCoor +"</span>");

		$("#avatorLeft").val(setLeftCoor);
		$("#avatorRight").val(setRightCoor);
		$("#avatorDir").val(setDirection);

		var arrHtml = getArrow(setDirection);

		var location = "loc_" + setLeftCoor + "_" + setRightCoor;
		$("#"+location+"").append("<span class='arrow'>" + arrHtml + "</span>");

//		print();
	});

	$("#status").click(function()
	{
		print();
	});
});
