//Navbar

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

//Fondo Scroll Navbar

window.addEventListener('DOMContentLoaded', function() {
  var menu = document.querySelector('header');
  var logos = document.querySelectorAll('.logo i, .logo, .tiempo');

  function checkScrollPosition() {
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
      menu.classList.add('background');
      logos.forEach(function(logo, tiempo) {
        logo.style.color = 'darkblue';
      });
    } else {
      menu.classList.remove('background');
      logos.forEach(function(logo) {
        logo.style.color = 'white'; 
      });
    }
  }

  setTimeout(checkScrollPosition, 100);

  window.addEventListener('scroll', checkScrollPosition);
});


//Formulario

const formulario = document.querySelector("#formulario");
//crear evento
formulario.addEventListener("submit", validarFormulario);
//funciones

function validarFormulario(e) {
    e.preventDefault();
    const NOMBRE = document.querySelector("#name").value;
    var solotexto="^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    if(  NOMBRE.match(solotexto) == null ) { return alert("El nombre debe ser tipo texto");}
   
    const EMAIL = document.querySelector("#e-mail").value;
    var ValidaEmail= /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
 
    if( EMAIL.match(ValidaEmail == null)){ return alert ("El correo electronico debe tener el formato aaaa@email.com");}
    const TELEFONO = document.querySelector("#telefono").value;
    if( !(/^\d{10}$/.test(TELEFONO)) ) { return alert ("El telefono debe ser numerico y de 10 números de largo") ;}
    const ASUNTO = document.querySelector("#asunto").value;
    if(  ASUNTO.match(solotexto) == null ) { return alert("El asunto debe ser tipo texto");}
    const MENSAJE = document.querySelector("#msj").value;
    if(  MENSAJE.match(solotexto) == null ) { return alert("El mensaje debe ser tipo texto");}

    var templateParams = {
        name : NOMBRE,
        email : EMAIL,
        telefono : TELEFONO,
        asunto : ASUNTO,
        msj : MENSAJE
    };
   
     enviarMail(templateParams);
    
}



function enviarMail(templateParams) {
    const PUBLIC_KEY = 'vzXI7eKkzUIcK3Qfd';
    const contact_service = 'service_t5bk7vh';
    const contact_form = 'template_um8gjrn';
    emailjs.init(PUBLIC_KEY);
    emailjs.send(contact_service, contact_form, templateParams)
                 .then(function () {
                     console.log('ENVIADO...');
                     document.getElementById("formulario").reset();
                     return alert ("El correo electronico fue enviado");
                     

                 }
                     , function (error) {
                      return alert ("El correo electronico no fue enviado");
                     });
}

// Menu Hamburguesa
const nav = document.querySelector('#nav');
const abrir = document.querySelector('#abrir');
const cerrar = document.querySelector('#cerrar');

abrir.addEventListener('click', () => {
  nav.classList.add('visible');
})

cerrar.addEventListener('click', () => {
  nav.classList.remove('visible');
})

    
//Carrusel
const cantcabanias = document.querySelector('.contenedor-alojamiento').children.length;
//declaración de vectores
const carouselImages = [];
const carouselButtons = [];
const transf = [];
let currentImageIndex = [];
// carga de vectores de cada cabaña
for (let nrocabania = 0; nrocabania < cantcabanias; nrocabania++) {
    currentImageIndex.push(0);
    carouselImages.push(document.querySelectorAll('#cabania' + nrocabania + ' .carousel-images img'));
    carouselButtons.push(document.querySelectorAll('#cabania' + nrocabania + ' button'));
    transf.push(document.querySelector('#cabania' + nrocabania + ' .carousel-images'));
}
function showImage(imageIndex, nrocabania) {
    let mitad = document.querySelector('#cabania' + nrocabania + ' .carousel-bkg img').width / 2;
    carouselImages[nrocabania][currentImageIndex[nrocabania]].classList.remove('active');
    carouselImages[nrocabania][imageIndex].classList.add('active');
    let anchobox = -100;
    let oper = imageIndex * anchobox;
    //posiciona el item actual al centro
    // transf[nrocabania].style.transform = 'translateX(' + (oper + mitad + (anchobox/2)) + 'px )';
    //actualiza el fondo con el item elegido
    fondo = document.querySelector('#cabania' + nrocabania + ' #img-bkg');
    fondo.src = carouselImages[nrocabania][imageIndex].src;
    currentImageIndex[nrocabania] = imageIndex;

    //Se regula la opacidad de cada slide para que las más alejadas no obstruyan la lectura
    for (let index = 0; index < carouselImages[nrocabania].length; index++) {
        const imagen = carouselImages[nrocabania][index];
        let distancia = Math.abs(index - currentImageIndex[nrocabania]);
        opacidad = (1 - (distancia / carouselImages[nrocabania].length))*.5;
        imagen.style.opacity = opacidad;
    }
}
//Carga acciones de eventos de cada carrusel de cabaña
for (let nrocabania = 0; nrocabania < cantcabanias; nrocabania++) {
    carouselButtons[nrocabania][0].addEventListener('click', () => {
        if (currentImageIndex[nrocabania] === 0) {
            showImage(carouselImages[nrocabania].length - 1, nrocabania);
        } else {
            showImage(currentImageIndex[nrocabania] - 1, nrocabania);
        }
    });
    carouselButtons[nrocabania][1].addEventListener('click', () => {
        if (currentImageIndex[nrocabania] === carouselImages[nrocabania].length - 1) {
            showImage(0, nrocabania);
        } else {
            showImage(currentImageIndex[nrocabania] + 1, nrocabania);
        }
    });
    //actualiza el carrusel para mostrar la primer imagen
    showImage(0, nrocabania);

}

//API Clima
let KEY = "c81204ea80c1b3e98945d4d1fcab18ab"
let url = 'https://api.openweathermap.org/data/2.5/weather?lat=-32.95&lon=-69.18333&appid=' + KEY + '&units=metric&lang=es'

fetch(url) 
.then(Response => Response.json())
.then(data => mostrartiempo(data))
.catch(error => console.log("Error", error))
let tiempo = "";

const mostrartiempo = (data) => {
    tiempo = '<h4>Temperatura en Potrerillos: </h4> <a>'+data.main.temp+' °C</a>'
    

document.getElementById("tiempo").innerHTML = tiempo;
}
