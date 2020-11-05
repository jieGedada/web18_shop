<!-- login模板 -->
<template>
  <div class="login">
    <!-- form表单 -->
    <div class="form-wrap">
      <!-- logo图片 -->
      <div class="logo-wrap">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginFormModel" :rules="loginFormRules" ref="loginFormRef" label-width="100px" class="login-form">
        <!-- 
          :model="loginFormModel" 表单绑定的数据源
          :rules="loginFormRules" 表单绑定的验证规则
          ref="loginFormRef" 表单的引用，通过this.$refs.loginFormRef找到当前元素
          label-width="100px" 表单域中标题的宽度
         -->
        <el-form-item label="用户：" prop="username">
          <el-input v-model="loginFormModel.username" prefix-icon="iconfont icon-user "></el-input>
          <!-- 
            prop="username" 验证规则的名称 对应规则是data.loginFormRules.username
            prefix-icon="iconfont icon-user " input框的前面图标
           -->
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="loginFormModel.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item label=" " class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      //登录用户的参数
      loginFormModel: {
        username: 'admin',
        password: '123456'
      },
      //表单的验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 12, message: '密码长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: [],
  components: {},
  computed: {},
  filters: {},
  methods: {
    //执行登录操作
    login() {
      let _this = this
      //先验证表单
      let form = this.$refs['loginFormRef']
      //执行表单验证
      form.validate(async function(valid) {
        //判断验证结果
        console.log(valid)
        //错误的验证结果
        if (!valid) {
          return _this.$message.error('错误的用户名或密码')
        }
        let { data: res } = await _this.axios.post('login', _this.loginFormModel)
        console.log(res)
        if (res.meta.status !== 200) {
          return _this.$message.error(res.meta.msg)
        }
        _this.$message.success('登陆成功')
        sessionStorage.setItem('USER_LOGIN', JSON.stringify(res))
        _this.$router.push('/home')
      })
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #2c3e50;

  .form-wrap {
    background-color: #ffffff;
    width: 5rem;
    height: 3.2rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logo-wrap {
      width: 1.2rem;
      height: 1.2rem;
      padding: 0.1rem;
      background-color: #ffffff;
      border: 1px solid #dbdbdb;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        padding: 0.1rem;
        background-color: #5f9ea0;
        border-radius: 50%;
      }
    }

    .el-form {
      bottom: 0;
      position: absolute;
      width: 100%;
      left: 0;
      padding-right: 0.3rem;
      .btns {
        text-align: right;
      }
    }
  }
}
</style>
