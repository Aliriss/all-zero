<template>
  <div class="login">
    <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
        label-width="65px"
        class="login-form"
        status-icon
    >
      <h3 class="title">欢迎使用</h3>
      <el-form-item prop="username" label="账号">
        <el-input
            v-model="loginForm.username"
            type="text"
            :prefix-icon="user"
            placeholder="账号"
        />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            :prefix-icon="lock"
            @keyup.enter="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter="handleLogin"
        >
          <template #prefix>
            <IconTest class="svg-icon" />
          </template>
        </el-input>
        <div class="login-code">
          <ValidCode ref="refresh" @getCode="getCode" width="150px" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0 0 25px 0">
        记住我
      </el-checkbox>
      <el-form-item style="width: 100%" label-width="0">
        <el-button
            :loading="loading"
            type="primary"
            round
            style="width: 100%"
            @click="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
      <el-form-item style="width: 100%" label-width="0">
        <a href="#/signUp" class="register">注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import ValidCode from './components/ValidCode.vue';
import { Vue, Options } from 'vue-property-decorator';
// import { CryptoUtils } from '@/utils/CryptoUtils';
// import Cookies from 'js-cookie';
import { User, Lock, Phone } from '@element-plus/icons-vue';
import IconTest from '@/assets/svg/validCode.svg';

const code: any = {
  value: undefined
}

@Options({
  name: 'login',
  components: {
    ValidCode,
    IconTest
  }
})
export default class index extends Vue {
  user = User;
  lock = Lock;
  phone = Phone;

  codeUrl: any = '';
  cookiePass: any = '';
  loginForm: any = {
    username: '',
    password: '',
    rememberMe: false,
    code: '',
    uuid: ''
  };
  loginRules: any = {
    username: [
      {required: true, trigger: 'blur', message: '用户名不能为空'}
    ],
    password: [
      {required: true, trigger: 'blur', message: '密码不能为空'}
    ],
    code: [
      {required: true, trigger: 'blur', message: '请输入验证码'},
      {validator: this.checkCode, trigger: 'blur'},
    ]
  };
  loading: any = false;


  created() {
    // 获取验证码
    this.getCode(undefined);
    // 获取用户名密码等Cookie
    this.getCookie()
    // token 过期提示
    this.point()
  }

  checkCode(rule: any, value: any, callback: any) {
    if (value !== code.value) {
      callback(new Error('验证码有误，请重新输入'))
    } else {
      callback()
    }
  }

  getCode(value: any) {
    code.value = value;
  }

  getCookie() {
    // const username = Cookies.get('username')
    // let password = Cookies.get('password')
    // const rememberMe = Cookies.get('rememberMe')
    // 保存cookie里面的加密后的密码
    // this.cookiePass = password === undefined ? '' : password
    // password = password === undefined ? this.loginForm.password : password
    // this.loginForm = {
    //   username: username === undefined ? this.loginForm.username : username,
    //   password: password,
    //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
    //   code: ''
    // }
  }

  handleLogin() {
    (this.$refs.loginFormRef as any).validate((valid: any) => {
      const user = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        rememberMe: this.loginForm.rememberMe,
        code: this.loginForm.code,
        uuid: this.loginForm.uuid
      }
      // if (user.password !== this.cookiePass) {
      //   user.password = CryptoUtils.encrypt(user.password)
      // }
      if (valid) {
        this.loading = true
        // if (user.rememberMe) {
        // Cookies.set('username', user.username, {
        //   expires: Config.passCookieExpires
        // })
        // Cookies.set('password', user.password, {
        //   expires: Config.passCookieExpires
        // })
        // Cookies.set('rememberMe', user.rememberMe, {
        //   expires: Config.passCookieExpires
        // })
        // } else {
        // Cookies.remove('username')
        // Cookies.remove('password')
        // Cookies.remove('rememberMe')
        // }
        // 模拟登录成功
        console.log('登录成功: ', user);
        this.$router.push('/home');
      } else {
        console.log('error submit!!: ', user);
        return false
      }
    })
  }

  point() {
    // const point = Cookies.get('point') !== undefined
    // if (point) {
    //   this.$notify({
    //     title: '提示',
    //     message: '当前登录状态已过期，请重新登录！',
    //     type: 'warning',
    //     duration: 5000
    //   })
    //   Cookies.remove('point')
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}

.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  //float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
    height: 38px;
  }
}

.register {
  float: right;
  color: rgb(24, 144, 255);
}

a {
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
}

.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>