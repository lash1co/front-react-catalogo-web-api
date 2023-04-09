import { Table, Button } from 'reactstrap';

function ListCategoria({ categorias, setEditar, mostrarModal, setMostrarModal, onDelete}) {

    const enviarDato=(categoria)=>{
        setEditar(categoria);
        setMostrarModal(!mostrarModal);
    };

  return (
    <div>
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
