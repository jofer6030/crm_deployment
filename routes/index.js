const express = require('express')
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');
const usuariosController = require('../controllers/usuariosController');

//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {

    /* CLIENTES */

    //Agrega nuevos clientes via POST
    router.post('/clientes',auth, clienteController.nuevoCliente);

    //Obtener todo los clientes
    router.get('/clientes',auth, clienteController.mostrarClientes);

    //Muestra un cliente en especifico
    router.get('/clientes/:idCliente',auth, clienteController.mostrarCliente);

    //Actualizar el cliente
    router.put('/clientes/:idCliente',auth, clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente',auth, clienteController.eliminarCliente);

    /* PRODUCTOS */

    //Agrega nuevos productos via POST
    router.post('/productos',
        auth, 
        productoController.subirArchivo,
        productoController.nuevoProducto
    );

    //Obtener todo los productos
    router.get('/productos',auth, productoController.mostrarProductos);

    //Muestra un producto en especifico
    router.get('/productos/:idProducto',auth, productoController.mostrarProducto);

    //Actualizar productos
    router.put('/productos/:idProducto',
        auth, 
        productoController.subirArchivo,
        productoController.actualizarProducto
    );

    //Eliminar productos
    router.delete('/productos/:idProducto',auth, productoController.eliminarProducto)

    //Búsqueda de productos
    router.post('/productos/busqueda/:query', productoController.buscarProducto)

    /* PEDIDOS */

    //Agrega nuevos pedidos via POST
    router.post('/pedidos/nuevo/:idUsuario', pedidoController.nuevoPedido);

    //mostrar todos los pedidos
    router.get('/pedidos',auth, pedidoController.mostrarPedidos);

    //mostrar pedido por su id
    router.get('/pedidos/:idPedido',auth, pedidoController.mostrarPedido);

    //Actualizar pedidos
    router.put('/pedidos/:idPedido',auth, pedidoController.actualizarPedido);

    //Eliminar pedido
    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido);

    /* USUARIOS */
    router.post('/crear-cuenta',
        auth,
        usuariosController.registrarUsuario
    );
    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario
    );

    return router;
}