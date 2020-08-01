<template>
  <div class="container" style="width: 80%;">
    <section>
      <FormMessage v-bind:name="name" />
      <FormStamp />
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import FormMessage from "@/components/Chat/FormMessage.vue";
import FormStamp from "@/components/Chat/FormStamp.vue";
Vue.component("FormMessage", FormMessage);
Vue.component("FormStamp", FormStamp);
export default {
  watch: {},
  name: "Feed",
  beforeMount: async function () {
    //gửi request
    await axios
      .get("http://localhost:8080/api/user", { withCredentials: true })
      .then((response) => (this.info = response.data))
      .catch((error) => console.log(error));
    if (this.info.result) {
      this.name = this.info.userName;
    } else {
      this.$router.push("/");
    }
  },
  data() {
    return {
      name: null,
      infor: null,
    };
  },
  component: {
    FormMessage,
  },
};
</script>
<style scoped>
</style>