<template>
    <Layout class="layout">
        <PageHeader />
        <Layout class="content">
            <Sider :width="200" style="background:#f2f2f2;flex:1;">
                <PageMenu />
            </Sider>
            <Layout>
                <router-view />
            </Layout>
        </Layout>
    </Layout>
</template>
<script>
    import PageHeader from '@/components/PageHeader'
    import PageMenu from '@/components/PageMenu'
    export default {
        components:{
            PageHeader,
            PageMenu
        }
    }
</script>

<style scoped>
    .layout{
        background: #f2f2f2;
        height: 100%;
        width: 100%;
    }
</style>