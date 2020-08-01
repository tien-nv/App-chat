<template>
  <section class="main" id="login_form">
    <div class="form-1">
      <div class="alert-danger my-alert" v-if="errors.errorEmail"><p>Email is incorrect!!!</p></div>
      <p class="field">
        <input type="text" name="email" v-on:click="errors.errorEmail = false" v-model="email" placeholder="Email" />
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </p>
      <div class="my-alert alert-danger" v-if="errors.errorPassword"><p>Password is incorrect!!!</p></div>
      <p class="field">
        <input type="password" name="login_password" v-on:click="errors.errorPassword = false" v-model="password"  placeholder="Password" />
        <i class="fa fa-lock" aria-hidden="true"></i>
      </p>
      <p class="submit">
        <button type="submit" v-on:click="login">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </p>
    </div>
  </section>
</template>

<script>
//import vue
import Vue from "vue";
import axios from "axios";

//import để checkLogin trong 1 phiên làm việc
import store from "@/store";

//import để tạo cái display loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import VueCookies from "vue-cookies";
Vue.use(VueCookies);

export default {
  name: "Login",
  data() {
    return {
      errors: {
        errorEmail: false,
        errorPassword: false
      },
      email: null,
      password: null,
      info: null,

      fullPage: true,
    };
  },
  methods: {
    login: async function () {
      // alert();
      if(!this.checkEmail(this.email)){
        this.errors.errorEmail = true;
        return;
      }
      if(!this.checkPass(this.password)){
        this.errors.errorPassword = true;
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
          .post("http://localhost:8080/api/login",
          {email:this.email,
          password:this.password,
          _csrfToken: this.$cookies.get('csrfToken')
          },
          {withCredentials: true},
          )
          .then((response) => (this.info = response.data))
          .catch((error) => console.log(error));
        //xử lý sau khi lấy dữ lieueu=j thành công
        loader.hide(); //ẩn component loading

        if(this.info.result){
          this.$router.push('/feed');
        }else{
          if(this.info.error === 'email'){
            this.errors.errorEmail = true;
          }else{
            this.errors.errorPassword = true;
          }
        }
      } catch (error) {}
    },
    checkEmail: function(email){
      var regEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i;
      return regEmail.test(email);
    },
    checkPass: function(password){
      var regPass = /^(?=.*[a-z0-9]).{8,}$/;
      return regPass.test(password);
    },
  },
  component:{
    Loading
  }
};
</script>

<style scoped>
@import '../../assets/LocalCss/Login/Login-Register.css';
</style>