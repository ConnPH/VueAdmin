<template>
  <div class="login-container">
    <!-- 走马灯  -->
    <div class="carousel-form" :inline="true">
      <el-carousel :interval="5000" arrow="always" height="440px">
        <el-carousel-item v-for="item in carouselImages" :key="item">
          <el-image :src="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>


    <!--  登录  -->
    <div class="login-form" >
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <div class="title-container">
          <h3>欢迎使用xxx管理系统</h3>
        </div>

        <el-form-item prop="username">
          <i class="el-icon-female"></i>
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <i class="el-icon-key"></i>
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item prop="code"  style="width: 380px;">
          <i class="el-icon-unlock" style="float: left;padding: 15px 0 0 20px"></i>
          <el-input v-model="loginForm.code"  style="width: 172px; height: 47px; float: left" ></el-input>
          <el-image :src="captchaImg" style="width: 131px;height: 47px" class="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width: 100%;margin-bottom: 5px;" @click="onLogin('loginForm')">登录</el-button>

        <el-button type="text" style="width: 100%;margin-bottom: 10px;">新用户注册</el-button>

        <el-divider content-position="center">
          <i class="el-icon-s-promotion">胖虎Java</i>
        </el-divider>

        <div style="text-align: center">
          <el-link type="primary" style="margin: 0 8px">用户协议</el-link>
          <el-link type="primary" style="margin: 0 8px">用户隐私</el-link>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      carouselImages: [
        'https://img2.baidu.com/it/u=360400461,2955275651&fm=26&fmt=auto&gp=0.jpg',
        'https://tse1-mm.cn.bing.net/th/id/OIP.ymjWxz7_LJvUQynnp6c4wwHaEK?pid=ImgDet&rs=1',
      ],
      captchaImg:null,
      loading: false,
      loginForm: {
        username: 'admin',
        password: 'admin',
        code:'',
        token:''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 0 到 8 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    onLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         this.$axios.post('/login',this.loginForm).then(res=>{
           console.log(res)

           const jwt = res.headers['authorization']

           this.$store.commit('SET_TOKEN', jwt)
           this.$router.push("/")
         })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getCaptcha(){
      this.$axios.get('/getCaptcha').then(res=>{

        this.loginForm.token = res.data.data.token;
        this.captchaImg = res.data.data.captchaImg;
      })
    },
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style lang="scss">

  .captchaImg {
    float: left;
    border-radius: 4px;
  }


  .el-form-item{
    background-color: #eaecf0;
    .el-input{
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    input{
      background: transparent;

      border: 0;

      -webkit-appearance: none;

      border-radius: 0;

      padding: 12px 5px 12px 15px;

      color: black;
    }
  }
</style>

<style lang="scss" scoped>

  .login-container{
    height: 550px;
    width: 1150px;
    margin: 160px auto 0;

    //border: 2px solid red;

    background-color: #eaecf0;
    -webkit-appearance: none;
    border-radius: 10px;

    .carousel-form{
      width: 680px;
      margin-top: 55px;
      margin-left: 22px;
      border-radius: 10px;

      //border: 2px solid blue;
      float: left;
      .el-carousel__item{

      }
      .el-image{
        border-radius: 10px;
        width: 680px;
        height: 440px;
      }

    }

  }


  .login-form{
    width: 350px;
    height: 440px;
    background-color: white;
    float: left;
    margin: 55px 0 0 0;
    border-radius: 10px;
    padding: 10px 25px;

    //border: 2px solid greenyellow;

    .title-container {
      position: relative;

      .title{
        font-size: 26px;
        color: black;
        margin: 15px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
</style>