<template>
    <div class="public-width">
        <div class="case-info">
            <div class="case-details-info">
                <div class="case-title">{{termObj.title}}</div>
                <div class="case-author"><a @click="returnTerm()">返回</a></div>
                <div class="case-summary">
                    <div class="case-content-title">英文：</div>{{termObj.summary}}</div>
                <div class="case-content">
                    <span class="case-content-title">中文：</span><span v-html="termObj.content"></span>
                </div>
            </div>
            <div class="case-details-recommend">
                <Tabs>
                    <TabPane label="推荐阅读">
                        <div class="recommend-title" v-for="item in termList"
                             @click="jumpRecommend(item.aid)">{{item.title}}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TermDetail"
        , data() {
            return {
                articleAid: 0
                , termObj: {}
                , page: 0
                , size: 10
                , typeID: ''
                , termList: []
            }
        }
        , created: function () {
            this.articleAid = this.$route.query.articleAid;
            this.getTermDetail(this.articleAid);
            this.termRecommend();
        }

        , methods: {
            //1.根据stetuteID获取详情
            getTermDetail: function (articleAid) {
                let that = this;
                let getTermObjParam = {
                    articleAid: articleAid
                };
                this.$network.post(that.$GLOBAL.articleDetails, getTermObjParam, function (data) {
                    that.termObj = data;
                })
            }

            //2.返回案例列表
            , returnTerm: function () {
                this.$router.push({path: 'term'});
            }

            //3.加载推荐阅读
            , termRecommend: function () {
                let that = this;
                let termParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    , typeID: this.$GLOBAL.articleTypeForTerm
                    , page: that.page
                    , size: that.size
                };
                this.$network.post(that.$GLOBAL.getArticle, termParam, function (data) {
                    that.termList = data.content;
                })
            }

            //4.点击推荐阅读跳转
            , jumpRecommend: function (aid) {
                this.$router.push({path: 'termdetail', query: {articleAid: aid}});
                this.getTermDetail(aid);
            }
        }
    }
</script>

<style scoped>
    .case-info {
        display: inline-block
    }

    .case-content-title{
        font-size: 1.2rem;
        font-weight: 600;
    }

    .case-details-info {
        float: left;
        width: 80%;
        font-size: 16px;
    }

    .case-details-recommend {
        border-left: 1px solid #D7D7D7;
        margin-top: 0.5rem;
        display: inline-block;
        width: 20%;
    }

    .case-details-recommend > div {
        margin-left: 0.5rem;
    }

    .case-title {
        margin-top: 0.5rem;
        font-size: 1.4rem;
        font-weight: 600;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .case-subtitle {
        text-align: center;
    }

    .case-author {
        text-align: center;
    }

    .case-author > span {
        margin: 0.5rem;

    }

    .case-summary {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .recommend-title {
        cursor: pointer;
        margin-bottom: 0.25rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .recommend-title:hover {
        color: #2D8CF0;
        text-decoration: underline
    }

    @media screen and (min-width: 768px) and (max-width: 959px) {
        .case-details-info {
            width: 100%;
        }

        .case-details-recommend {
            display: none;
        }
    }

    @media screen and (min-width: 480px) and (max-width: 767px) {
        .case-details-info {
            width: 100%;
        }

        .case-details-recommend {
            display: none;
        }
    }

    @media screen and (max-width: 479px) {
        .case-details-info {
            width: 100%;
        }

        .case-details-recommend {
            display: none;
        }
    }
</style>
