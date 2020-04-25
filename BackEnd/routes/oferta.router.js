const router = require('express').Router()
const ofertaController = require('../controllers/oferta.controller')


router.get('/', ofertaController.MostrarOfertas)

router.get('/:id', ofertaController.MostrarOfertaPorId)

router.post('/', ofertaController.CrearOferta)

router.put('/', ofertaController.ActualizarOferta)

router.delete('/', ofertaController.EliminarOferta)

module.exports = router;