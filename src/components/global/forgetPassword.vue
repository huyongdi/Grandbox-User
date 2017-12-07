<template>
  <!--<div class="modal-btn">-->
  <!--<span class="my-btn"  @click="submitForm('ruleForm2')"><img src="../../../static/img/red-save.png" alt="">提交</span>-->
  <!--<span class="my-btn close-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>-->
  <!--</div>-->

  <!--修改密码-->
  <div class="modal fade" tabindex="-1" role="dialog" id="forgetModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">找回密码</h4>
        </div>
        <div class="modal-body">
          <div class="title">验证码将会发送至你的注册邮箱</div>

          <el-form v-if="in1" :model="ruleForm1" status-icon :rules="rules2" ref="ruleForm1" label-width="100px" class="demo-ruleForm">

            <el-form-item label="邮箱号" prop="email">
              <el-input type="email" v-model="ruleForm1.email" auto-complete="off" @enter="submitForm1"></el-input>
            </el-form-item>

            <div class="btn-content">
              <span class="my-btn get-code" @click="submitForm1"><img src="../../../static/img/red-save.png" alt="">获取验证码</span>
            </div>
          </el-form>

          <el-form v-if="in2" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱号">
              <el-input type="input" :disabled="true" v-model="ruleForm1.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code" class="code-content">
              <el-input type="input" v-model="ruleForm2.code" placeholder="请输入邮箱接收到的六位验证码"></el-input>
            </el-form-item>
            <span class="noImg-btn code-btn" :class="{'dis':dis}" id="time-btn">
              <span v-if="inTime"><span id="time">60</span>秒后重发</span>
              <span v-else="" @click="submitForm1">重发验证码</span>
            </span>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>

            <div class="btn-content">
              <span class="my-btn get-code" @click="submitForm2"><img src="../../../static/img/red-save.png" alt="">重设密码</span>
            </div>

          </el-form>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const checkCode = (rule, value, callback) => {
        value = $.trim(value);
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        } else {
          if (/^[0-9a-zA-Z]{6}$/g.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的验证码'));
          }
        }
      };
      const checkEmail = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('邮箱不能为空'));
        } else {
          if (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ig.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的邮箱格式'));
          }
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        inTime: true,
        in1: true,
        in2: false,
        in3: false,
        dis: false,
        ruleForm1: {
          email: '',
        },
        ruleForm2: {
          code: '',
          pass: '',
          checkPass: '',
        },
        rules2: {
          code: [
            {validator: checkCode, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm1() {
        const _vue = this;
        this.$refs['ruleForm1'].validate((valid) => {
          if (valid) {
            _vue.myAxios({
              url: 'manage/user/reset-passwd',
              method: 'post',
              data: {
                email: _vue.ruleForm1.email,
              }
            }).then(function () {
              _vue.in1 = false;
              _vue.in2 = true;
              _vue.in3 = false;
              _vue.dis = true;
              _vue.timeFun();
            }).catch(function (error) {
              _vue.catchFun(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

      timeFun: function () {
        let c = 59;
        const _vue = this;
        this.inTime = true;
        const f = setInterval(() => {
          $("#time").html(c);
          c = c - 1;
          if (c == 0) {
            clearInterval(f);
            _vue.changeBtn();
          }
        }, 1000);

      },
      changeBtn: function () {
        this.inTime = false;
        this.dis = false;

      },
      submitForm2() {
        const _vue = this;
        this.$refs['ruleForm2'].validate((valid) => {
          if (valid) {
            _vue.myAxios({
              url: 'manage/user/reset-passwd',
              method: 'post',
              data: {
                new_password: _vue.ruleForm2.pass,
                new_password_confirmation: _vue.ruleForm2.checkPass,
                email:_vue.ruleForm1.email,
                auth_code:$.trim(_vue.ruleForm2.code),
              }
            }).then(function () {
              _vue.success('密码修改成功');
              $("#forgetModal").modal("hide");
            }).catch(function (error) {
              _vue.catchFun(error)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .modal-body {
    #time-btn {
      width: 100px;
      #time {
        display: inline-block;
        width: 17px;
      }
    }

    .title {
      font-weight: bold;
      width: 100%;
      text-align: center;
    }
    .code-content {
      display: inline-block;
      width: 80%;
    }
    .code-btn {
      width: 20%;
    }
    .btn-content {
      text-align: center;
      .get-code {
        width: 130px;
        margin: 0 auto;
      }
    }
  }
</style>
