(function () {
  window.RESTAURANTS.push(
    {
      id: "fuxian-mingjia", name: "福鲜名家（望京店）", tier: "mid", tierLabel: "¥¥", price: [100, 160],
      district: "朝阳区", zone: "东北城", address: "阜通西大街望京西园四区415号楼对面2层", style: "韩式老式炸鸡与热菜", foodTypes: ["other"],
      mealTypes: ["lunch", "dinner"], duration: 90,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "22:00"] },
      dishes: ["从前炸鸡", "明太鱼汤", "辣炒五花肉", "海鲜葱饼"], anchors: ["art-798", "olympic-park"],
      description: "望京韩餐，食贫道视频以老式整鸡和韩式热菜为主，适合多人分享。",
      constraint: "视频发布于2022年；地址和当前营业时间采用Trip.com门店页，价格按常见多人点单估算，临行仍须电话复核。",
      fact: { label: "Trip.com · 福鲜名家望京店", url: "https://us.trip.com/restaurant/china/beijing/detail/restaurant-33332488/" },
      video: { creator: "食贫道", bvid: "BV1oe4y1g7Ty", title: "脆皮薄如纸！藏在望京的老式炸鸡汁多肉嫩", url: "https://www.bilibili.com/video/BV1oe4y1g7Ty/" },
      social: { platform: "xiaohongshu", label: "小红书帖子与评论检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E7%A6%8F%E9%B2%9C%E5%90%8D%E5%AE%B6%E6%9C%9B%E4%BA%AC%E5%BA%97" }
    },
    {
      id: "mango-russian", name: "芒果俄式西餐厅（日坛店）", tier: "mid", tierLabel: "¥¥", price: [150, 260],
      district: "朝阳区", zone: "东城", address: "日坛北路6号", style: "俄式西餐与夜宵", foodTypes: ["other"],
      mealTypes: ["lunch", "dinner"], duration: 110,
      service: { lunch: ["11:00", "15:00"], dinner: ["17:00", "23:45"] },
      dishes: ["罐焖牛肉", "红菜汤", "俄式奶油烤杂拌", "蜂蜜蛋糕"], anchors: ["national-museum", "art-798"],
      description: "日坛公园北门附近的老牌俄式餐厅，夜间氛围和炭火烤肉是食贫道视频的主要体验。",
      constraint: "官方文旅页标注营业至次日02:00，自动行程仍只排到23:45前；演出、包间和夜间营业须临行确认。",
      fact: { label: "北京旅游网 · 芒果俄式西餐厅日坛店", url: "https://r.visitbeijing.or.kr/index.php/food/240" },
      video: { creator: "食贫道", bvid: "BV1QQ4y1677c", title: "罪恶之夜06｜最适合秋夜的俄式夜宵", url: "https://www.bilibili.com/video/BV1QQ4y1677c/" },
      social: { platform: "xiaohongshu", label: "小红书帖子与评论检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E8%8A%92%E6%9E%9C%E4%BF%84%E5%BC%8F%E8%A5%BF%E9%A4%90%E5%8E%85%E6%97%A5%E5%9D%9B%E5%BA%97" }
    },
    {
      id: "duyichu", name: "都一处烧麦馆（前门店）", tier: "budget", tierLabel: "¥", price: [55, 90],
      district: "东城区", zone: "中轴线", address: "前门大街38号", style: "中华老字号烧麦", foodTypes: ["beijing-snacks"],
      mealTypes: ["lunch", "dinner"], duration: 70,
      service: { lunch: ["10:30", "14:30"], dinner: ["16:30", "20:30"] },
      dishes: ["三鲜烧麦", "羊肉大葱烧麦", "炸三角", "乾隆白菜"], anchors: ["tiananmen", "national-museum", "temple-heaven"],
      description: "始建于1738年的前门老字号，烧麦制作技艺列入国家级非物质文化遗产名录。",
      constraint: "北京旅游网资料页未提供当前营业时间；页面排程采用保守时段，国庆必须在门店或地图平台复核。",
      fact: { label: "北京旅游网 · 都一处烧麦馆前门店", url: "https://s.visitbeijing.com.cn/food/30" },
      social: { platform: "xiaohongshu", label: "小红书帖子与评论检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E9%83%BD%E4%B8%80%E5%A4%84%E7%83%A7%E9%BA%A6%E9%A6%86%E5%89%8D%E9%97%A8%E5%BA%97" }
    },
    {
      id: "jubaoyuan", name: "聚宝源（牛街总店）", tier: "mid", tierLabel: "¥¥", price: [108, 160],
      district: "西城区", zone: "南城", address: "牛街西里商业1号楼5-2号", style: "清真铜锅涮肉", foodTypes: ["shuan-yangrou"],
      mealTypes: ["lunch", "dinner"], duration: 100,
      service: { lunch: ["11:00", "15:00"], dinner: ["16:30", "22:00"] },
      dishes: ["手切鲜羊肉", "高钙羊肉", "芝麻烧饼", "麻豆腐"], anchors: ["tiananmen", "temple-heaven", "beihai"],
      description: "牛街代表性铜锅涮肉，羊肉、麻酱小料与芝麻烧饼构成完整的北京涮肉体验。",
      constraint: "北京旅游网提示饭点常需长时间等位；国庆不建议把它安排在紧邻预约景点之前。",
      fact: { label: "北京旅游网 · 牛街聚宝源", url: "https://www.visitbeijing.com.cn/article/47QqC5004y3" },
      social: { platform: "xiaohongshu", label: "小红书帖子与评论检索（登录后查看）", url: "https://www.xiaohongshu.com/search_result?keyword=%E8%81%9A%E5%AE%9D%E6%BA%90%E7%89%9B%E8%A1%97%E6%80%BB%E5%BA%97" },
      references: [
        { type: "video", label: "哔哩哔哩探店 · Pure耐耐", title: "探店聚宝源铜锅涮肉", url: "https://www.bilibili.com/video/BV15A411t7Te/" },
        { type: "video", label: "哔哩哔哩探店 · 食物练", title: "北京老字号聚宝源的铜锅涮肉味道如何", url: "https://www.bilibili.com/video/BV11J411v7em/" }
      ]
    }
  );
})();
