(function () {
  const webp = new Set(["art-798-3", "olympic-park-3", "universal-3"]);
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
    },
    {
      id: "tiananmen-rostrum",
      name: "天安门城楼",
      category: "古都",
      district: "东城区",
      zone: "中轴线",
      address: "天安门广场北端，城楼北侧存包后入场",
      duration: 40,
      priceLabel: "成人 ¥15",
      prices: { adult: 15, youth: 0, child: 0, senior: 0 },
      tags: ["北京中轴线", "城楼", "俯瞰广场"],
      environment: "mixed",
      summary: "登临天安门城楼近距离观察城台、屋顶和金水桥，并从城楼上俯瞰天安门广场与北京中轴线。",
      highlights: ["城楼建筑", "金水桥", "广场全景", "中轴线视角"],
      play: "官方规定自验票起参观不超过40分钟；禁止携带包、液体、食品、充电宝、自拍杆等，须先到北侧存包处寄存。",
      booking: {
        kind: "urgent", days: 7, time: null, channel: "天安门城楼参观预约官网 / 公众号 / 京通小程序",
        miniProgram: "天安门城楼参观预约", url: "https://www.tiananmenchenglou.com/index?userType=1",
        rule: "实名预约次日起7日内门票，无当日票和现场售票；国庆开放安排与具体票种以官方页面为准。"
      },
      images: gallery("tiananmen-rostrum")
    },
    {
      id: "mao-memorial",
      name: "毛主席纪念堂",
      category: "博物馆",
      district: "东城区",
      zone: "中轴线",
      address: "天安门广场南侧",
      duration: 60,
      priceLabel: "免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["红色文化", "实名预约", "上午开放"],
      environment: "indoor",
      summary: "位于天安门广场中轴线上，以瞻仰厅和革命业绩纪念室为核心，参观秩序和携带物品限制严格。",
      highlights: ["瞻仰厅", "北大厅", "南大厅", "革命业绩纪念室"],
      play: "常规开放为周二至周日上午8:00—12:00；建议与天安门广场组合，但不能安排在下午，并预留安检排队时间。",
      booking: {
        kind: "urgent", days: 6, time: null, channel: "毛主席纪念堂公众号 / 预约小程序 / 人民网专题页",
        miniProgram: "毛主席纪念堂", url: "https://jnt.mfu.com.cn/page/",
        rule: "免费实名预约，提前1—6日办理；法定节假日和纪念日开放时间以官方临时公告为准。"
      },
      images: gallery("mao-memorial")
    },
    {
      id: "confucius-guozijian",
      name: "孔庙和国子监博物馆",
      category: "古都",
      district: "东城区",
      zone: "东北城",
      address: "国子监街15号",
      duration: 150,
      priceLabel: "成人 ¥30",
      prices: { adult: 30, youth: 0, child: 0, senior: 0 },
      tags: ["孔庙", "古代教育", "科举文化"],
      environment: "mixed",
      summary: "由北京孔庙和国子监组成，是理解元明清国家祭孔、最高学府和科举制度的重要建筑群。",
      highlights: ["辟雍", "大成殿", "进士题名碑", "琉璃牌坊"],
      play: "适合与雍和宫组成半日路线；建筑和碑刻信息密度高，建议预留讲解或语音导览时间。",
      booking: {
        kind: "urgent", days: 3, time: null, channel: "孔庙和国子监博物馆微信公众号",
        miniProgram: "孔庙和国子监博物馆", url: "https://kmgzj.hdwbcloud.com/choose_date?stack-key=d406eaab",
        rule: "实名预约当前开放的3日内时段，预约成功后按官方页面要求购票入馆；周一常规闭馆。"
      },
      images: gallery("confucius-guozijian")
    },
    {
      id: "military-museum",
      name: "中国人民革命军事博物馆",
      category: "博物馆",
      district: "海淀区",
      zone: "西直门",
      address: "复兴路9号",
      duration: 240,
      priceLabel: "免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["军事装备", "革命历史", "亲子"],
      environment: "indoor",
      summary: "以中国军事历史和大型装备实物为主，展厅体量大，适合对飞机、坦克、舰船和兵器感兴趣的团队。",
      highlights: ["兵器陈列", "飞机与坦克", "革命战争陈列", "军事互动"],
      play: "至少按半天安排；暑期模式曾为8:30—17:00，国庆开放时间和公益讲解须以军博当期公告为准。",
      booking: {
        kind: "urgent", days: 8, time: null, channel: "中国人民革命军事博物馆微信公众号",
        miniProgram: "中国人民革命军事博物馆", url: "https://s.visitbeijing.com.cn/attraction/119065",
        rule: "全员实名免费预约，可预约8日内参观；军博未授权第三方售卖或代约门票。"
      },
      images: gallery("military-museum")
    },
    {
      id: "science-museum",
      name: "中国科学技术馆",
      category: "亲子",
      district: "朝阳区",
      zone: "北城",
      address: "北辰东路5号",
      duration: 300,
      priceLabel: "主展厅 ¥30",
      prices: { adult: 30, youth: 20, child: 0, senior: 0 },
      tags: ["互动科技", "儿童科学乐园", "特效影院"],
      environment: "indoor",
      summary: "大型互动科普场馆，主展厅、儿童科学乐园和特效影院分别售票，适合亲子与青少年团队。",
      highlights: ["华夏之光", "探索与发现", "科技与生活", "儿童科学乐园"],
      play: "主展厅建议4小时以上；3—8岁儿童可单独选择儿童科学乐园，上下午票不通用，影院须另选场次。",
      booking: {
        kind: "urgent", days: 7, time: "18:00", channel: "中国科学技术馆官网 / 官方公众号",
        miniProgram: "中国科学技术馆", url: "https://www.cstm.org.cn/ykfw/yygp/index.html",
        rule: "所有观众均须实名购票，最早于参观7日前18:00预订；主展厅、儿童乐园和特效影院分别购票。"
      },
      images: gallery("science-museum")
    },
    {
      id: "natural-history",
      name: "国家自然博物馆",
      category: "博物馆",
      district: "东城区",
      zone: "南城",
      address: "天桥南大街126号",
      duration: 210,
      priceLabel: "基本陈列免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["恐龙", "古生物", "自然科学"],
      environment: "indoor",
      summary: "以古生物、动物、植物和人类演化为主的自然史博物馆，恐龙与古生物展尤其适合亲子。",
      highlights: ["恐龙公园", "古生物", "动物世界", "人类演化"],
      play: "可与天坛或天桥一带组合，基本陈列建议3小时；4D电影、临展和教育活动按当日项目另行预约购票。",
      booking: {
        kind: "urgent", days: 3, time: "11:00", channel: "国家自然博物馆官网 / 微信公众号",
        miniProgram: "国家自然博物馆", url: "https://www.nnhm.org.cn/cgzx/cgxx/index.shtml",
        rule: "个人观众提前1—3日预约，每日11:00更新；周一常规闭馆，特展票价以官方页面为准。"
      },
      images: gallery("natural-history")
    },
    {
      id: "archaeology-museum",
      name: "中国考古博物馆",
      category: "博物馆",
      district: "朝阳区",
      zone: "北城",
      address: "国家体育场北路1号院1号楼南门",
      duration: 180,
      priceLabel: "免费",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["考古", "中华文明", "奥林匹克公园"],
      environment: "indoor",
      summary: "以考古出土文物和珍贵文献梳理中华文明起源与发展，位于奥林匹克公园核心区。",
      highlights: ["文明起源", "考古发现", "出土文物", "历史文献"],
      play: "适合与鸟巢、水立方组合；普通公众主要在周三至周日参观，周二的开放对象和国庆安排须复核。",
      booking: {
        kind: "urgent", days: 3, time: null, channel: "中国历史研究网 / 中国考古博物馆微信公众号",
        miniProgram: "中国考古博物馆", url: "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/tzxx/202309/t20230915_3260182.html",
        rule: "免费实名分时预约，个人观众提前3日办理；周一闭馆，节假日开闭馆以公告为准。"
      },
      images: gallery("archaeology-museum")
    },
    {
      id: "xiangshan",
      name: "香山公园",
      category: "园林",
      district: "海淀区",
      zone: "西郊",
      address: "香山买卖街40号",
      duration: 270,
      priceLabel: "旺季 ¥10",
      prices: { adult: 10, youth: 5, child: 0, senior: 0 },
      tags: ["皇家园林", "登山", "红叶"],
      environment: "outdoor",
      summary: "以山林、静宜园遗迹和革命纪念地构成的皇家园林，秋季红叶客流集中。",
      highlights: ["香炉峰", "双清别墅", "香山寺", "碧云寺"],
      play: "国庆通常早于红叶最佳期，但适合登山和园林游览；旺季6:00开园，徒步登顶应预留4—5小时。",
      booking: {
        kind: "advance", days: 1, time: null, channel: "畅游公园微信公众号 / 现场购票",
        miniProgram: "畅游公园", url: "https://www.xiangshan-park.cn/cn/",
        rule: "旺季公园票10元、含碧云寺联票15元；国庆客流较大，建议提前通过官方渠道购票并复核限流。"
      },
      images: gallery("xiangshan")
    },
    {
      id: "ming-tombs",
      name: "明十三陵",
      category: "古都",
      district: "昌平区",
      zone: "昌平",
      address: "十三陵镇天寿山麓",
      duration: 240,
      priceLabel: "单点 ¥30—¥60",
      prices: { adult: 60, youth: 30, child: 0, senior: 0 },
      tags: ["世界遗产", "皇家陵寝", "神道"],
      environment: "mixed",
      summary: "明代十三位皇帝陵墓群，开放区域分散，以定陵、长陵、昭陵和总神道为主要游览点。",
      highlights: ["定陵地宫", "长陵祾恩殿", "总神道石像生", "陵寝格局"],
      play: "各陵之间距离较远，建议选择定陵或长陵搭配总神道；公共交通换乘较多，自驾或包车更高效。",
      booking: {
        kind: "advance", days: 1, time: null, channel: "明十三陵景区官方渠道 / 昌平文旅集团小程序",
        miniProgram: "昌平文旅集团", url: "https://www.mingshisanling.com/page/ticket_notice.html",
        rule: "旺季定陵60元、长陵45元、昭陵30元、总神道30元；新开放陵寝可能实行预约讲解，须按具体景点购票。"
      },
      images: gallery("ming-tombs")
    },
    {
      id: "grand-canal-museum",
      name: "北京大运河博物馆",
      category: "博物馆",
      district: "通州区",
      zone: "通州",
      address: "绿心路1号院5号楼",
      duration: 210,
      priceLabel: "免费免预约",
      prices: { adult: 0, youth: 0, child: 0, senior: 0 },
      tags: ["大运河", "城市副中心", "新建筑"],
      environment: "indoor",
      summary: "首都博物馆东馆，以运河历史、漕运制度和沿线城市文化为核心，也是北京城市副中心代表性新建筑。",
      highlights: ["京华通惠运河展", "漕运历史", "运河风物", "运河之舟建筑"],
      play: "馆体较大，建议至少3小时；可与城市绿心森林公园、北京艺术中心组成通州文化半日或一日路线。",
      booking: {
        kind: "open", days: 0, time: null, channel: "持有效证件直接入馆",
        miniProgram: null, url: "https://www.bjwmb.gov.cn/yw/10051236.html",
        rule: "目前免费免预约，常规开放10:00—20:00、周一闭馆；临展、活动和节假日限流以官方公告为准。"
      },
      images: gallery("grand-canal-museum")
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

