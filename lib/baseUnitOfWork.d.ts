/// <reference types="knex" />
/// <reference types="winston" />
import * as Knex from 'knex';
import { LoggerInstance } from 'winston';
export declare class BaseUnitOfWork {
    knex: Knex;
    transaction: Knex.Transaction;
    logger: LoggerInstance;
    constructor(logger: LoggerInstance, connection: Knex);
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    readonly inTransaction: boolean;
}
