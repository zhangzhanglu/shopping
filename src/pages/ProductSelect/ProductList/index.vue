<template>
    <div class="product-list">
        <div>
            <el-button type="primary" @click="addProduct">添加商品</el-button>
        </div>
        <!-- 商品列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="商品ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="title" label="商品标题"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="商品图片"></el-table-column>
            <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点"></el-table-column>
            <el-table-column show-overflow-tooltip prop="price" label="商品价格"></el-table-column>
            <el-table-column show-overflow-tooltip prop="cid" label="商品类目"></el-table-column>
            <el-table-column show-overflow-tooltip prop="num" label="商品库存"></el-table-column>
            <el-table-column show-overflow-tooltip prop="status" label="状态"></el-table-column>
            <el-table-column show-overflow-tooltip prop="created" label="创建时间"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        icon="el-icon-edit"
                        circle
                        @click="handleEdit(scope.$index, scope.row)"
                    ></el-button>
                    <el-button
                        size="mini"
                        icon="el-icon-delete"
                        type="danger"
                        circle
                        @click="handleDelete(scope.$index, scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <ProductPagination @onSend="getPagination" />
        <!-- 添加产品对话框 -->
        <el-dialog
            title="添加产品"
            :visible.sync="dialogAddProductVisible"
            width="80%"
            :before-close="handleClose"
        >
            <!-- 商品类目选择对话框 -->
            <el-dialog
                width="60%"
                title="商品类目"
                :visible.sync="dialogProductCategoryVisible"
                append-to-body
            >
                <!-- 类目tree -->
                <el-tree
                    :load="loadTreeNodes"
                    :props="defaultProps"
                    lazy
                    highlight-current
                    @node-click="handleNodeClick"
                ></el-tree>
                <span>
                    <el-button type="primary" @click="dialogProductCategoryVisible = false">确定</el-button>
                </span>
            </el-dialog>
            <!-- 添加商品表单 -->
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="商品类目">
                    <el-button style="float:left" type="primary" @click="productCategoryHandle">选择类目</el-button>
                    <span style="float:left;margin-left:10px">{{currentCategory && currentCategory.name }}</span>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input v-model="product.title"></el-input>
                </el-form-item>
                <el-form-item label="商品买点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
                    <!-- 上传图片对话框 -->
                    <el-dialog
                        title="上传图片"
                        :visible.sync="dialogUploadImgVisible"
                        width="40%"
                        :before-close="handleClose"
                        append-to-body
                    >
                        <ProductUpload @onUpload="getUploadHandle"/>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                    <span>{{ uploadData.name }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                    <ProductUEditor @onProductDesc="getProductDesc" />
                </el-form-item>
                <!-- 提交商品按钮 -->
                <el-button @click="dialogAddProductVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitProductHandler">确 定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import ProductPagination from "../ProductPagination";
import ProductUEditor from "../ProductUEditor";
import ProductUpload from "../ProductUpload"

export default {
    name: "ProductList",
    data() {
        return {
            tableData: [],
            dialogAddProductVisible: false,
            dialogProductCategoryVisible: false,
            dialogUploadImgVisible:false,
            currentCategory:{},
            product: {},
            defaultProps: {
                children: "children",
                label: "name"
            },
            uploadData:{},
            updateFlagId:0  //要被修改的数据的id
        };
    },
    components: {
        ProductPagination,
        ProductUEditor,
        ProductUpload
    },
    mounted() {
        this.http();
    },
    methods: {
        http(){
            this.$api.getSelectTbItemAllByPage({
                page: 1
            })
            .then(res => {
                if (res.data.status === 200) {
                    this.tableData = res.data.data.result;
                } else {
                    alert("数据获取失败");
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        // 分页数据回传
        getPagination(tableData) {
            this.tableData = tableData;
        },
        // 产品添加事件
        addProduct() {
            this.dialogAddProductVisible = true;
            this.product={}
        },
        // 关闭添加产品对话框
        handleClose() {
            this.dialogAddProductVisible = false;
        },
        // 类目呈现
        productCategoryHandle() {
            this.dialogProductCategoryVisible = true;
        },
        // 获取描述数据
        getProductDesc(desc) {},
        // tree懒加载事件
        loadTreeNodes(node, resolve) {
            this.currentCategory = node.data
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
                this.$api.getSelectItemCategoryByParentId({
                    id:node.data.cid
                }).then(res => {
                    if (res.status === 200) {
                        return resolve(res.data.data);
                    } else {
                        alert("请求失败");
                    }
                }).catch(error =>{
                    resolve([])
                })
            }
        },
        // tree点击事件
        handleNodeClick(data) {
            // console.log(data);
        },
        
          //上传图片按钮
        uploadHandle(){
            this.dialogUploadImgVisible = true
        },
          //获取上传图片资源
        getUploadHandle(data){
            this.uploadData = data
        },
        //提交商品
       submitProductHandler(){
           
           console.log(this.updateFlagId)
           this.dialogAddProductVisible = false;
           if(this.updateFlagId){
               //修改
               this.$api.getUpdateTbItem({
                    id:this.updateFlagId,
                    title:this.product.title,
                    sellPoint:this.product.sellPoint,
                    price:this.product.price,
                    num:this.product.num,
                    cid:this.currentCategory.cid,
                    desc:this.getProductDesc,
                    image:this.uploadHandle.name
               })
               .then(res=>{
                   console.log(res.data)
                   if(res.data.status === 200){
                       this.http()
                   }
                   else{
                       alert(res.data.msg)
                   }
               })
           }
           else{
               //新增
               this.$api.getInsertTbItem({
                    title:this.product.title,
                    sellPoint:this.product.sellPoint,
                    price:this.product.price,
                    num:this.product.num,
                    cid:this.currentCategory.cid,
                    desc:this.getProductDesc,
                    image:this.uploadHandle.name
                })
                .then(res=>{
                    console.log(res.data)
                    if(res.data.status === 200){
                        //刷新页面：重新做一次网络请求
                        this.http();
                    }
                    else{
                        alert(res.data.msg)
                    }
                });
            }
           
           
       },
       //编辑----修改产品
       handleEdit(index,row){
           this.dialogAddProductVisible = true;
           //预更新
           this.$api.getPreUpdateItem({
               itemId:row.id
           })
           .then(res=>{
               console.log(res.data)
               this.product={
                    title : res.data.data.title,
                    sellPoint : res.data.data.sellPoint,
                    price : res.data.data.price,
                    num : res.data.data.num,
                    cid : res.data.data.cid,
                    desc :  res.data.data.desc,
                    image : res.data.data.name
               }
               this.updateFlagId = res.data.data.id
           })
       },
       //删除产品
       handleDelete(index,row){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
            })
            .then(()=>{
                this.$api.getDeleteItemById({
                    itemId:row.id
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
};
</script>
<style scoped>
.product-list {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
}
.upload-img {
    width: 200px;
    float: left;
    margin-left: 10px;
}
</style>