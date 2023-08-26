<template>
  <div class="teamInfoPages">
    <div class="">
      <!-- <CheckBox></CheckBox> -->
    </div>
    <div class="">
      <!-- <Table></Table> -->
    </div>
    <div class="">
      <!-- <TestTable></TestTable> -->
    </div>
    <div class="">
      <elementTree></elementTree>
    </div>
  </div>
</template>
<script>
import Table from "./customComponent/normalTable.vue";
import TestTable from "./customComponent/testTable.vue";
import CheckBox from "./customComponent/checkboxWeek.vue";
import elementTree from "./customComponent/elementTree.vue";
export default {
  components: { Table, CheckBox, TestTable, elementTree }
};
</script>
