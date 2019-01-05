<template>
    <div class="login-wrap">
       <transition name="bounce" mode="in-out">
        <div class="login-form" v-if="box">
          <div class="left">
            <h4>淘宝客后台系统</h4>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
            >
              <div class="login-input">
                <el-form-item label="" prop="username">
                  <el-input
                    autocomplete="off"
                    v-model="ruleForm.username"
                    placeholder="账号"
                    suffix-icon="iconfont icon-icon_zhanghao"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="login-input">
                <el-form-item label="" prop="password">
                  <el-input
                    autocomplete="off"
                    v-model="ruleForm.password"
                    type="password"
                    placeholder="密码"
                    suffix-icon="iconfont icon-icon_mima1"
                    @keyup.enter.native="handleLogin"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="login-btn">
              <el-button
                type="primary"
                :disabled="!countLogin"
                :loading="login"
                @click="handleLogin"
              > 登录
              </el-button>
            </div>
            <div class="login-checkbox">
              <el-checkbox v-model="remember">记住密码</el-checkbox>
            </div>
          </div>
          <div class="right">
            <img src="../../assets/img/login1.png" alt="">
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { setToken } from '../../utils/auth';
import { mapState, mapActions } from 'vuex';

export default{
  data() {
    return {
      box: false,
      ruleForm: {
        username: Cookies.get('username') ? Cookies.get('username') : '',
        password: Cookies.get('userpaw') ? Cookies.get('userpaw') : '',
      },
      remember: true,
      login: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      loginData: state => state.loginData
    })
  },
  mounted() {
    console.log('loginData', this.loginData);
    this.box = true;
  },
  computed: {
    countLogin() {
      return this.ruleForm.username !== '' && this.ruleForm.password !== '';
    },
  },
  methods: {
    ...mapActions(['updateloginDataAction']),
    handleLogin() {
      let _this = this
      this.login = true;
      const params = {
        mobile: this.ruleForm.username,
        password: this.ruleForm.password,
      };
      this.$http.post(_this.$api.AdmindoLoginRes, params).then((response) => {
        if (response.code !== 200) {
          console.log(response);
          this.login = false;
          this.$notify.error({
            title: '错误',
            message: response.msg,
          });
          return;
        }
        this.login = false;
        if (this.remember) {
          Cookies.set('mobile', this.ruleForm.username, { expires: 1, path: '' });
          Cookies.set('password', this.ruleForm.password, { expires: 1, path: '' });
        }
        setToken(response.data.back_token, 1);
        _this.updateloginDataAction({login: true, userInfo: response.data});
        Cookies.set('id', JSON.stringify(response.data.MB_MbNo));
        localStorage.setItem('supplierId', JSON.stringify(response.data.MB_MbNo));
        localStorage.setItem('types', JSON.stringify(response.data.identity_type));
        localStorage.setItem('types2', JSON.stringify(response.data.MB_ClassIndex));
        localStorage.setItem('name', JSON.stringify(response.data.MB_Name));
        localStorage.setItem('navId', '0');
        localStorage.setItem('navInfo', JSON.stringify(response.data.privilegeInfo));
        localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
        localStorage.setItem('identity_type', JSON.stringify(response.data.identity_type));
        this.$message({
          showClose: true,
          message: response.msg,
          type: 'success',
        });
        this.$router.push({ path: '/main' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  background-color: #398BAE;
  width: 100%;
  height: 100%;

  .login-form {
    text-align: center;
    width: 770px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -385px;
    margin-top: -200px;
    height: 423px;
    background-color: #fff;
    overflow: hidden;
    .left {
      padding: 62.5px;
      background-color: #fff;
      width: 50%;
      float: left;

      .login-input {
        padding-top: 10px;
      }

      h4 {
        color: #000;
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 26px;
      }

      .login-btn {
        padding-top: 20px;

        button {
          width: 100%;
        }
      }

      .login-checkbox {
        text-align: left;
        padding-top: 20px;
      }
    }

    .right {
      width: 50%;
      float: right;

      img {
        display: block;
        height: 100%;
      }
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 1s;
}

.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
