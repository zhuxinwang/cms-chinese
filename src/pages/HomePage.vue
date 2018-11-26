<template>
    <div>
        <!--轮播图-->
        <div class="public-width">
            <Carousel autoplay loop :autoplay-speed="3000">
                <CarouselItem class="img-pointer" v-for="(item) in carouselList" :key="item.aid">
                    <img @click="carouselJump(item.canClick,item.isNewWindow,item.hyperlink)" class="carousel"
                         v-bind:src="item.address"/>
                </CarouselItem>
            </Carousel>

            <div class="homepage-marketing">
                <div class="marketing-item">
                    <img src="../assets/img/passid 注册电话.png"/>
                    <div>
                        <div class="marketing-item-text">注册服务申请</div>
                        <div>方便快捷的注册服务</div>
                    </div>
                </div>
                <div class="marketing-item">
                    <img src="../assets/img/操作-翻译.png"/>
                    <div>
                        <div class="marketing-item-text">翻译服务</div>
                        <div>境外人工翻译服务</div>
                    </div>
                </div>
                <div class="marketing-item">
                    <img src="../assets/img/调研.png"/>
                    <div>
                        <div class="marketing-item-text">价格调研</div>
                        <div>各国药械价格实时调研</div>
                    </div>
                </div>
                <div class="marketing-item">
                    <img src="../assets/img/文献.png"/>
                    <div>
                        <div class="marketing-item-text">术语解释</div>
                        <div>各国药法规、流程术语解释</div>
                    </div>
                </div>
            </div>

        </div>
        <!--1.案例-->
        <div class="homepage-case">
            <div class="public-width">
                <div class="case-top"></div>
                <div class="item-title"><img src="../assets/img/left.png"/><span>注册案例</span><img
                        src="../assets/img/right.png"/></div>
                <div class="registration-case">
                    <Row>
                        <div class="public-all">
                            <router-link to="registrationcase">查看全部</router-link>
                        </div>
                        <Col class="case-item" v-for="(item) in homePageRegistrationCaseList" :key="item.aid">
                            <Card :bordered="false">
                                <p class="case-title">{{item.title}}</p>
                                <p class="case-time">{{item.createTime}}</p>
                                <p class="case-summary">{{item.summary}}</p>
                                <div>
                                    <div class="case-img">
                                        <img class="case-img" v-show="item.thumbnailUrl"
                                             v-bind:src="item.thumbnailUrl"/>
                                    </div>
                                    <Button class="case-button" v-on:click="jumpCaseOrNews('case',item.aid)">查看案例
                                    </Button>
                                </div>

                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>

        <!--2.新闻-->
        <div class="public-width">
            <div class="item-title"><img src="../assets/img/left.png"/><span>新闻资讯</span><img
                    src="../assets/img/right.png"/></div>
            <div class="news">
                <div class="public-all">
                    <router-link to="news">查看全部</router-link>
                </div>
                <Row>
                    <Card class="news-item" v-for="(newsItem) in homePageNewsList" :key="newsItem.aid">
                        <div class="news-detail" v-on:click="jumpCaseOrNews('news',newsItem.aid)">
                            <img class="news-img" v-show="newsItem.thumbnailUrl" v-bind:src="newsItem.thumbnailUrl"/>
                            <div class="news-info">
                                <p class="news-title">{{newsItem.title}}</p>
                                <p class="news-summary">{{newsItem.summary}}</p>
                                <Button class="news-button" type="text"
                                        v-on:click="jumpCaseOrNews('news',newsItem.aid)">查看新闻
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Row>
            </div>
        </div>

        <!--3.友情链接-->
        <Row>
            <div class="public-width">
                <div class="item-title"><img src="../assets/img/left.png"/><span>友情链接</span><img
                        src="../assets/img/right.png"/></div>
                <div class="foot-friendshipLink" v-for="item in friendshipLinkList" :key="item.aid"
                     @click="jumpThirdPartyWebsite(item.aid,item.hyperlink)">
                    <div class="friendshipLink">
                        <div class="friendshipLink-img-info">
                            <img class="friendshipLink-img" v-show="item.thumbnailUrl" v-bind:src="item.thumbnailUrl"/>
                        </div>
                        <Tooltip :content=item.name>
                            <div class="friendshipLink-info">{{item.name}}</div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Row>
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>
    </div>

</template>


<script>
    export default {
        name: "HomePage"
        , data() {
            return {
                carouselList: []
                , homePageRegistrationCaseList: []
                , homePageNewsList: []
                , friendshipLinkList: []
            }
        }
        , created: function () {
            this.carousel();
            this.homePageRegistrationCase();
            this.homePageNews();
            this.chineseFriendshipLink();
        }
        , methods: {
            //1.加载轮播图片
            carousel: function () {
                let that = this;
                this.$network.post(that.$GLOBAL.carousel, null, function (data) {
                    that.carouselList = data;
                    //拼接图片访问地址
                    let listLength = that.carouselList.length;
                    for (let i = 0; i < listLength; i++) {
                        that.carouselList[i].address = that.$GLOBAL.UrlPrefix + that.carouselList[i].address
                    }
                })
            }
            //2.加载3个案例
            , homePageRegistrationCase: function () {
                let that = this;
                let caseParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    , typeID: that.$GLOBAL.articleTypeForCase
                    , page: 0
                    , size: 3
                };
                this.$network.post(that.$GLOBAL.getArticle, caseParam, function (data) {
                    that.homePageRegistrationCaseList = data.content;
                    //拼接图片访问地址
                    let listLength = that.homePageRegistrationCaseList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.homePageRegistrationCaseList[i].thumbnailUrl) {
                            that.homePageRegistrationCaseList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.homePageRegistrationCaseList[i].thumbnailUrl;
                        }
                        that.homePageRegistrationCaseList[i].createTime = that.$GLOBAL.timeConversion(that.homePageRegistrationCaseList[i].createTime);
                    }
                })
            }
            //3.加载4个新闻
            , homePageNews: function () {
                let that = this;
                let newsParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                    ,typeID: that.$GLOBAL.articleTypeForNews
                    , page: 0
                    , size: 4
                    , tagList: '-1'
                    , title: '-1'
                };
                this.$network.post(that.$GLOBAL.getArticle, newsParam, function (data) {
                    that.homePageNewsList = data.content;
                    //拼接图片访问地址
                    let listLength = that.homePageNewsList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.homePageNewsList[i].thumbnailUrl) {
                            that.homePageNewsList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.homePageNewsList[i].thumbnailUrl;
                        }
                        that.homePageNewsList[i].createTime = that.$GLOBAL.timeConversion(that.homePageNewsList[i].createTime);
                    }
                })
            }

            //4.加载友情链接
            , chineseFriendshipLink: function () {
                let that = this;
                this.$network.post(that.$GLOBAL.chineseFriendshipLink, null, function (data) {
                    that.friendshipLinkList = data;
                    //拼接图片访问地址
                    let listLength = that.friendshipLinkList.length;
                    for (let i = 0; i < listLength; i++) {
                        if (that.friendshipLinkList[i].thumbnailUrl) {
                            that.friendshipLinkList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.friendshipLinkList[i].thumbnailUrl;
                        }
                    }
                })
            }

            //5.统计点击信息
            , countFriendshipLinkClick: function (friendshipLinkAid) {
                let countFriendshipLinkClickParams = {
                    friendshipLinkAid: friendshipLinkAid
                };
                this.$network.post(this.$GLOBAL.countFriendshipLinkClick, countFriendshipLinkClickParams, null)
            }

            //6.轮播图点击跳转
            , carouselJump: function (canClick, isNewWindow, hyperlink) {
                if (canClick) {
                    if (isNewWindow) {
                        window.open(hyperlink);
                    } else {
                        window.location.href = hyperlink;
                    }
                }
            }

            //7.点击跳转到注册案例/新闻资源
            , jumpCaseOrNews: function (caseOrNews, aid) {
                if (caseOrNews === 'case') {
                    this.$router.push({path: 'registrationcasedetails', query: {caseAid: aid,articleAid:aid}});
                } else if (caseOrNews === 'news') {
                    this.$router.push({path: 'newsdetails', query: {caseAid: aid}});
                }
            }

            //8.点击友情链接跳转到第三方网址
            , jumpThirdPartyWebsite: function (aid, hyperlink) {
                this.countFriendshipLinkClick(aid);
                //新窗口打开跳转
                window.open(hyperlink);
            }
        }
    }
</script>

<style scoped>
    .carousel {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .homepage-case {
        margin-top: 1rem;
        height: auto;
        background-color: rgba(45, 140, 240, .07);
    }

    .item-title {
        margin-top: 1.5rem;
        vertical-align: middle;
        font-size: 1.3rem;
        font-weight: 600;
        text-align: center;
    }

    .item-title > img {
        vertical-align: middle;
        height: 2.3rem;
        width: 2.3rem;
    }

    /*友情链接*/
    .foot-friendshipLink {
        float: left;
        margin-top: 1rem;
        cursor: pointer;
        width: 25%;
        padding: .1rem;
    }

    .friendshipLink {
        border: 1px solid #D7D7D7;
        padding: 1rem;
    }

    .friendshipLink:hover {
        border: 1px solid #2D8CF0;
    }

    .friendshipLink-img-info {
        margin-top: 0.3rem;
        margin-left: 0.4rem;
        display: inline-block;
        vertical-align: middle;
    }

    .friendshipLink-img {
        width: 3.6rem;
        height: 3.6rem;
    }

    .friendshipLink-info {
        font-size: 1rem;
        font-weight: 600;
        width: 14rem;
        margin-left: 0.4rem;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /*marketing*/
    .homepage-marketing {
        margin-top: 1rem;
        border: 1px solid #D7D7D7;
        min-height: 5.7rem;
    }

    .marketing-item {
        margin-top: 1rem;
        margin-left: -1px;
        float: left;
        height: 3.5rem;
        width: 25%;
        border-left: 1px solid #D7D7D7;
    }

    .marketing-item > img {
        margin-left: 2.5rem;
        height: 3.5rem;
        width: 3.5rem;
        vertical-align: middle;
    }

    .marketing-item > div {
        display: inline-block;
        margin-left: 1.5rem;
        vertical-align: middle;
    }

    .marketing-item-text {
        font-size: 1rem;
        font-weight: 600;
    }

    /*注冊案例*/
    .case-item {
        width: 33.33%;
        float: left;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 2rem;
    }

    .case-top {
        height: 0.1rem;
    }

    .case-time {
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #2D8CF0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
    }

    .registration-case {
        margin-top: 1.5rem;
    }

    .case-title {
        font-size: 1rem;
        font-weight: 600;
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
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }

    /*新闻资讯*/
    .news {
        margin-top: 1rem;
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
        margin-top: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 3rem;
    }

    .news-item {
        padding: 0.3rem;
        border: 1px solid #D7D7D7;
        margin-bottom: 1rem;
        width: 48%;
        float: left;
        cursor: pointer;
    }

    .news-img {
        float: left;
        height: 6rem;
        width: 13rem;
    }

    .news-info {
        float: left;
        width: 60%;
        margin-left: 1rem;
    }

    .news-detail {
        height: 6rem;
    }

    @media screen and (min-width: 1200px) {

        .news-item:nth-child(even) {
            margin-left: 2%;
        }

        .news-item:nth-child(odd) {
            margin-right: 2%;
        }

    }

    @media screen and (min-width: 960px) and (max-width: 1199px) {

        .news-item:nth-child(even) {
            margin-left: 2%;
        }

        .news-item:nth-child(odd) {
            margin-right: 2%;

        }

        .foot-friendshipLink {
            width: 25%;
        }

        .friendshipLink-info {
            width: 12rem;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 959px) {
        .homepage-marketing {
            min-height: 10rem;
        }

        .marketing-item {
            width: 50%;
        }

        .case-item {
            width: 100%;
        }

        .news-item {
            width: 100%;
        }

        .foot-friendshipLink {
            width: 33.333%;
        }

        .friendshipLink-info {
            width: 11rem;
        }
    }

    @media screen and (min-width: 480px) and (max-width: 767px) {
        .homepage-marketing {
            min-height: 10rem;
        }

        .marketing-item {
            width: 50%;
        }

        .marketing-item > img {
            height: 2.8rem;
            width: 2.8rem;
        }

        .case-item {
            width: 100%;
        }

        .news-item {
            width: 100%;
        }

        .news-button {
            display: none;
        }

        .news-img {
            height: 4rem;
            width: 9rem;
        }

        .news-detail {
            height: 4.5rem;
        }

        .foot-friendshipLink {
            width: 50%;
        }

        .friendshipLink-info {
            width: 10rem;
        }
    }

    @media screen and (max-width: 479px) {
        .homepage-marketing {
            min-height: 18rem;
        }

        .marketing-item {
            height: 3.2rem;
            width: 100%;
        }

        .marketing-item > img {
            height: 2.8rem;
            width: 2.8rem;
        }

        .case-item {
            width: 100%;
        }

        .news-item {
            width: 100%;
        }

        .news-button {
            display: none;
        }

        .news-img {
            height: 4rem;
            width: 9rem;
        }

        .news-info {
            width: 45%;
        }

        .news-detail {
            height: 4.5rem;
        }

        .foot-friendshipLink {
            width: 100%;
        }

        .friendshipLink-info {
            width: 14rem;
        }
    }
</style>
