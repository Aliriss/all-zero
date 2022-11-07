<template>
  <div>
    <button @click="query">query</button>
    <Table
        :columns="column"
        :dataSource="tableData"
        :folder="true"
        :pagination="false"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { common } from '@/api/common';
import Table from '@/components/table/Table.vue';
@Component({
  name: 'People',
  components: {
    Table
  }
})
export default class People extends Vue {
  tableData = [];
  column = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      className: 'column'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      className: 'column'
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
      className: 'column'
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
      className: 'column'
    }
  ]

  async query() {
    const { data } = await common.getUser();
    this.tableData = data
  }

  mounted() {
    this.query()
  }
}
</script>
