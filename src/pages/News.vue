<template>
    <div class="public-width">
        <div class="news-tag">
            <div class="news-tag-title">
                <Icon type="ios-arrow-forward"/>
                新闻资讯分类
            </div>
            <div class="news-tag-checkbox">
                <CheckboxGroup size="large" v-model="checkboxSocial" @on-change="checkboxChange()">
                    <Checkbox v-for="(item,index) in newsTagList" :key="index" :label=item.aid>
                        <span>{{item.name}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
        </div>

        <div class="news-item" v-for="item in newsList" @click="jumpNewsDetail(item.aid)">
            <div class="news-img">
                <img v-show="item.thumbnailUrl" v-bind:src="item.thumbnailUrl"/>
            </div>
            <div class="news-item-detail">
                <div class="news-title">{{item.title}}</div>
                <div class="news-summary">{{item.summary}}</div>
                <div class="news-author">发布时间：{{item.createTime}} 浏览次数：{{item.clickNumber}}
                    <a class="news-button" type="text" @click="jumpNewsDetail(item.aid)">查看新闻</a>
                </div>
            </div>
        </div>
        <div class="page-paging">
            <Page :total=totalElements :current=page :page-size=size @on-change="handlePage" show-total/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "News"
        , data() {
            return {
                newsTagList: [] //标签列表
                , newsList: []
                , page: 1
                , size: 10
                , totalElements: 0
                , tagList: '-1' //提交条件[以,拼接的字符串]
                , title: '-1'
                , checkboxSocial: []
            }
        }
        , created: function () {
            //判断是否是从标题的搜索跳转过来的
            this.getNewsTagList();
            let titleTemp;
            titleTemp = this.$route.query.title;
            if (titleTemp === undefined) {
                this.title = '-1';
            }
            else {
                this.title = titleTemp;
            }
            this.news(0, 10, '-1', this.title);
        }

        , methods: {
            //1.新闻列表
            news: function (page, size, tagList, title) {
                let that = this;
                let newsParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    , typeID:that.$GLOBAL.articleTypeForNews
                    , page: page
                    , size: size
                    , tagList: tagList
                    , title: title
                };
                this.$network.post(that.$GLOBAL.articleByCondition, newsParam, function (data) {
                    that.newsList = data.content;
                    //获取总页数
                    that.totalElements = data.totalElements;
                    //拼接图片访问地址
                    let listLength = that.newsList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.newsList[i].thumbnailUrl) {
                            that.newsList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.newsList[i].thumbnailUrl;
                        }
                        that.newsList[i].createTime = that.$GLOBAL.timeConversion(that.newsList[i].createTime);
                    }
                })
            }

            //2.页码发生变化
            , handlePage: function (value) {
                this.page = value;
                //由于接口是从0开始的，而页面page控件是从1开始的
                let pageNum = this.page - 1;
                this.news(pageNum, this.size, this.tagList, this.title);
            }

            //3.查看案例详情
            , jumpNewsDetail: function (aid) {
                this.$router.push({path: 'newsdetails', query: {caseAid: aid}});
            }

            //4.获取文章包含的标签列表
            , getNewsTagList: function () {
                let that = this;
                this.$network.post(that.$GLOBAL.newsTag, null, function (data) {
                    that.newsTagList = data;
                })
            }

            //5.标签CheckBox发生改变
            , checkboxChange: function () {
                //将checkboxSocial装换为,拼接的字符串 -1时为请求全部
                if (this.checkboxSocial.length === 0) {
                    this.news(0, 10, '-1', this.title);
                }
                else {
                    let arrStr = '';
                    let checkboxSocialLength = this.checkboxSocial.length;
                    for (let i = 0; i < checkboxSocialLength; i++) {
                        arrStr = arrStr + this.checkboxSocial[i] + ',';
                    }
                    arrStr = arrStr.substring(0, arrStr.length - 1);
                    //重新请求列表
                    this.news(0, 10, arrStr, this.title);
                }

            }
        }

        , watch: {
            '$route'(value) {
                //检测地址栏参数是否发生变化
                this.title = value.query.title;
                this.news(0, 10, this.tagList, this.title);
            }
        }

    }
</script>

<style scoped>

    .news-tag {
        border: 1px solid #D7D7D7;
        height: auto;
    }

    .news-tag-title {
        font-size: 1.1rem;
        font-weight: 600;
        float: left;
        line-height: 3rem;
        margin-left: 1rem;
    }

    .news-tag-checkbox {
        margin-left: 2rem;
        display: inline-block;
        line-height: 3rem
    }

    .news-item-detail {
        margin-top: 0.4rem;
        float: left;
        width: 80%;
    }

    .news-item {
        border: 1px solid #D7D7D7;
        margin-top: 1rem;
        height: 7.7rem;
        cursor: pointer;
    }

    .news-img {
        margin-top: 0.4rem;
        float: left;
        width: 20%;
        height: 100%;
    }

    .news-img > img {
        margin-left: 8%;
        height: 90%;
        width: 80%;
    }

    .news-title {
        font-size: 1rem;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .news-summary {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 3rem;
    }

    .news-author {
        margin-top: 0.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .news-button {
        float: right;
        margin-right: 4%;
    }

    @media screen and (min-width: 1200px) {

    }

    @media screen and (min-width: 960px) and (max-width: 1199px) {

    }

    @media screen and (min-width: 768px) and (max-width: 959px) {
        .news-img {
            margin-top: 1.2rem;
            height: 80%;
        }
    }

    @media screen and (min-width: 480px) and (max-width: 765px) {
        .news-img {
            margin-top: 2rem;
            height: 50%;
        }

        .news-button {
            display: none;
        }
    }

    @media screen and (max-width: 479px) {
        .news-img {
            margin-top: 2rem;
            height: 40%;
        }

        .news-button {
            display: none;
        }
    }

</style>
