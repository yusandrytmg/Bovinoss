let listaEmpleados = [];
let contadorId = 1;

const objEmpleado = {
    id:'',
    cc: '',
    nombres: '',
    email: '',
    roles: '',
    email: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const documentoInput = document.querySelector('#cc');
const nombreInput = document.querySelector('#nombres');
const emailInput = document.querySelector('#email');
const rolesInput = document.querySelector('#roles');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(documentoInput.value === '' || nombreInput.value === ''||emailInput.value === '' ||rolesInput.value === '' ) {
        alert('Todos os campos devem ser preenchidos');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.cc = documentoInput.value;
        objEmpleado.nombres = nombreInput.value;
        objEmpleado.email = emailInput.value;
        objEmpleado.roles = rolesInput.value;

        agregarEmpleado();
    }
}

function agregarEmpleado() {


    const cedulaExistente = listaEmpleados.some(empleado => empleado.cc === objEmpleado.cc);

    if (cedulaExistente) {
        alert(`Ya existe este numero de identificacion '${objEmpleado.cc}`);
        return;
    }

    objEmpleado.id = contadorId++;
    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();

    alert("Adicion exítosa")
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.cc = '';
    objEmpleado.nombres = '';
    objEmpleado.email = '';
    objEmpleado.roles = '';

    // Habilitar la edición del campo del documento
    documentoInput.removeAttribute("readonly");
    // contadorId = 0;
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    const tabla = document.createElement('table');
    tabla.classList.add('table');

    // Crear fila de encabezado
    const encabezado = document.createElement('tr');

    const encabezados = ['ID', 'Número Documento', 'Nombres y apellidos', 'Correo electrónico', 'Rol', 'Editar', 'Eliminar'];

    encabezados.forEach(textoEncabezado => {
        const celdaEncabezado = document.createElement('th');
        celdaEncabezado.textContent = textoEncabezado;
        celdaEncabezado.classList.add('text-center');
        encabezado.appendChild(celdaEncabezado);
    });

    tabla.appendChild(encabezado);

    listaEmpleados.forEach(empleado => {
        const { id, cc, nombres, email, roles } = empleado;

        const fila = document.createElement('tr');

        const celdaId = document.createElement('td');
        celdaId.textContent = id;
        celdaId.classList.add('text-center'); 
        fila.appendChild(celdaId);

        const celdaCC = document.createElement('td');
        celdaCC.textContent = cc;
        celdaCC.classList.add('text-center');
        fila.appendChild(celdaCC);

        const celdaNombres = document.createElement('td');
        celdaNombres.textContent = nombres;
        celdaNombres.classList.add('text-center');
        fila.appendChild(celdaNombres);

        const celdaEmail = document.createElement('td');
        celdaEmail.textContent = email;
        celdaEmail.classList.add('text-center');
        fila.appendChild(celdaEmail);

        const celdaRoles = document.createElement('td');
        celdaRoles.textContent = roles;
        celdaRoles.classList.add('text-center');
        fila.appendChild(celdaRoles);

        const celdaEditar = document.createElement('td');
        celdaEditar.classList.add('text-center');
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn',  'btn-success', 'mx-auto');
        celdaEditar.appendChild(editarBoton);
        fila.appendChild(celdaEditar);

        const celdaEliminar = document.createElement('td');
        celdaEliminar.classList.add('text-center');
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger', 'mx-auto');
        celdaEliminar.appendChild(eliminarBoton);
        fila.appendChild(celdaEliminar);

        tabla.appendChild(fila);
    });

    divEmpleados.appendChild(tabla);
}

function cargarEmpleado(empleado) {
    const {id, cc, nombres, email, roles} = empleado;

    // Deshabilitar la edición del campo del documento
    documentoInput.setAttribute("readonly", true);

    documentoInput.value = cc;
    nombreInput.value = nombres;
    emailInput.value = email;
    rolesInput.value = roles;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {
    const empleadoAActualizar = listaEmpleados.find(empleado => empleado.id === objEmpleado.id);


    const confirmacion = confirm(`información actual:\N- Documento: ${empleadoAActualizar.cc}\n- Nombres y apellidos: ${empleadoAActualizar.nombres}\n- Correo eletrónico: ${empleadoAActualizar.email}\n- Rol: ${empleadoAActualizar.roles}\n
    ¿Seguro de actualizar estos datos?\n\nNueva Informacion:\n- Documento: ${documentoInput.value}\n- Nombres y apellidos: ${nombreInput.value}\n- Correo eletrónico: ${emailInput.value}\n- Rol: ${rolesInput.value}`);
    
    if(confirmacion){
        objEmpleado.cc = documentoInput.value;
        objEmpleado.nombres = nombreInput.value;
        objEmpleado.email = emailInput.value;
        objEmpleado.roles = rolesInput.value;

        

        listaEmpleados.map(empleado => {

            if(empleado.id === objEmpleado.id) {
                empleado.id = objEmpleado.id;
                empleado.cc = objEmpleado.cc;
                empleado.nombres = objEmpleado.nombres;
                empleado.email = objEmpleado.email;
                empleado.roles = objEmpleado.roles;

            }

        });

        const cedulaExistente = listaEmpleados.some(empleado => empleado.cc === objEmpleado.cc && empleado.id !== objEmpleado.id);

        if (cedulaExistente) {
            alert('Ya existe un usuario con este número de identificación '+ empleadoAActualizar.cc +' ');
            return;
        }

        limpiarHTML();
        mostrarEmpleados();
        formulario.reset(); 

        formulario.querySelector('button[type="submit"]').textContent = 'Adicionar';
        limpiarObjeto();
        editando = false;
        alert("Actualización exitosa")

    }
        
}

function eliminarEmpleado(id) {

    const empleadoAEliminar = listaEmpleados.find(empleado => empleado.id === id);

    const confirmacion = confirm(`información actual:\n- Documento: ${empleadoAEliminar.cc}\n- Nombre y apellidos: ${empleadoAEliminar.nombres}\n- Correo eletrónico: ${empleadoAEliminar.email}\n- Rol: ${empleadoAEliminar.roles}\n
    ¿Estás seguro de que deseas eliminar a esta persona? `);
    if(confirmacion){
        listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

        // Reorganizar los IDs después de la eliminación
        listaEmpleados.forEach((empleado, index) => {
            empleado.id = index + 1;
        });

        // Actualizar el contador al eliminar
        contadorId = listaEmpleados.length + 1;
        
        limpiarHTML();
        mostrarEmpleados();
        alert("Removido con exito")
    }
    formulario.querySelector('button[type="submit"]').textContent = 'Adicionar'; 
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

function clearInformation(){
    document.getElementById("cc").value ="";
    document.getElementById("nombres").value ="";
    document.getElementById("email").value ="";
    document.getElementById("roles").value ="";
}