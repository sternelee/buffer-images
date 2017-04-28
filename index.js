const fs = require('fs');

// mergethe picture you need
// 需要合并的图片数组
const pics = ["images/head_kv/a1.png",
			"images/head_kv/背景图.jpg",
			"images/head_kv/background.jpg",
			"images/head_kv/12.GIF",
			"images/head_kv/23.jpg",
			"images/1.jpg",
			"images/2.jpg",
			"images/3.jpg"];

// 初始化 arraybuffer
let buffers = new ArrayBuffer(0);

let s = 0, n = 0;
for(let i = 0; i < pics.length; i++){
	n += i;
}

for(let i = 0; i < pics.length; i++){
	let pic = pics[i],
		l = pic.length;
	fs.readFile(pic, function(err,data){
		if(err) throw err;
		let m = 0,
		      v = data,
			  q = data.length;
		let a = new ArrayBuffer(l*4+4+4+q),
			  d = new DataView(a);
		d.setUint32(0,l,!1);
		m += 4;
        for(let j = 0; j < l; j++){
            let c = pic.charCodeAt(j);
            d.setUint32(m,c,!1);
            m += 4;
        }
        d.setUint32(m,q,!1);
        m += 4;
        for(let k = 0; k < q; k++){
            d.setUint8(m,v[k],!1);
            m += 1;
        }
        buffers = _appendBuffer(buffers,a);
        s += i;
        // 判断当前是否读完
        if(s == n){
        	let imgv = new Uint8Array(buffers);
        	fs.writeFile('out.png', imgv, (err) => {
        		if (err) throw err;
  				console.log('It\'s saved!');
        	});
        }
	});
}

// arraybuffer 合并
var _appendBuffer = function(buffer1, buffer2) {
    var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp.buffer;
};

