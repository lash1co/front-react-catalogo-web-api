import React, { useState, useEffect } from 'react';
//import './App.css';
import {Row, Col, Container, Card, CardBody, CardHeader, Button} from 'reactstrap';
import FormProducto from './Componentes/FormProducto';
import ListProducto from './Componentes/ListProducto';
import ProductoService from './Servicios/ProductoService';
import CategoriaService from './Servicios/CategoriaService';
import FormCategoria from './Componentes/FormCategoria';
import ListCategoria from './Componentes/ListCategoria';
import { FormPagination } from './Componentes/FormPagination';

const ModelPagination = {
  CurrentPage: 1,
  TotalItems: 0,
  TotalPages: 1,
  TotalItemsInPage: 0,
  FirstItem: 0,
  LastItem: 0,
};

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [editarCategoria, setEditarCategoria] = useState(null);
  const [editarProducto, setEditarProducto] = useState(null);
  const [paginationProductos, setPaginationProductos] = useState(ModelPagination);
  const [paginationCategorias, setPaginationCategorias] = useState(ModelPagination);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('name_asc');

  const productoService = new ProductoService();
  const categoriaService = new CategoriaService();

  const actualizarDatos = () => {
    productoService.buscarProductos(query,order,paginationProductos.CurrentPage,pageSize)
      .then((data) => {
        setProductos(data.Productos);
        setPaginationProductos(data.Pagination);
      })
      .catch((error) => console.error(error));
    categoriaService.obtenerCategorias(paginationCategorias.CurrentPage,pageSize)
      .then((data) => {
        setCategorias(data.Categorias);
        setPaginationCategorias(data.Pagination);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    actualizarDatos();
  }, [pageSize]);


  const handleGuardarProducto = (product) => {
      productoService.agregarProducto(product)
      .then(() => {
        setEditarProducto(null);
        setMostrarModalProducto(!mostrarModalProducto);
        actualizarDatos();
    })
      .catch((error) => console.error(error));
  };

  const handleEditarProducto = (product) => {
    productoService.actualizarProducto(product.Id,product)
    .then((updatedProduct) => {
      setProductos(
        productos.map((p) => (p.Id === updatedProduct.Id ? updatedProduct : p))
      );
      setEditarProducto(null);
      setMostrarModalProducto(!mostrarModalProducto);
      actualizarDatos();
    }
    )
    .catch((error) => console.error(error));
  };

  const handleDeleteProducto = (product) => {
    const confirmDelete = window.confirm(
      `¿Está seguro que desea eliminar el producto ${product.Nombre}?`
    );
    if (confirmDelete) {
      productoService.eliminarProducto(product.Id)
        .then(() => setProductos(productos.filter((p) => p.Id !== product.Id)))
        .catch((error) => console.error(error));
    }
  };

  const handleSearchProducto = (searchTerm, order, page, pageSize) => {
    productoService.buscarProductos(searchTerm, order, page, pageSize)
      .then((data) => {
        const newArray = data;
        setProductos(newArray.Productos);
        setPaginationProductos(newArray.Pagination);
      })
      .catch((error) => console.error(error));
  };

  const handleGuardarCategoria = (category) =>{
      categoriaService.agregarCategoria(category)
      .then(() => {
        setEditarCategoria(null);
        setMostrarModalCategoria(!mostrarModalCategoria);
        actualizarDatos();
    })
      .catch((error) => console.error(error));
  };

  const handleEditarCategoria = (category) => {
    categoriaService.actualizarCategoria(category.Id,category)
      .then((updatedCategory) => {
        setCategorias(
          categorias.map((c) => (c.Id === updatedCategory.Id ? updatedCategory : c))
        );
        setEditarCategoria(null);
        setMostrarModalCategoria(!mostrarModalCategoria);
        actualizarDatos();
      }
      )
      .catch((error) => console.error(error));
  };

  const handleDeleteCategoria = (category) => {
    const confirmDelete = window.confirm(
      `¿Está seguro que desea eliminar la categoria ${category.Nombre}?`
    );
    if (confirmDelete) {
      categoriaService.eliminarCategoria(category.Id)
        .then(() => setCategorias(categorias.filter((c) => c.Id !== category.Id)))
        .catch((error) => console.error(error));
    }
  };

  const abrirModalCategoria = () => {
    setEditarCategoria(null);
    setMostrarModalCategoria(!mostrarModalCategoria);
  };

  const abrirModalProducto = () => {
    setEditarProducto(null);
    setMostrarModalProducto(!mostrarModalProducto);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPaginationProductos({ ...paginationProductos, CurrentPage: 1 }); // update CurrentPage in pagination
    setPaginationCategorias({ ...paginationCategorias, CurrentPage: 1 }); // update CurrentPage in pagination
  };

  const handleSearchCategoria = (noquery, noorder, page, pageSize) =>{
    categoriaService.obtenerCategorias(page, pageSize)
      .then((data) => {
        const newArray = data;
        setCategorias(newArray.Categorias);
        setPaginationCategorias(newArray.Pagination);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <Container>
        <Row className='mt-5'>
          <Col sm="12">
            <center><h1>Catalogo Web de Productos</h1></center>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col sm="12">
            <Card>
              <CardHeader><h1>Configuración de Página</h1></CardHeader>
              <CardBody>
                <FormPagination 
                  pageSize = {pageSize}
                  setPageSize = {handlePageSizeChange}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col sm='12'>
            <Card>
              <CardHeader>
                <h1>Lista de Categorias</h1>
              </CardHeader>
              <CardBody>
                <Button size='sm' color='success' onClick={()=>
                  abrirModalCategoria()
                }>Nueva Categoria</Button>
                <hr></hr>
                <ListCategoria
                  query = ''
                  order=''
                  pagination = {paginationCategorias} 
                  pageSize = {pageSize}
                  categorias={categorias}
                  onSearch={handleSearchCategoria}
                  setEditar={setEditarCategoria}
                  mostrarModal={mostrarModalCategoria}
                  setMostrarModal={setMostrarModalCategoria}
                  onDelete={handleDeleteCategoria}
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h1>Lista de Productos</h1>
              </CardHeader>
              <CardBody>
                <Button size='sm' color='success' onClick={()=>
                  abrirModalProducto()
                }>Nuevo Producto</Button>
                <hr></hr>
                <ListProducto 
                  query = {query}
                  setQuery={setQuery}
                  order={order}
                  setOrder={setOrder}
                  pagination = {paginationProductos} 
                  pageSize = {pageSize}
                  productos={productos}
                  onSearch={handleSearchProducto}
                  setEditar={setEditarProducto}
                  mostrarModal={mostrarModalProducto}
                  setMostrarModal={setMostrarModalProducto}
                  onDelete={handleDeleteProducto}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <FormCategoria 
          guardarCategoria={handleGuardarCategoria} 
          mostrarModal={mostrarModalCategoria} 
          setMostrarModal={setMostrarModalCategoria} 
          editar={editarCategoria} 
          setEditar={setEditarCategoria} 
          editarCategoria={handleEditarCategoria}
        />
        <FormProducto
          categorias={categorias}
          guardarProducto={handleGuardarProducto} 
          mostrarModal={mostrarModalProducto} 
          setMostrarModal={setMostrarModalProducto} 
          editar={editarProducto} 
          setEditar={setEditarProducto} 
          editarProducto={handleEditarProducto}
        />
      </Container>
    </div>
  );
}

export default App;
