'use strict';
var _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
    return typeof a
} : function (a) {
    return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
};
(function (a) {
    var c = window._TMS = a.fn._TMS = function (d) {
        return d = d || {}, d = a.extend(clone(c), c.presets[d.preset], d), d.init.call(d.me = d.holder = this, d), d.me.data({opt: d})
    };
    a.extend(c, {
        etal: '<div></div>',
        items: '.items>li',
        pic: 'pic',
        mask: 'mask',
        paginationCl: 'pagination',
        currCl: 'current',
        pauseCl: 'paused',
        bannerCl: 'banner',
        numStatusCl: 'numStatus',
        pagNums: !0,
        overflow: 'hidden',
        show: 0,
        changeEv: 'click',
        blocksX: 1,
        blocksY: 1,
        preset: 'simpleFade',
        duration: 1e3,
        easing: 'linear',
        way: 'lines',
        anim: 'fade',
        pagination: !1,
        banners: !1,
        waitBannerAnimation: !0,
        slideshow: !1,
        progressBar: !1,
        pauseOnHover: !1,
        nextBu: !1,
        prevBu: !1,
        playBu: !1,
        preFu: function preFu() {
            var d = this, e = a(new Image);
            d.pic = a(d.etal).addClass(d.pic).css({overflow: d.overflow}).appendTo(d.me), d.mask = a(d.etal).addClass(d.mask).appendTo(d.pic), 'static' == d.me.css('position') && d.me.css({position: 'relative'}), 'auto' == d.me.css('z-index') && d.me.css({zIndex: 1}), d.me.css({overflow: d.overflow}), d.items && d.parseImgFu(), e.appendTo(d.me).load(function () {
                d.pic.css({
                    width: d.width = e.width(),
                    height: d.height = e.height(),
                    background: 'url(' + d.itms[d.show] + ') 0 0 no-repeat'
                }), e.remove(), d.current = d.buff = d.show
            }).attr({src: d.itms[d.n = d.show]})
        },
        sliceFu: function sliceFu(d, e) {
            var o, p, f = this, d = f.blocksX, e = f.blocksY, g = parseInt(f.width / d), j = parseInt(f.height / e),
                k = a(f.etal), l = f.pic.width() - g * d, m = f.pic.height() - j * e, q = f.matrix = [];
            for (f.mask.css({
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                zIndex: 1
            }).empty().appendTo(f.pic), p = 0; p < e; p++) for (o = 0; o < d; o++) q[p] = q[p] ? q[p] : [], q[p][o] = a(f.etal).clone().appendTo(f.mask).css({
                left: o * g,
                top: p * j,
                position: 'absolute',
                width: o == d - 1 ? g + l : g,
                height: p == e - 1 ? j + m : j,
                backgroundPosition: '-' + o * g + 'px -' + p * j + 'px',
                display: 'none'
            });
            f.maskC && (f.maskC.remove(), delete f.maskC), f.maskC = f.mask.children()
        },
        changeFu: function changeFu(d) {
            var e = this;
            if (e.bl) return !1;
            if (d == e.n) return !1;
            e.n = d, e.next = e.itms[d], e.direction = d - e.buff, e.direction == e.itms.length - 1 && (e.direction = -1), e.direction == -1 * e.itms.length + 1 && (e.direction = 2), e.current = e.buff = d, e.numStatus && e.numStatusChFu(), e.pagination && e.pags.removeClass(e.currCl).eq(d).addClass(e.currCl), !1 !== e.banners && e.banner && e.bannerHide(e.banner, e), e.progressBar && (clearInterval(e.slShTimer), e.progressBar.stop()), e.slideshow && !e.paused && e.progressBar && e.progressBar.stop().width(0);
            var f = function () {
                e.preset_ != e.preset && (e.du = e.duration, e.ea = e.easing, a.extend(e, c.presets[e.preset]), e.duration = e.du, e.easing = e.ea, e.preset_ = e.preset), e.sliceFu(), e.maskC.stop().css({backgroundImage: 'url(' + e.next + ')'}), e.beforeAnimation(), e.showFu()
            };
            e.waitBannerAnimation ? a.when(e.banner).then(f) : f()
        },
        nextFu: function nextFu() {
            var d = this, e = d.n;
            d.changeFu(++e < d.itms.length ? e : 0)
        },
        prevFu: function prevFu() {
            var d = this, e = d.n;
            d.changeFu(0 <= --e ? e : d.itms.length - 1)
        },
        showFu: function showFu() {
            var e, d = this;
            e = d.ways[d.way].call(d), d.reverseWay && e.reverse(), d.dirMirror && (e = d.dirMirrorFu(e)), d.int && clearInterval(d.int), d.int = setInterval(function () {
                e.length ? d.anims[d.anim].apply(d, [e.shift(), !e.length]) : clearInterval(d.int)
            }, d.interval), d.bl = !0
        },
        dirMirrorFu: function dirMirrorFu(d) {
            var e = this;
            return 0 > e.direction, d
        },
        afterShow: function afterShow() {
            var d = this;
            d.pic.css({backgroundImage: 'url(' + d.next + ')'}), d.maskC.hide(), d.slideshow && !d.paused && d.startSlShFu(0), !1 !== d.banners && (d.banner = d.banners[d.n]), d.banner && (d.banner.appendTo(d.me), d.bannerShow(d.banner, d)), d.afterAnimation(), d.bl = !1
        },
        bannerShow: function bannerShow() {
        },
        bannerHide: function bannerHide() {
        },
        parseImgFu: function parseImgFu() {
            var d = this;
            d.itms = [], a(d.items + ' img', d.me).each(function (e) {
                d.itms[e] = a(this).attr('src')
            }), a(d.items, d.me).hide()
        },
        controlsFu: function controlsFu() {
            var d = this;
            d.nextBu && a(d.nextBu).bind(d.changeEv, function () {
                return d.nextFu(), !1
            }), d.prevBu && a(d.prevBu).bind(d.changeEv, function () {
                return d.prevFu(), !1
            })
        },
        paginationFu: function paginationFu() {
            var d = this;
            return !1 !== d.pagination && void(!0 === d.pagination ? d.pags = a('<ul></ul>') : 'string' == typeof d.pagination && (d.pags = a(d.pagination)), 0 == d.pags.parent().length && d.pags.appendTo(d.me), 0 == d.pags.children().length ? a(d.itms).each(function (e) {
                var f = a('<li></li>').data({num: e});
                d.pags.append(f.append('<a href="#"></a>'))
            }) : d.pags.find('li').each(function (e) {
                a(this).data({num: e})
            }), d.pagNums && d.pags.find('a').each(function (e) {
                a(this).text(e + 1)
            }), d.pags.delegate('li>a', d.changeEv, function () {
                return d.changeFu(a(this).parent().data('num')), !1
            }), d.pags.addClass(d.paginationCl), d.pags = a('li', d.pags), d.pags.eq(d.n).addClass(d.currCl))
        },
        startSlShFu: function startSlShFu(d) {
            var e = this;
            e.paused = !1, e.prog = d || 0, clearInterval(e.slShTimer), e.slShTimer = setInterval(function () {
                100 > e.prog ? e.prog++ : (e.prog = 0, clearInterval(e.slShTimer), e.nextFu()), e.progressBar && e.pbchFu()
            }, e.slideshow / 100), e.playBu && a(e.playBu).removeClass(e.pauseCl)
        },
        pauseSlShFu: function pauseSlShFu() {
            var d = this;
            d.paused = !0, clearInterval(d.slShTimer), d.playBu && a(d.playBu).addClass(d.pauseCl)
        },
        slideshowFu: function slideshowFu() {
            var d = this;
            return !1 !== d.slideshow && void(d.playBu && a(d.playBu).bind(d.changeEv, function () {
                return d.paused ? d.startSlShFu(d.prog) : d.pauseSlShFu(), !1
            }), d.startSlShFu())
        },
        pbchFu: function pbchFu() {
            var d = this;
            0 == d.prog ? d.progressBar.stop().width(0) : d.progressBar.stop().animate({width: d.prog + '%'}, {
                easing: 'linear',
                duration: d.slideshow / 100
            })
        },
        progressBarFu: function progressBarFu() {
            var d = this;
            return !1 !== d.progressBar && void(d.progressBar = a(d.progressBar), 0 == d.progressBar.parent().length && d.progressBar.appendTo(d.me))
        },
        pauseOnHoverFu: function pauseOnHoverFu() {
            var d = this;
            d.pauseOnHover && d.me.bind('mouseenter', function () {
                d.pauseSlShFu()
            }).bind('mouseleave', function () {
                d.startSlShFu(d.prog)
            })
        },
        bannersFu: function bannersFu() {
            var d = this;
            return !1 !== d.banners && void(!0 !== d.banners && 'string' == typeof d.banners && (d.bannerShow = d.bannersPresets[d.banners].bannerShow, d.bannerHide = d.bannersPresets[d.banners].bannerHide), d.banners = [], a(d.items, d.me).each(function (e) {
                var f;
                d.banners[e] = !!(f = a('.' + d.bannerCl, this)).length && f.css({zIndex: 999})
            }), d.bannerShow(d.banner = d.banners[d.show].appendTo(d.me), d))
        },
        bannerDuration: 1e3,
        bannerEasing: 'swing',
        bannersPresets: {
            fromLeft: {
                bannerShow: function bannerShow(d, e) {
                    'auto' == d.css('top') && d.css('top', 0), d.stop().css({left: -d.width()}).animate({left: 0}, {
                        duration: e.bannerDuration,
                        easing: e.bannerEasing
                    })
                }, bannerHide: function bannerHide(d, e) {
                    d.stop().animate({left: -d.width()}, {duration: e.bannerDuration, easing: e.bannerEasing})
                }
            }, fromRight: {
                bannerShow: function bannerShow(d, e) {
                    'auto' == d.css('top') && d.css('top', 0), 'auto' != d.css('left') && d.css('left', 'auto'), d.stop().css({right: -d.width()}).animate({right: 10}, {
                        duration: 0,
                        easing: e.bannerEasing
                    })
                }, bannerHide: function bannerHide(d, e) {
                    d.stop().animate({right: -d.width()}, {duration: e.bannerDuration, easing: e.bannerEasing})
                }
            }, fromBottom: {
                bannerShow: function bannerShow(d, e) {
                    'auto' == d.css('left') && d.css('left', 0), 'auto' != d.css('top') && d.css('top', 'auto'), d.stop().css({bottom: -d.height()}).animate({bottom: 0}, {
                        duration: e.bannerDuration,
                        easing: e.bannerEasing
                    })
                }, bannerHide: function bannerHide(d) {
                    d.stop().animate({bottom: -d.height()})
                }
            }, fromTop: {
                bannerShow: function bannerShow(d, e) {
                    'auto' == d.css('left') && d.css('left', 0), d.stop().css({top: -d.height()}).animate({top: 0}, {
                        duration: e.bannerDuration,
                        easing: e.bannerEasing
                    })
                }, bannerHide: function bannerHide(d, e) {
                    d.stop().animate({top: -d.height()}, {duration: e.bannerDuration, easing: e.bannerEasing})
                }
            }, fade: {
                bannerShow: function bannerShow(d, e) {
                    'auto' == d.css('left') && d.css('left', 0), 'auto' == d.css('top') && d.css('top', 0), d.hide().fadeIn(e.bannerDuration)
                }, bannerHide: function bannerHide(d, e) {
                    d.fadeOut(e.bannerDuration)
                }
            }
        },
        numStatusChFu: function numStatusChFu() {
            var d = this;
            d.numSt.html('<span class="curr"></span>/<span class="total"></span>'), a('.curr', d.numSt).text(d.n + 1), a('.total', d.numSt).text(d.itms.length)
        },
        numStatusFu: function numStatusFu() {
            var d = this;
            return !1 !== d.numStatus && void(!d.numSt && (!0 === d.numStatus ? d.numSt = a(d.etal).addClass(d.numStatusCl) : d.numSt = a(d.numStatus).addClass(d.numStatusCl)), !d.numSt.parent().length && d.numSt.appendTo(d.me).addClass(d.numStatusCl), d.numStatusChFu())
        },
        init: function init(d) {
            d.preFu(), d.controlsFu(), d.paginationFu(), d.slideshowFu(), d.progressBarFu(), d.pauseOnHoverFu(), d.bannersFu(), d.numStatusFu()
        },
        afterAnimation: function afterAnimation() {
        },
        beforeAnimation: function beforeAnimation() {
        }
    })
})(jQuery);

function clone(a) {
    if (!a || ('undefined' == typeof a ? 'undefined' : _typeof(a)) != _typeof({})) return a;
    if (a instanceof Array) return [].concat(a);
    var c, b = new a.constructor;
    for (c in a) a.hasOwnProperty(c) && (b[c] = clone(a[c]));
    return b
}