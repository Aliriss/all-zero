<template>
  <div class="date-content">
    <!--时间粒度展示区域-->
    <template v-for="dim in dimDateList" :key="dim">
      <!--时间粒度展示区域-->
      <a-button v-if="dim === '1'" :type="dim === defaultDimDate ? 'primary' : 'default'" @click="changeDim(dim)">日</a-button>
      <a-button v-if="dim === '2'" :type="dim === defaultDimDate ? 'primary' : 'default'" @click="changeDim(dim)">周</a-button>
      <a-button v-if="dim === '3'" :type="dim === defaultDimDate ? 'primary' : 'default'" @click="changeDim(dim)">月</a-button>
      <a-button v-if="dim === '4'" :type="dim === defaultDimDate ? 'primary' : 'default'" @click="changeDim(dim)">季</a-button>
      <a-button v-if="dim === '5'" :type="dim === defaultDimDate ? 'primary' : 'default'" @click="changeDim(dim)">年</a-button>
    </template>
    <!--时间选择区域-->
    <date-picker
        v-if="defaultDimDate"
        :dimDate="defaultDimDate"
        :op-date="opDate"
        :start-date="startDate"
        :end-date="endDate"
        @change="dateChange"
    />
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/date/DatePicker.vue';
import moment from 'moment/moment';
import { Options, Prop, Vue, Watch } from 'vue-property-decorator';

@Options({
  name: 'Date',
  components: {DatePicker},
  props: {
  },
  emits: [
    'change', 'dimChange'
  ]
})
export default class Date extends Vue {
  // 经过转换的时间粒度数组，用于展示一个或多个时间选择器
  dimDateList: any;
  // 传入的时间粒度，用于展示时间选择组件
  @Prop({required: true})
  dimDate!: [string, string];
  // 默认时间粒度
  @Prop({required: true})
  defaultDimDate!: string | number;
  @Prop({default: moment().format('YYYY-MM')})
  opDate!: any;
  @Prop({default: moment().format('YYYY-MM-DD')})
  startDate!: any;
  @Prop({default: moment().format('YYYY-MM-DD')})
  endDate!: any;
  dateRange: any;
  datePickerDim: string | number | undefined;

  created() {
    this.datePickerDim = this.defaultDimDate;
  }

  @Watch('dimDate', {immediate: true, deep: true})
  changeDimDate() {
    this.dimDateList = this.dimDate;
  }

  /**
   * 时间粒度变化，时间组件相应改变
   * @param {string | number} dim 时间粒度
   */
  async changeDim(dim: string | number) {
    await this.$emit('dimChange', dim)
  }

  dateChange(date: any) {
    this.$emit('change', date)
  }
}
</script>

<style scoped lang="less">
.date-content {
  display: flex;
  position: relative;
  width: 100%;
}
</style>