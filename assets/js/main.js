!function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(n, "a", n), n;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 0);
}([ function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = n(1);
    n.n(o);
    n(2);
    var i, a, r, s, c, d, h, l, u, p, m = n(3), E = n(4);
    ({
        initLight: function() {
            i.add(new THREE.AmbientLight(16777215));
            var e;
            e = new THREE.DirectionalLight(16777215, 1), e.position.set(300, 400, 50), e.position.multiplyScalar(1.3), 
            e.castShadow = !0, e.shadow.mapSize.width = 1e3, e.shadow.mapSize.height = 1e3;
            var t = 200;
            e.shadow.camera.left = -t, e.shadow.camera.right = t, e.shadow.camera.top = t, e.shadow.camera.bottom = -t, 
            e.shadow.camera.far = 1e3, i.add(e);
            var n = new THREE.DirectionalLightHelper(e, 5);
            i.add(n);
        },
        initRender: function() {
            a = new THREE.WebGLRenderer(), a.setPixelRatio(window.devicePixelRatio), a.shadowMap.enabled = !0, 
            a.shadowMap.type = THREE.PCFSoftShadowMap, a.setSize(window.innerWidth, window.innerHeight), 
            document.getElementById("mycanvas").appendChild(a.domElement);
        },
        initCamera: function() {
            r = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1e3), 
            r.position.set(0, 50, 250), r.target = new THREE.Vector3(0, 0, 0), i.add(r);
            var e = new THREE.CameraHelper(r);
            i.add(e);
        },
        controlCamera: function() {
            var e = this;
            e.controls = new THREE.OrbitControls(r, a.domElement), e.controls.maxPolarAngle = Math.PI / 2, 
            e.controls.minDistance = 100, e.controls.maxDistance = 500;
        },
        initEvent: function() {
            window.addEventListener("resize", function() {
                r.aspect = window.innerWidth / window.innerHeight, r.updateProjectionMatrix(), a.setSize(window.innerWidth, window.innerHeight);
            }, !1);
        },
        createGround: function() {
            var e, t = new Image();
            e = new THREE.Texture(t), e.wrapS = e.wrapT = THREE.RepeatWrapping, e.needsUpdate = !0;
            var n = new THREE.MeshLambertMaterial({
                color: 0x808a87
            }), o = new THREE.Mesh(new THREE.PlaneGeometry(1e4, 1e4), n);
            o.rotation.x = -Math.PI / 2, o.receiveShadow = !0, o.castShadow = !1, i.add(o);
        },
        createCPlanes: function() {
            u = [];
            for (var e = 0; e < 30; e++) p = u[e] = new E(), 29 === e ? (p.position.z = 499, 
            p.position.y = 1, p.position.x = -12) : (p.position.z = 480 + 20 * Math.random(), 
            p.position.x = -20, p.position.y = 5 - 10 * Math.random()), i.add(p);
        },
        createPlanes: function() {
            c = [], h = [];
            for (var e = 0; e < 50; e++) d = h[e] = new m(), d.position.x = Math.random() > .5 ? -250 - 50 * Math.random() : 250 + 50 * Math.random(), 
            d.position.y = 300 * Math.random(), d.position.z = 500 * Math.random(), d.velocity.x = 2 * Math.random() - 1, 
            d.velocity.y = 2 * Math.random() - 1, d.velocity.z = 2 * Math.random() - 1, d.setAvoidWalls(!0), 
            d.setWorldSize(300, 400, 500), s = c[e] = new E(), i.add(s);
        },
        init: function() {
            function e() {
                t(), l = requestAnimationFrame(e);
            }
            function t() {
                n.controls.update(), a.render(i, r);
                for (var e = 0, t = c.length; e < t; e++) d = h[e], d.run(h), s = c[e], s.position.copy(h[e].position), 
                s.rotation.y = Math.atan2(-d.velocity.z, d.velocity.x), s.rotation.z = Math.asin(d.velocity.y / d.velocity.length());
            }
            var n = this;
            i = new THREE.Scene(), i.add(new THREE.AxisHelper(800)), i.background = new THREE.Color(0x292421), 
            i.fog = new THREE.Fog(i.background, 1, 5e3), n.initLight(), n.initCamera(), n.createGround(), 
            n.createPlanes(), n.initRender(), n.controlCamera(), n.initEvent(), e();
        }
    }).init();
}, function(e, t) {}, function(e, t) {
    THREE.OrbitControls = function(e, t) {
        function n() {
            return 2 * Math.PI / 60 / 60 * L.autoRotateSpeed;
        }
        function o() {
            return Math.pow(.95, L.zoomSpeed);
        }
        function i(e) {
            F.theta -= e;
        }
        function a(e) {
            F.phi -= e;
        }
        function r(e) {
            L.object instanceof THREE.PerspectiveCamera ? Y /= e : L.object instanceof THREE.OrthographicCamera ? (L.object.zoom = Math.max(L.minZoom, Math.min(L.maxZoom, L.object.zoom * e)), 
            L.object.updateProjectionMatrix(), W = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), 
            L.enableZoom = !1);
        }
        function s(e) {
            L.object instanceof THREE.PerspectiveCamera ? Y *= e : L.object instanceof THREE.OrthographicCamera ? (L.object.zoom = Math.max(L.minZoom, Math.min(L.maxZoom, L.object.zoom / e)), 
            L.object.updateProjectionMatrix(), W = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), 
            L.enableZoom = !1);
        }
        function c(e) {
            G.set(e.clientX, e.clientY);
        }
        function d(e) {
            Q.set(e.clientX, e.clientY);
        }
        function h(e) {
            _.set(e.clientX, e.clientY);
        }
        function l(e) {
            B.set(e.clientX, e.clientY), X.subVectors(B, G);
            var t = L.domElement === document ? L.domElement.body : L.domElement;
            i(2 * Math.PI * X.x / t.clientWidth * L.rotateSpeed), a(2 * Math.PI * X.y / t.clientHeight * L.rotateSpeed), 
            G.copy(B), L.update();
        }
        function u(e) {
            J.set(e.clientX, e.clientY), $.subVectors(J, Q), $.y > 0 ? r(o()) : $.y < 0 && s(o()), 
            Q.copy(J), L.update();
        }
        function p(e) {
            K.set(e.clientX, e.clientY), q.subVectors(K, _), ne(q.x, q.y), _.copy(K), L.update();
        }
        function m(e) {}
        function E(e) {
            e.deltaY < 0 ? s(o()) : e.deltaY > 0 && r(o()), L.update();
        }
        function v(e) {
            switch (e.keyCode) {
              case L.keys.UP:
                ne(0, L.keyPanSpeed), L.update();
                break;

              case L.keys.BOTTOM:
                ne(0, -L.keyPanSpeed), L.update();
                break;

              case L.keys.LEFT:
                ne(L.keyPanSpeed, 0), L.update();
                break;

              case L.keys.RIGHT:
                ne(-L.keyPanSpeed, 0), L.update();
            }
        }
        function b(e) {
            G.set(e.touches[0].pageX, e.touches[0].pageY);
        }
        function f(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX, n = e.touches[0].pageY - e.touches[1].pageY, o = Math.sqrt(t * t + n * n);
            Q.set(0, o);
        }
        function w(e) {
            _.set(e.touches[0].pageX, e.touches[0].pageY);
        }
        function T(e) {
            B.set(e.touches[0].pageX, e.touches[0].pageY), X.subVectors(B, G);
            var t = L.domElement === document ? L.domElement.body : L.domElement;
            i(2 * Math.PI * X.x / t.clientWidth * L.rotateSpeed), a(2 * Math.PI * X.y / t.clientHeight * L.rotateSpeed), 
            G.copy(B), L.update();
        }
        function R(e) {
            var t = e.touches[0].pageX - e.touches[1].pageX, n = e.touches[0].pageY - e.touches[1].pageY, i = Math.sqrt(t * t + n * n);
            J.set(0, i), $.subVectors(J, Q), $.y > 0 ? s(o()) : $.y < 0 && r(o()), Q.copy(J), 
            L.update();
        }
        function y(e) {
            K.set(e.touches[0].pageX, e.touches[0].pageY), q.subVectors(K, _), ne(q.x, q.y), 
            _.copy(K), L.update();
        }
        function g(e) {}
        function H(e) {
            if (!1 !== L.enabled) {
                switch (e.preventDefault(), e.button) {
                  case L.mouseButtons.ORBIT:
                    if (!1 === L.enableRotate) return;
                    c(e), D = N.ROTATE;
                    break;

                  case L.mouseButtons.ZOOM:
                    if (!1 === L.enableZoom) return;
                    d(e), D = N.DOLLY;
                    break;

                  case L.mouseButtons.PAN:
                    if (!1 === L.enablePan) return;
                    h(e), D = N.PAN;
                }
                D !== N.NONE && (document.addEventListener("mousemove", O, !1), document.addEventListener("mouseup", M, !1), 
                L.dispatchEvent(A));
            }
        }
        function O(e) {
            if (!1 !== L.enabled) switch (e.preventDefault(), D) {
              case N.ROTATE:
                if (!1 === L.enableRotate) return;
                l(e);
                break;

              case N.DOLLY:
                if (!1 === L.enableZoom) return;
                u(e);
                break;

              case N.PAN:
                if (!1 === L.enablePan) return;
                p(e);
            }
        }
        function M(e) {
            !1 !== L.enabled && (m(e), document.removeEventListener("mousemove", O, !1), document.removeEventListener("mouseup", M, !1), 
            L.dispatchEvent(k), D = N.NONE);
        }
        function x(e) {
            !1 === L.enabled || !1 === L.enableZoom || D !== N.NONE && D !== N.ROTATE || (e.preventDefault(), 
            e.stopPropagation(), E(e), L.dispatchEvent(A), L.dispatchEvent(k));
        }
        function P(e) {
            !1 !== L.enabled && !1 !== L.enableKeys && !1 !== L.enablePan && v(e);
        }
        function S(e) {
            if (!1 !== L.enabled) {
                switch (e.touches.length) {
                  case 1:
                    if (!1 === L.enableRotate) return;
                    b(e), D = N.TOUCH_ROTATE;
                    break;

                  case 2:
                    if (!1 === L.enableZoom) return;
                    f(e), D = N.TOUCH_DOLLY;
                    break;

                  case 3:
                    if (!1 === L.enablePan) return;
                    w(e), D = N.TOUCH_PAN;
                    break;

                  default:
                    D = N.NONE;
                }
                D !== N.NONE && L.dispatchEvent(A);
            }
        }
        function z(e) {
            if (!1 !== L.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
              case 1:
                if (!1 === L.enableRotate) return;
                if (D !== N.TOUCH_ROTATE) return;
                T(e);
                break;

              case 2:
                if (!1 === L.enableZoom) return;
                if (D !== N.TOUCH_DOLLY) return;
                R(e);
                break;

              case 3:
                if (!1 === L.enablePan) return;
                if (D !== N.TOUCH_PAN) return;
                y(e);
                break;

              default:
                D = N.NONE;
            }
        }
        function j(e) {
            !1 !== L.enabled && (g(e), L.dispatchEvent(k), D = N.NONE);
        }
        function C(e) {
            !1 !== L.enabled && e.preventDefault();
        }
        this.object = e, this.domElement = void 0 !== t ? t : document, this.enabled = !0, 
        this.target = new THREE.Vector3(), this.minDistance = 0, this.maxDistance = 1 / 0, 
        this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, 
        this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, 
        this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, 
        this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, 
        this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            BOTTOM: 40
        }, this.mouseButtons = {
            ORBIT: THREE.MOUSE.LEFT,
            ZOOM: THREE.MOUSE.MIDDLE,
            PAN: THREE.MOUSE.RIGHT
        }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), 
        this.zoom0 = this.object.zoom, this.getPolarAngle = function() {
            return Z.phi;
        }, this.getAzimuthalAngle = function() {
            return Z.theta;
        }, this.saveState = function() {
            L.target0.copy(L.target), L.position0.copy(L.object.position), L.zoom0 = L.object.zoom;
        }, this.reset = function() {
            L.target.copy(L.target0), L.object.position.copy(L.position0), L.object.zoom = L.zoom0, 
            L.object.updateProjectionMatrix(), L.dispatchEvent(V), L.update(), D = N.NONE;
        }, this.update = function() {
            var t = new THREE.Vector3(), o = new THREE.Quaternion().setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0)), a = o.clone().inverse(), r = new THREE.Vector3(), s = new THREE.Quaternion();
            return function() {
                var e = L.object.position;
                return t.copy(e).sub(L.target), t.applyQuaternion(o), Z.setFromVector3(t), L.autoRotate && D === N.NONE && i(n()), 
                Z.theta += F.theta, Z.phi += F.phi, Z.theta = Math.max(L.minAzimuthAngle, Math.min(L.maxAzimuthAngle, Z.theta)), 
                Z.phi = Math.max(L.minPolarAngle, Math.min(L.maxPolarAngle, Z.phi)), Z.makeSafe(), 
                Z.radius *= Y, Z.radius = Math.max(L.minDistance, Math.min(L.maxDistance, Z.radius)), 
                L.target.add(I), t.setFromSpherical(Z), t.applyQuaternion(a), e.copy(L.target).add(t), 
                L.object.lookAt(L.target), !0 === L.enableDamping ? (F.theta *= 1 - L.dampingFactor, 
                F.phi *= 1 - L.dampingFactor) : F.set(0, 0, 0), Y = 1, I.set(0, 0, 0), !!(W || r.distanceToSquared(L.object.position) > U || 8 * (1 - s.dot(L.object.quaternion)) > U) && (L.dispatchEvent(V), 
                r.copy(L.object.position), s.copy(L.object.quaternion), W = !1, !0);
            };
        }(), this.dispose = function() {
            L.domElement.removeEventListener("contextmenu", C, !1), L.domElement.removeEventListener("mousedown", H, !1), 
            L.domElement.removeEventListener("wheel", x, !1), L.domElement.removeEventListener("touchstart", S, !1), 
            L.domElement.removeEventListener("touchend", j, !1), L.domElement.removeEventListener("touchmove", z, !1), 
            document.removeEventListener("mousemove", O, !1), document.removeEventListener("mouseup", M, !1), 
            window.removeEventListener("keydown", P, !1);
        };
        var L = this, V = {
            type: "change"
        }, A = {
            type: "start"
        }, k = {
            type: "end"
        }, N = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY: 4,
            TOUCH_PAN: 5
        }, D = N.NONE, U = 1e-6, Z = new THREE.Spherical(), F = new THREE.Spherical(), Y = 1, I = new THREE.Vector3(), W = !1, G = new THREE.Vector2(), B = new THREE.Vector2(), X = new THREE.Vector2(), _ = new THREE.Vector2(), K = new THREE.Vector2(), q = new THREE.Vector2(), Q = new THREE.Vector2(), J = new THREE.Vector2(), $ = new THREE.Vector2(), ee = function() {
            var e = new THREE.Vector3();
            return function(t, n) {
                e.setFromMatrixColumn(n, 0), e.multiplyScalar(-t), I.add(e);
            };
        }(), te = function() {
            var e = new THREE.Vector3();
            return function(t, n) {
                e.setFromMatrixColumn(n, 1), e.multiplyScalar(t), I.add(e);
            };
        }(), ne = function() {
            var e = new THREE.Vector3();
            return function(t, n) {
                var o = L.domElement === document ? L.domElement.body : L.domElement;
                if (L.object instanceof THREE.PerspectiveCamera) {
                    var i = L.object.position;
                    e.copy(i).sub(L.target);
                    var a = e.length();
                    a *= Math.tan(L.object.fov / 2 * Math.PI / 180), ee(2 * t * a / o.clientHeight, L.object.matrix), 
                    te(2 * n * a / o.clientHeight, L.object.matrix);
                } else L.object instanceof THREE.OrthographicCamera ? (ee(t * (L.object.right - L.object.left) / L.object.zoom / o.clientWidth, L.object.matrix), 
                te(n * (L.object.top - L.object.bottom) / L.object.zoom / o.clientHeight, L.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), 
                L.enablePan = !1);
            };
        }();
        L.domElement.addEventListener("contextmenu", C, !1), L.domElement.addEventListener("mousedown", H, !1), 
        L.domElement.addEventListener("wheel", x, !1), L.domElement.addEventListener("touchstart", S, !1), 
        L.domElement.addEventListener("touchend", j, !1), L.domElement.addEventListener("touchmove", z, !1), 
        window.addEventListener("keydown", P, !1), this.update();
    }, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), 
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, {
        center: {
            get: function() {
                return console.warn("THREE.OrbitControls: .center has been renamed to .target"), 
                this.target;
            }
        },
        noZoom: {
            get: function() {
                return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), 
                !this.enableZoom;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), 
                this.enableZoom = !e;
            }
        },
        noRotate: {
            get: function() {
                return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), 
                !this.enableRotate;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), 
                this.enableRotate = !e;
            }
        },
        noPan: {
            get: function() {
                return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), 
                !this.enablePan;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), 
                this.enablePan = !e;
            }
        },
        noKeys: {
            get: function() {
                return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), 
                !this.enableKeys;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), 
                this.enableKeys = !e;
            }
        },
        staticMoving: {
            get: function() {
                return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), 
                !this.enableDamping;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), 
                this.enableDamping = !e;
            }
        },
        dynamicDampingFactor: {
            get: function() {
                return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), 
                this.dampingFactor;
            },
            set: function(e) {
                console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), 
                this.dampingFactor = e;
            }
        }
    });
}, function(e, t) {
    var n = function() {
        var e, t, n = new THREE.Vector3(), o = 500, i = 500, a = 200, r = !1;
        this.position = new THREE.Vector3(), this.velocity = new THREE.Vector3(), e = new THREE.Vector3(), 
        this.setGoal = function(e) {
            t = e;
        }, this.setAvoidWalls = function(e) {
            r = e;
        }, this.setWorldSize = function(e, t, n) {
            o = e, i = t, a = n;
        }, this.run = function(t) {
            r && (n.set(-o, this.position.y, this.position.z), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n), n.set(o, this.position.y, this.position.z), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n), n.set(this.position.x, 0, this.position.z), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n), n.set(this.position.x, i, this.position.z), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n), n.set(this.position.x, this.position.y, -a), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n), n.set(this.position.x, this.position.y, a), n = this.avoid(n), n.multiplyScalar(5), 
            e.add(n)), Math.random() > .5 && this.flock(t), this.move();
        }, this.flock = function(n) {
            t && e.add(this.reach(t, .005)), e.add(this.alignment(n)), e.add(this.cohesion(n)), 
            e.add(this.separation(n));
        }, this.move = function() {
            this.velocity.add(e);
            var t = this.velocity.length();
            t > 4 && this.velocity.divideScalar(t / 4), this.position.add(this.velocity), e.set(0, 0, 0);
        }, this.checkBounds = function() {
            this.position.x > o && (this.position.x = -o), this.position.x < -o && (this.position.x = o), 
            this.position.y > i && (this.position.y = -i), this.position.y < -i && (this.position.y = i), 
            this.position.z > a && (this.position.z = -a), this.position.z < -a && (this.position.z = a);
        }, this.avoid = function(e) {
            var t = new THREE.Vector3();
            return t.copy(this.position), t.sub(e), t.multiplyScalar(1 / this.position.distanceToSquared(e)), 
            t;
        }, this.repulse = function(t) {
            var n = this.position.distanceTo(t);
            if (n < 150) {
                var o = new THREE.Vector3();
                o.subVectors(this.position, t), o.multiplyScalar(.5 / n), e.add(o);
            }
        }, this.reach = function(e, t) {
            var n = new THREE.Vector3();
            return n.subVectors(e, this.position), n.multiplyScalar(t), n;
        }, this.alignment = function(e) {
            for (var t = 0, n = new THREE.Vector3(), o = 0, i = e.length; o < i; o++) if (!(Math.random() > .6)) {
                var a = e[o], r = a.position.distanceTo(this.position);
                r > 0 && r <= 100 && (n.add(a.velocity), t++);
            }
            if (t > 0) {
                n.divideScalar(t);
                var s = n.length();
                s > .1 && n.divideScalar(s / .1);
            }
            return n;
        }, this.cohesion = function(e) {
            for (var t = 0, n = new THREE.Vector3(), o = new THREE.Vector3(), i = 0, a = e.length; i < a; i++) if (!(Math.random() > .6)) {
                var r = e[i], s = r.position.distanceTo(this.position);
                s > 0 && s <= 100 && (n.add(r.position), t++);
            }
            t > 0 && n.divideScalar(t), o.subVectors(n, this.position);
            var c = o.length();
            return c > .1 && o.divideScalar(c / .1), o;
        }, this.separation = function(e) {
            for (var t = new THREE.Vector3(), n = new THREE.Vector3(), o = 0, i = e.length; o < i; o++) if (!(Math.random() > .6)) {
                var a = e[o], r = a.position.distanceTo(this.position);
                r > 0 && r <= 100 && (n.subVectors(this.position, a.position), n.normalize(), n.divideScalar(r), 
                t.add(n));
            }
            return t;
        };
    };
    e.exports = n;
}, function(e, t) {
    var n = function() {
        this.mesh = new THREE.Object3D();
        var e = new THREE.MeshPhongMaterial({
            color: 16777215,
            shading: THREE.FlatShading
        }), t = new THREE.BoxGeometry(14, 2, 2);
        t.vertices[0].z -= 2, t.vertices[2].z -= 2, t.vertices[2].y += 2, t.vertices[3].y += 2, 
        t.vertices[4].z += 1, t.vertices[5].z -= 1, t.vertices[7].z -= 2;
        var n = new THREE.Mesh(t, e);
        n.position.set(1.8, -1, 1), n.castShadow = !0, this.mesh.add(n);
        var o = new THREE.BoxGeometry(14, 2, 2);
        o.vertices[1].z += 2, o.vertices[3].z += 2, o.vertices[3].y += 2, o.vertices[2].y += 2, 
        o.vertices[5].z -= 1, o.vertices[4].z += 1, o.vertices[6].z += 2;
        var i = new THREE.Mesh(o, e);
        i.position.set(1.8, -1, -1), i.castShadow = !0, this.mesh.add(i);
        var a = new THREE.BoxGeometry(14, .05, 5);
        a.vertices[0].x -= 10, a.vertices[2].x -= 10, a.vertices[4].x += 2, a.vertices[4].z += 1, 
        a.vertices[6].x += 2, a.vertices[6].z += 1;
        var r = new THREE.Mesh(a, e);
        r.position.set(0, 0, 2.5), r.castShadow = !0, this.mesh.add(r);
        var s = new THREE.BoxGeometry(14, .05, 5);
        s.vertices[1].x -= 10, s.vertices[3].x -= 10, s.vertices[5].x += 2, s.vertices[5].z -= 1, 
        s.vertices[7].x += 2, s.vertices[7].z -= 1;
        var c = new THREE.Mesh(s, e);
        return c.position.set(0, 0, -2.5), c.castShadow = !0, this.mesh.add(c), this.mesh;
    };
    n.prototype.constructor = n, e.exports = n;
} ]);