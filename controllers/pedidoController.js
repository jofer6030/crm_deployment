const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}

//mostrar pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path : 'pedido.producto',
            model : 'Producto'
        });
        res.json(pedidos)
    } catch (error) {
        console.log(error);
        next();
    }
}

//muestra un pedido por su id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path : 'pedido.producto',
        model : 'Producto'
    });
    if(!pedido) {
        res.json({mensaje : 'Ese peddido no existe'});
        return next();
    }

    //mostrar el pedido
    res.json(pedido);
}

//actualiza el pedido por su id
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body,{
            new: true,
        }).populate('cliente').populate({
            path : 'pedido.producto',
            model : 'Producto'
        });

        res.json(pedido)
    } catch (error) {
        console.log(error);
        next();
    }
}

//eliminar pedido por su id
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id : req.params.idPedido})
        res.json({mensaje : 'Se elimino un pedido'})
    } catch (error) {
        console.log(error)
        next();
    }
}