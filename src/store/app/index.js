import {
  UPDATE_BREADCRUMB,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  THEME_CHANGE,
  ADD_MENU,
  DELETE_MENU
} from './mutation-types'
import * as actions from './actions'

const state = {
  pathList: [],
  user: null,

  // 主题颜色
  themeColors: JSON.parse(window.localStorage.getItem('themeColors')) || {},

  // 菜单列表
  menuList: [
    {
      name: '员工管理',
      icon: 'el-icon-fa-user',
      type: 'submenu',
      onOff: true,
      disabled: true,
      children: [
        {name: '花名册', type: 'menu-item', index: '/user/list', route: {path: '/user/list'}},
        {name: '组织架构', type: 'menu-item', index: '/user/org', route: {path: '/user/org'}}
      ],
      desc: '支持员工入，离职办理，员工信息录入，查询，搜索，更新，跟踪',
      stateList: [
        {name: '组织设置', state: true, must: true, pathName: 'userOrg'},
        {name: '导入员工', state: true, must: true, pathName: 'userList'},
        {name: '自定义字段', state: false, must: false, pathName: 'custom-fields'},
        {name: '智能提醒', state: false, must: false}
      ]
    },
    {
      name: '考勤管理',
      icon: 'el-icon-fa-calendar-check-o',
      type: 'submenu',
      onOff: false,
      disabled: false,
      children: [],
      desc: '多种考勤方案的设置，员工可以使用班步APP打卡考勤，考勤数据自动上传至云端',
      stateList: [
        {name: '考勤方案', state: false},
        {name: '法定节假日', state: false}
      ]
    },
    {
      name: '社保公积金',
      icon: 'el-icon-fa-jpy',
      type: 'submenu',
      onOff: false,
      disabled: false,
      children: [],
      desc: '设置员工的社保方案，员工会产生对应的社保账单',
      stateList: [
        {name: '缴纳方案', state: false}
      ]
    },
    {
      name: '薪酬福利',
      icon: 'el-icon-fa-money',
      type: 'submenu',
      onOff: false,
      disabled: false,
      children: [],
      desc: '维护员工的工资福利信息，系统每月根据员工的考勤状况自动计算工资',
      stateList: [
        {name: '工资模板', state: false},
        {name: '薪资结算', state: false}
      ]
    },
    {
      name: '招聘管理',
      icon: 'el-icon-fa-vcard-o',
      type: 'submenu',
      onOff: false,
      disabled: false,
      children: [],
      desc: '编辑招聘需求，录入员工简历，发起面试通知，反馈面试结果',
      stateList: [
        {name: '岗位职级', state: false},
        {name: '通知设置', state: false}
      ]
    },
    {
      name: '其他功能',
      icon: 'el-icon-fa-unlock-alt',
      type: 'submenu',
      onOff: true,
      disabled: true,
      children: [
        {name: '菜单设置', type: 'menu-item', index: '/setting', route: {path: '/setting'}},
        {name: '功能设置', type: 'menu-item', index: '/feature-setting', route: {path: '/feature-setting'}}
      ],
      desc: '专业的解决方案，帮助提高企业的效率，减少企业的用工风险',
      stateList: [
        {name: '智能提醒设置', state: false},
        {name: 'APP', state: false}
      ]
    }
  ],

  // 自定义字段
  customFields: [
    {
      name: '工作信息',
      children: [
        {
          name: '岗位信息',
          children: [
            { name: '部门', must: true, show: true },
            { name: '岗位', must: true, show: true },
            { name: '职级', must: false, show: true },
            { name: '工号', must: false, show: true }
          ]
        },
        {
          name: '员工状态',
          children: [
            { name: '状态', must: true, show: true },
            { name: '入职日期', must: true, show: true },
            { name: '司龄', must: false, show: true },
            { name: '试用期', must: true, show: true },
            { name: '转正日期', must: false, show: true },
            { name: '离职日期', must: false, show: true }
          ]
        },
        {
          name: '工资卡',
          children: [
            { name: '工资卡号', must: false, show: true },
            { name: '账户姓名', must: false, show: false },
            { name: '开户城市', must: false, show: false },
            { name: '开户行', must: false, show: false }
          ]
        }
      ]
    },
    {
      name: '个人信息'
    }
  ]
}

const mutations = {
  [UPDATE_BREADCRUMB] (state, pathList) {
    state.pathList = pathList
  },
  [LOGIN_SUCCESS] (state, user) {
    state.user = user
  },
  [LOGIN_ERROR] (state, user) {
    state.user = false
  },
  [THEME_CHANGE] (state, colors) {
    const themeColors = JSON.stringify(colors)
    state.themeColors = JSON.parse(themeColors)
    window.localStorage.setItem('themeColors', themeColors)
  },
  [ADD_MENU] (state, index) {
    state.menuList[index].onOff = true
  },
  [DELETE_MENU] (state, index) {
    state.menuList[index].onOff = false
  }
}

export default {
  state,
  mutations,
  actions
}
