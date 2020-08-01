<template>
<div>
  <div class="row form-input">
    <div class="col-sm-12 col-md-1 col-lg-1">
      <span class="name">Name:</span>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-7">
      <input type="text" id="username" class="form-control" v-bind:value="name" disabled />
    </div>
    <div class="col-sm-2 col-md-1 col-lg-1">
      <button class="btn btn-dark" id="send_message">POST</button>
    </div>
    <!-- <div class="col-sm-2 col-md-1 col-lg-1">
                    <button class="btn btn-warning" id="hover" style="display:none;">EDIT</button>
    </div>-->
    <div class="col-sm-4 col-md-4 col-lg-2">
      <label for="file" class="btn btn-warning">CHOSE FILE</label>
      <input type="file" name="file" id="file" style="display:none;" />
    </div>
    <div class="col-sm-2 col-md-1 col-lg-1">
      <a href="/logout">
        <button class="btn btn-danger" id="logout">LOGOUT</button>
      </a>
    </div>
  </div>
  <div class="row form-input">
    <div class="col-sm-12 col-md-1 col-lg-1">
      <span class="name">Message:</span>
    </div>
    <div class="col-sm-12 col-md-11 col-lg-11">
      <textarea class="form-control" id="message" rows="5" placeholder="insert your message"></textarea>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  name: "FormMessage",
};
</script>

<style>
@import "../../assets/LocalCss/Chat/FormMessage/form.css";
</style>