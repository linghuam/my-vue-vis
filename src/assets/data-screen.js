export default {
  setting: {
    /** 大屏的配置信息 */
  },
  charts: [ // 大屏包含的图表列表
    {
      id: 'string', // 图表id
      type: 'string', // 图表类型枚举值（参考图表类型hash映射表）
      config: 'Object', // 图表配置对像
      data: 'Object', // 图表数据对象
    }
  ]
}