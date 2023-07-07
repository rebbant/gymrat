function actionNav() {
    if(document.getElementById("mySidepanel").style.width === "0px"){
        document.getElementById("mySidepanel").style.width = "500px";
    }
    else{
        document.getElementById("mySidepanel").style.width = "0";
    }
}

//FALTA PASSAR EL TIPUS DE MAQUINA CAMES - PECTORAL ...
function dropButtonMaquines(){
    console.log("Hola: ", document.getElementById("camesMaquinesContainerCreator").style.display)
    if(document.getElementById("camesMaquinesContainerCreator").style.display === "none"){
        document.getElementById("camesMaquinesContainerCreator").style.display = "block"
        document.getElementById("dropICames_ID").style.rotate = "180deg"
    }
    else {
        document.getElementById("camesMaquinesContainerCreator").style.display = "none"
        document.getElementById("dropICames_ID").style.rotate = "0deg"
    }
}

function dropButtonMaquinaLog(name, bname){
    console.log("Hola: ", document.getElementById(name).style.display)
    if(document.getElementById(name).style.display === "none"){
        document.getElementById(name).style.display = "block"
        document.getElementById(bname).style.rotate = "180deg"
    }
    else {
        document.getElementById(name).style.display = "none"
        document.getElementById(bname).style.rotate = "0deg"
    }
}

function checkNumMaquina(input, boto){
    if(document.getElementById(input).value > 0){
        document.getElementById(boto).style.backgroundColor = "#a6ffa4"
        document.getElementById(boto).disabled = false
    }
    else{
        document.getElementById(boto).style.backgroundColor = "#5f955e"
        document.getElementById(boto).disabled = true

    }
}

function changeButtonPlusColor(kg, reps, boto){
    if((document.getElementById(kg).value > 0) && (document.getElementById(reps).value.length > 0)){
        document.getElementById(boto).style.backgroundColor = "#a6ffa4"
        document.getElementById(boto).disabled = false
    }
    else {
        document.getElementById(boto).style.backgroundColor = "#5f955e"
        document.getElementById(boto).disabled = true
    }
}

function getDataCompleta() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    const fecha = new Date();
    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().slice(-2);
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    return `${diaSemana} ${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
}

function afegirDadesMaquinaCames(kg, reps){
    let data = getDataCompleta()
    console.log("Data: ", data)
}

function crearMaquina(input){
    console.log("ID: ", document.getElementById(input).valueOf().valueAsNumber)
    let maquinaLogNumber = "[" + document.getElementById(input).valueOf().valueAsNumber + "]"
    if(document.getElementById(input).value > 0){

        //console.log("SEARCH: ", document.getElementById("camesMaquinesContainerCreator").innerHTML.includes(maquinaLogNumber))
        //console.log("Inner HTML: ", document.getElementById("camesMaquinesContainerCreator").innerHTML)
        //console.log("Cames Maquines Container ID: ", maquinaLogNumber)

        if(document.getElementById("camesMaquinesContainerCreator").innerHTML.includes(maquinaLogNumber) === false){
            document.getElementById("camesMaquinesContainerCreator").innerHTML += `<div class="camesMaquinesContainer" id="camesMaquinesContainerID${maquinaLogNumber}">
                        <div class="maquinaInputContainer">
                            <h1 class="numeroMaquina">${maquinaLogNumber}</h1>
                            <input class="inputKg" placeholder="Pes" type="number"> <h1 class="kgMaquina">Kg</h1>
                            <input class="inputReps" placeholder="'x x x'" type="text"> <h1 class="repsMaquina">Reps</h1>
                            <button class="plusBMaquina" disabled type="button"><img class="plusI" src="plus.png"></button>
                            <button class="dropBMaquina" style="margin-right: 10px" onclick="dropButtonMaquinaLog('maquinaLogID${maquinaLogNumber}', 'dropI_${maquinaLogNumber}')"><img id="dropI_${maquinaLogNumber}" class="dropI" src="drop.png"></button>
                        </div>
                        <div class="maquinaLog" id="maquinaLogID${maquinaLogNumber}" style="display: none">
                            <!--Aqui van tot el llistat de màquines-->
                        </div>
                    </div>`
        }
    }
}

function crearMaquinaCames(maquinaLog, desfase){
    //console.log("NUM: ", maquinaLog[0])
    //console.log("Maquina Log: ", maquinaLog)
    console.log("Num container search", document.getElementById("camesMaquinesContainerCreator").innerHTML.valueOf().search("camesMaquinesContainerID"))
    let table = `<table style="text-align: left; margin: 10px"><tr>`
    let breakCounter = 0
    for (let i = 1; i < maquinaLog.length; i++){
        if(breakCounter === 6){break}
        if(maquinaLog[i] === "$"){
            breakCounter++
            table = table + `</tr><tr>`
        }
        else{
            table = table + `<th class="maquinaLogDatesText">${maquinaLog[i]}</th>`
        }
    }
    table = table + `</tr></table>`
    //console.log("Table: ", table)

    /*
    let maquinaLogID = "maquinaLogID" + maquinaLog[0]
    console.log("maquinaLogID: ", maquinaLogID.toString())
    document.getElementById(maquinaLogID.toString()).innerHTML += `<div class="maquinaLogDates">
                                                                        ${table}
                                                                        <div class="maquinaLogDatesUpDownButtons">
                                                                            <button class="maquinaLogDatesUpButton"><img src="drop.png" style="height: 50px; rotate: 180deg"></button>
                                                                            <button class="maquinaLogDatesDownButton"><img src="drop.png" style="height: 50px;"></button>
                                                                        </div>
                                                                    </div>
                                                                    <div class="maquinaLogGrafic">
                                                                        <img src="grafic.png" class="maquinaLogGraficPNG">
                                                                    </div>`
    */
    return `<div class="camesMaquinesContainer" id="camesMaquinesContainerID${maquinaLog[0]}">
                        <div class="maquinaInputContainer">
                            <h1 class="numeroMaquina">${maquinaLog[0]}</h1>
                            <input id="inputKgID${maquinaLog[0]}" class="inputKg" placeholder="Pes" type="number" oninput="changeButtonPlusColor('inputKgID${maquinaLog[0]}', 'inputRepsID${maquinaLog[0]}', 'plusBMaquinaCamesID${maquinaLog[0]}')"> <h1 class="kgMaquina">Kg</h1>
                            <input id="inputRepsID${maquinaLog[0]}" class="inputReps" placeholder="'x x x'" type="text" oninput="changeButtonPlusColor('inputKgID${maquinaLog[0]}', 'inputRepsID${maquinaLog[0]}', 'plusBMaquinaCamesID${maquinaLog[0]}')"> <h1 class="repsMaquina">Reps</h1>
                            <button id="plusBMaquinaCamesID${maquinaLog[0]}" class="plusBMaquina" disabled type="button" onclick="afegirDadesMaquinaCames('inputKgID${maquinaLog[0]}', 'inputRepsID${maquinaLog[0]}')"><img class="plusI" src="plus.png"></button>
                            <button id="dropBMaquinaCamesID${maquinaLog[0]}" class="dropBMaquina" style="margin-right: 10px" onclick="dropButtonMaquinaLog('maquinaLogID${maquinaLog[0]}', 'dropI_${maquinaLog[0]}')"><img id="dropI_${maquinaLog[0]}" class="dropI" src="drop.png"></button>
                        </div>
                        <div class="maquinaLog" id="maquinaLogID${maquinaLog[0]}" style="display: none">
                            <div class="maquinaLogDates">
                                ${table}
                                <div class="maquinaLogDatesUpDownButtons">
                                    <button class="maquinaLogDatesUpButton"><img src="drop.png" style="height: 50px; rotate: 180deg"></button>
                                    <button class="maquinaLogDatesDownButton"><img src="drop.png" style="height: 50px;"></button>
                                </div>
                            </div>
                            <div class="maquinaLogGrafic">
                                <img src="grafic.png" class="maquinaLogGraficPNG">
                            </div>
                        </div>
                    </div>
                    <br>`
}

function crearMaquinaPectoral(){}
function crearMaquinaEsquena(){}
function crearMaquinaBiceps(){}
function crearAbs(){}
function crearCorrer(){}

function ajuntarMaquinesIguals(maquinesLogs){
    for (let i = 0; i < maquinesLogs.length; i++){
        for (let z = 0; z < maquinesLogs.length; z++){
            if(i === z){
                z = z + 1
                if(z >= maquinesLogs.length){break}
            }
            if(maquinesLogs[i][0] === maquinesLogs[z][0]){
                for (let y = 0; y < maquinesLogs[z].length; y++){
                    if(maquinesLogs[z][y+1] === undefined){console.log("Break"); break}
                    maquinesLogs[i].push(maquinesLogs[z][y+1])
                }
                maquinesLogs.splice(z, 1)
            }
        }
    }
    return maquinesLogs
}

function readLogsTxt(){
    let maquinesCames = []
    let maquinesPectorals = []
    let maquinesEsquena = []
    let maquinesBiceps = []
    let Abs = []
    let Correr = []
    fetch('logs.txt')
        .then(response => response.text())
        .then(text => {
            let type = 0
            let textSplitted = text.split(" ")
            for (let t = 0; t < textSplitted.length; t++){
                if(textSplitted[t] === "$\r\n$"){
                    textSplitted[t] = "$"
                }
            }
            let auxCounter = 2
            let maquinaLogCompacte = []
            for(let i = 0; i < textSplitted.length; i++){
                if(textSplitted[i] === "$"){ //Primer $
                    switch (textSplitted[i+1]){
                        case "C":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            maquinaLogCompacte.push("$")
                            maquinesCames.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 1
                            maquinesCames = ajuntarMaquinesIguals(maquinesCames)
                            //console.log("Maquines Cames C: ", maquinesCames)
                            break;
                        case "P":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            maquinesPectorals.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 2
                            maquinesPectorals = ajuntarMaquinesIguals(maquinesPectorals)
                            break;
                        case "E":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            maquinesEsquena.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 3
                            maquinesEsquena = ajuntarMaquinesIguals(maquinesEsquena)
                            break;
                        case "B":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            maquinesBiceps.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 4
                            maquinesBiceps = ajuntarMaquinesIguals(maquinesBiceps)
                            break;
                        case "A":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            Abs.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 5
                            break;
                        case "R":
                            auxCounter = 2
                            maquinaLogCompacte = []
                            while (textSplitted[i+auxCounter] !== "$"){
                                //console.log("Text Splitted[i+auxCounter]: ", textSplitted[i+auxCounter])
                                maquinaLogCompacte.push(textSplitted[i+auxCounter])
                                auxCounter = auxCounter + 1
                            }
                            Correr.push(maquinaLogCompacte)
                            i = i + auxCounter - 2
                            type = 6
                            break;
                    }
                }
            }
            console.log("Maquina Cames: ", maquinesCames)
            console.log("Maquina Pectorals: ", maquinesPectorals)
            console.log("Maquina Esquena: ", maquinesEsquena)
            console.log("Maquina Biceps: ", maquinesBiceps)
            console.log("Abs: ", Abs)
            console.log("Correr: ", Correr)

            //Muntatge de cada màquina -------------------------------------------------------------------------------
            //console.log("Inner HTML", document.getElementById("camesMaquinesContainerCreator").innerHTML)
            let innerHTML = document.getElementById("camesMaquinesContainerCreator").innerHTML
            if(maquinesCames.length > 0){
                for (let i = 0; i < maquinesCames.length; i++){
                    //crearMaquinaCames(maquinesCames[i], 0)
                    document.getElementById("camesMaquinesContainerCreator").innerHTML += crearMaquinaCames(maquinesCames[i], 0)
                    //console.log("Inner HTML", document.getElementById("camesMaquinesContainerCreator").innerHTML)
                }
            }
            if(maquinesPectorals.length > 0){
                //document.getElementById("camesMaquinesContainerCreator").innerHTML = innerHTML + crearMaquinaPectoral()
            }
            if(maquinesEsquena.length > 0){
                //document.getElementById("camesMaquinesContainerCreator").innerHTML = innerHTML + crearMaquinaEsquena()
            }
            if(maquinesBiceps.length > 0){
                //document.getElementById("camesMaquinesContainerCreator").innerHTML = innerHTML + crearMaquinaBiceps()
            }
            if(Abs.length > 0){
                //document.getElementById("camesMaquinesContainerCreator").innerHTML = innerHTML + crearAbs()
            }
            if(Correr.length > 0){
                //document.getElementById("camesMaquinesContainerCreator").innerHTML = innerHTML + crearCorrer()
            }

        })
        .catch(error => {
            console.error('Error:', error)
        });
}