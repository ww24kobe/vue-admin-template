<template>
  <div class="app-container">
    <h2>{{ id }}</h2>
    <el-form ref="form"  :model="form" label-width="120px">

      <el-form-item
        label="标题"
        prop="title"
        :rules="[
            { required: true, message: '请输入标题' }
          ]"
        >
        <el-input v-model="form.title" placeholder="文章标题"/>
      </el-form-item>
      <el-form-item label="封面"
        prop="img_url"
        :rules="[
            { required: true, message: '需要上传图片'},
          ]"
      >
        <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.imageurl" :src="form.imageurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    <el-form-item label="所属分类" prop="cat_id" :rules="[
          { required: true, message: '请选择分类' },
        ]">
      <el-select v-model="form.cat_id" placeholder="请选择分类">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="发布时间"
        prop="add_date"
        :rules="[
            { required: true, message: '发布时间'},
          ]"
      >
        <!-- <el-col :span="10"> -->
        <el-date-picker v-model="form.add_date" type="datetime" placeholder="发布时间" />
        <!-- </el-col> -->
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.status" />
      </el-form-item>

      <el-form-item label="文章内容">
        <el-input v-model="form.content" placeholder="文章内容-富文本" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    updArticle,getOneArticle,getCate
  } from "@/api/article"
  export default {
    data() {
      return {
        form: {
          title: '',
          cat_id: '',
          add_date: '',
          status: true,
          content: '',
          imageurl: "", // 用于预览
          img_url: "" // 提交后图片路径
        },
        action: process.env.VUE_APP_BASE_API + "/upload",
        options: [],
      }
    },
    props:['id'],
    created() {
      this.getArticleData();
      this.getCateData();
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
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            var result = await updArticle(this.form);
            console.log(result)
            this.$message({
              message: result.message,
              type: 'success'
            })
            this.$router.push('/catearticle/article')
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
      },
      async getArticleData(){
        var res = await getOneArticle(this.id);
        res.data.status = res.data.status == 1 ? true : false;
        Object.assign(this.form,res.data)
        this.form.imageurl = res.data.img_url;
        console.log(this.form)
      },
      async getCateData() {
        var {
          data
        } = await getCate();
        data.map(v=>{
          this.options.push({
            value: v.id,
            label: v.cat_name
          })
        })
        console.log(data)
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
