import React, { useEffect, useState } from 'react';
import { Modal, ModalFooter, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap'

const modelCategoria ={
    Id: 0,
    Nombre:"",
  };

function FormCategoria({ guardarCategoria, mostrarModal, setMostrarModal, editar, setEditar, editarCategoria}) {
  const [categoria, setCategoria] = useState(modelCategoria);

const actualizarDato= (e)=>{
    setCategoria(
        {
            ...categoria,
            [e.target.name]: e.target.value
        }
    );
};

const enviarDato = () => {
    if(categoria.Nombre.trim() !== ""){
        if(categoria.Id === 0){
            guardarCategoria(categoria);
        }else{
            editarCategoria(categoria);
        }
        setCategoria(modelCategoria);
    }else{
        alert("Por favor coloca un nombre para la categoria");
    }
};

useEffect(()=>{
    if(editar != null){
        setCategoria(editar);
    }else{
        setCategoria(modelCategoria);
    }
},[editar]);

const cerrarModal=()=>{
    setMostrarModal(!mostrarModal);
    setEditar(null);
};

  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
            {(categoria.Id !== 0) ? "Editar Categoria" : "Nueva Categoria"}
        </ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Label>Nombre:</Label>
                    <Input type='text' name="Nombre" value={categoria.Nombre} onChange={(e) => actualizarDato(e)}/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color='primary' size='sm' onClick={enviarDato}>Guardar</Button>
            <Button color='danger' size='sm' onClick={cerrarModal}>Cerrar</Button>
        </ModalFooter>
    </Modal>
  );
}

  export default FormCategoria;
