<template>
<div class="user-config">
  <div class="search-content">
    <a-form class="form-content" layout="inline">
      <a-form-item label="是否启用" name="enable" class="form-item">
        <a-select
            v-model:value="params.enable"
            style="width: 100%"
            placeholder="请选择消费类型"
            :allow-clear="true"
        >
          <a-select-option :key="1" label="未作废">启用</a-select-option>
          <a-select-option :key="0" label="作废">未启用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="form-item">
        <a-button type="primary" @click="query">查询</a-button>
      </a-form-item>
      <a-form-item class="form-item">
        <a-button type="primary" @click="add">新增</a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-table
      :columns="columns"
      :data-source="userList"
  >
    <template #bodyCell="{column, record}">
      <template v-if="'action' === column.key">
        <template v-if="record.enable === 1">
          <a @click="edit(record)">编辑</a>
          <a @click="disabled(record)" style="margin-left: 5px">禁用</a>
        </template>
        <template v-else>
          <a @click="enable(record)">启用</a>
          <a-popconfirm
              title="确定要删除"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteOne(record)"
          >
            <a href="#" style="margin-left: 5px">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </template>
  </a-table>
</div>
</template>

<script lang="ts">
import { userApi } from '@/api';
import { Vue, Options } from 'vue-property-decorator';

@Options({})
export default class index extends Vue {
  title = 'user config';
  params: any = {
    enable: undefined
  }
  columns: any = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      scopedSlots: {customRender: 'name'}
    },
    {
      title: '描述',
      dataIndex: 'comment',
      key: 'comment',
      width: 400,
      scopedSlots: {customRender: 'comment'}
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      scopedSlots: {customRender: 'action'}
    }
  ];
  userList: any = []

  mounted() {
    this.query();
  }

  query() {
    userApi.getUserList(this.params).then((res) => {
      this.userList = res.data;
    }).catch((error: any) => {
      console.log('error: ', error);
    })
  }

 add() {
   console.log('add')
 }

 edit(record: any) {
   console.log('edit: ', record);
 }

 deleteOne(record: any) {
   console.log('delete: ', record);
 }

  disabled(record: any) {
    console.log('disabled: ', record)
  }

  enable(record: any) {
    console.log('enable: ', record)
  }
}
</script>

<style scoped lang="less">
.user-config{}
</style>