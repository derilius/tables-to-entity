import AbstractColumn from '@/converter/classes/AbstractColumn';

export class JavaColumn extends AbstractColumn {

    constructor(name: string, type: string, nullable: boolean, hasDefault: boolean, defaultValue: string) {
        super(name, type, nullable, hasDefault, defaultValue);
    }

    public checkNullable(): string {
        return this.nullable ? '' : ', nullable = false';
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

    public getClassField(): string {
        return `\t@Column(name = \"${this.getColumnName()}\"${this.checkNullable()})\n` +
            `\tprivate ${this.getType()} ${this.getName()}${this.isDefault() ? ' = ' + this.resolveDefaultType() : ''};\n\n`;
    }

}
