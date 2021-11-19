"use strict";
(() => {
var exports = {};
exports.id = 835;
exports.ids = [835];
exports.modules = {

/***/ 581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ imgcoverterV2)
});

;// CONCATENATED MODULE: external "formidable"
const external_formidable_namespaceObject = require("formidable");
var external_formidable_default = /*#__PURE__*/__webpack_require__.n(external_formidable_namespaceObject);
;// CONCATENATED MODULE: external "sharp"
const external_sharp_namespaceObject = require("sharp");
var external_sharp_default = /*#__PURE__*/__webpack_require__.n(external_sharp_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/imgcoverterV2.js


// disable nextjs bodyparser
const config = {
    api: {
        bodyParser: false
    }
};
const imageConverter = async (req, res)=>{
    const convert = async (file, format, resize = false)=>{
        const data = await external_sharp_default()(file)[format]().toBuffer();
        const raw = await data.toString("base64");
        return raw;
    };
    //POST request only
    if (req.method === "POST") {
        //initialize formidable
        const form = external_formidable_default()();
        //wait for process to complete
        await new Promise((resolve, reject)=>{
            // parse formdata
            form.parse(req, async (err, fields, files)=>{
                const path = files.file.filepath;
                const data = await convert(path, fields.format);
                resolve({
                    data: data,
                    order: fields.order
                });
            });
        }).then((any)=>{
            res.json({
                message: "completed",
                data: any.data,
                idx: any.order
            });
            res.status(200);
        });
    } else {
        res.status(400);
        res.json({
            message: "an error has occur"
        });
        console.log("an error has occur");
    }
};
function sleep(ms) {
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
}
/* harmony default export */ const imgcoverterV2 = (imageConverter);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(581));
module.exports = __webpack_exports__;

})();