import AbstractColumn from '@/converter/classes/AbstractColumn';
import AbstractClass from '@/converter/classes/AbstractClass';

export default class JavaClass extends AbstractClass {

    constructor(columns: AbstractColumn[], tableName: string) {
        super(columns, tableName);
    }

    public printConstructor() {
        let text: string = `\tpublic ${this.getClassName()} (Object object) {\n`;
        this.getColumns()
            .filter((column) => column.isConstructorField())
            .forEach((column) => {
                text += `\t\tthis.${column.getName()} = ${column.isDefault() ? column.resolveDefaultType() : 'object.get' + column.generateGetter()};\n`;
            });
        text += '\t}\n\n';
        return text;
    }

}
