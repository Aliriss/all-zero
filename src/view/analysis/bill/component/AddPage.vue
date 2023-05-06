<template>
  <div class="content">
    <div class="item-content"><a-button @click="addOne">添加一条记录</a-button></div>
    <div class="table-content">
      <a-table
          :columns="columns"
          :data-source="editBillList"
          row-key="id"
          :scroll="{y: 'calc(77vh - 100px)'}"
      >
        <template #bodyCell="{column, record, index}">
          <!--每一列可编辑模式-->
          <!--用户名-->
          <template v-if="'userName' === column.key">
            <template v-if="record.editFlag === 0">
              {{ record.userName }}
            </template>
            <template v-else>
              <!--用户-->
              <a-select
                  v-model:value="record.userId"
                  style="width: 100%"
                  placeholder="请选择用户"
                  :show-search="true"
                  :allowClear="true"
                  :showArrow="false"
                  optionFilterProp="label"
                  @change="(value, option) => record.userName = option ? option.label : undefined"
              >
                <a-select-option v-for="item in user" :key="item.id" :label="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </template>
          </template>
          <!--消费金额-->
          <template v-if="'charge' === column.key">
            <template v-if="record.editFlag === 0">
              {{ record.charge }}
            </template>
            <template v-else>
              <a-input-number v-model:value="record.charge" placeholder="please input charge"/>
            </template>
          </template>
          <!--消费类型-->
          <template v-if="'typeName' === column.key">
            <template v-if="record.editFlag === 0">
              {{ record.typeName }}
            </template>
            <template v-else>
              <a-select
                  v-model:value="record.typeId"
                  style="width: 100%"
                  placeholder="请选择消费类型"
                  :show-search="true"
                  :allow-clear="true"
                  :showArrow="false"
                  optionFilterProp="label"
                  @change="(value, option) => record.typeName = option ? option.label : undefined"
              >
                <a-select-option v-for="item in typeList" :key="item.id" :label="item.name">
                  <a-tooltip :title="item.description">{{ item.name }}</a-tooltip>
                </a-select-option>
              </a-select>
            </template>
          </template>
          <!--描述-->
          <template v-if="'desc' === column.key">
            <template v-if="record.editFlag === 0">
              {{ record.desc }}
            </template>
            <template v-else>
              <a-input v-model:value="record.desc" placeholder="please input desc"/>
            </template>
          </template>
          <!--时间-->
          <template v-if="'time' === column.key">
            <template v-if="record.editFlag === 0">
              {{ record.time }}
            </template>
            <template v-else>
              <a-input v-model:value="record.time" placeholder="please input time"/>
            </template>
          </template>
          <!--action to edit(save/cancel)/delete-->
          <template v-if="column.key === 'action'">
            <template v-if="record.editFlag === 0">
              <!--编辑按钮，点击编辑该行-->
              <a @click="edit(record)">edit</a>
              <!--删除一条数据-->
              <a style="margin-left: 10px" @click="deleteBill(record, index)">delete</a>
            </template>
            <template v-else>
              <!--保存编辑-->
              <a @click="saveOne(record)">save</a>
              <!--取消该次编辑-->
              <a style="margin-left: 10px" @click="cancel(index)">cancel</a>
            </template>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
import { billApi } from '@/api';
import { Generator } from '@/util/Generator';
import { StaticUtils } from '@/util/StaticUtils';
import { billColumns } from '@/view/analysis/bill/data/Data';
import { message } from 'ant-design-vue';
import { log } from 'echarts/types/src/util/log';
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'AddPage'
})
export default class AddPage extends Vue {
  columns: any = billColumns;
  // 最终要添加到数据库中的数据
  billList: any = [];
  // 存放编辑的数据，用于多条记录同时编辑
  editBillList: any = [];

  @Prop({ type: Array, default: [] })
  user!: any;

  @Prop({ type: Array, default: [] })
  typeList!: any;

  mounted() {
    // this.$nextTick(() => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   this.$on('addBillList', this.saveBillList());
    // })
  }

  /**
   * 添加数据到数据库
   */
  async saveBillList() {
    // 检测是否有没保存的数据
    let saved = false;
    for (const item of this.editBillList) {
      if (item.editFlag === 1) {
        if (!saved) {
          saved = confirm('有未保存的内容，是否保存');
        }
        if (saved) {
          this.saveOne(item);
        } else {
          return false;
        }

      }
    }
    // 清除无用数据
    const billList = this.billList.map((item: any) => {
      const item2 = {...item}
      item2.id = undefined;
      item2.userName = undefined;
      item2.typeName = undefined;
      item2.editFlag = undefined;
      return item2;
    });
    // 调用接口保存数据
    await billApi.saveBillList({
      billList: billList
    }).then((res: any) => {
      if (res.data.code === 200) {
        message.success(res.data.msg)
      } else {
        message.error(res.data.msg)
      }
    })
    return true;
  }

  /**
   * 编辑操作
   * @param record 待编辑的一条数据
   */
  edit(record: any) {
    // this.recordBill = {...record}
    record.editFlag = 1
  }

  /**
   * 删除一条数据
   * @param bill bill
   * @param index index
   */
  deleteBill(bill: any, index: any) {
    this.editBillList.splice(index, 1);
    this.billList.splice(index, 1);
  }

  /**
   * 保存编辑后的数据
   * @param record 一条数据
   */
  saveOne(record: any) {
    record.editFlag = 0;
    Object.assign(this.billList.filter((item: any) => record.id === item.id)[0], record);
  }

  /**
   * 取消该次编辑
   * @param index 一条数据
   */
  cancel(index: any) {
    // record.editFlag = 0;
    // Object.assign(this.editBillList.filter((item: any) => record.id === item.id)[0], this.billList.filter((item: any) => record.id === item.id)[0]);
    Object.assign(this.editBillList[index], this.billList[index]);
    this.editBillList[index].editFlag = 0;
  }
  
  /**
   * 添加一条数据
   */
  addOne() {
    const bill = {
      id: Generator.generateId(10),
      userId: '9',
      userName: 'ALL',
      charge: 0,
      typeId: '0',
      typeName: '支出',
      desc: undefined,
      time: moment().format('yyyy-MM-DD HH:mm:ss'),
      editFlag: 1
    };
    this.billList.push({...bill});
    this.editBillList.push({...bill});
  }
}
</script>

<style scoped lang="less">
</style>