"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const uuid = require("uuid");
class BaseModel extends objection_1.Model {
    autoGenerateId(id) { }
    async $beforeInsert(context) {
        await super.$beforeInsert(context);
        return new Promise(() => {
            this.autoGenerateId(uuid.v4());
        });
    }
}
exports.BaseModel = BaseModel;
//# sourceMappingURL=baseModel.js.map