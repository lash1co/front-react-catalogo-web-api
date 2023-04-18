import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { Paginator } from './Paginator';

function ListCategoria({ query, order, pagination, pageSize, categorias, onSearch, setEditar, mostrarModal, setMostrarModal, onDelete}) {
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

  return (
    <div>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (categorias.length<1) ? (
                <tr>
                    <td colSpan='3'>
                        No hay categorias
                    </td>
                </tr>
            ):
            categorias.map((categoria) => (
            <tr key={categoria.Id}>
              <td>{categoria.Id}</td>
              <td>{categoria.Nombre}</td>
              <td>
                <Button color='primary' size='sm' className='me-2' onClick={() => enviarDato(categoria)}>Editar</Button>
                <Button color='danger' size='sm' onClick={() => onDelete(categoria)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListCategoria;
