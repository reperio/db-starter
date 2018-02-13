import { Model, QueryContext } from 'objection';
export declare class BaseModel extends Model {
    autoGenerateId(id: string): void;
    $beforeInsert(context: QueryContext): Promise<{}>;
}
