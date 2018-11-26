import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage' //引入主页HomePage
import Statute from '@/pages/Statute'  //引入法规页面
import StatuteDetails from '@/pages/StatuteDetails'
import News from '@/pages/News'  //引入新闻页面
import RegistrationCase from '@/pages/RegistrationCase' //引入案例页面
import RegistrationCaseDetails from '@/pages/RegistrationCaseDetails' //引入案例详情
import NewsDetails from '@/pages/NewsDetails' //引入新闻详情
import AboutUsInfo from '@/pages/AboutUsInfo' //引入关于我们界面
import Apply from '@/pages/Apply'  //注册服务申请
import Business from '@/pages/Business'  //业务服务
import Database from '@/pages/Database'  //数据库
import Term from '@/pages/Term.vue' // 术语解释
import TermDetail from '@/pages/TermDetail' // 术语详情


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/'
            , name: 'HomePage'
            , component: HomePage
        }

        , //主页
        {
            path: '/homepage'
            , name: 'HomePage'
            , component: HomePage
        }

        //法规
        , {
            path: '/statute'
            , name: 'Statute'
            , component: Statute
        }
        // 法规详情
        , {
            path: '/statutedetail'
            , name: 'StatuteDetails'
            , component: StatuteDetails
        }

        //新闻资讯
        , {
            path: '/news'
            , name: 'News'
            , component: News
        }

        //新闻详情
        , {
            path: '/newsdetails'
            , name: 'NewsDetails'
            , component: NewsDetails
        }

        //案例
        , {
            path: '/registrationcase'
            , name: 'RegistrationCase'
            , component: RegistrationCase
        }

        //案例详情
        , {
            path: '/registrationcasedetails'
            , name: 'RegistrationCaseDetails'
            , component: RegistrationCaseDetails
        }

        //注册申请服务
        , {
            path: '/apply'
            , name: 'Apply'
            , component: Apply
        }

        //业务服务
        , {
            path: '/business'
            , name: 'Business'
            , component: Business
        }

        //数据库
        , {
            path: '/database'
            , name: 'Database'
            , component: Database
        }

        //关于我们
        , {
            path: '/aboutusinfo'
            , name: 'AboutUsInfo'
            , component: AboutUsInfo
        }

        // 术语解释
        , {
            path: '/term'
            , name: 'Term'
            , component: Term
        }

        //
        ,{
            path: '/termdetail'
            , name: 'TermDetail'
            , component: TermDetail
        }
    ]
})
