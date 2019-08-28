import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';

export abstract class AbstractDataType {

    protected readonly label: string;
    protected readonly value: DataTypeEnum;

    protected constructor(label: string, value: DataTypeEnum) {
        this.label = label;
        this.value = value;
    }

    public getValue(): DataTypeEnum {
        return this.value;
    }

    public getLabel(): string {
        return this.label;
    }

}
