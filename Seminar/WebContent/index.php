<html>
<head>
<title>Seminar Chuyen De</title>

<h1>WEB APPLICATION</h1>
<!-- Menu --> 
<link rel="stylesheet" href="style.css" />
<div class="btn-group" style="opacity:0.8;">
  <button id="f1"> Open File</button>
  <button id="drawinput" class="readBytesButtons"> Draw Input</button>
  <button id="addsensor" onclick="load1()"> Add Sensor</button>
  <button id="addlink" onclick="load2()"> Add Link</button>
  <button id="select" onclick="load()"> Select</button> 
  <button id="select"onclick="viewsensor()" > Info</button>
  <button id="delete" onclick="load4()"> Delete</button> 
  <button id="deleteData" onclick="clear1()">Delete All</button>
</div>



<script src="./file/underscore-min.js"></script>
<script src="./file/filesaver.js "></script>
<script src="./file/localread.js "></script>
<script src="./file/csvsup.js "></script>
<script src="./file/x2js.js "></script>
<script src="./file/mainjs.js "></script>
</head>
<body onload="loadcavas()"style="background:white url(images/background.jpg) no-repeat fixed center center">
 
<!-- open + read file -->
<input  type="file" id="files" name="file" style="display:none" /> 

<div id="byte_range"></div>
<div id="byte_content"></div>


 <button id="networkinfo" onclick="btn2click()">Network Info</button>
<!--<button type="button" onclick="xmlToJson()">Verify</button>-->
<button type="button" onclick="zoomto()">+</button>
<button type="button" onclick="zoomnho()">-</button><br>
    <canvas id="canvas" width="1250"
      height="1000"> 	  
    </canvas>
	
	<div><form id="frm1" name="frm1" role="form">
		</form>
			<form action="Servlet" method="post">
			<div style="float:left;padding:10px 10px" height="600px">
				<textarea  rows="15" cols="70" id="txt1" name="txt1" placeholder="" onchange="if(this.value!=&#39;&#39;)runit(this.value)" wrap="off"></textarea>
				<input style="display: none;" type="text" size="15" id="fn1" value="TopologyNetwork" class="form-control" title="Enter filename without extension">
			</div>
			<div width="120px"style="float:left;padding:100px 10px">
				<input type="button" id="btnRun" value="   XML - JSON  " class="btn btn-primary" title="Convert XML To JSON" onclick="runit(document.getElementById(&#39;txt1&#39;).value)"><br>
                <input type="button" class="btn btn-primary" value="Download kwsn" onclick="saveFile(document.getElementById(&#39;txt1&#39;).value,&#39;kwsn&#39;)"><br>
                <input type="button" class="btn btn-primary" value="Download json  " onclick="saveFile(document.getElementById(&#39;txta&#39;).value,&#39;json&#39;)"><br>		
  				<input type="submit"  value="   Send result    "/>
			</div>
			<div style="float:left;padding:10px 10px"height="600px" > 
				<textarea id="txta" name="txta" rows="15" cols="70" wrap="off" ></textarea>
				<input type="text"  size="0" id="chkRemoveRoot" value="==!" style="display:none">  
				<input type="text" style="display: none;" size="15" id="fn" name="fn" class="form-control" title="Enter filename without extension">
</div>

</form>
</div>

<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close" onclick="spanclick()">&times;</span>
      Change Info
    </div>
    <div class="modal-body">
	<font size="2">
	 <table style="font-size:75%;">
	 <tr>
      <td>Id : </td><td><input id="Id"type="text" name="Id"></td>
	  </tr><tr>
     <td> From: </td><td><input id="From" type="text" name="From"></td>
	  </tr><tr>
      <td>To: </td><td><input id="To" type="text" name="To"></td>
	  </tr><tr>
      <td>Ltype : </td><td><input id="Ltype"type="text" name="Ltype"></td>
	  </tr><tr>
      <td>Ctype : </td><td><input id="Ctype"type="text" name="Ctype"></td>
	  </tr><tr>
     <td> Maxsendingrate : </td><td><input id="Maxsendingrate"type="number" name="Maxsendingrate"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>ProPathCongestion: </td><td><input id="Probabilitypathcongestion"type="text" name="Probabilitypathcongestion"></td>
	  </tr><tr>
      <td>Cgnlevel : </td><td><input id="Cgnlevel"type="number" name="Cgnlevel"><font size="2" color="red">*</font></td>
	  </tr></table>
	<p><font size="2" color="red">*Only input number!!</font></p></font>
    </div>
    <div class="modal-footer">
    <input id="submit" type="submit" value="Submit" onclick="smitclick()">
    
    </div>
  </div>

</div>
<div id="myModal1" class="modal1">

  <!-- Modal1 content -->
  <div class="modal-content1">
    <div class="modal-header1">
      <span class="close1"onclick="span1click()">&times;</span>
      Change Info
    </div>
    <div class="modal-body1">
	<font size="2">
	 <p id="xy"></p>
	 <table style="font-size:75%;">
	 <tr>
      <td>Name: </td><td><input id="Name1" type="text" name="Name1"></td>
	  </tr><tr>
      <td>Init: </td><td><select id="Init1" type="text" name="Init1">
  <option value="True">True</option>
  <option value="False">False</option>
</select></td>
	  </tr><tr>
      <td>Stype : </td><td><input id="Stype1"type="text" name="Stype1"></td>
	  </tr><tr>
      <td>Id : </td><td><input id="Id1"type="text" name="Id1"></td>
	  </tr><tr>
      <td>Maxsendingrate :</td><td> <input id="Maxsendingrate1"type="number" name="Maxsendingrate1"><font size="2" color="red">*</font></td>
	  </tr><tr>
     <td> Maxprocessingrate :</td><td> <input id="Maxprocessingrate1"type="number" name="Maxprocessingrate1"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Cgnlevel :</td><td> <input id="Cgnlevel1"type="number" name="Cgnlevel1"><font size="2" color="red">*</font></td>
	  </tr></table>
	<p><font size="2" color="red">*Only input number!!</font></p></font>
    </div>
    <div class="modal-footer1">
    <input id="submit1" type="submit" value="Submit"onclick="smit1click()">
    
    </div>
  </div>

</div>
<div id="myModal2" class="modal2">

  <!-- Modal1 content -->
  <div class="modal-content2">
    <div class="modal-header2">
      <span class="close2"onclick="span2click()">&times;</span>
      Change Info
    </div>
    <div class="modal-body2">
	<font size="0.1">
	 <p id="xy"></p>
	 <table style="font-size:80%;">
	 <tr>
      <td>Network id: </td><td><input id="networkid" type="text" name="networkid"></td>
	  </tr><tr>
      <td>Number of Sensor: </td><td><input id="numsen" type="number" name="numsen"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Number of Pactkets : </td><td><input id="numpac"type="number" name="numpac"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Sensor MaxBufferSize :</td><td> <input id="SensorMaxBufferSize"type="number" name="SensorMaxBufferSize"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Sensor MaxQueueSize : </td><td><input id="SensorMaxQueueSize"type="number" name="SensorMaxQueueSize"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Channel MaxBufferSize : </td><td><input id="ChanMax"type="number" name="ChanMax"><font size="2" color="red">*</font></td>
	  </tr><tr>
      <td>Process Name : </td><td><input id="proname"type="text" name="proname"></td>
	  </tr><tr>
	  <td>Parameter : </td><td><input id="Parameter"type="text" name="Parameter"></td>
	  </tr><tr>
     <td> StateCounter : </td><td><input id="StateCounter"type="number" name="StateCounter"><font size="2" color="red">*</font></td>
	 </tr>
	 </table>
	<p><font size="2" color="red">*Only input number!!</font></p></font>
   </div>
    <div class="modal-footer2">	
    <input id="submit2" type="submit" value="Submit"onclick="smit2click()">
    
    </div>
  </div>

</div>
    <p id="evet"></p>
	
<!--the end of the HTML code for the menu -->
<script>
var string = "";
var modal = document.getElementById('myModal');
var smit=document.getElementById('submit');
// Get the button that opens the modal

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function btnclick() {
	modal1.style.display = "none";
    modal.style.display = "block";
}
function smitclick(){	
	var x=Link.selectedItem.x;
	var y=Link.selectedItem.y;
	var preX=Link.selectedItem.preX;
	var preY=Link.selectedItem.preY;
	var From=document.getElementById('From').value;
	var To=document.getElementById('To').value;
	var Id=document.getElementById('Id').value;
	var Ctype=document.getElementById('Ctype').value;
	var Ltype=document.getElementById('Ltype').value;
	var Probabilitypathcongestion=document.getElementById('Probabilitypathcongestion').value;
	var Maxsendingrate=document.getElementById('Maxsendingrate').value;
	var Cgnlevel=document.getElementById('Cgnlevel').value;
	Link.updateLink(x,y,preX,preY,Ltype,Ctype,Maxsendingrate,Probabilitypathcongestion,Cgnlevel);
	Sensor.drawSensor();	
	modal.style.display = "none";
}

var modal1 = document.getElementById('myModal1');
var smit1=document.getElementById('submit1');
// Get the button that opens the modal

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
function loadcavas(){
	    _canvas = document.getElementById("canvas");
    _context = _canvas.getContext("2d");
    _context.fillStyle = "wheat";
	_canvas.ondblclick=ondown;
	
}
function btn1click() {
    modal1.style.display = "block";
}
 function ondown(e){	
	var x = e.pageX - _canvas.offsetLeft;
    var y = e.pageY - _canvas.offsetTop;
 
    Sensor.selectAt(x,y)
	Link.selectAt(x,y)
    if(Sensor.selectedItem){
	btn1click();
	document.getElementById('xy').innerHTML="x: "+ Sensor.selectedItem.x +"       y: "+Sensor.selectedItem.y;
	document.getElementById('Name1').value=Sensor.selectedItem.Name;
	document.getElementById('Init1').value=Sensor.selectedItem.Init;
	document.getElementById('Id1').value=Sensor.selectedItem.Id;
	document.getElementById('Stype1').value=Sensor.selectedItem.Stype;
	document.getElementById('Maxprocessingrate1').value=Sensor.selectedItem.Maxprocessingrate;
	document.getElementById('Maxsendingrate1').value=Sensor.selectedItem.Maxsendingrate;
	document.getElementById('Cgnlevel1').value=Sensor.selectedItem.Cgnlevel;
	}
	else if (Link.selectedItem){
		btnclick();
			
	//var x=Link.selectedItem.x;
	//var y=Link.selectedItem.y;
	//var preX=Link.selectedItem.preX;
	//var preY=Link.selectedItem.preY;
	document.getElementById('From').value=Link.selectedItem.From;
	document.getElementById('To').value=Link.selectedItem.To;
	document.getElementById('Id').value=Link.selectedItem.Id;
	document.getElementById('Ctype').value=Link.selectedItem.Ctype;
	document.getElementById('Ltype').value=Link.selectedItem.Ltype;
	document.getElementById('Probabilitypathcongestion').value=Link.selectedItem.Probabilitypathcongestion;
	document.getElementById('Maxsendingrate').value=Link.selectedItem.Maxsendingrate;
	document.getElementById('Cgnlevel').value=Link.selectedItem.Cgnlevel;
	}
	}
 
function smit1click(){
	var x=Sensor.selectedItem.x;
	var y=Sensor.selectedItem.y;
	var name=document.getElementById('Name1').value;
	var init=document.getElementById('Init1').value;
	var id=document.getElementById('Id1').value;
	var stype=document.getElementById('Stype1').value;
	var maxprocessingrate=document.getElementById('Maxprocessingrate1').value;
	var maxsendingrate=document.getElementById('Maxsendingrate1').value;
	var cgnlevel=document.getElementById('Cgnlevel1').value;
//document.getElementById('result').innerHTML=name+"__"+age+"__"+sex+"____"+Sensor.selectedItem.x;
	//Link.updateLinkid1(x,y);
	Sensor.updateSensor(x,y,name,init,stype,id,maxsendingrate,maxprocessingrate,cgnlevel);
	
	modal1.style.display = "none";
}
// When the user clicks on <span> (x), close the modal
function span1click() {
    modal1.style.display = "none";
}
function spanclick() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }if (event.target == modal) {
        modal.style.display = "none";
    }if (event.target == modal2) {
        modal2.style.display = "none";
    }
}


var modal2 = document.getElementById('myModal2');
var smit2=document.getElementById('submit2');
// Get the button that opens the modal

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 

function btn2click() {
    modal2.style.display = "block";
	document.getElementById('networkid').value=networkid;
	document.getElementById('numsen').value=numsen;
	document.getElementById('numpac').value=numpac;
	document.getElementById('SensorMaxBufferSize').value=SensorMaxBufferSize;
	document.getElementById('SensorMaxQueueSize').value=SensorMaxQueueSize;
	document.getElementById('ChanMax').value=ChanMax;
	document.getElementById('proname').value=proname;
	document.getElementById('Parameter').value=Parameter;
	document.getElementById('StateCounter').value=StateCounter;
	
}
 
function smit2click(){
	networkid=document.getElementById('networkid').value;
	numsen=document.getElementById('numsen').value;
	numpac=document.getElementById('numpac').value;
	SensorMaxBufferSize=document.getElementById('SensorMaxBufferSize').value;
	SensorMaxQueueSize=document.getElementById('SensorMaxQueueSize').value;
	ChanMax=document.getElementById('ChanMax').value;
	proname=document.getElementById('proname').value;
	Parameter=document.getElementById('Parameter').value;
	StateCounter=document.getElementById('StateCounter').value;
//document.getElementById('result').innerHTML=name+"__"+age+"__"+sex+"____"+Sensor.selectedItem.x;

    modal2.style.display = "none";
	}
// When the user clicks on <span> (x), close the modal
function span2click() {
    modal2.style.display = "none";
}
</script>

</body>
</html>