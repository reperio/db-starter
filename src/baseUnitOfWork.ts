import * as Knex from 'knex';
import {LoggerInstance} from 'winston';

export class BaseUnitOfWork {
    knex: Knex;
    transaction: Knex.Transaction;
    logger: LoggerInstance;

    constructor(logger: LoggerInstance, connection: Knex) {
        this.knex = connection;
        this.transaction = null;
        this.logger = logger;

        this.knex.on('query', (query: any) => logger.debug(query.sql));
    }

    async beginTransaction() {
        if (this.transaction !== null) {
            throw new Error('Cannot begin transaction, a transaction already exists for this unit of work');
        }

        //TODO does this even work?!? It never resolves.....
        await new Promise(resolve => {
            this.knex.transaction(trx => {
                this.transaction = trx;
                resolve();
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