const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const {
    personasPost,
    personaGet} = require('../controller/person.controller');

const { existenteEmail} = require('../helpers/db-validators');


const router = Router();

router.get("/", personaGet);

router.post(
    "/", 
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password","El password debe ser mayor a 8 caracteres").isLength({min:8}),
        check("role","El rol no puede ir vacío").not().isEmpty(),
        check("correo","El correo no puede estar vacio").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], personasPost);

module.exports = router;