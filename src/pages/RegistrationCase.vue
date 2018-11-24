<template>
    <div class="public-width">
        <h3>注册服务申请案例</h3>
        <div>
            <div class="case-info">
                <div class="registration-case-typetitle">企业案例</div>
                <Row>
                    <Col class="registration-case" v-for="item in registrationCaseList" :key="item.aid">
                        <div class="mask-layer">
                            <div>
                                <Button class="case-button" v-on:click="jumpCaseDetail(item.aid)">查看企业案例</Button>
                            </div>
                            <div>
                                <a href="#drug-case">
                                    <Button class="case-button">查看企业药品案例</Button>
                                </a>
                            </div>
                        </div>
                        <Card :bordered="false">
                            <p class="case-title">{{item.title}}</p>
                            <p class="case-time">{{item.createTime}}</p>
                            <p class="case-summary">{{item.summary}}</p>
                            <div>
                                <div class="case-img">
                                    <img class="case-img" v-show="item.thumbnailUrl" v-bind:src="item.thumbnailUrl"/>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div class="page-paging case-page">
                    <Page :total=totalElements :page-size=size @on-change="handlePage" show-total/>
                </div>
            </div>
        </div>

        <div id="drug-case">
            <div class="case-info">
                <div class="registration-case-typetitle">企业药品案例</div>
                <Row>
                    <Col class="registration-case" v-for="(item) in registrationCaseList" :key="item.aid">
                        <Card :bordered="false">
                            <p class="case-title">{{item.title}}</p>
                            <p class="case-time">{{item.createTime}}</p>
                            <p class="case-summary">{{item.summary}}</p>
                            <div>
                                <div class="case-img">
                                    <img class="case-img" v-show="item.thumbnailUrl" v-bind:src="item.thumbnailUrl"/>
                                </div>
                                <Button class="case-drug-button" v-on:click="jumpCaseDetail(item.aid)">查看详情</Button>
                            </div>

                        </Card>
                    </Col>
                </Row>
                <div class="page-paging case-page">
                    <Page :total=totalElements :page-size=size @on-change="handlePage" show-total/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "RegistrationCase"
        , data() {
            return {
                page: 0
                , size: 6
                , totalElements: 0
                , registrationCaseList: []
            }
        }

        , created: function () {
            this.registrationCase(this.page, this.size)
        }

        , methods: {
            registrationCase: function (page, size) {
                let that = this;
                let registrationCaseParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    , typeID: that.$GLOBAL.articleTypeForCase
                    , page: page
                    , size: size
                };
                this.$network.post(that.$GLOBAL.getArticle, registrationCaseParam, function (data) {
                    that.registrationCaseList = data.content;
                    //获取总页数
                    that.totalElements = data.totalElements;
                    //拼接图片访问地址
                    let listLength = that.registrationCaseList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.registrationCaseList[i].thumbnailUrl) {
                            that.registrationCaseList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.registrationCaseList[i].thumbnailUrl;
                        }
                        that.registrationCaseList[i].createTime = that.$GLOBAL.timeConversion(that.registrationCaseList[i].createTime);
                    }
                    console.log(that.registrationCaseList)
                })
            }

            //2.页码发生变化
            , handlePage: function (value) {
                this.page = value;
                //由于接口是从0开始的，而页面page控件是从1开始的
                let pageNum = this.page - 1;
                this.registrationCase(pageNum, this.size)
            }

            //3.查看案例详情
            , jumpCaseDetail: function (aid) {
                this.$router.push({path: 'registrationcasedetails', query: {caseAid: aid}});
            }
        }
    }
</script>

<style scoped>

    .case-info {
        margin-top: 1rem;
        background-color: rgba(45, 140, 240, .07);
        width: 100%;
    }

    .registration-case-typetitle {
        padding-top: 1rem;
        margin-left: 2.5%;
        font-size: 1.1rem;
        font-weight: 600;
    }

    .registration-case {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        margin-left: 2.5%;
        width: 30%;
        float: left;
        overflow: hidden;
    }

    .registration-case:hover .mask-layer {
        -webkit-transform: translateY(0%);
    }

    .mask-layer {
        position: absolute;
        padding-top: 2.3rem;
        background-color: rgba(0, 0, 0, .69);
        z-index: 11;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;

        -webkit-transform: translateY(-101%);
        transition-property: all;
        transition-duration: 0.4s;
        transition-timing-function: initial;
        transition-delay: initial;
    }

    .mask-layer > div {
        text-align: center;
        padding: 1rem 0;
    }

    .case-title {
        font-size: 1rem;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .case-time {
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #2D8CF0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .case-summary {
        margin-top: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 3rem;
    }

    .case-img {
        margin-top: 0.5rem;
        height: 4rem;
        width: 10rem;
        vertical-align: bottom;
    }

    .case-button {
        display: inline-block;
        background-color: transparent;
        color: #fff;
        font-size: 1.1rem;
        border: 1.3px solid #fff;
    }

    .case-page {
        margin-top: 0;
        font-size: .6rem;
        padding-bottom: 1rem;
    }

    .case-drug-button {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }

    @media screen and (min-width: 768px) and (max-width: 959px) {
        .registration-case {
            margin-top: 1rem;
            margin-left: 3%;
            width: 45.5%;
        }

    }

    @media screen and (min-width: 480px) and (max-width: 765px) {
        .registration-case {
            margin-top: 1rem;
            margin-left: 3%;
            width: 94%;
        }
    }

    @media screen and (max-width: 479px) {
        .registration-case {
            margin-top: 1rem;
            margin-left: 3%;
            width: 94%;
        }
    }

</style>

<!-- vue组件中有的元素没有data-v-xxxx属性，这些元素添加的style不能使用scope属性 -->
<style>
    .case-page > .ivu-page > .ivu-page-item,
    .case-page > .ivu-page > .ivu-page-prev,
    .case-page > .ivu-page > .ivu-page-next {
        height: 22px;
        width: 22px;
        line-height: 20px;
        min-width: 22px;
    }
</style>
