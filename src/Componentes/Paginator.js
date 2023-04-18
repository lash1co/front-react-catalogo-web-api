import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function Paginator({setCurrentPage, onSearch, query, order, pageSize, TotalPages, CurrentPage, TotalItemsInPage, FirstItem, LastItem, TotalItems}){

    const handlePageChange = ({ selected }) => {
        const page = selected + 1;
        setCurrentPage(page);
        onSearch(query,order,page,pageSize);
      };

    return (
        <div>
        <ReactPaginate
        pageCount={TotalPages} // Número total de páginas
        pageRangeDisplayed={3} // Número de páginas que se muestran en el paginador
        marginPagesDisplayed={2} // Número de páginas que se muestran antes y después de las páginas seleccionadas
        previousLabel={'Anterior'} // Texto para el botón de página anterior
        nextLabel={'Siguiente'} // Texto para el botón de página siguiente
        breakLabel={'...'} // Texto para el botón de página de salto
        onPageChange={handlePageChange} // Función que se llama cuando se cambia de página
        forcePage={CurrentPage-1}
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
      <span>{TotalItemsInPage} Items mostrados, del {FirstItem} al {LastItem}, de {TotalItems} resultados</span>
      </div>
    );
}

export {Paginator};