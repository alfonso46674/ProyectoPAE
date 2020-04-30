const router = require('express').Router()
const empresaController = require('../controllers/empresa.controller')


router.get('/', empresaController.MostrarEmpresas)

router.get('/:email', empresaController.MostrarEmpresaPorEmail)

router.post('/', empresaController.CrearEmpresa)

router.put('/:email', empresaController.ActualizarEmpresa)

router.delete('/:email', empresaController.EliminarEmpresa)

module.exports = router;