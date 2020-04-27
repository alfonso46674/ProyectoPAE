const router = require('express').Router()
const usuarioController = require('../controllers/usuario.controller')

router.get('/hola', usuarioController.Prueba)

router.get('/', usuarioController.MostarUsuarios)


router.get('/:email', usuarioController.MostrarUsuarioEmail)


router.post('/', usuarioController.CrearUsuario)

router.put('/', usuarioController.ActualizarUsuario)

router.delete('/', usuarioController.EliminarUsuario)

module.exports = router;