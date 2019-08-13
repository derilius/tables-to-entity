import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';

export abstract class AbstractDataType {

    protected readonly label: string;
    protected readonly value: DataTypeEnum;

    constructor(label: string, value: DataTypeEnum) {
        this.label = label;
        this.value = value;
    }

    public getValue(): DataTypeEnum {
        return this.value;
    }

}
