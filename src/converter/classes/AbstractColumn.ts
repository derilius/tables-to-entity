export default abstract class AbstractColumn {

    protected readonly name: string;
    protected readonly type: string;
    protected readonly nullable: boolean;
    protected readonly default: boolean;
    protected readonly defaultValue: string;
    protected constructorField: boolean;

    protected constructor(name: string, type: string, nullable: boolean, hasDefault: boolean, defaultValue: string) {
        this.name = name;
        this.type = type;
        this.nullable = nullable;
        this.default = hasDefault;
        this.defaultValue = defaultValue;
        this.constructorField = !nullable;
    }

    public getColumnName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public isNullable(): boolean {
        return this.nullable;
    }

    public isDefault(): boolean {
        return this.default;
    }

    public isConstructorField(): boolean {
        return this.constructorField;
    }

    public addToConstructor() {
        this.constructorField = !this.constructorField;
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

    public toString(): string {
        return 'AbstractColumn {\n' +
            `\tname: ${this.name},\n` +
            `\ttype: ${this.type},\n` +
            `\tnullable: ${this.nullable}\n` +
            `\tdefault: ${this.default}\n` +
            `\tdefaultValue: ${this.defaultValue}\n` +
            `\tconstructorField: ${this.constructorField}\n` +
            '}';
    }

    public abstract getClassField(): string;

    public abstract resolveDefaultType(): string;

}
