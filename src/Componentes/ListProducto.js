import React, { useState } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageProducto from './ImageProducto';
import ImagenDesconocida from '../imagenes/unknown.png';
import ReactPaginate from 'react-paginate';

function ListProducto({ query, setQuery, order, setOrder, pagination, pageSize, productos, onSearch, setEditar, mostrarModal, setMostrarModal, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = ({ selected }) => {
    //setCurrentPage(selected);
    const page = selected + 1;
    setCurrentPage(page);
    onSearch(query,order,page,pageSize);
  };

  const enviarDato=(categoria)=>{
    setEditar(categoria);
    setMostrarModal(!mostrarModal);
};

  const handleSelectChange = (event) => {
    event.preventDefault();
    setOrder(event.target.value);
    onSearch(query,event.target.value, pagination.CurrentPage, pageSize);
  };

  const handleTextChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
    onSearch(event.target.value,order, pagination.CurrentPage, pageSize);
  };

  const resetPagination = () => {
    setCurrentPage(1);
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
      <ReactPaginate
        pageCount={pagination.TotalPages} // Número total de páginas
        pageRangeDisplayed={3} // Número de páginas que se muestran en el paginador
        marginPagesDisplayed={2} // Número de páginas que se muestran antes y después de las páginas seleccionadas
        previousLabel={'Anterior'} // Texto para el botón de página anterior
        nextLabel={'Siguiente'} // Texto para el botón de página siguiente
        breakLabel={'...'} // Texto para el botón de página de salto
        onPageChange={handlePageChange} // Función que se llama cuando se cambia de página
        containerClassName={'pagination'} // Clase CSS para el contenedor del paginador
        activeClassName={'active'} // Clase CSS para la página activa
        pageClassName={'page-item'} // Clase CSS para las páginas
        pageLinkClassName={'page-link'} // Clase CSS para los enlaces de página
        breakClassName={'page-item'} // Clase CSS para los botones de salto
        breakLinkClassName={'page-link'} // Clase CSS para los enlaces de salto
        previousClassName={'page-item'} // Clase CSS para el botón de página anterior
        previousLinkClassName={'page-link'} // Clase CSS para el enlace del botón de página anterior
        nextClassName={'page-item'} // Clase CSS para el botón de página siguiente
        nextLinkClassName={'page-link'} // Clase CSS para el enlace del botón de página siguiente
      />
      <button onClick={resetPagination}>Reset Pagination</button>
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
