<template>
  <div>{{ position }}</div>
  <a-table :dataSource="dataSourceNew" :columns="columns" :pagination="pagination" :scroll="{y: '300px'}">
  </a-table>
  <Fold v-if="folder" :fold="fold" @showAll="showAll"></Fold>
  <div id="container"></div>
</template>
<script lang="ts">
import { Options, Vue, Watch } from 'vue-property-decorator';
import Fold from '@/components/table/Fold.vue';
import { ak1, ak2 } from '@/utils/map';
import axios from "axios";
@Options({
  name: 'Table',
  components: {
    Fold
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: false,
      default: null
    },
    folder: {
      type: Boolean,
      required: false,
      default: false
    },
    pagination: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
export default class Table extends Vue {
  dataSource!: never
  position = '人员列表'
  dataSourceNew = []
  fold = false

  @Watch('dataSource', { immediate: true, deep: true})
  showAll() {
    this.fold = !this.fold
    if (this.fold && this.dataSource[0]) {
      this.dataSourceNew = []
      for (let i = 0; i < 6; i++) {
        this.dataSourceNew.push(this.dataSource[i])
      }
    } else {
      this.dataSourceNew = this.dataSource
    }

  }

  created() {
    this.showAll()
    // this.getCity()
  }

  getCity() {
    console.log('get city')
    const url1 = `https://api.map.baidu.com/weather/v1/?district_id=110101&data_type=all&ak=${ak1}`
    const url2 = `https://api.map.baidu.com/weather/v1/?district_id=110101&data_type=all&ak=${ak2}`
    axios.get(url1).then(v => {
      console.log('weather: ', v)
    })
  }
}
</script>

<style>

</style>
