export class Column {

    private name: string;
    private type: string;
    private nullable: boolean;
    private defaultValue: string | boolean;

    constructor(name: string, type: string, nullable: boolean, defaultValue: string | boolean) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.defaultValue = defaultValue;
    }

    public getColumnName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getDefault(): string {
        return this.defaultValue === false ? '' : ' = ' + this.resolveDefaultType();
    }

    public checkNullable(): string {
        return this.nullable ? '' : ', nullable = false';
    }

    public getName(): string {
        let index: number = 0;
        let name: string = this.name;
        while (index !== -1) {
            index = name.indexOf('_');
            const newChar = name.charAt(index + 1);
            name = name.replace('_' + newChar, newChar.toUpperCase());
        }
        return name;
    }

    private resolveDefaultType(): string {
        switch (this.type) {
            case 'boolean':
                return this.defaultValue === '1' ? 'true' : 'false';
            case 'Long':
                return this.defaultValue + 'L';
            case 'BigDecimal':
                return Number(this.defaultValue) === 1 ? 'BigDecimal.ONE' : 'BigDecimal.ZERO';
            case 'String':
                return this.defaultValue.toString();
            case 'OffsetDateTime':
                return 'OffsetDataTime.now()';
            default:
                return '';
        }
    }

}
