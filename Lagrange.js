'use strict'

var fs=require('fs');
var readline=require("readline-sync");
var dane=fs.readFileSync("./dane.txt", 'utf8');
console.log(dane);

var xAndy= dane.split(";");
console.log(xAndy);
xs2 = xAndy[0];
ys2 = xAndy[1];
var xs2= xs2.split(",");
var ys2= ys2.split(",");



function lagrange(x,xs=[],ys=[]){
    var t;
    var y=0.0;
for(let i=0;i<xs.length;i++){
    t=1.0;
    for(let j=0;j<xs.length;j++){
        if(j!=i){
            t=t*((x-xs[j])/(xs[i]-xs[j]));

        }
    }
    y+=t*ys[i];
}
return y;
}

function start(){
    var x=readline.question("Podaj x");
    console.log(lagrange(x,xs2,ys2));
}




function Skalar(gx=[],fx=[]){
   var scores = new Array;
   var equal=0;

    for(let i=0;i<gx.length;i++){
        scores[i]=gx[i]*fx[i];
    }

    for(let i=0;i<scores.length;i++){
        equal+=scores[i];
    }

return equal;
}




function Legendra(k, x){
    if(k ==0){
        return 1;
    }
    else if(k==1){
            return x;
    }
    else {
        var kminus1=Legendra(k-1,x);
        var kminus2=Legendra(k-2,x);


        return (((2*k-1)/k)*x*kminus1-((k-1)/k)*kminus2);

    }
}


function alfa(k, x=[], y=[]){

    var temp = new Array;
    var legen=new Array;

    var equal=0;
    for(let i=0;i<x.length;i++){
        legen[i]=Legendra(k,x[i]);

    }

        for(let i=0;i<x.length;i++){
            temp[i]=(Skalar(y,legen))/(Skalar(legen,legen));
        }
       for(let i=0;i<x.length;i++){
           equal+=temp[i];
       }
       return equal;
}

// function Aproxim(k, x=[],y=[], z){
// var temp = new Array;
// // var alfa= alfa(k,x=[],y=[]);
// var kbuff=1;
//
// do{
// for(let i=0;i<x.length;i++) {
//     temp[kbuff] = alfa(kbuff, x, y) * Legendra(kbuff, x[i]);
// }
// kbuff++;
// }while(kbuff!=k);
//
// var equal=0;
// for(let i=0;i<k;i++){
//     equal+=temp[i];
// }
// return equal;
// }


function Aproximation(x=[],y=[],z){
    var temp = new Array;
    let equal=0;

    for(let i=0;i<x.length;i++){
        const fx=Legendra(i,z);
        // console.log(fx);
        const fj=alfa(i,x,y)
        // console.log(fj);
        equal+=fx*fj;
    }
      return equal;
}


// start();

console.log(Legendra(2,0.4));
console.log(Skalar(xs2,ys2));
console.log(Aproximation(xs2,ys2,0.4));
// module.exports=(lagrange(),start());
