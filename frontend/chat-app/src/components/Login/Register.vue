<template>
  <section class="main" id="register_form">
    <div class="form-1">
      <div class="my-alert alert-danger" v-if="errors.errorName">
        <p>First and Last Name are not null!!!</p>
      </div>
      <p class="field" style="display:flex;" v-on:click="errors.errorName = false">
        <input
          type="text"
          name="first_name"
          id="first_name"
          v-model="firstName"
          placeholder="Your first name"
          style="width: 50%;"
        />
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <input
          type="text"
          name="last_name"
          id="last_name"
          v-model="lastName"
          placeholder="Your last name"
          style="width: 50%;padding-left: 15px;"
        />
      </p>
      <div class="alert-danger my-alert" v-if="errors.errorEmail">
        <p>Email is incorrect!!! or someone has been used!</p>
      </div>
      <p class="field">
        <input type="text" name="email" id="email" v-model="email" v-on:click="errors.errorEmail = false" placeholder="email" />
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </p>
      <div class="my-alert alert-danger" v-if="errors.errorPassword">
        <p>Password is incorrect!!!</p>
      </div>
      <p class="field">
        <input
          type="password"
          name="register_password"
          id="register_password"
          v-model="password"
          v-on:click="errors.errorPassword = false"
          placeholder="Password"
        />
        <i class="fa fa-lock" aria-hidden="true"></i>
      </p>
      <div class="my-alert alert-danger" v-if="errors.errorConfirmPassword">
        <p>Password is not same site!!!</p>
      </div>
      <p class="field">
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          v-model="confirmPassword"
          v-on:click="errors.errorConfirmPassword = false"
          placeholder="Confirm Password"
        />
        <i class="fa fa-lock" aria-hidden="true"></i>
      </p>
      <p class="submit">
        <button type="submit" v-on:click="register">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </p>
    </div>
  </section>
</template>

<script>
//import vue
import Vue from "vue";
//import axios
import axios from "axios";

//import để tạo cái display loading
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

export default {
  name: "Register",
  data() {
    return {
      errors: {
        errorName: false,
        errorEmail: false,
        errorPassword: false,
        errorComfirmPassword: false,
      },
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      info: null,

      fullPage: true,
    };
  },
  methods: {
    register: async function() {
      if(!this.checkName(this.firstName,this.lastName)){
        this.errors.errorName = true;
        return;
      }
      if (!this.checkEmail(this.email)) {
        this.errors.errorEmail = true;
        return;
      }
      if (!this.checkPass(this.password)) {
        this.errors.errorPassword = true;
        return;
      }
      if(!this.checkConfirmPass(this.password, this.confirmPassword)){
        this.errors.errorComfirmPassword = true;
        return;
      }
      try {
        //hiển thị component loading
        let loader = this.$loading.show({
          // Optional parameters
          container: this.fullPage ? null : this.$refs.formContainer,
          canCancel: false,
          onCancel: this.onCancel,
        });
        //gửi request
        await axios
          .post("http://localhost:8080/api/register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          })
          .then((response) => (this.info = response.data))
          .catch((error) => console.log(error));
        //xử lý sau khi lấy dữ lieueu=j thành công
        loader.hide(); //ẩn component loading

        if (this.info.result) {
          alert('Register success!!! Let\'s login now');
          this.$router.push("/");
        } else {
          if (this.info.error === "email") {
            this.errors.errorEmail = true;
          } else if(this.info.error === "password") {
            this.errors.errorPassword = true;
          } else{
            this.errors.errorName = true;
          }
        }
      } catch (error) {}
    },
    checkPass(password) {
      var regPass = /^(?=.*[a-z0-9]).{8,}$/;
      return regPass.test(password);
    },
    checkEmail(email) {
      var regEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i;
      return regEmail.test(email);
    },
    checkConfirmPass(password,confirmPassword) {
      return password.localeCompare(confirmPassword) == 0;
    },
    checkName(firstName, lastName){
      if(firstName != null && lastName != null)
        return (firstName.length > 0 && lastName.length > 0);
      return false;
    },

  },
  component:{
    Loading
  }
};
</script>

<style scoped>
@import "../../assets/LocalCss/Login/Login-Register.css";
</style>