<template>
    <div>
        <p>number: {{ num }}</p>
        <button @click="add">+1</button>
        <button @click="clear">clear</button>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name: 'RightCount'
})
export default class RightCount extends Vue {
  @Prop({
    require: false,
    default: 0
  })
  init!: number
  num = 0

  add() {
    this.num++
    this.$emit('add', this.num)
  }

  created() {
    console.log('this.init: ', this.init);
    this.num = this.init
  }

  clear() {
    this.num = this.init
    console.log('clear: ', this.init);
    this.$emit('add', this.num)
  }
}
</script>
<style lang="less" scoped>

</style>
