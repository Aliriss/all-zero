
<template>
<div>
  <!--{{ name }}-->
</div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-property-decorator'
// import DatePicker from '@/components/date/DatePicker.vue'
@Options({
  name: 'TestDate',
  // components: {DatePicker},
  // props: {
  // },
  // emits: [
    // 'change', 'dimChange'
  // ]
})
export class TestDate extends Vue{
  // name = 'TestDate'
}
</script>

<style scoped lang="less">

</style>
