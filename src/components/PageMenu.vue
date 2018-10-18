<template>
    <Menu width="200px" active-name="/users" @on-select="select">
        <MenuGroup title="用户管理">
            <MenuItem name="/users">
                <Icon type="md-document" />
                用户信息管理
            </MenuItem>
            <MenuItem name="/info">
                <Icon type="md-document" />
                个人信息管理
            </MenuItem>
            
        </MenuGroup>
    </Menu>
</template>

<script>
    export default {
        methods:{
            select(name){
                this.$router.push(name)
            }
        }
    }
</script>

<style scoped>

</style>