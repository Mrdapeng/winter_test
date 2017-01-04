/**
 * Created by lrp on 17-1-3.
 */
!function (t) {
    if ("undefined" == typeof t.PANDA_MONITOR) {
        var e = "v2.1.1 (2016.12.19)", r = ["panda.tv"], n = function (a) {
            var o, i = t.document, c = t.navigator, u = t.screen, f = t.location, s = f.protocol.toLowerCase(), d = c.userAgent.toLowerCase(), l = f.search || "", p = "m.panda.tv" === f.hostname, g = !!(p && t.pandatvClient && l.indexOf("__plat=android") > -1 && l.indexOf("__channel") > -1 && l.indexOf("__guid") > -1), h = "";
            if (g) {
                var m = l.match(/__guid=([A-Za-z0-9]+)/);
                m && m[1] && (h = m[1])
            }
            var v = !0;
            try {
                v = !/^https?:$/.test(s)
            } catch (w) {
            }
            o = v ? "" : document.domain.toLowerCase();
            var x = {viewUrl: null, clickUrl: null, areaIds: null}, y = function (t, e) {
                var r;
                e = e || document;
                try {
                    t && (e.querySelector ? r = e.querySelector(t) : "#" === t.charAt(0) && (r = document.getElementById(t.slice(1))))
                } catch (n) {
                }
                return r
            }, b = {
                trim: function (t) {
                    return t.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "")
                }
            }, R = function () {
                function t(t) {
                    return t && t.constructor ? Object.prototype.toString.call(t).slice(8, -1) : ""
                }

                return {
                    isArray: function (e) {
                        return "Array" == t(e)
                    }, isObject: function (t) {
                        return null !== t && "object" == typeof t
                    }, mix: function (t, e, r) {
                        for (var n in e)(r || !(t[n] || n in t)) && (t[n] = e[n]);
                        return t
                    }, encodeURIJson: function (t) {
                        var e = [];
                        for (var r in t)t[r] && e.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
                        return e.join("&")
                    }
                }
            }(), I = {
                on: function (t, e, r) {
                    t.addEventListener ? t && t.addEventListener(e, r, !1) : t && t.attachEvent("on" + e, r)
                }, parentNode: function (t, e, r) {
                    for (r = r || 5, e = e.toUpperCase(); t && r-- > 0;) {
                        if (t.tagName === e)return t;
                        t = t.parentNode
                    }
                    return null
                }
            }, _ = {
                fix: function (t) {
                    if (!("target" in t)) {
                        var e = t.srcElement || t.target;
                        e && 3 == e.nodeType && (e = e.parentNode), t.target = e
                    }
                    return t
                }
            }, P = {
                get: function (t) {
                    try {
                        var e, r = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                        return (e = i.cookie.match(r)) ? unescape(e[2]) : ""
                    } catch (n) {
                        return ""
                    }
                }, set: function (t, e, r) {
                    if (!g) {
                        r = r || {};
                        var n = r.expires;
                        "number" == typeof n && (n = new Date, n.setTime(n.getTime() + r.expires));
                        try {
                            i.cookie = t + "=" + escape(e) + (n ? ";expires=" + n.toGMTString() : "") + (r.path ? ";path=" + r.path : "") + (r.domain ? "; domain=" + r.domain : "")
                        } catch (a) {
                        }
                    }
                }
            }, k = {
                ObjectH: R, Cookie: P, getProject: function () {
                    return ""
                }, getDevice: function () {
                    if (t.PDR && PDR.device)return PDR.device;
                    var e = t.navigator.userAgent.toLowerCase(), r = /ipad/i.test(e), n = /iphone/i.test(e), a = /android/i.test(e), o = "desktop";
                    return a && (o = "android"), n && (o = "iphone"), r && (o = "ipad"), o
                }, getPlatform: function () {
                    if (t.PDR && PDR.__plat)return PDR.__plat;
                    var e, r = t.navigator.userAgent.toLowerCase(), n = /pandauwp/i.test(r), a = "pc_web";
                    if (n && (e = "pc_uwp"), t.external && t.external.pandaclient_getplatform && ("string" === $.type(t.external.pandaclient_getplatform) ? e = t.external.pandaclient_getplatform : "function" === $.type(t.external.pandaclient_getplatform) && (e = t.external.pandaclient_getplatform())), p)if (t.pandatvClient) {
                        var o = l.match(/__plat=([A-Za-z0-9]+)/);
                        e = o && o[1] ? o[1] : "m_h5"
                    } else e = "m_h5";
                    return e || a
                }, getReferrer: function () {
                    var t = i.referrer || "";
                    return t.indexOf("pass") > -1 || t.indexOf("pwd") > -1 || t.indexOf("password") > -1 ? "403" : t
                }, getBrowser: function () {
                    var e = {
                        "360se-ua": "360se",
                        TT: "tencenttraveler",
                        Maxthon: "maxthon",
                        GreenBrowser: "greenbrowser",
                        Sogou: "se 1.x / se 2.x",
                        TheWorld: "theworld"
                    };
                    for (var r in e)if (d.indexOf(e[r]) > -1)return r;
                    var n = !1;
                    try {
                        +external.twGetVersion(external.twGetSecurityID(t)).replace(/\./g, "") > 1013 && (n = !0)
                    } catch (a) {
                    }
                    if (n)return "360se-noua";
                    var o = d.match(/(msie|chrome|safari|firefox|opera|trident)/);
                    return o = o ? o[0] : "", "msie" == o ? o = d.match(/msie[^;]+/) + "" : "trident" == o && d.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/gi, function (t, e) {
                            o = "msie " + e
                        }), o
                }, getLocation: function () {
                    var t = "";
                    try {
                        t = f.href
                    } catch (e) {
                        t = i.createElement("a"), t.href = "", t = t.href
                    }
                    return t
                }, getGuid: function () {
                    function e(t) {
                        var e = 0, r = 0, n = t.length - 1;
                        for (n; n >= 0; n--) {
                            var a = parseInt(t.charCodeAt(n), 10);
                            e = (e << 6 & 268435455) + a + (a << 14), 0 != (r = 266338304 & e) && (e ^= r >> 21)
                        }
                        return e
                    }

                    function n() {
                        for (var r = [c.appName, c.version, c.language || c.browserLanguage, c.platform, c.userAgent, u.width, "x", u.height, u.colorDepth, i.referrer].join(""), n = r.length, a = t.history.length; a;)r += a-- ^ n++;
                        return 2147483647 * (Math.round(2147483647 * Math.random()) ^ e(r))
                    }

                    var a = "__guid", f = P.get(a);
                    if (!f) {
                        f = [e(v ? "" : i.domain), n(), (new Date).getTime() + Math.random() + Math.random()].join(".");
                        var s = {expires: 2592e7, path: "/"};
                        if (r.length)for (var d = 0; d < r.length; d++) {
                            var l = r[d], p = "." + l;
                            if (o.indexOf(p) > 0 && o.lastIndexOf(p) == o.length - p.length || o == l) {
                                s.domain = p;
                                break
                            }
                        }
                        P.set(a, f, s)
                    }
                    return function () {
                        return g ? h : f
                    }
                }(), getCount: function () {
                    var t = "monitor_count", e = P.get(t);
                    return e = (parseInt(e) || 0) + 1, P.set(t, e, {expires: 864e5, path: "/"}), function () {
                        return e
                    }
                }(), getFlashVer: function () {
                    var e = -1;
                    if (c.plugins && c.mimeTypes.length) {
                        var r = c.plugins["Shockwave Flash"];
                        r && r.description && (e = r.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
                    } else if (t.ActiveXObject && !t.opera)try {
                        var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        if (n) {
                            var a = n.GetVariable("$version");
                            e = a.replace(/WIN/g, "").replace(/,/g, ".")
                        }
                    } catch (o) {
                    }
                    return e = parseInt(e, 10)
                }, getContainerId: function (t) {
                    var e, r, n = 100;
                    for (x.areaIds && (e = new RegExp("^(" + x.areaIds.join("|") + ")$", "ig")); t;) {
                        if (t.attributes && ("bk" in t.attributes || "data-bk" in t.attributes)) {
                            if (r = t.getAttribute("bk") || t.getAttribute("data-bk"))return r = "bk:" + r, r.substr(0, n);
                            if (t.id)return r = t.getAttribute("data-desc") || t.id, r.substr(0, n)
                        } else if (e && t.id && e.test(t.id))return r = t.getAttribute("data-desc") || t.id, r.substr(0, n);
                        t = t.parentNode
                    }
                    return ""
                }, getText: function (t) {
                    var e = "";
                    return e = "input" == t.tagName.toLowerCase() ? t.getAttribute("text") || t.getAttribute("data-text") || t.value || t.title || "" : t.getAttribute("text") || t.getAttribute("data-text") || t.innerText || t.textContent || t.title || "", b.trim(e).substr(0, 100)
                }, getHref: function (t) {
                    try {
                        return t.getAttribute("data-href") || t.href || ""
                    } catch (e) {
                        return ""
                    }
                }, getQueryParam: function () {
                    var e = function () {
                        var t = /(?:\?|&)?(\w+)=([^&]*)/gi;
                        return function (e) {
                            var r, n = {};
                            try {
                                for (; null !== (r = t.exec(e));)n[r[1]] = r[2]
                            } catch (a) {
                            }
                            return n
                        }
                    }(), r = e(function () {
                        var e = t.location.search;
                        if (!e) {
                            var r = document.createElement(r);
                            r.href = t.location.href, e = r.search
                        }
                        return e
                    }());
                    return function (t) {
                        return t ? r[t] : R.mix({}, r, !0)
                    }
                }(), getRoomId: function () {
                    if (t._config_monitor_roomid)return t._config_monitor_roomid;
                    if (t.PDR && PDR.getRoomId)return PDR.getRoomId();
                    var e, r, n;
                    try {
                        if (e = t.location.pathname, e || (r = document.createElement("a"), r.href = t.location.href, e = r.pathname), /^\/(roomframe|roomuwp)/.test(e) ? (n = e.split("/"), n = n[n.length - 1]) : n = e.substr(1), p) {
                            var a = t.location.search.match(/roomid=(\d+)/);
                            a && a[1] && (n = a[1])
                        }
                    } catch (o) {
                    }
                    return n > 0 ? n : ""
                }
            }, A = {
                getBase: function () {
                    return {prj: k.getProject(), cid: k.getGuid(), fl: k.getFlashVer(), __plat: k.getPlatform()}
                }, getViewTrack: function () {
                    return {
                        r: encodeURIComponent(k.getReferrer()),
                        c: encodeURIComponent(k.getLocation()),
                        b: k.getBrowser(),
                        count: k.getCount(),
                        room: k.getRoomId()
                    }
                }, getClick: function (t) {
                    t = _.fix(t || event);
                    var e = t.target, r = e.tagName, n = k.getContainerId(e);
                    if (!e.type || "submit" != e.type && "button" != e.type) {
                        if ("AREA" == r)return {f: k.getHref(e), c: "area:" + e.parentNode.name, cId: n};
                        var a, o;
                        return "IMG" == r && (a = e), (e = I.parentNode(e, "A")) ? (o = k.getText(e), {
                                f: k.getHref(e),
                                c: o ? o : a ? a.src.match(/[^\/]+$/) : "",
                                cId: n
                            }) : !1
                    }
                    var i = I.parentNode(e, "FORM"), c = {};
                    if (i) {
                        var u = i.id || "", f = i.name || "";
                        if (c = {
                                f: i.action,
                                c: "form:" + (f || u),
                                cId: n
                            }, f.indexOf("search") > -1 || u.indexOf("search") > -1) {
                            var s = y(".kw", i) || y(".search-kw", i);
                            c.w = s ? s.value : ""
                        }
                    } else c = {f: k.getHref(e), c: k.getText(e), cId: n};
                    return c
                }, getKeydown: function (t) {
                    if (t = _.fix(t || event), 13 != t.keyCode)return !1;
                    var e = t.target, r = e.tagName, n = k.getContainerId(e);
                    if ("INPUT" == r) {
                        var a = I.parentNode(e, "FORM");
                        if (a) {
                            var o = a.id || "", i = e.id, c = e.name, u = {
                                f: a.action,
                                c: "form:" + (a.name || o),
                                cId: n
                            };
                            return ("kw" == i || "search-kw" == i || "kw" == c || "search-kw" == c) && (u.w = e.value), u
                        }
                    }
                    return !1
                }
            };
            return {
                version: e, util: k, data: A, getConfig: function () {
                    return x
                }, setConf: function (t, e) {
                    var r = {};
                    return R.isObject(t) ? r = t : r[t] = e, x = R.mix(x, r, !0), this
                }, sendLog: function () {
                    var t = {}, e = 0;
                    return function (r) {
                        var n = "log_" + (new Date).getTime() + "_" + ++e, a = t[n] = new Image;
                        a.onload = a.onerror = function () {
                            t[n] && (t[n] = null, delete t[n])
                        }, a.src = r
                    }
                }(), buildLog: function () {
                    var t = "";
                    return function (e, r, n) {
                        if (e !== !1) {
                            e = e || {}, n !== !0 && (e = R.mix(A.getBase(), e, !0));
                            var a = "string" == typeof e ? e : R.encodeURIJson(e);
                            r += (r.indexOf("?") > -1 ? "&" : "?") + a, r != t && (t = r, setTimeout(function () {
                                t = null
                            }, 100), n !== !0 && (r += "&t=" + (new Date).getTime()), this.sendLog(r))
                        }
                    }
                }(), log: function (t, e, r) {
                    e = e || "click";
                    var n = x[e + "Url"];
                    n || console && console.error("Monitor error: the " + e + " url does not exist!"), this.buildLog(t, n, r)
                }, setUrl: function (t) {
                    return t && (this.util.getLocation = function () {
                        return t
                    }), this
                }, setProject: function (t) {
                    return t && (this.util.getProject = function () {
                        return t
                    }), this
                }, setId: function () {
                    for (var t, e = [], r = 0; t = arguments[r++];)R.isArray(t) ? e = e.concat(t) : e.push(t);
                    return this.setConf("areaIds", e), this
                }, getTrack: function () {
                    var t = this.data.getViewTrack();
                    return this.log(t, "view"), this
                }, getClickAndKeydown: function () {
                    var t = this;
                    return I.on(i, "mousedown", function (e) {
                        var r = t.data.getClick(e);
                        t.log(r, "click")
                    }), I.on(i, "keydown", function (e) {
                        var r = t.data.getKeydown(e);
                        t.log(r, "click")
                    }), n.getClickAndKeydown = function () {
                        return t
                    }, this
                }
            }
        }();
        n.setConf({viewUrl: ("https:" === t.location.protocol ? "https:" : "http:") + "//s.panda.tv/view"}), t.PANDA_MONITOR = n
    }
}(window), function (t) {
    var e = t.PANDA_MONITOR, r = "https:" === t.location.protocol ? "https:" : "http:";
    e.setConf({
        onlineUrl: r + "//o.stat.panda.tv/Hit/Proc",
        punchUrl: r + "//dd.panda.tv/pc_import_punch.gif",
        statUrl: r + "//s.panda.tv/stat",
        liveUrl: r + "//s.panda.tv/live"
    }).setProject("pandatv").getTrack();
    var n, a = e.util.getPlatform(), o = a + "|" + t.location.host + t.location.pathname;
    try {
        n = document.cookie.match(/R=r%3D(\d+)%26/)[1]
    } catch (i) {
        n = e.util.getGuid()
    }
    var c = e.util.getQueryParam("psrc") || "--", u = function () {
        e.log({
            uri: encodeURIComponent(e.util.getLocation()),
            btime: +new Date,
            uid: n,
            sec: 60,
            loc: o,
            other: e.util.getGuid(),
            room: e.util.getRoomId(),
            psrc: c
        }, "online")
    };
    u(), t.setInterval(u, 6e4), function () {
        var t = ["pur", "papp", "purl", "pref", "puid", "prid", "pcid", "pae", "paew", "pmsg", "psrc", "pchannel"], r = {};
        !function () {
            for (var n = 0; n < t.length; n++)r[t[n]] = "";
            r.pur = 0, r.psrc = "--", r.pchannel = "--", c && (r.psrc = c);
            var o = e.util.getQueryParam("channel");
            o && (r.pchannel = o), r.papp = a, r.prid = e.util.getRoomId() || 0;
            try {
                var i = e.util.Cookie.get("R"), u = i.match(/r=(\d+)/);
                r.puid = u && u[1] ? u[1] : 0, r.pcid = e.util.getGuid() || "", r.purl = e.util.getLocation(), r.pref = e.util.getReferrer()
            } catch (f) {
            }
        }(), e.nlog = function (n) {
            if (n = n || {}, n.paew) {
                n.pur = Math.round(2147483647 * Math.random()), n.pmsg = n.pmsg || "";
                var a = e.util.ObjectH.mix({}, r, !0);
                a = e.util.ObjectH.mix(a, n, !0);
                for (var o = [], i = 0; i < t.length; i++)o.push(t[i] + "=" + encodeURIComponent(a[t[i]]));
                e.log(o.join("&"), "punch", !0)
            }
        }, e.nlog({pae: "view", paew: "page"}), e.commonParams = r
    }(), $(document.body).on("click", '[data-toggle="panda-monitor"]', function (t) {
        var r = $(t.currentTarget), n = $.trim(r.attr("data-pae")), a = $.trim(r.attr("data-paew"));
        a && e.nlog({pae: n || "click", paew: a})
    })
}(window), function (t, e) {
    "use strict";
    var r = t.PANDA_MONITOR;
    if (r) {
        var n = {
            psrc: r.util.getQueryParam("psrc") || "",
            channel: r.util.getQueryParam("channel") || "",
            from: r.util.getQueryParam("from") || "",
            placeid: r.util.getQueryParam("placeid") || ""
        }, a = [];
        e.each(n, function (t, e) {
            e && a.push(e)
        });
        var o = function (r) {
            var a, o;
            return t.PDR && PDR.parseUrl ? (a = PDR.parseUrl(r), o = a.query ? "?" + a.query : "") : (a = document.createElement("a"), a.href = r, o = a.search), e.each(n, function (t, e) {
                return e && -1 === o.indexOf(t + "=") ? void(o += (-1 !== o.indexOf("?") ? "&" : "?") + t + "=" + e) : !0
            }), t.PDR && PDR.formatUrl ? (a.query = o, PDR.formatUrl(a)) : (a.search = o, a.href)
        };
        a.length && (e("body").on("mouseenter", "a", function () {
            var t = e(this), r = /^(javascript|#)/, n = t.attr("href") || "", a = t.attr("data-href") || "";
            a && !r.test(a) && t.attr("data-href", o(a)), n && !r.test(n) && t.attr("href", o(n))
        }), e("iframe[data-monitor-url]").each(function () {
            var t = e(this), r = t.data("monitor-url");
            r && t.attr("src", o(r))
        })), r.appendMonitorParams = o, r.monitorParams = n
    }
}(window, window.jQuery || window.Zepto);