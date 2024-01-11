<template>
  <div class="home-box">
    <div class="welcome">
      Welcome
    </div>
    <div class="user-info">
      欢迎你，xxx!
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { Options } from 'vue-class-component'

@Options({
  name: 'home'
})
export default class Home extends Vue {
}
</script>

<style scoped lang="less">
.home-box {
  width: 100%;
  height: 100%;
  text-align-last: center;
  position: relative;
  display:flex;
  justify-content: center;
  font-family: Arial,Helvetica,STHeiti STXihei,Microsoft YaHei,Tohoma,sans-serif;
  .welcome {
    font-size: 100px;
    font-weight: 700;
    align-self: center;
    background: -webkit-linear-gradient(45deg,#00b4b4,#7f03d3,#409eff);
    color: transparent;
    -webkit-background-clip: text;
    animation: welcome 20s linear infinite;
    user-select: none;
    cursor: pointer;
    opacity: .9;
  }
  .user-info {
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
    font-weight: 700;
    background: -webkit-linear-gradient(45deg,#00b4b4,#7f03d3);
    color: transparent;
    -webkit-background-clip: text;
    animation: welcome-877bc2ef 20s linear infinite;
    user-select: none;
    opacity: .9;
  }
}
@keyframes welcome {
  0% {
    background-position: 0 0
  }

  to {
    background-position: 2000px 0
  }
}

</style>