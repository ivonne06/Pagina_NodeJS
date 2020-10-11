//Ivonne Estefany Delgado Landaverde DL191114

var formulario = document.getElementById("formulario"),
  inputs = document.querySelectorAll("#formulario input");

//  Variable de informacion en formato JSON
var informacion = [
  {
    dui: "00000000-0",
    nit: "9999-999999-999-9",
    telefono: "7000-1234",
    correo: "putin@gmail.com",
    sugerencia: "sigan asi",
  },
];

//Expresiones regulares para validar los campos
var expresiones = {
  dui: /^[0-9]{8}\-\d$/, // dui 00000000-0
  nit: /^\d{4}\-\d{6}\-\d{3}\-\d$/, // nit 9999-999999-999-9
  telefono: /^\d{4}\-?\d{4}$/, // 8 numeros, ####-#### o ########
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/,
};

var campos = {
  dui: false,
  nit: false,
  telefono: false,
  sugerencia: false,
};

//valida los inputs dentro del formulario
var validarFormulario = (e) => {
  switch (e.target.name) {
    case "dui":
      validarCampo(expresiones.dui, e.target, "dui");
      break;
    case "nit":
      validarCampo(expresiones.nit, e.target, "nit");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
  }
};

//valida la informacion dentro de los inputs con las expresiones regulares
var validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
};

//agrega eventos a los inputs
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

//valida que el textarea no quede vacio
formulario.sugerencia.addEventListener("blur", (expresion) => {
  if (formulario.sugerencia.value !== "") {
    document
      .getElementById(`grupo__sugerencia`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__sugerencia`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__sugerencia i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__sugerencia i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__sugerencia .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["sugerencia"] = true;
  } else {
    document
      .getElementById(`grupo__sugerencia`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__sugerencia`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__sugerencia i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__sugerencia i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__sugerencia .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["sugerencia"] = false;
  }
});

var b = false;

//envia la informacion del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (campos.dui && campos.nit && campos.telefono && campos.sugerencia) {
    if (guardarinfo(b)) {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.add("formulario__mensaje-exito-activo");
      setTimeout(() => {
        document
          .getElementById("formulario__mensaje-exito")
          .classList.remove("formulario__mensaje-exito-activo");
      }, 3000);
      document
        .getElementById("formulario__mensaje1")
        .classList.remove("formulario__mensaje-activo");
    }
  } else {
    document
      .getElementById("formulario__mensaje1")
      .classList.add("formulario__mensaje-activo");
  }
});

function guardarinfo() {
  var pdui = document.getElementById("dui").value,
    pnit = document.getElementById("nit").value,
    ptelefono = document.getElementById("telefono").value,
    pcorreo = document.getElementById("correo").value,
    psugerencia = document.getElementById("sugerencia").value;
    delete newinfo;  
  //valido si ya existe el dui y el nit ingresado
  var encontrar = informacion.find((elemento) => {
    if ((elemento.dui !== pdui) && (elemento.nit !== pnit)) {
      newinfo = {
        dui: pdui,
        nit: pnit,
        telefono: ptelefono,
        correo: pcorreo,
        sugerencia: psugerencia,
      };
      document
        .getElementById("formulario__mensaje1")
        .classList.remove("formulario__mensaje-activo");
      document
        .getElementById("formulario__mensaje2")
        .classList.remove("formulario__mensaje-activo");

      document
        .getElementById("formulario__mensaje-exito")
        .classList.add("formulario__mensaje-exito-activo");

      informacion.push(newinfo);  
      b=true;
    } else {
      document
        .getElementById("formulario__mensaje1")
        .classList.remove("formulario__mensaje-activo");
      document
        .getElementById("formulario__mensaje2")
        .classList.add("formulario__mensaje-activo");
        b=false;
    }
  });
  console.log(informacion);
}