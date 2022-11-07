<template>
  <div>
    <input type="text" v-focus/>
  </div>
</template>
<script>

export default {
  name: 'ToDoList',
  props: {
    data: {
      type: [Array],
      required: false,
      default: [
        { id: 1, task: 'meeting at 9:00 on monday', done: false },
        { id: 2, task: 'meeting at 9:00 on tuesday', done: false },
        { id: 3, task: 'prepare speech for meeting at 9:00 on windesday', done: true }
      ]
    }
  },
  data() {
    return {
      todoList: []
    }
  },
  watch: {
    data: {
      handler() {
        this.todoList = this.data
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped lang="less">
.deleteText{
  // background-color: chartreuse;
  text-decoration: line-through;
  background-color: gainsboro;
}
.undeleteText{
  // background-color: aqua;
}
.hover{
  :hover {
    background-color: rgb(0, 187, 255);
  }
}
</style>
