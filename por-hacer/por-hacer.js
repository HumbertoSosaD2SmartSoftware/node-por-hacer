const fs = require('fs');

let listadoPorHacer = [];

const grabarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Nose pudo grabar');
    });
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDb();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    grabarDb();

    return porHacer;
}

let getListado = () => {

    cargarDb();

    return listadoPorHacer;
}
let actualizar = (descripcion, completado) => {

    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;

        grabarDb();

        return true;
    } else {

        return false;
    }

}

let borrar = (descripcion) => {
    cargarDb();
    //Mi forma
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // });
    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     grabarDb();
    //     return true;
    // } else {
    //     return false;
    // }
    //forma del maestro
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        grabarDb();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}