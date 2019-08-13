import {Column} from '@/converter/Column';

export default class ConverterService {

    public generate(input: string, className: string): string {
        input = input.replace(/  +/g, ' ');
        const text: string[] = input.toLowerCase().split('\n');
        const tableName = this.extractTableName(text[0]);
        const columns: Column[] = this.getColumns(text);
        console.log(columns);
        return this.buildOutput(tableName, className, columns);
    }

    private buildOutput(tableName: string, className: string, columns: Column[]): string {
        let text: string = '' +
            '@Getter\n' +
            '@NoArgsConstructor\n' +
            '@Entity\n' +
            `@Table(name = \"${tableName}\")\n` +
            `public class ${className} {\n` +
            '\n';

        columns.forEach((column, index) => {
            if (index === 0) {
                text += '' +
                    '@Id\n' +
                    `@Column(name = \"${column.getColumnName()}\")\n` +
                    '@GeneratedValue(strategy = GenerationType.IDENTITY)\n' +
                    'private Long id;\n\n';
            } else {
                text += '' +
                    `@Column(name = \"${column.getColumnName()}\"${column.checkNullable()})\n` +
                    `private ${column.getType()} ${column.getName()}${column.getDefault()};\n\n`;
            }
        });
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
        } else if (type.startsWith('varchar')) {
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
