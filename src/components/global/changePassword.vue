<template>
  <!--修改密码-->
  <div class="modal fade" tabindex="-1" role="dialog" id="passwordModal">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">修改密码</h4>
        </div>
        <div class="modal-body">

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

            <div class="modal-btn">
              <span class="my-btn"  @click="submitForm('ruleForm2')"><img src="../../../static/img/red-save.png" alt="">提交</span>
              <span class="my-btn close-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
            </div>

            <el-form-item label="旧密码" prop="oldP">
              <el-input type="password" v-model="ruleForm2.oldP"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const checkOldP = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('旧密码不能为空'));
        }else{
          callback();
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
        ruleForm2: {
          oldP: '',
          pass: '',
          checkPass: '',
        },
        rules2: {
          oldP: [
            { validator: checkOldP, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _vue = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _vue.myAxios({
              url:'manage/user/change-passwd',
              method:'patch',
              data:{
                password: _vue.ruleForm2.oldP,
                new_password:_vue.ruleForm2.pass,
                new_password_confirmation:_vue.ruleForm2.checkPass,
              }
            }).then(function () {
              _vue.success('密码修改成功');
              $("#passwordModal").modal("hide");
              _vue.$router.push({path: '/login', query: {'next': _vue.$route.path}})
            }).catch(function (error) {
              _vue.catchFun(error)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">

</style>
