<template>
    <div class="public-width">
        <div class="case-info">
            <div class="case-details-info">
                <div class="case-title">{{newsObj.title}}</div>
                <div class="case-subtitle">{{newsObj.subtitle}}</div>
                <div class="case-author"> 作者：<span>{{newsObj.author}}</span> | <span>{{newsObj.createTime}}</span> |
                    <span>
            浏览数：{{newsObj.clickNumber}}</span> <a @click="returnCase()">返回</a></div>
                <div class="case-summary">{{newsObj.summary}}</div>
                <div class="case-content" v-html="newsObj.content"></div>
            </div>
            <div class="case-details-recommend">
                <Tabs>
                    <TabPane label="热门推荐">
                        <div class="recommend-title" v-for="item in newsRecommendList" @click="jumpRecommend(item.aid)">
                            {{item.title}}
                        </div>
                    </TabPane>
                    <TabPane label="最新资讯">
                        <div class="recommend-title" v-for="item in newestNewsList" @click="jumpRecommend(item.aid)">
                            {{item.title}}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsDetails"
        , data() {
            return {
                caseAid: 0
                , newsObj: {}
                , page: 0
                , size: 10
                , newsRecommendList: []
                , newestNewsList: []
            }
        }
        , created: function () {
            this.caseAid = this.$route.query.caseAid;
            this.newsDetails(this.caseAid);
            this.newsRecommend();
            this.newestNews();
        }

        , methods: {
            //1.根据caseAid获取详情
            newsDetails: function (caseAid) {
                let that = this;
                let newsParam = {
                    articleAid: caseAid
                };
                this.$network.post(that.$GLOBAL.articleDetails, newsParam, function (data) {
                    that.newsObj = data;
                    that.newsObj.createTime = that.$GLOBAL.timeConversion(that.newsObj.createTime);
                })
            }

            //2.返回案例列表
            , returnCase: function () {
                this.$router.push({path: 'news'});
            }

            //3.加载推荐阅读
            , newsRecommend: function () {
                let that = this;
                let newsParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    , typeID: that.$GLOBAL.articleTypeForNews
                    , page: that.page
                    , size: that.size
                    , tagList: '-1'
                    , title: '-1'
                };
                this.$network.post(that.$GLOBAL.getNews, newsParam, function (data) {
                    that.newsRecommendList = data.content;
                })
            }

            //4.加载top10阅读
            , newestNews: function () {
                let that = this;
                let newestNewsParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                };
                this.$network.post(that.$GLOBAL.newestNews, newestNewsParam, function (data) {
                    that.newestNewsList = data;
                })
            }

            //5.点击推荐阅读跳转
            , jumpRecommend: function (aid) {
                this.$router.push({path: 'newsdetails', query: {caseAid: aid}});
                this.newsDetails(aid);
            }
        }
    }
</script>

<style scoped>
    .case-info {
        display: inline-block;
    }

    .case-details-info {
        float: left;
        width: 80%;
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
        font-size: 1.2rem;
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
        text-align: center;
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
