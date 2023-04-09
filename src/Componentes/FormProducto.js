import React, { useEffect, useState } from 'react';
import { Modal, ModalFooter, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap';

const modelProducto = {
  Id:0,
  Nombre:"",
  Descripcion:"",
  CategoriaId:0,
  Imagen:"",
};

function FormProducto({categorias, guardarProducto, mostrarModal, setMostrarModal, editar, setEditar, editarProducto}) {
  const[producto, setProducto] = useState(modelProducto);

  const actualizarDato= (e)=>{
    setProducto(
        {
            ...producto,
            [e.target.name]: e.target.value
        }
    );
};

const enviarDato = () => {
  if(producto.Nombre.trim() !== "" && producto.Descripcion.trim() !== "" && producto.CategoriaId !==0 && producto.Imagen.trim() !== ""){
    if(producto.Id === 0){
      guardarProducto(producto);
    }else{
      editarProducto(producto);
    }
    setProducto(modelProducto);
  }
  else{
      alert('Por favor, completa todos los campos');
  }
};

useEffect(()=>{
  if(categorias.length>0 && producto.CategoriaId === 0){
    producto.CategoriaId = categorias[0]?.Id;
  }
},[categorias]);

useEffect(()=>{
  if(editar != null){
      setProducto(editar);
  }else{
      setProducto(modelProducto);
  }
},[editar]);

const cerrarModal=()=>{
  setMostrarModal(!mostrarModal);
  setEditar(null);
};

  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
            {(producto.Id !== 0) ? "Editar Producto" : "Nuevo Producto"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nombre:</Label>
              <Input type="text" name='Nombre' value={producto.Nombre} onChange={(e) => actualizarDato(e)} />
            </FormGroup>
            <FormGroup>
              <Label>Descripción:</Label>
              <Input type="text" name='Descripcion' value={producto.Descripcion} onChange={(e) => actualizarDato(e)} />
            </FormGroup>
            <FormGroup>
              <Label>Categoria:</Label>
              <select name='CategoriaId' value={producto.CategoriaId} onChange={(e) => actualizarDato(e)} onSelect={(e) => actualizarDato(e)}>
                {categorias.length > 0 ?
                  categorias.map((categoria) => (
                  <option key={categoria.Id} value={categoria.Id}>
                    {categoria.Nombre}
                  </option>
                )):
              <option value="">Cargando categorías...</option>
            }
          </select>
            </FormGroup>
            <FormGroup>
              <Label>Imagen:</Label>
              <Input type="text" name="Imagen" value={producto.Imagen} onChange={(e) => actualizarDato(e)} />
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

  export default FormProducto;
