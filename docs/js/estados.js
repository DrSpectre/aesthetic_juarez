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

// Actualizando la interfaz con los elementos necesarios.
let rolas = ["rola_1", "rola_2", "rola_3"]
let documentacion = document.querySelector("#cont_documentacion")
let indice_documentacion = documentacion_bd.find((elemento) => elemento.id == "texto_inicial")

function ajustar_volumen(mapa, ubicacion){
    console.log("ejecutando: ajustar_volumen")

    let texto = " <-----> "

    mapa.forEach(function(elemento) {
        console.log(elemento)
        let pow_volume = calcular_volumen(Math.round(obtenerDistanciaMetros(elemento, ubicacion)))
        texto = texto + pow_volume + " <-----> "

        document.querySelector(`#${elemento.rola}`).volume = pow_volume 
    })

    document.querySelector("#seccion-distancias").innerHTML = texto
}

function pausar_musica(){
    rolas.forEach(function(elemento){
        document.querySelector(`#${elemento}`).pause()
        document.querySelector(`#${elemento}`).volume = 0
    })
}

function reproducir_musica(){
    rolas.forEach(function(elemento){
        document.querySelector(`#${elemento}`).play()
    })
}

const estados = {
    "silencio": {
        inicializar: () => {
            pausar_musica()
        },
        actualizar: () => {},
        finalizar: () => {}
    },
    "reproducir": {
        inicializar: () => {},
        actualizar: (ubi) => {
            // seleccionar la pieza que quede mas cercas
            //
            // Ubicacion de parque central en promedio de los puntos
            let parque_central_ubi = {
                lat: 31.687211,
                long: -106.4263316
            }

            //Ubicacion en promedio de IADA
            let IADA = {
                lat: 31.742809,
                long: -106.43169533
            }

            let distancia_iada = obtenerDistanciaMetros(IADA, ubi)
            let distancia_parque_central = obtenerDistanciaMetros(parque_central_ubi, ubi)

            // Si iada esta mas cercas, entonces carga el perfil de mapa de iada
            if (distancia_iada < distancia_parque_central){
                estado_actual = estados_interfaz.mapa_uacj
            }
            //Sino, entonces debe ser el aprque central que esta mas cercas.
            else{
                estado_actual = estados_interfaz.mapa_parquecentral
            }

            estados[estado_actual].inicializar()

        },
        finalizar: () => {}
    },
    "mapa_uacj": { 
        inicializar: () => {
            console.log("ejecutando: mapa_uacj")
            reproducir_musica()

        },
        actualizar: (ubi) => {
            ajustar_volumen(iada, ubi);
        },
        finalizar: () => {
            pausar_musica()
        }
    },
    "mapa_parquecentral": {
        inicializar: () => {
            reproducir_musica()
        },
        actualizar: (ubi) => {
            ajustar_volumen(parque_central, ubi)
        },
        finalizar: () => {
            pausar_musica()
        }
    },
    "documentacion": {
        inicializar: () => {
            pausar_musica()
            estados[estado_actual].actualizar()
            document.querySelector("#documentacion").classList.add("oculto")
            document.querySelector("#cerrar_documentacion").classList.remove("oculto")

            documentacion.classList.remove("oculto")
        },
        actualizar: () => {
            console.log(indice_documentacion)
            documentacion.querySelector("#titulo").innerHTML = indice_documentacion.titulo
            documentacion.querySelector(".documentacion").innerHTML = indice_documentacion.documentacion
            documentacion.querySelector(".fuentes").innerHTML = indice_documentacion.fuentes

            let seccion = documentacion.querySelector(".secciones")
            seccion.querySelectorAll(".visitar_seccion").forEach((boton) => {seccion.removeChild(boton)})

            indice_documentacion.secciones.forEach((elemento) => {
                let div = documentacion.querySelector("#seccion_a_visitar").cloneNode()
                console.log(elemento)
                
                div.innerHTML = elemento.nombre
                div.onclick = () => {
                    indice_documentacion = documentacion_bd.find((doc) => doc.id == elemento.id)

                    estados[estado_actual].actualizar()
                }

                div.classList.remove("oculto")

                documentacion.querySelector(".secciones").appendChild(div)
            })
        },
        finalizar: () => {
            document.querySelector("#documentacion").classList.remove("oculto")
            document.querySelector("#cerrar_documentacion").classList.add("oculto")

            documentacion.classList.add("oculto")
            indice_documentacion = documentacion_bd.find((doc) => doc.id == "texto_inicial")
        }
    },
}

