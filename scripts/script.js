//chamada da função que inverte a ordem as sections, passando como parâmetro o id das mesmas//
inverterPosicoes('#s1', '#s2', '#s3');

//Função para inverter os elementos do html//
function inverterPosicoes(el1, el2, el3) {
    var el = [ $(el1), $(el2), $(el3) ];

    shuffleArray(el);

    var prev = el[0].prev();
    var prev2 = el[2].prev();
    var parent = el[0].parent();

    el[1].after(el[0]);

    if(prev.length) {
        prev.after(el[1]);
        prev2.after(el[2]);
    } else {
        parent.prepend(el[1]);
    }
}

//Função para embaralhar o array da função inverterPosicoes//
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return(array[j]);
    }
}

//comando para tornar dinâmico a descrição da empresa
$(document).ready(function(){
    $(".desc").hide();
    $("#p-desc").hide();
    $(".desc").slideToggle(800);
    setTimeout(function(){
        $("#p-desc").slideToggle(800);
    }, 900);
    
});

//Evento com a função de dar estilo de uma maquina de escrever
document.addEventListener('DOMContentLoaded',function(event){
    var dataText = [ "Saiba mais", "Sobre nós" ];

    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.querySelector("#titulo-h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 500);
        }
    }

    function StartTextAnimation(i) {
        if (typeof dataText[i] == 'undefined'){
            setTimeout(function() {
                StartTextAnimation(0);
            }, 10000);
        }
        setTimeout(function(){
            if (i < dataText[i].length) {
            typeWriter(dataText[i], 0, function(){
                StartTextAnimation(i + 1);
            });
        }}, 800);
    }
    
    StartTextAnimation(0);
});

//função para trocar o tipo de menu quando a tela diminuir//
$(function(){
    $(".button-collapse").sideNav();
});

//Função para validar o email com dominio @upf.br//
function validarEmail(form) {
    var email = document.getElementById("email").value;
    var dominio = email.split(["@"]);
    var nav = " ";
    
    
    if (dominio[1] !== "upf.br") { 
        if (nav = navigator.userAgent.toLowerCase().indexOf('op') > -1) {
            Swal.fire({
                title: 'Email inválido!',
                text: 'Informe um email com dominio "upf.br"',
                imageUrl: 'Images/opera-logo.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Logo da Opera',
            })
        } else if (nav = navigator.userAgent.indexOf('MSIE') > -1) {
            Swal.fire({
                title: 'Email inválido!',
                text: 'Informe um email com dominio "upf.br"',
                imageUrl: 'Images/Edge-logo.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Logo da Edge',
            })
        } else if (nav = navigator.userAgent.indexOf('Firefox') > -1) {
            Swal.fire({
                title: 'Email inválido!',
                text: 'Informe um email com dominio "upf.br"',
                imageUrl: 'Images/Firefox_logo.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Logo da Firefox',
            })
        } else if (nav = navigator.userAgent.indexOf('Chrome') > -1) {
            Swal.fire({
                title: 'Email inválido!',
                text: 'Informe um email com dominio "upf.br"',
                imageUrl: 'Images/google-logo.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Logo da google',
            })
        } else if (nav = navigator.userAgent.indexOf('Safari') > -1) {
            Swal.fire({
                title: 'Email inválido!',
                text: 'Informe um email com dominio "upf.br"',
                imageUrl: 'Images/Safari-logo.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Logo da safari',
            })
        }
        return false;
    } else {
        Swal.fire({
            title: 'Email válido',
            width: 600,
            padding: '3em',
            background: '#fff',
            timer: 10000,
            backdrop: `
                rgba(98, 175, 98, 0.473)
                url('Images/alienpls.gif')
                left top
                repeat
            `
        })
        return true;
    }
}

//função para pegar os dados da url
function getUrlVars() {
	var i;
	var vars = new Array();
	var parteString;
	var todaString = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

	for (var i = 0; i < todaString.length - 1; i++) {
    	parteString = todaString[i].split('=');    
		parteString[1] = decodeURI(parteString[1]);
    	vars.push(parteString[0]);
    	vars[parteString[0]] = parteString[1];
	}

	return vars;
}


var result = getUrlVars();
var i, nomeVar;

var old = localStorage.getItem("testJSON");
if(old) { 
	old = old.substring(1);
	old = old.substring(0, old.length - 1);
}

if(result.length > 0) {
	var myObjJSON = "{";

	for(i = 0; i < result.length; i++) {
	    nomeVar = result[i];
		myObjJSON += "\"" + nomeVar + "\"" + ":\"" + (result[nomeVar] != "" ? result[nomeVar] : "null") + "\"";
		if(i != result.length - 1) 
			myObjJSON += ",";
		else  
			myObjJSON += "}";
	}
	var data = old ? old + "," + myObjJSON : myObjJSON;
	data = "[" + data + "]";
	
	localStorage.setItem("testJSON", data);
}

text = localStorage.getItem("testJSON");
obj = JSON.parse(text);

var txt = "";

for (objDados of obj) {

	var count = 0;
    for (campo in objDados) {
        if (Object.prototype.hasOwnProperty.call(objDados, campo)) {
            count++;
        }
	}
	
	var tamanho = 0;
	for(campo in objDados) {
		txt += campo + ": " + objDados[campo];
 		if(tamanho != count-1)
 			txt += ", ";
 		else
 			txt += ".";
 		tamanho++;
	}
	txt += "<br>";
}