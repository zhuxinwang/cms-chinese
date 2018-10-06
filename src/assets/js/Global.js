let BaseURLAPI = 'http://192.168.1.37:8083';
let UrlPrefix = 'http://192.168.1.37:8081/upload/';


let CHINESE_WEBSITE = 1;  //中文网站
let ENGLISH_WEBSITE = 2;  //英文网站

/**
 * 请求的接口相对地址
 * @type {string} 地址字符串
 */
let masterNavigation = 'homepage/masterNavigation';  //1.模版页上的导航
let getNavChildren = 'homepage/getNavChildren';  //2.获取类型下包含的子类型
let carousel = 'homepage/carousel';  //3.获取首页轮播图
let websiteInfo = 'homepage/websiteInfo';  //4.获取网站名称及logo等基础信息
let homePageRegistrationCase = 'registrationCase/homePageRegistrationCase';  //5.首页获取3个案例
let homePageNews = 'news/homePageNews';  //6.首页获取4个新闻
let chineseFriendshipLink = 'homepage/chineseFriendshipLink';  //7.获取中文友情链接
let countFriendshipLinkClick = 'homepage/countFriendshipLinkClick';  //8.统计链接点击次数

let registrationCaseDetails = 'registrationCase/registrationCaseDetails'; //根据案例id查询详情
let newsDetails = 'news/newsDetails'; //根据新闻id查询详情
let newestNews = 'news/newestNews'; //最新的top10 新闻

/**
 * 转换时间格式
 * @param date 传入时间
 * @returns {string} 时间字符串形式
 */
function timeConversion(date) {
  let d = new Date(date);
  let dateResult = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' '
    + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return dateResult;
}

export default {
  name: 'Global'
  , BaseURLAPI
  , UrlPrefix
  , CHINESE_WEBSITE
  , ENGLISH_WEBSITE
  , masterNavigation
  , getNavChildren
  , carousel
  , websiteInfo
  , homePageRegistrationCase
  , homePageNews
  , chineseFriendshipLink
  , countFriendshipLinkClick
  , registrationCaseDetails
  , newsDetails
  , newestNews
  , timeConversion
}
