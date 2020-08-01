<template>
  <div class="container">
    <header>
      <h1>
        Hãy <strong>{{ modeMessage }}</strong> để trò chuyện với bạn bè nào !!
      </h1>
      <h2>Chào mừng bạn đến với app chat</h2>

      <nav class="codrops-demos">
        <a
          v-bind:class="{ 'current-demo': isLogin }"
          id="sign_in"
          style="cursor:pointer;"
          v-on:click="signIn"
        >Sign In</a>
        <a
          v-bind:class="{ 'current-demo' : !isLogin }"
          id="sign_up"
          style="cursor:pointer;"
          v-on:click="signUp"
        >Sign Up</a>
      </nav>

      <div class="support-note">
        <span class="note-ie">Sorry, only modern browsers.</span>
      </div>
    </header>
      <transition name="fade">
    <Login v-if="isLogin" />
    </transition>
    <transition name="slide-fade">
    <Register v-if='!isLogin' />
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';

import axios from 'axios';

import Register from "@/components/Login/Register.vue";
import Login from "@/components/Login/Login.vue";

Vue.component('Register',Register);
Vue.component('Login',Login);

export default {
  name: "LoginCard",
  data() {
    return {
      modeMessage: "Đăng nhập",
      isLogin: true,
    };
  },
  components: {
    Register,
    Login,
  },
  methods: {
    signIn: function () {
      this.isLogin = true;
      this.modeMessage = "Đăng nhập";
    },
    signUp: function () {
      this.isLogin = false;
      this.modeMessage = "Đăng kí";
    }
  },
  //trước khi thực hiện gắn kết các component thì phải gửi 1 request GET để lấy về csrfToken
  beforeMount:async function(){
    await axios
      .get("http://localhost:8080/api/init",
      {withCredentials: true})
      .then((response) => (this.info = response.data))
      .catch((error) => console.log(error));
  }
};
</script>

<style scoped>

.fade-enter-active {
  transition: all 2s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter{
  transform: translateY(-200px);
  opacity: 0;
}
.fade-leave-to{
  transform: translateY(-250px);
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter
/* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
  transform: translateY(200px);
  opacity: 0;
}
.slide-fade-leave-to{
  opacity: 0;
  transform: translateY(250px);
}
</style>