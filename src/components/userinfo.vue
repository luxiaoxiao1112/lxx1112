<template>
    <div class="users">
        <Breadcrumb>
            <BreadcrumbItem to="/">首页</BreadcrumbItem>
            <BreadcrumbItem>个人管理页面</BreadcrumbItem>
        </Breadcrumb>

        <Button class="users-btn" to="/account" type="warning">修改个人信息</Button>
        <router-view />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tab0: true,
                tab1: true,
                tab2: true
            }
        },
        methods: {
            handleTabRemove (name) {
                this['tab' + name] = false;
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
    .users .users-btn{
        width: 100px;
        margin: 30px 0 0 20px;
    }
</style>