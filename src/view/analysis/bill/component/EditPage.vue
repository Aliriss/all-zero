<template>
  <div class="edit">
    <a-form :model="formData" :label-col="{span: 2}" autocomplete="off" @finish="onFinish">
      <a-form-item label="用户">
        <a-select
            v-model:value="formData.userId"
            style="width: 100%"
            placeholder="请选择用户"
            :show-search="true"
            :allowClear="true"
            :showArrow="false"
            optionFilterProp="label"
            @change="(value, option) => formData.userName = option ? option.label : undefined"
        >
          <a-select-option v-for="item in user" :key="item.id" :label="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="消费金额">
        <a-input-number v-model:value="formData.charge" placeholder="please input charge"/>
      </a-form-item>
      <a-form-item label="消费类型">
        <!--<a-input :value="formData.typeName" />-->
        <a-select
            v-model:value="formData.typeId"
            style="width: 100%"
            placeholder="请选择消费类型"
            :show-search="true"
            :allow-clear="true"
            :showArrow="false"
            optionFilterProp="label"
            @change="(value, option) => formData.typeName = option ? option.label : undefined"
        >
          <a-select-option v-for="item in typeList" :key="item.id" :label="item.name">
            <a-tooltip :title="item.description">{{ item.name }}</a-tooltip>
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea v-model:value="formData.desc" placeholder="请输入描述" auto-size allow-clear />
      </a-form-item>
      <a-form-item label="时间">
        <a-input v-model:value="formData.time" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { billApi } from '@/api';
import { message } from 'ant-design-vue';
import { Options, Prop, Vue } from 'vue-property-decorator';

@Options({
  name: 'EditPage'
})
export default class AddPage extends Vue {
  @Prop({required: true})
  formData!: any;

  @Prop({ type: Array, default: [] })
  user!: any;

  @Prop({ type: Array, default: [] })
  typeList!: any;

  onFinish() {
    console.log('finished')
  }

  save() {
    billApi.updateBill(this.formData).then((res: any) => {
      if (res.data.code === 200) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    })
  }
}
</script>

<style scoped lang="less">
</style>