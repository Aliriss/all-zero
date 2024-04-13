<template>
  <div class="search-common">
    <a-form
        class="form-content"
        :model="params"
        name="表单"
        layout="inline"
    >
      <a-form-item label="" name="time" class="form-item">
        <Date
            :dim-date="dimDateList"
            :default-dim-date="params.dimDate"
            :op-date="params.opDate"
            :start-date="params.startDate"
            :end-date="params.endDate"
            @dimChange="dimChange"
            @change="dateChange"
        />
      </a-form-item>
      <a-form-item label="用户" name="userName" class="form-item">
        <a-select
            v-model:value="params.userId"
            style="width: 100%"
            placeholder="请选择用户"
            :show-search="true"
            :allow-clear="true"
            optionFilterProp="label"
            @change="changeUser"
        >
          <a-select-option v-for="item in user" :key="item.id" :label="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="消费类型" name="type" class="form-item">
        <a-select
            v-model:value="params.typeId"
            style="width: 100%"
            placeholder="请选择消费类型"
            :show-search="true"
            :allow-clear="true"
            optionFilterProp="label"
            @change="changeType"
        >
          <a-select-option v-for="item in type" :key="item.id" :label="item.name">
            <a-tooltip :title="item.description">{{ item.name }}</a-tooltip>
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="作废" name="invalidFlag" class="form-item">
        <a-select
            v-model:value="params.invalidFlag"
            style="width: 100%"
            placeholder="请选择消费类型"
            :allow-clear="true"
        >
          <a-select-option :key="0" label="未作废">作废</a-select-option>
          <a-select-option :key="1" label="作废">未作废</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="图表类型" name="chartFlag" class="form-item">
        <a-select
            v-model:value="params.chartType"
            style="width: 100px"
            placeholder="请选择消费类型"
            :allow-clear="true"
        >
          <a-select-option v-for="c in chartList" :key="c.id" :label="c.name">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="form-item">
        <a-button type="primary" @click="query">查询</a-button>
        <a-button type="default" style="margin-left: 10px" @click="reset">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { billApi, userApi } from '@/api';
import Date from '@/components/date/Date.vue';
import { StaticUtils } from '@/utils/StaticUtils';
import { chartList } from '@/view/analysis/bill/data/Data';
import moment from 'moment';
import { Vue, Options, Prop } from 'vue-property-decorator';

@Options({
  components: {Date}
})
export default class Search extends Vue {
  chartList: any = chartList;
  // 参数
  @Prop({required: true, defalut: {
      dimDate: '3',
      opDate: moment().format('YYYY-MM'),
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      type: undefined,
      userId: undefined,
      invalidFlag: undefined, // 0：作废，1：启用
      chartType: undefined
    }})
  params!: any;
  @Prop({required: false, default: ['1', '3']})
  dimDateList!: Array<string>;
  user: any = [];
  type: any = [];
  @Prop({required: true})
  query!: any;

  @Prop({required: true})
  reset!: any;

  created() {
    this.getUser();
    this.getType();
  }

  /**
   * 查询用户
   * @returns {Promise<void>}
   */
  async getUser(): Promise<void> {
    const { data } = await userApi.getUserList({});
    this.user = data;
  }

  /**
   * 查询消费类型
   * @returns {Promise<void>}
   */
  async getType(): Promise<void> {
    const { data } = await billApi.getTypeList({});
    this.type = data;
  }

  /**
   * 时间粒度改变
   * @param dim 时间粒度
   */
  dimChange(dim: any) {
    if(dim === '1') {
      // date
      this.params.startDate = moment().format('YYYY-MM-DD');
      this.params.endDate = moment().format('YYYY-MM-DD');
    } else if (dim === '3') {
      // month
      this.params.opDate = moment().format('YYYY-MM');
    }
    this.params.dimDate = dim;
  }

  /**
   * 日期发生变化
   * @param date 日期：[]或''
   */
  dateChange(date: any) {
    if (this.params.dimDate === '1' || this.params.dimDate === 1 || this.params.dimDate === 'date') {
      this.params.startDate = date[0];
      this.params.endDate = date[1];
    } else {
      this.params.opDate = date;
    }
  }

  /**
   * 用户发生改变
   * @param id 用户id
   * @param option 选项
   */
  changeUser(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.userName = option.label
    }else {
      this.params.userName = undefined;
    }
  }

  /**
   * 消费类型改变
   * @param id 类型id
   * @param option 选项
   */
  changeType(id: any, option: any) {
    if (StaticUtils.isNotEmpty(option)) {
      this.params.typeName = option.label
    } else {
      this.params.typeName = undefined;
    }
  }

}
</script>

<style scoped lang="less">
.search-common{
  .form-content{
    .form-item{
      // width: 15%;
    }
  }
}
</style>