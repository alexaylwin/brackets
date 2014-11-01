$(document).ready(function(){
		
	
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for Cordova to connect with the device
    //
    //document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
		
		var image = new Image();
	    image.onload = function() {
	    	
	    	//Get aspect ratio, aiming for 300px width
	    	console.log(image.width + "x" + image.height);
	    	if(image.width > image.height)
	    	{
		    	var resizeFactor = (300/image.width);
//		    	var newWidth = image.height * resizeFactor;
//				var newHeight = image.width * resizeFactor; 
		    	
			} else {
				var resizeFactor = (300/image.height);
			}
			var newWidth = image.width * resizeFactor;
			var newHeight = image.height * resizeFactor;
			
			
			//Swap the width and height, since we'll be rotating the image
			console.log(newWidth + "x" + newHeight);
	    	//Set up canvas
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			
			//Draw rotated image
			canvas.width = newHeight;
			canvas.height = newWidth;
	        ctx.translate(canvas.width/2, canvas.height/2);            
	        ctx.rotate(90*(Math.PI/180));	        
	        ctx.drawImage(image, -(newWidth/2), -(newHeight/2), newHeight, newWidth);
	        
	        //Save image data and display on screen
	        var imageDataRotated = canvas.toDataURL('image/jpeg'); 
			var playerImage = document.getElementById('playerImage');
			//playerImage.style.width = newHeight + 'px';
			//playerImage.style.height = newWidth + 'px';
			playerImage.src = imageDataRotated;
			playerImage.style.display = 'block';
		};
		image.src = "data:image/jpeg;base64," + imageData;
    }

    // A button will call this function
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL, correctOrientation: true, targetWidth:300});
    }
    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
	function addPlayer()
	{
		ret = assignPlayer();
		console.log("assigning Player - ret:" + ret);
		if(ret)
		{
			console.log("Printing result");
			$("#picture-assign-team").html(ret.team.name);
		} else {
			$("#picture-assign-team").html("Done!");
		}
	}
	
    $("#picture-assign-capturePhoto").click(capturePhoto);
    
    $("#picture-assign-assignPlayer").click(addPlayer);
});

