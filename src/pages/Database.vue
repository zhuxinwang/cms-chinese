<template>
    <div class="public-width">
        <h1>数据库</h1>

        <Menu mode="horizontal" :theme="theme1" active-name=31>
            <MenuItem name=1>
                <Icon type="ios-paper"/>
                内容管理
            </MenuItem>
            <MenuItem name=2>
                <Icon type="ios-people"/>
                用户管理
            </MenuItem>
            <Submenu name=3>
                <template slot="title">
                    <Icon type="ios-stats"/>
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name=31>新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4">
                <Icon type="ios-construct"/>
                综合设置
            </MenuItem>
        </Menu>
        <br>
        <p>Change theme</p>
        <RadioGroup v-model="theme1">
            <Radio label="light"></Radio>
            <Radio label="dark"></Radio>
            <Radio label="primary"></Radio>
        </RadioGroup>
    </div>

</template>

<script>
    export default {
        name: "Database"
        , data() {
            return {
                theme1: 'light'
            }
        }
        , methods: {}
        , mounted() {  // 组件初始化后执行

        }

    }
</script>

<style scoped>

</style>
