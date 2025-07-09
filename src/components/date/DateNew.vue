<template>
<div class="date">
  <div class="dim-nav">
    <!--时间粒度展示区域-->
    <a-button :type="dim === selectedDim ? 'primary' : 'default'" @click="changeDim(dim)">日</a-button>
    <a-button :type="dim === selectedDim ? 'primary' : 'default'" @click="changeDim(dim)">周</a-button>
    <a-button :type="dim === selectedDim ? 'primary' : 'default'" @click="changeDim(dim)">月</a-button>
    <a-button :type="dim === selectedDim ? 'primary' : 'default'" @click="changeDim(dim)">季</a-button>
    <a-button :type="dim === selectedDim ? 'primary' : 'default'" @click="changeDim(dim)">年</a-button>
  </div>
</div>
</template>
<script>
export default {
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      formattedDate: '',
      // dim: date, week, month, quarter, year, half-year
      selectedDim: 'date',
      dim: 'date'
    }
  },
  mounted() {
    this.formattedDate = this.date.toLocaleDateString();
  }
}
</script>
<style lang="scss" scoped>
.date {
  font-size: 14px;
  color: #333;
  text-align: center;
}
</style>
