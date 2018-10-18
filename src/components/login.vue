<template>
    <div class="layout">
        <Form class="login">
            <FormItem >
                <h2>登录</h2>
            </FormItem>
            <FormItem :error="errors.email">
                <Input type="text" @input="errors.email = ''" v-model="datas.email">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
           </FormItem>
           <FormItem :error="errors.password">
                <Input type="password" @input="errors.password = ''"  v-model="datas.password">
                    <Icon type="ios-lock-outline" slot="prepend" />
                </Input>
           </FormItem>
           <FormItem :error="errors.verifiy">
                <div class="verify">
                    <Input class="verInput" type="text" @input="errors.verifiy = ''" v-model="datas.verifiy">
                        <Icon type="ios-link-outline" slot="prepend" />
                    </Input>
                    
                    <div class="verifyCode">
                        <img style="height:35px;" @click="toggle" :src="verifiyCode">
                    </div>
                </div>
           </FormItem>
           <FormItem>
               <Button type="primary" long @click="login">登录</Button>
           </FormItem>
        </Form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations  } from 'vuex'
    export default {
        data() {
            return {
                errors: {
                    email:'',
                    password:'',
                    verifiy:''
                },
                datas:{
                    email:'',
                    password:'',
                    verifiy:''
                },
                verifiyCode:'net/verifiycode.gif'
            }
        },
        methods:{
            ...mapMutations([
                'updateUser'
            ]),
            toggle(e){
                const baseUri = 'net/verifiycode.gif'
                this.verifiyCode = baseUri + '?' + e.timeStamp
            },
            login(){
                // 基础判断email
                if(!this.datas.email) 
                this.$set(this.errors,'email','邮箱不能为空')

                // 基础判断password
                if(!this.datas.password) 
                this.$set(this.errors,'password','密码不能为空')

                // 基础判断verifiy
                if(!this.datas.verifiy) 
                this.$set(this.errors,'verifiy','验证码不能为空')

                let length = Object.keys(this.errors).filter(k=>{
                    return this.errors[k].length > 0
                })

                if(length > 0) return;
                console.log(length)
                axios
                .post('/net?action=login',this.datas)
                .then(({data})=>{
                    const { code,error } = data;
                    if(code === 0){
                        this.errors = {
                            email:error.email ? error.email : '',
                            password:error.password ? error.password : '',
                            verifiy:error.verifiy ? error.verifiy : ''
                        }
                    }else if(code === 1){
                        this.datas.password = ''
                        this.updateUser(this.datas)
                        this.$router.push('/')
                    }
                })
                .catch(err=>{
                    console.error(err)
                })
            }
        }
    }
</script>

<style scoped>
    .layout{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
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
    .layout .login .logo img{
        width: 50px;
    }

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