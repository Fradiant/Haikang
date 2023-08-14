<template>
  <el-button :class="'button_circle ' + buttonClass + ' '+ disabledClass" :title="title" :icon="classname" type="icon"
    @click="onclick" />
</template>

<script>
  export default {
    name: "DefualtButton",
    props: {
      buttonClass: {
        type: String,
        default () {
          return "";
        }
      },
      classname: {
        type: String,
        default () {
          return "";
        }
      },
      title: {
        type: String,
        default () {
          return "";
        }
      },
      disabledClass: {
        type: String,
        default () {
          return "";
        }
      }
    },
    methods: {
      onclick () {
        this.$emit("click-event");
      }
    }
  };
</script>

<style scoped>

</style>