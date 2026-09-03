(function () {
  window.RESTAURANTS.push(
    {
      id: "five-guys", name: "FIVE GUYS（朝阳大悦城店）", tier: "mid", tierLabel: "¥¥", price: [68, 100],
      district: "朝阳区", zone: "东城", address: "朝阳北路101号朝阳大悦城2层", style: "美式汉堡快餐", mealTypes: ["lunch", "dinner"], duration: 60,
      service: { lunch: ["11:00", "15:00"], dinner: ["16:30", "21:30"] }, dishes: ["培根芝士汉堡", "原切粗薯条", "培根奶昔"], anchors: ["art-798"],
      description: "本卡使用朝阳大悦城店的公开地址与营业信息；关联视频仅为北京开业实测，未注明拍摄分店。", constraint: "不能据此认定视频画面来自朝阳店；国庆营业与排队情况仍需临行查看。",
      fact: { label: "品牌官方朝阳店", url: "https://restaurants.fiveguys.cn/101-chaoyang-north-road" }, video: { creator: "大霸子来了", bvid: "BV1Z9uc6tESn", title: "北京Five Guys开业首日实测（拍摄分店未注明）", url: "https://www.bilibili.com/video/BV1Z9uc6tESn/" }
    },
    {
      id: "yisitan", name: "伊斯坦丁·清真·丝路美食", tier: "mid", tierLabel: "¥¥", price: [100, 150],
      district: "朝阳区", zone: "北城", address: "慧忠北里214号楼4层", style: "清真丝路融合菜", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "21:30"] }, dishes: ["天山烤羊排", "新疆大盘鸡", "烤架子肉"], anchors: ["olympic-park"],
      description: "可衔接鸟巢与奥林匹克公园，适合多人分享。", constraint: "推荐菜来自平台门店资料，不等同于视频逐项点单。",
      fact: { label: "Apple Maps门店页", url: "https://maps.apple.com/place?_provider=57879&place-id=H2710I3F98994FF328B" }, video: { creator: "大霸子来了", bvid: "BV12oMt6jET9", title: "鸟巢附近的精致丝路美食", url: "https://www.bilibili.com/video/BV12oMt6jET9/" }
    },
    {
      id: "argentina-estate", name: "阿根廷庄园", tier: "premium", tierLabel: "¥¥¥", price: [250, 360],
      district: "朝阳区", zone: "东北城", address: "来广营东路1号", style: "阿根廷烤肉", mealTypes: ["lunch", "dinner"], duration: 110,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "21:00"] }, dishes: ["果木烤牛排", "阿根廷烤肉", "烤蔬菜"], anchors: ["art-798"],
      description: "独门独院的烤肉餐厅，适合东北部路线。", constraint: "果木烤牛排需预约；UP主当次未吃到，不能写成视频实测推荐。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/beijing1/7029911.html" }, video: { creator: "大霸子来了", bvid: "BV1GA7h6WEJE", title: "北京独门独院的阿根廷庄园", url: "https://www.bilibili.com/video/BV1GA7h6WEJE/" }
    },
    {
      id: "laofang-bbq", name: "黑山烤房", tier: "premium", tierLabel: "¥¥¥", price: [150, 220],
      district: "昌平区", zone: "北郊", address: "延寿镇北庄村52号", style: "美式烟熏BBQ", mealTypes: ["lunch"], duration: 100,
      service: { lunch: ["11:00", "16:00"] }, dishes: ["烟熏猪肋排", "牛前胸", "烟熏香肠", "酸黄瓜"], anchors: ["badaling"],
      description: "京郊周末限定烤肉，适合自驾支线。", constraint: "仅周六日、售完即止且不预约，排队可能数小时，风险高。",
      fact: { label: "Trip.com门店资料", url: "https://tw.trip.com/restaurant/china/beijing/detail/laofangs-bbq-136360129/" }, video: { creator: "大霸子来了", bvid: "BV1SuJ36eEdE", title: "京郊美式烤肉为何周末排大队", url: "https://www.bilibili.com/video/BV1SuJ36eEdE/" }
    },
    {
      id: "taipo", name: "太婆天府山珍酒楼（复兴门店）", tier: "mid", tierLabel: "¥¥", price: [110, 160],
      district: "西城区", zone: "西直门", address: "二七剧场路南口甲19号楼1层", style: "乌鸡菌菇火锅", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["10:30", "15:00"], dinner: ["16:30", "23:00"] }, dishes: ["乌鸡锅底", "竹荪", "牛肝菌", "鲜松茸"], anchors: ["beijing-zoo", "beihai"],
      description: "长安街西段的菌菇火锅，适合秋季暖胃。", constraint: "鲜菌供应和价格按季节变化。",
      fact: { label: "Trip.com门店资料", url: "https://sg.trip.com/restaurant/china/beijing/detail/taipotianfushanzhen-restaurant-fuxingmen-279240/" }, video: { creator: "大霸子来了", bvid: "BV1sJRiBmEf4", title: "长安街边鲜美乌鸡菌菇火锅", url: "https://www.bilibili.com/video/BV1sJRiBmEf4/" }
    },
    {
      id: "chaishi", name: "柴氏风味斋（甘家口店）", tier: "budget", tierLabel: "¥", price: [50, 65],
      district: "海淀区", zone: "西郊", address: "甘家口小区21号楼底商", style: "牛肉面与清真小吃", mealTypes: ["lunch", "dinner"], duration: 55,
      service: { lunch: ["10:30", "15:00"], dinner: ["16:30", "21:30"] }, dishes: ["柴氏牛肉面", "酱牛肉", "小碗肉", "羊肉串"], anchors: ["summer-palace", "beijing-zoo"],
      description: "价位友好的老北京牛肉面，适合西线简餐。", constraint: "饭点排队，平台营业时间需临行复核。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/1/4936970.html" }, video: { creator: "大霸子来了", bvid: "BV1MAogBnEZu", title: "老北京地道牛肉面", url: "https://www.bilibili.com/video/BV1MAogBnEZu/" }
    },
    {
      id: "huifeng", name: "惠丰涮肉馆（德宝新园店）", tier: "mid", tierLabel: "¥¥", price: [80, 120],
      district: "西城区", zone: "西直门", address: "西直门外大街德宝新园乙20号", style: "国营铜锅涮肉", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "21:00"] }, dishes: ["手切羊肉", "鲜羊肉", "羊肉串", "烧饼"], anchors: ["beijing-zoo"],
      description: "北京展览馆附近的老牌铜锅，偏晚餐。", constraint: "独立营业时间来源不足，临行需电话复核。",
      fact: { label: "地图门店资料", url: "https://poi.mapbar.com/beijing/MAPIHPXRQNJWQRHWJBTNC" }, video: { creator: "大霸子来了", bvid: "BV1X7QvBEEeC", title: "经营超过30年的国营火锅店", url: "https://www.bilibili.com/video/BV1X7QvBEEeC/" }
    },
    {
      id: "maiden-tower", name: "阿塞拜疆国家品牌馆·少女塔餐厅", tier: "mid", tierLabel: "¥¥", price: [110, 170],
      district: "朝阳区", zone: "东北城", address: "霄云路35号东信商业广场3层", style: "阿塞拜疆高加索菜", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["10:00", "15:00"], dinner: ["16:30", "22:00"] }, dishes: ["炖羊腿", "含羞沙拉", "自制面包", "烤肉拼盘"], anchors: ["art-798", "lama-temple"],
      description: "北京少见的高加索清真菜，适合使馆区路线。", constraint: "视频标签明确沙拉、馕和羊腿；国庆仍建议节前预约。",
      fact: { label: "北京文旅资料", url: "https://japanese.beijing.gov.cn/specials/musteatmeals/exoticrestaurants/202411/t20241106_3935529.html" }, video: { creator: "大霸子来了", bvid: "BV17LGZzrEET", title: "北京唯一的阿塞拜疆餐厅？", url: "https://www.bilibili.com/video/BV17LGZzrEET/" }
    },
    {
      id: "xiaojie-zhushou", name: "小街猪手（团结湖店）", tier: "mid", tierLabel: "¥¥", price: [100, 150],
      district: "朝阳区", zone: "东城", address: "团结湖路9号楼南侧胡同", style: "云南猪手火锅", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:30", "15:00"], dinner: ["17:00", "21:30"] }, dishes: ["酸汤猪手", "干锅猪手", "云南涮材"], anchors: ["art-798"],
      description: "胡同里的猪手火锅，晚餐更匹配。", constraint: "晚餐常排长队，建议线上排号。",
      fact: { label: "北京旅游网", url: "https://www.visitbeijing.com.cn/article/4PGp5GUFewP" }, video: { creator: "大霸子来了", bvid: "BV1VNq4BsEpG", title: "北京猪手界的排队王", url: "https://www.bilibili.com/video/BV1VNq4BsEpG/" }
    },
    {
      id: "xiangchangxiang", name: "湘肠香火锅店（团结湖店）", tier: "mid", tierLabel: "¥¥", price: [70, 120],
      district: "朝阳区", zone: "东城", address: "团结湖东里甲3-1号", style: "湘味肥肠火锅", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "21:30"] }, dishes: ["肥肠火锅", "擂椒皮蛋", "酸菜炒饭"], anchors: ["art-798"],
      description: "在北京经营多年的湘味肥肠火锅。", constraint: "不同平台人均差异较大，视频明确提及的只有肥肠火锅。",
      fact: { label: "北京旅游网", url: "https://www.visitbeijing.com.cn/article/4PGp5GUFewP" }, video: { creator: "大霸子来了", bvid: "BV1dDrxBBE9j", title: "北京二十年以上湘菜馆", url: "https://www.bilibili.com/video/BV1dDrxBBE9j/" }
    },
    {
      id: "mai-thai", name: "売泰（三里T+MALL店）", tier: "budget", tierLabel: "¥", price: [40, 65],
      district: "朝阳区", zone: "东北城", address: "三里屯一号场T+MALL B1-13", style: "泰国船粉简餐", mealTypes: ["lunch", "dinner"], duration: 60,
      service: { lunch: ["11:30", "15:00"], dinner: ["16:30", "20:30"] }, dishes: ["泰国船粉", "打抛饭", "冬阴功汤", "泰式火锅"], anchors: ["art-798", "lama-temple"],
      description: "适合三里屯路线的低价快速午餐。", constraint: "20:30闭店，旧盈科门店地址不可混用。",
      fact: { label: "Trip.com门店资料", url: "https://hk.trip.com/restaurant/china/beijing/detail/restaurant-115334018/" }, video: { creator: "大霸子来了", bvid: "BV1hFrNYCESh", title: "少见的泰国船粉", url: "https://www.bilibili.com/video/BV1hFrNYCESh/" }
    },
    {
      id: "taco-bar", name: "THE TACO BAR（三里屯店）", tier: "mid", tierLabel: "¥¥", price: [90, 130],
      district: "朝阳区", zone: "东北城", address: "工体北路4号院机电院10号楼", style: "墨西哥TACO", mealTypes: ["lunch", "dinner"], duration: 80,
      service: { lunch: ["11:30", "15:00"], dinner: ["17:00", "23:00"] }, dishes: ["炸鱼TACO", "牛舌TACO", "玉米片牛油果"], anchors: ["art-798", "lama-temple"],
      description: "适合三里屯晚餐和小酌。", constraint: "周一休息；视频提醒甜品体验不佳，不能写成推荐。",
      fact: { label: "官方营业页", url: "https://www.tacobarchina.com/hours-chinese" }, video: { creator: "大霸子来了", bvid: "BV1hFrNYCESh", title: "号称北京口味第一的墨西哥TACO", url: "https://www.bilibili.com/video/BV1hFrNYCESh/" }
    }
  );
})();
