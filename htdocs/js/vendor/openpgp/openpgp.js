 /*! OpenPGPjs.org  this is LGPL licensed code, see LICENSE/our website for more information.- v0.4.1 - 2014-02-25 */
 
 !function(a) {
    "object" == typeof exports ? module.exports = a() : "function" == typeof define && define.amd ? define(a) : "undefined" != typeof window ? window.openpgp = a() : "undefined" != typeof global ? global.openpgp = a() : "undefined" != typeof self && (self.openpgp = a())
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i)
                        return i(g, !0);
                    if (f)
                        return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {exports: {}};
                b[g][0].call(j.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, j, j.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++)
            e(d[g]);
        return e
    }({1: [function(a, b, c) {
                function d(a, b) {
                    return this instanceof d ? (this.text = a.replace(/\r/g, "").replace(/[\t ]+\n/g, "\n").replace(/\n/g, "\r\n"), void (this.packets = b || new g.List)) : new d(b)
                }
                function e(a) {
                    var b = i.decode(a);
                    if (b.type !== h.armor.signed)
                        throw new Error("No cleartext signed message.");
                    var c = new g.List;
                    c.read(b.data);
                    var e = new d(b.text, c);
                    return e
                }
                var f = a("./config"), g = a("./packet"), h = a("./enums.js"), i = a("./encoding/armor.js");
                d.prototype.getSigningKeyIds = function() {
                    var a = [], b = this.packets.filterByTag(h.packet.signature);
                    return b.forEach(function(b) {
                        a.push(b.issuerKeyId)
                    }), a
                }, d.prototype.sign = function(a) {
                    var b = new g.List, c = new g.Literal;
                    c.setText(this.text);
                    for (var d = 0; d < a.length; d++) {
                        var e = new g.Signature;
                        e.signatureType = h.signature.text, e.hashAlgorithm = f.prefer_hash_algorithm;
                        var i = a[d].getSigningKeyPacket();
                        if (e.publicKeyAlgorithm = i.algorithm, !i.isDecrypted)
                            throw new Error("Private key is not decrypted.");
                        e.sign(i, c), b.push(e)
                    }
                    this.packets = b
                }, d.prototype.verify = function(a) {
                    var b = [], c = this.packets.filterByTag(h.packet.signature), d = new g.Literal;
                    return d.setText(this.text), a.forEach(function(a) {
                        for (var e = 0; e < c.length; e++) {
                            var f = a.getPublicKeyPacket([c[e].issuerKeyId]);
                            if (f) {
                                var g = {};
                                g.keyid = c[e].issuerKeyId, g.valid = c[e].verify(f, d), b.push(g);
                                break
                            }
                        }
                    }), b
                }, d.prototype.getText = function() {
                    return this.text.replace(/\r\n/g, "\n")
                }, d.prototype.armor = function() {
                    var a = {hash: h.read(h.hash, f.prefer_hash_algorithm).toUpperCase(),text: this.text,data: this.packets.write()};
                    return i.encode(h.armor.signed, a)
                }, c.CleartextMessage = d, c.readArmored = e
            }, {"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],2: [function(a, b) {
                JXG = {exists: function(a) {
                        return function(b) {
                            return !(b === a || null === b)
                        }
                    }()}, JXG.decompress = function(a) {
                    return unescape(new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(a)).unzip()[0][0])
                }, JXG.Util = {}, JXG.Util.Unzip = function(a) {
                    function b() {
                        return J += 8, H < G.length ? G[H++] : -1
                    }
                    function c() {
                        I = 1
                    }
                    function d() {
                        var a;
                        return J++, a = 1 & I, I >>= 1, 0 === I && (I = b(), a = 1 & I, I = I >> 1 | 128), a
                    }
                    function e(a) {
                        for (var b = 0, c = a; c--; )
                            b = b << 1 | d();
                        return a && (b = A[b] >> 8 - a), b
                    }
                    function f() {
                        y = 0
                    }
                    function g(a) {
                        r++, x[y++] = a, t.push(String.fromCharCode(a)), 32768 == y && (y = 0)
                    }
                    function h() {
                        this.b0 = 0, this.b1 = 0, this.jump = null, this.jumppos = -1
                    }
                    function i() {
                        for (; ; ) {
                            if (S[R] >= U)
                                return -1;
                            if (T[S[R]] == R)
                                return S[R]++;
                            S[R]++
                        }
                    }
                    function j() {
                        var a, b = Q[P];
                        if (u && document.write("<br>len:" + R + " treepos:" + P), 17 == R)
                            return -1;
                        if (P++, R++, a = i(), u && document.write("<br>IsPat " + a), a >= 0)
                            b.b0 = a, u && document.write("<br>b0 " + b.b0);
                        else if (b.b0 = 32768, u && document.write("<br>b0 " + b.b0), j())
                            return -1;
                        if (a = i(), a >= 0)
                            b.b1 = a, u && document.write("<br>b1 " + b.b1), b.jump = null;
                        else if (b.b1 = 32768, u && document.write("<br>b1 " + b.b1), b.jump = Q[P], b.jumppos = P, j())
                            return -1;
                        return R--, 0
                    }
                    function k(a, b, c, d) {
                        var e;
                        for (u && document.write("currentTree " + a + " numval " + b + " lengths " + c + " show " + d), Q = a, P = 0, T = c, U = b, e = 0; 17 > e; e++)
                            S[e] = 0;
                        if (R = 0, j())
                            return u && alert("invalid huffman tree\n"), -1;
                        if (u) {
                            document.write("<br>Tree: " + Q.length);
                            for (var f = 0; 32 > f; f++)
                                document.write("Places[" + f + "].b0=" + Q[f].b0 + "<br>"), document.write("Places[" + f + "].b1=" + Q[f].b1 + "<br>")
                        }
                        return 0
                    }
                    function l(a) {
                        for (var b, c, e, f = 0, g = a[f]; ; )
                            if (e = d(), u && document.write("b=" + e), e) {
                                if (!(32768 & g.b1))
                                    return u && document.write("ret1"), g.b1;
                                for (g = g.jump, b = a.length, c = 0; b > c; c++)
                                    if (a[c] === g) {
                                        f = c;
                                        break
                                    }
                            } else {
                                if (!(32768 & g.b0))
                                    return u && document.write("ret2"), g.b0;
                                f++, g = a[f]
                            }
                    }
                    function m() {
                        var a, i, j, m, n, o, p;
                        do {
                            switch (a = d(), j = e(2)) {
                                case 0:
                                    u && alert("Stored\n");
                                    break;
                                case 1:
                                    u && alert("Fixed Huffman codes\n");
                                    break;
                                case 2:
                                    u && alert("Dynamic Huffman codes\n");
                                    break;
                                case 3:
                                    u && alert("Reserved block type!!\n");
                                    break;
                                default:
                                    u && alert("Unexpected value %d!\n", j)
                            }
                            if (0 === j) {
                                var q, r;
                                for (c(), q = b(), q |= b() << 8, r = b(), r |= b() << 8, 65535 & (q ^ ~r) && document.write("BlockLen checksum mismatch\n"); q--; )
                                    i = b(), g(i)
                            } else if (1 == j)
                                for (; ; )
                                    if (n = A[e(7)] >> 1, n > 23 ? (n = n << 1 | d(), n > 199 ? (n -= 128, n = n << 1 | d()) : (n -= 48, n > 143 && (n += 136))) : n += 256, 256 > n)
                                        g(n);
                                    else {
                                        if (256 == n)
                                            break;
                                        for (n -= 257, o = e(C[n]) + B[n], n = A[e(5)] >> 3, E[n] > 8 ? (p = e(8), p |= e(E[n] - 8) << 8) : p = e(E[n]), p += D[n], n = 0; o > n; n++)
                                            i = x[y - p & 32767], g(i)
                                    }
                            else if (2 == j) {
                                var s, t, v, w, z = new Array(320);
                                for (t = 257 + e(5), v = 1 + e(5), w = 4 + e(4), n = 0; 19 > n; n++)
                                    z[n] = 0;
                                for (n = 0; w > n; n++)
                                    z[F[n]] = e(3);
                                for (o = O.length, m = 0; o > m; m++)
                                    O[m] = new h;
                                if (k(O, 19, z, 0))
                                    return f(), 1;
                                if (u) {
                                    document.write("<br>distanceTree");
                                    for (var G = 0; G < O.length; G++)
                                        document.write("<br>" + O[G].b0 + " " + O[G].b1 + " " + O[G].jump + " " + O[G].jumppos)
                                }
                                s = t + v, m = 0;
                                var H = -1;
                                for (u && document.write("<br>n=" + s + " bits: " + J + "<br>"); s > m; )
                                    if (H++, n = l(O), u && document.write("<br>" + H + " i:" + m + " decode: " + n + "    bits " + J + "<br>"), 16 > n)
                                        z[m++] = n;
                                    else if (16 == n) {
                                        var I;
                                        if (n = 3 + e(2), m + n > s)
                                            return f(), 1;
                                        for (I = m ? z[m - 1] : 0; n--; )
                                            z[m++] = I
                                    } else {
                                        if (n = 17 == n ? 3 + e(3) : 11 + e(7), m + n > s)
                                            return f(), 1;
                                        for (; n--; )
                                            z[m++] = 0
                                    }
                                for (o = N.length, m = 0; o > m; m++)
                                    N[m] = new h;
                                if (k(N, t, z, 0))
                                    return f(), 1;
                                for (o = N.length, m = 0; o > m; m++)
                                    O[m] = new h;
                                var K = [];
                                for (m = t; m < z.length; m++)
                                    K[m - t] = z[m];
                                if (k(O, v, K, 0))
                                    return f(), 1;
                                u && document.write("<br>literalTree");
                                a: for (; ; )
                                    if (n = l(N), n >= 256) {
                                        if (n -= 256, 0 === n)
                                            break;
                                        for (n--, o = e(C[n]) + B[n], n = l(O), E[n] > 8 ? (p = e(8), p |= e(E[n] - 8) << 8) : p = e(E[n]), p += D[n]; o--; ) {
                                            if (0 > y - p)
                                                break a;
                                            i = x[y - p & 32767], g(i)
                                        }
                                    } else
                                        g(n)
                            }
                        } while (!a);
                        return f(), c(), 0
                    }
                    function n() {
                        u && alert("NEXTFILE"), t = [];
                        var a = [];
                        if (z = !1, a[0] = b(), a[1] = b(), u && alert("type: " + a[0] + " " + a[1]), a[0] == parseInt("78", 16) && a[1] == parseInt("da", 16) && (u && alert("GEONExT-GZIP"), m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "geonext.gxt", v++), a[0] == parseInt("78", 16) && a[1] == parseInt("9c", 16) && (u && alert("ZLIB"), m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "ZLIB", v++), a[0] == parseInt("1f", 16) && a[1] == parseInt("8b", 16) && (u && alert("GZIP"), o(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "file", v++), a[0] == parseInt("50", 16) && a[1] == parseInt("4b", 16) && (z = !0, a[2] = b(), a[3] = b(), a[2] == parseInt("3", 16) && a[3] == parseInt("4", 16))) {
                            a[0] = b(), a[1] = b(), u && alert("ZIP-Version: " + a[1] + " " + a[0] / 10 + "." + a[0] % 10), p = b(), p |= b() << 8, u && alert("gpflags: " + p);
                            var c = b();
                            c |= b() << 8, u && alert("method: " + c), b(), b(), b(), b();
                            var d = b();
                            d |= b() << 8, d |= b() << 16, d |= b() << 24;
                            var e = b();
                            e |= b() << 8, e |= b() << 16, e |= b() << 24;
                            var f = b();
                            f |= b() << 8, f |= b() << 16, f |= b() << 24, u && alert("local CRC: " + d + "\nlocal Size: " + f + "\nlocal CompSize: " + e);
                            var g = b();
                            g |= b() << 8;
                            var h = b();
                            h |= b() << 8, u && alert("filelen " + g), j = 0, L = [];
                            for (var i; g--; )
                                i = b(), "/" == i | ":" == i ? j = 0 : K - 1 > j && (L[j++] = String.fromCharCode(i));
                            u && alert("nameBuf: " + L), s || (s = L);
                            for (var j = 0; h > j; )
                                i = b(), j++;
                            q = 4294967295, r = 0, 0 === f && "/" == fileOut.charAt(s.length - 1) && u && alert("skipdir"), 8 == c && (m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = L.join(""), v++), o()
                        }
                    }
                    function o() {
                        var a, c, d, e, f, g, h = [];
                        if (8 & p && (h[0] = b(), h[1] = b(), h[2] = b(), h[3] = b(), h[0] == parseInt("50", 16) && h[1] == parseInt("4b", 16) && h[2] == parseInt("07", 16) && h[3] == parseInt("08", 16) ? (a = b(), a |= b() << 8, a |= b() << 16, a |= b() << 24) : a = h[0] | h[1] << 8 | h[2] << 16 | h[3] << 24, c = b(), c |= b() << 8, c |= b() << 16, c |= b() << 24, d = b(), d |= b() << 8, d |= b() << 16, d |= b() << 24, u && alert("CRC:")), z && n(), h[0] = b(), 8 != h[0])
                            return u && alert("Unknown compression method!"), 0;
                        if (p = b(), u && p & ~parseInt("1f", 16) && alert("Unknown flags set!"), b(), b(), b(), b(), b(), e = b(), 4 & p)
                            for (h[0] = b(), h[2] = b(), R = h[0] + 256 * h[1], u && alert("Extra field size: " + R), f = 0; R > f; f++)
                                b();
                        if (8 & p) {
                            for (f = 0, L = []; g = b(); )
                                ("7" == g || ":" == g) && (f = 0), K - 1 > f && (L[f++] = g);
                            u && alert("original file name: " + L)
                        }
                        if (16 & p)
                            for (; g = b(); )
                                ;
                        2 & p && (b(), b()), m(), a = b(), a |= b() << 8, a |= b() << 16, a |= b() << 24, d = b(), d |= b() << 8, d |= b() << 16, d |= b() << 24, z && n()
                    }
                    var p, q, r, s, t = [], u = !1, v = 0, w = [], x = new Array(32768), y = 0, z = !1, A = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255], B = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], C = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99], D = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], E = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = a, H = 0, I = 1, J = 0, K = 256, L = [], M = 288, N = new Array(M), O = new Array(32), P = 0, Q = null, R = (new Array(64), new Array(64), 0), S = new Array(17);
                    S[0] = 0;
                    var T, U;
                    JXG.Util.Unzip.prototype.unzipFile = function(a) {
                        var b;
                        for (this.unzip(), b = 0; b < w.length; b++)
                            if (w[b][1] == a)
                                return w[b][0]
                    }, JXG.Util.Unzip.prototype.deflate = function() {
                        t = [];
                        return z = !1, m(), u && alert(t.join("")), w[v] = new Array(2), w[v][0] = t.join(""), w[v][1] = "DEFLATE", v++, w
                    }, JXG.Util.Unzip.prototype.unzip = function() {
                        return u && alert(G), n(), w
                    }
                }, JXG.Util.Base64 = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode: function(a) {
                        var b, c, d, e, f, g, h, i = [], j = 0;
                        for (a = JXG.Util.Base64._utf8_encode(a); j < a.length; )
                            b = a.charCodeAt(j++), c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = b >> 2, f = (3 & b) << 4 | c >> 4, g = (15 & c) << 2 | d >> 6, h = 63 & d, isNaN(c) ? g = h = 64 : isNaN(d) && (h = 64), i.push([this._keyStr.charAt(e), this._keyStr.charAt(f), this._keyStr.charAt(g), this._keyStr.charAt(h)].join(""));
                        return i.join("")
                    },decode: function(a, b) {
                        var c, d, e, f, g, h, i, j = [], k = 0;
                        for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); k < a.length; )
                            f = this._keyStr.indexOf(a.charAt(k++)), g = this._keyStr.indexOf(a.charAt(k++)), h = this._keyStr.indexOf(a.charAt(k++)), i = this._keyStr.indexOf(a.charAt(k++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, j.push(String.fromCharCode(c)), 64 != h && j.push(String.fromCharCode(d)), 64 != i && j.push(String.fromCharCode(e));
                        return j = j.join(""), b && (j = JXG.Util.Base64._utf8_decode(j)), j
                    },_utf8_encode: function(a) {
                        a = a.replace(/\r\n/g, "\n");
                        for (var b = "", c = 0; c < a.length; c++) {
                            var d = a.charCodeAt(c);
                            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
                        }
                        return b
                    },_utf8_decode: function(a) {
                        for (var b = [], c = 0, d = 0, e = 0, f = 0; c < a.length; )
                            d = a.charCodeAt(c), 128 > d ? (b.push(String.fromCharCode(d)), c++) : d > 191 && 224 > d ? (e = a.charCodeAt(c + 1), b.push(String.fromCharCode((31 & d) << 6 | 63 & e)), c += 2) : (e = a.charCodeAt(c + 1), f = a.charCodeAt(c + 2), b.push(String.fromCharCode((15 & d) << 12 | (63 & e) << 6 | 63 & f)), c += 3);
                        return b.join("")
                    },_destrip: function(a, b) {
                        var c, d, e = [], f = [];
                        for (null === b && (b = 76), a.replace(/ /g, ""), c = a.length / b, d = 0; c > d; d++)
                            e[d] = a.substr(d * b, b);
                        for (c != a.length / b && (e[e.length] = a.substr(c * b, a.length - c * b)), d = 0; d < e.length; d++)
                            f.push(e[d]);
                        return f.join("\n")
                    },decodeAsArray: function(a) {
                        var b, c = this.decode(a), d = [];
                        for (b = 0; b < c.length; b++)
                            d[b] = c.charCodeAt(b);
                        return d
                    },decodeGEONExT: function(a) {
                        return decodeAsArray(destrip(a), !1)
                    }}, JXG.Util.asciiCharCodeAt = function(a, b) {
                    var c = a.charCodeAt(b);
                    if (c > 255)
                        switch (c) {
                            case 8364:
                                c = 128;
                                break;
                            case 8218:
                                c = 130;
                                break;
                            case 402:
                                c = 131;
                                break;
                            case 8222:
                                c = 132;
                                break;
                            case 8230:
                                c = 133;
                                break;
                            case 8224:
                                c = 134;
                                break;
                            case 8225:
                                c = 135;
                                break;
                            case 710:
                                c = 136;
                                break;
                            case 8240:
                                c = 137;
                                break;
                            case 352:
                                c = 138;
                                break;
                            case 8249:
                                c = 139;
                                break;
                            case 338:
                                c = 140;
                                break;
                            case 381:
                                c = 142;
                                break;
                            case 8216:
                                c = 145;
                                break;
                            case 8217:
                                c = 146;
                                break;
                            case 8220:
                                c = 147;
                                break;
                            case 8221:
                                c = 148;
                                break;
                            case 8226:
                                c = 149;
                                break;
                            case 8211:
                                c = 150;
                                break;
                            case 8212:
                                c = 151;
                                break;
                            case 732:
                                c = 152;
                                break;
                            case 8482:
                                c = 153;
                                break;
                            case 353:
                                c = 154;
                                break;
                            case 8250:
                                c = 155;
                                break;
                            case 339:
                                c = 156;
                                break;
                            case 382:
                                c = 158;
                                break;
                            case 376:
                                c = 159
                        }
                    return c
                }, JXG.Util.utf8Decode = function(a) {
                    var b, c = [], d = 0, e = 0, f = 0;
                    if (!JXG.exists(a))
                        return "";
                    for (; d < a.length; )
                        e = a.charCodeAt(d), 128 > e ? (c.push(String.fromCharCode(e)), d++) : e > 191 && 224 > e ? (f = a.charCodeAt(d + 1), c.push(String.fromCharCode((31 & e) << 6 | 63 & f)), d += 2) : (f = a.charCodeAt(d + 1), b = a.charCodeAt(d + 2), c.push(String.fromCharCode((15 & e) << 12 | (63 & f) << 6 | 63 & b)), d += 3);
                    return c.join("")
                }, JXG.Util.genUUID = function() {
                    for (var a, b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), c = new Array(36), d = 0, e = 0; 36 > e; e++)
                        8 == e || 13 == e || 18 == e || 23 == e ? c[e] = "-" : 14 == e ? c[e] = "4" : (2 >= d && (d = 33554432 + 16777216 * Math.random() | 0), a = 15 & d, d >>= 4, c[e] = b[19 == e ? 3 & a | 8 : a]);
                    return c.join("")
                }, b.exports = JXG
            }, {}],3: [function(a, b) {
                var c = a("../enums.js");
                b.exports = {prefer_hash_algorithm: c.hash.sha256,encryption_cipher: c.symmetric.aes256,compression: c.compression.zip,show_version: !0,show_comment: !0,integrity_protect: !0,keyserver: "keyserver.linux.it",versionstring: "DestructEngine v0.2",commentstring: "http://chat.gd/keys/",node_store: "./openpgp.store",debug: !1}
            }, {"../enums.js": 30}],4: [function(a, b) {
                b.exports = a("./config.js")
            }, {"./config.js": 3}],5: [function(a, b) {
                "use strict";
                var c = a("../util.js"), d = a("./cipher");
                b.exports = {encrypt: function(a, b, e, f, g) {
                        b = new d[b](f);
                        var h = b.blockSize, i = new Uint8Array(h), j = new Uint8Array(h);
                        a = a + a.charAt(h - 2) + a.charAt(h - 1), c.print_debug("prefixrandom:" + c.hexstrdump(a));
                        var k, l, m = "";
                        for (k = 0; h > k; k++)
                            i[k] = 0;
                        for (j = b.encrypt(i), k = 0; h > k; k++)
                            m += String.fromCharCode(j[k] ^ a.charCodeAt(k));
                        for (k = 0; h > k; k++)
                            i[k] = m.charCodeAt(k);
                        if (j = b.encrypt(i), m += String.fromCharCode(j[0] ^ a.charCodeAt(h)), m += String.fromCharCode(j[1] ^ a.charCodeAt(h + 1)), g)
                            for (k = 0; h > k; k++)
                                i[k] = m.charCodeAt(k + 2);
                        else
                            for (k = 0; h > k; k++)
                                i[k] = m.charCodeAt(k);
                        if (j = b.encrypt(i), g) {
                            for (k = 0; h > k; k++)
                                m += String.fromCharCode(j[k] ^ e.charCodeAt(k));
                            for (l = h + 2; l < e.length; l += h) {
                                for (k = 0; h > k; k++)
                                    i[k] = m.charCodeAt(l + k);
                                for (j = b.encrypt(i), k = 0; h > k; k++)
                                    m += String.fromCharCode(j[k] ^ e.charCodeAt(l - 2 + k))
                            }
                        } else {
                            for (e = "  " + e, k = 2; h > k; k++)
                                m += String.fromCharCode(j[k] ^ e.charCodeAt(k));
                            var n, o = m.substring(0, 2 * h), p = m.substring(h);
                            for (l = h; l < e.length; l += h) {
                                for (k = 0; h > k; k++)
                                    i[k] = p.charCodeAt(k);
                                for (p = "", j = b.encrypt(i), k = 0; h > k; k++)
                                    n = String.fromCharCode(j[k] ^ e.charCodeAt(l + k)), o += n, p += n
                            }
                            m = o
                        }
                        return m = m.substring(0, e.length + 2 + h)
                    },mdc: function(a, b, e) {
                        a = new d[a](b);
                        var f, g = a.blockSize, h = new Uint8Array(g), i = new Uint8Array(g);
                        for (f = 0; g > f; f++)
                            h[f] = 0;
                        for (h = a.encrypt(h), f = 0; g > f; f++)
                            i[f] = e.charCodeAt(f), h[f] ^= i[f];
                        return i = a.encrypt(i), c.bin2str(h) + String.fromCharCode(i[0] ^ e.charCodeAt(g)) + String.fromCharCode(i[1] ^ e.charCodeAt(g + 1))
                    },decrypt: function(a, b, c, e) {
                        a = new d[a](b);
                        var f, g = a.blockSize, h = new Uint8Array(g), i = new Uint8Array(g), j = "", k = "";
                        for (f = 0; g > f; f++)
                            h[f] = 0;
                        for (h = a.encrypt(h), f = 0; g > f; f++)
                            i[f] = c.charCodeAt(f), h[f] ^= i[f];
                        if (i = a.encrypt(i), h[g - 2] != (i[0] ^ c.charCodeAt(g)) || h[g - 1] != (i[1] ^ c.charCodeAt(g + 1)))
                            throw new Error("Invalid data.");
                        if (e) {
                            for (f = 0; g > f; f++)
                                h[f] = c.charCodeAt(f + 2);
                            for (j = g + 2; j < c.length; j += g)
                                for (i = a.encrypt(h), f = 0; g > f && f + j < c.length; f++)
                                    h[f] = c.charCodeAt(j + f), k += String.fromCharCode(i[f] ^ h[f])
                        } else {
                            for (f = 0; g > f; f++)
                                h[f] = c.charCodeAt(f);
                            for (j = g; j < c.length; j += g)
                                for (i = a.encrypt(h), f = 0; g > f && f + j < c.length; f++)
                                    h[f] = c.charCodeAt(j + f), k += String.fromCharCode(i[f] ^ h[f])
                        }
                        return j = e ? 0 : 2, k = k.substring(j, c.length - g - 2 + j)
                    },normalEncrypt: function(a, b, e, f) {
                        a = new d[a](b);
                        var g = a.blockSize, h = "", i = "", j = 0, k = "", l = "";
                        for (i = f.substring(0, g); e.length > g * j; ) {
                            var m = a.encrypt(c.str2bin(i));
                            h = e.substring(j * g, j * g + g);
                            for (var n = 0; n < h.length; n++)
                                l += String.fromCharCode(h.charCodeAt(n) ^ m[n]);
                            i = l, l = "", k += i, j++
                        }
                        return k
                    },normalDecrypt: function(a, b, e, f) {
                        a = new d[a](b);
                        var g, h = a.blockSize, i = "", j = 0, k = "", l = 0;
                        if (null === f)
                            for (g = 0; h > g; g++)
                                i += String.fromCharCode(0);
                        else
                            i = f.substring(0, h);
                        for (; e.length > h * j; ) {
                            var m = a.encrypt(c.str2bin(i));
                            for (i = e.substring(j * h + l, j * h + h + l), g = 0; g < i.length; g++)
                                k += String.fromCharCode(i.charCodeAt(g) ^ m[g]);
                            j++
                        }
                        return k
                    }}
            }, {"../util.js": 61,"./cipher": 10}],6: [function(a, b) {
                "use strict";
                function c(a) {
                    return 255 & a
                }
                function d(a) {
                    return a >> 8 & 255
                }
                function e(a) {
                    return a >> 16 & 255
                }
                function f(a) {
                    return a >> 24 & 255
                }
                function g(a, b, c, e) {
                    return d(o[255 & a]) | d(o[b >> 8 & 255]) << 8 | d(o[c >> 16 & 255]) << 16 | d(o[e >>> 24]) << 24
                }
                function h(a) {
                    var b, c, d = a.length, e = new Array(d / 4);
                    if (a && !(d % 4)) {
                        for (b = 0, c = 0; d > c; c += 4)
                            e[b++] = a[c] | a[c + 1] << 8 | a[c + 2] << 16 | a[c + 3] << 24;
                        return e
                    }
                }
                function i(a) {
                    var b, g = 0, h = a.length, i = new Array(4 * h);
                    for (b = 0; h > b; b++)
                        i[g++] = c(a[b]), i[g++] = d(a[b]), i[g++] = e(a[b]), i[g++] = f(a[b]);
                    return i
                }
                function j(a) {
                    var b, g, h, i, j, k, l = new Array(t + 1), o = a.length, p = new Array(s), q = new Array(s), r = 0;
                    if (16 == o)
                        k = 10, b = 4;
                    else if (24 == o)
                        k = 12, b = 6;
                    else {
                        if (32 != o)
                            throw new Error("Invalid key-length for AES key:" + o);
                        k = 14, b = 8
                    }
                    for (g = 0; t + 1 > g; g++)
                        l[g] = new Uint32Array(4);
                    for (g = 0, h = 0; o > h; h++, g += 4)
                        p[h] = a.charCodeAt(g) | a.charCodeAt(g + 1) << 8 | a.charCodeAt(g + 2) << 16 | a.charCodeAt(g + 3) << 24;
                    for (h = b - 1; h >= 0; h--)
                        q[h] = p[h];
                    for (i = 0, j = 0, h = 0; b > h && k + 1 > i; ) {
                        for (; b > h && 4 > j; h++, j++)
                            l[i][j] = q[h];
                        4 == j && (i++, j = 0)
                    }
                    for (; k + 1 > i; ) {
                        var u = q[b - 1];
                        if (q[0] ^= n[d(u)] | n[e(u)] << 8 | n[f(u)] << 16 | n[c(u)] << 24, q[0] ^= m[r++], 8 != b)
                            for (h = 1; b > h; h++)
                                q[h] ^= q[h - 1];
                        else {
                            for (h = 1; b / 2 > h; h++)
                                q[h] ^= q[h - 1];
                            for (u = q[b / 2 - 1], q[b / 2] ^= n[c(u)] | n[d(u)] << 8 | n[e(u)] << 16 | n[f(u)] << 24, h = b / 2 + 1; b > h; h++)
                                q[h] ^= q[h - 1]
                        }
                        for (h = 0; b > h && k + 1 > i; ) {
                            for (; b > h && 4 > j; h++, j++)
                                l[i][j] = q[h];
                            4 == j && (i++, j = 0)
                        }
                    }
                    return {rounds: k,rk: l}
                }
                function k(a, b) {
                    var c, d, e, f, j, k = h(a), l = b.rounds, m = k[0], n = k[1], s = k[2], t = k[3];
                    for (c = 0; l - 1 > c; c++)
                        d = m ^ b.rk[c][0], e = n ^ b.rk[c][1], f = s ^ b.rk[c][2], j = t ^ b.rk[c][3], m = o[255 & d] ^ p[e >> 8 & 255] ^ q[f >> 16 & 255] ^ r[j >>> 24], n = o[255 & e] ^ p[f >> 8 & 255] ^ q[j >> 16 & 255] ^ r[d >>> 24], s = o[255 & f] ^ p[j >> 8 & 255] ^ q[d >> 16 & 255] ^ r[e >>> 24], t = o[255 & j] ^ p[d >> 8 & 255] ^ q[e >> 16 & 255] ^ r[f >>> 24];
                    return c = l - 1, d = m ^ b.rk[c][0], e = n ^ b.rk[c][1], f = s ^ b.rk[c][2], j = t ^ b.rk[c][3], k[0] = g(d, e, f, j) ^ b.rk[l][0], k[1] = g(e, f, j, d) ^ b.rk[l][1], k[2] = g(f, j, d, e) ^ b.rk[l][2], k[3] = g(j, d, e, f) ^ b.rk[l][3], i(k)
                }
                function l(a) {
                    var b = function(a) {
                        this.key = j(a), this.encrypt = function(a) {
                            return k(a, this.key)
                        }
                    };
                    return b.blockSize = b.prototype.blockSize = 16, b.keySize = b.prototype.keySize = a / 8, b
                }
                var m = (a("../../util.js"), new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128, 27, 54, 108, 216, 171, 77, 154, 47, 94, 188, 99, 198, 151, 53, 106, 212, 179, 125, 250, 239, 197, 145])), n = new Uint8Array([99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]), o = new Uint32Array([2774754246, 2222750968, 2574743534, 2373680118, 234025727, 3177933782, 2976870366, 1422247313, 1345335392, 50397442, 2842126286, 2099981142, 436141799, 1658312629, 3870010189, 2591454956, 1170918031, 2642575903, 1086966153, 2273148410, 368769775, 3948501426, 3376891790, 200339707, 3970805057, 1742001331, 4255294047, 3937382213, 3214711843, 4154762323, 2524082916, 1539358875, 3266819957, 486407649, 2928907069, 1780885068, 1513502316, 1094664062, 49805301, 1338821763, 1546925160, 4104496465, 887481809, 150073849, 2473685474, 1943591083, 1395732834, 1058346282, 201589768, 1388824469, 1696801606, 1589887901, 672667696, 2711000631, 251987210, 3046808111, 151455502, 907153956, 2608889883, 1038279391, 652995533, 1764173646, 3451040383, 2675275242, 453576978, 2659418909, 1949051992, 773462580, 756751158, 2993581788, 3998898868, 4221608027, 4132590244, 1295727478, 1641469623, 3467883389, 2066295122, 1055122397, 1898917726, 2542044179, 4115878822, 1758581177, 0, 753790401, 1612718144, 536673507, 3367088505, 3982187446, 3194645204, 1187761037, 3653156455, 1262041458, 3729410708, 3561770136, 3898103984, 1255133061, 1808847035, 720367557, 3853167183, 385612781, 3309519750, 3612167578, 1429418854, 2491778321, 3477423498, 284817897, 100794884, 2172616702, 4031795360, 1144798328, 3131023141, 3819481163, 4082192802, 4272137053, 3225436288, 2324664069, 2912064063, 3164445985, 1211644016, 83228145, 3753688163, 3249976951, 1977277103, 1663115586, 806359072, 452984805, 250868733, 1842533055, 1288555905, 336333848, 890442534, 804056259, 3781124030, 2727843637, 3427026056, 957814574, 1472513171, 4071073621, 2189328124, 1195195770, 2892260552, 3881655738, 723065138, 2507371494, 2690670784, 2558624025, 3511635870, 2145180835, 1713513028, 2116692564, 2878378043, 2206763019, 3393603212, 703524551, 3552098411, 1007948840, 2044649127, 3797835452, 487262998, 1994120109, 1004593371, 1446130276, 1312438900, 503974420, 3679013266, 168166924, 1814307912, 3831258296, 1573044895, 1859376061, 4021070915, 2791465668, 2828112185, 2761266481, 937747667, 2339994098, 854058965, 1137232011, 1496790894, 3077402074, 2358086913, 1691735473, 3528347292, 3769215305, 3027004632, 4199962284, 133494003, 636152527, 2942657994, 2390391540, 3920539207, 403179536, 3585784431, 2289596656, 1864705354, 1915629148, 605822008, 4054230615, 3350508659, 1371981463, 602466507, 2094914977, 2624877800, 555687742, 3712699286, 3703422305, 2257292045, 2240449039, 2423288032, 1111375484, 3300242801, 2858837708, 3628615824, 84083462, 32962295, 302911004, 2741068226, 1597322602, 4183250862, 3501832553, 2441512471, 1489093017, 656219450, 3114180135, 954327513, 335083755, 3013122091, 856756514, 3144247762, 1893325225, 2307821063, 2811532339, 3063651117, 572399164, 2458355477, 552200649, 1238290055, 4283782570, 2015897680, 2061492133, 2408352771, 4171342169, 2156497161, 386731290, 3669999461, 837215959, 3326231172, 3093850320, 3275833730, 2962856233, 1999449434, 286199582, 3417354363, 4233385128, 3602627437, 974525996]), p = new Uint32Array([1667483301, 2088564868, 2004348569, 2071721613, 4076011277, 1802229437, 1869602481, 3318059348, 808476752, 16843267, 1734856361, 724260477, 4278118169, 3621238114, 2880130534, 1987505306, 3402272581, 2189565853, 3385428288, 2105408135, 4210749205, 1499050731, 1195871945, 4042324747, 2913812972, 3570709351, 2728550397, 2947499498, 2627478463, 2762232823, 1920132246, 3233848155, 3082253762, 4261273884, 2475900334, 640044138, 909536346, 1061125697, 4160222466, 3435955023, 875849820, 2779075060, 3857043764, 4059166984, 1903288979, 3638078323, 825320019, 353708607, 67373068, 3351745874, 589514341, 3284376926, 404238376, 2526427041, 84216335, 2593796021, 117902857, 303178806, 2155879323, 3806519101, 3958099238, 656887401, 2998042573, 1970662047, 151589403, 2206408094, 741103732, 437924910, 454768173, 1852759218, 1515893998, 2694863867, 1381147894, 993752653, 3604395873, 3014884814, 690573947, 3823361342, 791633521, 2223248279, 1397991157, 3520182632, 0, 3991781676, 538984544, 4244431647, 2981198280, 1532737261, 1785386174, 3419114822, 3200149465, 960066123, 1246401758, 1280088276, 1482207464, 3486483786, 3503340395, 4025468202, 2863288293, 4227591446, 1128498885, 1296931543, 859006549, 2240090516, 1162185423, 4193904912, 33686534, 2139094657, 1347461360, 1010595908, 2678007226, 2829601763, 1364304627, 2745392638, 1077969088, 2408514954, 2459058093, 2644320700, 943222856, 4126535940, 3166462943, 3065411521, 3671764853, 555827811, 269492272, 4294960410, 4092853518, 3537026925, 3452797260, 202119188, 320022069, 3974939439, 1600110305, 2543269282, 1145342156, 387395129, 3301217111, 2812761586, 2122251394, 1027439175, 1684326572, 1566423783, 421081643, 1936975509, 1616953504, 2172721560, 1330618065, 3705447295, 572671078, 707417214, 2425371563, 2290617219, 1179028682, 4008625961, 3099093971, 336865340, 3739133817, 1583267042, 185275933, 3688607094, 3772832571, 842163286, 976909390, 168432670, 1229558491, 101059594, 606357612, 1549580516, 3267534685, 3553869166, 2896970735, 1650640038, 2442213800, 2509582756, 3840201527, 2038035083, 3890730290, 3368586051, 926379609, 1835915959, 2374828428, 3587551588, 1313774802, 2846444e3, 1819072692, 1448520954, 4109693703, 3941256997, 1701169839, 2054878350, 2930657257, 134746136, 3132780501, 2021191816, 623200879, 774790258, 471611428, 2795919345, 3031724999, 3334903633, 3907570467, 3722289532, 1953818780, 522141217, 1263245021, 3183305180, 2341145990, 2324303749, 1886445712, 1044282434, 3048567236, 1718013098, 1212715224, 50529797, 4143380225, 235805714, 1633796771, 892693087, 1465364217, 3115936208, 2256934801, 3250690392, 488454695, 2661164985, 3789674808, 4177062675, 2560109491, 286335539, 1768542907, 3654920560, 2391672713, 2492740519, 2610638262, 505297954, 2273777042, 3924412704, 3469641545, 1431677695, 673730680, 3755976058, 2357986191, 2711706104, 2307459456, 218962455, 3216991706, 3873888049, 1111655622, 1751699640, 1094812355, 2576951728, 757946999, 252648977, 2964356043, 1414834428, 3149622742, 370551866]), q = new Uint32Array([1673962851, 2096661628, 2012125559, 2079755643, 4076801522, 1809235307, 1876865391, 3314635973, 811618352, 16909057, 1741597031, 727088427, 4276558334, 3618988759, 2874009259, 1995217526, 3398387146, 2183110018, 3381215433, 2113570685, 4209972730, 1504897881, 1200539975, 4042984432, 2906778797, 3568527316, 2724199842, 2940594863, 2619588508, 2756966308, 1927583346, 3231407040, 3077948087, 4259388669, 2470293139, 642542118, 913070646, 1065238847, 4160029431, 3431157708, 879254580, 2773611685, 3855693029, 4059629809, 1910674289, 3635114968, 828527409, 355090197, 67636228, 3348452039, 591815971, 3281870531, 405809176, 2520228246, 84545285, 2586817946, 118360327, 304363026, 2149292928, 3806281186, 3956090603, 659450151, 2994720178, 1978310517, 152181513, 2199756419, 743994412, 439627290, 456535323, 1859957358, 1521806938, 2690382752, 1386542674, 997608763, 3602342358, 3011366579, 693271337, 3822927587, 794718511, 2215876484, 1403450707, 3518589137, 0, 3988860141, 541089824, 4242743292, 2977548465, 1538714971, 1792327274, 3415033547, 3194476990, 963791673, 1251270218, 1285084236, 1487988824, 3481619151, 3501943760, 4022676207, 2857362858, 4226619131, 1132905795, 1301993293, 862344499, 2232521861, 1166724933, 4192801017, 33818114, 2147385727, 1352724560, 1014514748, 2670049951, 2823545768, 1369633617, 2740846243, 1082179648, 2399505039, 2453646738, 2636233885, 946882616, 4126213365, 3160661948, 3061301686, 3668932058, 557998881, 270544912, 4293204735, 4093447923, 3535760850, 3447803085, 202904588, 321271059, 3972214764, 1606345055, 2536874647, 1149815876, 388905239, 3297990596, 2807427751, 2130477694, 1031423805, 1690872932, 1572530013, 422718233, 1944491379, 1623236704, 2165938305, 1335808335, 3701702620, 574907938, 710180394, 2419829648, 2282455944, 1183631942, 4006029806, 3094074296, 338181140, 3735517662, 1589437022, 185998603, 3685578459, 3772464096, 845436466, 980700730, 169090570, 1234361161, 101452294, 608726052, 1555620956, 3265224130, 3552407251, 2890133420, 1657054818, 2436475025, 2503058581, 3839047652, 2045938553, 3889509095, 3364570056, 929978679, 1843050349, 2365688973, 3585172693, 1318900302, 2840191145, 1826141292, 1454176854, 4109567988, 3939444202, 1707781989, 2062847610, 2923948462, 135272456, 3127891386, 2029029496, 625635109, 777810478, 473441308, 2790781350, 3027486644, 3331805638, 3905627112, 3718347997, 1961401460, 524165407, 1268178251, 3177307325, 2332919435, 2316273034, 1893765232, 1048330814, 3044132021, 1724688998, 1217452104, 50726147, 4143383030, 236720654, 1640145761, 896163637, 1471084887, 3110719673, 2249691526, 3248052417, 490350365, 2653403550, 3789109473, 4176155640, 2553000856, 287453969, 1775418217, 3651760345, 2382858638, 2486413204, 2603464347, 507257374, 2266337927, 3922272489, 3464972750, 1437269845, 676362280, 3752164063, 2349043596, 2707028129, 2299101321, 219813645, 3211123391, 3872862694, 1115997762, 1758509160, 1099088705, 2569646233, 760903469, 253628687, 2960903088, 1420360788, 3144537787, 371997206]), r = new Uint32Array([3332727651, 4169432188, 4003034999, 4136467323, 4279104242, 3602738027, 3736170351, 2438251973, 1615867952, 33751297, 3467208551, 1451043627, 3877240574, 3043153879, 1306962859, 3969545846, 2403715786, 530416258, 2302724553, 4203183485, 4011195130, 3001768281, 2395555655, 4211863792, 1106029997, 3009926356, 1610457762, 1173008303, 599760028, 1408738468, 3835064946, 2606481600, 1975695287, 3776773629, 1034851219, 1282024998, 1817851446, 2118205247, 4110612471, 2203045068, 1750873140, 1374987685, 3509904869, 4178113009, 3801313649, 2876496088, 1649619249, 708777237, 135005188, 2505230279, 1181033251, 2640233411, 807933976, 933336726, 168756485, 800430746, 235472647, 607523346, 463175808, 3745374946, 3441880043, 1315514151, 2144187058, 3936318837, 303761673, 496927619, 1484008492, 875436570, 908925723, 3702681198, 3035519578, 1543217312, 2767606354, 1984772923, 3076642518, 2110698419, 1383803177, 3711886307, 1584475951, 328696964, 2801095507, 3110654417, 0, 3240947181, 1080041504, 3810524412, 2043195825, 3069008731, 3569248874, 2370227147, 1742323390, 1917532473, 2497595978, 2564049996, 2968016984, 2236272591, 3144405200, 3307925487, 1340451498, 3977706491, 2261074755, 2597801293, 1716859699, 294946181, 2328839493, 3910203897, 67502594, 4269899647, 2700103760, 2017737788, 632987551, 1273211048, 2733855057, 1576969123, 2160083008, 92966799, 1068339858, 566009245, 1883781176, 4043634165, 1675607228, 2009183926, 2943736538, 1113792801, 540020752, 3843751935, 4245615603, 3211645650, 2169294285, 403966988, 641012499, 3274697964, 3202441055, 899848087, 2295088196, 775493399, 2472002756, 1441965991, 4236410494, 2051489085, 3366741092, 3135724893, 841685273, 3868554099, 3231735904, 429425025, 2664517455, 2743065820, 1147544098, 1417554474, 1001099408, 193169544, 2362066502, 3341414126, 1809037496, 675025940, 2809781982, 3168951902, 371002123, 2910247899, 3678134496, 1683370546, 1951283770, 337512970, 2463844681, 201983494, 1215046692, 3101973596, 2673722050, 3178157011, 1139780780, 3299238498, 967348625, 832869781, 3543655652, 4069226873, 3576883175, 2336475336, 1851340599, 3669454189, 25988493, 2976175573, 2631028302, 1239460265, 3635702892, 2902087254, 4077384948, 3475368682, 3400492389, 4102978170, 1206496942, 270010376, 1876277946, 4035475576, 1248797989, 1550986798, 941890588, 1475454630, 1942467764, 2538718918, 3408128232, 2709315037, 3902567540, 1042358047, 2531085131, 1641856445, 226921355, 260409994, 3767562352, 2084716094, 1908716981, 3433719398, 2430093384, 100991747, 4144101110, 470945294, 3265487201, 1784624437, 2935576407, 1775286713, 395413126, 2572730817, 975641885, 666476190, 3644383713, 3943954680, 733190296, 573772049, 3535497577, 2842745305, 126455438, 866620564, 766942107, 1008868894, 361924487, 3374377449, 2269761230, 2868860245, 1350051880, 2776293343, 59739276, 1509466529, 159418761, 437718285, 1708834751, 3610371814, 2227585602, 3501746280, 2193834305, 699439513, 1517759789, 504434447, 2076946608, 2835108948, 1842789307, 742004246]), s = 8, t = 14;
                b.exports = {};
                var u = [128, 192, 256];
                for (var v in u)
                    b.exports[u[v]] = l(u[v])
            }, {"../../util.js": 61}],7: [function(a, b) {
                function c() {
                }
                function d(a) {
                    this.bf = new c, this.bf.init(e.str2bin(a)), this.encrypt = function(a) {
                        return this.bf.encrypt_block(a)
                    }
                }
                c.prototype.BLOCKSIZE = 8, c.prototype.SBOXES = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]], c.prototype.PARRAY = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], c.prototype.NN = 16, c.prototype._clean = function(a) {
                    if (0 > a) {
                        var b = 2147483647 & a;
                        a = b + 2147483648
                    }
                    return a
                }, c.prototype._F = function(a) {
                    var b, c, d, e, f;
                    return e = 255 & a, a >>>= 8, d = 255 & a, a >>>= 8, c = 255 & a, a >>>= 8, b = 255 & a, f = this.sboxes[0][b] + this.sboxes[1][c], f ^= this.sboxes[2][d], f += this.sboxes[3][e]
                }, c.prototype._encrypt_block = function(a) {
                    var b, c = a[0], d = a[1];
                    for (b = 0; b < this.NN; ++b) {
                        c ^= this.parray[b], d = this._F(c) ^ d;
                        var e = c;
                        c = d, d = e
                    }
                    c ^= this.parray[this.NN + 0], d ^= this.parray[this.NN + 1], a[0] = this._clean(d), a[1] = this._clean(c)
                }, c.prototype.encrypt_block = function(a) {
                    var b, c = [0, 0], d = this.BLOCKSIZE / 2;
                    for (b = 0; b < this.BLOCKSIZE / 2; ++b)
                        c[0] = c[0] << 8 | 255 & a[b + 0], c[1] = c[1] << 8 | 255 & a[b + d];
                    this._encrypt_block(c);
                    var e = [];
                    for (b = 0; b < this.BLOCKSIZE / 2; ++b)
                        e[b + 0] = c[0] >>> 24 - 8 * b & 255, e[b + d] = c[1] >>> 24 - 8 * b & 255;
                    return e
                }, c.prototype._decrypt_block = function(a) {
                    var b, c = a[0], d = a[1];
                    for (b = this.NN + 1; b > 1; --b) {
                        c ^= this.parray[b], d = this._F(c) ^ d;
                        var e = c;
                        c = d, d = e
                    }
                    c ^= this.parray[1], d ^= this.parray[0], a[0] = this._clean(d), a[1] = this._clean(c)
                }, c.prototype.init = function(a) {
                    var b, c = 0;
                    for (this.parray = [], b = 0; b < this.NN + 2; ++b) {
                        var d, e = 0;
                        for (d = 0; 4 > d; ++d)
                            e = e << 8 | 255 & a[c], ++c >= a.length && (c = 0);
                        this.parray[b] = this.PARRAY[b] ^ e
                    }
                    for (this.sboxes = [], b = 0; 4 > b; ++b)
                        for (this.sboxes[b] = [], c = 0; 256 > c; ++c)
                            this.sboxes[b][c] = this.SBOXES[b][c];
                    var f = [0, 0];
                    for (b = 0; b < this.NN + 2; b += 2)
                        this._encrypt_block(f), this.parray[b + 0] = f[0], this.parray[b + 1] = f[1];
                    for (b = 0; 4 > b; ++b)
                        for (c = 0; 256 > c; c += 2)
                            this._encrypt_block(f), this.sboxes[b][c + 0] = f[0], this.sboxes[b][c + 1] = f[1]
                };
                var e = a("../../util.js");
                b.exports = d, b.exports.keySize = d.prototype.keySize = 16, b.exports.blockSize = d.prototype.blockSize = 16
            }, {"../../util.js": 61}],8: [function(a, b) {
                function c() {
                    function a(a, b, c) {
                        var d = b + a, e = d << c | d >>> 32 - c;
                        return (f[0][e >>> 24] ^ f[1][e >>> 16 & 255]) - f[2][e >>> 8 & 255] + f[3][255 & e]
                    }
                    function b(a, b, c) {
                        var d = b ^ a, e = d << c | d >>> 32 - c;
                        return f[0][e >>> 24] - f[1][e >>> 16 & 255] + f[2][e >>> 8 & 255] ^ f[3][255 & e]
                    }
                    function c(a, b, c) {
                        var d = b - a, e = d << c | d >>> 32 - c;
                        return (f[0][e >>> 24] + f[1][e >>> 16 & 255] ^ f[2][e >>> 8 & 255]) - f[3][255 & e]
                    }
                    this.BlockSize = 8, this.KeySize = 16, this.setKey = function(a) {
                        if (this.masking = new Array(16), this.rotate = new Array(16), this.reset(), a.length != this.KeySize)
                            throw new Error("CAST-128: keys must be 16 bytes");
                        return this.keySchedule(a), !0
                    }, this.reset = function() {
                        for (var a = 0; 16 > a; a++)
                            this.masking[a] = 0, this.rotate[a] = 0
                    }, this.getBlockSize = function() {
                        return BlockSize
                    }, this.encrypt = function(d) {
                        for (var e = new Array(d.length), f = 0; f < d.length; f += 8) {
                            var g, h = d[f] << 24 | d[f + 1] << 16 | d[f + 2] << 8 | d[f + 3], i = d[f + 4] << 24 | d[f + 5] << 16 | d[f + 6] << 8 | d[f + 7];
                            g = i, i = h ^ a(i, this.masking[0], this.rotate[0]), h = g, g = i, i = h ^ b(i, this.masking[1], this.rotate[1]), h = g, g = i, i = h ^ c(i, this.masking[2], this.rotate[2]), h = g, g = i, i = h ^ a(i, this.masking[3], this.rotate[3]), h = g, g = i, i = h ^ b(i, this.masking[4], this.rotate[4]), h = g, g = i, i = h ^ c(i, this.masking[5], this.rotate[5]), h = g, g = i, i = h ^ a(i, this.masking[6], this.rotate[6]), h = g, g = i, i = h ^ b(i, this.masking[7], this.rotate[7]), h = g, g = i, i = h ^ c(i, this.masking[8], this.rotate[8]), h = g, g = i, i = h ^ a(i, this.masking[9], this.rotate[9]), h = g, g = i, i = h ^ b(i, this.masking[10], this.rotate[10]), h = g, g = i, i = h ^ c(i, this.masking[11], this.rotate[11]), h = g, g = i, i = h ^ a(i, this.masking[12], this.rotate[12]), h = g, g = i, i = h ^ b(i, this.masking[13], this.rotate[13]), h = g, g = i, i = h ^ c(i, this.masking[14], this.rotate[14]), h = g, g = i, i = h ^ a(i, this.masking[15], this.rotate[15]), h = g, e[f] = i >>> 24 & 255, e[f + 1] = i >>> 16 & 255, e[f + 2] = i >>> 8 & 255, e[f + 3] = 255 & i, e[f + 4] = h >>> 24 & 255, e[f + 5] = h >>> 16 & 255, e[f + 6] = h >>> 8 & 255, e[f + 7] = 255 & h
                        }
                        return e
                    }, this.decrypt = function(d) {
                        for (var e = new Array(d.length), f = 0; f < d.length; f += 8) {
                            var g, h = d[f] << 24 | d[f + 1] << 16 | d[f + 2] << 8 | d[f + 3], i = d[f + 4] << 24 | d[f + 5] << 16 | d[f + 6] << 8 | d[f + 7];
                            g = i, i = h ^ a(i, this.masking[15], this.rotate[15]), h = g, g = i, i = h ^ c(i, this.masking[14], this.rotate[14]), h = g, g = i, i = h ^ b(i, this.masking[13], this.rotate[13]), h = g, g = i, i = h ^ a(i, this.masking[12], this.rotate[12]), h = g, g = i, i = h ^ c(i, this.masking[11], this.rotate[11]), h = g, g = i, i = h ^ b(i, this.masking[10], this.rotate[10]), h = g, g = i, i = h ^ a(i, this.masking[9], this.rotate[9]), h = g, g = i, i = h ^ c(i, this.masking[8], this.rotate[8]), h = g, g = i, i = h ^ b(i, this.masking[7], this.rotate[7]), h = g, g = i, i = h ^ a(i, this.masking[6], this.rotate[6]), h = g, g = i, i = h ^ c(i, this.masking[5], this.rotate[5]), h = g, g = i, i = h ^ b(i, this.masking[4], this.rotate[4]), h = g, g = i, i = h ^ a(i, this.masking[3], this.rotate[3]), h = g, g = i, i = h ^ c(i, this.masking[2], this.rotate[2]), h = g, g = i, i = h ^ b(i, this.masking[1], this.rotate[1]), h = g, g = i, i = h ^ a(i, this.masking[0], this.rotate[0]), h = g, e[f] = i >>> 24 & 255, e[f + 1] = i >>> 16 & 255, e[f + 2] = i >>> 8 & 255, e[f + 3] = 255 & i, e[f + 4] = h >>> 24 & 255, e[f + 5] = h >> 16 & 255, e[f + 6] = h >> 8 & 255, e[f + 7] = 255 & h
                        }
                        return e
                    };
                    var d = new Array(4);
                    d[0] = new Array(4), d[0][0] = new Array(4, 0, 13, 15, 12, 14, 8), d[0][1] = new Array(5, 2, 16, 18, 17, 19, 10), d[0][2] = new Array(6, 3, 23, 22, 21, 20, 9), d[0][3] = new Array(7, 1, 26, 25, 27, 24, 11), d[1] = new Array(4), d[1][0] = new Array(0, 6, 21, 23, 20, 22, 16), d[1][1] = new Array(1, 4, 0, 2, 1, 3, 18), d[1][2] = new Array(2, 5, 7, 6, 5, 4, 17), d[1][3] = new Array(3, 7, 10, 9, 11, 8, 19), d[2] = new Array(4), d[2][0] = new Array(4, 0, 13, 15, 12, 14, 8), d[2][1] = new Array(5, 2, 16, 18, 17, 19, 10), d[2][2] = new Array(6, 3, 23, 22, 21, 20, 9), d[2][3] = new Array(7, 1, 26, 25, 27, 24, 11), d[3] = new Array(4), d[3][0] = new Array(0, 6, 21, 23, 20, 22, 16), d[3][1] = new Array(1, 4, 0, 2, 1, 3, 18), d[3][2] = new Array(2, 5, 7, 6, 5, 4, 17), d[3][3] = new Array(3, 7, 10, 9, 11, 8, 19);
                    var e = new Array(4);
                    e[0] = new Array(4), e[0][0] = new Array(24, 25, 23, 22, 18), e[0][1] = new Array(26, 27, 21, 20, 22), e[0][2] = new Array(28, 29, 19, 18, 25), e[0][3] = new Array(30, 31, 17, 16, 28), e[1] = new Array(4), e[1][0] = new Array(3, 2, 12, 13, 8), e[1][1] = new Array(1, 0, 14, 15, 13), e[1][2] = new Array(7, 6, 8, 9, 3), e[1][3] = new Array(5, 4, 10, 11, 7), e[2] = new Array(4), e[2][0] = new Array(19, 18, 28, 29, 25), e[2][1] = new Array(17, 16, 30, 31, 28), e[2][2] = new Array(23, 22, 24, 25, 18), e[2][3] = new Array(21, 20, 26, 27, 22), e[3] = new Array(4), e[3][0] = new Array(8, 9, 7, 6, 3), e[3][1] = new Array(10, 11, 5, 4, 7), e[3][2] = new Array(12, 13, 3, 2, 8), e[3][3] = new Array(14, 15, 1, 0, 13), this.keySchedule = function(a) {
                        var b, c, g = new Array(8), h = new Array(32);
                        for (b = 0; 4 > b; b++)
                            c = 4 * b, g[b] = a[c] << 24 | a[c + 1] << 16 | a[c + 2] << 8 | a[c + 3];
                        for (var i, j = [6, 7, 4, 5], k = 0, l = 0; 2 > l; l++)
                            for (var m = 0; 4 > m; m++) {
                                for (c = 0; 4 > c; c++) {
                                    var n = d[m][c];
                                    i = g[n[1]], i ^= f[4][g[n[2] >>> 2] >>> 24 - 8 * (3 & n[2]) & 255], i ^= f[5][g[n[3] >>> 2] >>> 24 - 8 * (3 & n[3]) & 255], i ^= f[6][g[n[4] >>> 2] >>> 24 - 8 * (3 & n[4]) & 255], i ^= f[7][g[n[5] >>> 2] >>> 24 - 8 * (3 & n[5]) & 255], i ^= f[j[c]][g[n[6] >>> 2] >>> 24 - 8 * (3 & n[6]) & 255], g[n[0]] = i
                                }
                                for (c = 0; 4 > c; c++) {
                                    var o = e[m][c];
                                    i = f[4][g[o[0] >>> 2] >>> 24 - 8 * (3 & o[0]) & 255], i ^= f[5][g[o[1] >>> 2] >>> 24 - 8 * (3 & o[1]) & 255], i ^= f[6][g[o[2] >>> 2] >>> 24 - 8 * (3 & o[2]) & 255], i ^= f[7][g[o[3] >>> 2] >>> 24 - 8 * (3 & o[3]) & 255], i ^= f[4 + c][g[o[4] >>> 2] >>> 24 - 8 * (3 & o[4]) & 255], h[k] = i, k++
                                }
                            }
                        for (b = 0; 16 > b; b++)
                            this.masking[b] = h[b], this.rotate[b] = 31 & h[16 + b]
                    };
                    var f = new Array(8);
                    f[0] = new Array(821772500, 2678128395, 1810681135, 1059425402, 505495343, 2617265619, 1610868032, 3483355465, 3218386727, 2294005173, 3791863952, 2563806837, 1852023008, 365126098, 3269944861, 584384398, 677919599, 3229601881, 4280515016, 2002735330, 1136869587, 3744433750, 2289869850, 2731719981, 2714362070, 879511577, 1639411079, 575934255, 717107937, 2857637483, 576097850, 2731753936, 1725645e3, 2810460463, 5111599, 767152862, 2543075244, 1251459544, 1383482551, 3052681127, 3089939183, 3612463449, 1878520045, 1510570527, 2189125840, 2431448366, 582008916, 3163445557, 1265446783, 1354458274, 3529918736, 3202711853, 3073581712, 3912963487, 3029263377, 1275016285, 4249207360, 2905708351, 3304509486, 1442611557, 3585198765, 2712415662, 2731849581, 3248163920, 2283946226, 208555832, 2766454743, 1331405426, 1447828783, 3315356441, 3108627284, 2957404670, 2981538698, 3339933917, 1669711173, 286233437, 1465092821, 1782121619, 3862771680, 710211251, 980974943, 1651941557, 430374111, 2051154026, 704238805, 4128970897, 3144820574, 2857402727, 948965521, 3333752299, 2227686284, 718756367, 2269778983, 2731643755, 718440111, 2857816721, 3616097120, 1113355533, 2478022182, 410092745, 1811985197, 1944238868, 2696854588, 1415722873, 1682284203, 1060277122, 1998114690, 1503841958, 82706478, 2315155686, 1068173648, 845149890, 2167947013, 1768146376, 1993038550, 3566826697, 3390574031, 940016341, 3355073782, 2328040721, 904371731, 1205506512, 4094660742, 2816623006, 825647681, 85914773, 2857843460, 1249926541, 1417871568, 3287612, 3211054559, 3126306446, 1975924523, 1353700161, 2814456437, 2438597621, 1800716203, 722146342, 2873936343, 1151126914, 4160483941, 2877670899, 458611604, 2866078500, 3483680063, 770352098, 2652916994, 3367839148, 3940505011, 3585973912, 3809620402, 718646636, 2504206814, 2914927912, 3631288169, 2857486607, 2860018678, 575749918, 2857478043, 718488780, 2069512688, 3548183469, 453416197, 1106044049, 3032691430, 52586708, 3378514636, 3459808877, 3211506028, 1785789304, 218356169, 3571399134, 3759170522, 1194783844, 1523787992, 3007827094, 1975193539, 2555452411, 1341901877, 3045838698, 3776907964, 3217423946, 2802510864, 2889438986, 1057244207, 1636348243, 3761863214, 1462225785, 2632663439, 481089165, 718503062, 24497053, 3332243209, 3344655856, 3655024856, 3960371065, 1195698900, 2971415156, 3710176158, 2115785917, 4027663609, 3525578417, 2524296189, 2745972565, 3564906415, 1372086093, 1452307862, 2780501478, 1476592880, 3389271281, 18495466, 2378148571, 901398090, 891748256, 3279637769, 3157290713, 2560960102, 1447622437, 4284372637, 216884176, 2086908623, 1879786977, 3588903153, 2242455666, 2938092967, 3559082096, 2810645491, 758861177, 1121993112, 215018983, 642190776, 4169236812, 1196255959, 2081185372, 3508738393, 941322904, 4124243163, 2877523539, 1848581667, 2205260958, 3180453958, 2589345134, 3694731276, 550028657, 2519456284, 3789985535, 2973870856, 2093648313, 443148163, 46942275, 2734146937, 1117713533, 1115362972, 1523183689, 3717140224, 1551984063), f[1] = new Array(522195092, 4010518363, 1776537470, 960447360, 4267822970, 4005896314, 1435016340, 1929119313, 2913464185, 1310552629, 3579470798, 3724818106, 2579771631, 1594623892, 417127293, 2715217907, 2696228731, 1508390405, 3994398868, 3925858569, 3695444102, 4019471449, 3129199795, 3770928635, 3520741761, 990456497, 4187484609, 2783367035, 21106139, 3840405339, 631373633, 3783325702, 532942976, 396095098, 3548038825, 4267192484, 2564721535, 2011709262, 2039648873, 620404603, 3776170075, 2898526339, 3612357925, 4159332703, 1645490516, 223693667, 1567101217, 3362177881, 1029951347, 3470931136, 3570957959, 1550265121, 119497089, 972513919, 907948164, 3840628539, 1613718692, 3594177948, 465323573, 2659255085, 654439692, 2575596212, 2699288441, 3127702412, 277098644, 624404830, 4100943870, 2717858591, 546110314, 2403699828, 3655377447, 1321679412, 4236791657, 1045293279, 4010672264, 895050893, 2319792268, 494945126, 1914543101, 2777056443, 3894764339, 2219737618, 311263384, 4275257268, 3458730721, 669096869, 3584475730, 3835122877, 3319158237, 3949359204, 2005142349, 2713102337, 2228954793, 3769984788, 569394103, 3855636576, 1425027204, 108000370, 2736431443, 3671869269, 3043122623, 1750473702, 2211081108, 762237499, 3972989403, 2798899386, 3061857628, 2943854345, 867476300, 964413654, 1591880597, 1594774276, 2179821409, 552026980, 3026064248, 3726140315, 2283577634, 3110545105, 2152310760, 582474363, 1582640421, 1383256631, 2043843868, 3322775884, 1217180674, 463797851, 2763038571, 480777679, 2718707717, 2289164131, 3118346187, 214354409, 200212307, 3810608407, 3025414197, 2674075964, 3997296425, 1847405948, 1342460550, 510035443, 4080271814, 815934613, 833030224, 1620250387, 1945732119, 2703661145, 3966000196, 1388869545, 3456054182, 2687178561, 2092620194, 562037615, 1356438536, 3409922145, 3261847397, 1688467115, 2150901366, 631725691, 3840332284, 549916902, 3455104640, 394546491, 837744717, 2114462948, 751520235, 2221554606, 2415360136, 3999097078, 2063029875, 803036379, 2702586305, 821456707, 3019566164, 360699898, 4018502092, 3511869016, 3677355358, 2402471449, 812317050, 49299192, 2570164949, 3259169295, 2816732080, 3331213574, 3101303564, 2156015656, 3705598920, 3546263921, 143268808, 3200304480, 1638124008, 3165189453, 3341807610, 578956953, 2193977524, 3638120073, 2333881532, 807278310, 658237817, 2969561766, 1641658566, 11683945, 3086995007, 148645947, 1138423386, 4158756760, 1981396783, 2401016740, 3699783584, 380097457, 2680394679, 2803068651, 3334260286, 441530178, 4016580796, 1375954390, 761952171, 891809099, 2183123478, 157052462, 3683840763, 1592404427, 341349109, 2438483839, 1417898363, 644327628, 2233032776, 2353769706, 2201510100, 220455161, 1815641738, 182899273, 2995019788, 3627381533, 3702638151, 2890684138, 1052606899, 588164016, 1681439879, 4038439418, 2405343923, 4229449282, 167996282, 1336969661, 1688053129, 2739224926, 1543734051, 1046297529, 1138201970, 2121126012, 115334942, 1819067631, 1902159161, 1941945968, 2206692869, 1159982321), f[2] = new Array(2381300288, 637164959, 3952098751, 3893414151, 1197506559, 916448331, 2350892612, 2932787856, 3199334847, 4009478890, 3905886544, 1373570990, 2450425862, 4037870920, 3778841987, 2456817877, 286293407, 124026297, 3001279700, 1028597854, 3115296800, 4208886496, 2691114635, 2188540206, 1430237888, 1218109995, 3572471700, 308166588, 570424558, 2187009021, 2455094765, 307733056, 1310360322, 3135275007, 1384269543, 2388071438, 863238079, 2359263624, 2801553128, 3380786597, 2831162807, 1470087780, 1728663345, 4072488799, 1090516929, 532123132, 2389430977, 1132193179, 2578464191, 3051079243, 1670234342, 1434557849, 2711078940, 1241591150, 3314043432, 3435360113, 3091448339, 1812415473, 2198440252, 267246943, 796911696, 3619716990, 38830015, 1526438404, 2806502096, 374413614, 2943401790, 1489179520, 1603809326, 1920779204, 168801282, 260042626, 2358705581, 1563175598, 2397674057, 1356499128, 2217211040, 514611088, 2037363785, 2186468373, 4022173083, 2792511869, 2913485016, 1173701892, 4200428547, 3896427269, 1334932762, 2455136706, 602925377, 2835607854, 1613172210, 41346230, 2499634548, 2457437618, 2188827595, 41386358, 4172255629, 1313404830, 2405527007, 3801973774, 2217704835, 873260488, 2528884354, 2478092616, 4012915883, 2555359016, 2006953883, 2463913485, 575479328, 2218240648, 2099895446, 660001756, 2341502190, 3038761536, 3888151779, 3848713377, 3286851934, 1022894237, 1620365795, 3449594689, 1551255054, 15374395, 3570825345, 4249311020, 4151111129, 3181912732, 310226346, 1133119310, 530038928, 136043402, 2476768958, 3107506709, 2544909567, 1036173560, 2367337196, 1681395281, 1758231547, 3641649032, 306774401, 1575354324, 3716085866, 1990386196, 3114533736, 2455606671, 1262092282, 3124342505, 2768229131, 4210529083, 1833535011, 423410938, 660763973, 2187129978, 1639812e3, 3508421329, 3467445492, 310289298, 272797111, 2188552562, 2456863912, 310240523, 677093832, 1013118031, 901835429, 3892695601, 1116285435, 3036471170, 1337354835, 243122523, 520626091, 277223598, 4244441197, 4194248841, 1766575121, 594173102, 316590669, 742362309, 3536858622, 4176435350, 3838792410, 2501204839, 1229605004, 3115755532, 1552908988, 2312334149, 979407927, 3959474601, 1148277331, 176638793, 3614686272, 2083809052, 40992502, 1340822838, 2731552767, 3535757508, 3560899520, 1354035053, 122129617, 7215240, 2732932949, 3118912700, 2718203926, 2539075635, 3609230695, 3725561661, 1928887091, 2882293555, 1988674909, 2063640240, 2491088897, 1459647954, 4189817080, 2302804382, 1113892351, 2237858528, 1927010603, 4002880361, 1856122846, 1594404395, 2944033133, 3855189863, 3474975698, 1643104450, 4054590833, 3431086530, 1730235576, 2984608721, 3084664418, 2131803598, 4178205752, 267404349, 1617849798, 1616132681, 1462223176, 736725533, 2327058232, 551665188, 2945899023, 1749386277, 2575514597, 1611482493, 674206544, 2201269090, 3642560800, 728599968, 1680547377, 2620414464, 1388111496, 453204106, 4156223445, 1094905244, 2754698257, 2201108165, 3757000246, 2704524545, 3922940700, 3996465027), f[3] = new Array(2645754912, 532081118, 2814278639, 3530793624, 1246723035, 1689095255, 2236679235, 4194438865, 2116582143, 3859789411, 157234593, 2045505824, 4245003587, 1687664561, 4083425123, 605965023, 672431967, 1336064205, 3376611392, 214114848, 4258466608, 3232053071, 489488601, 605322005, 3998028058, 264917351, 1912574028, 756637694, 436560991, 202637054, 135989450, 85393697, 2152923392, 3896401662, 2895836408, 2145855233, 3535335007, 115294817, 3147733898, 1922296357, 3464822751, 4117858305, 1037454084, 2725193275, 2127856640, 1417604070, 1148013728, 1827919605, 642362335, 2929772533, 909348033, 1346338451, 3547799649, 297154785, 1917849091, 4161712827, 2883604526, 3968694238, 1469521537, 3780077382, 3375584256, 1763717519, 136166297, 4290970789, 1295325189, 2134727907, 2798151366, 1566297257, 3672928234, 2677174161, 2672173615, 965822077, 2780786062, 289653839, 1133871874, 3491843819, 35685304, 1068898316, 418943774, 672553190, 642281022, 2346158704, 1954014401, 3037126780, 4079815205, 2030668546, 3840588673, 672283427, 1776201016, 359975446, 3750173538, 555499703, 2769985273, 1324923, 69110472, 152125443, 3176785106, 3822147285, 1340634837, 798073664, 1434183902, 15393959, 216384236, 1303690150, 3881221631, 3711134124, 3960975413, 106373927, 2578434224, 1455997841, 1801814300, 1578393881, 1854262133, 3188178946, 3258078583, 2302670060, 1539295533, 3505142565, 3078625975, 2372746020, 549938159, 3278284284, 2620926080, 181285381, 2865321098, 3970029511, 68876850, 488006234, 1728155692, 2608167508, 836007927, 2435231793, 919367643, 3339422534, 3655756360, 1457871481, 40520939, 1380155135, 797931188, 234455205, 2255801827, 3990488299, 397000196, 739833055, 3077865373, 2871719860, 4022553888, 772369276, 390177364, 3853951029, 557662966, 740064294, 1640166671, 1699928825, 3535942136, 622006121, 3625353122, 68743880, 1742502, 219489963, 1664179233, 1577743084, 1236991741, 410585305, 2366487942, 823226535, 1050371084, 3426619607, 3586839478, 212779912, 4147118561, 1819446015, 1911218849, 530248558, 3486241071, 3252585495, 2886188651, 3410272728, 2342195030, 20547779, 2982490058, 3032363469, 3631753222, 312714466, 1870521650, 1493008054, 3491686656, 615382978, 4103671749, 2534517445, 1932181, 2196105170, 278426614, 6369430, 3274544417, 2913018367, 697336853, 2143000447, 2946413531, 701099306, 1558357093, 2805003052, 3500818408, 2321334417, 3567135975, 216290473, 3591032198, 23009561, 1996984579, 3735042806, 2024298078, 3739440863, 569400510, 2339758983, 3016033873, 3097871343, 3639523026, 3844324983, 3256173865, 795471839, 2951117563, 4101031090, 4091603803, 3603732598, 971261452, 534414648, 428311343, 3389027175, 2844869880, 694888862, 1227866773, 2456207019, 3043454569, 2614353370, 3749578031, 3676663836, 459166190, 4132644070, 1794958188, 51825668, 2252611902, 3084671440, 2036672799, 3436641603, 1099053433, 2469121526, 3059204941, 1323291266, 2061838604, 1018778475, 2233344254, 2553501054, 334295216, 3556750194, 1065731521, 183467730), f[4] = new Array(2127105028, 745436345, 2601412319, 2788391185, 3093987327, 500390133, 1155374404, 389092991, 150729210, 3891597772, 3523549952, 1935325696, 716645080, 946045387, 2901812282, 1774124410, 3869435775, 4039581901, 3293136918, 3438657920, 948246080, 363898952, 3867875531, 1286266623, 1598556673, 68334250, 630723836, 1104211938, 1312863373, 613332731, 2377784574, 1101634306, 441780740, 3129959883, 1917973735, 2510624549, 3238456535, 2544211978, 3308894634, 1299840618, 4076074851, 1756332096, 3977027158, 297047435, 3790297736, 2265573040, 3621810518, 1311375015, 1667687725, 47300608, 3299642885, 2474112369, 201668394, 1468347890, 576830978, 3594690761, 3742605952, 1958042578, 1747032512, 3558991340, 1408974056, 3366841779, 682131401, 1033214337, 1545599232, 4265137049, 206503691, 103024618, 2855227313, 1337551222, 2428998917, 2963842932, 4015366655, 3852247746, 2796956967, 3865723491, 3747938335, 247794022, 3755824572, 702416469, 2434691994, 397379957, 851939612, 2314769512, 218229120, 1380406772, 62274761, 214451378, 3170103466, 2276210409, 3845813286, 28563499, 446592073, 1693330814, 3453727194, 29968656, 3093872512, 220656637, 2470637031, 77972100, 1667708854, 1358280214, 4064765667, 2395616961, 325977563, 4277240721, 4220025399, 3605526484, 3355147721, 811859167, 3069544926, 3962126810, 652502677, 3075892249, 4132761541, 3498924215, 1217549313, 3250244479, 3858715919, 3053989961, 1538642152, 2279026266, 2875879137, 574252750, 3324769229, 2651358713, 1758150215, 141295887, 2719868960, 3515574750, 4093007735, 4194485238, 1082055363, 3417560400, 395511885, 2966884026, 179534037, 3646028556, 3738688086, 1092926436, 2496269142, 257381841, 3772900718, 1636087230, 1477059743, 2499234752, 3811018894, 2675660129, 3285975680, 90732309, 1684827095, 1150307763, 1723134115, 3237045386, 1769919919, 1240018934, 815675215, 750138730, 2239792499, 1234303040, 1995484674, 138143821, 675421338, 1145607174, 1936608440, 3238603024, 2345230278, 2105974004, 323969391, 779555213, 3004902369, 2861610098, 1017501463, 2098600890, 2628620304, 2940611490, 2682542546, 1171473753, 3656571411, 3687208071, 4091869518, 393037935, 159126506, 1662887367, 1147106178, 391545844, 3452332695, 1891500680, 3016609650, 1851642611, 546529401, 1167818917, 3194020571, 2848076033, 3953471836, 575554290, 475796850, 4134673196, 450035699, 2351251534, 844027695, 1080539133, 86184846, 1554234488, 3692025454, 1972511363, 2018339607, 1491841390, 1141460869, 1061690759, 4244549243, 2008416118, 2351104703, 2868147542, 1598468138, 722020353, 1027143159, 212344630, 1387219594, 1725294528, 3745187956, 2500153616, 458938280, 4129215917, 1828119673, 544571780, 3503225445, 2297937496, 1241802790, 267843827, 2694610800, 1397140384, 1558801448, 3782667683, 1806446719, 929573330, 2234912681, 400817706, 616011623, 4121520928, 3603768725, 1761550015, 1968522284, 4053731006, 4192232858, 4005120285, 872482584, 3140537016, 3894607381, 2287405443, 1963876937, 3663887957, 1584857e3, 2975024454, 1833426440, 4025083860), f[5] = new Array(4143615901, 749497569, 1285769319, 3795025788, 2514159847, 23610292, 3974978748, 844452780, 3214870880, 3751928557, 2213566365, 1676510905, 448177848, 3730751033, 4086298418, 2307502392, 871450977, 3222878141, 4110862042, 3831651966, 2735270553, 1310974780, 2043402188, 1218528103, 2736035353, 4274605013, 2702448458, 3936360550, 2693061421, 162023535, 2827510090, 687910808, 23484817, 3784910947, 3371371616, 779677500, 3503626546, 3473927188, 4157212626, 3500679282, 4248902014, 2466621104, 3899384794, 1958663117, 925738300, 1283408968, 3669349440, 1840910019, 137959847, 2679828185, 1239142320, 1315376211, 1547541505, 1690155329, 739140458, 3128809933, 3933172616, 3876308834, 905091803, 1548541325, 4040461708, 3095483362, 144808038, 451078856, 676114313, 2861728291, 2469707347, 993665471, 373509091, 2599041286, 4025009006, 4170239449, 2149739950, 3275793571, 3749616649, 2794760199, 1534877388, 572371878, 2590613551, 1753320020, 3467782511, 1405125690, 4270405205, 633333386, 3026356924, 3475123903, 632057672, 2846462855, 1404951397, 3882875879, 3915906424, 195638627, 2385783745, 3902872553, 1233155085, 3355999740, 2380578713, 2702246304, 2144565621, 3663341248, 3894384975, 2502479241, 4248018925, 3094885567, 1594115437, 572884632, 3385116731, 767645374, 1331858858, 1475698373, 3793881790, 3532746431, 1321687957, 619889600, 1121017241, 3440213920, 2070816767, 2833025776, 1933951238, 4095615791, 890643334, 3874130214, 859025556, 360630002, 925594799, 1764062180, 3920222280, 4078305929, 979562269, 2810700344, 4087740022, 1949714515, 546639971, 1165388173, 3069891591, 1495988560, 922170659, 1291546247, 2107952832, 1813327274, 3406010024, 3306028637, 4241950635, 153207855, 2313154747, 1608695416, 1150242611, 1967526857, 721801357, 1220138373, 3691287617, 3356069787, 2112743302, 3281662835, 1111556101, 1778980689, 250857638, 2298507990, 673216130, 2846488510, 3207751581, 3562756981, 3008625920, 3417367384, 2198807050, 529510932, 3547516680, 3426503187, 2364944742, 102533054, 2294910856, 1617093527, 1204784762, 3066581635, 1019391227, 1069574518, 1317995090, 1691889997, 3661132003, 510022745, 3238594800, 1362108837, 1817929911, 2184153760, 805817662, 1953603311, 3699844737, 120799444, 2118332377, 207536705, 2282301548, 4120041617, 145305846, 2508124933, 3086745533, 3261524335, 1877257368, 2977164480, 3160454186, 2503252186, 4221677074, 759945014, 254147243, 2767453419, 3801518371, 629083197, 2471014217, 907280572, 3900796746, 940896768, 2751021123, 2625262786, 3161476951, 3661752313, 3260732218, 1425318020, 2977912069, 1496677566, 3988592072, 2140652971, 3126511541, 3069632175, 977771578, 1392695845, 1698528874, 1411812681, 1369733098, 1343739227, 3620887944, 1142123638, 67414216, 3102056737, 3088749194, 1626167401, 2546293654, 3941374235, 697522451, 33404913, 143560186, 2595682037, 994885535, 1247667115, 3859094837, 2699155541, 3547024625, 4114935275, 2968073508, 3199963069, 2732024527, 1237921620, 951448369, 1898488916, 1211705605, 2790989240, 2233243581, 3598044975), f[6] = new Array(2246066201, 858518887, 1714274303, 3485882003, 713916271, 2879113490, 3730835617, 539548191, 36158695, 1298409750, 419087104, 1358007170, 749914897, 2989680476, 1261868530, 2995193822, 2690628854, 3443622377, 3780124940, 3796824509, 2976433025, 4259637129, 1551479e3, 512490819, 1296650241, 951993153, 2436689437, 2460458047, 144139966, 3136204276, 310820559, 3068840729, 643875328, 1969602020, 1680088954, 2185813161, 3283332454, 672358534, 198762408, 896343282, 276269502, 3014846926, 84060815, 197145886, 376173866, 3943890818, 3813173521, 3545068822, 1316698879, 1598252827, 2633424951, 1233235075, 859989710, 2358460855, 3503838400, 3409603720, 1203513385, 1193654839, 2792018475, 2060853022, 207403770, 1144516871, 3068631394, 1121114134, 177607304, 3785736302, 326409831, 1929119770, 2983279095, 4183308101, 3474579288, 3200513878, 3228482096, 119610148, 1170376745, 3378393471, 3163473169, 951863017, 3337026068, 3135789130, 2907618374, 1183797387, 2015970143, 4045674555, 2182986399, 2952138740, 3928772205, 384012900, 2454997643, 10178499, 2879818989, 2596892536, 111523738, 2995089006, 451689641, 3196290696, 235406569, 1441906262, 3890558523, 3013735005, 4158569349, 1644036924, 376726067, 1006849064, 3664579700, 2041234796, 1021632941, 1374734338, 2566452058, 371631263, 4007144233, 490221539, 206551450, 3140638584, 1053219195, 1853335209, 3412429660, 3562156231, 735133835, 1623211703, 3104214392, 2738312436, 4096837757, 3366392578, 3110964274, 3956598718, 3196820781, 2038037254, 3877786376, 2339753847, 300912036, 3766732888, 2372630639, 1516443558, 4200396704, 1574567987, 4069441456, 4122592016, 2699739776, 146372218, 2748961456, 2043888151, 35287437, 2596680554, 655490400, 1132482787, 110692520, 1031794116, 2188192751, 1324057718, 1217253157, 919197030, 686247489, 3261139658, 1028237775, 3135486431, 3059715558, 2460921700, 986174950, 2661811465, 4062904701, 2752986992, 3709736643, 367056889, 1353824391, 731860949, 1650113154, 1778481506, 784341916, 357075625, 3608602432, 1074092588, 2480052770, 3811426202, 92751289, 877911070, 3600361838, 1231880047, 480201094, 3756190983, 3094495953, 434011822, 87971354, 363687820, 1717726236, 1901380172, 3926403882, 2481662265, 400339184, 1490350766, 2661455099, 1389319756, 2558787174, 784598401, 1983468483, 30828846, 3550527752, 2716276238, 3841122214, 1765724805, 1955612312, 1277890269, 1333098070, 1564029816, 2704417615, 1026694237, 3287671188, 1260819201, 3349086767, 1016692350, 1582273796, 1073413053, 1995943182, 694588404, 1025494639, 3323872702, 3551898420, 4146854327, 453260480, 1316140391, 1435673405, 3038941953, 3486689407, 1622062951, 403978347, 817677117, 950059133, 4246079218, 3278066075, 1486738320, 1417279718, 481875527, 2549965225, 3933690356, 760697757, 1452955855, 3897451437, 1177426808, 1702951038, 4085348628, 2447005172, 1084371187, 3516436277, 3068336338, 1073369276, 1027665953, 3284188590, 1230553676, 1368340146, 2226246512, 267243139, 2274220762, 4070734279, 2497715176, 2423353163, 2504755875), f[7] = new Array(3793104909, 3151888380, 2817252029, 895778965, 2005530807, 3871412763, 237245952, 86829237, 296341424, 3851759377, 3974600970, 2475086196, 709006108, 1994621201, 2972577594, 937287164, 3734691505, 168608556, 3189338153, 2225080640, 3139713551, 3033610191, 3025041904, 77524477, 185966941, 1208824168, 2344345178, 1721625922, 3354191921, 1066374631, 1927223579, 1971335949, 2483503697, 1551748602, 2881383779, 2856329572, 3003241482, 48746954, 1398218158, 2050065058, 313056748, 4255789917, 393167848, 1912293076, 940740642, 3465845460, 3091687853, 2522601570, 2197016661, 1727764327, 364383054, 492521376, 1291706479, 3264136376, 1474851438, 1685747964, 2575719748, 1619776915, 1814040067, 970743798, 1561002147, 2925768690, 2123093554, 1880132620, 3151188041, 697884420, 2550985770, 2607674513, 2659114323, 110200136, 1489731079, 997519150, 1378877361, 3527870668, 478029773, 2766872923, 1022481122, 431258168, 1112503832, 897933369, 2635587303, 669726182, 3383752315, 918222264, 163866573, 3246985393, 3776823163, 114105080, 1903216136, 761148244, 3571337562, 1690750982, 3166750252, 1037045171, 1888456500, 2010454850, 642736655, 616092351, 365016990, 1185228132, 4174898510, 1043824992, 2023083429, 2241598885, 3863320456, 3279669087, 3674716684, 108438443, 2132974366, 830746235, 606445527, 4173263986, 2204105912, 1844756978, 2532684181, 4245352700, 2969441100, 3796921661, 1335562986, 4061524517, 2720232303, 2679424040, 634407289, 885462008, 3294724487, 3933892248, 2094100220, 339117932, 4048830727, 3202280980, 1458155303, 2689246273, 1022871705, 2464987878, 3714515309, 353796843, 2822958815, 4256850100, 4052777845, 551748367, 618185374, 3778635579, 4020649912, 1904685140, 3069366075, 2670879810, 3407193292, 2954511620, 4058283405, 2219449317, 3135758300, 1120655984, 3447565834, 1474845562, 3577699062, 550456716, 3466908712, 2043752612, 881257467, 869518812, 2005220179, 938474677, 3305539448, 3850417126, 1315485940, 3318264702, 226533026, 965733244, 321539988, 1136104718, 804158748, 573969341, 3708209826, 937399083, 3290727049, 2901666755, 1461057207, 4013193437, 4066861423, 3242773476, 2421326174, 1581322155, 3028952165, 786071460, 3900391652, 3918438532, 1485433313, 4023619836, 3708277595, 3678951060, 953673138, 1467089153, 1930354364, 1533292819, 2492563023, 1346121658, 1685000834, 1965281866, 3765933717, 4190206607, 2052792609, 3515332758, 690371149, 3125873887, 2180283551, 2903598061, 3933952357, 436236910, 289419410, 14314871, 1242357089, 2904507907, 1616633776, 2666382180, 585885352, 3471299210, 2699507360, 1432659641, 277164553, 3354103607, 770115018, 2303809295, 3741942315, 3177781868, 2853364978, 2269453327, 3774259834, 987383833, 1290892879, 225909803, 1741533526, 890078084, 1496906255, 1111072499, 916028167, 243534141, 1252605537, 2204162171, 531204876, 290011180, 3916834213, 102027703, 237315147, 209093447, 1486785922, 220223953, 2758195998, 4175039106, 82940208, 3127791296, 2569425252, 518464269, 1353887104, 3941492737, 2377294467, 3935040926)
                }
                function d(a) {
                    this.cast5 = new c, this.cast5.setKey(e.str2bin(a)), this.encrypt = function(a) {
                        return this.cast5.encrypt(a)
                    }
                }
                var e = a("../../util.js");
                b.exports = d, b.exports.blockSize = d.prototype.blockSize = 8, b.exports.keySize = d.prototype.keySize = 16
            }, {"../../util.js": 61}],9: [function(a, b) {
                function c(a, b, c, d, g, h) {
                    var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w = new Array(16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756), x = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344), y = new Array(520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584), z = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928), A = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080), B = new Array(536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312), C = new Array(2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154), D = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696), E = 0, F = b.length, G = 0, H = 32 == a.length ? 3 : 9;
                    for (p = 3 == H ? c ? new Array(0, 32, 2) : new Array(30, -2, -2) : c ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2), c && (b = e(b, h), F = b.length), result = "", tempresult = "", 1 == d && (q = g.charCodeAt(E++) << 24 | g.charCodeAt(E++) << 16 | g.charCodeAt(E++) << 8 | g.charCodeAt(E++), s = g.charCodeAt(E++) << 24 | g.charCodeAt(E++) << 16 | g.charCodeAt(E++) << 8 | g.charCodeAt(E++), E = 0); F > E; ) {
                        for (n = b.charCodeAt(E++) << 24 | b.charCodeAt(E++) << 16 | b.charCodeAt(E++) << 8 | b.charCodeAt(E++), o = b.charCodeAt(E++) << 24 | b.charCodeAt(E++) << 16 | b.charCodeAt(E++) << 8 | b.charCodeAt(E++), 1 == d && (c ? (n ^= q, o ^= s) : (r = q, t = s, q = n, s = o)), k = 252645135 & (n >>> 4 ^ o), o ^= k, n ^= k << 4, k = 65535 & (n >>> 16 ^ o), o ^= k, n ^= k << 16, k = 858993459 & (o >>> 2 ^ n), n ^= k, o ^= k << 2, k = 16711935 & (o >>> 8 ^ n), n ^= k, o ^= k << 8, k = 1431655765 & (n >>> 1 ^ o), o ^= k, n ^= k << 1, n = n << 1 | n >>> 31, o = o << 1 | o >>> 31, j = 0; H > j; j += 3) {
                            for (u = p[j + 1], v = p[j + 2], i = p[j]; i != u; i += v)
                                l = o ^ a[i], m = (o >>> 4 | o << 28) ^ a[i + 1], k = n, n = o, o = k ^ (x[l >>> 24 & 63] | z[l >>> 16 & 63] | B[l >>> 8 & 63] | D[63 & l] | w[m >>> 24 & 63] | y[m >>> 16 & 63] | A[m >>> 8 & 63] | C[63 & m]);
                            k = n, n = o, o = k
                        }
                        n = n >>> 1 | n << 31, o = o >>> 1 | o << 31, k = 1431655765 & (n >>> 1 ^ o), o ^= k, n ^= k << 1, k = 16711935 & (o >>> 8 ^ n), n ^= k, o ^= k << 8, k = 858993459 & (o >>> 2 ^ n), n ^= k, o ^= k << 2, k = 65535 & (n >>> 16 ^ o), o ^= k, n ^= k << 16, k = 252645135 & (n >>> 4 ^ o), o ^= k, n ^= k << 4, 1 == d && (c ? (q = n, s = o) : (n ^= r, o ^= t)), tempresult += String.fromCharCode(n >>> 24, n >>> 16 & 255, n >>> 8 & 255, 255 & n, o >>> 24, o >>> 16 & 255, o >>> 8 & 255, 255 & o), G += 8, 512 == G && (result += tempresult, tempresult = "", G = 0)
                    }
                    return result += tempresult, c || (result = f(result, h)), result
                }
                function d(a) {
                    pc2bytes0 = new Array(0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964), pc2bytes1 = new Array(0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697), pc2bytes2 = new Array(0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272), pc2bytes3 = new Array(0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144), pc2bytes4 = new Array(0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256), pc2bytes5 = new Array(0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488), pc2bytes6 = new Array(0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746), pc2bytes7 = new Array(0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568), pc2bytes8 = new Array(0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578), pc2bytes9 = new Array(0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488), pc2bytes10 = new Array(0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800), pc2bytes11 = new Array(0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744), pc2bytes12 = new Array(0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128), pc2bytes13 = new Array(0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261);
                    for (var b, c, d, e = a.length > 8 ? 3 : 1, f = new Array(32 * e), g = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0), h = 0, j = 0, k = 0; e > k; k++)
                        for (left = a.charCodeAt(h++) << 24 | a.charCodeAt(h++) << 16 | a.charCodeAt(h++) << 8 | a.charCodeAt(h++), right = a.charCodeAt(h++) << 24 | a.charCodeAt(h++) << 16 | a.charCodeAt(h++) << 8 | a.charCodeAt(h++), d = 252645135 & (left >>> 4 ^ right), right ^= d, left ^= d << 4, d = 65535 & (right >>> -16 ^ left), left ^= d, right ^= d << -16, d = 858993459 & (left >>> 2 ^ right), right ^= d, left ^= d << 2, d = 65535 & (right >>> -16 ^ left), left ^= d, right ^= d << -16, d = 1431655765 & (left >>> 1 ^ right), right ^= d, left ^= d << 1, d = 16711935 & (right >>> 8 ^ left), left ^= d, right ^= d << 8, d = 1431655765 & (left >>> 1 ^ right), right ^= d, left ^= d << 1, d = left << 8 | right >>> 20 & 240, left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240, right = d, i = 0; i < g.length; i++)
                            g[i] ? (left = left << 2 | left >>> 26, right = right << 2 | right >>> 26) : (left = left << 1 | left >>> 27, right = right << 1 | right >>> 27), left &= -15, right &= -15, b = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15], c = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15], d = 65535 & (c >>> 16 ^ b), f[j++] = b ^ d, f[j++] = c ^ d << 16;
                    return f
                }
                function e(a, b) {
                    var c = 8 - a.length % 8;
                    return 2 == b && 8 > c ? a += "        ".substr(0, c) : 1 == b ? a += String.fromCharCode(c, c, c, c, c, c, c, c).substr(0, c) : !b && 8 > c && (a += "\x00\x00\x00\x00\x00\x00\x00\x00".substr(0, c)), a
                }
                function f(a, b) {
                    if (2 == b)
                        a = a.replace(/ *$/g, "");
                    else if (1 == b) {
                        var c = a.charCodeAt(a.length - 1);
                        a = a.substr(0, a.length - c)
                    } else
                        b || (a = a.replace(/\0*$/g, ""));
                    return a
                }
                function g(a) {
                    this.key = [];
                    for (var b = 0; 3 > b; b++)
                        this.key.push(a.substr(8 * b, 8));
                    this.encrypt = function(a) {
                        return j.str2bin(c(d(this.key[2]), c(d(this.key[1]), c(d(this.key[0]), j.bin2str(a), !0, 0, null, null), !1, 0, null, null), !0, 0, null, null))
                    }
                }
                function h(a) {
                    this.key = a, this.encrypt = function(a, b) {
                        var e = d(this.key);
                        return j.str2bin(c(e, j.bin2str(a), !0, 0, null, b))
                    }, this.decrypt = function(a, b) {
                        var e = d(this.key);
                        return j.str2bin(c(e, j.bin2str(a), !1, 0, null, b))
                    }
                }
                var j = a("../../util.js");
                g.keySize = g.prototype.keySize = 24, g.blockSize = g.prototype.blockSize = 8, b.exports = {des: g,originalDes: h}
            }, {"../../util.js": 61}],10: [function(a, b) {
                var c = a("./des.js");
                b.exports = {des: c.originalDes,tripledes: c.des,cast5: a("./cast5.js"),twofish: a("./twofish.js"),blowfish: a("./blowfish.js")};
                var d = a("./aes.js");
                for (var e in d)
                    b.exports["aes" + e] = d[e]
            }, {"./aes.js": 6,"./blowfish.js": 7,"./cast5.js": 8,"./des.js": 9,"./twofish.js": 11}],11: [function(a, b) {
                function c(a, b) {
                    return (a << b | a >>> 32 - b) & i
                }
                function d(a, b) {
                    return a[b] | a[b + 1] << 8 | a[b + 2] << 16 | a[b + 3] << 24
                }
                function e(a, b, c) {
                    a.splice(b, 4, 255 & c, c >>> 8 & 255, c >>> 16 & 255, c >>> 24 & 255)
                }
                function f(a, b) {
                    return a >>> 8 * b & 255
                }
                function g() {
                    function a(a) {
                        function b(a) {
                            return a ^ a >> 2 ^ [0, 90, 180, 238][3 & a]
                        }
                        function e(a) {
                            return a ^ a >> 1 ^ a >> 2 ^ [0, 238, 180, 90][3 & a]
                        }
                        function g(a, b) {
                            var c, d, e;
                            for (c = 0; 8 > c; c++)
                                d = b >>> 24, b = b << 8 & i | a >>> 24, a = a << 8 & i, e = d << 1, 128 & d && (e ^= 333), b ^= d ^ e << 16, e ^= d >>> 1, 1 & d && (e ^= 166), b ^= e << 24 | e << 8;
                            return b
                        }
                        function h(a, b) {
                            var c, d, e, f;
                            return c = b >> 4, d = 15 & b, e = A[a][c ^ d], f = B[a][E[d] ^ F[c]], D[a][E[f] ^ F[e]] << 4 | C[a][e ^ f]
                        }
                        function j(a, b) {
                            var c = f(a, 0), d = f(a, 1), e = f(a, 2), g = f(a, 3);
                            switch (q) {
                                case 4:
                                    c = G[1][c] ^ f(b[3], 0), d = G[0][d] ^ f(b[3], 1), e = G[0][e] ^ f(b[3], 2), g = G[1][g] ^ f(b[3], 3);
                                case 3:
                                    c = G[1][c] ^ f(b[2], 0), d = G[1][d] ^ f(b[2], 1), e = G[0][e] ^ f(b[2], 2), g = G[0][g] ^ f(b[2], 3);
                                case 2:
                                    c = G[0][G[0][c] ^ f(b[1], 0)] ^ f(b[0], 0), d = G[0][G[1][d] ^ f(b[1], 1)] ^ f(b[0], 1), e = G[1][G[0][e] ^ f(b[1], 2)] ^ f(b[0], 2), g = G[1][G[1][g] ^ f(b[1], 3)] ^ f(b[0], 3)
                            }
                            return H[0][c] ^ H[1][d] ^ H[2][e] ^ H[3][g]
                        }
                        o = a;
                        var k, l, m, n, p, q, r, u, v, w = [], x = [], y = [], z = [], A = [[8, 1, 7, 13, 6, 15, 3, 2, 0, 11, 5, 9, 14, 12, 10, 4], [2, 8, 11, 13, 15, 7, 6, 14, 3, 1, 9, 4, 0, 10, 12, 5]], B = [[14, 12, 11, 8, 1, 2, 3, 5, 15, 4, 10, 6, 7, 0, 9, 13], [1, 14, 2, 11, 4, 12, 3, 7, 6, 13, 10, 5, 15, 9, 0, 8]], C = [[11, 10, 5, 14, 6, 13, 9, 0, 12, 8, 15, 3, 2, 4, 7, 1], [4, 12, 7, 5, 1, 6, 9, 10, 0, 14, 13, 8, 2, 11, 3, 15]], D = [[13, 7, 15, 4, 1, 2, 6, 14, 9, 11, 3, 0, 8, 5, 12, 10], [11, 9, 5, 1, 12, 3, 13, 14, 6, 4, 7, 15, 2, 0, 8, 10]], E = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15], F = [0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 5, 14, 7], G = [[], []], H = [[], [], [], []];
                        for (o = o.slice(0, 32), k = o.length; 16 != k && 24 != k && 32 != k; )
                            o[k++] = 0;
                        for (k = 0; k < o.length; k += 4)
                            y[k >> 2] = d(o, k);
                        for (k = 0; 256 > k; k++)
                            G[0][k] = h(0, k), G[1][k] = h(1, k);
                        for (k = 0; 256 > k; k++)
                            r = G[1][k], u = b(r), v = e(r), H[0][k] = r + (u << 8) + (v << 16) + (v << 24), H[2][k] = u + (v << 8) + (r << 16) + (v << 24), r = G[0][k], u = b(r), v = e(r), H[1][k] = v + (v << 8) + (u << 16) + (r << 24), H[3][k] = u + (r << 8) + (v << 16) + (u << 24);
                        for (q = y.length / 2, k = 0; q > k; k++)
                            l = y[k + k], w[k] = l, m = y[k + k + 1], x[k] = m, z[q - k - 1] = g(l, m);
                        for (k = 0; 40 > k; k += 2)
                            l = 16843009 * k, m = l + 16843009, l = j(l, w), m = c(j(m, x), 8), s[k] = l + m & i, s[k + 1] = c(l + 2 * m, 9);
                        for (k = 0; 256 > k; k++)
                            switch (l = m = n = p = k, q) {
                                case 4:
                                    l = G[1][l] ^ f(z[3], 0), m = G[0][m] ^ f(z[3], 1), n = G[0][n] ^ f(z[3], 2), p = G[1][p] ^ f(z[3], 3);
                                case 3:
                                    l = G[1][l] ^ f(z[2], 0), m = G[1][m] ^ f(z[2], 1), n = G[0][n] ^ f(z[2], 2), p = G[0][p] ^ f(z[2], 3);
                                case 2:
                                    t[0][k] = H[0][G[0][G[0][l] ^ f(z[1], 0)] ^ f(z[0], 0)], t[1][k] = H[1][G[0][G[1][m] ^ f(z[1], 1)] ^ f(z[0], 1)], t[2][k] = H[2][G[1][G[0][n] ^ f(z[1], 2)] ^ f(z[0], 2)], t[3][k] = H[3][G[1][G[1][p] ^ f(z[1], 3)] ^ f(z[0], 3)]
                            }
                    }
                    function b(a) {
                        return t[0][f(a, 0)] ^ t[1][f(a, 1)] ^ t[2][f(a, 2)] ^ t[3][f(a, 3)]
                    }
                    function g(a) {
                        return t[0][f(a, 3)] ^ t[1][f(a, 0)] ^ t[2][f(a, 1)] ^ t[3][f(a, 2)]
                    }
                    function h(a, d) {
                        var e = b(d[0]), f = g(d[1]);
                        d[2] = c(d[2] ^ e + f + s[4 * a + 8] & i, 31), d[3] = c(d[3], 1) ^ e + 2 * f + s[4 * a + 9] & i, e = b(d[2]), f = g(d[3]), d[0] = c(d[0] ^ e + f + s[4 * a + 10] & i, 31), d[1] = c(d[1], 1) ^ e + 2 * f + s[4 * a + 11] & i
                    }
                    function j(a, d) {
                        var e = b(d[0]), f = g(d[1]);
                        d[2] = c(d[2], 1) ^ e + f + s[4 * a + 10] & i, d[3] = c(d[3] ^ e + 2 * f + s[4 * a + 11] & i, 31), e = b(d[2]), f = g(d[3]), d[0] = c(d[0], 1) ^ e + f + s[4 * a + 8] & i, d[1] = c(d[1] ^ e + 2 * f + s[4 * a + 9] & i, 31)
                    }
                    function k() {
                        s = [], t = [[], [], [], []]
                    }
                    function l(a, b) {
                        p = a, q = b;
                        for (var c = [d(p, q) ^ s[0], d(p, q + 4) ^ s[1], d(p, q + 8) ^ s[2], d(p, q + 12) ^ s[3]], f = 0; 8 > f; f++)
                            h(f, c);
                        return e(p, q, c[2] ^ s[4]), e(p, q + 4, c[3] ^ s[5]), e(p, q + 8, c[0] ^ s[6]), e(p, q + 12, c[1] ^ s[7]), q += 16, p
                    }
                    function m(a, b) {
                        p = a, q = b;
                        for (var c = [d(p, q) ^ s[4], d(p, q + 4) ^ s[5], d(p, q + 8) ^ s[6], d(p, q + 12) ^ s[7]], f = 7; f >= 0; f--)
                            j(f, c);
                        e(p, q, c[2] ^ s[0]), e(p, q + 4, c[3] ^ s[1]), e(p, q + 8, c[0] ^ s[2]), e(p, q + 12, c[1] ^ s[3]), q += 16
                    }
                    function n() {
                        return p
                    }
                    var o = null, p = null, q = -1, r = null;
                    r = "twofish";
                    var s = [], t = [[], [], [], []];
                    return {name: "twofish",blocksize: 16,open: a,close: k,encrypt: l,decrypt: m,finalize: n}
                }
                function h(a) {
                    this.tf = g(), this.tf.open(j.str2bin(a), 0), this.encrypt = function(a) {
                        return this.tf.encrypt([].concat(a), 0)
                    }
                }
                var i = 4294967295, j = a("../../util.js");
                b.exports = h, b.exports.keySize = h.prototype.keySize = 32, b.exports.blockSize = h.prototype.blockSize = 16
            }, {"../../util.js": 61}],12: [function(a, b) {
                var c = a("./random.js"), d = a("./cipher"), e = a("./public_key"), f = a("../type/mpi.js");
                b.exports = {publicKeyEncrypt: function(a, b, c) {
                        var d = function() {
                            var d;
                            switch (a) {
                                case "rsa_encrypt":
                                case "rsa_encrypt_sign":
                                    var f = new e.rsa, g = b[0].toBigInteger(), h = b[1].toBigInteger();
                                    return d = c.toBigInteger(), [f.encrypt(d, h, g)];
                                case "elgamal":
                                    var i = new e.elgamal, j = b[0].toBigInteger(), k = b[1].toBigInteger(), l = b[2].toBigInteger();
                                    return d = c.toBigInteger(), i.encrypt(d, k, j, l);
                                default:
                                    return []
                            }
                        }();
                        return d.map(function(a) {
                            var b = new f;
                            return b.fromBigInteger(a), b
                        })
                    },publicKeyDecrypt: function(a, b, c) {
                        var d, g = function() {
                            switch (a) {
                                case "rsa_encrypt_sign":
                                case "rsa_encrypt":
                                    var f = new e.rsa, g = b[2].toBigInteger();
                                    d = b[3].toBigInteger();
                                    var h = b[4].toBigInteger(), i = b[5].toBigInteger(), j = c[0].toBigInteger();
                                    return f.decrypt(j, g, d, h, i);
                                case "elgamal":
                                    var k = new e.elgamal, l = b[3].toBigInteger(), m = c[0].toBigInteger(), n = c[1].toBigInteger();
                                    return d = b[0].toBigInteger(), k.decrypt(m, n, d, l);
                                default:
                                    return null
                            }
                        }(), h = new f;
                        return h.fromBigInteger(g), h
                    },getPrivateMpiCount: function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                            case "rsa_sign":
                                return 4;
                            case "elgamal":
                                return 1;
                            case "dsa":
                                return 1;
                            default:
                                throw new Error("Unknown algorithm")
                        }
                    },getPublicMpiCount: function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                            case "rsa_sign":
                                return 2;
                            case "elgamal":
                                return 3;
                            case "dsa":
                                return 4;
                            default:
                                throw new Error("Unknown algorithm.")
                        }
                    },generateMpi: function(a, b) {
                        var c = function() {
                            switch (a) {
                                case "rsa_encrypt":
                                case "rsa_encrypt_sign":
                                case "rsa_sign":
                                    var c = new e.rsa, d = c.generate(b, "10001"), f = [];
                                    return f.push(d.n), f.push(d.ee), f.push(d.d), f.push(d.p), f.push(d.q), f.push(d.u), f;
                                default:
                                    throw new Error("Unsupported algorithm for key generation.")
                            }
                        }();
                        return c.map(function(a) {
                            var b = new f;
                            return b.fromBigInteger(a), b
                        })
                    },getPrefixRandom: function(a) {
                        return c.getRandomBytes(d[a].blockSize)
                    },generateSessionKey: function(a) {
                        return c.getRandomBytes(d[a].keySize)
                    }}
            }, {"../type/mpi.js": 59,"./cipher": 10,"./public_key": 23,"./random.js": 26}],13: [function(a, b) {
                var c = b.exports = {}, d = a("./forge_util.js"), e = null, f = !1, g = null, h = function() {
                    e = String.fromCharCode(128), e += d.fillString(String.fromCharCode(0), 64), g = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], f = !0
                }, i = function(a, b, c) {
                    for (var d, e, f, h, i, j, k, l, m, n, o, p, q, r, s, t = c.length(); t >= 64; ) {
                        for (k = 0; 16 > k; ++k)
                            b[k] = c.getInt32();
                        for (; 64 > k; ++k)
                            d = b[k - 2], d = (d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10, e = b[k - 15], e = (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3, b[k] = d + b[k - 7] + e + b[k - 16] & 4294967295;
                        for (l = a.h0, m = a.h1, n = a.h2, o = a.h3, p = a.h4, q = a.h5, r = a.h6, s = a.h7, k = 0; 64 > k; ++k)
                            h = (p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7), i = r ^ p & (q ^ r), f = (l >>> 2 | l << 30) ^ (l >>> 13 | l << 19) ^ (l >>> 22 | l << 10), j = l & m | n & (l ^ m), d = s + h + i + g[k] + b[k], e = f + j, s = r, r = q, q = p, p = o + d & 4294967295, o = n, n = m, m = l, l = d + e & 4294967295;
                        a.h0 = a.h0 + l & 4294967295, a.h1 = a.h1 + m & 4294967295, a.h2 = a.h2 + n & 4294967295, a.h3 = a.h3 + o & 4294967295, a.h4 = a.h4 + p & 4294967295, a.h5 = a.h5 + q & 4294967295, a.h6 = a.h6 + r & 4294967295, a.h7 = a.h7 + s & 4294967295, t -= 64
                    }
                };
                c.create = function() {
                    f || h();
                    var a = null, b = d.createBuffer(), c = new Array(64), g = {algorithm: "sha256",blockLength: 64,digestLength: 32,messageLength: 0};
                    return g.start = function() {
                        return g.messageLength = 0, b = d.createBuffer(), a = {h0: 1779033703,h1: 3144134277,h2: 1013904242,h3: 2773480762,h4: 1359893119,h5: 2600822924,h6: 528734635,h7: 1541459225}, g
                    }, g.start(), g.update = function(e, f) {
                        return "utf8" === f && (e = d.encodeUtf8(e)), g.messageLength += e.length, b.putBytes(e), i(a, c, b), (b.read > 2048 || 0 === b.length()) && b.compact(), g
                    }, g.digest = function() {
                        var f = g.messageLength, h = d.createBuffer();
                        h.putBytes(b.bytes()), h.putBytes(e.substr(0, 64 - (f + 8) % 64)), h.putInt32(f >>> 29 & 255), h.putInt32(f << 3 & 4294967295);
                        var j = {h0: a.h0,h1: a.h1,h2: a.h2,h3: a.h3,h4: a.h4,h5: a.h5,h6: a.h6,h7: a.h7};
                        i(j, c, h);
                        var k = d.createBuffer();
                        return k.putInt32(j.h0), k.putInt32(j.h1), k.putInt32(j.h2), k.putInt32(j.h3), k.putInt32(j.h4), k.putInt32(j.h5), k.putInt32(j.h6), k.putInt32(j.h7), k
                    }, g
                }
            }, {"./forge_util.js": 14}],14: [function(a, b) {
                var c = b.exports = {};
                c.isArray = Array.isArray || function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }, c.isArrayBuffer = function(a) {
                    return "undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer
                };
                var d = [];
                "undefined" != typeof Int8Array && d.push(Int8Array), "undefined" != typeof Uint8Array && d.push(Uint8Array), "undefined" != typeof Uint8ClampedArray && d.push(Uint8ClampedArray), "undefined" != typeof Int16Array && d.push(Int16Array), "undefined" != typeof Uint16Array && d.push(Uint16Array), "undefined" != typeof Int32Array && d.push(Int32Array), "undefined" != typeof Uint32Array && d.push(Uint32Array), "undefined" != typeof Float32Array && d.push(Float32Array), "undefined" != typeof Float64Array && d.push(Float64Array), c.isArrayBufferView = function(a) {
                    for (var b = 0; b < d.length; ++b)
                        if (a instanceof d[b])
                            return !0;
                    return !1
                }, c.ByteBuffer = function(a) {
                    if (this.data = "", this.read = 0, "string" == typeof a)
                        this.data = a;
                    else if (c.isArrayBuffer(a) || c.isArrayBufferView(a)) {
                        var b = new Uint8Array(a);
                        try {
                            this.data = String.fromCharCode.apply(null, b)
                        } catch (d) {
                            for (var e = 0; e < b.length; ++e)
                                this.putByte(b[e])
                        }
                    }
                }, c.ByteBuffer.prototype.length = function() {
                    return this.data.length - this.read
                }, c.ByteBuffer.prototype.isEmpty = function() {
                    return this.length() <= 0
                }, c.ByteBuffer.prototype.putByte = function(a) {
                    return this.data += String.fromCharCode(a), this
                }, c.ByteBuffer.prototype.fillWithByte = function(a, b) {
                    a = String.fromCharCode(a);
                    for (var c = this.data; b > 0; )
                        1 & b && (c += a), b >>>= 1, b > 0 && (a += a);
                    return this.data = c, this
                }, c.ByteBuffer.prototype.putBytes = function(a) {
                    return this.data += a, this
                }, c.ByteBuffer.prototype.putString = function(a) {
                    return this.data += c.encodeUtf8(a), this
                }, c.ByteBuffer.prototype.putInt16 = function(a) {
                    return this.data += String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt24 = function(a) {
                    return this.data += String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt32 = function(a) {
                    return this.data += String.fromCharCode(a >> 24 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a), this
                }, c.ByteBuffer.prototype.putInt16Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255), this
                }, c.ByteBuffer.prototype.putInt24Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(a >> 16 & 255), this
                }, c.ByteBuffer.prototype.putInt32Le = function(a) {
                    return this.data += String.fromCharCode(255 & a) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 24 & 255), this
                }, c.ByteBuffer.prototype.putInt = function(a, b) {
                    do
                        b -= 8, this.data += String.fromCharCode(a >> b & 255);
                    while (b > 0);
                    return this
                }, c.ByteBuffer.prototype.putSignedInt = function(a, b) {
                    return 0 > a && (a += 2 << b - 1), this.putInt(a, b)
                }, c.ByteBuffer.prototype.putBuffer = function(a) {
                    return this.data += a.getBytes(), this
                }, c.ByteBuffer.prototype.getByte = function() {
                    return this.data.charCodeAt(this.read++)
                }, c.ByteBuffer.prototype.getInt16 = function() {
                    var a = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
                    return this.read += 2, a
                }, c.ByteBuffer.prototype.getInt24 = function() {
                    var a = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
                    return this.read += 3, a
                }, c.ByteBuffer.prototype.getInt32 = function() {
                    var a = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
                    return this.read += 4, a
                }, c.ByteBuffer.prototype.getInt16Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
                    return this.read += 2, a
                }, c.ByteBuffer.prototype.getInt24Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
                    return this.read += 3, a
                }, c.ByteBuffer.prototype.getInt32Le = function() {
                    var a = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
                    return this.read += 4, a
                }, c.ByteBuffer.prototype.getInt = function(a) {
                    var b = 0;
                    do
                        b = (b << 8) + this.data.charCodeAt(this.read++), a -= 8;
                    while (a > 0);
                    return b
                }, c.ByteBuffer.prototype.getSignedInt = function(a) {
                    var b = this.getInt(a), c = 2 << a - 2;
                    return b >= c && (b -= c << 1), b
                }, c.ByteBuffer.prototype.getBytes = function(a) {
                    var b;
                    return a ? (a = Math.min(this.length(), a), b = this.data.slice(this.read, this.read + a), this.read += a) : 0 === a ? b = "" : (b = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), b
                }, c.ByteBuffer.prototype.bytes = function(a) {
                    return "undefined" == typeof a ? this.data.slice(this.read) : this.data.slice(this.read, this.read + a)
                }, c.ByteBuffer.prototype.at = function(a) {
                    return this.data.charCodeAt(this.read + a)
                }, c.ByteBuffer.prototype.setAt = function(a, b) {
                    return this.data = this.data.substr(0, this.read + a) + String.fromCharCode(b) + this.data.substr(this.read + a + 1), this
                }, c.ByteBuffer.prototype.last = function() {
                    return this.data.charCodeAt(this.data.length - 1)
                }, c.ByteBuffer.prototype.copy = function() {
                    var a = c.createBuffer(this.data);
                    return a.read = this.read, a
                }, c.ByteBuffer.prototype.compact = function() {
                    return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this
                }, c.ByteBuffer.prototype.clear = function() {
                    return this.data = "", this.read = 0, this
                }, c.ByteBuffer.prototype.truncate = function(a) {
                    var b = Math.max(0, this.length() - a);
                    return this.data = this.data.substr(this.read, b), this.read = 0, this
                }, c.ByteBuffer.prototype.toHex = function() {
                    for (var a = "", b = this.read; b < this.data.length; ++b) {
                        var c = this.data.charCodeAt(b);
                        16 > c && (a += "0"), a += c.toString(16)
                    }
                    return a
                }, c.ByteBuffer.prototype.toString = function() {
                    return c.decodeUtf8(this.bytes())
                }, c.createBuffer = function(a, b) {
                    return b = b || "raw", void 0 !== a && "utf8" === b && (a = c.encodeUtf8(a)), new c.ByteBuffer(a)
                }, c.fillString = function(a, b) {
                    for (var c = ""; b > 0; )
                        1 & b && (c += a), b >>>= 1, b > 0 && (a += a);
                    return c
                }, c.xorBytes = function(a, b, c) {
                    for (var d = "", e = "", f = "", g = 0, h = 0; c > 0; --c, ++g)
                        e = a.charCodeAt(g) ^ b.charCodeAt(g), h >= 10 && (d += f, f = "", h = 0), f += String.fromCharCode(e), ++h;
                    return d += f
                }, c.hexToBytes = function(a) {
                    var b = "", c = 0;
                    for (a.length & !0 && (c = 1, b += String.fromCharCode(parseInt(a[0], 16))); c < a.length; c += 2)
                        b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
                    return b
                }, c.bytesToHex = function(a) {
                    return c.createBuffer(a).toHex()
                }, c.int32ToBytes = function(a) {
                    return String.fromCharCode(a >> 24 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(255 & a)
                };
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", f = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
                c.encode64 = function(a, b) {
                    for (var c, d, f, g = "", h = "", i = 0; i < a.length; )
                        c = a.charCodeAt(i++), d = a.charCodeAt(i++), f = a.charCodeAt(i++), g += e.charAt(c >> 2), g += e.charAt((3 & c) << 4 | d >> 4), isNaN(d) ? g += "==" : (g += e.charAt((15 & d) << 2 | f >> 6), g += isNaN(f) ? "=" : e.charAt(63 & f)), b && g.length > b && (h += g.substr(0, b) + "\r\n", g = g.substr(b));
                    return h += g
                }, c.decode64 = function(a) {
                    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    for (var b, c, d, e, g = "", h = 0; h < a.length; )
                        b = f[a.charCodeAt(h++) - 43], c = f[a.charCodeAt(h++) - 43], d = f[a.charCodeAt(h++) - 43], e = f[a.charCodeAt(h++) - 43], g += String.fromCharCode(b << 2 | c >> 4), 64 !== d && (g += String.fromCharCode((15 & c) << 4 | d >> 2), 64 !== e && (g += String.fromCharCode((3 & d) << 6 | e)));
                    return g
                }, c.encodeUtf8 = function(a) {
                    return unescape(encodeURIComponent(a))
                }, c.decodeUtf8 = function(a) {
                    return decodeURIComponent(escape(a))
                }
            }, {}],15: [function(a, b) {
                var c = a("./sha.js"), d = a("./forge_sha256.js");
                b.exports = {md5: a("./md5.js"),sha1: c.sha1,sha224: c.sha224,sha256: c.sha256,sha384: c.sha384,sha512: c.sha512,ripemd: a("./ripe-md.js"),digest: function(a, b) {
                        switch (a) {
                            case 1:
                                return this.md5(b);
                            case 2:
                                return this.sha1(b);
                            case 3:
                                return this.ripemd(b);
                            case 8:
                                var c = d.create();
                                return c.update(b), c.digest().getBytes();
                            case 9:
                                return this.sha384(b);
                            case 10:
                                return this.sha512(b);
                            case 11:
                                return this.sha224(b);
                            default:
                                throw new Error("Invalid hash function.")
                        }
                    },getHashByteLength: function(a) {
                        switch (a) {
                            case 1:
                                return 16;
                            case 2:
                            case 3:
                                return 20;
                            case 8:
                                return 32;
                            case 9:
                                return 48;
                            case 10:
                                return 64;
                            case 11:
                                return 28;
                            default:
                                throw new Error("Invalid hash algorithm.")
                        }
                    }}
            }, {"./forge_sha256.js": 13,"./md5.js": 16,"./ripe-md.js": 17,"./sha.js": 18}],16: [function(a, b) {
                function c(a, b) {
                    var c = a[0], d = a[1], i = a[2], j = a[3];
                    c = e(c, d, i, j, b[0], 7, -680876936), j = e(j, c, d, i, b[1], 12, -389564586), i = e(i, j, c, d, b[2], 17, 606105819), d = e(d, i, j, c, b[3], 22, -1044525330), c = e(c, d, i, j, b[4], 7, -176418897), j = e(j, c, d, i, b[5], 12, 1200080426), i = e(i, j, c, d, b[6], 17, -1473231341), d = e(d, i, j, c, b[7], 22, -45705983), c = e(c, d, i, j, b[8], 7, 1770035416), j = e(j, c, d, i, b[9], 12, -1958414417), i = e(i, j, c, d, b[10], 17, -42063), d = e(d, i, j, c, b[11], 22, -1990404162), c = e(c, d, i, j, b[12], 7, 1804603682), j = e(j, c, d, i, b[13], 12, -40341101), i = e(i, j, c, d, b[14], 17, -1502002290), d = e(d, i, j, c, b[15], 22, 1236535329), c = f(c, d, i, j, b[1], 5, -165796510), j = f(j, c, d, i, b[6], 9, -1069501632), i = f(i, j, c, d, b[11], 14, 643717713), d = f(d, i, j, c, b[0], 20, -373897302), c = f(c, d, i, j, b[5], 5, -701558691), j = f(j, c, d, i, b[10], 9, 38016083), i = f(i, j, c, d, b[15], 14, -660478335), d = f(d, i, j, c, b[4], 20, -405537848), c = f(c, d, i, j, b[9], 5, 568446438), j = f(j, c, d, i, b[14], 9, -1019803690), i = f(i, j, c, d, b[3], 14, -187363961), d = f(d, i, j, c, b[8], 20, 1163531501), c = f(c, d, i, j, b[13], 5, -1444681467), j = f(j, c, d, i, b[2], 9, -51403784), i = f(i, j, c, d, b[7], 14, 1735328473), d = f(d, i, j, c, b[12], 20, -1926607734), c = g(c, d, i, j, b[5], 4, -378558), j = g(j, c, d, i, b[8], 11, -2022574463), i = g(i, j, c, d, b[11], 16, 1839030562), d = g(d, i, j, c, b[14], 23, -35309556), c = g(c, d, i, j, b[1], 4, -1530992060), j = g(j, c, d, i, b[4], 11, 1272893353), i = g(i, j, c, d, b[7], 16, -155497632), d = g(d, i, j, c, b[10], 23, -1094730640), c = g(c, d, i, j, b[13], 4, 681279174), j = g(j, c, d, i, b[0], 11, -358537222), i = g(i, j, c, d, b[3], 16, -722521979), d = g(d, i, j, c, b[6], 23, 76029189), c = g(c, d, i, j, b[9], 4, -640364487), j = g(j, c, d, i, b[12], 11, -421815835), i = g(i, j, c, d, b[15], 16, 530742520), d = g(d, i, j, c, b[2], 23, -995338651), c = h(c, d, i, j, b[0], 6, -198630844), j = h(j, c, d, i, b[7], 10, 1126891415), i = h(i, j, c, d, b[14], 15, -1416354905), d = h(d, i, j, c, b[5], 21, -57434055), c = h(c, d, i, j, b[12], 6, 1700485571), j = h(j, c, d, i, b[3], 10, -1894986606), i = h(i, j, c, d, b[10], 15, -1051523), d = h(d, i, j, c, b[1], 21, -2054922799), c = h(c, d, i, j, b[8], 6, 1873313359), j = h(j, c, d, i, b[15], 10, -30611744), i = h(i, j, c, d, b[6], 15, -1560198380), d = h(d, i, j, c, b[13], 21, 1309151649), c = h(c, d, i, j, b[4], 6, -145523070), j = h(j, c, d, i, b[11], 10, -1120210379), i = h(i, j, c, d, b[2], 15, 718787259), d = h(d, i, j, c, b[9], 21, -343485551), a[0] = n(c, a[0]), a[1] = n(d, a[1]), a[2] = n(i, a[2]), a[3] = n(j, a[3])
                }
                function d(a, b, c, d, e, f) {
                    return b = n(n(b, a), n(d, f)), n(b << e | b >>> 32 - e, c)
                }
                function e(a, b, c, e, f, g, h) {
                    return d(b & c | ~b & e, a, b, f, g, h)
                }
                function f(a, b, c, e, f, g, h) {
                    return d(b & e | c & ~e, a, b, f, g, h)
                }
                function g(a, b, c, e, f, g, h) {
                    return d(b ^ c ^ e, a, b, f, g, h)
                }
                function h(a, b, c, e, f, g, h) {
                    return d(c ^ (b | ~e), a, b, f, g, h)
                }
                function i(a) {
                    txt = "";
                    var b, d = a.length, e = [1732584193, -271733879, -1732584194, 271733878];
                    for (b = 64; b <= a.length; b += 64)
                        c(e, j(a.substring(b - 64, b)));
                    a = a.substring(b - 64);
                    var f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (b = 0; b < a.length; b++)
                        f[b >> 2] |= a.charCodeAt(b) << (b % 4 << 3);
                    if (f[b >> 2] |= 128 << (b % 4 << 3), b > 55)
                        for (c(e, f), b = 0; 16 > b; b++)
                            f[b] = 0;
                    return f[14] = 8 * d, c(e, f), e
                }
                function j(a) {
                    var b, c = [];
                    for (b = 0; 64 > b; b += 4)
                        c[b >> 2] = a.charCodeAt(b) + (a.charCodeAt(b + 1) << 8) + (a.charCodeAt(b + 2) << 16) + (a.charCodeAt(b + 3) << 24);
                    return c
                }
                function k(a) {
                    for (var b = "", c = 0; 4 > c; c++)
                        b += p[a >> 8 * c + 4 & 15] + p[a >> 8 * c & 15];
                    return b
                }
                function l(a) {
                    for (var b = 0; b < a.length; b++)
                        a[b] = k(a[b]);
                    return a.join("")
                }
                function m(a) {
                    return l(i(a))
                }
                function n(a, b) {
                    return a + b & 4294967295
                }
                function n(a, b) {
                    var c = (65535 & a) + (65535 & b), d = (a >> 16) + (b >> 16) + (c >> 16);
                    return d << 16 | 65535 & c
                }
                var o = a("../../util.js");
                b.exports = function(a) {
                    var b = m(a), c = o.hex2bin(b);
                    return c
                };
                var p = "0123456789abcdef".split("");
                "5d41402abc4b2a76b9719d911017c592" != m("hello")
            }, {"../../util.js": 61}],17: [function(a, b) {
                function c(a, b) {
                    return new Number(a << b | a >>> 32 - b)
                }
                function d(a, b, c) {
                    return new Number(a ^ b ^ c)
                }
                function e(a, b, c) {
                    return new Number(a & b | ~a & c)
                }
                function f(a, b, c) {
                    return new Number((a | ~b) ^ c)
                }
                function g(a, b, c) {
                    return new Number(a & c | b & ~c)
                }
                function h(a, b, c) {
                    return new Number(a ^ (b | ~c))
                }
                function i(a, b, i, j, k, l, m, n) {
                    switch (n) {
                        case 0:
                            a += d(b, i, j) + l + 0;
                            break;
                        case 1:
                            a += e(b, i, j) + l + 1518500249;
                            break;
                        case 2:
                            a += f(b, i, j) + l + 1859775393;
                            break;
                        case 3:
                            a += g(b, i, j) + l + 2400959708;
                            break;
                        case 4:
                            a += h(b, i, j) + l + 2840853838;
                            break;
                        case 5:
                            a += h(b, i, j) + l + 1352829926;
                            break;
                        case 6:
                            a += g(b, i, j) + l + 1548603684;
                            break;
                        case 7:
                            a += f(b, i, j) + l + 1836072691;
                            break;
                        case 8:
                            a += e(b, i, j) + l + 2053994217;
                            break;
                        case 9:
                            a += d(b, i, j) + l + 0;
                            break;
                        default:
                            document.write("Bogus round number")
                    }
                    a = c(a, m) + k, i = c(i, 10), a &= 4294967295, b &= 4294967295, i &= 4294967295, j &= 4294967295, k &= 4294967295;
                    var o = [];
                    return o[0] = a, o[1] = b, o[2] = i, o[3] = j, o[4] = k, o[5] = l, o[6] = m, o
                }
                function j(a) {
                    a[0] = 1732584193, a[1] = 4023233417, a[2] = 2562383102, a[3] = 271733878, a[4] = 3285377520
                }
                function k(a, b) {
                    blockA = [], blockB = [];
                    var c, d, e;
                    for (d = 0; 5 > d; d++)
                        blockA[d] = new Number(a[d]), blockB[d] = new Number(a[d]);
                    var f = 0;
                    for (e = 0; 5 > e; e++)
                        for (d = 0; 16 > d; d++)
                            c = i(blockA[(f + 0) % 5], blockA[(f + 1) % 5], blockA[(f + 2) % 5], blockA[(f + 3) % 5], blockA[(f + 4) % 5], b[s[e][d]], r[e][d], e), blockA[(f + 0) % 5] = c[0], blockA[(f + 1) % 5] = c[1], blockA[(f + 2) % 5] = c[2], blockA[(f + 3) % 5] = c[3], blockA[(f + 4) % 5] = c[4], f += 4;
                    for (f = 0, e = 5; 10 > e; e++)
                        for (d = 0; 16 > d; d++)
                            c = i(blockB[(f + 0) % 5], blockB[(f + 1) % 5], blockB[(f + 2) % 5], blockB[(f + 3) % 5], blockB[(f + 4) % 5], b[s[e][d]], r[e][d], e), blockB[(f + 0) % 5] = c[0], blockB[(f + 1) % 5] = c[1], blockB[(f + 2) % 5] = c[2], blockB[(f + 3) % 5] = c[3], blockB[(f + 4) % 5] = c[4], f += 4;
                    blockB[3] += blockA[2] + a[1], a[1] = a[2] + blockA[3] + blockB[4], a[2] = a[3] + blockA[4] + blockB[0], a[3] = a[4] + blockA[0] + blockB[1], a[4] = a[0] + blockA[1] + blockB[2], a[0] = blockB[3]
                }
                function l(a) {
                    for (var b = 0; 16 > b; b++)
                        a[b] = 0
                }
                function m(a, b, c, d) {
                    var e = new Array(16);
                    l(e);
                    for (var f = 0, g = 0; (63 & c) > g; g++)
                        e[g >>> 2] ^= (255 & b.charCodeAt(f++)) << 8 * (3 & g);
                    e[c >>> 2 & 15] ^= 1 << 8 * (3 & c) + 7, (63 & c) > 55 && (k(a, e), e = new Array(16), l(e)), e[14] = c << 3, e[15] = c >>> 29 | d << 3, k(a, e)
                }
                function n(a) {
                    var b = (255 & a.charCodeAt(3)) << 24;
                    return b |= (255 & a.charCodeAt(2)) << 16, b |= (255 & a.charCodeAt(1)) << 8, b |= 255 & a.charCodeAt(0)
                }
                function o(a) {
                    var b, c, d = new Array(q / 32), e = new Array(q / 8);
                    j(d), b = a.length;
                    var f = new Array(16);
                    l(f);
                    var g, h = 0;
                    for (c = b; c > 63; c -= 64) {
                        for (g = 0; 16 > g; g++)
                            f[g] = n(a.substr(h, 4)), h += 4;
                        k(d, f)
                    }
                    for (m(d, a.substr(h), b, 0), g = 0; q / 8 > g; g += 4)
                        e[g] = 255 & d[g >>> 2], e[g + 1] = d[g >>> 2] >>> 8 & 255, e[g + 2] = d[g >>> 2] >>> 16 & 255, e[g + 3] = d[g >>> 2] >>> 24 & 255;
                    return e
                }
                function p(a) {
                    for (var b = o(a), c = "", d = 0; q / 8 > d; d++)
                        c += String.fromCharCode(b[d]);
                    return c
                }
                var q = 160, r = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12], [11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5], [11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12], [9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6], [9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11], [9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5], [15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8], [8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]], s = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8], [3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12], [1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2], [4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12], [6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2], [15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13], [8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14], [12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]];
                b.exports = p
            }, {}],18: [function(a, b) {
                var c = function() {
                    var a = 8, b = "", c = 0, d = function(a, b) {
                        this.highOrder = a, this.lowOrder = b
                    }, e = function(b) {
                        var c, d = [], e = (1 << a) - 1, f = b.length * a;
                        for (c = 0; f > c; c += a)
                            d[c >> 5] |= (b.charCodeAt(c / a) & e) << 32 - a - c % 32;
                        return d
                    }, f = function(a) {
                        var b, c, d = [], e = a.length;
                        for (b = 0; e > b; b += 2) {
                            if (c = parseInt(a.substr(b, 2), 16), isNaN(c))
                                return "INVALID HEX STRING";
                            d[b >> 3] |= c << 24 - 4 * (b % 8)
                        }
                        return d
                    }, g = function(a) {
                        var b, d, e = c ? "0123456789ABCDEF" : "0123456789abcdef", f = "", g = 4 * a.length;
                        for (b = 0; g > b; b += 1)
                            d = a[b >> 2] >> 8 * (3 - b % 4), f += e.charAt(d >> 4 & 15) + e.charAt(15 & d);
                        return f
                    }, h = function(a) {
                        var c, d, e, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", g = "", h = 4 * a.length;
                        for (c = 0; h > c; c += 3)
                            for (e = (a[c >> 2] >> 8 * (3 - c % 4) & 255) << 16 | (a[c + 1 >> 2] >> 8 * (3 - (c + 1) % 4) & 255) << 8 | a[c + 2 >> 2] >> 8 * (3 - (c + 2) % 4) & 255, d = 0; 4 > d; d += 1)
                                g += 8 * c + 6 * d <= 32 * a.length ? f.charAt(e >> 6 * (3 - d) & 63) : b;
                        return g
                    }, i = function(a) {
                        for (var b = "", c = 255, d = 0; d < 32 * a.length; d += 8)
                            b += String.fromCharCode(a[d >> 5] >>> 24 - d % 32 & c);
                        return b
                    }, j = function(a, b) {
                        return a << b | a >>> 32 - b
                    }, k = function(a, b) {
                        return a >>> b | a << 32 - b
                    }, l = function(a, b) {
                        return 32 >= b ? new d(a.highOrder >>> b | a.lowOrder << 32 - b, a.lowOrder >>> b | a.highOrder << 32 - b) : new d(a.lowOrder >>> b | a.highOrder << 32 - b, a.highOrder >>> b | a.lowOrder << 32 - b)
                    }, m = function(a, b) {
                        return a >>> b
                    }, n = function(a, b) {
                        return 32 >= b ? new d(a.highOrder >>> b, a.lowOrder >>> b | a.highOrder << 32 - b) : new d(0, a.highOrder << 32 - b)
                    }, o = function(a, b, c) {
                        return a ^ b ^ c
                    }, p = function(a, b, c) {
                        return a & b ^ ~a & c
                    }, q = function(a, b, c) {
                        return new d(a.highOrder & b.highOrder ^ ~a.highOrder & c.highOrder, a.lowOrder & b.lowOrder ^ ~a.lowOrder & c.lowOrder)
                    }, r = function(a, b, c) {
                        return a & b ^ a & c ^ b & c
                    }, s = function(a, b, c) {
                        return new d(a.highOrder & b.highOrder ^ a.highOrder & c.highOrder ^ b.highOrder & c.highOrder, a.lowOrder & b.lowOrder ^ a.lowOrder & c.lowOrder ^ b.lowOrder & c.lowOrder)
                    }, t = function(a) {
                        return k(a, 2) ^ k(a, 13) ^ k(a, 22)
                    }, u = function(a) {
                        var b = l(a, 28), c = l(a, 34), e = l(a, 39);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, v = function(a) {
                        return k(a, 6) ^ k(a, 11) ^ k(a, 25)
                    }, w = function(a) {
                        var b = l(a, 14), c = l(a, 18), e = l(a, 41);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, x = function(a) {
                        return k(a, 7) ^ k(a, 18) ^ m(a, 3)
                    }, y = function(a) {
                        var b = l(a, 1), c = l(a, 8), e = n(a, 7);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, z = function(a) {
                        return k(a, 17) ^ k(a, 19) ^ m(a, 10)
                    }, A = function(a) {
                        var b = l(a, 19), c = l(a, 61), e = n(a, 6);
                        return new d(b.highOrder ^ c.highOrder ^ e.highOrder, b.lowOrder ^ c.lowOrder ^ e.lowOrder)
                    }, B = function(a, b) {
                        var c = (65535 & a) + (65535 & b), d = (a >>> 16) + (b >>> 16) + (c >>> 16);
                        return (65535 & d) << 16 | 65535 & c
                    }, C = function(a, b, c, d) {
                        var e = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d), f = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16);
                        return (65535 & f) << 16 | 65535 & e
                    }, D = function(a, b, c, d, e) {
                        var f = (65535 & a) + (65535 & b) + (65535 & c) + (65535 & d) + (65535 & e), g = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16);
                        return (65535 & g) << 16 | 65535 & f
                    }, E = function(a, b) {
                        var c, e, f, g;
                        return c = (65535 & a.lowOrder) + (65535 & b.lowOrder), e = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c >>> 16), f = (65535 & e) << 16 | 65535 & c, c = (65535 & a.highOrder) + (65535 & b.highOrder) + (e >>> 16), e = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c >>> 16), g = (65535 & e) << 16 | 65535 & c, new d(g, f)
                    }, F = function(a, b, c, e) {
                        var f, g, h, i;
                        return f = (65535 & a.lowOrder) + (65535 & b.lowOrder) + (65535 & c.lowOrder) + (65535 & e.lowOrder), g = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f >>> 16), h = (65535 & g) << 16 | 65535 & f, f = (65535 & a.highOrder) + (65535 & b.highOrder) + (65535 & c.highOrder) + (65535 & e.highOrder) + (g >>> 16), g = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (e.highOrder >>> 16) + (f >>> 16), i = (65535 & g) << 16 | 65535 & f, new d(i, h)
                    }, G = function(a, b, c, e, f) {
                        var g, h, i, j;
                        return g = (65535 & a.lowOrder) + (65535 & b.lowOrder) + (65535 & c.lowOrder) + (65535 & e.lowOrder) + (65535 & f.lowOrder), h = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) + (c.lowOrder >>> 16) + (e.lowOrder >>> 16) + (f.lowOrder >>> 16) + (g >>> 16), i = (65535 & h) << 16 | 65535 & g, g = (65535 & a.highOrder) + (65535 & b.highOrder) + (65535 & c.highOrder) + (65535 & e.highOrder) + (65535 & f.highOrder) + (h >>> 16), h = (a.highOrder >>> 16) + (b.highOrder >>> 16) + (c.highOrder >>> 16) + (e.highOrder >>> 16) + (f.highOrder >>> 16) + (g >>> 16), j = (65535 & h) << 16 | 65535 & g, new d(j, i)
                    }, H = function(a, b) {
                        var c, d, e, f, g, h, i, k, l, m = [], n = p, q = o, s = r, t = j, u = B, v = D, w = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], x = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
                        for (a[b >> 5] |= 128 << 24 - b % 32, a[(b + 65 >> 9 << 4) + 15] = b, l = a.length, i = 0; l > i; i += 16) {
                            for (c = w[0], d = w[1], e = w[2], f = w[3], g = w[4], k = 0; 80 > k; k += 1)
                                m[k] = 16 > k ? a[k + i] : t(m[k - 3] ^ m[k - 8] ^ m[k - 14] ^ m[k - 16], 1), h = 20 > k ? v(t(c, 5), n(d, e, f), g, x[k], m[k]) : 40 > k ? v(t(c, 5), q(d, e, f), g, x[k], m[k]) : 60 > k ? v(t(c, 5), s(d, e, f), g, x[k], m[k]) : v(t(c, 5), q(d, e, f), g, x[k], m[k]), g = f, f = e, e = t(d, 30), d = c, c = h;
                            w[0] = u(c, w[0]), w[1] = u(d, w[1]), w[2] = u(e, w[2]), w[3] = u(f, w[3]), w[4] = u(g, w[4])
                        }
                        return w
                    }, I = function(a, b, c) {
                        var e, f, g, h, i, j, k, l, m, n, o, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z = [];
                        for ("SHA-224" === c || "SHA-256" === c ? (H = 64, I = (b + 65 >> 9 << 4) + 15, L = 16, M = 1, W = Number, N = B, O = C, P = D, Q = x, R = z, S = t, T = v, V = r, U = p, X = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], o = "SHA-224" === c ? [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428] : [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]) : ("SHA-384" === c || "SHA-512" === c) && (H = 80, I = (b + 128 >> 10 << 5) + 31, L = 32, M = 2, W = d, N = E, O = F, P = G, Q = y, R = A, S = u, T = w, V = s, U = q, X = [new W(1116352408, 3609767458), new W(1899447441, 602891725), new W(3049323471, 3964484399), new W(3921009573, 2173295548), new W(961987163, 4081628472), new W(1508970993, 3053834265), new W(2453635748, 2937671579), new W(2870763221, 3664609560), new W(3624381080, 2734883394), new W(310598401, 1164996542), new W(607225278, 1323610764), new W(1426881987, 3590304994), new W(1925078388, 4068182383), new W(2162078206, 991336113), new W(2614888103, 633803317), new W(3248222580, 3479774868), new W(3835390401, 2666613458), new W(4022224774, 944711139), new W(264347078, 2341262773), new W(604807628, 2007800933), new W(770255983, 1495990901), new W(1249150122, 1856431235), new W(1555081692, 3175218132), new W(1996064986, 2198950837), new W(2554220882, 3999719339), new W(2821834349, 766784016), new W(2952996808, 2566594879), new W(3210313671, 3203337956), new W(3336571891, 1034457026), new W(3584528711, 2466948901), new W(113926993, 3758326383), new W(338241895, 168717936), new W(666307205, 1188179964), new W(773529912, 1546045734), new W(1294757372, 1522805485), new W(1396182291, 2643833823), new W(1695183700, 2343527390), new W(1986661051, 1014477480), new W(2177026350, 1206759142), new W(2456956037, 344077627), new W(2730485921, 1290863460), new W(2820302411, 3158454273), new W(3259730800, 3505952657), new W(3345764771, 106217008), new W(3516065817, 3606008344), new W(3600352804, 1432725776), new W(4094571909, 1467031594), new W(275423344, 851169720), new W(430227734, 3100823752), new W(506948616, 1363258195), new W(659060556, 3750685593), new W(883997877, 3785050280), new W(958139571, 3318307427), new W(1322822218, 3812723403), new W(1537002063, 2003034995), new W(1747873779, 3602036899), new W(1955562222, 1575990012), new W(2024104815, 1125592928), new W(2227730452, 2716904306), new W(2361852424, 442776044), new W(2428436474, 593698344), new W(2756734187, 3733110249), new W(3204031479, 2999351573), new W(3329325298, 3815920427), new W(3391569614, 3928383900), new W(3515267271, 566280711), new W(3940187606, 3454069534), new W(4118630271, 4000239992), new W(116418474, 1914138554), new W(174292421, 2731055270), new W(289380356, 3203993006), new W(460393269, 320620315), new W(685471733, 587496836), new W(852142971, 1086792851), new W(1017036298, 365543100), new W(1126000580, 2618297676), new W(1288033470, 3409855158), new W(1501505948, 4234509866), new W(1607167915, 987167468), new W(1816402316, 1246189591)], o = "SHA-384" === c ? [new W(3418070365, 3238371032), new W(1654270250, 914150663), new W(2438529370, 812702999), new W(355462360, 4144912697), new W(1731405415, 4290775857), new W(41048885895, 1750603025), new W(3675008525, 1694076839), new W(1203062813, 3204075428)] : [new W(1779033703, 4089235720), new W(3144134277, 2227873595), new W(1013904242, 4271175723), new W(2773480762, 1595750129), new W(1359893119, 2917565137), new W(2600822924, 725511199), new W(528734635, 4215389547), new W(1541459225, 327033209)]), a[b >> 5] |= 128 << 24 - b % 32, a[I] = b, Y = a.length, J = 0; Y > J; J += L) {
                            for (e = o[0], f = o[1], g = o[2], h = o[3], i = o[4], j = o[5], k = o[6], l = o[7], K = 0; H > K; K += 1)
                                Z[K] = 16 > K ? new W(a[K * M + J], a[K * M + J + 1]) : O(R(Z[K - 2]), Z[K - 7], Q(Z[K - 15]), Z[K - 16]), m = P(l, T(i), U(i, j, k), X[K], Z[K]), n = N(S(e), V(e, f, g)), l = k, k = j, j = i, i = N(h, m), h = g, g = f, f = e, e = N(m, n);
                            o[0] = N(e, o[0]), o[1] = N(f, o[1]), o[2] = N(g, o[2]), o[3] = N(h, o[3]), o[4] = N(i, o[4]), o[5] = N(j, o[5]), o[6] = N(k, o[6]), o[7] = N(l, o[7])
                        }
                        switch (c) {
                            case "SHA-224":
                                return [o[0], o[1], o[2], o[3], o[4], o[5], o[6]];
                            case "SHA-256":
                                return o;
                            case "SHA-384":
                                return [o[0].highOrder, o[0].lowOrder, o[1].highOrder, o[1].lowOrder, o[2].highOrder, o[2].lowOrder, o[3].highOrder, o[3].lowOrder, o[4].highOrder, o[4].lowOrder, o[5].highOrder, o[5].lowOrder];
                            case "SHA-512":
                                return [o[0].highOrder, o[0].lowOrder, o[1].highOrder, o[1].lowOrder, o[2].highOrder, o[2].lowOrder, o[3].highOrder, o[3].lowOrder, o[4].highOrder, o[4].lowOrder, o[5].highOrder, o[5].lowOrder, o[6].highOrder, o[6].lowOrder, o[7].highOrder, o[7].lowOrder];
                            default:
                                return []
                        }
                    }, J = function(b, c) {
                        if (this.sha1 = null, this.sha224 = null, this.sha256 = null, this.sha384 = null, this.sha512 = null, this.strBinLen = null, this.strToHash = null, "HEX" === c) {
                            if (0 !== b.length % 2)
                                return "TEXT MUST BE IN BYTE INCREMENTS";
                            this.strBinLen = 4 * b.length, this.strToHash = f(b)
                        } else {
                            if ("ASCII" !== c && "undefined" != typeof c)
                                return "UNKNOWN TEXT INPUT TYPE";
                            this.strBinLen = b.length * a, this.strToHash = e(b)
                        }
                    };
                    return J.prototype = {getHash: function(a, b) {
                            var c = null, d = this.strToHash.slice();
                            switch (b) {
                                case "HEX":
                                    c = g;
                                    break;
                                case "B64":
                                    c = h;
                                    break;
                                case "ASCII":
                                    c = i;
                                    break;
                                default:
                                    return "FORMAT NOT RECOGNIZED"
                            }
                            switch (a) {
                                case "SHA-1":
                                    return null === this.sha1 && (this.sha1 = H(d, this.strBinLen)), c(this.sha1);
                                case "SHA-224":
                                    return null === this.sha224 && (this.sha224 = I(d, this.strBinLen, a)), c(this.sha224);
                                case "SHA-256":
                                    return null === this.sha256 && (this.sha256 = I(d, this.strBinLen, a)), c(this.sha256);
                                case "SHA-384":
                                    return null === this.sha384 && (this.sha384 = I(d, this.strBinLen, a)), c(this.sha384);
                                case "SHA-512":
                                    return null === this.sha512 && (this.sha512 = I(d, this.strBinLen, a)), c(this.sha512);
                                default:
                                    return "HASH NOT RECOGNIZED"
                            }
                        },getHMAC: function(b, c, d, j) {
                            var k, l, m, n, o, p, q, r, s, t = [], u = [];
                            switch (j) {
                                case "HEX":
                                    k = g;
                                    break;
                                case "B64":
                                    k = h;
                                    break;
                                case "ASCII":
                                    k = i;
                                    break;
                                default:
                                    return "FORMAT NOT RECOGNIZED"
                            }
                            switch (d) {
                                case "SHA-1":
                                    m = 64, s = 160;
                                    break;
                                case "SHA-224":
                                    m = 64, s = 224;
                                    break;
                                case "SHA-256":
                                    m = 64, s = 256;
                                    break;
                                case "SHA-384":
                                    m = 128, s = 384;
                                    break;
                                case "SHA-512":
                                    m = 128, s = 512;
                                    break;
                                default:
                                    return "HASH NOT RECOGNIZED"
                            }
                            if ("HEX" === c) {
                                if (0 !== b.length % 2)
                                    return "KEY MUST BE IN BYTE INCREMENTS";
                                l = f(b), r = 4 * b.length
                            } else {
                                if ("ASCII" !== c)
                                    return "UNKNOWN KEY INPUT TYPE";
                                l = e(b), r = b.length * a
                            }
                            for (n = 8 * m, q = m / 4 - 1, r / 8 > m ? (l = "SHA-1" === d ? H(l, r) : I(l, r, d), l[q] &= 4294967040) : m > r / 8 && (l[q] &= 4294967040), o = 0; q >= o; o += 1)
                                t[o] = 909522486 ^ l[o], u[o] = 1549556828 ^ l[o];
                            return "SHA-1" === d ? (p = H(t.concat(this.strToHash), n + this.strBinLen), p = H(u.concat(p), n + s)) : (p = I(t.concat(this.strToHash), n + this.strBinLen, d), p = I(u.concat(p), n + s, d)), k(p)
                        }}, J
                }();
                b.exports = {sha1: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-1", "ASCII")
                    },sha224: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-224", "ASCII")
                    },sha256: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-256", "ASCII")
                    },sha384: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-384", "ASCII")
                    },sha512: function(a) {
                        var b = new c(a, "ASCII");
                        return b.getHash("SHA-512", "ASCII")
                    }}
            }, {}],19: [function(a, b) {
                b.exports = {cipher: a("./cipher"),hash: a("./hash"),cfb: a("./cfb.js"),publicKey: a("./public_key"),signature: a("./signature.js"),random: a("./random.js"),pkcs1: a("./pkcs1.js")};
                var c = a("./crypto.js");
                for (var d in c)
                    b.exports[d] = c[d]
            }, {"./cfb.js": 5,"./cipher": 10,"./crypto.js": 12,"./hash": 15,"./pkcs1.js": 20,"./public_key": 23,"./random.js": 26,"./signature.js": 27}],20: [function(a, b) {
                hash_headers = [], hash_headers[1] = [48, 32, 48, 12, 6, 8, 42, 134, 72, 134, 247, 13, 2, 5, 5, 0, 4, 16], hash_headers[2] = [48, 33, 48, 9, 6, 5, 43, 14, 3, 2, 26, 5, 0, 4, 20], hash_headers[3] = [48, 33, 48, 9, 6, 5, 43, 36, 3, 2, 1, 5, 0, 4, 20], hash_headers[8] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 1, 5, 0, 4, 32], hash_headers[9] = [48, 65, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 2, 5, 0, 4, 48], hash_headers[10] = [48, 81, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 3, 5, 0, 4, 64], hash_headers[11] = [48, 49, 48, 13, 6, 9, 96, 134, 72, 1, 101, 3, 4, 2, 4, 5, 0, 4, 28];
                var c = (a("./crypto.js"), a("./random.js")), d = a("../util.js"), e = a("./public_key/jsbn.js"), f = a("./hash");
                b.exports = {eme: {encode: function(a, b) {
                            if (a.length > b - 11)
                                return -1;
                            var d = "";
                            d += String.fromCharCode(0), d += String.fromCharCode(2);
                            for (var e = 0; e < b - a.length - 3; e++)
                                d += String.fromCharCode(c.getPseudoRandom(1, 255));
                            return d += String.fromCharCode(0), d += a
                        },decode: function(a, b) {
                            if (a.length < b && (a = String.fromCharCode(0) + a), a.length < 12 || 0 !== a.charCodeAt(0) || 2 != a.charCodeAt(1))
                                return -1;
                            for (var c = 2; 0 !== a.charCodeAt(c) && a.length > c; )
                                c++;
                            return a.substring(c + 1, a.length)
                        }},emsa: {encode: function(a, b, c) {
                            var g = "";
                            g += String.fromCharCode(0), g += String.fromCharCode(1);
                            var h;
                            for (h = 0; h < c - hash_headers[a].length - 3 - f.getHashByteLength(a); h++)
                                g += String.fromCharCode(255);
                            for (g += String.fromCharCode(0), h = 0; h < hash_headers[a].length; h++)
                                g += String.fromCharCode(hash_headers[a][h]);
                            return g += f.digest(a, b), new e(d.hexstrdump(g), 16)
                        },decode: function(a, b) {
                            var c = 0;
                            if (0 === b.charCodeAt(0))
                                c++;
                            else {
                                if (1 != b.charCodeAt(0))
                                    return -1;
                                c++
                            }
                            for (; 255 == b.charCodeAt(c); )
                                c++;
                            if (0 !== b.charCodeAt(c++))
                                return -1;
                            var d = 0;
                            for (d = 0; d < hash_headers[a].length && d + c < b.length; d++)
                                if (b.charCodeAt(d + c) != hash_headers[a][d])
                                    return -1;
                            return c += d, b.substring(c).length < f.getHashByteLength(a) ? -1 : b.substring(c)
                        }}}
            }, {"../util.js": 61,"./crypto.js": 12,"./hash": 15,"./public_key/jsbn.js": 24,"./random.js": 26}],21: [function(a, b) {
                function c() {
                    function a(a, b, c, h, i, j) {
                        var k = g.getLeftNBits(f.digest(a, b), i.bitLength()), l = new d(g.hexstrdump(k), 16), m = e.getRandomBigIntegerInRange(d.ONE.add(d.ONE), i.subtract(d.ONE)), n = c.modPow(m, h).mod(i), o = m.modInverse(i).multiply(l.add(j.multiply(n))).mod(i), p = [];
                        return p[0] = n.toMPI(), p[1] = o.toMPI(), p
                    }
                    function b(a) {
                        var b = h.prefer_hash_algorithm;
                        switch (Math.round(a.bitLength() / 8)) {
                            case 20:
                                return 2 != b && b > 11 && 10 != b && 8 > b ? 2 : b;
                            case 28:
                                return b > 11 && 8 > b ? 11 : b;
                            case 32:
                                return b > 10 && 8 > b ? 8 : b;
                            default:
                                return g.print_debug("DSA select hash algorithm: returning null for an unknown length of q"), null
                        }
                    }
                    function c(a, b, c, e, h, i, j, k) {
                        var l = g.getLeftNBits(f.digest(a, e), i.bitLength()), m = new d(g.hexstrdump(l), 16);
                        if (d.ZERO.compareTo(b) > 0 || b.compareTo(i) > 0 || d.ZERO.compareTo(c) > 0 || c.compareTo(i) > 0)
                            return g.print_debug("invalid DSA Signature"), null;
                        var n = c.modInverse(i), o = m.multiply(n).mod(i), p = b.multiply(n).mod(i);
                        return j.modPow(o, h).multiply(k.modPow(p, h)).mod(h).mod(i)
                    }
                    this.select_hash_algorithm = b, this.sign = a, this.verify = c
                }
                var d = a("./jsbn.js"), e = a("../random.js"), f = a("../hash"), g = a("../../util.js"), h = a("../../config");
                b.exports = c
            }, {"../../config": 4,"../../util.js": 61,"../hash": 15,"../random.js": 26,"./jsbn.js": 24}],22: [function(a, b) {
                function c() {
                    function a(a, b, c, f) {
                        var g = d.ONE.add(d.ONE), h = c.subtract(g), i = e.getRandomBigIntegerInRange(g, h);
                        i = i.mod(h).add(d.ONE);
                        var j = [];
                        return j[0] = b.modPow(i, c), j[1] = f.modPow(i, c).multiply(a).mod(c), j
                    }
                    function b(a, b, c, d) {
                        return f.print_debug("Elgamal Decrypt:\nc1:" + f.hexstrdump(a.toMPI()) + "\nc2:" + f.hexstrdump(b.toMPI()) + "\np:" + f.hexstrdump(c.toMPI()) + "\nx:" + f.hexstrdump(d.toMPI())), a.modPow(d, c).modInverse(c).multiply(b).mod(c)
                    }
                    this.encrypt = a, this.decrypt = b
                }
                var d = a("./jsbn.js"), e = a("../random.js"), f = a("../../util.js");
                b.exports = c
            }, {"../../util.js": 61,"../random.js": 26,"./jsbn.js": 24}],23: [function(a, b) {
                b.exports = {rsa: a("./rsa.js"),elgamal: a("./elgamal.js"),dsa: a("./dsa.js")}
            }, {"./dsa.js": 21,"./elgamal.js": 22,"./rsa.js": 25}],24: [function(a, b) {
                function c(a, b, c) {
                    null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
                }
                function d() {
                    return new c(null)
                }
                function e(a, b, c, d, e, f) {
                    for (; --f >= 0; ) {
                        var g = b * this[a++] + c[d] + e;
                        e = Math.floor(g / 67108864), c[d++] = 67108863 & g
                    }
                    return e
                }
                function f(a) {
                    return ec.charAt(a)
                }
                function g(a, b) {
                    var c = fc[a.charCodeAt(b)];
                    return null == c ? -1 : c
                }
                function h(a) {
                    for (var b = this.t - 1; b >= 0; --b)
                        a[b] = this[b];
                    a.t = this.t, a.s = this.s
                }
                function i(a) {
                    this.t = 1, this.s = 0 > a ? -1 : 0, a > 0 ? this[0] = a : -1 > a ? this[0] = a + DV : this.t = 0
                }
                function j(a) {
                    var b = d();
                    return b.fromInt(a), b
                }
                function k(a, b) {
                    var d;
                    if (16 == b)
                        d = 4;
                    else if (8 == b)
                        d = 3;
                    else if (256 == b)
                        d = 8;
                    else if (2 == b)
                        d = 1;
                    else if (32 == b)
                        d = 5;
                    else {
                        if (4 != b)
                            return void this.fromRadix(a, b);
                        d = 2
                    }
                    this.t = 0, this.s = 0;
                    for (var e = a.length, f = !1, h = 0; --e >= 0; ) {
                        var i = 8 == d ? 255 & a[e] : g(a, e);
                        0 > i ? "-" == a.charAt(e) && (f = !0) : (f = !1, 0 == h ? this[this.t++] = i : h + d > this.DB ? (this[this.t - 1] |= (i & (1 << this.DB - h) - 1) << h, this[this.t++] = i >> this.DB - h) : this[this.t - 1] |= i << h, h += d, h >= this.DB && (h -= this.DB))
                    }
                    8 == d && 0 != (128 & a[0]) && (this.s = -1, h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)), this.clamp(), f && c.ZERO.subTo(this, this)
                }
                function l() {
                    for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a; )
                        --this.t
                }
                function m(a) {
                    if (this.s < 0)
                        return "-" + this.negate().toString(a);
                    var b;
                    if (16 == a)
                        b = 4;
                    else if (8 == a)
                        b = 3;
                    else if (2 == a)
                        b = 1;
                    else if (32 == a)
                        b = 5;
                    else {
                        if (4 != a)
                            return this.toRadix(a);
                        b = 2
                    }
                    var c, d = (1 << b) - 1, e = !1, g = "", h = this.t, i = this.DB - h * this.DB % b;
                    if (h-- > 0)
                        for (i < this.DB && (c = this[h] >> i) > 0 && (e = !0, g = f(c)); h >= 0; )
                            b > i ? (c = (this[h] & (1 << i) - 1) << b - i, c |= this[--h] >> (i += this.DB - b)) : (c = this[h] >> (i -= b) & d, 0 >= i && (i += this.DB, --h)), c > 0 && (e = !0), e && (g += f(c));
                    return e ? g : "0"
                }
                function n() {
                    var a = d();
                    return c.ZERO.subTo(this, a), a
                }
                function o() {
                    return this.s < 0 ? this.negate() : this
                }
                function p(a) {
                    var b = this.s - a.s;
                    if (0 != b)
                        return b;
                    var c = this.t;
                    if (b = c - a.t, 0 != b)
                        return b;
                    for (; --c >= 0; )
                        if (0 != (b = this[c] - a[c]))
                            return b;
                    return 0
                }
                function q(a) {
                    var b, c = 1;
                    return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
                }
                function r() {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + q(this[this.t - 1] ^ this.s & this.DM)
                }
                function s(a, b) {
                    var c;
                    for (c = this.t - 1; c >= 0; --c)
                        b[c + a] = this[c];
                    for (c = a - 1; c >= 0; --c)
                        b[c] = 0;
                    b.t = this.t + a, b.s = this.s
                }
                function t(a, b) {
                    for (var c = a; c < this.t; ++c)
                        b[c - a] = this[c];
                    b.t = Math.max(this.t - a, 0), b.s = this.s
                }
                function u(a, b) {
                    var c, d = a % this.DB, e = this.DB - d, f = (1 << e) - 1, g = Math.floor(a / this.DB), h = this.s << d & this.DM;
                    for (c = this.t - 1; c >= 0; --c)
                        b[c + g + 1] = this[c] >> e | h, h = (this[c] & f) << d;
                    for (c = g - 1; c >= 0; --c)
                        b[c] = 0;
                    b[g] = h, b.t = this.t + g + 1, b.s = this.s, b.clamp()
                }
                function v(a, b) {
                    b.s = this.s;
                    var c = Math.floor(a / this.DB);
                    if (c >= this.t)
                        return void (b.t = 0);
                    var d = a % this.DB, e = this.DB - d, f = (1 << d) - 1;
                    b[0] = this[c] >> d;
                    for (var g = c + 1; g < this.t; ++g)
                        b[g - c - 1] |= (this[g] & f) << e, b[g - c] = this[g] >> d;
                    d > 0 && (b[this.t - c - 1] |= (this.s & f) << e), b.t = this.t - c, b.clamp()
                }
                function w(a, b) {
                    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
                        d += this[c] - a[c], b[c++] = d & this.DM, d >>= this.DB;
                    if (a.t < this.t) {
                        for (d -= a.s; c < this.t; )
                            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += this.s
                    } else {
                        for (d += this.s; c < a.t; )
                            d -= a[c], b[c++] = d & this.DM, d >>= this.DB;
                        d -= a.s
                    }
                    b.s = 0 > d ? -1 : 0, -1 > d ? b[c++] = this.DV + d : d > 0 && (b[c++] = d), b.t = c, b.clamp()
                }
                function x(a, b) {
                    var d = this.abs(), e = a.abs(), f = d.t;
                    for (b.t = f + e.t; --f >= 0; )
                        b[f] = 0;
                    for (f = 0; f < e.t; ++f)
                        b[f + d.t] = d.am(0, e[f], b, f, 0, d.t);
                    b.s = 0, b.clamp(), this.s != a.s && c.ZERO.subTo(b, b)
                }
                function y(a) {
                    for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0; )
                        a[c] = 0;
                    for (c = 0; c < b.t - 1; ++c) {
                        var d = b.am(c, b[c], a, 2 * c, 0, 1);
                        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t + 1] = 1)
                    }
                    a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)), a.s = 0, a.clamp()
                }
                function z(a, b, e) {
                    var f = a.abs();
                    if (!(f.t <= 0)) {
                        var g = this.abs();
                        if (g.t < f.t)
                            return null != b && b.fromInt(0), void (null != e && this.copyTo(e));
                        null == e && (e = d());
                        var h = d(), i = this.s, j = a.s, k = this.DB - q(f[f.t - 1]);
                        k > 0 ? (f.lShiftTo(k, h), g.lShiftTo(k, e)) : (f.copyTo(h), g.copyTo(e));
                        var l = h.t, m = h[l - 1];
                        if (0 != m) {
                            var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0), o = this.FV / n, p = (1 << this.F1) / n, r = 1 << this.F2, s = e.t, t = s - l, u = null == b ? d() : b;
                            for (h.dlShiftTo(t, u), e.compareTo(u) >= 0 && (e[e.t++] = 1, e.subTo(u, e)), c.ONE.dlShiftTo(l, u), u.subTo(h, h); h.t < l; )
                                h[h.t++] = 0;
                            for (; --t >= 0; ) {
                                var v = e[--s] == m ? this.DM : Math.floor(e[s] * o + (e[s - 1] + r) * p);
                                if ((e[s] += h.am(0, v, e, t, 0, l)) < v)
                                    for (h.dlShiftTo(t, u), e.subTo(u, e); e[s] < --v; )
                                        e.subTo(u, e)
                            }
                            null != b && (e.drShiftTo(l, b), i != j && c.ZERO.subTo(b, b)), e.t = l, e.clamp(), k > 0 && e.rShiftTo(k, e), 0 > i && c.ZERO.subTo(e, e)
                        }
                    }
                }
                function A(a) {
                    var b = d();
                    return this.abs().divRemTo(a, null, b), this.s < 0 && b.compareTo(c.ZERO) > 0 && a.subTo(b, b), b
                }
                function B(a) {
                    this.m = a
                }
                function C(a) {
                    return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
                }
                function D(a) {
                    return a
                }
                function E(a) {
                    a.divRemTo(this.m, null, a)
                }
                function F(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function G(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function H() {
                    if (this.t < 1)
                        return 0;
                    var a = this[0];
                    if (0 == (1 & a))
                        return 0;
                    var b = 3 & a;
                    return b = b * (2 - (15 & a) * b) & 15, b = b * (2 - (255 & a) * b) & 255, b = b * (2 - ((65535 & a) * b & 65535)) & 65535, b = b * (2 - a * b % this.DV) % this.DV, b > 0 ? this.DV - b : -b
                }
                function I(a) {
                    this.m = a, this.mp = a.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << a.DB - 15) - 1, this.mt2 = 2 * a.t
                }
                function J(a) {
                    var b = d();
                    return a.abs().dlShiftTo(this.m.t, b), b.divRemTo(this.m, null, b), a.s < 0 && b.compareTo(c.ZERO) > 0 && this.m.subTo(b, b), b
                }
                function K(a) {
                    var b = d();
                    return a.copyTo(b), this.reduce(b), b
                }
                function L(a) {
                    for (; a.t <= this.mt2; )
                        a[a.t++] = 0;
                    for (var b = 0; b < this.m.t; ++b) {
                        var c = 32767 & a[b], d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
                        for (c = b + this.m.t, a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV; )
                            a[c] -= a.DV, a[++c]++
                    }
                    a.clamp(), a.drShiftTo(this.m.t, a), a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
                }
                function M(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function N(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function O() {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                function P(a, b) {
                    if (a > 4294967295 || 1 > a)
                        return c.ONE;
                    var e = d(), f = d(), g = b.convert(this), h = q(a) - 1;
                    for (g.copyTo(e); --h >= 0; )
                        if (b.sqrTo(e, f), (a & 1 << h) > 0)
                            b.mulTo(f, g, e);
                        else {
                            var i = e;
                            e = f, f = i
                        }
                    return b.revert(e)
                }
                function Q(a, b) {
                    var c;
                    return c = 256 > a || b.isEven() ? new B(b) : new I(b), this.exp(a, c)
                }
                function R() {
                    var a = d();
                    return this.copyTo(a), a
                }
                function S() {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                function T() {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                function U() {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                function V(a) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(a))
                }
                function W() {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                function X(a) {
                    if (null == a && (a = 10), 0 == this.signum() || 2 > a || a > 36)
                        return "0";
                    var b = this.chunkSize(a), c = Math.pow(a, b), e = j(c), f = d(), g = d(), h = "";
                    for (this.divRemTo(e, f, g); f.signum() > 0; )
                        h = (c + g.intValue()).toString(a).substr(1) + h, f.divRemTo(e, f, g);
                    return g.intValue().toString(a) + h
                }
                function Y(a, b) {
                    this.fromInt(0), null == b && (b = 10);
                    for (var d = this.chunkSize(b), e = Math.pow(b, d), f = !1, h = 0, i = 0, j = 0; j < a.length; ++j) {
                        var k = g(a, j);
                        0 > k ? "-" == a.charAt(j) && 0 == this.signum() && (f = !0) : (i = b * i + k, ++h >= d && (this.dMultiply(e), this.dAddOffset(i, 0), h = 0, i = 0))
                    }
                    h > 0 && (this.dMultiply(Math.pow(b, h)), this.dAddOffset(i, 0)), f && c.ZERO.subTo(this, this)
                }
                function Z(a, b, d) {
                    if ("number" == typeof b)
                        if (2 > a)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(a, d), this.testBit(a - 1) || this.bitwiseTo(c.ONE.shiftLeft(a - 1), fb, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); )
                                this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(c.ONE.shiftLeft(a - 1), this);
                    else {
                        var e = new Array, f = 7 & a;
                        e.length = (a >> 3) + 1, b.nextBytes(e), f > 0 ? e[0] &= (1 << f) - 1 : e[0] = 0, this.fromString(e, 256)
                    }
                }
                function $() {
                    var a = this.t, b = new Array;
                    b[0] = this.s;
                    var c, d = this.DB - a * this.DB % 8, e = 0;
                    if (a-- > 0)
                        for (d < this.DB && (c = this[a] >> d) != (this.s & this.DM) >> d && (b[e++] = c | this.s << this.DB - d); a >= 0; )
                            8 > d ? (c = (this[a] & (1 << d) - 1) << 8 - d, c |= this[--a] >> (d += this.DB - 8)) : (c = this[a] >> (d -= 8) & 255, 0 >= d && (d += this.DB, --a)), (e > 0 || c != this.s) && (b[e++] = c);
                    return b
                }
                function _(a) {
                    return 0 == this.compareTo(a)
                }
                function ab(a) {
                    return this.compareTo(a) < 0 ? this : a
                }
                function bb(a) {
                    return this.compareTo(a) > 0 ? this : a
                }
                function cb(a, b, c) {
                    var d, e, f = Math.min(a.t, this.t);
                    for (d = 0; f > d; ++d)
                        c[d] = b(this[d], a[d]);
                    if (a.t < this.t) {
                        for (e = a.s & this.DM, d = f; d < this.t; ++d)
                            c[d] = b(this[d], e);
                        c.t = this.t
                    } else {
                        for (e = this.s & this.DM, d = f; d < a.t; ++d)
                            c[d] = b(e, a[d]);
                        c.t = a.t
                    }
                    c.s = b(this.s, a.s), c.clamp()
                }
                function db(a, b) {
                    return a & b
                }
                function eb(a) {
                    var b = d();
                    return this.bitwiseTo(a, db, b), b
                }
                function fb(a, b) {
                    return a | b
                }
                function gb(a) {
                    var b = d();
                    return this.bitwiseTo(a, fb, b), b
                }
                function hb(a, b) {
                    return a ^ b
                }
                function ib(a) {
                    var b = d();
                    return this.bitwiseTo(a, hb, b), b
                }
                function jb(a, b) {
                    return a & ~b
                }
                function kb(a) {
                    var b = d();
                    return this.bitwiseTo(a, jb, b), b
                }
                function lb() {
                    for (var a = d(), b = 0; b < this.t; ++b)
                        a[b] = this.DM & ~this[b];
                    return a.t = this.t, a.s = ~this.s, a
                }
                function mb(a) {
                    var b = d();
                    return 0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b), b
                }
                function nb(a) {
                    var b = d();
                    return 0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b), b
                }
                function ob(a) {
                    if (0 == a)
                        return -1;
                    var b = 0;
                    return 0 == (65535 & a) && (a >>= 16, b += 16), 0 == (255 & a) && (a >>= 8, b += 8), 0 == (15 & a) && (a >>= 4, b += 4), 0 == (3 & a) && (a >>= 2, b += 2), 0 == (1 & a) && ++b, b
                }
                function pb() {
                    for (var a = 0; a < this.t; ++a)
                        if (0 != this[a])
                            return a * this.DB + ob(this[a]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                function qb(a) {
                    for (var b = 0; 0 != a; )
                        a &= a - 1, ++b;
                    return b
                }
                function rb() {
                    for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c)
                        a += qb(this[c] ^ b);
                    return a
                }
                function sb(a) {
                    var b = Math.floor(a / this.DB);
                    return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB)
                }
                function tb(a, b) {
                    var d = c.ONE.shiftLeft(a);
                    return this.bitwiseTo(d, b, d), d
                }
                function ub(a) {
                    return this.changeBit(a, fb)
                }
                function vb(a) {
                    return this.changeBit(a, jb)
                }
                function wb(a) {
                    return this.changeBit(a, hb)
                }
                function xb(a, b) {
                    for (var c = 0, d = 0, e = Math.min(a.t, this.t); e > c; )
                        d += this[c] + a[c], b[c++] = d & this.DM, d >>= this.DB;
                    if (a.t < this.t) {
                        for (d += a.s; c < this.t; )
                            d += this[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += this.s
                    } else {
                        for (d += this.s; c < a.t; )
                            d += a[c], b[c++] = d & this.DM, d >>= this.DB;
                        d += a.s
                    }
                    b.s = 0 > d ? -1 : 0, d > 0 ? b[c++] = d : -1 > d && (b[c++] = this.DV + d), b.t = c, b.clamp()
                }
                function yb(a) {
                    var b = d();
                    return this.addTo(a, b), b
                }
                function zb(a) {
                    var b = d();
                    return this.subTo(a, b), b
                }
                function Ab(a) {
                    var b = d();
                    return this.multiplyTo(a, b), b
                }
                function Bb() {
                    var a = d();
                    return this.squareTo(a), a
                }
                function Cb(a) {
                    var b = d();
                    return this.divRemTo(a, b, null), b
                }
                function Db(a) {
                    var b = d();
                    return this.divRemTo(a, null, b), b
                }
                function Eb(a) {
                    var b = d(), c = d();
                    return this.divRemTo(a, b, c), new Array(b, c)
                }
                function Fb(a) {
                    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t), ++this.t, this.clamp()
                }
                function Gb(a, b) {
                    if (0 != a) {
                        for (; this.t <= b; )
                            this[this.t++] = 0;
                        for (this[b] += a; this[b] >= this.DV; )
                            this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b]
                    }
                }
                function Hb() {
                }
                function Ib(a) {
                    return a
                }
                function Jb(a, b, c) {
                    a.multiplyTo(b, c)
                }
                function Kb(a, b) {
                    a.squareTo(b)
                }
                function Lb(a) {
                    return this.exp(a, new Hb)
                }
                function Mb(a, b, c) {
                    var d = Math.min(this.t + a.t, b);
                    for (c.s = 0, c.t = d; d > 0; )
                        c[--d] = 0;
                    var e;
                    for (e = c.t - this.t; e > d; ++d)
                        c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
                    for (e = Math.min(a.t, b); e > d; ++d)
                        this.am(0, a[d], c, d, 0, b - d);
                    c.clamp()
                }
                function Nb(a, b, c) {
                    --b;
                    var d = c.t = this.t + a.t - b;
                    for (c.s = 0; --d >= 0; )
                        c[d] = 0;
                    for (d = Math.max(b - this.t, 0); d < a.t; ++d)
                        c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
                    c.clamp(), c.drShiftTo(1, c)
                }
                function Ob(a) {
                    this.r2 = d(), this.q3 = d(), c.ONE.dlShiftTo(2 * a.t, this.r2), this.mu = this.r2.divide(a), this.m = a
                }
                function Pb(a) {
                    if (a.s < 0 || a.t > 2 * this.m.t)
                        return a.mod(this.m);
                    if (a.compareTo(this.m) < 0)
                        return a;
                    var b = d();
                    return a.copyTo(b), this.reduce(b), b
                }
                function Qb(a) {
                    return a
                }
                function Rb(a) {
                    for (a.drShiftTo(this.m.t - 1, this.r2), a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); a.compareTo(this.r2) < 0; )
                        a.dAddOffset(1, this.m.t + 1);
                    for (a.subTo(this.r2, a); a.compareTo(this.m) >= 0; )
                        a.subTo(this.m, a)
                }
                function Sb(a, b) {
                    a.squareTo(b), this.reduce(b)
                }
                function Tb(a, b, c) {
                    a.multiplyTo(b, c), this.reduce(c)
                }
                function Ub(a, b) {
                    var c, e, f = a.bitLength(), g = j(1);
                    if (0 >= f)
                        return g;
                    c = 18 > f ? 1 : 48 > f ? 3 : 144 > f ? 4 : 768 > f ? 5 : 6, e = 8 > f ? new B(b) : b.isEven() ? new Ob(b) : new I(b);
                    var h = new Array, i = 3, k = c - 1, l = (1 << c) - 1;
                    if (h[1] = e.convert(this), c > 1) {
                        var m = d();
                        for (e.sqrTo(h[1], m); l >= i; )
                            h[i] = d(), e.mulTo(m, h[i - 2], h[i]), i += 2
                    }
                    var n, o, p = a.t - 1, r = !0, s = d();
                    for (f = q(a[p]) - 1; p >= 0; ) {
                        for (f >= k ? n = a[p] >> f - k & l : (n = (a[p] & (1 << f + 1) - 1) << k - f, p > 0 && (n |= a[p - 1] >> this.DB + f - k)), i = c; 0 == (1 & n); )
                            n >>= 1, --i;
                        if ((f -= i) < 0 && (f += this.DB, --p), r)
                            h[n].copyTo(g), r = !1;
                        else {
                            for (; i > 1; )
                                e.sqrTo(g, s), e.sqrTo(s, g), i -= 2;
                            i > 0 ? e.sqrTo(g, s) : (o = g, g = s, s = o), e.mulTo(s, h[n], g)
                        }
                        for (; p >= 0 && 0 == (a[p] & 1 << f); )
                            e.sqrTo(g, s), o = g, g = s, s = o, --f < 0 && (f = this.DB - 1, --p)
                    }
                    return e.revert(g)
                }
                function Vb(a) {
                    var b = this.s < 0 ? this.negate() : this.clone(), c = a.s < 0 ? a.negate() : a.clone();
                    if (b.compareTo(c) < 0) {
                        var d = b;
                        b = c, c = d
                    }
                    var e = b.getLowestSetBit(), f = c.getLowestSetBit();
                    if (0 > f)
                        return b;
                    for (f > e && (f = e), f > 0 && (b.rShiftTo(f, b), c.rShiftTo(f, c)); b.signum() > 0; )
                        (e = b.getLowestSetBit()) > 0 && b.rShiftTo(e, b), (e = c.getLowestSetBit()) > 0 && c.rShiftTo(e, c), b.compareTo(c) >= 0 ? (b.subTo(c, b), b.rShiftTo(1, b)) : (c.subTo(b, c), c.rShiftTo(1, c));
                    return f > 0 && c.lShiftTo(f, c), c
                }
                function Wb(a) {
                    if (0 >= a)
                        return 0;
                    var b = this.DV % a, c = this.s < 0 ? a - 1 : 0;
                    if (this.t > 0)
                        if (0 == b)
                            c = this[0] % a;
                        else
                            for (var d = this.t - 1; d >= 0; --d)
                                c = (b * c + this[d]) % a;
                    return c
                }
                function Xb(a) {
                    var b = a.isEven();
                    if (this.isEven() && b || 0 == a.signum())
                        return c.ZERO;
                    for (var d = a.clone(), e = this.clone(), f = j(1), g = j(0), h = j(0), i = j(1); 0 != d.signum(); ) {
                        for (; d.isEven(); )
                            d.rShiftTo(1, d), b ? (f.isEven() && g.isEven() || (f.addTo(this, f), g.subTo(a, g)), f.rShiftTo(1, f)) : g.isEven() || g.subTo(a, g), g.rShiftTo(1, g);
                        for (; e.isEven(); )
                            e.rShiftTo(1, e), b ? (h.isEven() && i.isEven() || (h.addTo(this, h), i.subTo(a, i)), h.rShiftTo(1, h)) : i.isEven() || i.subTo(a, i), i.rShiftTo(1, i);
                        d.compareTo(e) >= 0 ? (d.subTo(e, d), b && f.subTo(h, f), g.subTo(i, g)) : (e.subTo(d, e), b && h.subTo(f, h), i.subTo(g, i))
                    }
                    return 0 != e.compareTo(c.ONE) ? c.ZERO : i.compareTo(a) >= 0 ? i.subtract(a) : i.signum() < 0 ? (i.addTo(a, i), i.signum() < 0 ? i.add(a) : i) : i
                }
                function Yb(a) {
                    var b, c = this.abs();
                    if (1 == c.t && c[0] <= gc[gc.length - 1]) {
                        for (b = 0; b < gc.length; ++b)
                            if (c[0] == gc[b])
                                return !0;
                        return !1
                    }
                    if (c.isEven())
                        return !1;
                    for (b = 1; b < gc.length; ) {
                        for (var d = gc[b], e = b + 1; e < gc.length && hc > d; )
                            d *= gc[e++];
                        for (d = c.modInt(d); e > b; )
                            if (d % gc[b++] == 0)
                                return !1
                    }
                    return c.millerRabin(a)
                }
                function q(a) {
                    var b, c = 1;
                    return 0 != (b = a >>> 16) && (a = b, c += 16), 0 != (b = a >> 8) && (a = b, c += 8), 0 != (b = a >> 4) && (a = b, c += 4), 0 != (b = a >> 2) && (a = b, c += 2), 0 != (b = a >> 1) && (a = b, c += 1), c
                }
                function Zb() {
                    var a = this.toByteArray(), b = 8 * (a.length - 1) + q(a[0]), c = "";
                    return c += String.fromCharCode((65280 & b) >> 8), c += String.fromCharCode(255 & b), c += ac.bin2str(a)
                }
                function $b(a) {
                    var b = this.subtract(c.ONE), e = b.getLowestSetBit();
                    if (0 >= e)
                        return !1;
                    var f = b.shiftRight(e);
                    a = a + 1 >> 1, a > gc.length && (a = gc.length);
                    for (var g, h = d(), i = [], j = 0; a > j; ++j) {
                        for (; g = gc[Math.floor(Math.random() * gc.length)], -1 != i.indexOf(g); )
                            ;
                        i.push(g), h.fromInt(g);
                        var k = h.modPow(f, this);
                        if (0 != k.compareTo(c.ONE) && 0 != k.compareTo(b)) {
                            for (var g = 1; g++ < e && 0 != k.compareTo(b); )
                                if (k = k.modPowInt(2, this), 0 == k.compareTo(c.ONE))
                                    return !1;
                            if (0 != k.compareTo(b))
                                return !1
                        }
                    }
                    return !0
                }
                var _b, ac = a("../../util.js");
                c.prototype.am = e, _b = 26, c.prototype.DB = _b, c.prototype.DM = (1 << _b) - 1, c.prototype.DV = 1 << _b;
                var bc = 52;
                c.prototype.FV = Math.pow(2, bc), c.prototype.F1 = bc - _b, c.prototype.F2 = 2 * _b - bc;
                var cc, dc, ec = "0123456789abcdefghijklmnopqrstuvwxyz", fc = new Array;
                for (cc = "0".charCodeAt(0), dc = 0; 9 >= dc; ++dc)
                    fc[cc++] = dc;
                for (cc = "a".charCodeAt(0), dc = 10; 36 > dc; ++dc)
                    fc[cc++] = dc;
                for (cc = "A".charCodeAt(0), dc = 10; 36 > dc; ++dc)
                    fc[cc++] = dc;
                B.prototype.convert = C, B.prototype.revert = D, B.prototype.reduce = E, B.prototype.mulTo = F, B.prototype.sqrTo = G, I.prototype.convert = J, I.prototype.revert = K, I.prototype.reduce = L, I.prototype.mulTo = N, I.prototype.sqrTo = M, c.prototype.copyTo = h, c.prototype.fromInt = i, c.prototype.fromString = k, c.prototype.clamp = l, c.prototype.dlShiftTo = s, c.prototype.drShiftTo = t, c.prototype.lShiftTo = u, c.prototype.rShiftTo = v, c.prototype.subTo = w, c.prototype.multiplyTo = x, c.prototype.squareTo = y, c.prototype.divRemTo = z, c.prototype.invDigit = H, c.prototype.isEven = O, c.prototype.exp = P, c.prototype.toString = m, c.prototype.negate = n, c.prototype.abs = o, c.prototype.compareTo = p, c.prototype.bitLength = r, c.prototype.mod = A, c.prototype.modPowInt = Q, c.ZERO = j(0), c.ONE = j(1), b.exports = c, Hb.prototype.convert = Ib, Hb.prototype.revert = Ib, Hb.prototype.mulTo = Jb, Hb.prototype.sqrTo = Kb, Ob.prototype.convert = Pb, Ob.prototype.revert = Qb, Ob.prototype.reduce = Rb, Ob.prototype.mulTo = Tb, Ob.prototype.sqrTo = Sb;
                var gc = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], hc = (1 << 26) / gc[gc.length - 1], c = a("./jsbn.js");
                c.prototype.chunkSize = V, c.prototype.toRadix = X, c.prototype.fromRadix = Y, c.prototype.fromNumber = Z, c.prototype.bitwiseTo = cb, c.prototype.changeBit = tb, c.prototype.addTo = xb, c.prototype.dMultiply = Fb, c.prototype.dAddOffset = Gb, c.prototype.multiplyLowerTo = Mb, c.prototype.multiplyUpperTo = Nb, c.prototype.modInt = Wb, c.prototype.millerRabin = $b, c.prototype.clone = R, c.prototype.intValue = S, c.prototype.byteValue = T, c.prototype.shortValue = U, c.prototype.signum = W, c.prototype.toByteArray = $, c.prototype.equals = _, c.prototype.min = ab, c.prototype.max = bb, c.prototype.and = eb, c.prototype.or = gb, c.prototype.xor = ib, c.prototype.andNot = kb, c.prototype.not = lb, c.prototype.shiftLeft = mb, c.prototype.shiftRight = nb, c.prototype.getLowestSetBit = pb, c.prototype.bitCount = rb, c.prototype.testBit = sb, c.prototype.setBit = ub, c.prototype.clearBit = vb, c.prototype.flipBit = wb, c.prototype.add = yb, c.prototype.subtract = zb, c.prototype.multiply = Ab, c.prototype.divide = Cb, c.prototype.remainder = Db, c.prototype.divideAndRemainder = Eb, c.prototype.modPow = Ub, c.prototype.modInverse = Xb, c.prototype.pow = Lb, c.prototype.gcd = Vb, c.prototype.isProbablePrime = Yb, c.prototype.toMPI = Zb, c.prototype.square = Bb
            }, {"../../util.js": 61,"./jsbn.js": 24}],25: [function(a, b) {
                function c() {
                    function a(a) {
                        for (var b = 0; b < a.length; b++)
                            a[b] = g.getSecureRandomOctet()
                    }
                    this.nextBytes = a
                }
                function d() {
                    function a(a, b, c, d, g) {
                        var h = a.mod(c).modPow(b.mod(c.subtract(e.ONE)), c), i = a.mod(d).modPow(b.mod(d.subtract(e.ONE)), d);
                        f.print_debug("rsa.js decrypt\nxpn:" + f.hexstrdump(h.toMPI()) + "\nxqn:" + f.hexstrdump(i.toMPI()));
                        var j = i.subtract(h);
                        return 0 === j[0] ? (j = h.subtract(i), j = j.multiply(g).mod(d), j = d.subtract(j)) : j = j.multiply(g).mod(d), j.multiply(c).add(h)
                    }
                    function b(a, b, c) {
                        return a.modPowInt(b, c)
                    }
                    function d(a, b, c) {
                        return a.modPow(b, c)
                    }
                    function g(a, b, c) {
                        return a.modPowInt(b, c)
                    }
                    function h() {
                        this.n = null, this.e = 0, this.ee = null, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.u = null
                    }
                    function i(a, b) {
                        var d = new h, f = new c, g = a >> 1;
                        for (d.e = parseInt(b, 16), d.ee = new e(b, 16); ; ) {
                            for (; d.p = new e(a - g, 1, f), 0 !== d.p.subtract(e.ONE).gcd(d.ee).compareTo(e.ONE) || !d.p.isProbablePrime(10); )
                                ;
                            for (; d.q = new e(g, 1, f), 0 !== d.q.subtract(e.ONE).gcd(d.ee).compareTo(e.ONE) || !d.q.isProbablePrime(10); )
                                ;
                            if (d.p.compareTo(d.q) <= 0) {
                                var i = d.p;
                                d.p = d.q, d.q = i
                            }
                            var j = d.p.subtract(e.ONE), k = d.q.subtract(e.ONE), l = j.multiply(k);
                            if (0 === l.gcd(d.ee).compareTo(e.ONE)) {
                                d.n = d.p.multiply(d.q), d.d = d.ee.modInverse(l), d.dmp1 = d.d.mod(j), d.dmq1 = d.d.mod(k), d.u = d.p.modInverse(d.q);
                                break
                            }
                        }
                        return d
                    }
                    this.encrypt = b, this.decrypt = a, this.verify = g, this.sign = d, this.generate = i, this.keyObject = h
                }
                var e = a("./jsbn.js"), f = a("../../util.js"), g = a("../random.js");
                b.exports = d
            }, {"../../util.js": 61,"../random.js": 26,"./jsbn.js": 24}],26: [function(a, b) {
                function c() {
                    this.buffer = null, this.size = null
                }
                var d = a("../type/mpi.js"), e = null;
                "undefined" == typeof window && (e = a("crypto")), b.exports = {getRandomBytes: function(a) {
                        for (var b = "", c = 0; a > c; c++)
                            b += String.fromCharCode(this.getSecureRandomOctet());
                        return b
                    },getPseudoRandom: function(a, b) {
                        return Math.round(Math.random() * (b - a)) + a
                    },getSecureRandom: function(a, b) {
                        for (var c = this.getSecureRandomUint(), d = (b - a).toString(2).length; (c & Math.pow(2, d) - 1) > b - a; )
                            c = this.getSecureRandomUint();
                        return a + Math.abs(c & Math.pow(2, d) - 1)
                    },getSecureRandomOctet: function() {
                        var a = new Uint8Array(1);
                        return this.getRandomValues(a), a[0]
                    },getSecureRandomUint: function() {
                        var a = new Uint8Array(4), b = new DataView(a.buffer);
                        return this.getRandomValues(a), b.getUint32(0)
                    },getRandomValues: function(a) {
                        if ("undefined" != typeof window && window.crypto)
                            window.crypto.getRandomValues(a);
                        else if (e) {
                            var b = e.randomBytes(a.length);
                            a.set(b)
                        } else {
                            if (!this.randomBuffer.buffer)
                                throw new Error("No secure random number generator available.");
                            this.randomBuffer.get(a)
                        }
                    },getRandomBigInteger: function(a) {
                        if (0 > a)
                            return null;
                        var b = Math.floor((a + 7) / 8), c = this.getRandomBytes(b);
                        a % 8 > 0 && (c = String.fromCharCode(Math.pow(2, a % 8) - 1 & c.charCodeAt(0)) + c.substring(1));
                        var e = new d;
                        return e.fromBytes(c), e.toBigInteger()
                    },getRandomBigIntegerInRange: function(a, b) {
                        if (!(b.compareTo(a) <= 0)) {
                            for (var c = b.subtract(a), d = this.getRandomBigInteger(c.bitLength()); d > c; )
                                d = this.getRandomBigInteger(c.bitLength());
                            return a.add(d)
                        }
                    },randomBuffer: new c}, c.prototype.init = function(a) {
                    this.buffer = new Uint32Array(a), this.size = 0
                }, c.prototype.set = function(a) {
                    if (!this.buffer)
                        throw new Error("RandomBuffer is not initialized");
                    var b = this.buffer.length - this.size;
                    a.length > b && (a = a.subarray(0, b)), this.buffer.set(a, this.size), this.size += a.length
                }, c.prototype.get = function(a) {
                    if (!this.buffer)
                        throw new Error("RandomBuffer is not initialized");
                    if (this.size < a.length)
                        throw new Error("Random number buffer depleted.");
                    for (var b = 0; b < a.length; b++)
                        a[b] = this.buffer[--this.size]
                }
            }, {"../type/mpi.js": 59,crypto: !1}],27: [function(a, b) {
                var c = a("./public_key"), d = a("./pkcs1.js"), e = a("./hash");
                b.exports = {verify: function(a, b, f, g, h) {
                        var i, j = e.digest(b, h);
                        switch (a) {
                            case 1:
                            case 2:
                            case 3:
                                var k = new c.rsa, l = g[0].toBigInteger(), m = g[1].toBigInteger(), n = f[0].toBigInteger();
                                i = k.verify(n, m, l);
                                var o = d.emsa.decode(b, i.toMPI().substring(2));
                                if (-1 == o)
                                    throw new Error("PKCS1 padding in message or key incorrect. Aborting...");
                                return o == j;
                            case 16:
                                throw new Error("signing with Elgamal is not defined in the OpenPGP standard.");
                            case 17:
                                var p = new c.dsa, q = f[0].toBigInteger(), r = f[1].toBigInteger(), s = g[0].toBigInteger(), t = g[1].toBigInteger(), u = g[2].toBigInteger(), v = g[3].toBigInteger(), w = h;
                                return i = p.verify(b, q, r, w, s, t, u, v), 0 === i.compareTo(q);
                            default:
                                throw new Error("Invalid signature algorithm.")
                        }
                    },sign: function(a, b, e, f) {
                        var g;
                        switch (b) {
                            case 1:
                            case 2:
                            case 3:
                                var h = new c.rsa, i = e[2].toBigInteger(), j = e[0].toBigInteger();
                                return g = d.emsa.encode(a, f, e[0].byteLength()), h.sign(g, i, j).toMPI();
                            case 17:
                                var k = new c.dsa, l = e[0].toBigInteger(), m = e[1].toBigInteger(), n = e[2].toBigInteger(), o = (e[3].toBigInteger(), e[4].toBigInteger());
                                g = f;
                                var p = k.sign(a, g, n, l, m, o);
                                return p[0].toString() + p[1].toString();
                            case 16:
                                throw new Error("Signing with Elgamal is not defined in the OpenPGP standard.");
                            default:
                                throw new Error("Invalid signature algorithm.")
                        }
                    }}
            }, {"./hash": 15,"./pkcs1.js": 20,"./public_key": 23}],28: [function(a, b) {
                function c(a) {
                    var b = /^-----([^-]+)-----$\n/m, c = a.match(b);
                    return c[1].match(/BEGIN PGP MESSAGE, PART \d+\/\d+/) ? m.armor.multipart_section : c[1].match(/BEGIN PGP MESSAGE, PART \d+/) ? m.armor.multipart_last : c[1].match(/BEGIN PGP SIGNED MESSAGE/) ? m.armor.signed : c[1].match(/BEGIN PGP MESSAGE/) ? m.armor.message : c[1].match(/BEGIN PGP PUBLIC KEY BLOCK/) ? m.armor.public_key : c[1].match(/BEGIN PGP PRIVATE KEY BLOCK/) ? m.armor.private_key : void 0
                }
                function d() {
                    var a = "";
                    return n.show_version && (a += "Version: " + n.versionstring + "\r\n"), n.show_comment && (a += "Server: " + n.commentstring + "\r\n"), a += "\r\n"
                }
                function e(a) {
                    var b = g(a), c = "" + String.fromCharCode(b >> 16) + String.fromCharCode(b >> 8 & 255) + String.fromCharCode(255 & b);
                    return l.encode(c)
                }
                function f(a, b) {
                    var c = e(a), d = b;
                    return c[0] == d[0] && c[1] == d[1] && c[2] == d[2]
                }
                function g(a) {
                    for (var b = 11994318, c = 0; a.length - c > 16; )
                        b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 1))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 2))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 3))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 4))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 5))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 6))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 7))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 8))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 9))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 10))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 11))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 12))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 13))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 14))], b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c + 15))], c += 16;
                    for (var d = c; d < a.length; d++)
                        b = b << 8 ^ o[255 & (b >> 16 ^ a.charCodeAt(c++))];
                    return 16777215 & b
                }
                function h(a) {
                    var b = /^[\t ]*\n/m, c = "", d = a, e = b.exec(a);
                    return null !== e && (c = a.slice(0, e.index), d = a.slice(e.index + e[0].length)), {headers: c,body: d}
                }
                function i(a) {
                    var b = /^=/m, c = a, d = "", e = b.exec(a);
                    return null !== e && (c = a.slice(0, e.index), d = a.slice(e.index + 1)), {body: c,checksum: d}
                }
                function j(a) {
                    var b = /^-----[^-]+-----$\n/m;
                    a = a.replace(/\r/g, "");
                    var d = c(a);
                    if (!d)
                        throw new Error("Unknow ASCII armor type");
                    var g, j, k, m = a.split(b), n = 1;
                    if (a.search(b) != m[0].length && (n = 0), 2 != d) {
                        k = h(m[n]);
                        var o = i(k.body);
                        g = {data: l.decode(o.body),type: d}, j = o.checksum
                    } else {
                        k = h(m[n].replace(/^- /gm, "").replace(/[\t ]+\n/g, "\n"));
                        var p = h(m[n + 1].replace(/^- /gm, "")), q = i(p.body);
                        g = {text: k.body.replace(/\n$/, "").replace(/\n/g, "\r\n"),data: l.decode(q.body),type: d}, j = q.checksum
                    }
                    if (f(g.data, j))
                        return g;
                    throw new Error("Ascii armor integrity check on message failed: '" + j + "' should be '" + e(g) + "'")
                }
                function k(a, b, c, f) {
                    var g = "";
                    switch (a) {
                        case m.armor.multipart_section:
                            g += "-----BEGIN PGP MESSAGE, PART " + c + "/" + f + "-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE, PART " + c + "/" + f + "-----\r\n";
                            break;
                        case m.armor.multipart_last:
                            g += "-----BEGIN PGP MESSAGE, PART " + c + "-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE, PART " + c + "-----\r\n";
                            break;
                        case m.armor.signed:
                            g += "\r\n-----BEGIN PGP SIGNED MESSAGE-----\r\n", g += "Hash: " + b.hash + "\r\n\r\n", g += b.text.replace(/\n-/g, "\n- -"), g += "\r\n-----BEGIN PGP SIGNATURE-----\r\n", g += d(), g += l.encode(b.data), g += "\r\n=" + e(b.data) + "\r\n", g += "-----END PGP SIGNATURE-----\r\n";
                            break;
                        case m.armor.message:
                            g += "-----BEGIN PGP MESSAGE-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP MESSAGE-----\r\n";
                            break;
                        case m.armor.public_key:
                            g += "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n";
                            break;
                        case m.armor.private_key:
                            g += "-----BEGIN PGP PRIVATE KEY BLOCK-----\r\n", g += d(), g += l.encode(b), g += "\r\n=" + e(b) + "\r\n", g += "-----END PGP PRIVATE KEY BLOCK-----\r\n"
                    }
                    return g
                }
                var l = a("./base64.js"), m = a("../enums.js"), n = a("../config"), o = [0, 8801531, 25875725, 17603062, 60024545, 51751450, 35206124, 44007191, 128024889, 120049090, 103502900, 112007375, 70412248, 78916387, 95990485, 88014382, 264588937, 256049778, 240098180, 248108927, 207005800, 215016595, 232553829, 224014750, 140824496, 149062475, 166599357, 157832774, 200747345, 191980970, 176028764, 184266919, 520933865, 529177874, 512099556, 503334943, 480196360, 471432179, 487973381, 496217854, 414011600, 405478443, 422020573, 430033190, 457094705, 465107658, 448029500, 439496647, 281648992, 273666971, 289622637, 298124950, 324696449, 333198714, 315665548, 307683447, 392699481, 401494690, 383961940, 375687087, 352057528, 343782467, 359738805, 368533838, 1041867730, 1050668841, 1066628831, 1058355748, 1032471859, 1024199112, 1006669886, 1015471301, 968368875, 960392720, 942864358, 951368477, 975946762, 984451313, 1000411399, 992435708, 836562267, 828023200, 810956886, 818967725, 844041146, 852051777, 868605623, 860066380, 914189410, 922427545, 938981743, 930215316, 904825475, 896059e3, 878993294, 887231349, 555053627, 563297984, 547333942, 538569677, 579245274, 570480673, 588005847, 596249900, 649392898, 640860153, 658384399, 666397428, 623318499, 631331096, 615366894, 606833685, 785398962, 777416777, 794487231, 802989380, 759421523, 767923880, 751374174, 743392165, 695319947, 704115056, 687564934, 679289981, 719477610, 711202705, 728272487, 737067676, 2083735460, 2092239711, 2109313705, 2101337682, 2141233477, 2133257662, 2116711496, 2125215923, 2073216669, 2064943718, 2048398224, 2057199467, 2013339772, 2022141063, 2039215473, 2030942602, 1945504045, 1936737750, 1920785440, 1929023707, 1885728716, 1893966647, 1911503553, 1902736954, 1951893524, 1959904495, 1977441561, 1968902626, 2009362165, 2000822798, 1984871416, 1992881923, 1665111629, 1673124534, 1656046400, 1647513531, 1621913772, 1613380695, 1629922721, 1637935450, 1688082292, 1679317903, 1695859321, 1704103554, 1728967061, 1737211246, 1720132760, 1711368291, 1828378820, 1820103743, 1836060105, 1844855090, 1869168165, 1877963486, 1860430632, 1852155859, 1801148925, 1809650950, 1792118e3, 1784135691, 1757986588, 1750004711, 1765960209, 1774462698, 1110107254, 1118611597, 1134571899, 1126595968, 1102643863, 1094667884, 1077139354, 1085643617, 1166763343, 1158490548, 1140961346, 1149762745, 1176011694, 1184812885, 1200772771, 1192499800, 1307552511, 1298785796, 1281720306, 1289958153, 1316768798, 1325007077, 1341561107, 1332794856, 1246636998, 1254647613, 1271201483, 1262662192, 1239272743, 1230733788, 1213667370, 1221678289, 1562785183, 1570797924, 1554833554, 1546300521, 1588974462, 1580441477, 1597965939, 1605978760, 1518843046, 1510078557, 1527603627, 1535847760, 1494504007, 1502748348, 1486784330, 1478020017, 1390639894, 1382365165, 1399434779, 1408230112, 1366334967, 1375129868, 1358579962, 1350304769, 1430452783, 1438955220, 1422405410, 1414423513, 1456544974, 1448562741, 1465633219, 1474135352];
                b.exports = {encode: k,decode: j}
            }, {"../config": 4,"../enums.js": 30,"./base64.js": 29}],29: [function(a, b) {
                function c(a) {
                    var b, c, d, f = "", g = 0, h = 0, i = a.length;
                    for (d = 0; i > d; d++)
                        c = a.charCodeAt(d), 0 === h ? (f += e.charAt(c >> 2 & 63), b = (3 & c) << 4) : 1 == h ? (f += e.charAt(b | c >> 4 & 15), b = (15 & c) << 2) : 2 == h && (f += e.charAt(b | c >> 6 & 3), g += 1, g % 60 === 0 && (f += "\n"), f += e.charAt(63 & c)), g += 1, g % 60 === 0 && (f += "\n"), h += 1, 3 == h && (h = 0);
                    return h > 0 && (f += e.charAt(b), g += 1, g % 60 === 0 && (f += "\n"), f += "=", g += 1), 1 == h && (g % 60 === 0 && (f += "\n"), f += "="), f
                }
                function d(a) {
                    var b, c, d = "", f = 0, g = 0, h = a.length;
                    for (c = 0; h > c; c++)
                        b = e.indexOf(a.charAt(c)), b >= 0 && (f && (d += String.fromCharCode(g | b >> 6 - f & 255)), f = f + 2 & 7, g = b << f & 255);
                    return d
                }
                var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                b.exports = {encode: c,decode: d}
            }, {}],30: [function(a, b) {
                b.exports = {s2k: {simple: 0,salted: 1,iterated: 3,gnu: 101},publicKey: {rsa_encrypt_sign: 1,rsa_encrypt: 2,rsa_sign: 3,elgamal: 16,dsa: 17},symmetric: {plaintext: 0,idea: 1,tripledes: 2,cast5: 3,blowfish: 4,aes128: 7,aes192: 8,aes256: 9,twofish: 10},compression: {uncompressed: 0,zip: 1,zlib: 2,bzip2: 3},hash: {md5: 1,sha1: 2,ripemd: 3,sha256: 8,sha384: 9,sha512: 10,sha224: 11},packet: {publicKeyEncryptedSessionKey: 1,signature: 2,symEncryptedSessionKey: 3,onePassSignature: 4,secretKey: 5,publicKey: 6,secretSubkey: 7,compressed: 8,symmetricallyEncrypted: 9,marker: 10,literal: 11,trust: 12,userid: 13,publicSubkey: 14,userAttribute: 17,symEncryptedIntegrityProtected: 18,modificationDetectionCode: 19},literal: {binary: "b".charCodeAt(),text: "t".charCodeAt(),utf8: "u".charCodeAt()},signature: {binary: 0,text: 1,standalone: 2,cert_generic: 16,cert_persona: 17,cert_casual: 18,cert_positive: 19,cert_revocation: 48,subkey_binding: 24,key_binding: 25,key: 31,key_revocation: 32,subkey_revocation: 40,timestamp: 64,third_party: 80},signatureSubpacket: {signature_creation_time: 2,signature_expiration_time: 3,exportable_certification: 4,trust_signature: 5,regular_expression: 6,revocable: 7,key_expiration_time: 9,placeholder_backwards_compatibility: 10,preferred_symmetric_algorithms: 11,revocation_key: 12,issuer: 16,notation_data: 20,preferred_hash_algorithms: 21,preferred_compression_algorithms: 22,key_server_preferences: 23,preferred_key_server: 24,primary_user_id: 25,policy_uri: 26,key_flags: 27,signers_user_id: 28,reason_for_revocation: 29,features: 30,signature_target: 31,embedded_signature: 32},keyFlags: {certify_keys: 1,sign_data: 2,encrypt_communication: 4,encrypt_storage: 8,split_private_key: 16,authentication: 32,shared_private_key: 128},keyStatus: {invalid: 0,expired: 1,revoked: 2,valid: 3,no_self_cert: 4},armor: {multipart_section: 0,multipart_last: 1,signed: 2,message: 3,public_key: 4,private_key: 5},write: function(a, b) {
                        if ("number" == typeof b && (b = this.read(a, b)), void 0 !== a[b])
                            return a[b];
                        throw new Error("Invalid enum value.")
                    },read: function(a, b) {
                        for (var c in a)
                            if (a[c] == b)
                                return c;
                        throw new Error("Invalid enum value.")
                    }}
            }, {}],31: [function(a, b) {
                b.exports = a("./openpgp.js"), b.exports.key = a("./key.js"), b.exports.message = a("./message.js"), b.exports.cleartext = a("./cleartext.js"), b.exports.util = a("./util.js"), b.exports.packet = a("./packet"), b.exports.MPI = a("./type/mpi.js"), b.exports.S2K = a("./type/s2k.js"), b.exports.Keyid = a("./type/keyid.js"), b.exports.armor = a("./encoding/armor.js"), b.exports.enums = a("./enums.js"), b.exports.config = a("./config/config.js"), b.exports.crypto = a("./crypto"), b.exports.Keyring = a("./keyring"), b.exports.AsyncProxy = a("./worker/async_proxy.js")
            }, {"./cleartext.js": 1,"./config/config.js": 3,"./crypto": 19,"./encoding/armor.js": 28,"./enums.js": 30,"./key.js": 32,"./keyring": 33,"./message.js": 36,"./openpgp.js": 37,"./packet": 40,"./type/keyid.js": 58,"./type/mpi.js": 59,"./type/s2k.js": 60,"./util.js": 61,"./worker/async_proxy.js": 62}],32: [function(a, b, c) {
                function d(a) {
                    if (!(this instanceof d))
                        return new d(a);
                    if (this.primaryKey = null, this.revocationSignature = null, this.directSignatures = null, this.users = null, this.subKeys = null, this.packetlist2structure(a), !this.primaryKey || !this.users)
                        throw new Error("Invalid key: need at least key and user ID packet")
                }
                function e(a, b) {
                    for (var c = 0; c < a.length; c++)
                        for (var d = a[c].getKeyId(), e = 0; e < b.length; e++)
                            if (d.equals(b[e]))
                                return a[c];
                    return null
                }
                function f(a, b) {
                    return a.algorithm !== n.read(n.publicKey, n.publicKey.dsa) && a.algorithm !== n.read(n.publicKey, n.publicKey.rsa_sign) && (!b.keyFlags || 0 !== (b.keyFlags[0] & n.keyFlags.encrypt_communication) || 0 !== (b.keyFlags[0] & n.keyFlags.encrypt_storage))
                }
                function g(a, b) {
                    return !(a.algorithm != n.read(n.publicKey, n.publicKey.dsa) && a.algorithm != n.read(n.publicKey, n.publicKey.rsa_sign) && a.algorithm != n.read(n.publicKey, n.publicKey.rsa_encrypt_sign) || b.keyFlags && 0 === (b.keyFlags[0] & n.keyFlags.sign_data))
                }
                function h(a, b) {
                    return 3 == a.version && 0 !== a.expirationTimeV3 ? new Date(a.created.getTime() + 24 * a.expirationTimeV3 * 3600 * 1e3) : 4 == a.version && b.keyNeverExpires === !1 ? new Date(a.created.getTime() + 1e3 * b.keyExpirationTime) : null
                }
                function i(a) {
                    return this instanceof i ? (this.userId = a.tag == n.packet.userid ? a : null, this.userAttribute = a.tag == n.packet.userAttribute ? a : null, this.selfCertifications = null, this.otherCertifications = null, void (this.revocationCertifications = null)) : new i(a)
                }
                function j(a) {
                    return this instanceof j ? (this.subKey = a, this.bindingSignature = null, void (this.revocationSignature = null)) : new j(a)
                }
                function k(a) {
                    var b = {};
                    b.keys = [];
                    try {
                        var c = o.decode(a);
                        if (c.type != n.armor.public_key && c.type != n.armor.private_key)
                            throw new Error("Armored text not of type key");
                        var e = new m.List;
                        e.read(c.data);
                        var f = e.indexOfTag(n.packet.publicKey, n.packet.secretKey);
                        if (0 === f.length)
                            throw new Error("No key packet found in armored text");
                        for (var g = 0; g < f.length; g++) {
                            var h = e.slice(f[g], f[g + 1]);
                            try {
                                var i = new d(h);
                                b.keys.push(i)
                            } catch (j) {
                                b.err = b.err || [], b.err.push(j)
                            }
                        }
                    } catch (j) {
                        b.err = b.err || [], b.err.push(j)
                    }
                    return b
                }
                function l(a, b, c, e) {
                    var f = new m.List, g = new m.SecretKey;
                    g.algorithm = n.read(n.publicKey, a), g.generate(b), g.encrypt(e);
                    var h = new m.Userid;
                    h.read(c);
                    var i = {};
                    i.userid = h, i.key = g;
                    var j = new m.Signature;
                    j.signatureType = n.signature.cert_generic, j.publicKeyAlgorithm = a, j.hashAlgorithm = n.hash.sha256, j.keyFlags = [n.keyFlags.certify_keys | n.keyFlags.sign_data], j.sign(g, i);
                    var k = new m.SecretSubkey;
                    k.algorithm = n.read(n.publicKey, a), k.generate(b), k.encrypt(e), i = {}, i.key = g, i.bind = k;
                    var l = new m.Signature;
                    return l.signatureType = n.signature.subkey_binding, l.publicKeyAlgorithm = a, l.hashAlgorithm = n.hash.sha256, l.keyFlags = [n.keyFlags.encrypt_communication | n.keyFlags.encrypt_storage], l.sign(g, i), f.push(g), f.push(h), f.push(j), f.push(k), f.push(l), new d(f)
                }
                var m = a("./packet"), n = a("./enums.js"), o = a("./encoding/armor.js"), p = a("./config");
                d.prototype.packetlist2structure = function(a) {
                    for (var b, c, d, e = 0; e < a.length; e++)
                        switch (a[e].tag) {
                            case n.packet.publicKey:
                            case n.packet.secretKey:
                                this.primaryKey = a[e], c = this.primaryKey.getKeyId();
                                break;
                            case n.packet.userid:
                            case n.packet.userAttribute:
                                b = new i(a[e]), this.users || (this.users = []), this.users.push(b);
                                break;
                            case n.packet.publicSubkey:
                            case n.packet.secretSubkey:
                                b = null, this.subKeys || (this.subKeys = []), d = new j(a[e]), this.subKeys.push(d);
                                break;
                            case n.packet.signature:
                                switch (a[e].signatureType) {
                                    case n.signature.cert_generic:
                                    case n.signature.cert_persona:
                                    case n.signature.cert_casual:
                                    case n.signature.cert_positive:
                                        a[e].issuerKeyId.equals(c) ? (b.selfCertifications || (b.selfCertifications = []), b.selfCertifications.push(a[e])) : (b.otherCertifications || (b.otherCertifications = []), b.otherCertifications.push(a[e]));
                                        break;
                                    case n.signature.cert_revocation:
                                        b ? (b.revocationCertifications || (b.revocationCertifications = []), b.revocationCertifications.push(a[e])) : (this.directSignatures || (this.directSignatures = []), this.directSignatures.push(a[e]));
                                        break;
                                    case n.signature.key:
                                        this.directSignatures || (this.directSignatures = []), this.directSignatures.push(a[e]);
                                        break;
                                    case n.signature.subkey_binding:
                                        d.bindingSignature = a[e];
                                        break;
                                    case n.signature.key_revocation:
                                        this.revocationSignature = a[e];
                                        break;
                                    case n.signature.subkey_revocation:
                                        d.revocationSignature = a[e]
                                }
                        }
                }, d.prototype.toPacketlist = function() {
                    var a = new m.List;
                    a.push(this.primaryKey), a.push(this.revocationSignature), a.concat(this.directSignatures);
                    var b;
                    for (b = 0; b < this.users.length; b++)
                        a.concat(this.users[b].toPacketlist());
                    if (this.subKeys)
                        for (b = 0; b < this.subKeys.length; b++)
                            a.concat(this.subKeys[b].toPacketlist());
                    return a
                }, d.prototype.getKeyPacket = function() {
                    return this.primaryKey
                }, d.prototype.getSubkeyPackets = function() {
                    var a = [];
                    if (this.subKeys)
                        for (var b = 0; b < this.subKeys.length; b++)
                            a.push(this.subKeys[b].subKey);
                    return a
                }, d.prototype.getAllKeyPackets = function() {
                    return [this.getKeyPacket()].concat(this.getSubkeyPackets())
                }, d.prototype.getKeyIds = function() {
                    for (var a = [], b = this.getAllKeyPackets(), c = 0; c < b.length; c++)
                        a.push(b[c].getKeyId());
                    return a
                }, d.prototype.getPublicKeyPacket = function(a) {
                    return this.primaryKey.tag == n.packet.publicKey ? e(this.getAllKeyPackets(), a) : null
                }, d.prototype.getPrivateKeyPacket = function(a) {
                    return this.primaryKey.tag == n.packet.secretKey ? e(this.getAllKeyPackets(), a) : null
                }, d.prototype.getUserIds = function() {
                    for (var a = [], b = 0; b < this.users.length; b++)
                        this.users[b].userId && a.push(this.users[b].userId.write());
                    return a
                }, d.prototype.isPublic = function() {
                    return this.primaryKey.tag == n.packet.publicKey
                }, d.prototype.isPrivate = function() {
                    return this.primaryKey.tag == n.packet.secretKey
                }, d.prototype.toPublic = function() {
                    for (var a, b = new m.List, c = this.toPacketlist(), e = 0; e < c.length; e++)
                        switch (c[e].tag) {
                            case n.packet.secretKey:
                                a = c[e].writePublicKey();
                                var f = new m.PublicKey;
                                f.read(a), b.push(f);
                                break;
                            case n.packet.secretSubkey:
                                a = c[e].writePublicKey();
                                var g = new m.PublicSubkey;
                                g.read(a), b.push(g);
                                break;
                            default:
                                b.push(c[e])
                        }
                    return new d(b)
                }, d.prototype.armor = function() {
                    var a = this.isPublic() ? n.armor.public_key : n.armor.private_key;
                    return o.encode(a, this.toPacketlist().write())
                }, d.prototype.getSigningKeyPacket = function() {
                    if (this.isPublic())
                        throw new Error("Need private key for signing");
                    var a = this.getPrimaryUser();
                    if (a && g(this.primaryKey, a.selfCertificate))
                        return this.primaryKey;
                    if (this.subKeys)
                        for (var b = 0; b < this.subKeys.length; b++)
                            if (this.subKeys[b].isValidSigningKey(this.primaryKey))
                                return this.subKeys[b].subKey;
                    return null
                }, d.prototype.getPreferredHashAlgorithm = function() {
                    var a = this.getPrimaryUser();
                    return a && a.selfCertificate.preferredHashAlgorithms ? a.selfCertificate.preferredHashAlgorithms[0] : p.prefer_hash_algorithm
                }, d.prototype.getEncryptionKeyPacket = function() {
                    if (this.subKeys)
                        for (var a = 0; a < this.subKeys.length; a++)
                            if (this.subKeys[a].isValidEncryptionKey(this.primaryKey))
                                return this.subKeys[a].subKey;
                    var b = this.getPrimaryUser();
                    return b && f(this.primaryKey, b.selfCertificate) ? this.primaryKey : null
                }, d.prototype.decrypt = function(a) {
                    if (!this.isPrivate())
                        throw new Error("Nothing to decrypt in a public key");
                    for (var b = this.getAllKeyPackets(), c = 0; c < b.length; c++) {
                        var d = b[c].decrypt(a);
                        if (!d)
                            return !1
                    }
                    return !0
                }, d.prototype.decryptKeyPacket = function(a, b) {
                    if (!this.isPrivate())
                        throw new Error("Nothing to decrypt in a public key");
                    for (var c = this.getAllKeyPackets(), d = 0; d < c.length; d++)
                        for (var e = c[d].getKeyId(), f = 0; f < a.length; f++)
                            if (e.equals(a[f])) {
                                var g = c[d].decrypt(b);
                                if (!g)
                                    return !1
                            }
                    return !0
                }, d.prototype.verifyPrimaryKey = function() {
                    if (this.revocationSignature && !this.revocationSignature.isExpired() && (this.revocationSignature.verified || this.revocationSignature.verify(this.primaryKey, {key: this.primaryKey})))
                        return n.keyStatus.revoked;
                    if (3 == this.primaryKey.version && 0 !== this.primaryKey.expirationTimeV3 && Date.now() > this.primaryKey.created.getTime() + 24 * this.primaryKey.expirationTimeV3 * 3600 * 1e3)
                        return n.keyStatus.expired;
                    for (var a = !1, b = 0; b < this.users.length; b++)
                        this.users[b].userId && this.users[b].selfCertifications && (a = !0);
                    if (!a)
                        return n.keyStatus.no_self_cert;
                    var c = this.getPrimaryUser();
                    return c ? 4 == this.primaryKey.version && c.selfCertificate.keyNeverExpires === !1 && Date.now() > this.primaryKey.created.getTime() + 1e3 * c.selfCertificate.keyExpirationTime ? n.keyStatus.expired : n.keyStatus.valid : n.keyStatus.invalid
                }, d.prototype.getExpirationTime = function() {
                    if (3 == this.primaryKey.version)
                        return h(this.primaryKey);
                    if (4 == this.primaryKey.version) {
                        var a = this.getPrimaryUser();
                        return a ? h(this.primaryKey, a.selfCertificate) : null
                    }
                }, d.prototype.getPrimaryUser = function() {
                    for (var a, b = null, c = 0; c < this.users.length; c++)
                        if (this.users[c].userId) {
                            var d = this.users[c].getValidSelfCertificate(this.primaryKey);
                            d && (!b || !a.isPrimaryUserID && d.isPrimaryUserID || a.created < d.created) && (b = this.users[c], a = d)
                        }
                    return b ? {user: b,selfCertificate: a} : null
                }, d.prototype.revoke = function() {
                }, i.prototype.toPacketlist = function() {
                    var a = new m.List;
                    return a.push(this.userId || this.userAttribute), a.concat(this.revocationCertifications), a.concat(this.selfCertifications), a.concat(this.otherCertifications), a
                }, i.prototype.isRevoked = function(a, b) {
                    if (this.revocationCertifications) {
                        var c = this;
                        return this.revocationCertifications.some(function(d) {
                            return d.issuerKeyId.equals(a.issuerKeyId) && !d.isExpired() && (d.verified || d.verify(b, {userid: c.userId || c.userAttribute,key: b}))
                        })
                    }
                    return !1
                }, i.prototype.getValidSelfCertificate = function(a) {
                    if (!this.selfCertifications)
                        return null;
                    for (var b = [], c = 0; c < this.selfCertifications.length; c++)
                        this.isRevoked(this.selfCertifications[c], a) || this.selfCertifications[c].isExpired() || !this.selfCertifications[c].verified && !this.selfCertifications[c].verify(a, {userid: this.userId || this.userAttribute,key: a}) || b.push(this.selfCertifications[c]);
                    return b = b.sort(function(a, b) {
                        return a = a.created, b = b.created, a > b ? -1 : b > a ? 1 : 0
                    }), b[0]
                }, i.prototype.verify = function(a) {
                    if (!this.selfCertifications)
                        return n.keyStatus.no_self_cert;
                    for (var b, c = 0; c < this.selfCertifications.length; c++)
                        if (this.isRevoked(this.selfCertifications[c], a))
                            b = n.keyStatus.revoked;
                        else if (this.selfCertifications[c].verified || this.selfCertifications[c].verify(a, {userid: this.userId || this.userAttribute,key: a})) {
                            if (!this.selfCertifications[c].isExpired()) {
                                b = n.keyStatus.valid;
                                break
                            }
                            b = n.keyStatus.expired
                        } else
                            b = n.keyStatus.invalid;
                    return b
                }, j.prototype.toPacketlist = function() {
                    var a = new m.List;
                    return a.push(this.subKey), a.push(this.revocationSignature), a.push(this.bindingSignature), a
                }, j.prototype.isValidEncryptionKey = function(a) {
                    return this.verify(a) == n.keyStatus.valid && f(this.subKey, this.bindingSignature)
                }, j.prototype.isValidSigningKey = function(a) {
                    return this.verify(a) == n.keyStatus.valid && g(this.subKey, this.bindingSignature)
                }, j.prototype.verify = function(a) {
                    return this.revocationSignature && !this.revocationSignature.isExpired() && (this.revocationSignature.verified || this.revocationSignature.verify(a, {key: a,bind: this.subKey})) ? n.keyStatus.revoked : 3 == this.subKey.version && 0 !== this.subKey.expirationTimeV3 && Date.now() > this.subKey.created.getTime() + 24 * this.subKey.expirationTimeV3 * 3600 * 1e3 ? n.keyStatus.expired : this.bindingSignature ? this.bindingSignature.isExpired() ? n.keyStatus.expired : this.bindingSignature.verified || this.bindingSignature.verify(a, {key: a,bind: this.subKey}) ? 4 == this.subKey.version && this.bindingSignature.keyNeverExpires === !1 && Date.now() > this.subKey.created.getTime() + 1e3 * this.bindingSignature.keyExpirationTime ? n.keyStatus.expired : n.keyStatus.valid : n.keyStatus.invalid : n.keyStatus.invalid
                }, j.prototype.getExpirationTime = function() {
                    return h(this.subKey, this.bindingSignature)
                }, c.Key = d, c.readArmored = k, c.generate = l
            }, {"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],33: [function(a, b) {
                b.exports = a("./keyring.js"), b.exports.localstore = a("./localstore.js")
            }, {"./keyring.js": 34,"./localstore.js": 35}],34: [function(a, b) {
                function c(b) {
                    this.storeHandler = b || new (a("./localstore.js")), this.keys = this.storeHandler.load()
                }
                function d(a, b) {
                    a = a.toLowerCase();
                    for (var c = b.getUserIds(), d = 0; d < c.length; d++)
                        if (keyEmail = c[d].split("<")[1].split(">")[0].trim().toLowerCase(), keyEmail == a)
                            return !0;
                    return !1
                }
                function e(a, b) {
                    for (var c = b.getKeyIds(), d = 0; d < c.length; d++)
                        if (i.hexstrdump(c[d].write()) == a)
                            return !0;
                    return !1
                }
                function f(a, b, c, d) {
                    for (var e = [], f = 0; f < a.length; f++) {
                        var h = a[f];
                        switch (d) {
                            case g.packet.publicKey:
                                h.isPublic() && b(c, h) && e.push(h);
                                break;
                            case g.packet.secretKey:
                                h.isPrivate() && b(c, h) && e.push(h)
                        }
                    }
                    return e
                }
                var g = a("../enums.js"), h = a("../key.js"), i = a("../util.js");
                b.exports = c, c.prototype.store = function() {
                    this.storeHandler.store(this.keys)
                }, c.prototype.clear = function() {
                    this.keys = []
                }, c.prototype.getPublicKeyForAddress = function(a) {
                    return f(this.keys, d, a, g.packet.publicKey)
                }, c.prototype.getPrivateKeyForAddress = function(a) {
                    return f(this.keys, d, a, g.packet.secretKey)
                }, c.prototype.getKeysForKeyId = function(a) {
                    return f(this.keys, e, a, g.packet.publicKey)
                }, c.prototype.importKey = function(a) {
                    return this.keys = this.keys.concat(h.readArmored(a).keys), !0
                }, c.prototype.exportKey = function(a) {
                    return this.keys[a].armor()
                }, c.prototype.removeKey = function(a) {
                    var b = this.keys.splice(a, 1);
                    return b
                }, c.prototype.exportPublicKey = function(a) {
                    return this.keys[a].toPublic().armor()
                }
            }, {"../enums.js": 30,"../key.js": 32,"../util.js": 61,"./localstore.js": 35}],35: [function(a, b) {
                function c(b) {
                    this.storage = "undefined" != typeof window && window.localStorage ? window.localStorage : new (a("node-localstorage").LocalStorage)(d.config.node_store), "string" == typeof b && (this.item = b)
                }
                b.exports = c;
                var d = a("../");
                c.prototype.item = "armoredKeys", c.prototype.load = function() {
                    var a = JSON.parse(this.storage.getItem(this.item)), b = [];
                    if (null !== a && 0 !== a.length)
                        for (var c, e = 0; e < a.length; e++)
                            c = d.key.readArmored(a[e]).keys[0], b.push(c);
                    return b
                }, c.prototype.store = function(a) {
                    for (var b = [], c = 0; c < a.length; c++)
                        b.push(a[c].armor());
                    this.storage.setItem(this.item, JSON.stringify(b))
                }
            }, {"../": 31,"node-localstorage": !1}],36: [function(a, b, c) {
                function d(a) {
                    return this instanceof d ? void (this.packets = a || new h.List) : new d(a)
                }
                function e(a) {
                    var b = j.decode(a).data, c = new h.List;
                    c.read(b);
                    var e = new d(c);
                    return e
                }
                function f(a) {
                    var b = new h.Literal;
                    b.setText(a);
                    var c = new h.List;
                    c.push(b);
                    var e = new d(c);
                    return e
                }
                function g(a) {
                    var b = new h.Literal;
                    b.setBytes(a, i.read(i.literal, i.literal.binary));
                    var c = new h.List;
                    c.push(b);
                    var e = new d(c);
                    return e
                }
                var h = a("./packet"), i = a("./enums.js"), j = a("./encoding/armor.js"), k = a("./config"), l = a("./crypto");
                d.prototype.getEncryptionKeyIds = function() {
                    var a = [], b = this.packets.filterByTag(i.packet.publicKeyEncryptedSessionKey);
                    return b.forEach(function(b) {
                        a.push(b.publicKeyId)
                    }), a
                }, d.prototype.getSigningKeyIds = function() {
                    var a = [], b = this.unwrapCompressed(), c = b.packets.filterByTag(i.packet.onePassSignature);
                    if (c.forEach(function(b) {
                        a.push(b.signingKeyId)
                    }), !a.length) {
                        var d = b.packets.filterByTag(i.packet.signature);
                        d.forEach(function(b) {
                            a.push(b.issuerKeyId)
                        })
                    }
                    return a
                }, d.prototype.decrypt = function(a) {
                    var b = this.getEncryptionKeyIds();
                    if (!b.length)
                        return this;
                    var c = a.getPrivateKeyPacket(b);
                    if (!c.isDecrypted)
                        throw new Error("Private key is not decrypted.");
                    for (var e, f = this.packets.filterByTag(i.packet.publicKeyEncryptedSessionKey), g = 0; g < f.length; g++)
                        if (f[g].publicKeyId.equals(c.getKeyId())) {
                            e = f[g], e.decrypt(c);
                            break
                        }
                    if (e) {
                        var h = this.packets.filterByTag(i.packet.symmetricallyEncrypted, i.packet.symEncryptedIntegrityProtected);
                        if (0 !== h.length) {
                            var j = h[0];
                            return j.decrypt(e.sessionKeyAlgorithm, e.sessionKey), new d(j.packets)
                        }
                    }
                }, d.prototype.getLiteralData = function() {
                    var a = this.packets.findPacket(i.packet.literal);
                    return a && a.data || null
                }, d.prototype.getText = function() {
                    var a = this.packets.findPacket(i.packet.literal);
                    return a ? a.getText() : null
                }, d.prototype.encrypt = function(a) {
                    var b = new h.List, c = l.generateSessionKey(i.read(i.symmetric, k.encryption_cipher));
                    a.forEach(function(a) {
                        var d = a.getEncryptionKeyPacket();
                        if (!d)
                            throw new Error("Could not find valid key packet for encryption in key " + a.primaryKey.getKeyId().toHex());
                        var e = new h.PublicKeyEncryptedSessionKey;
                        e.publicKeyId = d.getKeyId(), e.publicKeyAlgorithm = d.algorithm, e.sessionKey = c, e.sessionKeyAlgorithm = i.read(i.symmetric, k.encryption_cipher), e.encrypt(d), b.push(e)
                    });
                    var e;
                    return e = k.integrity_protect ? new h.SymEncryptedIntegrityProtected : new h.SymmetricallyEncrypted, e.packets = this.packets, e.encrypt(i.read(i.symmetric, k.encryption_cipher), c), b.push(e), e.packets = new h.List, new d(b)
                }, d.prototype.sign = function(a) {
                    var b = new h.List, c = this.packets.findPacket(i.packet.literal);
                    if (!c)
                        throw new Error("No literal data packet to sign.");
                    var e, f = i.write(i.literal, c.format), g = f == i.literal.binary ? i.signature.binary : i.signature.text;
                    for (e = 0; e < a.length; e++) {
                        var j = new h.OnePassSignature;
                        j.type = g, j.hashAlgorithm = k.prefer_hash_algorithm;
                        var l = a[e].getSigningKeyPacket();
                        if (!l)
                            throw new Error("Could not find valid key packet for signing in key " + a[e].primaryKey.getKeyId().toHex());
                        j.publicKeyAlgorithm = l.algorithm, j.signingKeyId = l.getKeyId(), b.push(j)
                    }
                    for (b.push(c), e = a.length - 1; e >= 0; e--) {
                        var m = new h.Signature;
                        if (m.signatureType = g, m.hashAlgorithm = k.prefer_hash_algorithm, m.publicKeyAlgorithm = l.algorithm, !l.isDecrypted)
                            throw new Error("Private key is not decrypted.");
                        m.sign(l, c), b.push(m)
                    }
                    return new d(b)
                }, d.prototype.verify = function(a) {
                    var b = [], c = this.unwrapCompressed(), d = c.packets.filterByTag(i.packet.literal);
                    if (1 !== d.length)
                        throw new Error("Can only verify message with one literal data packet.");
                    var e = c.packets.filterByTag(i.packet.signature);
                    return a.forEach(function(a) {
                        for (var c = 0; c < e.length; c++) {
                            var f = a.getPublicKeyPacket([e[c].issuerKeyId]);
                            if (f) {
                                var g = {};
                                g.keyid = e[c].issuerKeyId, g.valid = e[c].verify(f, d[0]), b.push(g);
                                break
                            }
                        }
                    }), b
                }, d.prototype.unwrapCompressed = function() {
                    var a = this.packets.filterByTag(i.packet.compressed);
                    return a.length ? new d(a[0].packets) : this
                }, d.prototype.armor = function() {
                    return j.encode(i.armor.message, this.packets.write())
                }, c.Message = d, c.readArmored = e, c.fromText = f, c.fromBinary = g
            }, {"./config": 4,"./crypto": 19,"./encoding/armor.js": 28,"./enums.js": 30,"./packet": 40}],37: [function(a, b, c) {
                function d(a) {
                    n = new t(a)
                }
                function e(a, b, c) {
                    return l(c) ? void n.encryptMessage(a, b, c) : m(function() {
                        var c, d;
                        return c = q.fromText(b), c = c.encrypt(a), d = o.encode(p.armor.message, c.packets.write())
                    }, c)
                }
                function f(a, b, c, d) {
                    return l(d) ? void n.signAndEncryptMessage(a, b, c, d) : m(function() {
                        var d, e;
                        return d = q.fromText(c), d = d.sign([b]), d = d.encrypt(a), e = o.encode(p.armor.message, d.packets.write())
                    }, d)
                }
                function g(a, b, c) {
                    return l(c) ? void n.decryptMessage(a, b, c) : m(function() {
                        return b = b.decrypt(a), b.getText()
                    }, c)
                }
                function h(a, b, c, d) {
                    return l(d) ? void n.decryptAndVerifyMessage(a, b, c, d) : m(function() {
                        var d = {};
                        return c = c.decrypt(a), d.text = c.getText(), d.text ? (d.signatures = c.verify(b), d) : null
                    }, d)
                }
                function i(a, b, c) {
                    return l(c) ? void n.signClearMessage(a, b, c) : m(function() {
                        var c = new r.CleartextMessage(b);
                        return c.sign(a), c.armor()
                    }, c)
                }
                function j(a, b, c) {
                    return l(c) ? void n.verifyClearSignedMessage(a, b, c) : m(function() {
                        var c = {};
                        if (!(b instanceof r.CleartextMessage))
                            throw new Error("Parameter [message] needs to be of type CleartextMessage.");
                        return c.text = b.getText(), c.signatures = b.verify(a), c
                    }, c)
                }
                function k(a, b, c, d, e) {
                    return l(e) ? void n.generateKeyPair(a, b, c, d, e) : m(function() {
                        var e = {}, f = s.generate(a, b, c, d);
                        return e.key = f, e.privateKeyArmored = f.armor(), e.publicKeyArmored = f.toPublic().armor(), e
                    }, e)
                }
                function l(a) {
                    if ("undefined" == typeof window || !window.Worker || "function" != typeof a)
                        return !1;
                    if (!n)
                        throw new Error("You need to set the worker path!");
                    return !0
                }
                function m(a, b) {
                    var c;
                    try {
                        c = a()
                    } catch (d) {
                        if (b)
                            return void b(d);
                        throw d
                    }
                    return b ? void b(null, c) : c
                }
                var n, o = a("./encoding/armor.js"), p = (a("./packet"), a("./enums.js")), q = (a("./config"), a("./message.js")), r = a("./cleartext.js"), s = a("./key.js"), t = a("./worker/async_proxy.js");
                c.initWorker = d, c.encryptMessage = e, c.signAndEncryptMessage = f, c.decryptMessage = g, c.decryptAndVerifyMessage = h, c.signClearMessage = i, c.verifyClearSignedMessage = j, c.generateKeyPair = k
            }, {"./cleartext.js": 1,"./config": 4,"./encoding/armor.js": 28,"./enums.js": 30,"./key.js": 32,"./message.js": 36,"./packet": 40,"./worker/async_proxy.js": 62}],38: [function(a, b) {
                function c(a) {
                    return a.substr(0, 1).toUpperCase() + a.substr(1)
                }
                var d = a("../enums.js");
                b.exports = {Compressed: a("./compressed.js"),SymEncryptedIntegrityProtected: a("./sym_encrypted_integrity_protected.js"),PublicKeyEncryptedSessionKey: a("./public_key_encrypted_session_key.js"),SymEncryptedSessionKey: a("./sym_encrypted_session_key.js"),Literal: a("./literal.js"),PublicKey: a("./public_key.js"),SymmetricallyEncrypted: a("./symmetrically_encrypted.js"),Marker: a("./marker.js"),PublicSubkey: a("./public_subkey.js"),UserAttribute: a("./user_attribute.js"),OnePassSignature: a("./one_pass_signature.js"),SecretKey: a("./secret_key.js"),Userid: a("./userid.js"),SecretSubkey: a("./secret_subkey.js"),Signature: a("./signature.js"),Trust: a("./trust.js"),newPacketFromTag: function(a) {
                        return new (this[c(a)])
                    },fromStructuredClone: function(a) {
                        var b = d.read(d.packet, a.tag), c = this.newPacketFromTag(b);
                        for (var e in a)
                            a.hasOwnProperty(e) && (c[e] = a[e]);
                        return c.postCloneTypeFix && c.postCloneTypeFix(), c
                    }}
            }, {"../enums.js": 30,"./compressed.js": 39,"./literal.js": 41,"./marker.js": 42,"./one_pass_signature.js": 43,"./public_key.js": 46,"./public_key_encrypted_session_key.js": 47,"./public_subkey.js": 48,"./secret_key.js": 49,"./secret_subkey.js": 50,"./signature.js": 51,"./sym_encrypted_integrity_protected.js": 52,"./sym_encrypted_session_key.js": 53,"./symmetrically_encrypted.js": 54,"./trust.js": 55,"./user_attribute.js": 56,"./userid.js": 57}],39: [function(a, b) {
                function c() {
                    this.tag = d.packet.compressed, this.packets = null, this.algorithm = "uncompressed", this.compressed = null
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../compression/jxg.js"), f = a("../encoding/base64.js");
                c.prototype.read = function(a) {
                    this.algorithm = d.read(d.compression, a.charCodeAt(0)), this.compressed = a.substr(1), this.decompress()
                }, c.prototype.write = function() {
                    return null === this.compressed && this.compress(), String.fromCharCode(d.write(d.compression, this.algorithm)) + this.compressed
                }, c.prototype.decompress = function() {
                    var a, b;
                    switch (this.algorithm) {
                        case "uncompressed":
                            a = this.compressed;
                            break;
                        case "zip":
                            compData = this.compressed, b = f.encode(compData).replace(/\n/g, "");
                            var c = new e.Util.Unzip(e.Util.Base64.decodeAsArray(b));
                            a = unescape(c.deflate()[0][0]);
                            break;
                        case "zlib":
                            var d = this.compressed.charCodeAt(0) % 16;
                            if (8 == d) {
                                compData = this.compressed.substring(0, this.compressed.length - 4), b = f.encode(compData).replace(/\n/g, ""), a = e.decompress(b);
                                break
                            }
                            throw new Error("Compression algorithm ZLIB only supports DEFLATE compression method.");
                        case "bzip2":
                            throw new Error("Compression algorithm BZip2 [BZ2] is not implemented.");
                        default:
                            throw new Error("Compression algorithm unknown :" + this.alogrithm)
                    }
                    this.packets.read(a)
                }, c.prototype.compress = function() {
                    switch (this.algorithm) {
                        case "uncompressed":
                            this.compressed = this.packets.write();
                            break;
                        case "zip":
                            throw new Error("Compression algorithm ZIP [RFC1951] is not implemented.");
                        case "zlib":
                            throw new Error("Compression algorithm ZLIB [RFC1950] is not implemented.");
                        case "bzip2":
                            throw new Error("Compression algorithm BZip2 [BZ2] is not implemented.");
                        default:
                            throw new Error("Compression algorithm unknown :" + this.type)
                    }
                }
            }, {"../compression/jxg.js": 2,"../encoding/base64.js": 29,"../enums.js": 30}],40: [function(a, b) {
                a("../enums.js");
                b.exports = {List: a("./packetlist.js")};
                var c = a("./all_packets.js");
                for (var d in c)
                    b.exports[d] = c[d]
            }, {"../enums.js": 30,"./all_packets.js": 38,"./packetlist.js": 45}],41: [function(a, b) {
                function c() {
                    this.tag = e.packet.literal, this.format = "utf8", this.data = "", this.date = new Date
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../enums.js");
                c.prototype.setText = function(a) {
                    a = a.replace(/\r/g, "").replace(/\n/g, "\r\n"), this.data = "utf8" == this.format ? d.encode_utf8(a) : a
                }, c.prototype.getText = function() {
                    var a = d.decode_utf8(this.data);
                    return a.replace(/\r\n/g, "\n")
                }, c.prototype.setBytes = function(a, b) {
                    this.format = b, this.data = a
                }, c.prototype.getBytes = function() {
                    return this.data
                }, c.prototype.read = function(a) {
                    var b = e.read(e.literal, a.charCodeAt(0)), c = a.charCodeAt(1);
                    this.filename = d.decode_utf8(a.substr(2, c)), this.date = d.readDate(a.substr(2 + c, 4));
                    var f = a.substring(6 + c);
                    this.setBytes(f, b)
                }, c.prototype.write = function() {
                    var a = d.encode_utf8("msg.txt"), b = this.getBytes(), c = "";
                    return c += String.fromCharCode(e.write(e.literal, this.format)), c += String.fromCharCode(a.length), c += a, c += d.writeDate(this.date), c += b
                }
            }, {"../enums.js": 30,"../util.js": 61}],42: [function(a, b) {
                function c() {
                    this.tag = d.packet.marker
                }
                b.exports = c;
                var d = a("../enums.js");
                c.prototype.read = function(a) {
                    return 80 == a.charCodeAt(0) && 71 == a.charCodeAt(1) && 80 == a.charCodeAt(2) ? !0 : !1
                }
            }, {"../enums.js": 30}],43: [function(a, b) {
                function c() {
                    this.tag = d.packet.onePassSignature, this.version = null, this.type = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signingKeyId = null, this.flags = null
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../type/keyid.js");
                c.prototype.read = function(a) {
                    var b = 0;
                    return this.version = a.charCodeAt(b++), this.type = d.read(d.signature, a.charCodeAt(b++)), this.hashAlgorithm = d.read(d.hash, a.charCodeAt(b++)), this.publicKeyAlgorithm = d.read(d.publicKey, a.charCodeAt(b++)), this.signingKeyId = new e, this.signingKeyId.read(a.substr(b)), b += 8, this.flags = a.charCodeAt(b++), this
                }, c.prototype.write = function() {
                    var a = "";
                    return a += String.fromCharCode(3), a += String.fromCharCode(d.write(d.signature, this.type)), a += String.fromCharCode(d.write(d.hash, this.hashAlgorithm)), a += String.fromCharCode(d.write(d.publicKey, this.publicKeyAlgorithm)), a += this.signingKeyId.write(), a += String.fromCharCode(this.flags)
                }, c.prototype.postCloneTypeFix = function() {
                    this.signingKeyId = e.fromClone(this.signingKeyId)
                }
            }, {"../enums.js": 30,"../type/keyid.js": 58}],44: [function(a, b) {
                var c = (a("../enums.js"), a("../util.js"));
                b.exports = {readSimpleLength: function(a) {
                        var b, d = 0, e = a.charCodeAt(0);
                        return 192 > e ? (d = a.charCodeAt(0), b = 1) : 255 > e ? (d = (a.charCodeAt(0) - 192 << 8) + a.charCodeAt(1) + 192, b = 2) : 255 == e && (d = c.readNumber(a.substr(1, 4)), b = 5), {len: d,offset: b}
                    },writeSimpleLength: function(a) {
                        var b = "";
                        return 192 > a ? b += String.fromCharCode(a) : a > 191 && 8384 > a ? (b += String.fromCharCode((a - 192 >> 8) + 192), b += String.fromCharCode(a - 192 & 255)) : (b += String.fromCharCode(255), b += c.writeNumber(a, 4)), b
                    },writeHeader: function(a, b) {
                        var c = "";
                        return c += String.fromCharCode(192 | a), c += this.writeSimpleLength(b)
                    },writeOldHeader: function(a, b) {
                        var d = "";
                        return 256 > b ? (d += String.fromCharCode(128 | a << 2), d += String.fromCharCode(b)) : 65536 > b ? (d += String.fromCharCode(128 | a << 2 | 1), d += c.writeNumber(b, 2)) : (d += String.fromCharCode(128 | a << 2 | 2), d += c.writeNumber(b, 4)), d
                    },read: function(a, b, d) {
                        if (null === a || a.length <= b || a.substring(b).length < 2 || 0 === (128 & a.charCodeAt(b)))
                            throw new Error("Error during parsing. This message / key is probably not containing a valid OpenPGP format.");
                        var e, f = b, g = -1, h = -1;
                        h = 0, 0 !== (64 & a.charCodeAt(f)) && (h = 1);
                        var i;
                        h ? g = 63 & a.charCodeAt(f) : (g = (63 & a.charCodeAt(f)) >> 2, i = 3 & a.charCodeAt(f)), f++;
                        var j = null, k = -1;
                        if (h)
                            if (a.charCodeAt(f) < 192)
                                e = a.charCodeAt(f++), c.print_debug("1 byte length:" + e);
                            else if (a.charCodeAt(f) >= 192 && a.charCodeAt(f) < 224)
                                e = (a.charCodeAt(f++) - 192 << 8) + a.charCodeAt(f++) + 192, c.print_debug("2 byte length:" + e);
                            else if (a.charCodeAt(f) > 223 && a.charCodeAt(f) < 255) {
                                e = 1 << (31 & a.charCodeAt(f++)), c.print_debug("4 byte length:" + e);
                                var l = f + e;
                                j = a.substring(f, f + e);
                                for (var m; ; ) {
                                    if (a.charCodeAt(l) < 192) {
                                        m = a.charCodeAt(l++), e += m, j += a.substring(l, l + m), l += m;
                                        break
                                    }
                                    if (a.charCodeAt(l) >= 192 && a.charCodeAt(l) < 224) {
                                        m = (a.charCodeAt(l++) - 192 << 8) + a.charCodeAt(l++) + 192, e += m, j += a.substring(l, l + m), l += m;
                                        break
                                    }
                                    if (!(a.charCodeAt(l) > 223 && a.charCodeAt(l) < 255)) {
                                        l++, m = a.charCodeAt(l++) << 24 | a.charCodeAt(l++) << 16 | a[l++].charCodeAt() << 8 | a.charCodeAt(l++), j += a.substring(l, l + m), e += m, l += m;
                                        break
                                    }
                                    m = 1 << (31 & a.charCodeAt(l++)), e += m, j += a.substring(l, l + m), l += m
                                }
                                k = l
                            } else
                                f++, e = a.charCodeAt(f++) << 24 | a.charCodeAt(f++) << 16 | a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                        else
                            switch (i) {
                                case 0:
                                    e = a.charCodeAt(f++);
                                    break;
                                case 1:
                                    e = a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                                    break;
                                case 2:
                                    e = a.charCodeAt(f++) << 24 | a.charCodeAt(f++) << 16 | a.charCodeAt(f++) << 8 | a.charCodeAt(f++);
                                    break;
                                default:
                                    e = d
                            }
                        return -1 == k && (k = e), null === j && (j = a.substring(f, f + k)), {tag: g,packet: j,offset: f + k}
                    }}
            }, {"../enums.js": 30,"../util.js": 61}],45: [function(a, b) {
                function c() {
                    this.length = 0
                }
                b.exports = c;
                var d = a("./packet.js"), e = a("./all_packets.js"), f = a("../enums.js");
                c.prototype.read = function(a) {
                    for (var b = 0; b < a.length; ) {
                        var c = d.read(a, b, a.length - b);
                        b = c.offset;
                        var g = f.read(f.packet, c.tag), h = e.newPacketFromTag(g);
                        this.push(h), h.read(c.packet)
                    }
                }, c.prototype.write = function() {
                    for (var a = "", b = 0; b < this.length; b++) {
                        var c = this[b].write();
                        a += d.writeHeader(this[b].tag, c.length), a += c
                    }
                    return a
                }, c.prototype.push = function(a) {
                    a && (a.packets = a.packets || new c, this[this.length] = a, this.length++)
                }, c.prototype.filter = function(a) {
                    for (var b = new c, d = 0; d < this.length; d++)
                        a(this[d], d, this) && b.push(this[d]);
                    return b
                }, c.prototype.filterByTag = function() {
                    for (var a = Array.prototype.slice.call(arguments), b = new c, d = this, e = 0; e < this.length; e++)
                        a.some(function(a) {
                            return d[e].tag == a
                        }) && b.push(this[e]);
                    return b
                }, c.prototype.forEach = function(a) {
                    for (var b = 0; b < this.length; b++)
                        a(this[b])
                }, c.prototype.findPacket = function(a) {
                    var b = this.filterByTag(a);
                    if (b.length)
                        return b[0];
                    for (var c = null, d = 0; d < this.length; d++)
                        if (this[d].packets.length && (c = this[d].packets.findPacket(a)))
                            return c;
                    return null
                }, c.prototype.indexOfTag = function() {
                    for (var a = Array.prototype.slice.call(arguments), b = [], c = this, d = 0; d < this.length; d++)
                        a.some(function(a) {
                            return c[d].tag == a
                        }) && b.push(d);
                    return b
                }, c.prototype.slice = function(a, b) {
                    b || (b = this.length);
                    for (var d = new c, e = a; b > e; e++)
                        d.push(this[e]);
                    return d
                }, c.prototype.concat = function(a) {
                    if (a)
                        for (var b = 0; b < a.length; b++)
                            this.push(a[b])
                }, b.exports.fromStructuredClone = function(a) {
                    for (var b = new c, d = 0; d < a.length; d++)
                        b.push(e.fromStructuredClone(a[d])), b[d].packets = 0 !== b[d].packets.length ? this.fromStructuredClone(b[d].packets) : new c;
                    return b
                }
            }, {"../enums.js": 30,"./all_packets.js": 38,"./packet.js": 44}],46: [function(a, b) {
                function c() {
                    this.tag = g.packet.publicKey, this.version = 4, this.created = new Date, this.mpi = [], this.algorithm = "rsa_sign", this.expirationTimeV3 = 0
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../type/mpi.js"), f = a("../type/keyid.js"), g = a("../enums.js"), h = a("../crypto");
                c.prototype.read = function(a) {
                    var b = 0;
                    if (this.version = a.charCodeAt(b++), 3 == this.version || 4 == this.version) {
                        this.created = d.readDate(a.substr(b, 4)), b += 4, 3 == this.version && (this.expirationTimeV3 = d.readNumber(a.substr(b, 2)), b += 2), this.algorithm = g.read(g.publicKey, a.charCodeAt(b++));
                        var c = h.getPublicMpiCount(this.algorithm);
                        this.mpi = [];
                        for (var f = a.substr(b), i = 0, j = 0; c > j && i < f.length; j++)
                            if (this.mpi[j] = new e, i += this.mpi[j].read(f.substr(i)), i > f.length)
                                throw new Error("Error reading MPI @:" + i);
                        return i + 6
                    }
                    throw new Error("Version " + version + " of the key packet is unsupported.")
                }, c.prototype.readPublicKey = c.prototype.read, c.prototype.write = function() {
                    var a = String.fromCharCode(this.version);
                    a += d.writeDate(this.created), 3 == this.version && (a += d.writeNumber(this.expirationTimeV3, 2)), a += String.fromCharCode(g.write(g.publicKey, this.algorithm));
                    for (var b = h.getPublicMpiCount(this.algorithm), c = 0; b > c; c++)
                        a += this.mpi[c].write();
                    return a
                }, c.prototype.writePublicKey = c.prototype.write, c.prototype.writeOld = function() {
                    var a = this.writePublicKey();
                    return String.fromCharCode(153) + d.writeNumber(a.length, 2) + a
                }, c.prototype.getKeyId = function() {
                    var a = new f;
                    return 4 == this.version ? a.read(this.getFingerprint().substr(12, 8)) : 3 == this.version && a.read(this.mpi[0].write().substr(-8)), a
                }, c.prototype.getFingerprint = function() {
                    var a = "";
                    if (4 == this.version)
                        return a = this.writeOld(), h.hash.sha1(a);
                    if (3 == this.version) {
                        for (var b = h.getPublicMpiCount(this.algorithm), c = 0; b > c; c++)
                            a += this.mpi[c].toBytes();
                        return h.hash.md5(a)
                    }
                }, c.prototype.getBitSize = function() {
                    return 8 * this.mpi[0].byteLength()
                }, c.prototype.postCloneTypeFix = function() {
                    for (var a = 0; a < this.mpi.length; a++)
                        this.mpi[a] = e.fromClone(this.mpi[a])
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61}],47: [function(a, b) {
                function c() {
                    this.tag = g.packet.publicKeyEncryptedSessionKey, this.version = 3, this.publicKeyId = new d, this.publicKeyAlgorithm = "rsa_encrypt", this.sessionKey = null, this.sessionKeyAlgorithm = "aes256", this.encrypted = []
                }
                b.exports = c;
                var d = a("../type/keyid.js"), e = a("../util.js"), f = a("../type/mpi.js"), g = a("../enums.js"), h = a("../crypto");
                c.prototype.read = function(a) {
                    this.version = a.charCodeAt(0), this.publicKeyId.read(a.substr(1)), this.publicKeyAlgorithm = g.read(g.publicKey, a.charCodeAt(9));
                    var b = 10, c = function(a) {
                        switch (a) {
                            case "rsa_encrypt":
                            case "rsa_encrypt_sign":
                                return 1;
                            case "elgamal":
                                return 2;
                            default:
                                throw new Error("Invalid algorithm.")
                        }
                    }(this.publicKeyAlgorithm);
                    this.encrypted = [];
                    for (var d = 0; c > d; d++) {
                        var e = new f;
                        b += e.read(a.substr(b)), this.encrypted.push(e)
                    }
                }, c.prototype.write = function() {
                    var a = String.fromCharCode(this.version);
                    a += this.publicKeyId.write(), a += String.fromCharCode(g.write(g.publicKey, this.publicKeyAlgorithm));
                    for (var b = 0; b < this.encrypted.length; b++)
                        a += this.encrypted[b].write();
                    return a
                }, c.prototype.encrypt = function(a) {
                    var b = String.fromCharCode(g.write(g.symmetric, this.sessionKeyAlgorithm));
                    b += this.sessionKey;
                    var c = e.calc_checksum(this.sessionKey);
                    b += e.writeNumber(c, 2);
                    var d = new f;
                    d.fromBytes(h.pkcs1.eme.encode(b, a.mpi[0].byteLength())), this.encrypted = h.publicKeyEncrypt(this.publicKeyAlgorithm, a.mpi, d)
                }, c.prototype.decrypt = function(a) {
                    var b = h.publicKeyDecrypt(this.publicKeyAlgorithm, a.mpi, this.encrypted).toBytes(), c = e.readNumber(b.substr(b.length - 2)), d = h.pkcs1.eme.decode(b, a.mpi[0].byteLength());
                    if (a = d.substring(1, d.length - 2), c != e.calc_checksum(a))
                        throw new Error("Checksum mismatch");
                    this.sessionKey = a, this.sessionKeyAlgorithm = g.read(g.symmetric, d.charCodeAt(0))
                }, c.prototype.postCloneTypeFix = function() {
                    this.publicKeyId = d.fromClone(this.publicKeyId);
                    for (var a = 0; a < this.encrypted.length; a++)
                        this.encrypted[a] = f.fromClone(this.encrypted[a])
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61}],48: [function(a, b) {
                function c() {
                    d.call(this), this.tag = e.packet.publicSubkey
                }
                b.exports = c;
                var d = a("./public_key.js"), e = a("../enums.js");
                c.prototype = new d, c.prototype.constructor = c
            }, {"../enums.js": 30,"./public_key.js": 46}],49: [function(a, b) {
                function c() {
                    i.call(this), this.tag = j.packet.secretKey, this.encrypted = null, this.isDecrypted = !1
                }
                function d(a) {
                    return "sha1" == a ? 20 : 2
                }
                function e(a) {
                    return "sha1" == a ? l.hash.sha1 : function(a) {
                        return k.writeNumber(k.calc_checksum(a), 2)
                    }
                }
                function f(a, b, c) {
                    var f = d(a), g = e(a), h = b.substr(b.length - f);
                    b = b.substr(0, b.length - f);
                    var i = g(b);
                    if (i != h)
                        return new Error("Hash mismatch.");
                    for (var j = l.getPrivateMpiCount(c), k = 0, n = [], o = 0; j > o && k < b.length; o++)
                        n[o] = new m, k += n[o].read(b.substr(k));
                    return n
                }
                function g(a, b, c) {
                    for (var d = "", f = l.getPublicMpiCount(b), g = f; g < c.length; g++)
                        d += c[g].write();
                    return d += e(a)(d)
                }
                function h(a, b, c) {
                    return a.produce_key(b, l.cipher[c].keySize)
                }
                b.exports = c;
                var i = a("./public_key.js"), j = a("../enums.js"), k = a("../util.js"), l = a("../crypto"), m = a("../type/mpi.js"), n = a("../type/s2k.js");
                c.prototype = new i, c.prototype.constructor = c, c.prototype.read = function(a) {
                    var b = this.readPublicKey(a);
                    a = a.substr(b);
                    var c = a.charCodeAt(0);
                    if (c)
                        this.encrypted = a;
                    else {
                        var d = f("mod", a.substr(1), this.algorithm);
                        if (d instanceof Error)
                            throw d;
                        this.mpi = this.mpi.concat(d), this.isDecrypted = !0
                    }
                }, c.prototype.write = function() {
                    var a = this.writePublicKey();
                    return this.encrypted ? a += this.encrypted : (a += String.fromCharCode(0), a += g("mod", this.algorithm, this.mpi)), a
                }, c.prototype.encrypt = function(a) {
                    var b = new n, c = "aes256", d = g("sha1", this.algorithm, this.mpi), e = h(b, a, c), f = l.cipher[c].blockSize, i = l.random.getRandomBytes(f);
                    this.encrypted = "", this.encrypted += String.fromCharCode(254), this.encrypted += String.fromCharCode(j.write(j.symmetric, c)), this.encrypted += b.write(), this.encrypted += i, this.encrypted += l.cfb.normalEncrypt(c, e, d, i)
                }, c.prototype.decrypt = function(a) {
                    if (this.isDecrypted)
                        return !0;
                    var b, c, d = 0, e = this.encrypted.charCodeAt(d++);
                    if (255 == e || 254 == e) {
                        b = this.encrypted.charCodeAt(d++), b = j.read(j.symmetric, b);
                        var g = new n;
                        d += g.read(this.encrypted.substr(d)), c = h(g, a, b)
                    } else
                        b = e, b = j.read(j.symmetric, b), c = l.hash.md5(a);
                    var i = this.encrypted.substr(d, l.cipher[b].blockSize);
                    d += i.length;
                    var k, m = this.encrypted.substr(d);
                    k = l.cfb.normalDecrypt(b, c, m, i);
                    var o = 254 == e ? "sha1" : "mod", p = f(o, k, this.algorithm);
                    return p instanceof Error ? !1 : (this.mpi = this.mpi.concat(p), this.isDecrypted = !0, !0)
                }, c.prototype.generate = function(a) {
                    this.mpi = l.generateMpi(this.algorithm, a), this.isDecrypted = !0
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/mpi.js": 59,"../type/s2k.js": 60,"../util.js": 61,"./public_key.js": 46}],50: [function(a, b) {
                function c() {
                    d.call(this), this.tag = e.packet.secretSubkey
                }
                b.exports = c;
                var d = a("./secret_key.js"), e = a("../enums.js");
                c.prototype = new d, c.prototype.constructor = c
            }, {"../enums.js": 30,"./secret_key.js": 49}],51: [function(a, b) {
                function c() {
                    this.tag = g.packet.signature, this.version = 4, this.signatureType = null, this.hashAlgorithm = null, this.publicKeyAlgorithm = null, this.signatureData = null, this.signedHashValue = null, this.created = new Date, this.signatureExpirationTime = null, this.signatureNeverExpires = !0, this.exportable = null, this.trustLevel = null, this.trustAmount = null, this.regularExpression = null, this.revocable = null, this.keyExpirationTime = null, this.keyNeverExpires = null, this.preferredSymmetricAlgorithms = null, this.revocationKeyClass = null, this.revocationKeyAlgorithm = null, this.revocationKeyFingerprint = null, this.issuerKeyId = new j, this.notation = null, this.preferredHashAlgorithms = null, this.preferredCompressionAlgorithms = null, this.keyServerPreferences = null, this.preferredKeyServer = null, this.isPrimaryUserID = null, this.policyURI = null, this.keyFlags = null, this.signersUserId = null, this.reasonForRevocationFlag = null, this.reasonForRevocationString = null, this.features = null, this.signatureTargetPublicKeyAlgorithm = null, this.signatureTargetHashAlgorithm = null, this.signatureTargetHash = null, this.embeddedSignature = null, this.verified = !1
                }
                function d(a, b) {
                    var c = "";
                    return c += f.writeSimpleLength(b.length + 1), c += String.fromCharCode(a), c += b
                }
                b.exports = c;
                var e = a("../util.js"), f = a("./packet.js"), g = a("../enums.js"), h = a("../crypto"), i = a("../type/mpi.js"), j = a("../type/keyid.js");
                c.prototype.read = function(a) {
                    function b(a) {
                        for (var b = e.readNumber(a.substr(0, 2)), c = 2; 2 + b > c; ) {
                            var d = f.readSimpleLength(a.substr(c));
                            c += d.offset, this.read_sub_packet(a.substr(c, d.len)), c += d.len
                        }
                        return c
                    }
                    var c = 0;
                    switch (this.version = a.charCodeAt(c++), this.version) {
                        case 3:
                            5 != a.charCodeAt(c++) && e.print_debug("packet/signature.js\ninvalid One-octet length of following hashed material.MUST be 5. @:" + (c - 1));
                            var d = c;
                            this.signatureType = a.charCodeAt(c++), this.created = e.readDate(a.substr(c, 4)), c += 4, this.signatureData = a.substring(d, c), this.issuerKeyId.read(a.substring(c, c + 8)), c += 8, this.publicKeyAlgorithm = a.charCodeAt(c++), this.hashAlgorithm = a.charCodeAt(c++);
                            break;
                        case 4:
                            this.signatureType = a.charCodeAt(c++), this.publicKeyAlgorithm = a.charCodeAt(c++), this.hashAlgorithm = a.charCodeAt(c++), c += b.call(this, a.substr(c), !0), this.signatureData = a.substr(0, c), c += b.call(this, a.substr(c), !1);
                            break;
                        default:
                            throw new Error("Version " + version + " of the signature is unsupported.")
                    }
                    this.signedHashValue = a.substr(c, 2), c += 2, this.signature = a.substr(c)
                }, c.prototype.write = function() {
                    return this.signatureData + e.writeNumber(0, 2) + this.signedHashValue + this.signature
                }, c.prototype.sign = function(a, b) {
                    var c = g.write(g.signature, this.signatureType), d = g.write(g.publicKey, this.publicKeyAlgorithm), e = g.write(g.hash, this.hashAlgorithm), f = String.fromCharCode(4);
                    f += String.fromCharCode(c), f += String.fromCharCode(d), f += String.fromCharCode(e), this.issuerKeyId = a.getKeyId(), f += this.write_all_sub_packets(), this.signatureData = f;
                    var i = this.calculateTrailer(), j = this.toSign(c, b) + this.signatureData + i, k = h.hash.digest(e, j);
                    this.signedHashValue = k.substr(0, 2), this.signature = h.signature.sign(e, d, a.mpi, j)
                }, c.prototype.write_all_sub_packets = function() {
                    var a = g.signatureSubpacket, b = "", c = "";
                    if (null !== this.created && (b += d(a.signature_creation_time, e.writeDate(this.created))), null !== this.signatureExpirationTime && (b += d(a.signature_expiration_time, e.writeNumber(this.signatureExpirationTime, 4))), null !== this.exportable && (b += d(a.exportable_certification, String.fromCharCode(this.exportable ? 1 : 0))), null !== this.trustLevel && (c = String.fromCharCode(this.trustLevel) + String.fromCharCode(this.trustAmount), b += d(a.trust_signature, c)), null !== this.regularExpression && (b += d(a.regular_expression, this.regularExpression)), null !== this.revocable && (b += d(a.revocable, String.fromCharCode(this.revocable ? 1 : 0))), null !== this.keyExpirationTime && (b += d(a.key_expiration_time, e.writeNumber(this.keyExpirationTime, 4))), null !== this.preferredSymmetricAlgorithms && (c = e.bin2str(this.preferredSymmetricAlgorithms), b += d(a.preferred_symmetric_algorithms, c)), null !== this.revocationKeyClass && (c = String.fromCharCode(this.revocationKeyClass), c += String.fromCharCode(this.revocationKeyAlgorithm), c += this.revocationKeyFingerprint, b += d(a.revocation_key, c)), this.issuerKeyId.isNull() || (b += d(a.issuer, this.issuerKeyId.write())), null !== this.notation)
                        for (var f in this.notation)
                            if (this.notation.hasOwnProperty(f)) {
                                var h = this.notation[f];
                                c = String.fromCharCode(128), c += String.fromCharCode(0), c += String.fromCharCode(0), c += String.fromCharCode(0), c += e.writeNumber(f.length, 2), c += e.writeNumber(h.length, 2), c += f + h, b += d(a.notation_data, c)
                            }
                    return null !== this.preferredHashAlgorithms && (c = e.bin2str(this.preferredHashAlgorithms), b += d(a.preferred_hash_algorithms, c)), null !== this.preferredCompressionAlgorithms && (c = e.bin2str(this.preferredCompressionAlgorithms), b += d(a.preferred_hash_algorithms, c)), null !== this.keyServerPreferences && (c = e.bin2str(this.keyServerPreferences), b += d(a.key_server_preferences, c)), null !== this.preferredKeyServer && (b += d(a.preferred_key_server, this.preferredKeyServer)), null !== this.isPrimaryUserID && (b += d(a.primary_user_id, String.fromCharCode(this.isPrimaryUserID ? 1 : 0))), null !== this.policyURI && (b += d(a.policy_uri, this.policyURI)), null !== this.keyFlags && (c = e.bin2str(this.keyFlags), b += d(a.key_flags, c)), null !== this.signersUserId && (b += d(a.signers_user_id, this.signersUserId)), null !== this.reasonForRevocationFlag && (c = String.fromCharCode(this.reasonForRevocationFlag), c += this.reasonForRevocationString, b += d(a.reason_for_revocation, c)), null !== this.features && (c = e.bin2str(this.features), b += d(a.features, c)), null !== this.signatureTargetPublicKeyAlgorithm && (c = String.fromCharCode(this.signatureTargetPublicKeyAlgorithm), c += String.fromCharCode(this.signatureTargetHashAlgorithm), c += this.signatureTargetHash, b += d(a.signature_target, c)), null !== this.embeddedSignature && (b += d(a.embedded_signature, this.embeddedSignature.write())), b = e.writeNumber(b.length, 2) + b
                }, c.prototype.read_sub_packet = function(a) {
                    function b(a, b) {
                        this[a] = [];
                        for (var c = 0; c < b.length; c++)
                            this[a].push(b.charCodeAt(c))
                    }
                    var d, f = 0, g = 127 & a.charCodeAt(f++);
                    switch (g) {
                        case 2:
                            this.created = e.readDate(a.substr(f));
                            break;
                        case 3:
                            d = e.readNumber(a.substr(f)), this.signatureNeverExpires = 0 === d, this.signatureExpirationTime = d;
                            break;
                        case 4:
                            this.exportable = 1 == a.charCodeAt(f++);
                            break;
                        case 5:
                            this.trustLevel = a.charCodeAt(f++), this.trustAmount = a.charCodeAt(f++);
                            break;
                        case 6:
                            this.regularExpression = a.substr(f);
                            break;
                        case 7:
                            this.revocable = 1 == a.charCodeAt(f++);
                            break;
                        case 9:
                            d = e.readNumber(a.substr(f)), this.keyExpirationTime = d, this.keyNeverExpires = 0 === d;
                            break;
                        case 11:
                            for (this.preferredSymmetricAlgorithms = []; f != a.length; )
                                this.preferredSymmetricAlgorithms.push(a.charCodeAt(f++));
                            break;
                        case 12:
                            this.revocationKeyClass = a.charCodeAt(f++), this.revocationKeyAlgorithm = a.charCodeAt(f++), this.revocationKeyFingerprint = a.substr(f, 20);
                            break;
                        case 16:
                            this.issuerKeyId.read(a.substr(f));
                            break;
                        case 20:
                            if (128 != a.charCodeAt(f))
                                throw new Error("Unsupported notation flag.");
                            f += 4;
                            var i = e.readNumber(a.substr(f, 2));
                            f += 2;
                            var j = e.readNumber(a.substr(f, 2));
                            f += 2;
                            var k = a.substr(f, i), l = a.substr(f + i, j);
                            this.notation = this.notation || {}, this.notation[k] = l;
                            break;
                        case 21:
                            b.call(this, "preferredHashAlgorithms", a.substr(f));
                            break;
                        case 22:
                            b.call(this, "preferredCompressionAlgorithms ", a.substr(f));
                            break;
                        case 23:
                            b.call(this, "keyServerPreferencess", a.substr(f));
                            break;
                        case 24:
                            this.preferredKeyServer = a.substr(f);
                            break;
                        case 25:
                            this.isPrimaryUserID = 0 !== a[f++];
                            break;
                        case 26:
                            this.policyURI = a.substr(f);
                            break;
                        case 27:
                            b.call(this, "keyFlags", a.substr(f));
                            break;
                        case 28:
                            this.signersUserId += a.substr(f);
                            break;
                        case 29:
                            this.reasonForRevocationFlag = a.charCodeAt(f++), this.reasonForRevocationString = a.substr(f);
                            break;
                        case 30:
                            b.call(this, "features", a.substr(f));
                            break;
                        case 31:
                            this.signatureTargetPublicKeyAlgorithm = a.charCodeAt(f++), this.signatureTargetHashAlgorithm = a.charCodeAt(f++);
                            var m = h.getHashByteLength(this.signatureTargetHashAlgorithm);
                            this.signatureTargetHash = a.substr(f, m);
                            break;
                        case 32:
                            this.embeddedSignature = new c, this.embeddedSignature.read(a.substr(f));
                            break;
                        default:
                            throw new Error("Unknown signature subpacket type " + g + " @:" + f)
                    }
                }, c.prototype.toSign = function(a, b) {
                    var c = g.signature;
                    switch (a) {
                        case c.binary:
                        case c.text:
                            return b.getBytes();
                        case c.standalone:
                            return "";
                        case c.cert_generic:
                        case c.cert_persona:
                        case c.cert_casual:
                        case c.cert_positive:
                        case c.cert_revocation:
                            var d, f;
                            if (void 0 !== b.userid)
                                f = 180, d = b.userid;
                            else {
                                if (void 0 === b.userattribute)
                                    throw new Error("Either a userid or userattribute packet needs to be supplied for certification.");
                                f = 209, d = b.userattribute
                            }
                            var h = d.write();
                            if (4 == this.version)
                                return this.toSign(c.key, b) + String.fromCharCode(f) + e.writeNumber(h.length, 4) + h;
                            if (3 == this.version)
                                return this.toSign(c.key, b) + h;
                            break;
                        case c.subkey_binding:
                        case c.subkey_revocation:
                        case c.key_binding:
                            return this.toSign(c.key, b) + this.toSign(c.key, {key: b.bind});
                        case c.key:
                            if (void 0 === b.key)
                                throw new Error("Key packet is required for this sigtature.");
                            return b.key.writeOld();
                        case c.key_revocation:
                            return this.toSign(c.key, b);
                        case c.timestamp:
                            return "";
                        case c.third_party:
                            throw new Error("Not implemented");
                        default:
                            throw new Error("Unknown signature type.")
                    }
                }, c.prototype.calculateTrailer = function() {
                    var a = "";
                    return 3 == this.version ? a : (a += String.fromCharCode(4), a += String.fromCharCode(255), a += e.writeNumber(this.signatureData.length, 4))
                }, c.prototype.verify = function(a, b) {
                    var c = g.write(g.signature, this.signatureType), d = g.write(g.publicKey, this.publicKeyAlgorithm), e = g.write(g.hash, this.hashAlgorithm), f = this.toSign(c, b), j = this.calculateTrailer(), k = 0;
                    d > 0 && 4 > d ? k = 1 : 17 == d && (k = 2);
                    for (var l = [], m = 0, n = 0; k > n; n++)
                        l[n] = new i, m += l[n].read(this.signature.substr(m));
                    return this.verified = h.signature.verify(d, e, l, a.mpi, f + this.signatureData + j), this.verified
                }, c.prototype.isExpired = function() {
                    return this.signatureNeverExpires ? !1 : Date.now() > this.created.getTime() + 1e3 * this.signatureExpirationTime
                }, c.prototype.postCloneTypeFix = function() {
                    this.issuerKeyId = j.fromClone(this.issuerKeyId)
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/keyid.js": 58,"../type/mpi.js": 59,"../util.js": 61,"./packet.js": 44}],52: [function(a, b) {
                function c() {
                    this.tag = e.packet.symEncryptedIntegrityProtected, this.encrypted = null, this.modification = !1, this.packets = null
                }
                b.exports = c;
                var d = (a("../util.js"), a("../crypto")), e = a("../enums.js");
                c.prototype.read = function(a) {
                    var b = a.charCodeAt(0);
                    if (1 != b)
                        throw new Error("Invalid packet version.");
                    this.encrypted = a.substr(1)
                }, c.prototype.write = function() {
                    return String.fromCharCode(1) + this.encrypted
                }, c.prototype.encrypt = function(a, b) {
                    var c = this.packets.write(), e = d.getPrefixRandom(a), f = e + e.charAt(e.length - 2) + e.charAt(e.length - 1), g = c;
                    g += String.fromCharCode(211), g += String.fromCharCode(20), g += d.hash.sha1(f + g), this.encrypted = d.cfb.encrypt(e, a, g, b, !1).substring(0, f.length + g.length)
                }, c.prototype.decrypt = function(a, b) {
                    var c = d.cfb.decrypt(a, b, this.encrypted, !1);
                    this.hash = d.hash.sha1(d.cfb.mdc(a, b, this.encrypted) + c.substring(0, c.length - 20));
                    var e = c.substr(c.length - 20, 20);
                    if (this.hash != e)
                        throw new Error("Modification detected.");
                    this.packets.read(c.substr(0, c.length - 22))
                }
            }, {"../crypto": 19,"../enums.js": 30,"../util.js": 61}],53: [function(a, b) {
                function c() {
                    this.tag = e.packet.symEncryptedSessionKey, this.sessionKeyEncryptionAlgorithm = null, this.sessionKeyAlgorithm = "aes256", this.encrypted = null, this.s2k = new d
                }
                var d = a("../type/s2k.js"), e = a("../enums.js"), f = a("../crypto");
                b.exports = c, c.prototype.read = function(a) {
                    this.version = a.charCodeAt(0);
                    var b = e.read(e.symmetric, a.charCodeAt(1)), c = this.s2k.read(a.substr(2)), d = c + 2;
                    d < a.length ? (this.encrypted = a.substr(d), this.sessionKeyEncryptionAlgorithm = b) : this.sessionKeyAlgorithm = b
                }, c.prototype.write = function() {
                    var a = null === this.encrypted ? this.sessionKeyAlgorithm : this.sessionKeyEncryptionAlgorithm, b = String.fromCharCode(this.version) + String.fromCharCode(e.write(e.symmetric, a)) + this.s2k.write();
                    return null !== this.encrypted && (b += this.encrypted), b
                }, c.prototype.decrypt = function(a) {
                    var b = null !== this.sessionKeyEncryptionAlgorithm ? this.sessionKeyEncryptionAlgorithm : this.sessionKeyAlgorithm, c = f.cipher[b].keySize, d = this.s2k.produce_key(a, c);
                    if (null === this.encrypted)
                        this.sessionKey = d;
                    else {
                        var g = f.cfb.decrypt(this.sessionKeyEncryptionAlgorithm, d, this.encrypted, !0);
                        this.sessionKeyAlgorithm = e.read(e.symmetric, g[0].keyCodeAt()), this.sessionKey = g.substr(1)
                    }
                }, c.prototype.encrypt = function(a) {
                    var b = f.getKeyLength(this.sessionKeyEncryptionAlgorithm), c = this.s2k.produce_key(a, b), d = String.fromCharCode(e.write(e.symmetric, this.sessionKeyAlgorithm)) + f.getRandomBytes(f.getKeyLength(this.sessionKeyAlgorithm));
                    this.encrypted = f.cfb.encrypt(f.getPrefixRandom(this.sessionKeyEncryptionAlgorithm), this.sessionKeyEncryptionAlgorithm, c, d, !0)
                }, c.prototype.postCloneTypeFix = function() {
                    this.s2k = d.fromClone(this.s2k)
                }
            }, {"../crypto": 19,"../enums.js": 30,"../type/s2k.js": 60}],54: [function(a, b) {
                function c() {
                    this.tag = e.packet.symmetricallyEncrypted, this.encrypted = null, this.packets = null
                }
                b.exports = c;
                var d = a("../crypto"), e = a("../enums.js");
                c.prototype.read = function(a) {
                    this.encrypted = a
                }, c.prototype.write = function() {
                    return this.encrypted
                }, c.prototype.decrypt = function(a, b) {
                    var c = d.cfb.decrypt(a, b, this.encrypted, !0);
                    this.packets.read(c)
                }, c.prototype.encrypt = function(a, b) {
                    var c = this.packets.write();
                    this.encrypted = d.cfb.encrypt(d.getPrefixRandom(a), a, c, b, !0)
                }
            }, {"../crypto": 19,"../enums.js": 30}],55: [function(a, b) {
                function c() {
                    this.tag = d.packet.trust
                }
                b.exports = c;
                var d = a("../enums.js")
            }, {"../enums.js": 30}],56: [function(a, b) {
                function c() {
                    this.tag = e.packet.userAttribute, this.attributes = []
                }
                var d = (a("../util.js"), a("./packet.js")), e = a("../enums.js");
                b.exports = c, c.prototype.read = function(a) {
                    for (var b = 0; b < a.length; ) {
                        var c = d.readSimpleLength(a.substr(b));
                        b += c.offset, this.attributes.push(a.substr(b, c.len)), b += c.len
                    }
                }
            }, {"../enums.js": 30,"../util.js": 61,"./packet.js": 44}],57: [function(a, b) {
                function c() {
                    this.tag = e.packet.userid, this.userid = ""
                }
                b.exports = c;
                var d = a("../util.js"), e = a("../enums.js");
                c.prototype.read = function(a) {
                    this.userid = d.decode_utf8(a)
                }, c.prototype.write = function() {
                    return d.encode_utf8(this.userid)
                }
            }, {"../enums.js": 30,"../util.js": 61}],58: [function(a, b) {
                function c() {
                    this.bytes = ""
                }
                b.exports = c;
                var d = a("../util.js");
                c.prototype.read = function(a) {
                    this.bytes = a.substr(0, 8)
                }, c.prototype.write = function() {
                    return this.bytes
                }, c.prototype.toHex = function() {
                    return d.hexstrdump(this.bytes)
                }, c.prototype.equals = function(a) {
                    return this.bytes == a.bytes
                }, c.prototype.isNull = function() {
                    return "" === this.bytes
                }, b.exports.mapToHex = function(a) {
                    return a.toHex()
                }, b.exports.fromClone = function(a) {
                    var b = new c;
                    return b.bytes = a.bytes, b
                }
            }, {"../util.js": 61}],59: [function(a, b) {
                function c() {
                    this.data = null
                }
                b.exports = c;
                var d = a("../crypto/public_key/jsbn.js"), e = a("../util.js");
                c.prototype.read = function(a) {
                    var b = a.charCodeAt(0) << 8 | a.charCodeAt(1), c = Math.ceil(b / 8), d = a.substr(2, c);
                    return this.fromBytes(d), 2 + c
                }, c.prototype.fromBytes = function(a) {
                    this.data = new d(e.hexstrdump(a), 16)
                }, c.prototype.toBytes = function() {
                    return this.write().substr(2)
                }, c.prototype.byteLength = function() {
                    return this.toBytes().length
                }, c.prototype.write = function() {
                    return this.data.toMPI()
                }, c.prototype.toBigInteger = function() {
                    return this.data.clone()
                }, c.prototype.fromBigInteger = function(a) {
                    this.data = a.clone()
                }, b.exports.fromClone = function(a) {
                    a.data.copyTo = d.prototype.copyTo;
                    var b = new d;
                    a.data.copyTo(b);
                    var e = new c;
                    return e.data = b, e
                }
            }, {"../crypto/public_key/jsbn.js": 24,"../util.js": 61}],60: [function(a, b) {
                function c() {
                    this.algorithm = "sha256", this.type = "iterated", this.c = 96, this.salt = f.random.getRandomBytes(8)
                }
                b.exports = c;
                var d = a("../enums.js"), e = a("../util.js"), f = a("../crypto");
                c.prototype.get_count = function() {
                    var a = 6;
                    return 16 + (15 & this.c) << (this.c >> 4) + a
                }, c.prototype.read = function(a) {
                    var b = 0;
                    switch (this.type = d.read(d.s2k, a.charCodeAt(b++)), this.algorithm = d.read(d.hash, a.charCodeAt(b++)), this.type) {
                        case "simple":
                            break;
                        case "salted":
                            this.salt = a.substr(b, 8), b += 8;
                            break;
                        case "iterated":
                            this.salt = a.substr(b, 8), b += 8, this.c = a.charCodeAt(b++);
                            break;
                        case "gnu":
                            if ("GNU" != a.substr(b, 3))
                                throw new Error("Unknown s2k type.");
                            b += 3;
                            var c = 1e3 + a.charCodeAt(b++);
                            if (1001 != c)
                                throw new Error("Unknown s2k gnu protection mode.");
                            this.type = c;
                            break;
                        default:
                            throw new Error("Unknown s2k type.")
                    }
                    return b
                }, c.prototype.write = function() {
                    var a = String.fromCharCode(d.write(d.s2k, this.type));
                    switch (a += String.fromCharCode(d.write(d.hash, this.algorithm)), this.type) {
                        case "simple":
                            break;
                        case "salted":
                            a += this.salt;
                            break;
                        case "iterated":
                            a += this.salt, a += String.fromCharCode(this.c)
                    }
                    return a
                }, c.prototype.produce_key = function(a, b) {
                    function c(b, c) {
                        var e = d.write(d.hash, c.algorithm);
                        switch (c.type) {
                            case "simple":
                                return f.hash.digest(e, b + a);
                            case "salted":
                                return f.hash.digest(e, b + c.salt + a);
                            case "iterated":
                                var g = [], h = c.get_count();
                                for (data = c.salt + a; g.length * data.length < h; )
                                    g.push(data);
                                return g = g.join(""), g.length > h && (g = g.substr(0, h)), f.hash.digest(e, b + g)
                        }
                    }
                    a = e.encode_utf8(a);
                    for (var g = "", h = ""; g.length <= b; )
                        g += c(h, this), h += String.fromCharCode(0);
                    return g.substr(0, b)
                }, b.exports.fromClone = function(a) {
                    var b = new c;
                    return this.algorithm = a.algorithm, this.type = a.type, this.c = a.c, this.salt = a.salt, b
                }
            }, {"../crypto": 19,"../enums.js": 30,"../util.js": 61}],61: [function(a, b) {
                var c = a("./config");
                b.exports = {readNumber: function(a) {
                        for (var b = 0, c = 0; c < a.length; c++)
                            b <<= 8, b += a.charCodeAt(c);
                        return b
                    },writeNumber: function(a, b) {
                        for (var c = "", d = 0; b > d; d++)
                            c += String.fromCharCode(a >> 8 * (b - d - 1) & 255);
                        return c
                    },readDate: function(a) {
                        var b = this.readNumber(a), c = new Date;
                        return c.setTime(1e3 * b), c
                    },writeDate: function(a) {
                        var b = Math.round(a.getTime() / 1e3);
                        return this.writeNumber(b, 4)
                    },emailRegEx: /^[+a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,6}$/,hexdump: function(a) {
                        for (var b, c = [], d = a.length, e = 0, f = 0; d > e; ) {
                            for (b = a.charCodeAt(e++).toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push(" " + b), f++, f % 32 === 0 && c.push("\n           ")
                        }
                        return c.join("")
                    },hexstrdump: function(a) {
                        if (null === a)
                            return "";
                        for (var b, c = [], d = a.length, e = 0; d > e; ) {
                            for (b = a.charCodeAt(e++).toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push("" + b)
                        }
                        return c.join("")
                    },hex2bin: function(a) {
                        for (var b = "", c = 0; c < a.length; c += 2)
                            b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
                        return b
                    },hexidump: function(a) {
                        for (var b, c = [], d = a.length, e = 0; d > e; ) {
                            for (b = a[e++].toString(16); b.length < 2; )
                                b = "0" + b;
                            c.push("" + b)
                        }
                        return c.join("")
                    },encode_utf8: function(a) {
                        return unescape(encodeURIComponent(a))
                    },decode_utf8: function(a) {
                        try {
                            return decodeURIComponent(escape(a))
                        } catch (b) {
                            return a
                        }
                    },bin2str: function(a) {
                        for (var b = [], c = 0; c < a.length; c++)
                            b.push(String.fromCharCode(a[c]));
                        return b.join("")
                    },_str2bin: function(a, b) {
                        for (var c = 0; c < a.length; c++)
                            b[c] = a.charCodeAt(c);
                        return b
                    },str2bin: function(a) {
                        return this._str2bin(a, new Array(a.length))
                    },str2Uint8Array: function(a) {
                        return this._str2bin(a, new Uint8Array(new ArrayBuffer(a.length)))
                    },Uint8Array2str: function(a) {
                        return this.bin2str(a)
                    },calc_checksum: function(a) {
                        for (var b = {s: 0,add: function(a) {
                                this.s = (this.s + a) % 65536
                            }}, c = 0; c < a.length; c++)
                            b.add(a.charCodeAt(c));
                        return b.s
                    },print_debug: function(a) {
                        c.debug && console.log(a)
                    },print_debug_hexstr_dump: function(a, b) {
                        c.debug && (a += this.hexstrdump(b), console.log(a))
                    },getLeftNBits: function(a, b) {
                        var c = b % 8;
                        if (0 === c)
                            return a.substring(0, b / 8);
                        var d = (b - c) / 8 + 1, e = a.substring(0, d);
                        return this.shiftRight(e, 8 - c)
                    },shiftRight: function(a, b) {
                        var c = util.str2bin(a);
                        if (b % 8 === 0)
                            return a;
                        for (var d = c.length - 1; d >= 0; d--)
                            c[d] >>= b % 8, d > 0 && (c[d] |= c[d - 1] << 8 - b % 8 & 255);
                        return util.bin2str(c)
                    },get_hashAlgorithmString: function(a) {
                        switch (a) {
                            case 1:
                                return "MD5";
                            case 2:
                                return "SHA1";
                            case 3:
                                return "RIPEMD160";
                            case 8:
                                return "SHA256";
                            case 9:
                                return "SHA384";
                            case 10:
                                return "SHA512";
                            case 11:
                                return "SHA224"
                        }
                        return "unknown"
                    }}
            }, {"./config": 4}],62: [function(a, b) {
                function c(a) {
                    this.worker = new Worker(a || "openpgp.worker.js"), this.worker.onmessage = this.onMessage.bind(this), this.seedRandom(h), this.tasks = []
                }
                var d = a("../crypto"), e = a("../packet"), f = a("../key.js"), g = a("../type/keyid.js"), h = (a("../enums.js"), 5e4), i = 2e4;
                c.prototype.onMessage = function(a) {
                    var b = a.data;
                    switch (b.event) {
                        case "method-return":
                            this.tasks.shift()(b.err ? new Error(b.err) : null, b.data);
                            break;
                        case "request-seed":
                            this.seedRandom(i);
                            break;
                        default:
                            throw new Error("Unknown Worker Event.")
                    }
                }, c.prototype.seedRandom = function(a) {
                    var b = this.getRandomBuffer(a);
                    this.worker.postMessage({event: "seed-random",buf: b})
                }, c.prototype.getRandomBuffer = function(a) {
                    if (!a)
                        return null;
                    var b = new Uint8Array(a);
                    return d.random.getRandomValues(b), b
                }, c.prototype.terminate = function() {
                    this.worker.terminate()
                }, c.prototype.encryptMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "encrypt-message",keys: a,text: b}), this.tasks.push(c)
                }, c.prototype.signAndEncryptMessage = function(a, b, c, d) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), b = b.toPacketlist(), this.worker.postMessage({event: "sign-and-encrypt-message",publicKeys: a,privateKey: b,text: c}), this.tasks.push(d)
                }, c.prototype.decryptMessage = function(a, b, c) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-message",privateKey: a,message: b}), this.tasks.push(c)
                }, c.prototype.decryptAndVerifyMessage = function(a, b, c, d) {
                    a = a.toPacketlist(), b = b.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "decrypt-and-verify-message",privateKey: a,publicKeys: b,message: c}), this.tasks.push(function(a, b) {
                        b && (b.signatures = b.signatures.map(function(a) {
                            return a.keyid = g.fromClone(a.keyid), a
                        })), d(a, b)
                    })
                }, c.prototype.signClearMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "sign-clear-message",privateKeys: a,text: b}), this.tasks.push(c)
                }, c.prototype.verifyClearSignedMessage = function(a, b, c) {
                    a = a.map(function(a) {
                        return a.toPacketlist()
                    }), this.worker.postMessage({event: "verify-clear-signed-message",publicKeys: a,message: b}), this.tasks.push(function(a, b) {
                        b && (b.signatures = b.signatures.map(function(a) {
                            return a.keyid = g.fromClone(a.keyid), a
                        })), c(a, b)
                    })
                }, c.prototype.generateKeyPair = function(a, b, c, d, g) {
                    this.worker.postMessage({event: "generate-key-pair",keyType: a,numBits: b,userId: c,passphrase: d}), this.tasks.push(function(a, b) {
                        if (b) {
                            var c = e.List.fromStructuredClone(b.key);
                            b.key = new f.Key(c)
                        }
                        g(a, b)
                    })
                }, c.prototype.decryptKey = function(a, b, c) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-key",privateKey: a,password: b}), this.tasks.push(function(a, b) {
                        if (b) {
                            var d = e.List.fromStructuredClone(b);
                            b = new f.Key(d)
                        }
                        c(a, b)
                    })
                }, c.prototype.decryptKeyPacket = function(a, b, c, d) {
                    a = a.toPacketlist(), this.worker.postMessage({event: "decrypt-key-packet",privateKey: a,keyIds: b,password: c}), this.tasks.push(function(a, b) {
                        if (b) {
                            var c = e.List.fromStructuredClone(b);
                            b = new f.Key(c)
                        }
                        d(a, b)
                    })
                }, b.exports = c
            }, {"../crypto": 19,"../enums.js": 30,"../key.js": 32,"../packet": 40,"../type/keyid.js": 58}]}, {}, [31])(31)
});
