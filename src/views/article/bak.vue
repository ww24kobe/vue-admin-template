<template>
  <div class="app-container">

    <el-form ref="dynamicValidateForm"  :model="dynamicValidateForm" label-width="120px">

      <el-form-item label="标题">
        <el-input v-model="dynamicValidateForm.title" placeholder="文章标题"
         :rules="[
             { required: true, message: '请输入标题', trigger: 'blur' },
             { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
           ]"
         />
      </el-form-item>
      <el-form-item label="封面">
        <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dynamicValidateForm.imageurl" :src="dynamicValidateForm.imageurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="dynamicValidateForm.cat_id" placeholder="请选择分类">
          <el-option label="体育" value="1" />
          <el-option label="财经" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间">
        <!-- <el-col :span="10"> -->
        <el-date-picker v-model="dynamicValidateForm.add_date" type="datetime" placeholder="发布时间" />
        <!-- </el-col> -->
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="dynamicValidateForm.status" />
      </el-form-item>

      <el-form-item label="文章内容">
        <el-input v-model="dynamicValidateForm.content" placeholder="文章内容-富文本" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    addArticle
  } from "@/api/article"
  export default {
    data() {
      return {
        dynamicValidateForm: {
          title: '',
          cat_id: '',
          add_date: '',
          status: true,
          content: '',
          imageurl: "", // 用于预览
          img_url: "" // 提交后图片路径
        },
        // rules: {
        //   title: [{
        //     required: true,
        //     message: '请输入标题',
        //     trigger: 'blur'
        //   }]
        // },
        action: process.env.VUE_APP_BASE_API + "/upload",
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }

      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        // file.raw 二进制原始内容
        console.log("res:", res)
        this.form.imageurl = URL.createObjectURL(file.raw);

        this.form.img_url = res.img_url
        console.log(this.form.img_url)
      },
      beforeAvatarUpload(file) {
        console.log("beforeAvatarUpload:", file)
        const isJPG = file.type === 'image/jpeg';
        // 转为兆大小 是否小于2兆
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      onSubmit(formName) {
        console.log(formName)
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid)
            // var result = await addArticle(this.form);
            // console.log(result)
            this.$message('submit!')
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      submitForm(formName) {
        console.log(formName)
        console.log(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
