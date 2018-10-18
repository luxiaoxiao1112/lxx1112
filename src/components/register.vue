<template>
    <div class="layout">
        <Form class="login">
            <FormItem>
                <!-- <div class="logo">
                    <img src="../assets/logo.png" />
                </div> -->
                <h2>注册</h2>
            </FormItem>
            <FormItem>
                <Input type="text" v-model="data.email">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
           </FormItem>
           <FormItem>
                <Input type="password" v-model="data.password">
                    <Icon type="ios-lock-outline" slot="prepend" />
                </Input>
           </FormItem>
           <FormItem>
                <div class="verify">
                    <Input class="verInput" type="text" v-model="data.verifiy">
                        <Icon type="ios-link-outline" slot="prepend" />
                    </Input>
                    
                    <div class="verifyCode">
                        <img style="height:35px" @load="verifyLoadState=true"  @click="toggleVerify" :src="srcCode">
                    </div>
                </div>
           </FormItem>
           <FormItem>
               <Button type="success" long @click="goRegister">注册</Button>
           </FormItem>
        </Form>
    </div>
</template>

<script>
    import axios from "axios";
    import { mapMutations  } from 'vuex'
    export default {
        data(){
            return {
                data:{
                    email:'',
                    password:'',
                    verifiy:''
                },
                srcCode:'/net/verifiycode.gif',
                verifyLoadState:false
            }
        },
        methods:{
            ...mapMutations([
                'updateUser'
            ]),
            toggleVerify(e){
                console.log(e)
                if(!this.verifyLoadState) return;
                // 防止下一次重复点击
                this.verifyLoadState =  false
                const base = '/net/verifiycode.gif'
                this.srcCode = base + '?' + e.timeStamp
            },
            goRegister(){               
                if(this.data.email && this.data.password && this.data.verifiy){
                    axios
                        .post('/net?action=register',this.data)
                        .then(res=>{
                            console.log(res.data)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                        this.data.password = ''
                        this.updateUser(this.data)
                        this.$router.push('/login')
                }else{
                    alert('参数不齐全')
                }
                
            }
        }
    }
</script>

<style scoped>
    .layout{
        margin-top: 50px;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .layout .login{
        width: 320px;
        padding: 10px 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 3px;
    }

    .layout .login h2{
        text-align: center;
    }

    /* .layout .login .logo{
        text-align: center;
    }

    .layout .login .logo img{
        width: 50px;
    } */

    .layout .login .verify{
        display: flex;
    }
    .layout .login .verify .verInput{
        width: 150px;
    }
    .layout .login .verify .verifyCode{
        height: 30px;
        margin-left: 10px;
    }
</style>