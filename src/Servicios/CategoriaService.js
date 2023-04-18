// Servicio de Categoria
class CategoriaService {
    constructor() {
      this.baseURL = "http://localhost:51277/api/Categoria";
    }
  
    async obtenerCategorias(page,pageSize) {
      const response = await fetch(`${this.baseURL}?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      return data;
    }

    async obtenerCategoria(id){
      const response = await fetch(`${this.baseURL}/${id}`);
      const data = await response.json();
      return data;
    }
  
    async agregarCategoria(categoria) {
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });
      const data = await response.json();
      return data;
    }
  
    async actualizarCategoria(id, categoria) {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });
      const data = await response.json();
      return data;
    }
  
    async eliminarCategoria(id) {
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data;
    }
  }

  export default CategoriaService;