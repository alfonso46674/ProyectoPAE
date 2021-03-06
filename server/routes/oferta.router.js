const router = require('express').Router()
const ofertaController = require('../controllers/oferta.controller')


router.get('/', ofertaController.MostrarOfertas)

// router.get('/:id', ofertaController.MostrarOfertaPorId)

router.get('/:emailEmpresa/:emailUsuario', ofertaController.MostrarOfertaPorEmpresaPorUsuario)

router.get('/dif/empresa/:correo', ofertaController.MostrarOfertasdeEmpresa)

router.get('/dif/usuario/:correo', ofertaController.MostarOfertasdeUsuario)

router.post('/', ofertaController.CrearOferta)

router.put('/:emailEmpresa/:emailUsuario', ofertaController.ActualizarOferta)

router.delete('/:emailEmpresa/:emailUsuario', ofertaController.EliminarOferta)

module.exports = router;