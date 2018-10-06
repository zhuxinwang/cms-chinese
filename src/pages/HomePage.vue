<template>
  <div>
    <!--轮播图-->
    <Row class="public-row">
      <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
      <Col :xs="0" :sm="23" :md="19" :lg="15" class="carousel-col-height-aoto">
        <Carousel autoplay loop autoplay-speed="3000">
          <CarouselItem class="img-pointer" v-for="item in carouselList">
            <div><img v-bind:src="item.address" /></div>
          </CarouselItem>
        </Carousel>

        <div class="homepage-marketing">
          <div class="marketing-item">
            <img src="../assets/img/passid 注册电话.png"/>
            <div>
              <div class="marketing-item-text">注册服务</div>
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
              <div class="marketing-item-text">文献检索</div>
              <div>强大的数据支持</div>
            </div>
          </div>
        </div>
      </Col>
      <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>

    </Row>
      <!--1.案例-->
      <div class="homepage-case">
        <Row>
          <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
          <Col :xs="0" :sm="1" :md="2" :lg="15">
            <div>
              <div class="item-title"><img src="../assets/img/left.png"/><span>注册案例</span><img src="../assets/img/right.png"/></div>
              <div class="registration-case">
                <Row>
                  <Col v-for="(item,index) in homePageRegistrationCaseList" span="6" :offset="index===0 ? 0 : 3">
                    <Card :bordered="false">
                      <p class="case-title">{{item.title}}</p>
                      <p class="case-time">{{item.createTime}}</p>
                      <p class="case-summary">{{item.summary}}</p>
                      <div>
                        <div class="case-img">
                          <img class="case-img" v-show="item.thumbnailUrl"  v-bind:src="item.thumbnailUrl"/>
                        </div>
                        <Button class="case-button" v-on:click="jumpCaseOrNews('case',item.aid)">查看案例</Button>
                      </div>

                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>
        </Row>
      </div>

      <!--2.新闻-->
      <Row>
        <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
        <Col :xs="0" :sm="1" :md="2" :lg="15">
          <div class="item-title"><img src="../assets/img/left.png"/><span>新闻资讯</span><img src="../assets/img/right.png"/></div>
          <div class="news-item">
            <Row>
              <Col class="news-item-padding" v-for="(item,index) in homePageNewsList" span="11" :offset="index%2===0 ? 0 : 2">
                <Card>
                    <div class="news-img">
                      <img class="news-img" v-show="item.thumbnailUrl"  v-bind:src="item.thumbnailUrl"/>
                    </div>
                    <div class="news-info">
                      <p class="case-title">{{item.title}}</p>
                      <p class="case-summary">{{item.summary}}</p>
                    </div>
                    <Button class="news-button" type="text" v-on:click="jumpCaseOrNews('news',item.aid)">查看新闻</Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>
      </Row>


    <!--3.友情链接-->
    <Row>
      <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
      <Col :xs="0" :sm="1" :md="2" :lg="15">
        <div class="item-title"><img src="../assets/img/left.png"/><span>友情链接</span><img src="../assets/img/right.png"/></div>
          <div class="foot-friendshipLink" v-for="(item,index) in friendshipLinkList" @click="jumpThirdPartyWebsite(item.aid,item.hyperlink)">
            <div class="friendshipLink">
              <div class="friendshipLink-img-info" >
              <img class="friendshipLink-img" v-show="item.thumbnailUrl"  v-bind:src="item.thumbnailUrl"/>
              </div>
              <Tooltip :content=item.name>
                <div class="friendshipLink-info">{{item.name}}</div>
              </Tooltip>
            </div>
          </div>
      </Col>
      <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>
    </Row>
    <BackTop :height="100" :bottom="200">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>

</template>



<script>
    export default {
      name: "HomePage"
      , data(){
        return {
          carouselList: []
          , homePageRegistrationCaseList: []
          , homePageNewsList: []
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
          this.$network.post(that.$GLOBAL.carousel,null,null,function (data) {
            that.carouselList = data;
            //拼接图片访问地址
            let listLength = that.carouselList.length;
            for(let i = 0; i < listLength; i++){
              that.carouselList[i].address = that.$GLOBAL.UrlPrefix + that.carouselList[i].address
            }
          })
        }
        //2.加载3个案例
        , homePageRegistrationCase: function () {
          let that = this;
          let homePageRegistrationCaseParam = {
            languageTypeId : that.$GLOBAL.CHINESE_WEBSITE
            , page: 0
            , size: 3
          };
          this.$network.post(that.$GLOBAL.homePageRegistrationCase,homePageRegistrationCaseParam,null,function (data) {
            that.homePageRegistrationCaseList = data.content;
            //拼接图片访问地址
            let listLength = that.homePageRegistrationCaseList.length;
            for(let i = 0; i < listLength; i++){
              if(that.homePageRegistrationCaseList[i].thumbnailUrl){
                that.homePageRegistrationCaseList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.homePageRegistrationCaseList[i].thumbnailUrl;
              }
              that.homePageRegistrationCaseList[i].createTime = that.$GLOBAL.timeConversion(that.homePageRegistrationCaseList[i].createTime);
            }
          })
        }
        //3.加载4个新闻
        , homePageNews : function () {
          let that = this;
          let homePageNewsParam = {
            languageTypeId : that.$GLOBAL.CHINESE_WEBSITE
            , page: 0
            , size: 4
            , tagList: '-1'
          };
          this.$network.post(that.$GLOBAL.homePageNews,homePageNewsParam,null,function (data) {
            that.homePageNewsList = data.content;
            //拼接图片访问地址
            let listLength = that.homePageNewsList.length;
            for(let i = 0; i < listLength; i++){
              if(that.homePageNewsList[i].thumbnailUrl){
                that.homePageNewsList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.homePageNewsList[i].thumbnailUrl;
              }
              that.homePageNewsList[i].createTime = that.$GLOBAL.timeConversion(that.homePageNewsList[i].createTime);
            }
          })
        }

        //4.加载友情链接
        , chineseFriendshipLink: function () {
          let that = this;
          this.$network.post(that.$GLOBAL.chineseFriendshipLink,null,null,function (data) {
            that.friendshipLinkList = data;
            //拼接图片访问地址
            let listLength = that.friendshipLinkList.length;
            for(let i = 0; i < listLength; i++){
              if(that.friendshipLinkList[i].thumbnailUrl){
                that.friendshipLinkList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.friendshipLinkList[i].thumbnailUrl;
              }
            }
          })
        }

        //5.统计点击信息
        , countFriendshipLinkClick: function (friendshipLinkAid) {
          let countFriendshipLinkClickParams = {
            friendshipLinkAid : friendshipLinkAid
          };
          this.$network.post(this.$GLOBAL.countFriendshipLinkClick,countFriendshipLinkClickParams,null,null)
        }

        //6.轮播图点击跳转 TODO click事件不点击也会执行
        , carouselJump: function (canClick,isNewWindow,hyperlink) {
          if(canClick){
            if(isNewWindow){
              window.location.href =hyperlink;
            }else{

            }
          }
        }

        //7.点击跳转到注册案例/新闻资源
        , jumpCaseOrNews: function (caseOrNews,aid) {
          if(caseOrNews === 'case'){
            this.$router.push({ path: 'registrationcasedetails', query: { caseAid: aid }});
          }else if(caseOrNews === 'news'){
            this.$router.push({ path: 'newsdetails', query: { caseAid: aid }});
          }
        }

        //8.点击友情链接跳转到第三方网址
        , jumpThirdPartyWebsite: function (aid,hyperlink) {
          this.countFriendshipLinkClick(aid);
          //新窗口打开跳转
        }
      }
    }
</script>

<style scoped>

.img-pointer{
  cursor: pointer;
}

.carousel-col-height-aoto{
  height: auto;
}

.homepage-marketing{
  margin-top: 1rem;
  border: 1px solid #D7D7D7;
  min-height: 5.7rem;
}

.marketing-item{
  margin-top: 1rem;
  margin-left: -1px;
  float: left;
  height: 3.5rem;
  width: 21rem;
  border-left: 1px solid #D7D7D7;
}

.marketing-item > div{
  display: inline-block;
  margin-left: 1.5rem;
  vertical-align: middle;
}

.marketing-item > img{
  margin-left: 2.5rem;
  height: 3.5rem;
  width: 3.5rem;
  vertical-align: middle;
}

.marketing-item-text{
  font-size: 1rem;
  font-weight: 600;
}

.homepage-case{
  margin-top: 1.5rem;
  height: 21rem;
  background-color: rgba(45,140,240,.07);
}

.item-title{
  margin-top: 1.5rem;
  vertical-align: middle;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
}

.item-title > img{
  vertical-align: middle;
  height: 2.3rem;
  width: 2.3rem;
}

.registration-case{
  margin-top: 1.5rem;
}

.case-title{
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;width:100%;
}

.case-time{
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #2D8CF0;
}

.case-summary{
  margin-top: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;width:100%;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  height: 3rem;
}
.case-img{
  margin-top: 0.5rem;
  height: 4rem;
  width: 10rem;
  vertical-align: bottom;
}

.case-button{
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

.news-item{
  margin-top: 1.5rem;
}

.news-img{
  float: left;
  height: 6rem;
  width: 13rem;
  vertical-align: middle;
}

.news-info{
  float: left;
  width: 60%;
  margin-left: 1rem;
  vertical-align: middle;
}

.news-item-padding{
  padding-bottom: 1rem;
}

.news-button{
 margin-left: 16rem;
}

.foot-friendshipLink{
  float: left;
  margin-top: 1rem;
  margin-left: 0.65rem;
  margin-bottom: 1rem;
  border: 1px solid #D7D7D7;
  cursor: pointer;
  height: 4.3rem;
  width: 13.5rem;
}

/**
TODO :hover加上会将里面的div也改变边框，后续待改进
/*.foot-friendshipLink :hover{*/
  /*border: #2D8CF0;*/
/*}*/

.friendshipLink-img-info{
  margin-top: 0.3rem;
  margin-left: 0.4rem;
  display:inline-block;
  vertical-align: middle;
}

.friendshipLink-img{
  width: 3.6rem;
  height: 3.6rem;
}

.friendshipLink-info{
  font-size: 1rem;
  font-weight: 600;
  width: 8rem;
  margin-left: 0.4rem;
  display:inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
