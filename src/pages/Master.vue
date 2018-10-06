<template>
    <div>
      <Row class="master-header">
        <Col :xs="0" :sm="1" :md="2" :lg="4" class="master-header-col"></Col>
        <Col :xs="24" :sm="22" :md="20" :lg="15" class="master-header-col">
          <img class="master-header-img" :src="websiteBaseInfo.logoPath"/>
          <div class="header-right">
            <div class="header-search">
              <Input>
              <Select id="articleTypeSelect" v-model="articleTypeId" slot="prepend">
                <Option value="2">法规</Option>
                <Option value="13">新闻</Option>
              </Select>
              <Button slot="append" icon="ios-search"></Button>
              </Input>
            </div>
            <div class="loginAndRegister">
              <Button>登录</Button>
              <Button>注册</Button>
            </div>
          </div>
          <div class="master-Menu">
            <Menu mode="horizontal" active-name = 1>
              <MenuItem v-for="item in masterNavigationList" v-bind:name="item.aid" :to="item.hyperlink">
                {{item.name}}
              </MenuItem>
            </Menu>
          </div>
          </Col>

        <Col :xs="0" :sm="1" :md="2" :lg="5" class="master-header-col"></Col>
      </Row>

      <router-view></router-view>

      <Row class="master-foot">
        <Col :xs="0" :sm="1" :md="2" :lg="4" class="master-foot-col"></Col>
        <Col :xs="24" :sm="22" :md="20" :lg="16" class="master-foot-col">
          <div class="master-foot-about-us">
            <h3>联系我们</h3>
            <div>
              <img class="foot-ioc" src="../assets/ioc/address.png"/> 云南省昆明市呈贡县云上小镇
            </div>
            <div>
              <img class="foot-ioc" src="../assets/ioc/phone.png"/> 18400000000
            </div>
            <div>
              <img class="foot-ioc" src="../assets/ioc/wechat.png"/> wechat
            </div>
            <div>
              <img class="foot-ioc" src="../assets/ioc/qq.png"/> 321540346
            </div>
            <div>
              <img class="foot-ioc" src="../assets/ioc/email.png"/> xxxxxxx@aliyun.com
            </div>
          </div>
          <div class="about-icp">
            <div>Copyright © <span v-text="websiteBaseInfo.name"></span></div>
            <div v-text="websiteBaseInfo.icpCode"></div>
          </div>
        </Col>
        <Col :xs="0" :sm="1" :md="2" :lg="4" class="master-foot-col"></Col>
      </Row>

    </div>
</template>

<script>
    export default {
      name: "Master"
      , data(){
          return{
            websiteBaseInfo:{
              name:''
              , logoPath:''
              , domain:''
              , icpCode:''
              , webCountCode:''
            }
            , masterNavigationList: []
            , friendshipLinkList: []
            , articleTypeId: 2
          }
      },
      //页面加载时
      created:function () {
        this.websiteBase();
        this.masterNavigation();
      },
      //方法
      methods:{
        //1.加载网站基本信息
        websiteBase: function () {
          let that = this;
          let websiteBashParams = {
            languageTypeId : that.$GLOBAL.CHINESE_WEBSITE
          };
          this.$network.post(that.$GLOBAL.websiteInfo,websiteBashParams,null,function (data) {
            that.websiteBaseInfo = data;
            //拼接图片访问地址
            that.websiteBaseInfo.logoPath = that.$GLOBAL.UrlPrefix + that.websiteBaseInfo.logoPath;
          })
        }
        //2.加载导航的标题
        , masterNavigation: function () {
          let that = this;
          let masterNavigationParams = {
            languageTypeId : that.$GLOBAL.CHINESE_WEBSITE
          };
          this.$network.post(that.$GLOBAL.masterNavigation,masterNavigationParams,null,function (data) {
            that.masterNavigationList = data;
            // this.$nextTick(() => {
            //   that.$refs.side_menu.updateOpened();
            //   that.$refs.side_menu.updateActiveName()
            // });
            console.log(that.masterNavigationList)
          })
        }

        //3.更新导航
        , updateMenu: function () {

        }

      }
    }
</script>



<style scoped>
.master-header{
  margin-top: 0.1rem;
  border-bottom: 1px solid #2D8CF0 ;
}

.master-header-col{
  height: 5.8rem;
}

.master-header-img{
  float: left;
  width: 15.4rem;
  height: 4.3rem;
}
.header-right{
  float: right;
}

.header-search{
  display:inline-block;
  margin-top: 0.3rem;
  width: 25rem;
  vertical-align: top;
}
.header-search > div{
  z-index: 9999;
}

.loginAndRegister{
  margin-left: 5rem;
  margin-top: 0.35rem;
  display: inline-block;
  vertical-align: top;
}

.master-Menu{
  /*margin-top: 0.7rem;*/
  position: absolute;
  bottom: -1px;
  right: 0;
}

.master-Menu > .ivu-tabs-bar{
  border-bottom: none;
  margin-bottom: 2px;
}

#articleTypeSelect{
  width: 5rem;
}

.master-foot{
  height: 18.5rem;
  background-color: #333;
}

.master-foot-col{
  height: 18.5rem;
}

.master-foot-about-us{
  margin-top: 1rem;
  color: white;
}

.master-foot-about-us > div{
  margin-top: 0.8rem;
}

.foot-ioc{
  vertical-align:middle; /*图片和文字垂直居中对齐*/
  height: 1.42rem;
  width: 1.42rem;
}

.about-icp{
  margin-top: 0.5rem;
  color: white;
  text-align: center;
}


</style>

<style>
  /**
  scoped 作用于当前界面，而去掉scoped后作用于全局，所有可以覆盖iview原有的样式。
   */
.master-Menu > .ivu-menu{
  display: block;
  margin: 0;
  padding: 0;
  outline: 0;
  list-style: none;
  color: #515a6e;
  font-size: 1rem;
  /*position: relative;*/
  z-index: 900;
}

.master-Menu > .ivu-menu-horizontal{
   height: 40px;
  line-height: 40px;
}

.master-Menu > ul > .ivu-menu-item{
  font-size: 1.15rem;
}

</style>
