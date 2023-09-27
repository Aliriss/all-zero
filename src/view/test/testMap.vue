<template>
  <div style="height:800px;width:100%;">
    <Map></Map>
  </div>
</template>

<script lang="ts">
import Map from '@/components/echarts/Map.vue';
import { Vue, Options } from 'vue-property-decorator';

@Options({
  components: {Map}
})
export default class testMap extends Vue {

}
</script>

<style scoped lang="less">

</style>