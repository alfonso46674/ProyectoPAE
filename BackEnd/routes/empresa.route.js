const router = require('express').Router()
const empresaController = require('../controllers/empresa.controller')


router.get('/', empresaController.MostrarEmpresas)

router.get('/:email', empresaController.MostrarEmpresaPorEmail)

router.post('/', empresaController.CrearEmpresa)

router.put('/', empresaController.ActualizarEmpresa)

router.delete('/', empresaController.EliminarEmpresa)

module.exports = router;