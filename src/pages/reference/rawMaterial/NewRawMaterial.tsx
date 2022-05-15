import React, { useRef } from 'react';
import { rawMaterial0 } from 'tools/types';
import FormRawMaterial from 'features/RawMaterial/FormRawMaterial';

export default function NewIncoterm() {
    const form = useRef(null)
    return (
        <div>
            <FormRawMaterial rawMaterial={rawMaterial0} disable={true} ref={form} />
        </div>
    );
};

