import React from 'react';
import { Form, FormGroup, Input, Label} from 'reactstrap'

function FormPagination({pageSize, setPageSize}){

    const actualizarPagination = (e) => {
        setPageSize(parseInt(e.target.value));
    };
    const onSubmit = (e) => e.preventDefault();; 
    return (
        <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Cantidad de items por página:</Label>
              <Input type="number" name='itemsPerPage' value={pageSize} onChange={(e) => actualizarPagination(e)} min={1} step={1}/>
            </FormGroup>
        </Form>
    );
}

export {FormPagination};