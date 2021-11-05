import React from 'react';
import RichGrid from './rich-grid';
import {AgGridReact} from 'ag-grid-react';
import {mount} from 'enzyme';
import {act, getByTestId} from "@testing-library/react";

let component = null;
let agGridReact = null;

const ensureGridApiHasBeenSet = async (componentRef) => {
    await act(async () => {
        await new Promise(function (resolve, reject) {
            (function waitForGridReady() {
                if (componentRef.current.getApi()) {
                    if (componentRef.current.getApi().getRowNode(8)) {
                        return resolve();
                    }

                }
                setTimeout(waitForGridReady, 500);
            })();
        })

    });
};

beforeEach(async () => {
    const ref = React.createRef()
    component = mount(<RichGrid ref={ref}/>);
    agGridReact = component.find(AgGridReact).instance();
    await ensureGridApiHasBeenSet(ref);
});

afterEach(() => {
    if (component) {
      component.unmount();
    }
    agGridReact = null;
})


it('is rendered', () => {
  expect(agGridReact.api.getSelectedRows().length).toEqual(0);
});

