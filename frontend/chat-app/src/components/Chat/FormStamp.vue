<template>

  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12">
      <ul class="slide-bar">
          <li v-for="index in numberOfStamp" :key="index">
              <img v-if="index >= 10" v-bind:src="host + index + ext" alt="">
              <img v-if="index < 10" v-bind:src="host + '0' + index + ext" alt="">
          </li>
      </ul>
    </div>
  </div>

</template>

<script>

//v-for bắt đầu từ 1 đến =
export default {
  data() {
    return {
      numberOfStamp: 24,
      host: "http://localhost:8080/img/stamps/",
      ext: ".png"
    };
  },
  methods: {},
  props: {},
  name: "FormStamp",
};
</script>

<style scoped>
@import '../../assets/LocalCss/Chat/FormMessage/stamp.css';
</style>