<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登陆|注册</span>
            </div>
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>

import api from "../../api"
import { mapMutations } from "vuex"

export default {
    name:"Login",
    data(){
        return{
           form:{} 
        }
    },
    methods:{
        ...mapMutations("loginModule",["setToken"]),
        onSubmit(){
            api.login({
                username:this.form.username,
                password:this.form.password
            }).then(res => {
                /**
                    数据存储：
                        vuex
                        本地localStorage
                 */
                if(res.data.code === 200){
                    this.setToken(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    this.$router.replace("/")
                }else{
                    alert(res.data.msg)
                }
            })
        }
    }
}
</script>
<style scoped>

.login {
    width: 100%;
}
.box-card {
    width: 600px;
    margin: 0 auto;
    margin-top: 100px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

</style>