<template>
    <div>
        <el-tree
            :props="defaultProps"
            :load="loadTreeNodes"
            lazy
            highlight-current
            :render-content="renderContent"
            :expand-on-click-node="false"
            @node-click="handleNodeClick"
        ></el-tree>
        <!-- 添加广告 -->
        <el-dialog
            title="添加广告"
            :visible.sync="categoryVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>
                <el-input v-model="categoryName" aria-placeholder="请添加分类广告名称"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="categoryVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureHandler">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改广告框 -->
        <el-dialog
            title="修改广告"
            :visible.sync="updateCategoryVisible"
            width="30%"
            :before-close="handleClose"
        >
            <span>
                <el-input v-model="updateCategoryName" aria-placeholder="请添加分类广告名称"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateCategoryVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureUpdateHandler">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "Category",
    inject:["reload"],
    data() {
        return {
            categoryName: "",
            categoryVisible: false,
            updateCategoryName: "",
            updateCategoryVisible: false,
            addCategoryObj:{},
            updateCategoryObj:{},
            defaultProps: {
                children: "children",
                label: "name"
            }
        };
    },
    methods: {
        loadTreeNodes(node, resolve) {
            if (node.level === 0) {
                this.$api
                    .getSelectContentCategoryByParentId()
                    .then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        }
                    })
                    .catch(error => {
                        resolve([]);
                    });
            }
            if (node.level >= 1) {
                this.$api
                    .getSelectContentCategoryByParentId({
                        id: node.data.pid
                    })
                    .then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        }
                    })
                    .catch(error => {
                        resolve([]);
                    });
            }
        },
        handleNodeClick(data) {
            this.$emit('onContent',data)
        },
        handleClose() {
            this.categoryVisible = false;
        },
        sureHandler() {
            this.$api.getInsertContentCategory({
                pid:this.addCategoryObj.pid,
                name:this.categoryName
            }).then(res =>{
                alert("添加成功");
                /**
                 * 强制程序页面刷新
                 */
                this.reload();
                this.categoryVisible = false;
            })
        },
        append(data){
            this.addCategoryObj = data
            this.categoryVisible = true;
        },
        remove(node, data){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                    })
                    .then(()=>{
                        this.$api.getDeleteContentCategoryById({
                            id:data.pid
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
        },
        update(node, data){

        },
        //修改的确定按钮
        sureUpdateHandler(){
            this.$api.getUpdateContentCategory({
                id:this.updateCategoryObj.pid,
                name:this.updateCategoryName
            })
            .then(res=>{
                if(res.data.status === 200){
                    //刷新页面
                    this.reload();
                    this.updateCategoryVisible =false;
                }else{
                    alert('修改失败')
                }
            })
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.append(data)}
                        >
                            添加
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.remove(node, data)}
                        >
                            删除
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.update(node, data)}
                        >
                            修改
                        </el-button>
                    </span>
                </span>
            );
        }
    }
};
</script>