<template>
    <div class="params"> 
        <div>
            <el-button type="primary" @click="addParamsHandle">添加规格参数</el-button>
        </div>
        <el-table :data="paramsData" style="width:100%">
            <el-table-column show-overflow-tooltip width='80px' prop="id" label="ID"></el-table-column>
            <el-table-column show-overflow-tooltip width='80px' prop="itemCatId" label="类目ID"></el-table-column>
            <el-table-column show-overflow-tooltip width='500px' prop="paramData" label="规格"></el-table-column>
            <el-table-column show-overflow-tooltip prop="created" label="创建日期"></el-table-column>
            <el-table-column show-overflow-tooltip prop="updated" label="更新日期"></el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index,scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加规格参数弹出框 -->
        <el-dialog width="50%" title="商品类目选择" :visible.sync="paramsVisible">
            <el-tree
                :load="loadTreeNodes"
                :props="defaultProps"
                lazy
                highlight-current
                @node-click="handleNodeClick"
            ></el-tree>
            <el-dialog width="50%" title="添加分组" :visible.sync="groupsVisible" append-to-body>
                <ParamsAdd @onParamsAdd="getParamsAdd"/>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="paramsVisible = false">取 消</el-button>
                <el-button type="primary" @click="groupsVisibleHandler">确定并添加分组</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ParamsAdd from "../ParamsAdd";
    export default {
        name:'ParamsList',
        components:{
            ParamsAdd
        },
        data(){
            return{
                paramsData: [],
                paramsVisible: false,
                groupsVisible: false,
                defaultProps: {
                    children: "children",
                    label: "name"
                },
                paramsId:0
            }
        },
        mounted(){
           this.http()
        },
        methods:{
            http(){
                 this.$api.getSelectItemParamAll()
            .then(res=>{
                console.log(res.data)
                if(res.data.status === 200){
                    this.paramsData = res.data.data.result
                }
                else{
                    alert(res.data.msg)
                }
            })
            },
            addParamsHandle(){
                this.paramsVisible = true;
            },
            // tree懒加载事件
            loadTreeNodes(node, resolve) {
                this.currentCategory = node.data;
                // 判断是否是第一次
                if (node.level === 0) {
                    this.$api.getSelectItemCategoryByParentId().then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            alert("请求失败");
                        }
                    });
                }
                if (node.level >= 1) {
                    this.$api
                        .getSelectItemCategoryByParentId({
                            id: node.data.cid
                        })
                        .then(res => {
                            if (res.status === 200) {
                                return resolve(res.data.data);
                            } else {
                                alert("请求失败");
                            }
                        })
                        .catch(error => {
                            resolve([]);
                        });
                }
        },
        // tree点击事件
        handleNodeClick(data) {
            // console.log(data);
        },
        groupsVisibleHandler() {
            this.groupsVisible = true;
        },
        // getParamsAdd(data){
        //     this.paramsVisible = false
        //     this.groupsVisible = false
        // },
        getParamsAdd(data){
                //添加数据
                this.$api.getInsertItemParam({
                    itemCatId:this.paramsId,
                    paramData:data
                })
                .then(res=>{
                    if(res.data.status === 200){
                        this.paramsVisible = false;
                        this.groupsVisible = false;
                        this.http();
                    }
                    else{
                        alert(res.data.msg)
                    }
                })
            },
           handleDelete(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                    })
                    .then(()=>{
                        this.$api.getDeleteItemParamById({
                            id:row.id
                        })
                        .then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                //删除成功 刷新页面
                                this.http();
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