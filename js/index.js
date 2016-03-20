window.onload=function(){

	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	
  // var kaiguan=localStorage.x?false:true;//标示该谁落子
  var W = document.documentElement.clientWidth;
  var _xx = 22;
  var _yy = 6.5;
  var _zz = 314;
  var z = [ 3*_xx + _yy, 11*_xx + _yy];
  var _r = 2;
  var _aa = 320;
  var _qizibanjing  = 9;

  if(W >= 768){
      canvas.width = 600;
      canvas.height = 600;
      _xx = 40;
      _yy = 20.5;
      _zz = 580;
      z = [140.5,460.5];//棋盘星点位置信息
      _r = 3;
      _aa = 600;
      _qizibanjing  = 18;
      canvas.addEventListener('click',handle);
  }

  
  var qizi={};//所有落子数据

	// 横线
	var huaqipan=function(){

		ctx.clearRect(0,0,600,600);
		for (var i = 0; i < 15; i++) {
  		ctx.beginPath();
  		ctx.moveTo(_yy-0.5,_yy+i*_xx);
  		ctx.lineTo(_zz,_yy+i*_xx);
  		ctx.stroke();
  	}
	// 竖线
	
  	for (var i = 0; i < 15; i++) {
  		ctx.beginPath();
  		ctx.moveTo(_yy+i*_xx,_yy-0.5);
  		ctx.lineTo(_yy+i*_xx,_zz);
  		ctx.stroke();
  	}
	
	// 圆
  	ctx.beginPath();
  	ctx.arc(_aa/2+0.5,_aa/2+0.5,_r,0,Math.PI*2);
  	ctx.fill();
  	
  	for (var i = 0; i < z.length; i++) {
  	    for (var j = 0; j < z.length; j++) {
  	    	ctx.moveTo(z[i],z[j])
  	    	ctx.arc(z[i],z[j],_r,0,Math.PI*2);
  	    	ctx.fill();
  	    }
  	}
	}
	huaqipan();
    // 落子
    /*x    number    落子x坐标
      y    number    落子y坐标
      color  boolean  true：black  false：white*/
    var luozi=function(x,y,color){
    	var zx=_xx*x+_yy;
    	var zy=_xx*y+_yy;
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

    	ctx.fillStyle=(color=='black')?black:white;

      ctx.beginPath();
      ctx.arc(zx,zy,_qizibanjing,0,Math.PI*2);
		  ctx.fill();
    }
	
	// var qiziimga=document.querySelector("#qiziimg")
	// var luozi=function(x,y,color){
	// 	var zx=40*x+20.5-18;
 //    	var zy=40*y+20.5-18;
 //    	if(color){
 //    		ctx.drawImage(qiziimga,0,0,40,40,zx,zy,36,36);
 //    		//0,0,40,40要显示图片的位置和大小，zx,zy,36,36切片的目标显示的位置和大小
 //    	}else{
 //    		ctx.drawImage(qiziimga,40,0,40,40,zx,zy,36,36)
 //    	}
    	
	// }
  var ai=function(){
    do{
      var x=Math.floor(Math.random()*15);
      var y=Math.floor(Math.random()*15);
    }while(qizi[x+'_'+y])
    return {x:x,y:y}
  }
  var kongbai={};
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 15; j++) {
      kongbai[i+'_'+j]=true;
    }
   
  }
  var fangshouAI=function(){
    var max=-10000000;
    var xx={};
    for( var i in kongbai){
      var pos=i;
      var x=panduan(Number(pos.split('_')[0]),Number(pos.split('_')[1]),'black');
      if (x>max) {
        max=x;
        xx.x=pos.split('_')[0];
        xx.y=pos.split('_')[1];
      }
    }
    var max2=-10000000;
    var yy={};
    for( var i in kongbai){
      var pos=i;
      var x=panduan(Number(pos.split('_')[0]),Number(pos.split('_')[1]),'white');
      if (x>max2) {
        max2=x;
        yy.x=pos.split('_')[0];
        yy.y=pos.split('_')[1];
      }
    }
    if (max2>=max) {
      return yy;
    }
    return xx;
  }

   

    var handle=function(e){
      var x=Math.round((e.offsetX-_yy)/_xx);
      var y=Math.round((e.offsetY-_yy)/_xx);
      if (e.type=='tap') {
        var x=Math.round((e.position.x-canvas.offsetLeft-_yy)/_xx);
        var y=Math.round((e.position.y-canvas.offsetTop-_yy)/_xx);
      }
      if(qizi[x+'_'+y]){
      	return;
      }
      luozi(x,y,'black');
      qizi[x+'_'+y]='black';
      delete kongbai[x+'_'+y];
      if (panduan(x,y,'black')>=5) {
        alert('黑棋赢');
        location.reload();
      }

      var pos=fangshouAI();
      luozi(pos.x,pos.y,'white');
      qizi[pos.x+'_'+pos.y]='white';
      delete kongbai[pos.x+'_'+pos.y];
      if (panduan(Number(pos.x),Number(pos.y),'white')>=5) {
          alert('白棋赢');
          location.reload();
      }
      // luozi(x,y,kaiguan);
      // qizi[x+'_'+y]=kaiguan?'black':'white';
      // if(kaiguan){
      // 	if(panduan(x,y,'black')){
      // 		alert('黑子赢');
      // 		if(confirm('是否再来一局')){
      // 			localStorage.clear();
      // 			qizi={};
      // 			huaqipan();
      // 			kaiguan=true;
      // 			return;
      // 		}else{
      // 			canvas.onclick=null;
      // 		}
      // 	}
      // }else{
      // 	if(panduan(x,y,'white')){
      // 		alert('白子赢');
      // 		if(confirm('是否再来一局')){
      // 			localStorage.clear();
      // 			qizi={};
      // 			huaqipan();
      // 			kaiguan=true;
      // 			return;
      // 		}else{
      // 			canvas.onclick=null;
      // 		}
      // 	}
      // }
      // kaiguan=!kaiguan;
      // localStorage.data=JSON.stringify(qizi);
      // if('white'){
      // 	localStorage.x=1;
      // }else{
      // 	localStorage.removeItem('x');
      // }
    }

 touch.on(canvas,'tap',handle)
    var xy2id=function(x,y){
    	return x+'_'+y;
    }
    var panduan=function(x,y,color){
      var shuju = filter(color);
      var tx,ty,hang=1;shu=1;zuoxie=1;youxie=1;
      
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty)]){tx--;hang++};
      tx=x;ty=y;while( shuju [xy2id(tx+1,ty)]){tx++;hang++};
      // if(hang>=5){
      // 	return true;
      // }
      
      tx=x;ty=y;while( shuju [xy2id(tx,ty-1)]){ty--;shu++};
      tx=x;ty=y;while( shuju [xy2id(tx,ty+1)]){ty++;shu++};
      // if(shu>=5){
      // 	return true;
      // }

      tx=x;ty=y;while( shuju [xy2id(tx+1,ty-1)]){tx++;ty--;zuoxie++};
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty+1)]){tx--;ty++;zuoxie++};
      // if(zuoxie>=5){
      // 	return true;
      // }
      tx=x;ty=y;while( shuju [xy2id(tx+1,ty+1)]){tx--;ty++;youxie++};
      tx=x;ty=y;while( shuju [xy2id(tx-1,ty-1)]){tx++;ty--;youxie++};
      // if(youxie>=5){
      // 	return true;
      // }
      return Math.max(hang,shu,zuoxie,youxie);
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
    // if(localStorage.data){
    // 	qizi=JSON.parse(localStorage.data);
    // 	for (var i in qizi) {
    // 		 var x=i.split('_')[0];//将'x_y'变成数组[x,y],并且取x
    //   		 var y=i.split('_')[1];//将'x_y'变成数组[x,y],并且取y
    //   		 luozi(x,y,(qizi[i]=='black')?'black':'white');
    //   		 /*kaiguan=!((qizi[i]=='black')?true:false)*/
      		
    // 	}

    // }

   
 

    
}