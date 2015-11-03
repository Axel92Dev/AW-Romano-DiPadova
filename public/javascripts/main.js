var REST_PROT = window.location.href.split('/')[0];
var REST_URL = window.location.href.split('/')[2];


/**
 * Created by alessandroromano on 02/11/15.
 */
$(document).ready(function () {

  // validate signup form on keyup and submit
  $("#register-form").validate({
    debug: false,
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
    submitHandler: function (form) {
      console.log('Form valido!');
      sendRegistration();
    },
    errorClass: "error",
    validClass: "success"
  });

  if ($('#loggedIn').length > 0) {
    getMyLists();
  }

  $('#listContainerModal').on('show.bs.modal', function (e) {
    console.log(e.relatedTarget);
    $('.modal-body', this).html(render('list', {}));
  })

}); // end document.ready

function sendRegistration() {
  //$.ajax({
  //
  //});
}

function doLogin() {

}

function getMyLists() {
  //$('body').html(render('myLists', {}));
}

function addNewList() {

}

function getItemsOfList(listId) {

}

function addNewItemToList(listId) {

}

function changeItemState(listId, itemId, state) {

}

function getAllUsers() {

}

function shareListWithUser(userId, permissions) {

}

// And this is the definition of the custom function
function render(tmpl_name, tmpl_data) {
  if (!render.tmpl_cache) {
    render.tmpl_cache = {};
  }

  if (!render.tmpl_cache[tmpl_name]) {
    var tmpl_dir = '/handlebarsTemplate';
    var tmpl_url = tmpl_dir + '/' + tmpl_name + '.hbs';

    var tmpl_string;
    $.ajax({
      url: tmpl_url,
      method: 'GET',
      async: false,
      success: function (data) {
        tmpl_string = data;
      }
    });

    render.tmpl_cache[tmpl_name] = Handlebars.compile(tmpl_string);
  }

  return render.tmpl_cache[tmpl_name](tmpl_data);
}