(function () {
  window.RESTAURANTS = [
    {
      id: "yin-san", name: "尹三豆汁（天坛店）", tier: "budget", tierLabel: "¥", price: [10, 25],
      district: "东城区", zone: "南城", address: "东晓市街176号，天坛北门附近", style: "老北京早餐",
      mealTypes: ["breakfast"], duration: 45, service: { breakfast: ["05:30", "12:30"] },
      dishes: ["豆汁", "焦圈", "面茶", "麻豆腐"], anchors: ["temple-heaven"],
      description: "适合天坛早场后的京味早餐，豆汁发酵风味明显，第一次尝试建议少量搭配焦圈。",
      constraint: "仅适合早餐或早午餐，晚到可能售罄；国庆营业时间需复核。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/beijing1/4961640.html" },
      video: { creator: "大祥哥来了", title: "价格大侦探：米其林老北京豆汁儿什么味", url: "https://www.bilibili.com/video/BV1Jqxye2Edz/" }
    },
    {
      id: "liu-ji", name: "刘记炙子烤肉（虎坊桥店）", tier: "mid", tierLabel: "¥¥", price: [90, 130],
      district: "西城区", zone: "南城", address: "腊竹胡同85号", style: "炙子烤肉",
      mealTypes: ["dinner"], duration: 90, service: { dinner: ["16:30", "22:30"] },
      dishes: ["烤牛肉", "烤羊肉", "烤牛舌", "炸窝头"], anchors: ["temple-heaven"],
      description: "油烟和烟火气都很足的胡同烤肉，适合一天行程结束后的晚饭。",
      constraint: "国庆建议错峰；堂内油烟感较强，正式活动前不宜安排。",
      fact: { label: "北京旅游网", url: "https://www.visitbeijing.com.cn/article/4IKrpmZCYPt" },
      video: { creator: "大霸子来了", title: "百年传承的老北京炙子烤肉", url: "https://www.bilibili.com/video/BV1C6aozPESy/" }
    },
    {
      id: "nanmen", name: "南门涮肉（后海店）", tier: "mid", tierLabel: "¥¥", price: [90, 140],
      district: "西城区", zone: "什刹海", address: "南官房胡同1号，银锭桥南", style: "铜锅涮肉",
      mealTypes: ["dinner"], duration: 100, service: { dinner: ["16:30", "23:00"] },
      dishes: ["手切鲜羊肉", "羊上脑", "鲜百叶", "烤烧饼"], anchors: ["beihai", "prince-gong", "shichahai"],
      description: "适合什刹海夜游后的晚饭，铜锅、麻酱、糖蒜和烧饼构成完整京味体验。",
      constraint: "品牌测评不等于后海分店实时出品；国庆建议先取号再逛后海。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/beijing1/4939531.html" },
      video: { creator: "特厨隋卞", title: "特厨探店南门涮肉", url: "https://www.bilibili.com/video/BV1vr421T7fM/" }
    },
    {
      id: "tingli", name: "听鹂馆饭庄", tier: "premium", tierLabel: "¥¥¥", price: [170, 300],
      district: "海淀区", zone: "西郊", address: "颐和园内，北如意门一带", style: "宫廷菜与药膳",
      mealTypes: ["lunch"], duration: 80, service: { lunch: ["11:00", "14:00"] },
      dishes: ["宫廷寿膳", "全鱼席", "滋补药膳", "昆明湖鱼"], anchors: ["summer-palace"],
      description: "园内宫廷菜体验，最适合作为颐和园长线游览中的午饭，不需要出园折返。",
      constraint: "资料可能滞后，需提前电话确认；当季菜单和宴席价格另询。",
      fact: { label: "北京旅游网", url: "https://s.visitbeijing.com.cn/food/158" },
      video: { creator: "特厨隋卞", title: "隋卞一探：宫廷菜听鹂馆", url: "https://www.bilibili.com/video/BV1QS4y1P7tU/" }
    },
    {
      id: "dadong", name: "大董（华贸购物中心店）", tier: "premium", tierLabel: "¥¥¥", price: [350, 500],
      district: "朝阳区", zone: "东城", address: "建国路81号华贸购物中心西区4层", style: "高端新京菜",
      mealTypes: ["lunch", "dinner"], duration: 120, service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "22:00"] },
      dishes: ["酥不腻烤鸭", "董氏宫保虾", "葱烧海参", "指橙糖醋小排"], anchors: ["art-798", "olympic-park"],
      description: "高预算方案中的新京菜选择，适合国贸、CBD或现代北京路线。",
      constraint: "建议预约，酒水和高价海鲜会显著提高人均。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/1/7049512.html" },
      video: { creator: "特厨隋卞", title: "北京烤鸭的天花板——大董", url: "https://www.bilibili.com/video/BV1GV4y1M76d/" }
    },
    {
      id: "shaguoju", name: "砂锅居（西四店）", tier: "mid", tierLabel: "¥¥", price: [80, 130],
      district: "西城区", zone: "什刹海", address: "西四南大街60号", style: "老字号砂锅与京鲁菜",
      mealTypes: ["lunch", "dinner"], duration: 80, service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "21:30"] },
      dishes: ["砂锅白肉", "砂锅吊子", "爆三样", "干炸小丸子"], anchors: ["palace-museum", "beihai", "prince-gong", "shichahai"],
      description: "西四老字号，适合故宫西侧、北海或恭王府行程中的正餐，砂锅白肉与传统京鲁菜更符合午晚餐需求。",
      constraint: "特厨视频反映拍摄当时体验；当前价格、菜量、国庆营业与排队须在门店页复核。",
      fact: { label: "北京旅游网", url: "https://s.visitbeijing.com.cn/food/31" },
      video: { creator: "特厨隋卞", bvid: "BV1ka411n7Nd", title: "八大居之首——砂锅居", url: "https://www.bilibili.com/video/BV1ka411n7Nd/" }
    },
  ];
})();
