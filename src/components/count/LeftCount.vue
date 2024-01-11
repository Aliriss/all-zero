<template>
    <div>
        <p>number: {{ num }}</p>
        <button @click="add">+1</button>
        <button @click="clear">clear</button>
        <button @click="send">send</button>
    </div>
</template>
<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator';
@Options({
  name: 'LeftCount',
})
export default class LeftCount extends Vue {
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

  send() {
    console.log('send');
    
  }
}
</script>
<style lang="less" scoped>

</style>
