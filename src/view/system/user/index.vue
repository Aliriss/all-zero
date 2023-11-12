<template>
  <div class="user-config">
    <div class="search-content">
      <a-form class="form-content" layout="inline">
        <a-form-item label="是否启用" name="enable" class="form-item">
          <a-select
              v-model:value="params.enabled"
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
          <a-button type="primary" @click="showAddModal">新增</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table
        :columns="columns"
        :data-source="userList"
    >
      <template #bodyCell="{column, record}">
        <template v-if="'action' === column.key">
          <template v-if="record.enabled === 1">
            <a @click="showEditModal(record)">编辑</a>
            <a @click="disabled(record)" style="margin-left: 5px;color: red;">禁用</a>
          </template>
          <template v-else>
            <a @click="enable(record)">启用</a>
            <a-popconfirm
                title="确定要删除"
                ok-text="Yes"
                cancel-text="No"
                @confirm="deleteOne(record)"
            >
              <a href="#" style="margin-left: 5px;color: red;">删除</a>
            </a-popconfirm>
          </template>
        </template>
      </template>
    </a-table>
    <a-modal
        :title="modal.title"
        :visible="modal.visible"
        @ok="save"
        @cancel="closeModal"
    >
      <a-form>
        <a-form-item label="姓名">
          <a-input v-model:value="modal.data.name" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model:value="modal.data.desc" @pressEnter="add" placeholder="请输入描述" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { userApi } from '@/api';
import { message } from 'ant-design-vue';
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
      dataIndex: 'desc',
      key: 'desc',
      width: 400,
      scopedSlots: {customRender: 'desc'}
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
  modal: any = {
    title: '',
    visible: false,
    // 新增标志
    addFlag: false,
    data: {}
  }

  mounted() {
    this.query();
  }

  async query() {
    await userApi.getUserList(this.params).then((res) => {
      this.userList = res.data;
    }).catch((error: any) => {
      message.error("系统异常")
    })
  }

  /**
   * 显示新增弹框
   */
  showAddModal() {
    this.modal.title = '新增用户';
    this.modal.addFlag = true;
    this.modal.visible = true;
  }

  /**
   * 显示编辑弹框
   */
  showEditModal(record: any) {
    this.modal.title = '编辑用户';
    this.modal.addFlag = false;
    this.modal.data = { ...record };
    this.modal.visible = true;
  }


  closeModal() {
    this.modal.visible = false;
    this.modal.title = '';
    this.modal.data = {};
    this.modal.addFlag = false;
  }

  /**
   * 保存控制：新增和修改
   */
  async save() {
    if (this.modal.addFlag) {
      await this.add();
    } else {
      await this.modify();
    }
    await this.query();
    this.closeModal();
  }

  /**
   * 新增用户
   */
  async add() {
    await userApi.addUser(this.modal.data).then(res => {
      if (res.data > 0) {
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    }).catch(e => {
      message.error('添加失败');
    })
  }

  /**
   * 修改用户
   */
  async modify() {
    await userApi.modify(this.modal.data).then(res => {
      if (res.data > 0) {
        message.success('修改成功');
      } else {
        message.error('修改失败');
      }
    }).catch(e => {
      message.error('修改失败');
    })
  }

  /**
   * 删除
   * @param record
   */
  async deleteOne(record: any) {
    await userApi.removeUser({ id: record.id }).then(res => {
      if (res.data > 0) {
        message.success('删除成功');
      } else {
        message.error('删除失败');
      }
    }).catch(e => {
      message.error('删除失败');
    })
    await this.query()
  }

  /**
   * 禁用
   * @param record
   */
  async disabled(record: any) {
    await userApi.disable({ id: record.id }).then(res => {
      if (res.data > 0) {
        message.success('禁用成功');
      } else {
        message.error('禁用失败');
      }
    }).catch(e => {
      message.error('禁用失败');
    })
    await this.query()
  }

  /**
   * 启用
   * @param record
   */
  async enable(record: any) {
    await userApi.enable({ id: record.id }).then(res => {
      if (res.data > 0) {
        message.success('启用成功');
      } else {
        message.error('启用失败');
      }
    }).catch(e => {
      message.error('启用失败');
    })
    await this.query()
  }
}
</script>

<style scoped lang="less">
.user-config {
}
</style>