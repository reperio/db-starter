import {Model, QueryContext} from 'objection';
import * as uuid from 'uuid';

export class BaseModel extends Model {

    autoGenerateId(id: string) : void {}

    async $beforeInsert(context: QueryContext) {
        await super.$beforeInsert(context);
        return new Promise(() => {
            this.autoGenerateId(uuid.v4());
        });
    }
}