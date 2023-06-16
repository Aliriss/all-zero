<template>
  <div class="type-add">
    <a-form class="form">
      <a-form-item label="类型名称" class="form-item">
        <a-input v-model:value="data.name" :default-value="type.name" placeholder="please input type name"/>
      </a-form-item>
      <a-form-item label="类型描述" class="form-item">
        <a-textarea v-model:value="data.desc" :default-value="type.desc" placeholder="please input type description"/>
      </a-form-item>
      <!--<a-form-item label="类型名称" class="form-item">-->
      <!--  <a-input v-model:value="type.name" />-->
      <!--</a-form-item>-->
    </a-form>
  </div>
</template>

<script lang="ts">
import { typeApi } from '@/api';
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';

@Options({})
export default class TypeAddPage extends Vue {
  @Prop({required: false, default: {}})
  type!: object;

  data: any;

  created() {
    this.data = {};
  }

  async save() {
    // console.log('save: ', {type: this.data})
    await typeApi.addOne(this.data);
  }
}
</script>

<style scoped lang="less">
.type-add{
  .form{

  }
}
</style>