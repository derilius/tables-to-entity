export class Column {

    private readonly name: string;
    private readonly type: string;
    private readonly nullable: boolean;
    private readonly defaultValue: string | boolean;
    private constructorField: boolean;

    constructor(name: string, type: string, nullable: boolean, defaultValue: string | boolean) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.defaultValue = defaultValue;
        this.constructorField = !nullable;
    }

    public addToConstructor() {
        this.constructorField = !this.constructorField;
    }

    public isConstructorField(): boolean {
        return this.constructorField;
    }

    public getColumnName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public isHaveDefault(): boolean {
        return !!this.defaultValue;
    }

    public getDefault(): string {
        return this.defaultValue === false ? '' : ' = ' + this.resolveDefaultType();
    }

    public isNullable(): boolean {
        return this.nullable;
    }

    public checkNullable(): string {
        return this.nullable ? '' : ', nullable = false';
    }

    public generateGetter(): string {
        const name = this.getName();
        return this.getName().charAt(0).toUpperCase() + name.substring(1) + '()';
    }

    public getName(): string {
        let index: number = 0;
        let name: string = '';
        if (this.name.toLowerCase().includes('id')) {
            this.name.split('_')
                .filter((word) => word !== 'id')
                .forEach((word, index) => {
                    if (index !== 0) {
                        word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
                    }
                    name += word;
                });
            name += 'Id';
        } else {
            name = this.name;
            while (index !== -1) {
                index = name.indexOf('_');
                const newChar = name.charAt(index + 1);
                name = name.replace('_' + newChar, newChar.toUpperCase());
            }
        }

        return name;
    }

    public resolveDefaultType(): string {
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
