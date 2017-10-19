// This is a great time to warn you about the variable names. They aren't the best, but they mostly correspond and make sense. Good luck!
var drawColor = 'black'
var pixelHolder = []
var mousedown = false;
var lastPick = ""
var holderArrPos1 = []
var holderArrPos2 = []
var eraserPicked = ""
var pickedClassName = ""
var oldPickedClassName = "emptyHolder"

// Primary draw grid function. Waits for DOM to load before contructing draw grid.
document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < 1225; i++) {
    var drawarea = document.getElementsByClassName('drawarea')[0]
    var divGrid = document.createElement('div')
    // These values can be changed to change grid size/ resolution but directly effect all math functions. With proper math tweaks this is possible.
    divGrid.style.width = '15px'
    divGrid.style.height = '15px'
    divGrid.style.border = '1px solid black'
    divGrid.style.float = 'left'
    // This gives every pixel div class a corresponding number on the end. This is essential for all funtions.
	divGrid.className = 'pixel' + i
	divGrid.style.backgroundColor = 'transparent'
    drawarea.appendChild(divGrid)
  }
  // The empty draw grid is styled and ready to receive draw actions
})

document.addEventListener('DOMContentLoaded', setTimeout(function (event) {

// This receives the mouse click event on the draw area dom and outputs what pixel number you click on. This determines which pixel gets edited.
for (var i = 0; i < 1225; i++) { pixelHolder.push(document.getElementsByClassName('pixel' + i)[0]) }
// Primary catch mouse event for drawing on grid. This whitelists specialty tools that have there own functions 
var mousedownFunc = function (event) {
    if (lastPick != 'colorDropper' && lastPick != 'selectionTool' && lastPick != 'selectionToolPos2') {
    	console.log(lastPick)
    	mousedown = true
    	//This sets the background color of your clicked pixel. This whitelists specialty tools that have there own functions 
    	this.style.backgroundColor = drawColor
    	// This sets a transparent border as long as you don't select the eraser tool. That is the only time a black border is needed.
    	if(lastPick == 'eraser' || lastPick == 'selectionToolPos2') {
    		this.style.border = '1px solid black'
    	}else {
    		this.style.border = '1px solid transparent'
    	}

    }
}

var mouseup = function (event) {
   mousedown = false;
}



function changer(event) {
    if (mousedown == true) {
      var current = event.toElement
      current.style.backgroundColor = drawColor
      if(lastPick == 'eraser' || lastPick == 'selectionToolPos2') {
    		current.style.border = '1px solid black'
      }else {
    	    current.style.border = '1px solid transparent'
    	}
    }
}
for(var i = 0; i < 1225; i++) {
  pixelHolder[i].addEventListener('mousedown', mousedownFunc)
  pixelHolder[i].addEventListener('mouseover', changer)
  pixelHolder[i].addEventListener('mouseup', mouseup)
}
  }, 3
))
// function xdszf(lastCiick) {
// 	switch:
// 		case lastCiick == 'white': break
// }


var drawColorsetWhite = function () {
    drawColor = 'white'
    lastPick = 'rgb'
    eraserPicked = 'NOPE'
    pickedClassName = 'Color1'
    checkLast()
}	

var drawColorsetBlack = function () {
    drawColor = 'black'
    lastPick = 'rgb'
    eraserPicked = 'NOPE'
    pickedClassName = 'Color2'
    checkLast()
}	

var drawColorsetRed = function () {
    drawColor = '#FF0000'
    lastPick = 'rgb'
    eraserPicked = 'NOPE'
    pickedClassName = 'Color3'
    checkLast()
}	

var drawColorsetGreen = function () {
    drawColor = '#00FF00'
    lastPick = 'rgb'
    eraserPicked = 'NOPE'
    pickedClassName = 'Color4'
    checkLast()
}	

var drawColorsetBlue = function () {
    drawColor = '#0000FF'
    lastPick = 'rgb'
    eraserPicked = 'NOPE'
    pickedClassName = 'Color5'
    checkLast()
}	

var eraser = function () {
    drawColor = 'transparent'
    lastPick = 'eraser'
    eraserPicked = 'eraser'
    pickedClassName = 'Eraser'
    checkLast()
}

var newpage = function () {
	for(var i = 0; i < 1225; i++) {
		pixelHolder[i].style.backgroundColor='transparent'
		pixelHolder[i].style.border = '1px solid black'
  }
}
var colorUpdater = function () {
  if (lastPick == 'colorPicker') {
      var rgb = document.getElementsByClassName('ColorRGB')[0]
      drawColor = rgb.style.backgroundColor
  }
}
var rgbAutoSelect = function () {
    lastPick = 'colorPicker'
    eraserPicked = 'NOPE'
    if (lastPick == 'colorPicker') {
        var rgb = document.getElementsByClassName('ColorRGB')[0]
        drawColor = rgb.style.backgroundColor
    }
    pickedClassName = 'ColorRGB'
    checkLast()
}
var rgbtool = function () {
	var rgb = document.getElementsByClassName('ColorRGB')[0]
	drawColor = rgb.style.backgroundColor
	pickedClassName = 'ColorRGB'
}

var getColorFromPixel = function () {
	var eyeDropColor = this.style.backgroundColor
	if(lastPick == 'colorDropper') {
		document.getElementsByClassName('Marker')[0].style.backgroundColor = eyeDropColor
		drawColor = eyeDropColor
		lastPick = "rgb"
		eraserPicked = 'NOPE'
	}
}

var getColor  = function () {
    lastPick = "colorDropper"
	for(var i = 0; i < 1225; i++) {
	  pixelHolder[i].addEventListener('mousedown', getColorFromPixel)
	}	
	pickedClassName = 'Marker'
    checkLast()
}

var colorDropperUpdater = function () {
  if (lastPick == 'colorDropper') {
      var dropper = document.getElementsByClassName('Marker')[0]
      drawColor = dropper.style.backgroundColor
  }
}

var dropperTool = function () {
	var dropper = document.getElementsByClassName('Marker')[0]
	drawColor = dropper.style.backgroundColor
	pickedClassName = 'Marker'
    checkLast()
}

function checkLast(){
	if (pickedClassName != oldPickedClassName){
	var receivedClass = document.getElementsByClassName(pickedClassName)[0]
	console.log(receivedClass)
	console.log(pickedClassName)
	receivedClass.style.borderColor = 'red'
	var oldReceivedClass = document.getElementsByClassName(oldPickedClassName)[0]
	oldReceivedClass.style.borderColor = 'black'
	oldPickedClassName = pickedClassName
	}
}

function getPos1() {
  var xPos1 = ""
  var yPos1 = ""
  var divName = ""
  var pos1Cords = ""
  var havePos1 = {}
  var pos1obj = {}
  var pos2obj = {}
  lastPick = "selectionTool"
	for(var i = 0; i < 1225; i++) {
	  pixelHolder[i].addEventListener('mousedown', function(){
	  	if(lastPick == 'selectionTool' && lastPick != 'rgb'){
	  	  var divName = this.className
	  	  var posInt = parseInt(divName.substr(5))
	  	  var xPos1 = posInt%35
  		  var yPos1 = Math.floor(posInt / 35)
 		    var pos1Cords = [xPos1,yPos1,posInt]
        	pos1obj.xMinCords = xPos1
        	pos1obj.yMinCords = yPos1
 		    lastPick = 'selectionToolPos2'
    	}
        

          })
		  }
    for(var i = 0; i < 1225; i++) {
      
	  pixelHolder[i].addEventListener('mouseup', function(){
	  	if (lastPick == 'selectionToolPos2'){
				  var divName = this.className
				  var posInt2 = parseInt(divName.substr(5))
				  var xPos2 = posInt2%35
				  var yPos2 = Math.floor(posInt2 / 35)
				  pos2obj.xMinCords = xPos2
        		  pos2obj.yMinCords = yPos2
        		  if (eraserPicked == 'eraser'){
        		  lastPick = 'eraser'
				  } else {
        				lastPick = 'rgb'
        			}
        		  fillRegion(pos1obj,pos2obj)
      	}

    })
		  
		}
}

function swap(a, b) {
  return [b, a]
 }

function fillRegion(pos1obj, pos2obj) {
var xMin = pos1obj.xMinCords
var yMin = pos1obj.yMinCords
var xMax = pos2obj.xMinCords
var yMax = pos2obj.yMinCords
var swapCordObj = {}
var xHolder = xMin
var yHolder = yMin
// Forces start position top left
	if (xMax > xMin && yMax > yMin) {
		swapCordObj.xMinSwapped = xMin
		swapCordObj.yMinSwapped = yMin
		swapCordObj.xMaxSwapped = xMax
		swapCordObj.yMaxSwapped = yMax
		var catcher = constructDrawGrid(swapCordObj)}
	else if (xMax < xMin && yMax < yMin){
		var swapperinoy = []
		swapperino = swap(yMin,yMax)
		yMin = swapperinoy[0]
		yMax = swapperinoy[1]
		swapperinox = swap(xMin,xMax)
		xMin = swapperinox[0]
		xMax = swapperinox[1]
		swapCordObj.xMinSwapped = xMin
		swapCordObj.yMinSwapped = yMin
		swapCordObj.xMaxSwapped = xMax
		swapCordObj.yMaxSwapped = yMax
		var catcher = constructDrawGrid(swapCordObj)
	}

	else if (xMax > xMin && yMax < yMin){
		var swapperino = []
		swapperino = swap(yMin,yMax)
		yMin = swapperino[0]
		yMax = swapperino[1]
		swapCordObj.xMinSwapped = xMin
		swapCordObj.yMinSwapped = yMin
		swapCordObj.xMaxSwapped = xMax
		swapCordObj.yMaxSwapped = yMax
		var catcher = constructDrawGrid(swapCordObj)
	}

	else if (xMax < xMin && yMax > yMin){
		var swapperino = []
		swapperino = swap(xMin,xMax)
		xMin = swapperino[0]
		xMax = swapperino[1]
		swapCordObj.xMinSwapped = xMin
		swapCordObj.yMinSwapped = yMin
		swapCordObj.xMaxSwapped = xMax
		swapCordObj.yMaxSwapped = yMax
		var catcher = constructDrawGrid(swapCordObj)
	}
}




function constructDrawGrid(obj) {
	var xHolderArr = []
	var yHolderArr = []
	var xMinSwapped = obj.xMinSwapped
	var yMinSwapped = obj.yMinSwapped
	var xDif = obj.xMaxSwapped - obj.xMinSwapped
    var yDif = obj.yMaxSwapped - obj.yMinSwapped
    var drawOnx = xMinSwapped
    var drawOny = yMinSwapped
// Gets outer border x and y arrays
    for(var i = 0; i < 1; i++){
    	// Writes start square for x axis
    	xHolderArr.push(xMinSwapped)
    	for(var k = 0; k<xDif; k++){
    		// Add new x cordinate for every xDif
    		drawOnx += 1
    		xHolderArr.push(drawOnx)
    	}
    }
    for(var i = 0; i < 1; i++){
    	// Writes start square for x axis
    	yHolderArr.push(yMinSwapped)
    	for(var k = 0; k<yDif; k++){
    		// Add new y cordinate for every yDif
    		drawOny += 1
    		yHolderArr.push(drawOny)
    	}
 	}
 	var pixelFinal = []
 	for(var i = 0; i < yHolderArr.length; i++) {
 		for(var k = 0; k < xHolderArr.length; k++) {
 			pixelFinal.push([xHolderArr[k], yHolderArr[i]])
 		}
 	}
 	CalcAndDraw(pixelFinal)
}

function CalcAndDraw(pixelDrawArea){
var drawArr = []
	for(var i = 0; i < pixelDrawArea.length; i++) {
		for(var k = 0; k < pixelDrawArea[i].length; k++) {
			var xHolder = pixelDrawArea[i][0]
			var yHolder = pixelDrawArea[i][1]
			var drawPixel = yHolder * 35 + xHolder
			var drawThisPixel = document.getElementsByClassName('pixel'+drawPixel)[0]
			drawThisPixel.style.backgroundColor = drawColor
			if(eraserPicked == 'eraser') {
    		drawThisPixel.style.border = '1px solid black'
    	}else {
    		drawThisPixel.style.border = '1px solid transparent'
    	}
			
		}
	}
}

