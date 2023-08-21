<template>
  <div class="teamInfoPages">
    <div class="">
      <!-- <CheckBox></CheckBox> -->
    </div>
    <div class="">
      <!-- <Table></Table> -->
    </div>
    <div class="">
      <TestTable></TestTable>
    </div>
  </div>
</template>
<script>
import Table from "./customComponent/table.vue";
import TestTable from "./customComponent/testTable.vue";
import CheckBox from "./customComponent/checkboxWeek.vue";
export default {
  components: { Table, CheckBox, TestTable }
};
</script>
