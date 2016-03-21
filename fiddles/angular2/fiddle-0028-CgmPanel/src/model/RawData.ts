import {List,Record} from 'immutable';

const RawDataRecord = Record({
    title: "",
    children: []
});

export class RawData extends RawDataRecord {
    title: String;
    children: Object[];
    constructor(props) {
        super(props);
    }
}
