<template>
  <div class="login-page">
    <el-card>
      <template #header>黑马面经项目pc端</template>
      <!-- :model 绑定一个form对象，集中的收集管理表单数据，:rules绑定表单校验规则列表 -->
      <el-form :model="form" :rules="rules" ref="form">
        <!-- prop 指定应用哪个校验的规则 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit(form)">登录</el-button>
        <el-button @click="reset(form)">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { pattern: /^\w{5,11}$/, message: '密码长度为5-11位', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async submit (forname) {
      try {
        // console.log(forname)
        await this.$refs.form.validate()
        await this.$store.dispatch('user/loginAction', this.form)
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
    reset (forname) {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(~@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: green;
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
