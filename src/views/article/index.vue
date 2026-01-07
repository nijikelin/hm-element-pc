<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="openDrawer('add')">
            添加面经
          </el-button>
          <el-drawer
            :title="drawerTitle"
            :visible.sync="drawer"
            :before-close="handleClose">

            <div v-if="drawerType === 'preview'" class="article-preview">
              <h5>{{ form.stem }}</h5>
              <div v-html="form.content"></div>
            </div>

            <el-form v-else :model="form" :rules="rules" ref="ruleForm" label-width="80px">
              <el-form-item label="标题" prop="stem">
                <el-input placeholder="请输入标题" v-model="form.stem"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <quill-editor v-model="form.content" @blur="$refs.ruleForm.validateField('content')"></quill-editor>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit()">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-drawer>

        </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="stem"
              label="标题"
              width="400">
            </el-table-column>
            <el-table-column
              prop="creator"
              label="作者"
              width="180">
            </el-table-column>
            <el-table-column
              prop="likeCount"
              label="点赞数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="views"
              label="浏览数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="180">

              <template #default="obj">
                <div class="actions">
                  <i class="el-icon-view" @click="openDrawer('preview',obj.row.id)"></i>
                  <i class="el-icon-edit-outline" @click="openDrawer('edit',obj.row.id)"></i>
                  <i class="el-icon-delete" @click="deleteArticle(obj.row.id)"></i>
                </div>
              </template>

            </el-table-column>

          </el-table>
      </template>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticleList, createArticle, delArticle, getArticleDetail, updateArticle } from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-page',
  data () {
    return {
      tableData: [],
      current: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      drawerType: 'add',
      form: {
        stem: '',
        content: ''
      },
      rules: {
        stem: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initData()
  },
  components: {
    quillEditor
  },
  computed: {
    drawerTitle () {
      let title = '标题'
      if (this.drawerType === 'add') title = '添加面经'
      if (this.drawerType === 'preview') title = '预览面经'
      if (this.drawerType === 'edit') title = '编辑面经'
      return title
    }
  },
  methods: {
    async initData () {
      const data = await getArticleList({
        current: this.current,
        pageSize: this.pageSize
      })
      this.tableData = data.data.rows
      this.total = data.data.total
    },
    handleCurrentChange (val) {
      this.current = val
      this.initData()
    },
    async openDrawer (type, id) {
      this.drawer = true
      this.drawerType = type
      if (type !== 'add') {
        const data = await getArticleDetail(id)
        this.form = data.data
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.closeDrawer()
        })
        .catch((e) => {
          console.log('取消', e)
        })
      // done()
    },
    async submit () {
      await this.$refs.ruleForm.validate()
      if (this.drawerType === 'add') {
        // 2.发送创建请求
        await createArticle(this.form)
        // 3.提示信息
        this.$message.success('添加成功')
      }
      if (this.drawerType === 'edit') {
        const { id, stem, content } = this.form
        console.log(id, stem, content)

        await updateArticle({ id, stem, content })
        this.$message.success('编辑成功')
      }

      // 4.关闭抽屉并清空表单
      this.closeDrawer()
      // 6.刷新数据
      this.initData()
    },
    closeDrawer () {
      this.form = {
        stem: '',
        content: ''
      }
      // 4.清空表单
      if (this.drawerType !== 'preview') {
        this.$refs.ruleForm.resetFields()
      }
      // 5.关闭抽屉
      this.drawer = false
    },
    async deleteArticle (id) {
      // 1.提示框
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 2.发送删除请求
          await delArticle(id)
          // 3.提示信息
          this.$message.success('删除成功')
          // 4.刷新数据
          this.initData()
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
