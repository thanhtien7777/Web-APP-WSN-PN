var zoom=10,maxxy=130;
var preX,preY;
	var issecondclick=false;
	var _canvas;
	var _context;
	var	isMoving=false;
	var networkid="";
	var numsen="";
	var numpac="";
	var SensorMaxBufferSize="";
	var SensorMaxQueueSize="";
	var ChanMax="";
	var proname="";
	var Parameter="";
	var StateCounter="";
	var Sensor={
data:[],
selectItem:null,
offX:-1,
offY:-1,
addSensor:function(x,y){
var item={
x:x,
y:y,
isSelect:false,
Name:"",
Init:"",
Stype:"",
Id:0,
Maxsendingrate:"",
Maxprocessingrate:"",
Cgnlevel:0,
contains : function(x,y){
    var right = this.x*maxxy + zoom;
    var bottom = this.y*maxxy + zoom;
	var left=this.x*maxxy-zoom;
	var top=this.y*maxxy-zoom;
    return x > left && x < right &&
         y > top && y < bottom;
},
};
this.data.push(item);
},
drawSensor:function(){
	
	clear();
	Link.drawLink();
        for(var i = 0; i < this.data.length; i++){
		var color;
		if(this.data[i].Stype==="1")
			color="#f00";
		else {if(this.data[i].Stype==="2")
		{color="#000";}		
		else {color="#00f";}}
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
		context.beginPath();
		context.arc(this.data[i].x*maxxy, this.data[i].y*maxxy, zoom, 0, Math.PI *2, true);
		context.fillStyle = color;
		context.fill();
		context.closePath();
		context.stroke();
		context.font = "15px tahoma";
		if(this.data[i].id ==0)
		context.fillText(i, this.data[i].x*maxxy-4, this.data[i].y*maxxy-12);
		else
			context.fillText(this.data[i].Id, this.data[i].x*maxxy-4, this.data[i].y*maxxy-zoom-2);	
		}
},
viewSensor : function(){
        // L?y danh s�ch sensor
        var sensors = this.data;
		var ding="   <Sensors>\n";
        // L?p v� hi?n th? sensor
        for(var i = 0; i < sensors.length; i++){
			var sensor=sensors[i];
            ding += "    <Sensor Name=\""+sensor.Name+"\" Init=\""+sensor.Init+"\" SType=\""+sensor.Stype+"\" id=\""+sensor.Id+"\" MaxSendingRate=\""+sensor.Maxsendingrate+"\" MaxProcessingRate=\""+sensor.Maxprocessingrate+"\" CGNLevel=\""+sensor.Cgnlevel+"\">\n";
			ding +="     <Position X=\""+sensor.x+"\" Y=\""+sensor.y+"\" Width=\"0.2\"/>\n     <Label>\n      <Position X=\"2.57\" Y=\"1.58\" Width=\"0.6219791\"/>\n     </Label>\n    </Sensor>\n";
        }
		ding+="   </Sensors>\n";
		return ding;
    },
selectAt : function(x,y){
    if(this.selectedItem)
        this.selectedItem.isSelected = false;
    this.selectedItem = null;
    for (var i = 0; i < this.data.length; i++) {
        var sensor = this.data[i];
        if(sensor.contains(x,y))
        {
            this.selectedItem = this.data[i];
            this.offX = x - this.data[i].x*maxxy;
            this.offY = y - this.data[i].y*maxxy;
            this.data[i].isSelect = true;
            break;
        }
    }
	},
updateSensor:function(x,y,name,init,stype,id,maxsendingrate,maxprocessingrate,cgnlevel){
	for (var i = 0; i < this.data.length; i++) {
        var sensor = this.data[i];
		if(sensor.x===x&&sensor.y===y){
		sensor.Name=name;
		sensor.Init=init;
		sensor.Stype=stype;
		sensor.Id=id;
		sensor.Maxsendingrate=maxsendingrate;
		sensor.Maxprocessingrate=maxprocessingrate;
		sensor.Cgnlevel=cgnlevel;			
		}
		Link.updateLinkid1(x,y);
		Sensor.drawSensor();
}
},
deleteSensor: function(x,y){
	for (var i = 0; i < this.data.length; i++) {
        var sensor = this.data[i];
		if(sensor.x*maxxy===x&&sensor.y*maxxy===y){
			Sensor.data.splice(i,1);
		}
		}
		
	for (var j=0;j<Link.Link.length;j++){
		var link=Link.Link[j];
		if(link.x*maxxy===x&&link.y*maxxy===y){
			Link.Link.splice(j,1);
	}}
	for (var k=0;k<Link.Link.length;k++){
		var link1=Link.Link[k];
		if(link1.preX*maxxy===x&&link1.preY*maxxy===y){
			Link.Link.splice(k,1);
		}
	}
},
};
	
	var Link={
	Link:[],
	selectItem:null,
	offX:-1,offY:-1,offpreX:-1,offpreY:-1,
	addlink :function(x,y,preX,preY){
	var item={
	x:x,
	y:y,
	preX:preX,
	preY:preY,
	isSelect:false,
	From:"",
	To:"",
	Ltype:"",
	Ctype:"",
	Id:"",
	Maxsendingrate:"",
	Probabilitypathcongestion:"",
	Cgnlevel:"",
	contains: function(x,y){
		var a=-(this.y*maxxy-this.preY*maxxy)/(this.x*maxxy-this.preX*maxxy);
		var b=-this.y*maxxy-a*this.x*maxxy;
		if(Math.sqrt((x-this.x*maxxy)*(x-this.x*maxxy)+(y-this.y*maxxy)*(y-this.y*maxxy))<zoom+3||Math.sqrt((x-this.preX*maxxy)*(x-this.preX*maxxy)+(y-this.preY*maxxy)*(y-this.preY*maxxy))<zoom+3)
		{return false;}
	else
		if( Math.min(this.x*maxxy,this.preX*maxxy) - x >0||
        x - Math.max(this.x*maxxy,this.preX*maxxy) >0||
        Math.min(this.y*maxxy,this.preY*maxxy) - y >0||
        y - Math.max(this.y*maxxy,this.preY*maxxy) >0){

			return false;
		}		
		else {if((y+a*x+b)/Math.sqrt(a*a+b*b)>1||(y+a*x+b)/Math.sqrt(a*a+b*b)<-1)
			return false;		
		
		}
		return true;
	}
	};
	this.Link.push(item);
	},
	drawLink:function(){
	clear();
	for(var i =0; i<this.Link.length;i++){
	var canvas = document.getElementById
        ('canvas');  
      var canvas1 = canvas.getContext('2d');
			canvas1.beginPath();
			canvas1.moveTo(this.Link[i].preX*maxxy,this.Link[i].preY*maxxy);
            canvas1.lineTo(this.Link[i].x*maxxy,this.Link[i].y*maxxy);       
			canvas1.closePath();
            canvas1.stroke();
			canvas1.fillStyle="#000000";
			canvas1.font = "12px tahoma";
			canvas1.fillText(this.Link[i].Id, (this.Link[i].preX*maxxy+this.Link[i].x*maxxy)/2, (this.Link[i].preY*maxxy+this.Link[i].y*maxxy)/2-5);
	}
	},
	viewLink:function(){
	var string="   <Links>\n";      
	var links = this.Link;
        for(var i = 0; i < links.length; i++){
			var link=links[i];
            string += "    <Link LType=\""+link.Ltype+"\" CType=\""+link.Ctype+"\" MaxSendingRate=\""+link.Maxsendingrate+"\" CGNLevel=\""+link.Cgnlevel+"\" ProbabilityPathCongestion=\""+link.Probabilitypathcongestion+"\" id=\""+link.Id+"\">\n";
			string +="     <From>"+link.From+"</From>\n     <To>"+link.To+"</To>\n     <Select></Select>\n     <Event></Event>\n     <ClockGuard></ClockGuard>\n     <Guard></Guard>\n     <Program></Program>\n     <ClockReset></ClockReset>\n     <Label>\n      <Position X=\"2.57 \" Y=\"1.58\" Width=\"0.6219791\"/>\n     </Label>\n    </Link>\n";
        }
		string+="   </Links>";
		return string;
	},
	updateLinkid1: function(x,y){
	for(var i =0; i<this.Link.length;i++){
		var link=this.Link[i];
		if(link.preX===x&&link.preY===y){
			var to=link.Id;
			for(var j=0;j<Sensor.data.length;j++){
				sensor1=Sensor.data[j];
				if(sensor1.x===link.preX&&sensor1.y===link.preY){
					link.From=sensor1.Name;
					link.Id=sensor1.Id+to.slice(to.indexOf("_"),to.length);
				}
		}}else if(link.x===x&&link.y===y){
			var froms=link.Id;
			for(var k=0;k<Sensor.data.length;k++){
				sensor2=Sensor.data[k];
				if(sensor2.x===link.x&&sensor2.y===link.y){
					link.To=sensor2.Name;
					link.Id=froms.slice(0,froms.indexOf("_"))+"_"+sensor2.Id;
				}
			}
		}
		
	}
			
	},
		/* updateLinkid: function(x,y,preX,preY){
	for(var i =0; i<this.Link.length;i++){
		var link=this.Link[i];
		if(link.x===x&&link.y===y&&link.preX===preX&&link.preY===preY){
			for(var j=0;j<Sensor.data.length;j++){
				sensor1=Sensor.data[j];
				if(sensor1.x===link.preX&&sensor1.y===link.preY){
					link.From=sensor1.Name;
					link.Id=sensor1.Id;
				}
			}
			for(var k=0;k<Sensor.data.length;k++){
				sensor2=Sensor.data[k];
				if(sensor2.x===link.x&&sensor2.y===link.y){
					link.To=sensor2.Name;
					link.Id=link.Id+"_"+sensor2.Id;
				}
			}
		}
		
	}
			
	}, */
	updateLink: function(x,y,preX,preY,Ltype,Ctype,Maxsendingrate,Probabilitypathcongestion,Cgnlevel){
		
		for(var i =0; i<this.Link.length;i++){
			var link=this.Link[i];
			if(link.x===x&&link.y===y&&link.preX===preX&&link.preY===preY){
				link.Ltype=Ltype;
				link.Ctype=Ctype;
				link.Maxsendingrate=Maxsendingrate;
				link.Probabilitypathcongestion=Probabilitypathcongestion;
				link.Cgnlevel=Cgnlevel;
			}
			Link.drawLink();
	}
	},

	
	selectAt : function(x,y){
    if(this.selectedItem)
        this.selectedItem.isSelected = false;
    this.selectedItem = null;
    for (var i = 0; i < this.Link.length; i++) {
        var link = this.Link[i];
        if(link.contains(x,y)==true)
        {
            this.selectedItem = this.Link[i];
            this.Link[i].isSelect = true;
			/* this.offX=this.Link[i].x;
			this.offY=this.Link[i].y;
			this.offpreX=this.Link[i].preX;
			this.offpreY=this.Link[i].preY; */
            break;
        }
    }
	},
		deleteLink: function(){
		for (var j=0;j<Link.Link.length;j++){
		var link=Link.Link[j];
		if(link.isSelect===true){
			Link.Link.splice(j,1);
		}
	}
	},
	}
function viewsensor(){
	string = "<WSN>\n <Declaration></Declaration>\n"
	+" <Network ID=\""+networkid+"\" NumberOfSensors=\""+numsen+"\" NumberOfPackets=\""+numpac+"\" SensorMaxBufferSize=\""+SensorMaxBufferSize+"\" SensorMaxQueueSize=\""+SensorMaxQueueSize+"\" ChannelMaxBufferSize=\""+ChanMax+"\">"
	+"\n  <Process Name=\""+proname+"\" Parameter=\""+Parameter+"\" Zoom=\"1\" StateCounter=\""+StateCounter+"\">\n";
		var end = "\n  </Process >\n </Network>\n</WSN>"
		document.getElementById('txt1').value=string+Sensor.viewSensor()+Link.viewLink() + end ;
}
function mousedown(e){
	preX = e.pageX - _canvas.offsetLeft;
    preY = e.pageY - _canvas.offsetTop;
	for(var i=0;i<Sensor.data.length;i++){
	var sensor=Sensor.data[i];
	if(sensor.contains(preX,preY)){
	preX=sensor.x;
	preY=sensor.y;
	issecondclick=true;
	}
	}
	
	}
function mouseup(e){
	var x = e.pageX - _canvas.offsetLeft;
    var y = e.pageY - _canvas.offsetTop;
	if(issecondclick){
		for(var i=0;i<Sensor.data.length;i++){
	var sensor=Sensor.data[i];
	if(sensor.contains(x,y)){
	x=sensor.x;
	y=sensor.y;
	if(x===preX&&y===preY){}
	else{	
	issecondclick=false;
	Link.addlink(x,y,preX,preY);
	//Link.updateLinkid(x,y,preX,preY);
	Link.updateLinkid1(x,y);
	Link.updateLinkid1(preX,preY);
	Link.drawLink();	
	Sensor.drawSensor();}

	}
	}
	}
	issecondclick=false;
	
	}	
function load2(){
    _canvas = document.getElementById("canvas");
    _context = _canvas.getContext("2d");
    _context.fillStyle = "wheat";
    _canvas.onmousedown = mousedown;
    _canvas.onmouseup = mouseup;
	
	_canvas.ondblclick=ondown;
	}	
function load3(){Link.viewLink();}	
function canvas_mousedown(e){
 
    var x = e.pageX - _canvas.offsetLeft;
    var y = e.pageY - _canvas.offsetTop;
 
    Sensor.selectAt(x,y)
 
    if(!Sensor.selectedItem)
        Sensor.addSensor((x/maxxy).toFixed(2),(y/maxxy).toFixed(2));
 
    isMoving = true;
    Sensor.drawSensor();
}
function canvas_mousedown1(e){
 
    var x = e.pageX - _canvas.offsetLeft;
    var y = e.pageY - _canvas.offsetTop;
 
    Sensor.selectAt(x,y)
 
    if(Sensor.selectedItem)
 
 
    isMoving = true;
    Sensor.drawSensor();
}
function canvas_mousedown2(e){
 
    var x = e.pageX - _canvas.offsetLeft;
    var y = e.pageY - _canvas.offsetTop;
 
    Sensor.selectAt(x,y);
	Link.selectAt(x,y);
    if(Sensor.selectedItem){
		var x1=Sensor.selectedItem.x*maxxy;
		var y1=Sensor.selectedItem.y*maxxy;
		Sensor.deleteSensor(x1,y1);
		}
	if(Link.selectedItem)
		Link.deleteLink();
    Sensor.drawSensor();
}
function load4(){
    _canvas = document.getElementById("canvas");
    _context = _canvas.getContext("2d");
    _context.fillStyle = "wheat";
 
    _canvas.onmousedown = canvas_mousedown2;	
    _canvas.onmousemove = canvas_mousemove;
    _canvas.onmouseup = canvas_mouseup;
	
	_canvas.ondblclick=ondown;
 
}
function canvas_mousemove1(e){
    if(isMoving && Sensor.selectedItem){
		var x1=Sensor.selectedItem.x;
		var y1=Sensor.selectedItem.y;
        var x = e.pageX - _canvas.offsetLeft;
        var y = e.pageY - _canvas.offsetTop;
        Sensor.selectedItem.x = (x - Sensor.offX)/maxxy;
        Sensor.selectedItem.y = (y - Sensor.offY)/maxxy;
		for(var i=0;i<Link.Link.length;i++){
		var link=Link.Link[i];
		if(link.preX===x1 && link.preY===y1){
		link.preX=Sensor.selectedItem.x;
		link.preY=Sensor.selectedItem.y;
		}
		if(link.x===x1 && link.y===y1){
		link.x=Sensor.selectedItem.x;
		link.y=Sensor.selectedItem.y;
		}
		}
        Sensor.drawSensor();
		//Link.drawLink();
    }
}
function canvas_mouseup1(e){
    isMoving = false;
}
function clear(){
	var canvas = document.getElementById
        ('canvas');  
      var canvas1 = canvas.getContext('2d');
 
    canvas1.clearRect(0,0,canvas.width,canvas.height);
}
function clear1(){
	var canvas = document.getElementById
        ('canvas');  
      var canvas1 = canvas.getContext('2d');
 
    canvas1.clearRect(0,0,canvas.width,canvas.height);
   
        Sensor.data.splice(0, Sensor.data.length+1);
		Link.Link.splice(0, Link.Link.length+1);
		networkid="";
		numsen="";
		numpac="";
		SensorMaxBufferSize="";
		SensorMaxQueueSize="";
		ChanMax="";
		proname="";
		Parameter="";
		StateCounter="";
		string ="";
}
function canvas_mousemove(e){}
function canvas_mouseup(e){}
function load1(){
    _canvas = document.getElementById("canvas");
    _context = _canvas.getContext("2d");
    _context.fillStyle = "wheat";
 
    _canvas.onmousedown = canvas_mousedown;	
    _canvas.onmousemove = canvas_mousemove;
    _canvas.onmouseup = canvas_mouseup;
 
	_canvas.ondblclick=ondown;
}
function load(){
 
    _canvas = document.getElementById("canvas");
    _context = _canvas.getContext("2d");
    _context.fillStyle = "wheat";
 
    _canvas.onmousedown = canvas_mousedown1;
    _canvas.onmousemove = canvas_mousemove1;
    _canvas.onmouseup = canvas_mouseup1;
 
	_canvas.ondblclick=ondown;
    
}


//---------------------------------------------------------------------------------------
	  	
var config = {};
config.skipEmptyTextNodesForObj = true;
config.stripWhitespaces = true;
var x2js = new X2JS(config);      
function assignText(s) {
   document.getElementById('txt1').value = s;
}
function runit(s) {
   var t;
   var s;
   var keys = {};
   var objects = {};
   var msg='Invalid XML entered.';
   if(s.trim()!="") {
      try {
       t=x2js.xml_str2json(s);
       if(document.getElementById("chkRemoveRoot").checked && _.keys(t).length===1 && !_.isArray(t)) {
           t = t[_.keys(t)];
       }
       JSON.stringify(t,function(key,value){if(_.isArray(value))keys[key]=1;if(_.isObject(value)&& !_.isArray(value))objects[key]=1;return value;});
       t = JSON.stringify(t,
           function(key,value){
                //alert("key="+key+", and value="+JSON.stringify(value));
                if(key==="__prefix")return undefined;
                if(key in keys && !_.isArray(value))return [value]; 
                if(value==="" && key in objects && !(key in keys))return undefined;
                return value;  
           }
           ,3);
       if(t!="null" && t!="undefined")document.getElementById('txta').value = t;
       }catch (e) {
           alert(msg);
           return;
       }
       if(!t || t=="null") {alert(msg); }
   }   
}	
function runit1(){
	s=document.getElementById("txt1").value;
	runit(s);
	
}


//---------------------------------------------------------------------------------------




document.getElementById('f1').onclick = function() {
    document.getElementById('files').click();
};
  function readBlob(opt_startByte, opt_stopByte) {
      
    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

 
 var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function read(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
   //     document.getElementById('byte_content').textContent = evt.target.result;
        document.getElementById('evet').textContent = file.name;
		clear1();
		loadf(evt.target.result);
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
  }
  
  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');
      readBlob(startByte, endByte);
    }
  }, false);
   function loadf(f){
	 // clear(true);

		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(f,"text/xml");
			
			
			
			var network=xmlDoc.getElementsByTagName("Network");			
			var networks=xmlDoc.getElementsByTagName("Process");	
			numsen=network[0].getAttribute("NumberOfSensors");
			networkid=network[0].getAttribute("ID");
			numpac=network[0].getAttribute("NumberOfPackets");
			SensorMaxBufferSize=network[0].getAttribute("SensorMaxBufferSize");
			SensorMaxQueueSize=network[0].getAttribute("SensorMaxQueueSize");
			ChanMax=network[0].getAttribute("ChannelMaxBufferSize");
			proname=networks[0].getAttribute("Name");
			Parameter=networks[0].getAttribute("Parameter");
			StateCounter=networks[0].getAttribute("StateCounter");
		  
          var names = xmlDoc.getElementsByTagName("Sensor");
          
          for (var i = 0; i < names.length; i++) {
			var id=names[i].getAttribute("id"); 
			var x=names[i].childNodes[1].getAttribute("X");
			var y=names[i].childNodes[1].getAttribute("Y");
			var init=names[i].getAttribute("Init");
			var name=names[i].getAttribute("Name");
			var stype=names[i].getAttribute("SType");
			var maxsendingrate=names[i].getAttribute("MaxSendingRate");
			var maxprocessingrate=names[i].getAttribute("MaxProcessingRate");
			var cgnlevel=names[i].getAttribute("CGNLevel");
			if (init=="True")
			{
			Sensor.addSensor(x,y);
			Sensor.drawSensor();
			Sensor.updateSensor(x,y,name,init,stype,id,maxsendingrate,maxprocessingrate,cgnlevel);
			}else{
			Sensor.addSensor(x,y);
			Sensor.updateSensor(x,y,name,init,stype,id,maxsendingrate,maxprocessingrate,cgnlevel);
			Sensor.drawSensor();
			}
				

	}
         // output += "</ul>";
		 var name = xmlDoc.getElementsByTagName("Link");
          //var output1 = "<ul>Link";
          for (var i = 0; i < name.length; i++) {
            // output1 += "<li> ltype:" + name[i].getAttribute("LType")+"______CType: "+ name[i].getAttribute("CType")+"_________MaxSendingRate"+
//			name[i].getAttribute("MaxSendingRate")+"_______ProbabilityPathCongestion: "+ name[i].getAttribute("ProbabilityPathCongestion")
//+"________CGNLevel: "+ name[i].getAttribute("CGNLevel")+ "______id: "+ name[i].getAttribute("id")+"</li>";
			 //output1 +="<li> from  : "+ name[i].getElementsByTagName("From")[0].childNodes[0].nodeValue+"____to: "+name[i].getElementsByTagName("To")[0].childNodes[0].nodeValue+"</li>";
		


		   var from1=name[i].getElementsByTagName("From")[0].childNodes[0].nodeValue;
		   var to1=name[i].getElementsByTagName("To")[0].childNodes[0].nodeValue;
		   var id=name[i].getAttribute("id");
		   var ltype=name[i].getAttribute("LType");
		   var ctype=name[i].getAttribute("CType");
		   var maxsendingrate=name[i].getAttribute("MaxSendingRate");
		   var protion=name[i].getAttribute("ProbabilityPathCongestion");
		   var cgnlevel=name[i].getAttribute("CGNLevel");
		   var x,y,prex,prey;
		   for (var j=0;j<names.length;j++){
			   if(names[j].getAttribute("Name")==from1){
				
				x=names[j].childNodes[1].getAttribute("X");
				y=names[j].childNodes[1].getAttribute("Y");   
			   }
			   
		   for (var k=0;k<names.length;k++){
			   if(names[k].getAttribute("Name")==to1){
				
				prex=names[k].childNodes[1].getAttribute("X");
				prey=names[k].childNodes[1].getAttribute("Y");   
			   }
		   }
			   
		   }
		   Link.addlink(x,y,prex,prey);
		   Link.updateLinkid1(x,y);
		   Link.updateLinkid1(prex,prey);
		   Link.updateLink(x,y,prex,prey,ltype,ctype,maxsendingrate,protion,cgnlevel);
		   Link.drawLink();
		   Sensor.drawSensor();
		   }
          //output1 += "</ul>";
        // document.getElementById("result").innerHTML = output+output1;
        // document.getElementById("result1").innerHTML = output1;
    
}

	/* function drawtext(text,x,y,font){ 
	var canvas = document.getElementById
        ('canvas');  
      var canvas1 = canvas.getContext('2d'); 
		
		canvas1.font = font;
		canvas1.fillText(text, x, y);
		
	} */
	
//--------------------------------------------------------------------------------	
  

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
function zoomto(){
	if(maxxy<200)
	{
		zoom=zoom+0.5;
		maxxy=maxxy+10;
		Sensor.drawSensor();
	}
}
function zoomnho(){
	if(maxxy>50){
		zoom=zoom-0.5;
		maxxy=maxxy-10;
		Sensor.drawSensor();
	}
}
function show(){
    var t1 = document.getElementById("t1");
    var k1 = document.getElementById("k1");
    document.getElementById("t").value = t1.value;
    document.getElementById("k").value = k1.value;
}