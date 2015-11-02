/**
 * Created by alessandroromano on 02/11/15.
 */
$(document).ready(function () {

  // validate signup form on keyup and submit
  $("#register-form").validate({
    debug: true,
    rules: {
      completename: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        minlength: 8
      },
      repeatpassword: {
        required: true,
        minlength: 8,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      completename: "Per favore, inserisci nome e cognome",
      password: {
        required: "Per favore, inserisci la password",
        minlength: "La password deve essere lunga almeno 8 caratteri"
      },
      repeatpassword: {
        required: "Per favore, conferma la password",
        minlength: "La password deve essere lunga almeno 8 caratteri",
        equalTo: "Per favore, le password devono essere identiche"
      },
      email: "Per favore, inserisci una mail valida"
    },
    submitHandler: function(form) {
      console.log('Form valido!');
      $(form).ajaxSubmit();
    },
    errorClass: "error",
    validClass: "success"
  });

}); // end document.ready