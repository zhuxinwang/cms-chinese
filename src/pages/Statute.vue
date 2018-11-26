<template>
    <div class="public-width">
        <table class="statute-type-table">
            <tr>
                <td>
                    <img src="../assets/img/rightarrow.png" alt="">
                    注册法规
                </td>
                <td>
                    <ul class="statute-type-ul">
                        <li class="statute-type-item" v-for="(item,index) in statuteList" :class="item.isActive?'statute-type-item-active':''"
                            :key="item.aid" @click="changeChildList(1, index, item)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>

                </td>
                <td>
                    <ul class="statute-type-ul">
                        <li class="statute-type-item" v-for="(item,index) in secondStatuteList" :class="item.isActive?'statute-type-item-active':''"
                            :key="item.aid" @click="changeChildList(2, index, item)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ul class="statute-type-ul">
                        <li class="statute-type-item" v-for="(item,index) in thirdStatuteLsit" :class="item.isActive?'statute-type-item-active':''"
                            :key="item.aid" @click="changeChildList(3, index, item)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>

                </td>
                <td>
                    <ul class="statute-type-ul">
                        <li class="statute-type-item" v-for="(item,index) in fourthStatuteList" :class="item.isActive?'statute-type-item-active':''"
                            :key="item.aid" @click="changeChildList(3, index, item)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>
        <div class="statute-item-list">
            <div class="statute-nothave" v-if="articleList.length === 0">暂无法规</div>
            <div v-if="articleList.length !== 0" class="statute-item" v-for="item in articleList" :key="item.aid">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="2" :sm="3" :md="3" :lg="2" class-name="statute-item-img">
                        <img class="" :src="item.thumbnailUrl" alt="">
                    </Col>
                    <Col :xs="20" :sm="17" :md="18" :lg="20">
                        <div class="">
                            <div>
                                <span v-text="item.title"></span>
                            </div>
                            <div>
                            <span class="statute-item-info-abstract">
                              {{item.summary}}
                            </span>
                            </div>
                            <div>
                                <span class="statute-item-info-time">发布日期：{{item.createTime}}</span>
                            </div>
                        </div>
                    </Col>
                    <Col :xs="2" :sm="4" :md="3" :lg="2" class-name="statute-item-btn">
                        <button @click="jumpStatuteDetail(item.aid)">阅读</button>
                    </Col>
                </Row>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Statute",
        data() {
            return {
                // 一级注册法规列表
                statuteList: [],

                // 二级注册法规四级列表
                secondStatuteList: [],
                // 三级注册法规列表
                thirdStatuteLsit: [],
                // 四级注册法规列表
                fourthStatuteList: [],

                // 文章类型aid
                typeID: "",
                // 文章列表分页页数
                page: 0,
                // 文章列表每页条数
                size: 10,
                // 总页数
                totalElements:0,

                // 文章列表
                articleList:[],
            }
        },
        created() {
            this.getStatuteList();
        },
        methods: {
            // 请求注册法规列表
            getStatuteList() {
                let that = this;
                let statuteParam = {
                    typeAid: that.$GLOBAL.articleTypeForStatute
                };
                this.$network.post(that.$GLOBAL.getNavChildren, statuteParam, function (data) {
                    // console.log(that.convertTree(data));
                    that.statuteList = that.convertTree(data)[0].children;
                    that.statuteList[0].isActive = true;

                    // 二级注册法规四级列表
                    if (that.statuteList[0] && that.statuteList[0].children) {
                        that.secondStatuteList = that.statuteList[0].children;
                        that.secondStatuteList[0].isActive = true;
                    }
                    // 三级注册法规列表
                    if (that.secondStatuteList[0] && that.secondStatuteList[0].children) {
                        that.thirdStatuteLsit = that.secondStatuteList[0].children;
                        that.thirdStatuteLsit[0].isActive = true;
                    }
                    if (that.thirdStatuteLsit[0] && that.thirdStatuteLsit[0].children) {
                        that.fourthStatuteList = that.thirdStatuteLsit[0].children;
                        that.fourthStatuteList[0].isActive = true;
                    }

                    // 类型请求成功后根据类型请求文章列表
                    that.findDeepst(that.statuteList[0]);
                    that.getArticleList();
                })
            },

            // 点击法规导航切换子列表
            changeChildList(clickType, index,item) {
                if (clickType === 1) {
                    this.selectItemInNav(index,this.statuteList);
                    if (this.statuteList[index].children) {
                        this.secondStatuteList = this.statuteList[index].children;
                        this.selectItemInNav(0,this.secondStatuteList);
                    } else {
                        this.secondStatuteList = [];
                        this.thirdStatuteLsit = [];
                        this.fourthStatuteList = [];
                    }
                } else if (clickType === 2) {
                    this.selectItemInNav(index,this.secondStatuteList);
                    if (this.secondStatuteList[index].children) {
                        this.thirdStatuteLsit = this.secondStatuteList[index].children;
                        this.selectItemInNav(0,this.thirdStatuteLsit);
                    } else {
                        this.thirdStatuteLsit = [];
                        this.fourthStatuteList = [];
                    }
                } else if (clickType === 3) {
                    this.selectItemInNav(index,this.thirdStatuteLsit);
                    if (this.thirdStatuteLsit[index].children) {
                        this.fourthStatuteList = this.thirdStatuteLsit[index].children;
                        this.selectItemInNav(0,this.fourthStatuteList);
                    } else {
                        this.fourthStatuteList = [];
                    }
                }else {
                    this.selectItemInNav(index,this.fourthStatuteList);
                }

                // 找出子节点最深节点
                this.findDeepst(item);
                this.getArticleList();
            },

            // 点击递归找出树形结构最深的子节点
            findDeepst(obj) {
                if (obj.children) {
                    this.findDeepst(obj.children[0]);
                } else {
                    this.typeID = obj.aid;
                }
            },

            // 根据文章类型aid 查出文章列表
            getArticleList() {
                // 请求参数对象
                let getArticleListParam = {
                    languageTypeId: this.$GLOBAL.CHINESE_WEBSITE,
                    typeID: this.typeID,
                    page: this.page,
                    size: this.size
                };

                let that = this;
                this.$network.post(that.$GLOBAL.getArticle, getArticleListParam, function (data) {
                    that.articleList = data.content;

                    //获取总页数
                    that.totalElements = data.totalElements;
                    //拼接图片访问地址
                    let listLength = that.articleList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.articleList[i].thumbnailUrl) {
                            that.articleList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.articleList[i].thumbnailUrl;
                        }
                        that.articleList[i].createTime = that.$GLOBAL.timeConversion(that.articleList[i].createTime);
                    }
                });
            },

            /**
             * 建一个树形结构数组转为需要的结构
             *
             * @param {Array} tree 需要转换的tree
             * @param {Object} map 映射对象
             * @return {Array} 返回转换过后的tree
             */
            convertTree(tree){
                const result = [];

                // 遍历 tree
                tree.forEach((item) => {
                    // 读取 map 的键值映射
                    let {
                        aid,
                        fatherAid,
                        hyperlink,
                        name,
                        children,
                    } = item;
                    let isActive = false;

                    // 如果有子节点，递归
                    if (children) {
                        children = this.convertTree(children)
                    }

                    result.push({
                        aid,
                        fatherAid,
                        hyperlink,
                        name,
                        children,
                        isActive
                    })
                });

                return result;
            },

            // 找出导航一个节点，将其设置为选中样式
            selectItemInNav(index,list){
                let length = list.length;
                for(let i = 0; i < length; i++){
                    list[i].isActive = false;
                }
                list[index].isActive = true;
            },

            //3.查看法规详情
            jumpStatuteDetail: function (aid) {
                this.$router.push({path: 'statutedetail', query: {articleAid: aid,typeID:this.typeID}});
            }

        },
    }
</script>

<style scoped>
    .statute-type-table {
        width: 100%;
        border-collapse: collapse;
    }

    .statute-type-table > tr > td {
        border: 1px solid #ccc;
        padding: .8rem .6rem;
        height: 3.2rem;
    }

    .statute-type-table > tr > td img {
        width: 1rem;
        height: 1rem;
        padding-top: .2rem;
    }

    .statute-type-table > tr > td:first-child {
        width: 8rem;
        padding: .6rem 1rem;
        font-size: 1rem;
        text-align: center;
        font-weight: 600;
    }

    .statute-type-ul {
        list-style: none;
    }

    .statute-type-item {
        display: inline-block;
        padding: 0 .6rem;
        cursor: pointer;
    }

    .statute-type-item:hover {
        color: #2D8CF0;
    }

    .statute-type-item-active {
        color: #2D8CF0;
    }

    .statute-item-list {
        padding: 0 5rem;
        margin-top: 2rem;
    }

    .statute-item {
        margin-bottom: 2rem;
        padding-bottom: .6rem;
        border-bottom: 1px solid #ccc;
    }

    .statute-item-info-abstract {
        font-weight: 600;
        font-size: 1rem;
    }

    .statute-item-info-browse,
    .statute-item-info-time {
        display: inline-block;
        font-size: .9rem;
        padding-top: .2rem;
        padding-right: 2rem;
    }

    .statute-item-info-browse > img {
        width: 1rem;
        height: 1rem;
        vertical-align: middle;
    }

    .statute-item-img {
        text-align: center;
    }

    .statute-item-img > img {
        width: 4rem;
        height: 4rem;
    }

    .statute-item-btn {
        text-align: center;
    }

    .statute-item-btn > button {
        padding: .2rem 2rem;
        background-color: transparent;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
    }

    .statute-nothave{
        text-align: center;
        color: #999;
        font-size: 18px;
        margin-bottom: 50px;
    }

</style>
