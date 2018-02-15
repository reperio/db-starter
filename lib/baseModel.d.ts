import { Model, QueryContext } from 'objection';
export declare class BaseModel extends Model {
    $beforeInsert(context: QueryContext): Promise<void>;
}
