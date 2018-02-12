import * as Knex from 'knex';
import {Model} from 'objection';

export class UnitOfWork {
    knex: Knex;
    model: Model;
    transaction: any;

    constructor(logger) {
        this.knex = knex;
        this.model = Model;
        this._models = models;
        this.transaction = null;

        knex.on('query', (query) => logger.debug(query.toNative()));

        this._logger = logger;

        this._cachedRepositories = {};

        for (const [repositoryName, Repository] of Object.entries(repositories)) {
            Object.defineProperty(this, repositoryName, {
                get: () => {
                    this._cachedRepositories[repositoryName] = this._cachedRepositories[repositoryName] || new Repository(this);
                    return this._cachedRepositories[repositoryName];
                }
            });
        }
    }

    async beginTransaction() {
        if (this.transaction !== null) {
            throw new Error('Cannot begin transaction, a transaction already exists for this unit of work');
        }

        //TODO does this even work?!? It never resolves.....
        await new Promise(resolve => {
            knex.transaction(trx => {
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