<template>
    <Header>
            <Menu mode="horizontal" @on-select="meunSelect" theme="dark">
                <div class="logo" style="width:200px;float: left;">
                    <!-- <img src="../assets/logo.png"  style="width:30px;"> -->
                    <!-- <Button icon="ios-menu" size="small"></Button> -->
                </div>
                <MenuItem name="/">
                    管理首页
                </MenuItem>

                <div class="userinfo">
                    欢迎您：{{this.user.email}}
                    <Button class="btn" type="error" shape='circle' @click="logout">退出登录</Button>
                </div>

               

                <MenuItem name="/login" v-if="!this.user.email">
                    登录
                </MenuItem>
                <MenuItem name="/register"  v-if="!this.user.email">
                    注册
                </MenuItem>
            </Menu>
        </Header>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        computed:{
            ...mapGetters([
                'user'
            ])
        },
        methods:{
            ...mapMutations([
                'updateUser'
            ]),
            logout(){
                this.updateUser({})
                this.$router.push('/login')
            },
            meunSelect(e){
                console.log(e)
                this.$router.push(e)
            }
        }
    }
</script>

<style scoped>
    .userinfo{
        color: #fff;
    }
    .userinfo .btn{
        margin-left: 10px;
    }
</style>