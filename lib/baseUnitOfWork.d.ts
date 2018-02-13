/// <reference types="knex" />
/// <reference types="winston" />
import * as Knex from 'knex';
import { Winston } from 'winston';
export declare class BaseUnitOfWork {
    knex: Knex;
    transaction: any;
    constructor(logger: Winston, connection: any);
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    readonly inTransaction: boolean;
}
