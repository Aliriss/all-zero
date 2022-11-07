<template>
  <div class="unfold" @click="show">
    <down-outlined v-show="fold" class="icon" />
    <up-outlined v-show="!fold" class="icon" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  UpOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
@Component({
  components: {
    UpOutlined,
    DownOutlined
  }
})
export default class Fold extends Vue {
  name = '123'
  @Prop({
    type: Boolean,
    required: false,
    default: true
  })
  fold!: boolean

  show() {
    this.$emit('showAll', (!this.fold))
  }
}
</script>

<style scoped lang="less">
.unfold {
  background-color: rgba(100, 255, 200, 1%);

  .icon {
    padding-left: 50%;
  }
}
</style>
