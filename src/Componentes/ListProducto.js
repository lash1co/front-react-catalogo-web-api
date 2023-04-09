import React, { useState } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageProducto from './ImageProducto';
import ImagenDesconocida from '../imagenes/unknown.png';

function ListProducto({ productos, onSearch, setEditar, mostrarModal, setMostrarModal, onDelete }) {
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('name_asc');

  const enviarDato=(categoria)=>{
    setEditar(categoria);
    setMostrarModal(!mostrarModal);
};

  const handleSelectChange = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
    onSearch(query,event.target.value);
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
    console.log(event.target.value);
    onSearch(event.target.value,order);
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label>Buscar:</Label>
          <Input type='text' id='searchText' name='searchText' onChange={handleTextChange} value={query}/>
        </FormGroup>
        <FormGroup>
          <Label>Ordenado por:</Label>
          <select className="form-select form-select-sm" id='orderBy' name='orderBy' onChange={handleSelectChange} value={order}>
            <option value='name_asc'>Nombre Ascendente</option>
            <option value='name_desc'>Nombre Descendente</option>
            <option value='category_asc'>Categoria Ascendente</option>
            <option value='category_desc'>Categoria Descendente</option>
          </select>
        </FormGroup>
      </Form>
      <hr></hr>
      <Table striped responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoria</th>
            <th>Imagen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (productos.length<1) ? (
                <tr>
                    <td colSpan='6'>
                        No hay productos
                    </td>
                </tr>
            ):
            productos.map((producto) => (
            <tr key={producto.Id}>
              <td>{producto.Id}</td>
              <td>{producto.Nombre}</td>
              <td>{producto.Descripcion}</td>
              <td>{producto.Categoria.Nombre}</td>
              <td>
                <ImageProducto 
                  src={producto.Imagen}
                  fallbackSrc={ImagenDesconocida}
                  alt={producto.Nombre}
                />
              </td>
              <td>
                <Button color='primary' size='sm' className='me-2' onClick={() => enviarDato(producto)}>Editar</Button>
                <Button color='danger' size='sm' onClick={() => onDelete(producto)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListProducto;
