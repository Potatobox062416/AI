(function () {
  window.BEIJING_FOOD_TYPES = [
    { id: "peking-duck", label: "北京烤鸭", note: "挂炉与焖炉是北京烤鸭的两条代表性流派，常配荷叶饼、葱丝和甜面酱。", url: "https://www.visitbeijing.com.cn/article/4JZQSao1SJm" },
    { id: "shuan-yangrou", label: "铜锅涮肉", note: "清水铜锅、手切羊肉、麻酱小料和烧饼构成典型的老北京涮肉体验。", url: "https://www.visitbeijing.com.cn/article/4JjSAZ9jC3j" },
    { id: "zhizi-kaorou", label: "炙子烤肉", note: "牛羊肉在炙子上现烤，烟火气强，通常更适合安排在晚餐。", url: "https://www.visitbeijing.com.cn/article/47QmRxqxigt" },
    { id: "zhajiangmian", label: "炸酱面", note: "以肉丁炸酱、面条和时令菜码为核心，是适合午餐的北京传统面食。", url: "https://www.visitbeijing.com.cn/article/4FrL1w246R7" },
    { id: "douzhi", label: "豆汁焦圈", note: "豆汁是发酵风味早餐，宜少量尝试并搭配焦圈和咸菜，不作为常规午餐。", url: "https://www.visitbeijing.com.cn/article/4JZQSao1SJm" },
    { id: "luzhu", label: "卤煮火烧", note: "火烧与小肠、肺头、炸豆腐同煮，是前门一带很有代表性的北京小吃。", url: "https://www.visitbeijing.com.cn/article/47QmRxlzl3z" },
    { id: "baodu", label: "爆肚", note: "牛羊肚按部位快速汆熟，讲究火候、脆嫩口感和麻酱调料。", url: "https://s.visitbeijing.com.cn/gallery/5667" },
    { id: "chaogan", label: "炒肝", note: "以猪肝、大肠、蒜和芡汁制成，传统吃法常配包子，优先安排在早餐。", url: "https://s.visitbeijing.com.cn/food/143" },
    { id: "beijing-snacks", label: "京味糕点", note: "驴打滚、艾窝窝、豌豆黄、糖耳朵等适合作为加餐或伴手礼。", url: "https://www.visitbeijing.com.cn/article/47QmS0QCgeS" },
    { id: "beijing-cuisine", label: "京鲁与宫廷菜", note: "砂锅、京鲁菜和宫廷菜适合多人正餐，菜量与预算通常高于单份小吃。", url: "https://www.visitbeijing.com.cn/article/4JjSAZ9jC3j" },
    { id: "other", label: "其他菜系", note: "北京也汇聚各地和各国餐馆，可用于调剂口味，不计入传统北京名吃。", url: null }
  ];

  window.RESTAURANTS.push(
    {
      id: "menkuang", name: "门框胡同百年卤煮（前门店）", tier: "budget", tierLabel: "¥", price: [35, 55],
      district: "西城区", zone: "中轴线", address: "门框胡同19号", style: "老北京卤煮火烧", foodTypes: ["luzhu"],
      mealTypes: ["lunch", "dinner"], duration: 55,
      service: { lunch: ["10:30", "15:30"], dinner: ["17:00", "21:30"] },
      dishes: ["卤煮火烧", "炸灌肠", "麻豆腐", "炸咯吱"], anchors: ["tiananmen", "palace-museum", "national-museum"],
      description: "前门胡同里的北京传统小吃，适合天安门、前门或故宫南线游览后的快速正餐。",
      constraint: "内脏风味较重；国庆饭点空间拥挤，建议错峰。人均和营业时间为公开资料参考，临行仍须复核。",
      fact: { label: "北京旅游网 · 门框胡同百年卤煮", url: "https://lyzz.visitbeijing.com.cn/news/detail?id=24084" },
      social: { platform: "xiaohongshu", label: "小红书站内口碑检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E9%97%A8%E6%A1%86%E8%83%A1%E5%90%8C%E7%99%BE%E5%B9%B4%E5%8D%A4%E7%85%AE" }
    },
    {
      id: "fangzhuan", name: "方砖厂69号炸酱面（方砖厂胡同店）", tier: "budget", tierLabel: "¥", price: [25, 35],
      district: "东城区", zone: "东北城", address: "方砖厂胡同1号", style: "老北京炸酱面", foodTypes: ["zhajiangmian"],
      mealTypes: ["lunch", "dinner"], duration: 50,
      service: { lunch: ["10:00", "15:30"], dinner: ["17:00", "19:00"] },
      dishes: ["老北京炸酱面", "时令菜码", "腊八蒜"], anchors: ["shichahai", "lama-temple", "confucius-guozijian"],
      description: "主打单一炸酱面，菜码和酱可按现场规则搭配，适合南锣鼓巷、鼓楼与国子监一带午餐。",
      constraint: "店面小且常排队；晚市结束较早，计划中优先作为午餐，临行复核当日营业。",
      fact: { label: "北京旅游网 · 方砖厂69号炸酱面", url: "https://www.visitbeijing.com.cn/article/4FrL1w246R7" },
      social: { platform: "xiaohongshu", label: "小红书站内口碑检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E6%96%B9%E7%A0%96%E5%8E%8269%E5%8F%B7%E7%82%B8%E9%85%B1%E9%9D%A2" }
    },
    {
      id: "yaoji", name: "姚记炒肝店（鼓楼店）", tier: "budget", tierLabel: "¥", price: [25, 40],
      district: "东城区", zone: "什刹海", address: "鼓楼东大街311号", style: "老北京炒肝早餐", foodTypes: ["chaogan"],
      mealTypes: ["breakfast"], duration: 40,
      service: { breakfast: ["06:00", "10:30"] },
      dishes: ["炒肝", "猪肉大葱包子", "杏仁豆腐"], anchors: ["shichahai", "beihai", "lama-temple"],
      description: "炒肝与包子是典型北京早餐组合，适合鼓楼、什刹海清晨路线。",
      constraint: "只在计划中作为早餐候选，不安排为午饭或晚饭；全天营业信息不等于全天都适合作为早餐体验。",
      fact: { label: "北京旅游网 · 姚记炒肝鼓楼店", url: "https://s.visitbeijing.com.cn/food/143" },
      social: { platform: "xiaohongshu", label: "小红书站内口碑检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E5%A7%9A%E8%AE%B0%E7%82%92%E8%82%9D%E9%BC%93%E6%A5%BC%E5%BA%97" }
    },
    {
      id: "baodufeng", name: "爆肚冯（前门店）", tier: "budget", tierLabel: "¥", price: [45, 70],
      district: "西城区", zone: "中轴线", address: "廊房二条56号", style: "清真老北京爆肚", foodTypes: ["baodu"],
      mealTypes: ["lunch", "dinner"], duration: 60,
      service: { lunch: ["10:30", "15:30"], dinner: ["17:00", "21:30"] },
      dishes: ["爆肚仁三品", "牛百叶", "羊肚领", "烧饼"], anchors: ["tiananmen", "national-museum", "temple-heaven"],
      description: "创自清光绪年间的老字号，爆肚按部位和火候区分，适合前门与大栅栏路线。",
      constraint: "不同部位口感差异明显；国庆饭点排队，人均按公开资料与常见加点范围估算。",
      fact: { label: "北京旅游网 · 爆肚冯前门店", url: "https://s.visitbeijing.com.cn/food/229" },
      social: { platform: "xiaohongshu", label: "小红书站内口碑检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E7%88%86%E8%82%9A%E5%86%AF%E5%89%8D%E9%97%A8%E5%BA%97" }
    },
    {
      id: "huguosi", name: "护国寺小吃总店", tier: "budget", tierLabel: "¥", price: [15, 35],
      district: "西城区", zone: "什刹海", address: "护国寺大街93号", style: "老北京小吃集合", foodTypes: ["beijing-snacks", "douzhi"],
      mealTypes: ["breakfast"], duration: 45,
      service: { breakfast: ["06:30", "10:30"] },
      dishes: ["驴打滚", "艾窝窝", "豌豆黄", "豆汁焦圈"], anchors: ["beihai", "prince-gong", "shichahai"],
      description: "一次可认识多种京味甜咸小吃，适合什刹海、恭王府或护国寺街清晨路线。",
      constraint: "站点只把总店列为早餐或加餐参考，不替代午餐正餐；公开营业时间为6:30—20:00，具体供应与排队须临行复核。",
      fact: { label: "北京旅游网 · 护国寺小吃总店", url: "https://s.visitbeijing.com.cn/food/68" },
      social: { platform: "xiaohongshu", label: "小红书站内口碑检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E6%8A%A4%E5%9B%BD%E5%AF%BA%E5%B0%8F%E5%90%83%E6%80%BB%E5%BA%97" }
    }
  );
})();
