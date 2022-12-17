(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 3454:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ref, ref1;
module.exports = ((ref = __webpack_require__.g.process) == null ? void 0 : ref.env) && typeof ((ref1 = __webpack_require__.g.process) == null ? void 0 : ref1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(7663);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(7460);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 7460:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/next/head.js
var head = __webpack_require__(9008);
var head_default = /*#__PURE__*/__webpack_require__.n(head);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(1502);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/snarkyjs/dist/web/index.js
var web = __webpack_require__(6400);
;// CONCATENATED MODULE: ./pages/zkappWorkerClient.ts

class ZkappWorkerClient {
    _call(fn, args) {
        return new Promise((resolve, reject)=>{
            this.promises[this.nextId] = {
                resolve,
                reject
            };
            const message = {
                id: this.nextId,
                fn,
                args
            };
            this.worker.postMessage(message);
            this.nextId++;
        });
    }
    loadSnarkyJS() {
        return this._call("loadSnarkyJS", {});
    }
    setActiveInstanceToBerkeley() {
        return this._call("setActiveInstanceToBerkeley", {});
    }
    // startLocalMina(){
    //   return this._call('startLocalMina', {});
    // }
    // stopLocalMina(){
    //   return this._call('stopLocalMina', {});
    // }
    loadContract() {
        return this._call("loadContract", {});
    }
    compileContract() {
        return this._call("compileContract", {});
    }
    fetchAccount(param) {
        let { publicKey  } = param;
        const result = this._call("fetchAccount", {
            publicKey58: publicKey.toBase58()
        });
        return result;
    }
    initZkappInstance(publicKey) {
        return this._call("initZkappInstance", {
            publicKey58: publicKey.toBase58()
        });
    }
    async getSimpleVal() {
        const result = await this._call("getSimpleVal", {});
        return web/* Field.fromJSON */.gN.fromJSON(JSON.parse(result));
    }
    createIncrementTxn() {
        return this._call("createIncrementTxn", {});
    }
    createDecrementTxn() {
        return this._call("createDecrementTxn", {});
    }
    proveTxn() {
        return this._call("proveTxn", {});
    }
    async getTransactionJSON() {
        const result = await this._call("getTransactionJSON", {});
        return result;
    }
    constructor(){
        this.worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(812), __webpack_require__.b)));
        this.promises = {};
        this.nextId = 0;
        this.worker.onmessage = (event)=>{
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }
}


;// CONCATENATED MODULE: ./pages/LocalMinaBlock.tsx






let transactionFee = 0.1;
function LocalMinaBlock(param) {
    let {} = param;
    let [state, setState] = (0,react.useState)({
        zkappWorkerClient: null,
        hasWallet: null,
        hasBeenSetup: false,
        accountExists: false,
        currentNum: null,
        publicKey: null,
        zkappPublicKey: null,
        creatingTransaction: false
    });
    (0,react.useEffect)(()=>{
        (async ()=>{
            if (!state.hasBeenSetup) {
                const zkappWorkerClient = new ZkappWorkerClient();
                await zkappWorkerClient.loadSnarkyJS();
                await zkappWorkerClient.setActiveInstanceToBerkeley();
                const mina = window.mina;
                if (mina == null) {
                    setState({
                        ...state,
                        hasWallet: false
                    });
                    return;
                }
                const publicKeyBase58 = (await mina.requestAccounts())[0];
                const publicKey = web/* PublicKey.fromBase58 */.nh.fromBase58(publicKeyBase58);
                console.log("using key", publicKey.toBase58());
                console.log("checking if account exists...");
                const res = await zkappWorkerClient.fetchAccount({
                    publicKey: publicKey
                });
                const accountExists = res.error == null;
                console.log("Account Exists: ".concat(accountExists));
                await zkappWorkerClient.loadContract();
                console.log("compiling contract...");
                await zkappWorkerClient.compileContract();
                console.log("contract compiled.");
                const zkappPublicKey = web/* PublicKey.fromBase58 */.nh.fromBase58("B62qisA7HaCUbTggU3RducZhP7hFG5itdG2u12noTbqGhWNDTRcW55v");
                await zkappWorkerClient.initZkappInstance(zkappPublicKey);
                console.log("getting zkApp state...");
                await zkappWorkerClient.fetchAccount({
                    publicKey: zkappPublicKey
                });
                const currentNum = await zkappWorkerClient.getSimpleVal();
                console.log("current state: ", currentNum.toString());
                setState({
                    ...state,
                    zkappWorkerClient,
                    hasWallet: true,
                    hasBeenSetup: true,
                    publicKey,
                    zkappPublicKey,
                    accountExists,
                    currentNum
                });
            }
        })();
    }, []);
    (0,react.useEffect)(()=>{
        (async ()=>{
            if (state.hasBeenSetup && !state.accountExists) {
                for(;;){
                    console.log("checking if account exists...");
                    const res = await state.zkappWorkerClient.fetchAccount({
                        publicKey: state.publicKey
                    });
                    const accountExists = res.error == null;
                    if (accountExists) {
                        break;
                    }
                    await new Promise((resolve)=>setTimeout(resolve, 5000));
                }
                setState({
                    ...state,
                    accountExists: true
                });
            }
        })();
    }, [
        state.hasBeenSetup
    ]);
    const onIncrementTxn = async ()=>{
        setState({
            ...state,
            creatingTransaction: true
        });
        console.log("sending a transaction...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.publicKey
        });
        await state.zkappWorkerClient.createIncrementTxn();
        console.log("creating proof...");
        await state.zkappWorkerClient.proveTxn();
        console.log("getting Transaction JSON...");
        const transactionJSON = await state.zkappWorkerClient.getTransactionJSON();
        console.log("requesting send transaction...");
        const { hash  } = await window.mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: ""
            }
        });
        console.log("See transaction at https://berkeley.minaexplorer.com/transaction/" + hash);
        setState({
            ...state,
            creatingTransaction: false
        });
    };
    const onDecrementTxn = async ()=>{
        setState({
            ...state,
            creatingTransaction: true
        });
        console.log("sending a transaction...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.publicKey
        });
        await state.zkappWorkerClient.createDecrementTxn();
        console.log("creating proof...");
        await state.zkappWorkerClient.proveTxn();
        console.log("getting Transaction JSON...");
        const transactionJSON = await state.zkappWorkerClient.getTransactionJSON();
        console.log("requesting send transaction...");
        const { hash  } = await window.mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: ""
            }
        });
        console.log("See transaction at https://berkeley.minaexplorer.com/transaction/" + hash);
        setState({
            ...state,
            creatingTransaction: false
        });
    };
    const onRefreshCurrentNum = async ()=>{
        console.log("getting zkApp state...");
        await state.zkappWorkerClient.fetchAccount({
            publicKey: state.zkappPublicKey
        });
        const currentNum = await state.zkappWorkerClient.getSimpleVal();
        console.log("current state:", currentNum.toString());
        setState({
            ...state,
            currentNum
        });
    };
    let mainContent;
    if (state.hasBeenSetup && state.accountExists) {
        mainContent = /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: (Home_module_default()).mina,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    onClick: onIncrementTxn,
                    disabled: state.creatingTransaction,
                    children: " Increment Value "
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    children: state.currentNum.toString()
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    onClick: onDecrementTxn,
                    disabled: state.creatingTransaction,
                    children: " Decrement Value "
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    onClick: onRefreshCurrentNum,
                    children: " Get Latest State "
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        children: mainContent
    });
}

;// CONCATENATED MODULE: ./pages/index.page.tsx




function Home() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: (Home_module_default()).container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("title", {
                        children: "SimpleVal ZkApp"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("meta", {
                        name: "description",
                        content: "Built by Devtonite"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("link", {
                        rel: "icon",
                        href: "/updownIcon.png"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
                className: (Home_module_default()).main,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                        className: (Home_module_default()).title,
                        children: "Increment or Decrement?"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h3", {
                        children: "You Decide."
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(LocalMinaBlock, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
                className: (Home_module_default()).footer,
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                    href: "https://github.com/Devtonite/simpleUI",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: "Built by Devtonite."
                })
            })
        ]
    });
}


/***/ }),

/***/ 1502:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"main":"Home_main__nLjiQ","mina":"Home_mina__gYkOA","description":"Home_description__41Owk","code":"Home_code__suPER","grid":"Home_grid__GxQ85","card":"Home_card___LpL1","center":"Home_center__4BFgC","logo":"Home_logo__27_tb","thirteen":"Home_thirteen__cMI_k","rotate":"Home_rotate____XsI","content":"Home_content__Zy02X","vercelLogo":"Home_vercelLogo__dtSk9"};

/***/ }),

/***/ 7663:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ }),

/***/ 9008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(3121)


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [829,774,888,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);