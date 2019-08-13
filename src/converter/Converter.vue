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

    @Component({components: {RadioPicker}})
    export default class Converter extends Vue {

        public input: string = '';
        public output: string = '';
        public className: string = '';
        private converterService: ConverterService = new ConverterService();

        public generate(): void {
            this.output = this.converterService.generate(this.input, this.className);
        }

        public onChangedSource(sourceType: string): void {
            console.log('Changed source type to: ' + sourceType);
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

</style>
