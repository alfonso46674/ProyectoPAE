const router = require('express').Router()
const usuarioController = require('../controllers/usuario.controller.')

router.get('/hola', usuarioController.Prueba)

router.get('/', usuarioController.MostarUsuarios)


router.get('/:email', usuarioController.MostrarUsuarioEmail)


router.post('/', usuarioController.CrearUsuario)

router.put('/:email', usuarioController.ActualizarUsuario)

router.delete('/:email', usuarioController.EliminarUsuario)

module.exports = router;