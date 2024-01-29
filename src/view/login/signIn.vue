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
      <h3 class="title">欢迎</h3>
      <el-form-item prop="accountId" label="账号">
        <el-input
            v-model="loginForm.accountId"
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
          <ValidCode ref="validCode" @getCode="getCode" width="150px" />
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
    <div class="footer">
      Project {{ version }}©2023 Created by ALL
    </div>
  </div>
</template>

<script lang="ts">
import { accountApi } from '@/api/system/account';
import { version } from '@/view/layout/version';
import { message } from 'ant-design-vue';
import ValidCode from './components/ValidCode.vue';
import { Vue, Options } from 'vue-property-decorator';
// import { CryptoUtils } from '@/utils/CryptoUtils';
// import Cookies from 'js-cookie';
import { User, Lock } from '@element-plus/icons-vue';
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
  version = version;
  // 登录表单
  loginForm: any = {
    accountId: '',
    password: '',
    rememberMe: false,
    code: '',
  };
  // 规则
  loginRules: any = {
    // 账号
    accountId: [
      {required: true, trigger: 'blur', message: '用户名不能为空'}
    ],
    // 密码
    password: [
      {required: true, trigger: 'blur', message: '密码不能为空'}
    ],
    // 验证码
    code: [
      {required: true, trigger: 'blur', message: '请输入验证码'},
      {validator: this.checkCode, trigger: 'blur'},
    ]
  };
  // 登录加载中
  loading = false;


  created() {
    console.log('sign in page...');
  }

  /**
   * 校验输入的验证码是否正确
   * @param rule rule
   * @param value value
   * @param callback callback
   */
  checkCode(rule: never, value: never, callback: any) {
    if (value !== code.value) {
      callback(new Error('验证码有误，请重新输入'))
    } else {
      callback()
    }
  }

  /**
   * 获取验证码
   * @param value value
   */
  getCode(value: any) {
    code.value = value;
  }

  /**
   * 处理登录事件
   */
  handleLogin() {
    (this.$refs.loginFormRef as any).validate((valid: never) => {
      if (valid) {
        this.loading = true
        this.signIn();
        this.loading = false;
        this.refreshCode();
      } else {
        this.refreshCode();
        return false;
      }

    })

  }

  /**
   * 登录
   */
  signIn() {
    accountApi.signIn({
      accountId: this.loginForm.accountId,
      password: this.loginForm.password
    }).then(r => {
      const res = r.data.data;
      if (res.code == 200) {
        message.success(res.data);
        setTimeout(() => {
          this.$router.push('/home');
        }, 1000);
      } else {
        message.error(res.data);
      }
    }).catch(e => {
      message.error(e);
    })
  }

  /**
   * 刷新验证码
   */
  refreshCode() {
    (this.$refs.validCode as any).refresh();
  }

}
</script>

<style rel="stylesheet/scss" lang="scss">
body {
  background: gray;
}

.login {
  //display: flex;
  //justify-content: center;
  //align-items: center;
  text-align: -webkit-center;
  height: 100%;
  background-size: cover;
  margin-top: 10%;
}
.footer {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 29px;
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