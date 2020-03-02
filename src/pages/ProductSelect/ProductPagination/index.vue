<template>
    <div>
        <el-pagination
            background
            :current-page="currentPage"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="100">
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:"ProductPagination",
    data(){
        return{
            currentPage:1,
            tableData:[]
        }
    },
    methods:{
        handleCurrentChange(currentPage){
            this.$api.getSelectTbItemAllByPage({
                page:currentPage
            }).then(res =>{
                if(res.data.status === 200){
                    this.tableData = res.data.data.result;
                    this.$emit("onSend",this.tableData)
                }else{
                    alert(res.data.msg)
                    this.currentPage = 1;
                }
            }).catch(error =>{
                console.log(error)
            })
        }
    }
}
</script>