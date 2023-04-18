import React, { useState, useEffect } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageProducto from './ImageProducto';
import ImagenDesconocida from '../imagenes/unknown.png';

import { Paginator } from './Paginator';

function ListProducto({ query, setQuery, order, setOrder, pagination, pageSize, productos, onSearch, setEditar, mostrarModal, setMostrarModal, onDelete }) {
  const [currentPage, setCurrentPage] = useState(pagination.CurrentPage);

  useEffect(() => {
    if(currentPage != pagination.CurrentPage){
      setCurrentPage(pagination.CurrentPage);
    }
  }, [currentPage, pagination]);

  const enviarDato=(categoria)=>{
    setEditar(categoria);
    setMostrarModal(!mostrarModal);
};

  const handleSelectChange = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
    setCurrentPage(1);
    onSearch(query,event.target.value, 1, pageSize);
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
    setCurrentPage(1);
    onSearch(event.target.value,order, 1, pageSize);
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
      <Paginator
        setCurrentPage={setCurrentPage}
        onSearch={onSearch}
        query={query}
        order={order}
        pageSize={pageSize}
        TotalPages={pagination.TotalPages}
        CurrentPage={currentPage}
        TotalItemsInPage={pagination.TotalItemsInPage}
        FirstItem={pagination.FirstItem}
        LastItem={pagination.LastItem}
        TotalItems={pagination.TotalItems}
      />
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
