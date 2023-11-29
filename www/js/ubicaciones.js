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


const parque_central = [
    {
        long: -106.425778,
        lat: 31.689183,
        rola: "rola_1"
    },
    {
        long: -106.425370,
        lat: 31.685475,
        rola: "rola_2"
    },
    {
        long: -106.427847,
        lat: 31.686975,
        rola: "rola_3"
    },
]

const iada = [
    {
        long: -106.433433,
        lat: 31.744050,
        rola: "rola_1"
    },
    {
        long: -106.429866,
        lat: 31.742974,
        rola: "rola_2"
    },
    {
        long: -106.431787,
        lat: 31.741403,
        rola: "rola_3"
    },
]

function obtenerDistanciaMetros(marca_uno, marca_dos){
    rad = function(x) {return x * Math.PI/180}

    const radio_tierra = 6378.137

    let d_lat = rad(marca_dos.lat - marca_uno.lat)
    let d_long = rad(marca_dos.long - marca_uno.long)

    let a = Math.sin(d_lat/2) * Math.sin(d_lat / 2) + Math.cos(rad(marca_uno.lat)) * Math.cos(rad(marca_dos.lat)) * Math.sin(d_long / 2) * Math.sin(d_long / 2)

    let distancia_ang = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return radio_tierra * distancia_ang * 1000 // Distancia calculada
}


