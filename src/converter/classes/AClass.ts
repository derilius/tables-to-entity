import {Column} from '@/converter/classes/Column';

export default class AClass {

    private className: string;
    private columns: Column[];
    private tableName: string;

    constructor(columns: Column[], tableName: string) {
        this.className = '';
        this.columns = columns;
        this.tableName = tableName;
    }

    public getColumns(): Column[] {
        return this.columns;
    }

    public getClassName(): string {
        return this.className;
    }

    public getTableName(): string {
        return this.tableName;
    }

    public setClassName(className: string) {
        this.className = className;
    }

}
