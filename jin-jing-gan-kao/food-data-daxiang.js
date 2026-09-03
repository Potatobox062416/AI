(function () {
  window.RESTAURANTS.push(
    {
      id: "jiangniu", name: "匠牛饺子·酱牛肉（顺源街店）", tier: "budget", tierLabel: "¥", price: [50, 85],
      district: "朝阳区", zone: "东北城", address: "顺源街5号", style: "手工饺子与酱牛肉", mealTypes: ["lunch", "dinner"], duration: 65,
      service: { lunch: ["11:00", "15:00"], dinner: ["16:00", "23:00"] }, dishes: ["牛肉胡萝卜饺子", "牛肉大葱饺子", "酱牛肉", "金钱腱"], anchors: ["lama-temple", "art-798"],
      description: "价位亲民，适合三元桥、亮马桥一带的午晚餐。", constraint: "UP主重点肯定酱牛肉和服务，也说明不必专程远途前往。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/1/17602877.html" }, video: { creator: "大祥哥来了", bvid: "BV1Sx4y1b76U", title: "餐饮界的胖东来？最后竟然给我吃哭了", url: "https://www.bilibili.com/video/BV1Sx4y1b76U/" }
    },
    {
      id: "hong-0871", name: "泓0871臻选云南菜", tier: "mid", tierLabel: "¥¥", price: [220, 320],
      district: "朝阳区", zone: "东城", address: "双树路E9文化创意园6栋", style: "精致云南菜", mealTypes: ["lunch", "dinner"], duration: 100,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "21:00"] }, dishes: ["招牌破酥包", "腾冲土锅子", "金钱火腿配乳扇", "永平黄焖鸡"], anchors: ["universal"],
      description: "云南地域食材和现代摆盘结合，适合东部方向行程。", constraint: "视频认为空运菌菇、火腿溢价较高，并不推荐当次小烧烤。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/21562542.html" }, video: { creator: "大祥哥来了", bvid: "BV1aS411w7dj", title: "我儿子真会找餐厅，结账时又傻眼了", url: "https://www.bilibili.com/video/BV1aS411w7dj/" }
    },
    {
      id: "charcoal", name: "CHARCOAL 煤球", tier: "premium", tierLabel: "¥¥¥", price: [350, 520],
      district: "朝阳区", zone: "东北城", address: "幸福一村西里甲6号", style: "炭火全球融合菜", mealTypes: ["dinner"], duration: 120,
      service: { dinner: ["17:30", "22:30"] }, dishes: ["炭烤鱼", "牛骨髓罗勒炒饭", "黑蒜炸鸡", "炭烤花椰菜"], anchors: ["lama-temple", "art-798"],
      description: "工业风炭火料理，适合三里屯晚餐。", constraint: "周一闭店；视频高度评价烤鱼，但不推荐章鱼足。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/134200614-dianping.html" }, video: { creator: "大祥哥来了", bvid: "BV1zx4y1479k", title: "心中能排宇宙第一的烤鱼", url: "https://www.bilibili.com/video/BV1zx4y1479k/" }
    },
    {
      id: "fresco", name: "FRESCO翡酷牛排餐厅（东直门店）", tier: "premium", tierLabel: "¥¥¥", price: [550, 900],
      district: "朝阳区", zone: "东北城", address: "东直门外大街27号5层", style: "干式熟成牛排", mealTypes: ["lunch", "dinner"], duration: 120,
      service: { lunch: ["11:30", "14:00"], dinner: ["17:00", "22:00"] }, dishes: ["干式熟成牛排", "烤芦笋", "伊比利亚火腿", "海鲜饭"], anchors: ["lama-temple", "art-798"],
      description: "有露台和城市景观，更适合晚餐。", constraint: "牛排预算受部位和重量影响，午市时间需电话确认。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/1/22517735.html" }, video: { creator: "大祥哥来了", bvid: "BV12M4m127Rp", title: "干式熟成牛排什么味", url: "https://www.bilibili.com/video/BV12M4m127Rp/" }
    },
    {
      id: "xinrongji", name: "新荣记（新源南路店）", tier: "premium", tierLabel: "¥¥¥", price: [800, 1300],
      district: "朝阳区", zone: "东北城", address: "新源南路8号启皓北京东塔1层", style: "高端台州菜", mealTypes: ["lunch", "dinner"], duration: 140,
      service: { lunch: ["11:30", "14:00"], dinner: ["17:30", "21:00"] }, dishes: ["北京烤鸭", "黄金脆带鱼", "脆皮妙龄鸽", "沙蒜烧豆面"], anchors: ["lama-temple", "art-798"],
      description: "高预算体验型中餐，视频重点为烤鸭。", constraint: "高价黄鱼、海鲜和酒水会令实际人均远超区间，须预约。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/78510618.html" }, video: { creator: "大祥哥来了", bvid: "BV1U1421x7hu", title: "北京烤鸭做得最好吃的竟然是新荣记", url: "https://www.bilibili.com/video/BV1U1421x7hu/" }
    },
    {
      id: "turkish-feast", name: "西庭·秀色 Turkish Feast", tier: "mid", tierLabel: "¥¥", price: [160, 260],
      district: "朝阳区", zone: "东北城", address: "新东路金尚源SHANG大厦1层", style: "土耳其料理", mealTypes: ["lunch", "dinner"], duration: 100,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "24:00"] }, dishes: ["奥斯曼羊腿", "土耳其羊肉串", "烤肉拼盘", "鹰嘴豆泥"], anchors: ["lama-temple", "art-798"],
      description: "烤肉、蘸酱和异域环境是核心体验。", constraint: "现场演出、露台座位及国庆营业需预约时确认。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/78700240.html" }, video: { creator: "大祥哥来了", bvid: "BV196421f7VK", title: "没去过土耳其，但这家餐厅好像很正宗", url: "https://www.bilibili.com/video/BV196421f7VK/" }
    },
    {
      id: "jinghualou", name: "京华楼饭庄（亚运村店）", tier: "mid", tierLabel: "¥¥", price: [240, 360],
      district: "朝阳区", zone: "北城", address: "慧忠北里111号楼2层", style: "京鲁功夫菜", mealTypes: ["lunch", "dinner"], duration: 110,
      service: { lunch: ["10:30", "14:30"], dinner: ["16:30", "21:00"] }, dishes: ["油爆双脆", "蟹黄芙蓉鸡片", "砂锅炉肉丸子", "干烧大黄鱼"], anchors: ["olympic-park"],
      description: "菜量较大，适合4—6人共享并衔接鸟巢行程。", constraint: "UP主认可技法，但对口味和当次卫生体验有保留，不能写成无条件推荐。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/136367940-dianping181173430.html" }, video: { creator: "大祥哥来了", bvid: "BV1yypsebEMn", title: "正宗宫廷菜还真有点吃不明白", url: "https://www.bilibili.com/video/BV1yypsebEMn/" }
    },
    {
      id: "wulixiang", name: "屋里厢上海菜馆（盈科店）", tier: "premium", tierLabel: "¥¥¥", price: [350, 520],
      district: "朝阳区", zone: "东北城", address: "工体北路甲2号盈科中心底商", style: "精致本帮菜", mealTypes: ["lunch", "dinner"], duration: 110,
      service: { lunch: ["11:00", "14:30"], dinner: ["17:00", "21:30"] }, dishes: ["熟醉罗氏虾", "本帮熏鱼", "百叶结红烧肉", "响油鳝丝"], anchors: ["lama-temple", "art-798"],
      description: "适合三里屯附近正式午晚餐。", constraint: "时令河鲜和蟹类价格会明显波动。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/143884/16574450.html" }, video: { creator: "大祥哥来了", bvid: "BV1patseKEPV", title: "教科书级别的熟醉罗氏虾", url: "https://www.bilibili.com/video/BV1patseKEPV/" }
    },
    {
      id: "side-street", name: "Side Street街旁（交道口店）", tier: "mid", tierLabel: "¥¥", price: [80, 150],
      district: "东城区", zone: "东北城", address: "交道口东大街113-02号", style: "汉堡与精酿", mealTypes: ["lunch", "dinner"], duration: 80,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "22:00"] }, dishes: ["招牌汉堡", "提卡金鸡汉堡", "特制薯条", "火热亚洲蹲"], anchors: ["lama-temple", "shichahai"],
      description: "适合雍和宫、国子监或南锣鼓巷路线中的快速正餐。", constraint: "不同平台营业时间冲突，采用保守窗口；UP主不喜欢视频中的冠军特色款。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/21399063-dianping.html" }, video: { creator: "大祥哥来了", bvid: "BV1884seyEhX", title: "2024冠军汉堡到底什么味", url: "https://www.bilibili.com/video/BV1884seyEhX/" }
    },
    {
      id: "ujigawa", name: "宇治川·炉端烧（慈云寺店）", tier: "mid", tierLabel: "¥¥", price: [130, 220],
      district: "朝阳区", zone: "东城", address: "慈云寺东路住邦2000四号楼106号", style: "日式炉端烧", mealTypes: ["lunch", "dinner"], duration: 95,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "23:30"] }, dishes: ["烧鸟汁烤", "牛肉芦笋卷", "鳗鱼饭三吃", "盐烤青花鱼"], anchors: ["art-798", "universal"],
      description: "适合CBD东侧晚餐和小酌。", constraint: "近期仍有评价，但午晚市和国庆闭店时间应复核。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/17595732.html" }, video: { creator: "大祥哥来了", bvid: "BV1Vpp3eTEjT", title: "炭烤永远滴神", url: "https://www.bilibili.com/video/BV1Vpp3eTEjT/" }
    },
    {
      id: "qulangyuan", name: "曲廊院（东四十一条店）", tier: "premium", tierLabel: "¥¥¥", price: [800, 1200],
      district: "东城区", zone: "东北城", address: "东四十一条25号", style: "四合院创意融合菜", mealTypes: ["lunch", "dinner"], duration: 150,
      service: { lunch: ["11:30", "14:00"], dinner: ["17:30", "22:00"] }, dishes: ["季节品鉴菜单", "醉杨梅醉虾", "香榧和牛", "时令国产食材"], anchors: ["lama-temple", "shichahai"],
      description: "空间和季节套餐占比较高，应预留约2.5小时。", constraint: "菜单按季节变化；UP主对当次部分菜品有保留，须预约确认套餐。",
      fact: { label: "Trip.com门店资料", url: "https://sg.trip.com/moments/poi-qu-lang-yuan-31507315/" }, video: { creator: "大祥哥来了", bvid: "BV14i421v7Lu", title: "开在北京胡同中的米其林餐厅什么样", url: "https://www.bilibili.com/video/BV14i421v7Lu/" }
    },
    {
      id: "bistro108", name: "巴黎餐吧 Bistro108", tier: "mid", tierLabel: "¥¥", price: [160, 260],
      district: "朝阳区", zone: "东北城", address: "天泽路19号草场商业广场1层", style: "法式小酒馆", mealTypes: ["lunch", "dinner"], duration: 100,
      service: { lunch: ["11:30", "15:00"], dinner: ["17:00", "23:45"] }, dishes: ["海虹锅", "法式焗蜗牛", "油封鸭腿", "苹果派"], anchors: ["art-798", "lama-temple"],
      description: "使馆区氛围放松，营业较晚。", constraint: "UP主认为技法中规中矩，但认可酱汁、调味和环境。",
      fact: { label: "携程门店页", url: "https://gs.ctrip.com/html5/you/foods/fooddetail/1/15499967.html" }, video: { creator: "大祥哥来了", bvid: "BV1d82VYXEQn", title: "法式小酒馆尽显法式浪漫", url: "https://www.bilibili.com/video/BV1d82VYXEQn/" }
    },
    {
      id: "chaoshangchao", name: "潮上潮（正大店）", tier: "premium", tierLabel: "¥¥¥", price: [700, 1100],
      district: "朝阳区", zone: "东城", address: "金和东路20号正大中心北塔4层", style: "高端潮汕菜", mealTypes: ["lunch", "dinner"], duration: 140,
      service: { lunch: ["11:30", "14:00"], dinner: ["17:30", "21:30"] }, dishes: ["乳鸽", "卤水老鹅头", "潮式冻鱼饭", "花胶"], anchors: ["art-798"],
      description: "全包房、商务属性明显，适合高预算宴请。", constraint: "稀有花胶可令账单远超区间；视频标题中的68万元不是普通报价。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/beijing1/120825034-dianping.html" }, video: { creator: "大祥哥来了", bvid: "BV1W6SWYqEVp", title: "探店米其林三星潮上潮", url: "https://www.bilibili.com/video/BV1W6SWYqEVp/" }
    },
    {
      id: "xiding", name: "喜鼎海胆水饺（蓝色港湾店）", tier: "mid", tierLabel: "¥¥", price: [180, 300],
      district: "朝阳区", zone: "东城", address: "朝阳公园路6号院蓝色港湾1层", style: "大连海鲜与水饺", mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "21:00"] }, dishes: ["海胆水饺", "蟹香炒笨鸡蛋", "雪蜜腌大虾", "奇妙虾球"], anchors: ["art-798", "olympic-park"],
      description: "适合蓝色港湾路线，海胆水饺可少量体验。", constraint: "高峰可能长时间排队，建议提前取号。",
      fact: { label: "Apple Maps门店页", url: "https://maps.apple.com/place?_provider=57879&place-id=H2710I3F97FED1BB951" }, video: { creator: "大祥哥来了", bvid: "BV15H4y1F7qV", title: "据说曾排队五小时的海胆水饺", url: "https://www.bilibili.com/video/BV15H4y1F7qV/" }
    },
    {
      id: "feifu", name: "肥福排档（北京总店）", tier: "mid", tierLabel: "¥¥", price: [200, 330],
      district: "朝阳区", zone: "北城", address: "惠新东街4号国药集团广场3座2层", style: "岭南粤菜排档", mealTypes: ["lunch", "dinner"], duration: 105,
      service: { lunch: ["11:00", "14:00"], dinner: ["17:00", "24:00"] }, dishes: ["脆皮烧鹅", "菠萝包", "煲仔饭", "烧味拼盘"], anchors: ["olympic-park", "lama-temple"],
      description: "适合奥体一带多人粤菜晚餐。", constraint: "活海鲜价格波动大；UP主认为味道尚可但北京售价偏高。",
      fact: { label: "携程门店页", url: "https://you.ctrip.com/food/1/25045454.html" }, video: { creator: "大祥哥来了", bvid: "BV1J5AWeaEbw", title: "在北京吃粤菜飞机票都包含在餐费里了", url: "https://www.bilibili.com/video/BV1J5AWeaEbw/" }
    }
  );
})();
