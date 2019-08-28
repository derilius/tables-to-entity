import AbstractColumn from '@/converter/classes/AbstractColumn';

export default abstract class AbstractClass {

    protected className: string;
    protected columns: AbstractColumn[];
    protected tableName: string;

    protected constructor(columns: AbstractColumn[], tableName: string) {
        this.className = '';
        this.columns = columns;
        this.tableName = tableName;
    }

    public getColumns(): AbstractColumn[] {
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

    public abstract printConstructor(): string;

}
