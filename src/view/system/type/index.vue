<template>
  <div class="type-container">
    <div class="search-content">
      <a-form class="form-content" layout="inline">
        <!--<a-form-item label="是否启用" name="enable" class="form-item">-->
        <!--  <a-select-->
        <!--      v-model:value="params.enable"-->
        <!--      style="width: 100%"-->
        <!--      placeholder="请选择消费类型"-->
        <!--      :allow-clear="true"-->
        <!--  >-->
        <!--    <a-select-option :key="1" label="未作废">启用</a-select-option>-->
        <!--    <a-select-option :key="0" label="作废">未启用</a-select-option>-->
        <!--  </a-select>-->
        <!--</a-form-item>-->
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
      :data-source="typeList"
      :pagination="false"
      :scroll="{y: '600px'}"
    >
      <template #bodyCell="{column, record}">
        <template v-if="'action' === column.key">
          <a @click="edit(record)">edit</a>
          <a-popconfirm
              title="确定要删除"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteOne(record)"
          >
            <a href="#" style="margin-left: 5px;color: red">delete</a>
          </a-popconfirm>

        </template>
      </template>
    </a-table>
    <a-modal
      :title="modal.title"
      :visible="modal.visible"
      :destroy-on-close="true"
      @ok="save"
      @cancel="closeModal"
    >
      <TypeAddPage ref="typeAddPage" :type="modal.data" :flag="modal.isAdd"/>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { typeApi } from '@/api';
import TypeAddPage from '@/view/system/type/TypeAddPage.vue';
import { Vue, Options } from 'vue-property-decorator';

@Options({
  components: {TypeAddPage}
})
export default class index extends Vue {
  title = '消费类型维护';
  columns: any = [
    {
      title: '类型名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      scopedSlots: {customRender: 'name'}
    },
    {
      title: '类型描述',
      dataIndex: 'desc',
      key: 'desc',
      scopedSlots: {customRender: 'desc'}
    },
    {
      title: '序号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 100,
      scopedSlots: {customRender: 'orderNo'}
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      scopedSlots: {customRender: 'action'}
    }
  ];
  typeList: any = [];
  modal: any = {
    title: 'modal',
    visible: false,
    data: undefined,
    isAdd: true
  }

  mounted() {
    this.query();
  }

  query() {
    typeApi.getList().then((res: any) => {
      this.typeList = res.data;
    }).catch((error: any) => {
      console.log('error: ', error);
    })
  }

  add(){
    this.modal.title = '新增类型';
    this.modal.visible = true;
    this.modal.data = undefined;
  }

  edit(record: any) {
    this.modal.title = '修改类型';
    this.modal.data = {...record};
    this.modal.isAdd = false;
    this.modal.visible = true;
  }

  async deleteOne(record: any) {
    await typeApi.deleteById(record.id);
    this.query();
  }

  async save() {
    this.modal.isAdd = true;
    await (this.$refs.typeAddPage as any).save();
    this.closeModal();
    await this.$nextTick(() => {
      this.query();
    })
  }
  closeModal() {
    this.modal.visible = false;
    // this.modal.data = {};
    // this.modal.title = '';
  }
}
</script>

<style scoped lang="less">
.type-container{
  .search-content{
    .form-content{
      margin: 5px 0;
      .form-item{
        width: 5%
      }
    }
  }
}
</style>