<template>

    <div class="h-100" style="padding-top: 20px">
        <h1>Convert DDL to JavaEntityClass</h1>

        <div class="flex-container style-container">
            <div class="h-100 col-5">
                <RadioPicker
                        :values="getSources()"
                        @change="onChangedSource"
                ></RadioPicker>
                <v-textarea
                        solo
                        auto-grow
                        rows="25"
                        name="input-7-4"
                        label="Please enter a database code"
                        @input="formatInput"
                        v-model="input"
                ></v-textarea>
            </div>

            <div class="h-100 col-2">
                <v-btn @click="readInput">
                    Read input
                </v-btn>
                <v-btn @click="generate"
                       :disabled="!className.trim().length > 0">
                    Generate
                </v-btn>
                <v-text-field
                        v-model="className"
                        label="Class name"
                ></v-text-field>

                <div class="fieldset--checkbox" v-for="(column, index) in aClass.getColumns()" v-model="column.constructorField"
                     @change="column.addToConstructor()">
                    <input :id="index" type="checkbox" :v-model="column.isConstructorField()" :checked="column.isConstructorField()"
                           :disabled="index === 0 || !column.isNullable()">
                    <label :for="index" class="input--label">{{column.getName()}}</label>
                </div>

            </div>

            <div class="h-100 col-5">
                <RadioPicker
                        :values="getResults()"
                        @change="onChangedResult"
                ></RadioPicker>
                <v-textarea
                        solo
                        auto-grow
                        readonly
                        rows="25"
                        name="input-7-4"
                        label="Wait for it..."
                        v-model="output"
                ></v-textarea>
            </div>
        </div>

    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ConverterService from './classes/ConverterService';
    import RadioPicker from './components/RadioPicker.vue';
    import SourceDataType from '@/converter/classes/SourceDataType';
    import ResultDataType from '@/converter/classes/ResultDataType';
    import AbstractClass from '@/converter/classes/AbstractClass';
    import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';

    @Component({components: {RadioPicker}})
    export default class Converter extends Vue {

        public input: string = 'CREATE TABLE ps2_address (\n' +
            '    id_address         INT UNSIGNED AUTO_INCREMENT\n' +
            '        PRIMARY KEY,\n' +
            '    id_sync            INT(10)                       NULL,\n' +
            '    id_country         INT UNSIGNED                  NOT NULL,\n' +
            '    id_state           INT UNSIGNED                  NULL,\n' +
            '    id_customer        INT UNSIGNED        DEFAULT 0 NOT NULL,\n' +
            '    id_sync_contractor INT(10)                       NULL,\n' +
            '    id_manufacturer    INT UNSIGNED        DEFAULT 0 NOT NULL,\n' +
            '    id_supplier        INT UNSIGNED        DEFAULT 0 NOT NULL,\n' +
            '    id_warehouse       INT UNSIGNED        DEFAULT 0 NOT NULL,\n' +
            '    alias              VARCHAR(32)                   NOT NULL,\n' +
            '    company            VARCHAR(255)                  NULL,\n' +
            '    lastname           VARCHAR(255)                  NOT NULL,\n' +
            '    firstname          VARCHAR(255)                  NOT NULL,\n' +
            '    address1           VARCHAR(128)                  NOT NULL,\n' +
            '    address2           VARCHAR(128)                  NULL,\n' +
            '    postcode           VARCHAR(12)                   NULL,\n' +
            '    city               VARCHAR(64)                   NOT NULL,\n' +
            '    other              TEXT                          NULL,\n' +
            '    phone              VARCHAR(32)                   NULL,\n' +
            '    phone_mobile       VARCHAR(32)                   NULL,\n' +
            '    vat_number         VARCHAR(32)                   NULL,\n' +
            '    dni                VARCHAR(16)                   NULL,\n' +
            '    date_add           DATETIME                      NOT NULL,\n' +
            '    date_upd           DATETIME                      NOT NULL,\n' +
            '    active             TINYINT(1) UNSIGNED DEFAULT 1 NOT NULL,\n' +
            '    deleted            TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL\n' +
            ')';
        public output: string = '';
        public className: string = '';
        private inputType: DataTypeEnum = DataTypeEnum.MY;
        private aClass: AbstractClass = new AbstractClass([], '');
        private converterService: ConverterService = new ConverterService();

        public readInput(): void {
            this.formatInput();
            this.aClass = this.converterService.readInput(this.input, this.inputType);
        }

        public generate(): void {
            this.aClass.setClassName(this.className);
            this.output = this.converterService.generate(this.aClass);
        }

        public onChangedSource(sourceType: DataTypeEnum): void {
            console.log('Changed source type to: ' + sourceType);
            this.inputType = sourceType;
        }

        public onChangedResult(resultType: string): void {
            console.log('Changed result type to: ' + resultType);
        }

        public getSources(): SourceDataType[] {
            return this.converterService.getSources();
        }

        public getResults(): ResultDataType[] {
            return this.converterService.getResults();
        }

        public formatInput() {
            const result: RegExpMatchArray | null = this.input.match('\\n\\s*(\\w*PRIMARY KEY*\\w)');
            if (result !== null) {
                this.input = this.input.replace(result[0], ' PRIMARY KEY');
            }
            this.input = this.input.replace(/,\n +/g, ',\n\t');
            this.input = this.input.replace(/\n +/g, '\n\t');
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
    }

    textarea {
        resize: none;
    }

    input {
        margin-right: 8px;
    }

    .input--label {
        letter-spacing: .9px;
        color: #6d6d6d;
    }

    .fieldset--checkbox {
        padding-bottom: 10px;
        text-align: left;
    }

</style>
