window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	ctx.beginPath();
	
	for (var i = 0; i < 15; i++) {
		// 横线
		var lingrad=ctx.createLinearGradient(40,40.5+i*40,600,40.5+i*40);
		lingrad.addColorStop(0.5,'red');
		lingrad.addColorStop(1,'purple');
		ctx.strokeStyle=lingrad;
		ctx.moveTo(40,40.5+i*40);
		ctx.lineTo(600,40.5+i*40);
		ctx.stroke();
	};
	// 竖线
	for (var i = 0; i < 15; i++) {
		
		var lingrad1=ctx.createLinearGradient(40.5+i*40,40,40.5+i*40,600);
		lingrad1.addColorStop(0.5,'yellow');
		lingrad1.addColorStop(1,'green');
		ctx.strokeStyle=lingrad1;
		ctx.beginPath();
		ctx.moveTo(40.5+i*40,40);
		ctx.lineTo(40.5+i*40,600);
		ctx.stroke();
	}
	
	
	// 圆
	ctx.moveTo(320.5,320.5);
	ctx.arc(320.5,320.5,3,0,Math.PI*2);
	ctx.fill();
	var z=[160.5,480.5]
	for (var i = 0; i < z.length; i++) {
	    for (var j = 0; j < z.length; j++) {
	    	ctx.moveTo(z[i],z[j])
	    	ctx.arc(z[i],z[j],3,0,Math.PI*2);
	    	ctx.fill();
	    }
	}
    

    // 落子
    // 画出的落子
    var luozi=function(x,y,color){
    	var zx=40*x+40.5;
    	var zy=40*y+40.5;
	    var black=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
	    black.addColorStop(0.1,'#555');
	    black.addColorStop(1,'black');
	    var white=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
	    white.addColorStop(0.1,'#fff');
	    white.addColorStop(1,'#ddd');
	    ctx.shadowOffsetX=2;
	    ctx.shadowOffsetY=2;
	    ctx.shadowBlur=2;
	    ctx.shadowColor='rgba(0,0,0,0,5)'
    	ctx.beginPath();
    	ctx.fillStyle=color?black:white;
    	ctx.moveTo(40*x+40.5,40*y+40.5);
  		ctx.arc(40*x+40.5,40*y+40.5,18,0,Math.PI*2);
		ctx.fill();
    }
	
    // luozi(3,3,'heizi');
    // luozi(4,3,false)

	

	/*var lingrad=ctx.createLinearGradient(40,320,600,320);
	lingrad.addColorStop(0,'red');
	lingrad.addColorStop(0.2,'orange');
	lingrad.addColorStop(0.4,'yellow');
	lingrad.addColorStop(0.6,'green');
	lingrad.addColorStop(0.8,'blue');
	lingrad.addColorStop(1,'purple');
	// ctx.lineWidth=4;
	// ctx.lineCap='round';
	// ctx.strokeStyle=lingrad;
	ctx.beginPath();
	ctx.moveTo(40,320);
	ctx.lineTo(600,320);
	ctx.stroke();*/
    
    var qizi={};
    var kaiguan=true;
    canvas.onclick=function(e){
      var x=Math.round((e.offsetX-40.5)/40);
      var y=Math.round((e.offsetY-40.5)/40);
      if(qizi[x+'_'+y]){
      	return;
      }
      luozi(x,y,kaiguan);
      qizi[x+'_'+y]=kaiguan?'black':'white';
      kaiguan=!kaiguan;
      localStorage.data=JSON.stringify(qizi);
    }
    if(localStorage.data){
    	qizi=JSON.parse(localStorage.data);
    	for (var i in qizi) {
    		 var x=i.split('_')[0];//将'x_y'变成数组[x,y],并且取x
      		 var y=i.split('_')[1];//将'x_y'变成数组[x,y],并且取y
      		 luozi(x,y,(qizi[i]=='black')?true:false);
    	}

    }

    canvas.ondblclick=function(e){
    	e.stopPropagation();
    	localStorage.clear();
    	location.reload();
    }

	/*ctx.fillStyle=lingrad;
	ctx.fillRect(0,0,600,200);*/
}