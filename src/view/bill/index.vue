<template>
  <div>
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Bill'
})
export default class Bill extends Vue {
  text = 'haha'
}
</script>

<style scoped>

</style>