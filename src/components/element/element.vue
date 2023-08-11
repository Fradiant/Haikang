<template>
    <div class="teamInfoPages">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedWeeks" @change="handleCheckedWeeksChange">
            <el-checkbox v-for="week in WeekDays" :label="week.value" :key="week.value"
                :disabled="week.value === selectWeekDay" :checked="week.value === selectWeekDay">{{ week.label
                }}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    data() {
        return {
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            selectWeekDay: "1",
            checkedWeeks: [],
            weeks: [],
            WeekDays: [{
                label: "星期一",
                value: "1"
            }, {
                label: "星期二",

                value: "2"
            }, {
                label: "星期三",

                value: "3"

            }, {
                label: "星期四",

                value: "4"
            }, {
                label: "星期五",

                value: "5"
            }, {
                label: "星期六",

                value: "6"
            }, {
                label: "星期七",

                value: "7"
            }],
        };
    },
    watch:{
        checkedWeeks:function(val){
            console.log(val)
        }
    },
    mounted(){
        this.handleCheckAllChange(false)
    },
    methods: {
        handleCheckAllChange(val) {
            console.log(val)
            let allWeeks = [];
            this.WeekDays.forEach(item => {
                allWeeks.push(item.value);
            });
            this.weeks = allWeeks;
            const index = allWeeks.findIndex(item => item === this.selectWeekDay);
            let selectWeek = [];
            selectWeek.push(allWeeks[index]);
            this.checkedWeeks = val ? allWeeks : selectWeek;
            this.isIndeterminate = false;
        },
        handleCheckedWeeksChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.WeekDays.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.WeekDays.length;
            console.log(this.weeks)
            console.log(this.isIndeterminate)
        },
    }
};
</script>