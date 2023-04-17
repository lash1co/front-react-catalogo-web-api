// Servicio de Productos
class ProductoService {
    constructor() {
      this.baseURL = "http://localhost:51277/api/Producto";
    }
  
    async obtenerProductos() {
      const response = await fetch(this.baseURL);
      const data = await response.json();
      return data;
    }

    async obtenerProducto(id){
      const response = await fetch(`${this.baseURL}/${id}`);
      const data = await response.json();
      return data;
    }

    async buscarProductos(query, orderBy,page,pageSize){
      const response = await fetch(`${this.baseURL}?q=${query}&order=${orderBy}&page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      return data;
    }
  
    async agregarProducto(producto) {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      return data;
    }
  
    async actualizarProducto(id, producto) {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      return data;
    }
  
    async eliminarProducto(id) {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    }
  }

  export default ProductoService;