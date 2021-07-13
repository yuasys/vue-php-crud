let app = new Vue({
  el: "#app",
  data() {
    return {
      showAlertSuccess: false,
      showAlertError: false,
      showAddUserModal: false,
      showEditModal: false,
      showDeleteModal: false,
      userList: [],
      addNewUserData: { "name": "", "email": "", "phone": "" },
      selectedUser: { "name": "", "email": "", "phone": "" },
      errorMessage: "",
      successMessage: ""
    }
  },
  mounted() {
    this.readUsers();
  },
  watch: {
    successMessage(newVal) {
      if (newVal) {
        this.readUsers();
      }
    }
  },
  methods: {
    readUsers() {
      axios.get("http://server.test.com/vue-php-crud/users.php?action=read").then(function (response) {
        app.userList = response.data.users;
      })
    },
    createNewUser() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.addNewUserData);

      axios.post("http://server.test.com/vue-php-crud/users.php?action=create", formData).then(function (response) {
        if (response.data.error) {
          app.errorMessage = response.data.message;
        } else {
          app.successMessage = response.data.message;
          app.selectedUser = { "name": "", "email": "", "phone": "" };
        }
        addNewUserData = {"name": "","email": "","phone": "" }
      });
    },
    updateUser() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.selectedUser);

      axios.post("http://server.test.com/vue-php-crud/users.php?action=update", formData).then(function (response) {
        if (response.data.error) {
          app.errorMessage = response.data.message;
        } else {
          app.successMessage = response.data.message;
          
        }
        app.selectedUser = {"name": "", "email": "", "phone": "" };
      });
    },
    deleteUser() {
      app.errorMessage = "";
      app.successMessage = "";

      let formData = this.convertToFormData(app.selectedUser);

      axios.post("http://server.test.com/vue-php-crud/users.php?action=delete", formData).then(function (response) {
        if (response.data.error) {
          app.errorMessage = response.data.message;
        } else {
          app.successMessage = response.data.message;
          
        }
        app.selectedUser = {"name": "", "email": "", "phone": ""};
      });
    },
    convertToFormData(data) {
      let fd = new FormData();

      for (value in data) {
        fd.append(value, data[value]);
      }
      
      return fd;
    },
    chooseUser(userData) {
      app.selectedUser = Object.assign({}, userData);
    }


  }
});
