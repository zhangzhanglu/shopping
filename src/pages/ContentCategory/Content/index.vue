<template>
    <div>
        <el-button 
            v-show="addBtnShow"
            class="addBtn" 
            type="primary" 
            @click="addDialogVisible=true"
        >添加{{addContent}}</el-button>
        <el-table :data="contents" style="width:100%">
            <el-table-column show-overflow-tooltip prop="id" label="ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="标题"></el-table-column>
            <el-table-column show-overflow-tooltip prop="url" label="URL地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="图片地址"></el-table-column>
        </el-table>
        <el-dialog
            title="添加内容"
            :visible='addDialogVisible'
            width='60%'
            :before-close='handleClose'
        >
            <el-form ref='form' :model="form" label-width='80px'>
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.image"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button @click="addDialogVisible=false">取消</el-button>
                <el-button @click="addDialogHandle">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'Content',
        data(){
            return{
                contents:[],
                addDialogVisible:false,
                form:{},
                addContent:"",
                addBtnShow:false
            }
        },
        //接收父级传来的数据
        props:{
            contentData:{
                type:Object,//类型
                required:true//必选项
            }
        },
        //监听
        watch:{
            contentData(value,oldValue){
                this.addContent = value.name;
                if(value.name){
                    this.addBtnShow = true;
                }
                this.$api.getSelectTbContentAllByCategoryId({
                    id:value.pid
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.status === 200){
                        this.contents = res.data.data;
                    }
                    else{
                        this.contents=[]
                    }
                })
            }
        },
        methods:{
            //关闭×
            handleClose(){
                this.addDialogVisible = false;
            },
            //添加确定按钮
            addDialogHandle(){
                this.$api.getInsertTbContent({
                    pid:this.contentData.pid,
                    name:this.form.name,
                    url:this.form.url,
                    image:this.form.image
                })
                .then(res=>{
                    if(res.data.status === 200){
                        this.addDialogVisible = false;
                        this.reload();
                    }
                })
            },
            //删除
            handleDelete(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                    })
                    .then(()=>{
                        this.$api.getDeleteContentByIds({
                            id:row.id
                        })
                        .then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                                /**
                                 * 强制程序页面刷新
                                 */
                                this.reload();
                            }
                            else{
                                this.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            }
        }
    }
</script>

<style scoped>

</style>