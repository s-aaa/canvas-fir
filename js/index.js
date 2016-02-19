window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	var z=[160.5,480.5];//棋盘星点位置信息
	var qizi={};//所有落子数据
    var kaiguan=localStorage.x?false:true;//标示该谁落子
	

	// 横线
	var huaqipan=function(){
		ctx.clearRect(0,0,640,640);
		for (var i = 0; i < 15; i++) {
		/*var lingrad=ctx.createLinearGradient(40,40.5+i*40,600,40.5+i*40);
		lingrad.addColorStop(0.5,'red');
		lingrad.addColorStop(1,'purple');
		ctx.strokeStyle=lingrad;*/
		ctx.beginPath();
		ctx.moveTo(40,40.5+i*40);
		ctx.lineTo(600,40.5+i*40);
		ctx.stroke();
	};
	// 竖线
	
	for (var i = 0; i < 15; i++) {
		/*var lingrad1=ctx.createLinearGradient(40.5+i*40,40,40.5+i*40,600);
		lingrad1.addColorStop(0.5,'yellow');
		lingrad1.addColorStop(1,'green');
		ctx.strokeStyle=lingrad1;*/
		ctx.beginPath();
		ctx.moveTo(40.5+i*40,40);
		ctx.lineTo(40.5+i*40,600);
		ctx.stroke();
	}
	
	}
	huaqipan();
	
	// 圆
	ctx.moveTo(320.5,320.5);
	ctx.arc(320.5,320.5,3,0,Math.PI*2);
	ctx.fill();
	
	for (var i = 0; i < z.length; i++) {
	    for (var j = 0; j < z.length; j++) {
	    	ctx.moveTo(z[i],z[j])
	    	ctx.arc(z[i],z[j],3,0,Math.PI*2);
	    	ctx.fill();
	    }
	}
    

    // 落子
    /*x    number    落子x坐标
      y    number    落子y坐标
      color  boolean  true：black  false：white*/
    var luozi2=function(x,y,color){
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
	
	var qiziimga=document.querySelector("#qiziimg")
	var luozi=function(x,y,color){
		var zx=40*x+40.5-18;
    	var zy=40*y+40.5-18;
    	if(color){
    		ctx.drawImage(qiziimga,0,0,40,40,zx,zy,36,36);
    		//0,0,40,40要显示图片的位置和大小，zx,zy,36,36切片的目标显示的位置和大小
    	}else{
    		ctx.drawImage(qiziimga,40,0,40,40,zx,zy,36,36)
    	}
    	
	}

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
    
    
    canvas.onclick=function(e){
      var x=Math.round((e.offsetX-40.5)/40);
      var y=Math.round((e.offsetY-40.5)/40);
      if(qizi[x+'_'+y]){
      	return;
      }
      luozi(x,y,kaiguan);
      qizi[x+'_'+y]=kaiguan?'black':'white';
      if(kaiguan){
      	if(panduan(x,y,'black')){
      		alert('黑子赢');
      		if(confirm('是否再来一局')){
      			localStorage.clear();
      			qizi={};
      			huaqipan();
      			kaiguan=true;
      			return;
      		}else{
      			canvas.onclick=null;
      		}
      	}
      }else{
      	if(panduan(x,y,'white')){
      		alert('白子赢');
      		if(confirm('是否再来一局')){
      			localStorage.clear();
      			qizi={};
      			huaqipan();
      			kaiguan=true;

      			return;
      		}else{
      			canvas.onclick=null;
      		}
      	}
      }
      kaiguan=!kaiguan;
      localStorage.data=JSON.stringify(qizi);
      if(!kaiguan){
      	localStorage.x=1;
      }else{
      	localStorage.removeItem('x');
      }
    }

    var xy2id=function(x,y){
    	return x+'_'+y;
    }
    var panduan=function(x,y,color){
      var shuju = filter(color);
      var tx,ty,hang=1;shu=1;zuoxie=1;youxie=1;
      
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty)]){tx--;hang++};
      tx=x;ty=y;while( shuju [xy2id(tx+1,ty)]){tx++;hang++};
      if(hang>=5){
      	return true;
      }
      
      tx=x;ty=y;while( shuju [xy2id(tx,ty-1)]){ty--;shu++};
      tx=x;ty=y;while( shuju [xy2id(tx,ty+1)]){ty++;shu++};
      if(shu>=5){
      	return true;
      }

      tx=x;ty=y;while( shuju [xy2id(tx+1,ty-1)]){tx++;ty--;zuoxie++};
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty+1)]){tx--;ty++;zuoxie++};
      if(zuoxie>=5){
      	return true;
      }
      tx=x;ty=y;while( shuju [xy2id(tx+1,ty+1)]){tx--;ty++;youxie++};
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty-1)]){tx++;ty--;youxie++};
      if(youxie>=5){
      	return true;
      }
    }

   var filter=function(color){
    	var r={};
    	for (var i in qizi) {
    		if(qizi[i]==color){
    			r[i]=qizi[i];
    		}
    	}
    	return r;
    }
    /*如果本地存储中有棋盘信息，读取数据并绘制到页面*/
    if(localStorage.data){
    	qizi=JSON.parse(localStorage.data);
    	for (var i in qizi) {
    		 var x=i.split('_')[0];//将'x_y'变成数组[x,y],并且取x
      		 var y=i.split('_')[1];//将'x_y'变成数组[x,y],并且取y
      		 luozi(x,y,(qizi[i]=='black')?true:false);
      		 /*kaiguan=!((qizi[i]=='black')?true:false)*/
      		
    	}

    }

    canvas.ondblclick=function(e){
    	e.stopPropagation();
    }
    document.ondblclick=function(){
    	localStorage.clear();
    	location.reload();
    }
    	

	/*ctx.fillStyle=lingrad;
	ctx.fillRect(0,0,600,200);*/
}