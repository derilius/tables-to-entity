import {Column} from '@/converter/classes/Column';

export default class AClass {

    private className: string;
    private columns: Column[];
    private tableName: string;

    constructor(className: string, columns: Column[], tableName: string) {
        this.className = className;
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

}
