<template>
  <div>
    <Row class="public-row">
      <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
      <Col :xs="0" :sm="23" :md="19" :lg="15">
        <div class="news-tag">
          <div>新闻资讯分类</div><div></div>
        </div>

        <div class="news-item" v-for="item in newsList">
          <div class="news-img">
            <img v-show="item.thumbnailUrl"  v-bind:src="item.thumbnailUrl"/>
          </div>
          <div class="news-item-detail">
            <div class="news-title">{{item.title}}</div>
            <div class="news-summary">{{item.summary}}</div>
            <div class="news-author">发布时间：{{item.createTime}} 浏览次数：{{item.aid}}
              <a class="news-button" type="text" v-on:click="jumpNewsDetail(item.aid)">查看新闻</a>
            </div>
          </div>
        </div>
      </Col>
      <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>

    </Row>
    <div class="page-paging">
      <Page :total=totalElements :current=page :page-size=size @on-change="handlePage" show-total/>
    </div>
  </div>
</template>

<script>
    export default {
      name: "News"
      , data(){
        return{
          newsTagList: []
          , newsList: []
          , page: 1
          , size: 10
          , totalElements: 0
          , tagList: '-1'
        }
      }
      ,created:function () {
        this.news(0,10);
      }

      , methods: {
        //1.新闻列表
        news: function (page,size) {
          let that = this;
          let NewsParam = {
            languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
            , page: page
            , size: size
            , tagList: this.tagList
          };
          this.$network.post(that.$GLOBAL.homePageNews, NewsParam, null, function (data) {
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
          this.news(pageNum,this.size)
        }

        //3.查看案例详情
        , jumpNewsDetail: function (aid) {
          this.$router.push({ path: 'newsdetails', query: { caseAid: aid }});
        }
      }
    }
</script>

<style scoped>
.news-item{
  border: 1px solid #D7D7D7;
  margin-top: 1rem;
  height: 7.85rem;
  cursor: pointer;
}

.news-img{
  margin-top: 0.4rem;
  float: left;
  width: 20%;
  height: 100%;
}
.news-img > img{
  margin-left: 8%;
  height: 90%;
  width: 80%;
}

.news-item-detail{
  margin-top: 0.4rem;
  float: left;
  width: 80%;
}

.news-title{
  font-size: 1rem;
  font-weight: 600;
}

.news-summary{
  overflow: hidden;
  text-overflow: ellipsis;width:100%;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  height: 3rem;
}

.news-author{
  margin-top: 0.5rem;
}

.news-button{
  margin-left: 60%;
}

.news-tag{
  border: 1px solid #D7D7D7;
}
</style>
