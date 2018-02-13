"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
class BaseUnitOfWork {
    constructor(logger, connection) {
        this.knex = Knex(connection);
        this.transaction = null;
        this.knex.on('query', (query) => logger.debug(query.toNative()));
    }
    async beginTransaction() {
        if (this.transaction !== null) {
            throw new Error('Cannot begin transaction, a transaction already exists for this unit of work');
        }
        //TODO does this even work?!? It never resolves.....
        await new Promise(resolve => {
            this.knex.transaction(trx => {
                this.transaction = trx;
            });
        });
    }
    async commitTransaction() {
        if (this.transaction === null) {
            throw new Error('Cannot commit transaction, a transaction does not exist for this unit of work');
        }
        await this.transaction.commit();
        this.transaction = null;
    }
    async rollbackTransaction() {
        if (this.transaction === null) {
            throw new Error('Cannot rollback transaction, a transaction does not exist for this unit of work');
        }
        await this.transaction.rollback();
        this.transaction = null;
    }
    get inTransaction() {
        return this.transaction !== null;
    }
}
exports.BaseUnitOfWork = BaseUnitOfWork;
//# sourceMappingURL=baseUnitOfWork.js.map