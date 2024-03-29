const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');
const { validarJWT } = require ('../middlewares/validar-jwt');
const { esTeacherRole } = require ('../middlewares/validar-role');

const {
    cursosPost,
    cursoGet,
    getCursoById,
    putCursos,
    cursosDelete} = require('../controller/course.controller');

const { existenteCurso, codigoCursoExiste, existenteCursoById} = require('../helpers/db-validators');

const router = Router();

router.get('/cursos', validarJWT, cursoGet);

router.get(
    "/:id",
    [
        validarJWT,
        esTeacherRole,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], getCursoById);

router.post(
    "/",
    [
        validarJWT,
        esTeacherRole,
        check("nombre").custom(existenteCurso),
        check("codigoCurso").custom(codigoCursoExiste),
        check("descripcion", "La descripción no puede ir vacía").not().isEmpty(),
        check("maestro", "El maestro no puede ir vacio").not().isEmpty(),
        validarCampos,
    ],cursosPost );

router.put(
    "/:id",
    [
        validarJWT,
        esTeacherRole,
        check("id", 'No es un id válido').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], putCursos);


router.delete(
    "/:id",
    [
        validarJWT,
        esTeacherRole,
        check('id', 'No es un id valido ').isMongoId(),
        check('id').custom(existenteCursoById),
        validarCampos
    ], cursosDelete);

module.exports = router;