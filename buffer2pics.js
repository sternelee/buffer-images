/**
 * 
 * 
 * @param {any} src 合成的图片路径
 * @param {any} callback 解析后执行的函数
 * @param {o,u,f} o为为路径名称组, u为图片组, f为buffer组
 */
;function buffer2pics(src,callback){
	var n = function(t) {
            var n = t.currentTarget,
                r = n.response,
                i = new DataView(r),
                s = 0,
                o = [],
                u = [],
                f = [];
            while (s < i.byteLength) {
                var l = i.getUint32(s, !1);
                s += 4;
                var c = "";
                for (var h = 0; h < l; h++) {
                    var p = i.getUint32(s, !1);
                    s += 4,
                        c += String.fromCharCode(p)
                }
                var d = i.getUint32(s, !1);
                s += 4;
                var v = new Uint8Array(r, s, d);

                s += d,
                    o.push(c),
                    f.push(v)
            }
            var m = 0,
                g = window.URL || window.webkitURL || window,
                y = function() {
                    if (m >= f.length){
                    	callback(o,u,f);
                    }
                    else {
                        var t = f[m],
                            n = document.createElement("img");
                        n.onload = function(e) {
                            try {
                                g.revokeObjectURL(e.currentTarget.src)
                            } catch (t) {}
                            u.push(n),
                                m += 1,
                                y()
                        };
                        try {
                            n.src = g.createObjectURL(new Blob([t]))

                        } catch (r) {
                            var i = o[m].substr(o[m].length - 3, 3).toLowerCase(),
                                s;
                            i == "jpg" || i == "jpeg" ? s = "data:image/jpeg;base64," : i == "png" ? s = "data:image/png;base64," : i == "gif" && (s = "data:image/gif;base64,"),
                                n.src = s + a.fromByteArray(t);
                        }
                    }
                };
            y()
        },
        t = (function() {
                var e = null;
                if (window["XMLHttpRequest"] != undefined)
                    e = new XMLHttpRequest;
                else
                    try {
                        e = new ActiveXObject("MSXML2.XMLHTTP")
                    } catch (t) {
                        try {
                            e = new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (t) {
                            e = null
                        }
                    }
                return e
            })(),
      r =  t;
	r.responseType = "arraybuffer",
    r.open("get", src, !0),
    r.onload = n,
    r.onprogress = function(n) {
    	// console.log("loaded: " + n.loaded + ", total: " + n.total);
    },
    r.onerror = function(t, n) {
    	// console.log('error: '+t);
    },
    r.send()
};