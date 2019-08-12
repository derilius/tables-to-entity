<template>

    <div class="h-100">
        <h1>Convert DDL to JavaEntityClass</h1>

        <div class="flex-container style-container">
            <div class="h-100 col-5">
                <v-textarea
                        solo
                        auto-grow
                        name="input-7-4"
                        label="Please enter a database code"
                        v-model="input"
                ></v-textarea>
            </div>

            <div class="col-2">
                <v-btn @click="generate"
                       :disabled="!className.trim().length > 0">
                    Convert
                </v-btn>
                <v-text-field
                        v-model="className"
                        label="Class name"
                ></v-text-field>
            </div>

            <div class="h-100 col-5">
                <v-textarea
                        solo
                        auto-grow
                        readonly
                        name="input-7-4"
                        label="Wait for it..."
                        v-model="output"
                ></v-textarea>
            </div>
        </div>

    </div>

</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Column} from "@/views/Column";

    @Component
    export default class Converter extends Vue {

        public input: String = "";
        public output: String = "";
        public className: String = "";

        public generate(): void {
            const text: Array<string> = this.input.toLowerCase().split("\n");
            const tableName = this.extractTableName(text[0]);
            const columns: Array<Column> = this.getColumns(text);
            console.log(columns);
            this.buildOutput(tableName, columns);
        }

        private buildOutput(tableName: string, columns: Array<Column>): void {
            let text: string = "" +
                "@Getter\n" +
                "@NoArgsConstructor\n" +
                "@Entity\n" +
                `@Table(name = \"${tableName}\")\n` +
                `public class ${this.className} {\n` +
                "\n";

            columns.forEach((column, index) => {
                if (index == 0) {
                    text += "" +
                        "@Id\n" +
                        `@Column(name = \"${column.getColumnName()}\")\n` +
                        "@GeneratedValue(strategy = GenerationType.IDENTITY)\n" +
                        "private Long id;\n\n";
                } else {
                    text += "" +
                        `@Column(name = \"${column.getColumnName()}\"${column.checkNullable()})\n` +
                        `private ${column.getType()} ${column.getName()}${column.getDefault()};\n\n`;
                }
            });
            text += "}";
            this.output = text;
        }

        private extractTableName(line: string): string {
            const regex = /create +table +[a-z0-9_\-]+ +/;
            const result: RegExpMatchArray | null = line.match(regex);
            if (result == null) {
                return "/*TODO*/";
            }
            return result[0].split(" ")[2];
        }

        private getColumns(text: Array<string>): Array<Column> {
            return text.filter((l, i) => i != 0)
                .map((line) => {
                    const lineArray: Array<string> = line.trimStart().split(" ");
                    const name: string = lineArray[0];
                    const type: string = this.extractType(lineArray[1]);
                    const nullable: boolean = this.checkNullable(line);
                    const defaultValue: string | boolean = this.extractDefault(line);
                    return new Column(name, type, nullable, defaultValue);
                });
        }

        private extractType(type: string): string {
            console.log("checking type: " + type);
            if (type === undefined) {
                return "/*TODO*/";
            } else if (type.startsWith("int")) {
                return "Long";
            } else if (type.startsWith("tinyint")) {
                return "boolean";
            } else if (type.startsWith("decimal")) {
                return "BigDecimal";
            } else if (type.startsWith("varchar")) {
                return "String";
            } else if (type.startsWith("datetime")) {
                return "OffsetDateTime:wq:wq";
            }

            return "/*TODO*/";
        }

        private extractDefault(line: string): string | boolean {
            const regex = /default +[A-z0-9.,\-]+/;
            const result: RegExpMatchArray | null = line.match(regex);
            if (result == null) {
                return false;
            } else {
                console.log("checking default: " + result.input);
                return result[0].split(" ")[1];
            }
        }

        private checkNullable(line: string): boolean {
            console.log("checking nullable: " + line);
            return line.match(/not +null/) == null;
        }

    }

</script>

<style>

    .flex-container {
        padding: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
        height: 100%;
        min-height: 500px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-content: stretch;
        align-items: stretch;
    }

    .style-container {
        border-radius: 10px 10px 10px 10px;
        border: 0 solid #000000;
        background-color: #ebeef7;
    }

    textarea {
        resize: none;
    }

</style>
