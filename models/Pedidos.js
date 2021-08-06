const mongoose = require('mongoose');
const {Schema} = mongoose;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref:'Cliente'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Producto'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    } 
});

module.exports = mongoose.model('Pedido', pedidosSchema);