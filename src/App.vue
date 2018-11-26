<template>
    <div id="app">
        <div class="master">
            <div class="master-header">
                <div class="master-header-content">
                    <img class="master-header-img" :src="websiteBaseInfo.logoPath"/>
                    <div class="header-right">
                        <Drawer :title=websiteBaseInfo.name :closable="false" v-model="showDrawer">
                            <div class="drawer-loginAndRegister">
                                <Button>登录</Button>
                                <Button>注册</Button>
                            </div>
                            <div class="master-Menu">
                                <Menu ref="contactMenu" mode="vertical" :active-name=activeName @on-select="updateMenu">
                                    <MenuItem :name=item.aid v-for="(item,index) in masterNavigationList" :key="index"
                                              :to="item.aid !== 5?item.hyperlink:''">
                                        <span v-if="item.aid !== 5">{{item.name}}</span>
                                        <span v-if="item.aid === 5" class="master-item-business">
                                            <Icon type="ios-arrow-forward" />
                                            <Icon type="ios-arrow-down" class="master-item-display" />
                                            <span>{{item.name}}</span>
                                            <!--<Collapse class="menu-left-downlist">-->
                                                <!--<Panel name="1">-->
                                                    <!--{{item.name}}-->
                                                    <!--<div slot="content">-->
                                                      <!--<ul class="menu-left-downlist-list">-->
                                                        <!--<li><span>注册服务</span></li>-->
                                                        <!--<li><span>翻译服务</span></li>-->
                                                        <!--<li><span>价格调研</span></li>-->
                                                      <!--</ul>-->
                                                    <!--</div>-->
                                                <!--</Panel>-->
                                            <!--</Collapse>-->
                                            <!--<div class="">-->
                                                <ul class="master-item-business-list">
                                                <li><span>注册服务</span></li>
                                                <li><span>翻译服务</span></li>
                                                <li><span>价格调研</span></li>
                                                </ul>
                                            <!--</div>-->
                                        </span>
                                    </MenuItem>
                                </Menu>
                                <!--<Tree :data="data1"></Tree>-->
                            </div>
                        </Drawer>
                        <div class="master-drawer-button">
                            <Icon @click="showDrawer = true" type="md-menu" size=30 />
                        </div>

                        <div class="loginAndRegister">
                            <Button>登录</Button>
                            <Button>注册</Button>
                        </div>
                        <div class="header-search">
                            <Input v-model="titleKey">
                                <Select class="articleTypeSelect" v-model="articleTypeId" slot="prepend">
                                    <Option v-for="(selectOption,index) in headerSearchOption" :key="index"
                                            :value=selectOption.aid>{{selectOption.name}}
                                    </Option>
                                </Select>
                                <Button slot="append" icon="ios-search" @click="searchStatuteOrNews()"></Button>
                            </Input>
                        </div>

                        <div class="can-show-menu master-Menu">
                            <Menu ref="contactMenu" mode="horizontal" :active-name=activeName @on-select="updateMenu">
                                <MenuItem :name=item.aid v-for="(item,index) in masterNavigationList" :key="index"
                                          :to="item.aid !== 5?item.hyperlink:''">
                                    <span v-if="item.aid !== 5">{{item.name}}</span>
                                    <span v-if="item.aid === 5">
                                        <Dropdown>
                                            <a href="javascript:void(0)">
                                                {{item.name}}
                                                <Icon type="ios-arrow-down"></Icon>
                                            </a>
                                            <DropdownMenu slot="list">
                                                <a href="http://www.ynyplt.com/i-register"><DropdownItem>注册服务</DropdownItem></a>
                                                <DropdownItem>翻译服务</DropdownItem>
                                                <DropdownItem>价格调研</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </span>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            <div class="small-screen-header-search">
                <Input v-model="titleKey">
                    <Select class="articleTypeSelect" v-model="articleTypeId" slot="prepend">
                        <Option v-for="(selectOption,index) in headerSearchOption" :key="index" :value=selectOption.aid>
                            {{selectOption.name}}
                        </Option>
                    </Select>
                    <Button slot="append" icon="ios-search" @click="searchStatuteOrNews()"></Button>
                </Input>
            </div>
            <div style="padding-bottom: 265px">
            <router-view></router-view>
            </div>

            <div class="master-foot">
                <div class="master-foot-content">
                    <div class="master-foot-about-us">
                        <h3 class="about-us-top">联系我们</h3>
                        <div>
                            <img class="foot-ioc" src="./assets/ioc/address.png"/> 云南省昆明市北京路175号外贸大楼603、604室　
                        </div>
                        <div>
                            <img class="foot-ioc" src="./assets/ioc/phone.png"/> 0871-68183761
                        </div>
                        <div>
                            <img class="foot-ioc" src="./assets/ioc/wechat.png"/> wechat
                        </div>
                        <div>
                            <img class="foot-ioc" src="./assets/ioc/qq.png"/> 321540346
                        </div>
                        <div>
                            <img class="foot-ioc" src="./assets/ioc/email.png"/> ynyplthyxh@163.com
                        </div>
                    </div>
                    <div class="about-icp">
                        <div>Copyright © <span v-text="websiteBaseInfo.name"></span></div>
                        <div v-text="websiteBaseInfo.icpCode"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
        , data() {
            return {
                websiteBaseInfo: {
                    name: ''
                    , logoPath: ''
                    , domain: ''
                    , icpCode: ''
                    , webCountCode: ''
                }
                , activeName: 1   //默认选中的菜单
                , masterNavigationList: []
                , masterNavigationListDic: []
                , titleKey: ''
                , articleTypeId: '1'
                , showDrawer: false
                , headerSearchOption: [
                    {
                        aid: '0'
                        , name: "法规"
                    },
                    {
                        aid: '1'
                        , name: "新闻"
                    }
                ]
            }
        },
        //页面加载时
        created: function () {
            this.websiteBase();
            this.masterNavigation();
        },
        //方法
        methods: {
            //1.加载网站基本信息
            websiteBase: function () {
                let that = this;
                let websiteBashParams = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                };
                this.$network.post(that.$GLOBAL.websiteInfo, websiteBashParams, function (data) {
                    that.websiteBaseInfo = data;
                    //拼接图片访问地址
                    that.websiteBaseInfo.logoPath = that.$GLOBAL.UrlPrefix + that.websiteBaseInfo.logoPath;
                })
            }
            //2.加载导航的标题
            , masterNavigation: function () {
                let that = this;
                let masterNavigationParams = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                };
                this.$network.post(that.$GLOBAL.masterNavigation, masterNavigationParams, function (data) {
                    //加载当前默认选中的菜单
                    that.masterNavigationList = data;
                    let masterNavigationListLength = that.masterNavigationList.length;
                    for (let i = 0; i < masterNavigationListLength; i++) {
                        //1.将案例详情路由和新闻详情路由加载到字典数组中
                        let masterNavigationName = that.masterNavigationList[i]["hyperlink"];
                        let masterNavigationAid = that.masterNavigationList[i]["aid"];
                        if (masterNavigationName === "news") {
                            //添加新闻详情的路由
                            that.masterNavigationListDic["newsdetails"] = masterNavigationAid;
                        } else if (masterNavigationName === "registrationcase") {
                            //添加案例详情路由
                            that.masterNavigationListDic["registrationcasedetails"] = masterNavigationAid;
                        }
                        //将标题栏存储成字典
                        that.masterNavigationListDic[masterNavigationName] = masterNavigationAid;
                    }
                    that.defaultSelect();
                    //刷新默选中的菜单
                    that.$nextTick(() => {
                        that.$refs.contactMenu.updateOpened();
                        that.$refs.contactMenu.updateActiveName()
                    });
                    console.log(that.masterNavigationList)
                })
            }

            //3.更新导航
            , updateMenu: function (name) {
                //替换默认训中id
                this.activeName = name;
                //关闭侧边抽屉
                this.showDrawer = false;
            }

            //4.点击搜索跳转
            , searchStatuteOrNews: function () {
                if (this.titleKey !== '') {
                    if (this.articleTypeId === '0') {
                        //跳转到法规搜索法规
                        this.$router.push({path: 'statute', query: {title: this.titleKey}});
                    } else if (this.articleTypeId === '1') {
                        //跳转到新闻搜索新闻
                        this.$router.push({path: 'news', query: {title: this.titleKey}});
                    }
                }
            }

            //5.刷新默认选中问题
            , defaultSelect: function () {
                let path;
                if (this.$route.path !== '/') {
                    path = this.$route.path;  // 获取到地址拦上#号后面的url地址
                    path = path.substr(1);
                }
                for (let itemDic in this.masterNavigationListDic) {
                    if (itemDic === path) {
                        this.activeName = this.masterNavigationListDic[itemDic];
                    }
                }
            }
        }

        //检测路由变化
        , watch: {
            $route(to, from) {
                this.defaultSelect();
            }
        }

    }
</script>

<style scoped lang="less">
    @import "./assets/css/common.less";

    .master {
        margin-top: 0.2rem;
        min-height: 100%;
        height: auto!important;
        height: 100%;/* 兼容IE6，IE6不支持min-height */
        position: relative;
    }

    .master-header {
        width: 100%;
        border-bottom: 1px solid @item-color;
    }

    .master-header-content {
        width: 1200px;
        margin: 0 auto;
        height: 5.5rem;
    }

    .master-header-img {
        float: left;
        width: 15.4rem;
        height: 4.3rem;
    }

    .drawer-loginAndRegister {
        margin: 1rem auto;
        text-align: center;
    }

    .master-Menu {

    }

    /*将下拉筛选框浮在上面*/
    .ivu-input-group {
        z-index: 999;
    }

    /*改变导航的高度*/
    .ivu-menu-horizontal {
        height: 100%;
        line-height: 40px;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        background: transparent;
    }

    .ivu-menu-item {
        font-size: 1.1rem;
    }

    .ivu-tabs-bar {
        border-bottom: none;
        margin-bottom: 3px;
    }

    /* 顶部导航下拉模块颜色 */
    .ivu-menu-item .ivu-dropdown-rel > a {
        color: #515a6e;
    }

    .ivu-menu-item .ivu-dropdown-rel > a:hover {
        color: #2d8cf0;
    }

    .articleTypeSelect {
        width: 5rem;
    }

    .master-foot {
        width: 100%;
        /*height: 100%;*/
        background-color: #333;

        position: absolute;
        bottom: 0;
        /*width: 100%;*/
        /*height: 60px;*/
        /*background: #6cf;*/
        height: 265px;
        clear: both;
    }

    .master-foot-about-us {
        margin-top: 1rem;
        color: white;
    }

    .master-foot-about-us > div {
        margin-top: 0.8rem;
    }

    .foot-ioc {
        vertical-align: middle; /*图片和文字垂直居中对齐*/
        height: 1.42rem;
        width: 1.42rem;
    }

    .about-icp {
        margin-top: 0.5rem;
        color: white;
        text-align: center;
    }

    .about-us-top {
        padding-top: 1rem;
    }

    .master-foot-content {
        width: 1200px;
        margin: 0 auto;
    }

    .header-right {
        float: right;
        margin-top: 0.3rem;
    }

    .master-drawer-button {
        float: right;
        margin-right: 1rem;
    }

    .master-item-business{
        position: relative;
    }

    .master-item-business:hover > .ivu-icon-ios-arrow-down{
        display: inline-block;
    }

    .master-item-business:hover > .ivu-icon-ios-arrow-forward{
        display: none;
    }

    .master-item-business:hover .master-item-business-list{
        height: 100px;
        padding-top: 10px;
    }

    .master-item-business-list{
        color: #666;
        padding-left: 20px;
        height: 0;
        list-style: none;
        overflow: hidden;

        transition: all .4s;
    }

    .master-item-business-list > li{
        padding: 4px 0;
    }

    .master-item-business-list > li:hover{
        color: #2d8cf0;
    }

    .master-item-display{
        display: none;
    }

    /*屏幕大于1200px*/
    @media screen and (min-width: 1200px) {
        .master-foot-content {
            width: 1200px;
            margin: 0 auto;
        }

        .master-drawer-button {
            display: none;
        }

        .loginAndRegister {
            float: right;
        }

        .header-search {
            /*margin-left: 18%;*/
            width: 25rem;
            z-index: 999;
        }

        .small-screen-header-search {
            display: none;
        }

    }

    /*屏幕大于960px而小于1200px*/
    @media screen and (min-width: 960px) and (max-width: 1199px) {
        .master-foot-content {
            width: 1200px;
            margin: 0 auto;
        }

        .master-drawer-button {
            display: none;
        }

        .loginAndRegister {
            float: right;
        }

        .header-search {
            /*margin-left: 18%;*/
            width: 25rem;
            z-index: 999;
        }

        .small-screen-header-search {
            display: none;
        }

    }

    /*屏幕大于768px而小于960px*/
    @media screen and (min-width: 768px) and (max-width: 959px) {
        .master-header-content,
        .master-foot-content {
            width: 100%;
        }

        .loginAndRegister {
            display: none;
        }

        .can-show-menu {
            display: none;
        }

        .header-search {
            display: none;
        }

        .header-search {
            display: none;
        }

        .small-screen-header-search {
            margin-top: 0.5rem;
        }

    }

    /*屏幕大于480px而小于768px*/
    @media screen and (min-width: 480px) and (max-width: 767px) {
        .master-header-content,
        .master-foot-content {
            width: 100%;
        }

        .loginAndRegister {
            display: none;
        }

        .can-show-menu {
            display: none;
        }

        .header-search {
            display: none;
        }

        .small-screen-header-search {
            margin-top: 0.5rem;
        }
    }

    /*屏幕小于480px*/
    @media screen and (max-width: 479px) {
        .master-header-content,
        .master-foot-content {
            width: 100%;
        }

        .loginAndRegister {
            display: none;
        }

        .can-show-menu {
            display: none;
        }

        .header-search {
            display: none;
        }

        .small-screen-header-search {
            margin-top: 0.2rem;
        }

    }


</style>

<style lang="less">
    /**
    scoped 作用于当前界面，而去掉scoped后作用于全局，所有可以覆盖iview原有的样式。
    */

    html,body {
        margin: 0;
        padding: 0!important;
        height: 100%;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 1rem;
        height: 100%;
    }

    /*屏幕大于1200px*/
    @media screen and (min-width: 1200px) {
        .public-width {
            max-width: 1200px;
            margin-top: 1.5rem;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /*屏幕大于960px而小于1200px*/
    @media screen and (min-width: 960px) and (max-width: 1199px) {
        .public-width {
            width: 1200px;
            margin-top: 1.5rem;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /*屏幕大于768px而小于960px*/
    @media screen and (min-width: 768px) and (max-width: 959px) {
        .public-width {
            width: 100%;
            margin-top: 1.5rem;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /*屏幕大于480px而小于768px*/
    @media screen and (min-width: 480px) and (max-width: 767px) {
        .public-width {
            width: 100%;
            margin-top: 1.5rem;
            margin-left: auto;
            margin-right: auto;
        }
    }

    /**
    分页样式
     */
    .page-paging {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    /* 查看全部 */
    .public-all {
        padding-right: 1rem;
        padding-bottom: 5px;
        text-align: right;
        color: #2D8CF0;
    }

    .menu-left-downlist {
        background-color: transparent;
        border-color: transparent;
        font-size: 1rem;
    }

    .menu-left-downlist > .ivu-collapse-item {
        margin-left: -24px;
    }

    .menu-left-downlist > .ivu-collapse-item > .ivu-collapse-header {
        padding-left: 0;
    }

    .menu-left-downlist > .ivu-collapse-item > .ivu-collapse-header > i {
        margin-right: 0 !important;
    }

    .menu-left-downlist > .ivu-collapse-item.ivu-collapse-item-active > .ivu-collapse-header {
        border: 0;
    }

    .menu-left-downlist .ivu-collapse-content > .ivu-collapse-content-box {
        padding: 0;
    }

    .menu-left-downlist-list {
        padding-left: 15px;
        list-style: none;
        font-size: 1rem;
    }

</style>
