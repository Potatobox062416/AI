(function () {
  const webp = new Set();
  const gallery = (slug) => [1, 2, 3, 4].map((index) => {
    const key = `${slug}-${index}`;
    return `assets/attractions/${slug}/${key}.${webp.has(key) ? "webp" : "jpg"}`;
  });

  window.ATTRACTIONS = [
    {
      id: "palace-museum",
      name: "故宫博物院",
      category: "古都",
      district: "东城区",
      zone: "中轴线",
      address: "景山前街4号，午门进入",
      duration: 270,
      priceLabel: "旺季 ¥60",
      prices: { adult: 60, youth: 0, child: 0, senior: 30 },
      tags: ["世界遗产", "明清宫殿", "必去"],
      environment: "mixed",
      summary: "沿北京中轴线穿过明清皇宫，在宫殿建筑、原状陈列和馆藏文物之间理解紫禁城。",
      highlights: ["午门与太和殿", "后三宫与御花园", "珍宝馆", "钟表馆"],
      play: "建议按午门—三大殿—乾清宫—御花园—神武门单向游览；珍宝馆、钟表馆各另购10元门票。",
      booking: {
        kind: "urgent", days: 7, time: "20:00", channel: "故宫博物院小程序 / 官网",
        miniProgram: "故宫博物院", url: "https://ticket.dpm.org.cn/",
        rule: "参观日前第7天20:00开售，不售当日票；所有观众均须实名预约。"
      },
      images: gallery("palace-museum")
    },
    {
      id: "tiananmen",
      name: "天安门广场",
      category: "古都",
      district: "东城区",
      zone: "中轴线",
      address: "东长安街，故宫南侧",
      duration: 90,
      priceLabel: "免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["升旗", "中轴线", "免费"],
      environment: "outdoor",
      summary: "北京城市中轴的核心公共空间，可观看升旗并串联人民英雄纪念碑、正阳门与故宫。",
      highlights: ["升旗仪式", "人民英雄纪念碑", "正阳门", "天安门城楼外观"],
      play: "观看升旗需按当日升旗时间倒推到场，并为外围安检、步行和人流疏导预留至少60分钟。",
      booking: {
        kind: "urgent", days: 9, time: null, channel: "天安门广场预约参观 / 京通",
        miniProgram: "天安门广场预约参观", url: "https://yuyue2026.tamgw.beijing.gov.cn/web/",
        rule: "免费实名预约，可预约未来10日（通常提前1—9日）；升旗须选择“升旗”时段，与故宫预约互不替代。"
      },
      images: gallery("tiananmen")
    },
    {
      id: "national-museum",
      name: "中国国家博物馆",
      category: "博物馆",
      district: "东城区",
      zone: "中轴线",
      address: "东长安街16号",
      duration: 240,
      priceLabel: "免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["古代中国", "室内", "免费"],
      environment: "indoor",
      summary: "从古代中国基本陈列到国家重大历史题材展览，以文物建立完整的中国历史纵深。",
      highlights: ["古代中国", "复兴之路", "馆藏精品", "临时专题展"],
      play: "体量很大，不建议追求全馆通刷；首次参观可优先地下一层“古代中国”，再选一项专题展。",
      booking: {
        kind: "urgent", days: 7, time: "17:00", channel: "国家博物馆官网 / 官方小程序",
        miniProgram: "国家博物馆", url: "https://pcticket.chnmuseum.cn/",
        rule: "提前7天、每日17:00放票；按预约时段从北门核验入馆。"
      },
      images: gallery("national-museum")
    },
    {
      id: "jingshan",
      name: "景山公园",
      category: "园林",
      district: "西城区",
      zone: "中轴线",
      address: "景山西街44号",
      duration: 75,
      priceLabel: "日常 ¥2",
      prices: { adult: 2, youth: 1, child: 0, senior: 0 },
      tags: ["俯瞰故宫", "日落", "中轴线"],
      environment: "outdoor",
      summary: "登万春亭俯瞰故宫屋顶与北京中轴线，是故宫神武门出宫后的最佳收束点。",
      highlights: ["万春亭", "故宫全景", "寿皇殿", "中轴线日落"],
      play: "南门入园后登山约15—25分钟；国庆日落观景人多，宜在日落前60分钟进入。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "畅游公园 / 现场",
        miniProgram: "畅游公园", url: "https://www.bjgyol.com.cn/",
        rule: "市属公园不强制预约，国庆建议提前1—7天购票；活动期间票价可能调整。"
      },
      images: gallery("jingshan")
    },
    {
      id: "temple-heaven",
      name: "天坛公园",
      category: "古都",
      district: "东城区",
      zone: "南城",
      address: "天坛路甲1号",
      duration: 180,
      priceLabel: "联票 ¥34",
      prices: { adult: 34, youth: 17, child: 0, senior: 0 },
      tags: ["世界遗产", "祭天礼制", "祈年殿"],
      environment: "mixed",
      summary: "中国现存规模最大的古代祭祀性建筑群，集中呈现礼制、声学和空间秩序。",
      highlights: ["祈年殿", "皇穹宇", "回音壁", "圜丘"],
      play: "建议购买34元联票，从东门进入祈年殿，沿丹陛桥南行至回音壁和圜丘。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "畅游公园 / 天坛官方平台",
        miniProgram: "畅游公园", url: "https://www.bjgyol.com.cn/",
        rule: "大门票15元、联票34元；国庆建议提前购联票。"
      },
      images: gallery("temple-heaven")
    },
    {
      id: "summer-palace",
      name: "颐和园",
      category: "园林",
      district: "海淀区",
      zone: "西郊",
      address: "新建宫门路19号",
      duration: 270,
      priceLabel: "联票 ¥60",
      prices: { adult: 60, youth: 30, child: 0, senior: 0 },
      tags: ["世界遗产", "皇家园林", "游船"],
      environment: "outdoor",
      summary: "以昆明湖、万寿山为骨架的皇家园林，兼具湖上视野、长廊彩画与宫殿寺院。",
      highlights: ["长廊", "佛香阁", "十七孔桥", "昆明湖游船"],
      play: "半日游可走东宫门—长廊—佛香阁—石舫；全日游再加入西堤或十七孔桥。游船另付费。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "颐和园小程序 / 畅游公园",
        miniProgram: "颐和园", url: "https://yhy.yidyou.cn/",
        rule: "大门票30元，含园中园联票60元；国庆建议提前1—7天购买。"
      },
      images: gallery("summer-palace")
    },
    {
      id: "yuanmingyuan",
      name: "圆明园遗址公园",
      category: "园林",
      district: "海淀区",
      zone: "西郊",
      address: "清华西路28号",
      duration: 210,
      priceLabel: "通票 ¥25",
      prices: { adult: 25, youth: 10, child: 0, senior: 0 },
      tags: ["遗址", "大水法", "历史教育"],
      environment: "outdoor",
      summary: "在湖区、考古遗址和西洋楼残迹之间理解“万园之园”的营建、毁坏与保护。",
      highlights: ["大水法", "西洋楼遗址", "黄花阵", "盛时全景模型"],
      play: "面积很大，首次建议购买25元通票，南门入园后将主要时间留给长春园西洋楼遗址区。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "圆明园遗址公园公众号 / 官网",
        miniProgram: "圆明园门票", url: "https://www.yuanmingyuanpark.cn/",
        rule: "大门票10元、通票25元；可线上购买或现场购票。"
      },
      images: gallery("yuanmingyuan")
    },
    {
      id: "beihai",
      name: "北海公园",
      category: "园林",
      district: "西城区",
      zone: "什刹海",
      address: "文津街1号",
      duration: 150,
      priceLabel: "联票 ¥20",
      prices: { adult: 20, youth: 10, child: 0, senior: 0 },
      tags: ["皇家园林", "白塔", "游船"],
      environment: "outdoor",
      summary: "以琼华岛和白塔为中心的古代皇家园林，可与景山、恭王府和什刹海连成一天。",
      highlights: ["白塔", "琼华岛", "九龙壁", "湖上游船"],
      play: "南门入园登琼华岛后，可沿东岸或乘船前往北岸；旺季联票20元。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "畅游公园 / 现场",
        miniProgram: "畅游公园", url: "https://www.bjgyol.com.cn/",
        rule: "市属公园不强制预约；国庆建议提前购票，游船另付费。"
      },
      images: gallery("beihai")
    },
    {
      id: "prince-gong",
      name: "恭王府博物馆",
      category: "古都",
      district: "西城区",
      zone: "什刹海",
      address: "前海西街17号",
      duration: 150,
      priceLabel: "¥40",
      prices: { adult: 40, youth: 20, child: 0, senior: 20 },
      tags: ["清代王府", "和珅", "园林"],
      environment: "mixed",
      summary: "保存完整的清代王府和花园，以建筑等级、生活空间和福文化理解王府制度。",
      highlights: ["银安殿", "后罩楼", "西洋门", "福字碑"],
      play: "前府后园顺序游览，讲解价值较高；可与北海、什刹海安排在同一天。",
      booking: {
        kind: "urgent", days: 10, time: "20:00", channel: "恭王府博物馆官网 / 小程序",
        miniProgram: "恭王府博物馆", url: "https://web.pgm.org.cn/",
        rule: "最早于参观前第10天20:00预订，实名购票。"
      },
      images: gallery("prince-gong")
    },
    {
      id: "lama-temple",
      name: "雍和宫",
      category: "古都",
      district: "东城区",
      zone: "东北城",
      address: "雍和宫大街12号",
      duration: 105,
      priceLabel: "¥25",
      prices: { adult: 25, youth: 12, child: 0, senior: 12 },
      tags: ["藏传佛教", "皇家寺院", "木雕"],
      environment: "mixed",
      summary: "由王府改建的藏传佛教寺院，融合汉、满、蒙、藏建筑与宗教艺术。",
      highlights: ["法轮殿", "万福阁大佛", "五百罗汉山", "御碑亭"],
      play: "由南向北单向参观，院内免费提供环保香；不宜把礼佛空间当作普通拍照布景。",
      booking: {
        kind: "urgent", days: 10, time: "08:00", channel: "雍和宫游客信众服务",
        miniProgram: "雍和宫游客信众服务", url: "https://piao.yonghegong.cn/",
        rule: "官方公众号实名购票，可提前约10天；节日期间按上、下午时段入园。"
      },
      images: gallery("lama-temple")
    },
    {
      id: "shichahai",
      name: "什刹海与胡同",
      category: "街区",
      district: "西城区",
      zone: "什刹海",
      address: "前海、后海及烟袋斜街一带",
      duration: 210,
      priceLabel: "街区免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["胡同", "湖区", "夜游"],
      environment: "outdoor",
      summary: "沿前海、后海和历史胡同步行，连接银锭桥、烟袋斜街与钟鼓楼。",
      highlights: ["银锭桥", "烟袋斜街", "钟鼓楼外观", "胡同漫步"],
      play: "公共街区免费开放；游船、钟鼓楼、名人故居分别收费。傍晚比正午更适合步行。",
      booking: {
        kind: "open", days: 0, time: null, channel: "开放街区",
        miniProgram: null, url: "https://s.visitbeijing.com.cn/attraction/117800",
        rule: "无需预约；收费场馆和游船按各自规则购买。"
      },
      images: gallery("shichahai")
    },
    {
      id: "badaling",
      name: "八达岭长城",
      category: "长城",
      district: "延庆区",
      zone: "延庆",
      address: "八达岭镇军都山关沟古道北口",
      duration: 240,
      priceLabel: "旺季 ¥40",
      prices: { adult: 40, youth: 0, child: 0, senior: 0 },
      tags: ["明长城", "高铁可达", "客流高"],
      environment: "outdoor",
      summary: "开放成熟、交通便利的经典明长城段，可徒步南北线或搭乘索道降低体力消耗。",
      highlights: ["北八楼", "好汉坡", "南线城楼", "长城博物馆"],
      play: "市区往返按一整天安排；国庆优先选择早班高铁并避开中午登城高峰。索道另付费。",
      booking: {
        kind: "advance", days: 15, time: null, channel: "长城内外旅游 / 八达岭官网",
        miniProgram: "长城内外旅游", url: "https://www.badaling.cn/",
        rule: "支持实名预约购票和现场购票；国庆建议提前锁定日期。"
      },
      images: gallery("badaling")
    },
    {
      id: "mutianyu",
      name: "慕田峪长城",
      category: "长城",
      district: "怀柔区",
      zone: "怀柔",
      address: "渤海镇慕田峪村",
      duration: 240,
      priceLabel: "电子票 ¥40",
      prices: { adult: 40, youth: 20, child: 0, senior: 20 },
      tags: ["秋色", "敌楼密集", "滑道"],
      environment: "outdoor",
      summary: "植被覆盖率高、敌楼密集的长城段，适合想兼顾风景、徒步和亲子体验的团队。",
      highlights: ["正关台", "大角楼", "西线徒步", "缆车与滑道"],
      play: "普通电子票40元、明信片票45元；摆渡车、缆车、索道和滑道均另收费且部分不互通。",
      booking: {
        kind: "advance", days: 30, time: null, channel: "慕田峪长城官网 / 公众号",
        miniProgram: "慕田峪长城", url: "https://www.mutianyugreatwall.com/cnTickets",
        rule: "实名购票，最多可提前30天；国庆适合尽早购买。"
      },
      images: gallery("mutianyu")
    },
    {
      id: "beijing-zoo",
      name: "北京动物园",
      category: "亲子",
      district: "西城区",
      zone: "西直门",
      address: "西直门外大街137号",
      duration: 270,
      priceLabel: "熊猫联票 ¥19",
      prices: { adult: 19, youth: 9.5, child: 0, senior: 0 },
      tags: ["大熊猫", "亲子", "萌兰"],
      environment: "outdoor",
      summary: "以大熊猫馆为核心的城市动物园，适合有儿童的团队安排半天至大半天。",
      highlights: ["大熊猫馆", "萌兰", "亚洲象", "狮虎山"],
      play: "建议购买含熊猫馆联票并从南门早入园，先看大熊猫；动物状态和展出安排以现场为准。",
      booking: {
        kind: "advance", days: 7, time: null, channel: "北京动物园购票平台 / 畅游公园",
        miniProgram: "北京动物园购票平台", url: "https://www.bjgyol.com.cn/",
        rule: "旺季大门票15元，含熊猫馆联票19元；国庆建议提前购买。"
      },
      images: gallery("beijing-zoo")
    },
    {
      id: "art-798",
      name: "798艺术区",
      category: "现代",
      district: "朝阳区",
      zone: "东北城",
      address: "酒仙桥路4号",
      duration: 180,
      priceLabel: "公共区免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["当代艺术", "工业建筑", "摄影"],
      environment: "mixed",
      summary: "由电子工业厂区转型而来的当代艺术聚落，画廊、展馆和工业遗存交织。",
      highlights: ["包豪斯厂房", "当代展览", "公共艺术", "设计商店"],
      play: "公共街区免费，UCCA等展馆单独购票；多数展馆周一闭馆，宜安排周二至周日。",
      booking: {
        kind: "open", days: 0, time: null, channel: "公共区直接进入",
        miniProgram: null, url: "https://s.visitbeijing.com.cn/attraction/101342",
        rule: "公共区无需预约；收费展览以各机构当天展讯为准。"
      },
      images: gallery("art-798")
    },
    {
      id: "olympic-park",
      name: "北京奥林匹克公园",
      category: "现代",
      district: "朝阳区",
      zone: "北城",
      address: "北辰路，中轴线北延长线",
      duration: 150,
      priceLabel: "公共区免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["鸟巢", "水立方", "夜景"],
      environment: "outdoor",
      summary: "2008与2022双奥遗产集中区，适合傍晚沿景观大道看鸟巢、水立方亮灯。",
      highlights: ["鸟巢外观", "水立方外观", "景观大道", "夜景灯光"],
      play: "公共区免费；鸟巢、水立方内部参观、演出或赛事另行购票，活动日可能限制通行。",
      booking: {
        kind: "open", days: 0, time: null, channel: "公共区直接进入",
        miniProgram: null, url: "https://s.visitbeijing.com.cn/index.php/attraction/118019",
        rule: "公共区无需预约；场馆内部参观以场馆官方当天安排为准。"
      },
      images: gallery("olympic-park")
    },
    {
      id: "universal",
      name: "北京环球度假区",
      category: "现代",
      district: "通州区",
      zone: "通州",
      address: "环球大道1号",
      duration: 600,
      priceLabel: "单日票 ¥363起",
      prices: { adult: 748, youth: 560, child: 0, senior: 560 },
      tags: ["主题乐园", "哈利·波特", "亲子"],
      environment: "mixed",
      summary: "围绕电影IP构建的沉浸式主题乐园，七大主题区覆盖骑乘、演出、餐饮和夜景。",
      highlights: ["哈利·波特", "变形金刚", "侏罗纪世界", "功夫熊猫"],
      play: "国庆必须按完整一天安排；单日票为日期动态价，363元仅为当前起价，计划预算按约748元/成人估算。",
      booking: {
        kind: "urgent", days: 30, time: null, channel: "北京环球度假区APP / 小程序",
        miniProgram: "北京环球度假区", url: "https://www.universalbeijingresort.com/zh_CN/price-calendar",
        rule: "购买指定日期票即完成日期锁定；国庆动态价格以官方价格日历为准。"
      },
      images: gallery("universal")
    }
  ];

  window.PLAN_PROFILES = [
    {
      id: "classic", name: "中轴经典", short: "第一次来北京", hotel: "前门 / 崇文门", hotelZone: "中轴线", hotelReason: "步行或短途地铁连接天安门、故宫、天坛，夜间餐饮选择多。", hotelRange: [680, 980], foodFactor: 1,
      days: [
        ["tiananmen", "palace-museum", "jingshan"],
        ["temple-heaven", "national-museum"],
        ["badaling"],
        ["summer-palace", "yuanmingyuan"],
        ["prince-gong", "beihai", "shichahai"],
        ["lama-temple", "art-798", "olympic-park"],
        ["universal"]
      ]
    },
    {
      id: "family", name: "亲子省心", short: "儿童体验优先", hotel: "西直门 / 新街口", hotelZone: "西直门", hotelReason: "靠近动物园、北海与地铁换乘节点，返回酒店休息更方便。", hotelRange: [620, 920], foodFactor: 1.05,
      days: [
        ["beijing-zoo", "beihai"],
        ["universal"],
        ["mutianyu"],
        ["summer-palace"],
        ["tiananmen", "palace-museum", "jingshan"],
        ["art-798", "olympic-park"],
        ["temple-heaven", "shichahai"]
      ]
    },
    {
      id: "culture", name: "古都深读", short: "文博与建筑", hotel: "王府井 / 东四", hotelZone: "中轴线", hotelReason: "位于古都景点之间，兼顾故宫、国博、雍和宫和什刹海。", hotelRange: [720, 1080], foodFactor: 1,
      days: [
        ["palace-museum", "jingshan"],
        ["national-museum", "tiananmen"],
        ["prince-gong", "beihai", "shichahai"],
        ["temple-heaven", "lama-temple"],
        ["summer-palace", "yuanmingyuan"],
        ["badaling"],
        ["art-798", "olympic-park"]
      ]
    },
    {
      id: "modern", name: "古今并看", short: "现代体验优先", hotel: "国贸 / 双井", hotelZone: "东城", hotelReason: "地铁7号线直达环球度假区，去798和奥林匹克公园也较顺。", hotelRange: [760, 1180], foodFactor: 1.12,
      days: [
        ["art-798", "olympic-park"],
        ["universal"],
        ["national-museum", "tiananmen"],
        ["mutianyu"],
        ["summer-palace", "yuanmingyuan"],
        ["palace-museum", "jingshan"],
        ["beijing-zoo", "beihai"]
      ]
    },
    {
      id: "relaxed", name: "长幼从容", short: "老人同行", hotel: "东直门 / 北新桥", hotelZone: "东北城", hotelReason: "去雍和宫、什刹海和慕田峪接驳更顺，餐饮与医疗配套成熟。", hotelRange: [680, 980], foodFactor: 1.05,
      days: [
        ["tiananmen", "national-museum"],
        ["palace-museum", "jingshan"],
        ["summer-palace"],
        ["mutianyu"],
        ["prince-gong", "shichahai"],
        ["temple-heaven", "beihai"],
        ["lama-temple", "olympic-park"]
      ]
    }
  ];
})();
