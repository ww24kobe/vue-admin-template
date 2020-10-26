<template>
  <div class="app-container">
    <div>
      <el-button type="primary" style="margin: 10px 0;" @click="$router.push('/catearticle/addarticle')">添加文章</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
           {{ scope.$index }}-{{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <el-button type="text">查看内容</el-button>
        </template>
      </el-table-column>
      <el-table-column label="所属分类">
        <template slot-scope="scope">
          {{ scope.row.cat_name }}
        </template>
      </el-table-column>
     <!-- <el-table-column label="管理员" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.admin_id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="图片" width="180" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img_url" height="150px" alt="">
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="发布状态" width="110" align="center">
        <template slot-scope="scope">

         <el-tag :type="scope.row.status | statusType">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.add_date | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column  fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope,list)">编辑</el-button>
          <el-button @click="del(scope,list)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getArticle,delArticle } from '@/api/article'


export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '已发布',
        0: '未发布',
      }
      return statusMap[status]
    },
    statusType(status) {
      const statusMap = {
        1: 'success',
        0: 'danger',
      }
      return statusMap[status]
    }

  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getArticle({page:1,pagesize:10}).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    edit(sco,data){
      var id = sco.row.id;
      this.$router.push('/catearticle/editArticle/' + id)

    },
    async del(sco,data){
      try{
        await this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        var id = sco.row.id;
        var index = sco.$index;
        var {message,code} = await delArticle({id})
        if(code == 200){
          this.$message({
            message,
            type: 'success'
          })
          this.list.splice(index, 1)

        }
      }catch(e){}


    }
  }
}
</script>
