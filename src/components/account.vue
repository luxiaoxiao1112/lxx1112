<template>
    <div class="users">
        <Tabs class="mine-tab" type="card" closable @on-tab-remove="handleTabRemove">
            <TabPane label="账户" v-if="tab0"></TabPane>
            <!-- <TabPane label="消息" v-if="tab1"></TabPane>
            <TabPane label="其他设置" v-if="tab2"></TabPane> -->
        </Tabs>

        <div class="account">
            <section>
                
                <div class="account-email">
                    <label for="name" class="account-label">邮箱</label> 
                    <Input type="text" placeholder="请输入您的邮箱" v-on:input="focus" class="account-input" v-model="data.email" clearable />
                </div> 
                <div class="account-password">
                    <label for="email" class="account-label">新密码</label> 
                    <Input type="password" placeholder="请输入您的密码" v-on:input="focus" class="account-input" v-model="data.password" clearable />
                </div> 
                <div class="account-password">
                    <label for="email" class="account-label">确认密码</label> 
                    <Input type="password" placeholder="请再次输入密码"  v-on:input="focus" class="account-input" v-model="data.passwordAgain" clearable />
                </div> 
                <div class="success">{{data.success}}</div>
                <Button class="account-btn" type="primary" @click="click">提交</Button>
                
            </section>
        </div>
        
    </div>
</template>

<script>
    import axios from "axios";
    import { mapGetters,mapMutations } from "vuex";

    export default {
        data() {
            return {
                tab0: true,
                // tab1: true,
                // tab2: true,
                data:{
                    email:'',
                    password:'',
                    passwordAgain:'',
                    success:''
                }
                
            }
        },
        computed:{
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            focus(){
                this.data.success = ''
            },
            ...mapMutations([
                'updateUser'
            ]),
            handleTabRemove (name) {
                this['tab' + name] = false;
            },
            click(){
                const regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
                if(this.data.email && this.data.password){
                    if(!regEmail.test(this.data.email)){
                        this.data.success = '邮箱格式不正确'
                    }else if(this.data.password != this.data.passwordAgain){
                        this.data.success = '密码不一致,请重新输入'
                    }else{
                        this.data.success = '提交成功'
                        setTimeout(() => {
                            this.data.success = ''
                        }, 2000);
                        this.data.password = ''
                        this.data.passwordAgain = ''
                        this.updateUser(this.data)
                    }
                }else{
                    this.data.success = '请输入信息'
                }
                
            }
        }
    }
</script>

<style scoped>
    .success{
        margin: 5px 0 0 100px;
        color: red;
        font-size: 16px;
    }
    .users{
        background: #fff;
        height: 100%;
        margin: 10px;
        padding: 10px;
        padding-right: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        position: relative;
    }
    .mine-tab{
        margin: 40px 0 0 15px;
    }
    .users .account{
        margin: 30px 0 0 20px; 
    }
    .ivu-input-wrapper{
        width: 200px;
        height: 30px;
        margin-left: 15px;
    }
    .users .account .account-label{
        display: inline-block;
        font-size: 16px;
        color: #6a6c72;
        width: 80px;
        line-height: 24px;
        text-align: right;
    }
    .account .account-email{
        margin-bottom: 20px;
    }
    .account .account-password{
        margin-top: 20px;
    }
    .account .account-btn{
        margin : 20px 0 0 100px;
    }
</style>