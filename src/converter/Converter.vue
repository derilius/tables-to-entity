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
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import ConverterService from '@/converter/ConverterService';

    @Component
    export default class Converter extends Vue {

        public input: string = '';
        public output: string = '';
        public className: string = '';
        private converterService: ConverterService = new ConverterService();

        public generate(): void {
            this.output = this.converterService.generate(this.input, this.className);
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
