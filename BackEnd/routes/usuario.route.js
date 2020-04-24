const router = require('express').Router()
const usuarioController = require('../controllers/usuario.controller')

let usuarioPrueba2 = {
    uid: 2,
    nombre: "Juan",
    apellido: "Doe",
    email: "Juan@1",
    tipo: "Trabajador",
    ofertasActuales: 0,
    estado: "Disponible"
}



router.get('/', usuarioController.MostarUsuarios)


router.get('/:email', usuarioController.MostrarUsuarioEmail)


router.post('/', usuarioController.CrearUsuario)

router.put('/', usuarioController.ActualizarUsuario)

router.delete('/', usuarioController.EliminarUsuario)

module.exports = router;