import {AbstractDataType} from '@/converter/classes/AbstractDataType';
import {DataTypeEnum} from '@/converter/classes/DataTypeEnum';

export default class SourceDataType extends AbstractDataType {

    constructor(label: string, value: DataTypeEnum) {
        super(label, value);
    }

}
