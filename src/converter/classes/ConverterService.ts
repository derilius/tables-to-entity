import {Column} from '@/converter/classes/Column';
import SourceDataType from '@/converter/classes/SourceDataType';
import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';
import ResultDataType from '@/converter/classes/ResultDataType';
import AClass from '@/converter/classes/AClass';

export default class ConverterService {

    public readInput(input: string): AClass {
        input = input.replace(/  +/g, ' ');
        const text: string[] = input.toLowerCase().split('\n');
        const tableName = this.extractTableName(text[0]);
        const columns: Column[] = this.getColumns(text);
        console.log(columns);
        return new AClass(columns, tableName);
    }

    public generate(aClass: AClass | null): string {
        if (aClass != null) {
            return this.buildOutput(aClass);
        }
        return '';
    }

    public getSources(): SourceDataType[] {
        return Array(
            new SourceDataType('MySql', DataTypeEnum.MY),
        );
    }

    public getResults() {
        return Array(
            new ResultDataType('Java(Spring)', DataTypeEnum.SPRING),
        );
    }

    private buildOutput(aClass: AClass): string {
        let text: string = '' +
            '@Getter\n' +
            '@NoArgsConstructor\n' +
            '@Entity\n' +
            `@Table(name = \"${aClass.getTableName()}\")\n` +
            `public class ${aClass.getClassName()} {\n` +
            '\n';

        aClass.getColumns().forEach((column, index) => {
            if (index === 0) {
                text += '' +
                    '\t@Id\n' +
                    `\t@Column(name = \"${column.getColumnName()}\")\n` +
                    '\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n' +
                    '\tprivate Long id;\n\n';
            } else {
                text += '' +
                    `\t@Column(name = \"${column.getColumnName()}\"${column.checkNullable()})\n` +
                    `\tprivate ${column.getType()} ${column.getName()}${column.getDefault()};\n\n`;
            }
        });


        text += `\tpublic ${aClass.getClassName()} (Object object) {\n`;
        aClass.getColumns()
            .filter((column) => column.isConstructorField())
            .forEach((column) => {
                text += `\t\tthis.${column.getName()} = ${column.isHaveDefault() ? column.resolveDefaultType() : 'object.get' + column.generateGetter()};\n`;
            });
        text += '\t}\n\n';
        text += '}';
        return text;
    }

    private extractTableName(line: string): string {
        const regex = /create +table +[a-z0-9_\-]+ +/;
        const result: RegExpMatchArray | null = line.match(regex);
        if (result == null) {
            return '/*TODO*/';
        }
        return result[0].split(' ')[2];
    }

    private getColumns(text: string[]): Column[] {
        return text.filter((l, i) => i !== 0)
            // .filter((line) => !line.includes('primary key'))
            .map((line) => {
                const lineArray: string[] = line.trimStart().split(' ');
                console.log(lineArray);
                const name: string = lineArray[0];
                const type: string = this.extractType(lineArray[1]);
                const nullable: boolean = this.checkNullable(line);
                const defaultValue: string | boolean = this.extractDefault(line);
                return new Column(name, type, nullable, defaultValue);
            });
    }

    private extractType(type: string): string {
        console.log('checking type: ' + type);
        if (type === undefined) {
            return '/*TODO*/';
        } else if (type.startsWith('int')) {
            return 'Long';
        } else if (type.startsWith('tinyint')) {
            return 'boolean';
        } else if (type.startsWith('decimal')) {
            return 'BigDecimal';
        } else if (type.startsWith('varchar') || type.startsWith('text') || type.includes('text')) {
            return 'String';
        } else if (type.startsWith('datetime')) {
            return 'OffsetDateTime';
        }

        return '/*TODO*/';
    }

    private extractDefault(line: string): string | boolean {
        const regex = /default +[A-z0-9.,\-]+/;
        const result: RegExpMatchArray | null = line.match(regex);
        if (result == null) {
            return false;
        } else {
            console.log('checking default: ' + result.input);
            return result[0].split(' ')[1];
        }
    }

    private checkNullable(line: string): boolean {
        console.log('checking nullable: ' + line);
        return line.match(/not +null/) == null;
    }

}
