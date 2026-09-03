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
      id: "menkuang", name: "门框胡同百年卤煮（前门总店）", tier: "budget", tierLabel: "¥", price: [35, 55],
      district: "西城区", zone: "中轴线", address: "大栅栏门框胡同19—21号", style: "市井京味",
      mealTypes: ["lunch", "dinner"], duration: 55, service: { lunch: ["09:00", "15:00"], dinner: ["16:30", "21:30"] },
      dishes: ["卤煮火烧", "炸灌肠", "麻豆腐"], anchors: ["tiananmen", "temple-heaven"],
      description: "前门附近的重口味老北京小吃，适合快速用餐；不吃内脏者不建议选择。",
      constraint: "视频中的35元为旧价格，现价和营业时间需在地图平台复核。",
      fact: { label: "高德门店页", url: "https://ditu.amap.com/place/B0FFGZSFG8" },
      video: { creator: "好A生活", title: "门框胡同百年卤煮单店探店", url: "https://www.bilibili.com/video/BV1Ks4y1s7HP/" }
    },
    {
      id: "duyichu", name: "都一处烧麦馆（前门店）", tier: "mid", tierLabel: "¥¥", price: [55, 90],
      district: "东城区", zone: "中轴线", address: "前门大街38号", style: "老字号非遗",
      mealTypes: ["lunch", "dinner"], duration: 70, service: { lunch: ["09:30", "15:00"], dinner: ["16:30", "21:00"] },
      dishes: ["猪肉荠菜烧麦", "三鲜烧麦", "乾隆白菜", "炸三角"], anchors: ["tiananmen", "temple-heaven"],
      description: "前门行程中较稳妥的正餐，烧麦适合多人分食，也可搭配传统京味凉菜。",
      constraint: "国庆饭点可能排队，建议错开12:00与18:00高峰。",
      fact: { label: "北京旅游网", url: "https://s.visitbeijing.com.cn/index.php/food/30" },
      video: { creator: "AiYaYa窒息的沉默", title: "前门老字号逛吃记录", url: "https://www.bilibili.com/video/BV1G1k2B4E5Z/" }
    },
    {
      id: "huguosi", name: "护国寺小吃总店", tier: "budget", tierLabel: "¥", price: [20, 40],
      district: "西城区", zone: "什刹海", address: "护国寺街93号", style: "京味小吃集合",
      mealTypes: ["breakfast", "lunch", "dinner"], duration: 50, service: { lunch: ["06:30", "15:00"], dinner: ["16:30", "20:00"] },
      dishes: ["面茶", "奶油炸糕", "豌豆黄", "羊杂汤"], anchors: ["beihai", "prince-gong", "shichahai"],
      description: "一次尝多种北京小吃的低预算选择，适合北海、恭王府和什刹海一带顺路安排。",
      constraint: "豆汁、面茶等口味差异大，建议多人少量分尝。",
      fact: { label: "北京旅游网", url: "https://s.visitbeijing.com.cn/index.php/food/68" },
      video: null
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
      id: "siji-minfu", name: "四季民福烤鸭店（故宫店）", tier: "mid", tierLabel: "¥¥", price: [130, 200],
      district: "东城区", zone: "中轴线", address: "南池子大街11号，故宫东华门附近", style: "烤鸭与京鲁菜",
      mealTypes: ["lunch", "dinner"], duration: 100, service: { lunch: ["10:30", "15:00"], dinner: ["16:30", "21:30"] },
      dishes: ["酥香嫩烤鸭", "贝勒烤肉", "巧拌豆苗", "宫廷杏仁豆腐"], anchors: ["palace-museum", "jingshan"],
      description: "游客较易理解的北京烤鸭与京鲁菜组合，故宫店位置好，但国庆排队压力很高。",
      constraint: "故宫不可中途出馆后返回；建议游览结束后用餐，并依据实时取号动态调整。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/webapp/gourmet/food/fooddetail/1/12137271.html" },
      video: { creator: "睡觉啦_SLEEPY", title: "国庆四季民福体验", url: "https://www.bilibili.com/video/BV1W94y1a7D6/" }
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
    {
      id: "trb", name: "TRB Hutong", tier: "premium", tierLabel: "¥¥¥", price: [800, 1500],
      district: "东城区", zone: "东北城", address: "沙滩北街23号嵩祝寺", style: "古寺现代法餐",
      mealTypes: ["lunch", "dinner"], duration: 150, service: { lunch: ["11:30", "14:30"], dinner: ["17:30", "22:00"] },
      dishes: ["季节品鉴菜单", "鳌虾", "和牛", "榛子拿破仑"], anchors: ["palace-museum", "jingshan", "lama-temple"],
      description: "纪念日或高预算方案，古寺空间与现代法餐结合，应单独预留2—3小时。",
      constraint: "须预约；视频价格为旧消费，仅用于观察环境和菜式。",
      fact: { label: "TRB官网", url: "https://www.trbhutong.com/" },
      video: { creator: "蛋总喵", title: "TRB Hutong单店体验", url: "https://www.bilibili.com/video/BV1544y1b7yQ/" }
    },
    {
      id: "three-broomsticks", name: "三把扫帚", tier: "mid", tierLabel: "¥¥", price: [100, 160],
      district: "通州区", zone: "通州", address: "北京环球影城哈利·波特主题区内", style: "主题英式餐厅",
      mealTypes: ["lunch"], duration: 55, service: { lunch: ["10:30", "16:00"] },
      dishes: ["烤鸡排骨拼盘", "炸鱼薯条", "美食盛宴", "黄油啤酒"], anchors: ["universal"],
      description: "环球影城日的园内午餐，可在不离园的情况下完成主题体验。",
      constraint: "必须持环球影城有效门票；营业时间随园区变化，建议11:00前或14:00后错峰。",
      fact: { label: "环球度假区官网", url: "https://www.universalbeijingresort.com/zh_CN/restaurant/sanbasaozhoutm" },
      video: { creator: "rikku闲不咸", title: "环球影城八店横向试吃", url: "https://www.bilibili.com/video/BV1t24y127RZ/" }
    },
    {
      id: "commune-kitchen", name: "公社小厨（长城脚下的公社）", tier: "premium", tierLabel: "¥¥¥", price: [150, 250],
      district: "延庆区", zone: "延庆", address: "八达岭镇石佛寺村，水关长城出口附近", style: "长城景观北方菜",
      mealTypes: ["lunch", "dinner"], duration: 80, service: { lunch: ["11:30", "14:00"], dinner: ["17:30", "21:00"] },
      dishes: ["果木烤鸭", "宫保鸡丁", "水库鱼头", "松茸炖老豆腐"], anchors: ["badaling"],
      description: "适合自驾长城日或专程用餐，景观和酒店建筑本身也是体验的一部分。",
      constraint: "不在八达岭主入口步行范围内，必须另加约车或自驾接驳，不能写成下长城即到。",
      fact: { label: "凯悦官方餐饮页", url: "https://www.hyatt.com/unbound-collection/zh-CN/pekub-commune-by-the-great-wall/dining" },
      video: { creator: "大白小宇看世界", title: "长城脚下的公社综合体验", url: "https://www.bilibili.com/video/av672725605/" }
    }
  ];
})();
