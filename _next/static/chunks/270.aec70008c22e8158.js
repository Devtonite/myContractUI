"use strict";
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[270],{

/***/ 9270:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "simpleVal": function() { return /* binding */ simpleVal; }
/* harmony export */ });
/* harmony import */ var snarkyjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6400);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class simpleVal extends snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    constructor() {
        super(...arguments);
        this.simpleVal = (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
    }
    deploy(args) {
        super.deploy(args);
        this.setPermissions({
            ...snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions["default"] */ .Pl["default"](),
            editState: snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Permissions.proofOrSignature */ .Pl.proofOrSignature(),
        });
        this.simpleVal.set((0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(50));
    }
    increment() {
        const currentState = this.simpleVal.get();
        this.simpleVal.assertEquals(currentState);
        const newState = currentState.add(5);
        newState.assertEquals(currentState.add(5));
        this.simpleVal.set(newState);
    }
    decrement() {
        const currentState = this.simpleVal.get();
        this.simpleVal.assertEquals(currentState);
        const newState = currentState.sub(5);
        newState.assertEquals(currentState.sub(5));
        this.simpleVal.set(newState);
    }
}
__decorate([
    (0,snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], simpleVal.prototype, "simpleVal", void 0);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], simpleVal.prototype, "increment", null);
__decorate([
    snarkyjs__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], simpleVal.prototype, "decrement", null);
//# sourceMappingURL=simpleVal.js.map

/***/ })

}]);