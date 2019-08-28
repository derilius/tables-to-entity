<template>

    <div class="wrapper">
        <v-radio-group @change="change" class="item" v-model="selected" row>
            <v-radio v-for="item in values" :key="item.getLabel()" :label="item.getLabel()" :value="item.getValue()"></v-radio>
        </v-radio-group>
    </div>

</template>

<script lang="ts">

    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    import {AbstractDataType} from '@/converter/classes/AbstractDataType';
    import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';

    @Component
    export default class RadioPicker extends Vue {

        @Prop(Array)
        public readonly values!: AbstractDataType[];
        public selected: DataTypeEnum = this.values[0].getValue();

        @Emit()
        public change(selected: string): string {
            return selected;
        }

    }

</script>

<style scoped>

    .wrapper {
        background-color: white;
        border-radius: 5px;
        padding: 8px;
        margin-bottom: 15px;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }

</style>
