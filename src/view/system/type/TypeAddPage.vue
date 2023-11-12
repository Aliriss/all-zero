<template>
  <div class="type-add">
    <a-form class="form">
      <a-form-item label="类型名称" class="form-item">
        <a-input
            v-model:value="data.name"
            :default-value="type.name"
            placeholder="please input type name"
            :allowClear="true"
        />
      </a-form-item>
      <a-form-item label="类型描述" class="form-item">
        <a-textarea
            v-model:value="data.desc"
            :default-value="type.desc"
            placeholder="please input type description"
        />
      </a-form-item>
      <!--<a-form-item label="类型名称" class="form-item">-->
      <!--  <a-input v-model:value="type.name" />-->
      <!--</a-form-item>-->
      <a-form-item label="排序号" class="form-item">
        <a-textarea
            v-model:value="data.orderNo"
            :default-value="type.orderNo"
            placeholder="please input type description"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { typeApi } from '@/api';
import { Vue, Options, Prop } from 'vue-property-decorator';

@Options({})
export default class TypeAddPage extends Vue {
  @Prop({required: false, default: {}})
  type!: object;

  /**
   * 保存：true， 修改：false
   * @type {boolean}
   */
  @Prop({required: true, default: false})
  flag!: boolean;

  data: any;

  created() {
    this.data = {
      id: this.type?.id,
      // name: this.type?.name,
      // desc: this.type?.desc,
      // orderNo: this.type?.orderNo
    };
  }

  async getOrderNos() {
    // ..
  }
  async save() {
    if(this.flag) {
      await typeApi.addOne(this.data);
    } else {
      // update
      await typeApi.modify(this.data);
    }
  }
}
</script>

<style scoped lang="less">
.type-add{
  .form{

  }
}
</style>