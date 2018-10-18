<template>
    <div class="users">
        <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>用户管理页面</BreadcrumbItem>
        </Breadcrumb>
        <div class="search">
            <Input style="width:400px" v-model="search" search enter-button placeholder="搜索用户" />
        </div>

        <div class="userstable">
            <Table :columns="columns" size="small" :data="userInfo"></Table>
        </div>

        <div class="pagelist">
            <Page :total="60" size="small" />
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data(){
            return {
                search:'',
                data:[],
                columns:[
                    {
                        title: '#',
                        key: 'id',
                        width:50
                    },
                    {
                        title:"头像",
                        key: 'upic',
                        width:100,
                        render:(h,params)=> {
                            // console.log(params)
                            return h('Avatar',{
                                props:{
                                    src: params.row.upic
                                }
                            })
                        }
                    },
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '注册日期',
                        key: 'date'
                    },
                    {
                        title: '管理',
                        render:(h, params)=>{
                            return h('Button',{
                                props:{
                                    size:'small',
                                    type:'error'
                                },
                                on:{
                                    click:()=>{
                                       this.data.splice(params.index,1)
                                    }
                                }
                            },'删除')
                        }
                    }
                ]
            }
        },
        created() {
            axios.get('/user').then(res=>{
                this.data = res.data.data
            }).catch(err=>{
                console.log(err)
            })
        },
        computed:{
            userInfo(){
                return this.data.filter(k=>{
                    console.log(k)
                    return k.email.indexOf(this.search) > -1
                })
            }
        }
    }
</script>

<style scoped>
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
    .search{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .userstable{
        flex: 1;
        width: 100%;
        padding: 0 50px;
    }
    .pagelist{
        text-align: center
    }
</style>