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
                        <li class="statute-type-item statute-type-item-active" v-for="(item,index) in statuteList"
                            :key="item.aid" @click="changeChildList(1,index)">
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
                        <li class="statute-type-item statute-type-item-active" v-for="(item,index) in secondStatuteList"
                            :key="item.aid" @click="changeChildList(2,index)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <ul class="statute-type-ul">
                        <li class="statute-type-item statute-type-item-active" v-for="(item,index) in thirdStatuteLsit"
                            :key="item.aid" @click="changeChildList(3,index)">
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
                        <li class="statute-type-item statute-type-item-active" v-for="(item,index) in fourthStatuteList"
                            :key="item.aid" @click="changeChildList(3,index)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </td>
            </tr>
        </table>
        <div class="statute-item-list">
            <div class="statute-item">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="2" :sm="3" :md="3" :lg="2" class-name="statute-item-img">
                        <img class="" src="../assets/img/statute.png" alt="">
                    </Col>
                    <Col :xs="20" :sm="17" :md="18" :lg="20">
                        <div class="">
                            <div>
                            <span class="statute-item-info-abstract">
                                ICH Q1B：Stability Testing : Photostability Testing of New Drug Substances and Products 稳定性试验：新原
                                    料药和制剂光稳定性试验ICH Q1B：Stability Testing : Photostability Testing of New Drug Substances and Products 稳定性试验：新原
                                    料药和制剂光稳定性试验
                            </span>
                                            </div>
                                            <div>
                                                <span class="statute-item-info-time">发布日期：2018-10-01</span>
                                                <span class="statute-item-info-browse">
                                  <img src="../assets/img/eye.png" alt="">
                                  15
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col :xs="2" :sm="4" :md="3" :lg="2" class-name="statute-item-btn">
                        <button>阅读</button>
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
                    that.statuteList = data[0].children;
                    // that.newsObj.createTime = that.$GLOBAL.timeConversion(that.newsObj.createTime);
                    console.log(that.statuteList[0].children);

                    // 二级注册法规四级列表
                    if (that.statuteList[0].children) {
                        that.secondStatuteList = that.statuteList[0].children;
                    }
                    // 三级注册法规列表
                    if (that.secondStatuteList[0].children) {
                        that.thirdStatuteLsit = that.secondStatuteList[0].children;
                    }
                })
            },

            // 点击法规导航切换子列表
            changeChildList(clickType, index) {
                if (clickType === 1) {
                    if (this.statuteList[index].children) {
                        this.secondStatuteList = this.statuteList[index].children;
                    } else {
                        this.secondStatuteList = [];
                    }
                } else if (clickType === 2) {
                    if (this.secondStatuteList[index].children) {
                        this.thirdStatuteLsit = this.secondStatuteList[index].children;
                    } else {
                        this.thirdStatuteLsit = [];
                    }
                } else if (clickType === 3) {
                    if (this.thirdStatuteLsit[index].children) {
                        this.fourthStatuteList = this.thirdStatuteLsit[index].children;
                    } else {
                        this.fourthStatuteList = [];
                    }
                }
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
        border: 1px solid #999;
        padding: .6rem .6rem;
        height: 2.6rem;
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

</style>
