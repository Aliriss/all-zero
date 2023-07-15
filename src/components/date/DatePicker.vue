<template>
  <template v-if="dimDate === '1' || dimDate === 1 || dimDate === 'date'">
    <a-range-picker
        v-model:value="dateRange"
        format="YYYY-MM-DD"
        valueFormat="YYYY-MM-DD"
        :bordered="false"
        @change="dateChange"
    /></template>
  <template v-if="dimDate === '2' || dimDate === 2 || dimDate === 'week'">
    <a-date-picker
        :value="opDate"
        picker="week"
        format="YYYYww"
        valueFormat="YYYYww"
        @change="dateChange"
        :bordered="false"></a-date-picker>
  </template>
  <template v-if="dimDate === '3' || dimDate === 3 || dimDate === 'month'">
    <a-date-picker
        :value="opDate"
        picker="month"
        format="YYYY-MM"
        valueFormat="YYYY-MM"
        @change="dateChange"
        :bordered="false"></a-date-picker>
  </template>
  <template v-if="dimDate === '4' || dimDate === 4 || dimDate === 'quarter'">
    <a-date-picker
        :value="opDate"
        picker="quarter"
        format="YYYYQ"
        valueFormat="YYYYQ"
        @change="dateChange"
        :bordered="false"></a-date-picker>
  </template>
  <template v-if="dimDate === '5' || dimDate === 5 || dimDate === 'year'">
    <a-date-picker
        :value="opDate"
        picker="year"
        format="YYYY"
        valueFormat="YYYY"
        :bordered="false"></a-date-picker>
  </template>
</template>

<script lang="ts">
import moment from 'moment';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';

@Options({
  name: 'DatePicker',
  props: {
  },
  emits: [
    'change'
  ]
})
export default class DatePicker extends Vue {
  @Prop({required: true})
  dimDate!: string|number;
  @Prop({default: moment().format('YYYY-MM')})
  opDate!: any;
  @Prop({default: moment().format('YYYY-MM')})
  startDate!: any;
  @Prop({default: moment().format('YYYY-MM')})
  endDate!: any;
  dateRange: any = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]

  @Watch('dateRange, opDate', {deep: true})
  dateChange(dates: any) {
    this.$emit('change', dates)
  }

}
</script>

<style scoped lang="less">

</style>