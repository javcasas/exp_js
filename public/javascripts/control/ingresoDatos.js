//var placa;

//validadores

//ingreso de parametros
function ingresoDatosPlaca() {
    //ingreso de placa
    console.log("This should be undefined:", placa);
    var placa = document.getElementById("placaInp").value;
    //validar placa
    if(!validarPlaca(placa)){
        console.log("Error: placa no valida")
        window.alert("Error: placa no valida")
    } else {
        console.log("Ingresado: "+ placa)
        window.alert("Ingresado:"+ placa)
    }
    
}
