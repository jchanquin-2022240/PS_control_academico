const Curso =  require('../models/curso');
const { response } = require('express');

const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estadoCurso: true}

    const[total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });

}

const cursosPost = async (req,res) => {
    const {nombre, codigoCurso, descripcion, maestro} = req.body;
    const curso = new Curso({nombre, codigoCurso, descripcion, maestro});

    await curso.save();
    res.status(202).json({
        curso
    });
}

module.exports = {
    cursosPost,
    cursoGet,
    getCursoById
}