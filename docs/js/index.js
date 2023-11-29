/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener('deviceready', onDeviceReady, false);

let ubicacion_actual = {
    lat: 1.0,
    long: 1.0, 
}

const estados_interfaz = {
    silencio: "silencio",
    reproducir: "reproducir",
    mapa_uacj: "mapa_uacj",
    mapa_parquecentral: "mapa_parquecentral",
    documentacion: "documentacion",
}

var estado_actual = estados_interfaz.silencio


var geolocationSucces = function(posicion){
    console.log('latitud: ' + posicion.coords.latitude)
    console.log('longitud: ' + posicion.coords.longitude)

    // Operaciones aritemticas maifiestencen
    let ubicacion_actual = {
        lat: posicion.coords.latitude,
        long: posicion.coords.longitude
    }

    document.querySelector("#datos").innerHTML = `long: ${ubicacion_actual.long} lat: ${ubicacion_actual.lat}`
    estados[estado_actual].actualizar(ubicacion_actual)

}

var geolocationError = function(error){
    document.querySelector("#datos").innerHTML = error
    console.log(error)
}

var opciones = {
    enableHighAccuracy: true,
    timeout: 5000,
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    var verificadorID = navigator.geolocation.watchPosition(geolocationSucces, geolocationError, opciones);

    document.querySelector(".event").innerHTML = `estado: ${estado_actual} disp_larg: ${window.innerWidth} disp_ancho: ${window.innerHeight}`

    estados[estado_actual].inicializar()
}


/*---------------------------[SECCION DE INTERFAZ]------------------------------*/
// Seccion para la conexion con los botones de funcion
document.querySelector("#parque_central").onclick = () => {boton_presionado(estados_interfaz.reproducir)}
document.querySelector("#iada").onclick = () => {boton_presionado(estados_interfaz.mapa_uacj)}
document.querySelector("#documentacion").onclick = () => {boton_presionado(estados_interfaz.documentacion)}
document.querySelector("#cerrar_documentacion").onclick = () => {boton_presionado(estados_interfaz.silencio)}
document.querySelector("#silencio").onclick = () => {boton_presionado(estados_interfaz.silencio)}

//Funcion para analizar el boton presionado y logica relacionada
function boton_presionado(boton){
    estados[estado_actual].finalizar()

    estado_actual = boton
    
    estados[estado_actual].inicializar()

    document.querySelector(".event").innerHTML = `estado: ${estado_actual} disp_larg: ${window.innerWidth} disp_ancho: ${window.innerHeight}`
}

// Funciones para regular el volumen

function calcular_volumen(distancia){
    // para calcular el volumen, se debe utilizar un porcentual especifico entre los valores de 
    // 100 y 200 mts entre los puntos.
    // Por tanto, la distancia debe estar entre los 100 y 200, y de ahi sacar el porcentaje.
    let volumen = 0.0
    let distancia_cal = 0.0

    // si es menor a 100mts la distancia, entonces el volumen esta al full
    if(distancia < 100){
        return 1.0
    }

    // si es mayor a 300mts la distancia, entonces el volumen esta a 0
    else if(distancia > 200){
        return 0.0
    }

    //si esta entre 100 y 200 entonces calcular la pendiente de volumen
    else{
        return (distancia - 100) / 100
    }
    
}


