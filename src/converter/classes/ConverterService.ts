import SourceDataType from '@/converter/classes/SourceDataType';
import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';
import ResultDataType from '@/converter/classes/ResultDataType';
import AbstractClass from '@/converter/classes/AbstractClass';
import {JavaColumn} from '@/converter/classes/JavaColumn';
import JavaClass from '@/converter/classes/JavaClass';

export default class ConverterService {

    public readInput(input: string, inputType: DataTypeEnum): AbstractClass {
        input = input.toLowerCase();
        const regex = /.*(,|\s*\))/g;
        const lines: RegExpMatchArray | null = input.match(regex);
        const tableName = this.extractTableName(input);
        const columns: JavaColumn[] = this.getColumns(lines);
        columns.forEach((c) => console.log(c.toString()));
        return new JavaClass(columns, tableName);
    }

    public generate(aClass: AbstractClass | null): string {
        if (aClass != null) {
            return this.buildOutput(aClass);
        }
        return '';
    }

    public getSources(): SourceDataType[] {
        return Array(
            new SourceDataType('MySQL', DataTypeEnum.MY),
            new SourceDataType('PostgreSQL', DataTypeEnum.PG),
        );
    }

    public getResults() {
        return Array(
            new ResultDataType('Java(Spring)', DataTypeEnum.SPRING),
        );
    }

    private buildOutput(aClass: AbstractClass): string {
        let text: string = '' +
            '@Getter\n' +   //todo: refactor adnotacji
            '@NoArgsConstructor\n' +
            '@Entity\n' +
            `@Table(name = \"${aClass.getTableName()}\")\n` +
            `public class ${aClass.getClassName()} {\n` +
            '\n';

        aClass.getColumns().forEach((column, index) => {
            if (index === 0) { //todo: export do metody
                text += '' +
                    '\t@Id\n' +
                    `\t@Column(name = \"${column.getColumnName()}\")\n` +
                    '\t@GeneratedValue(strategy = GenerationType.IDENTITY)\n' +
                    '\tprivate Long id;\n\n';
            } else {
                text += column.getClassField();
            }
        });

        text += aClass.printConstructor();
        text += '}';
        return text;
    }

    private extractTableName(text: string): string {
        const regex = /create +table +[a-z0-9_\-]+ +/;
        const result: RegExpMatchArray | null = text.match(regex);
        if (result == null) {
            return '/*TODO*/';
        }
        return result[0].split(' ')[2];
    }

    private getColumns(lines: RegExpMatchArray | null): JavaColumn[] {
        if (lines === null) {
            return [];
        }
        return lines.map((line) => {
            const lineArray: string[] = line.trimStart().split(/ +/g);
            const name: string = lineArray[0];
            const type: string = this.extractType(lineArray[1]);
            const nullable: boolean = this.checkNullable(line);
            const hasDefault: string | null = this.checkDefault(line);
            const defaultValue: string = hasDefault !== null ? hasDefault : '';
            return new JavaColumn(name, type, nullable, hasDefault !== null, defaultValue);
        });
    }

    private extractType(type: string): string {//todo, przeniesienie do klasy
        if (type === undefined) {
            return '/*TODO*/';
        } else if (type.startsWith('int') || type.startsWith('bigint')) {
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

    private checkDefault(line: string): string | null {
        const regex = /default +[A-z0-9.,\-]+/;
        const result: RegExpMatchArray | null = line.match(regex);
        if (result != null) {
            // @ts-ignore
            const splited = result.input.split(/ +/g);
            const index = splited.indexOf('default');
            return splited[index + 1];
        }
        return result;
    }

    private checkNullable(line: string): boolean {
        return line.match(/not +null/) == null;
    }

}
