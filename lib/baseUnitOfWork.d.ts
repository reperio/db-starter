/// <reference types="knex" />
/// <reference types="winston" />
import * as Knex from 'knex';
import { Winston } from 'winston';
export declare class BaseUnitOfWork {
    knex: Knex;
    transaction: Knex.Transaction;
    constructor(logger: Winston, connection: Knex);
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    readonly inTransaction: boolean;
}
