(function () {
  const attractionImages = {
  "palace-museum": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20pano.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Corner%20Tower%20of%20Forbidden%20City%20(20240627).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forbidden%20City%20Panorama%2C%20Beijing%20-%20panoramio.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Forbidden%20City%20Panorama%201.jpg?width=1200"
  ],
  "tiananmen": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20-Tiananmen%20Square%202016%20pic04.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20-Tiananmen%20Square%202016%20pic09.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20China%20Tiananmen-Square-01.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20China%20Tiananmen-Square-02.jpg?width=1200"
  ],
  "national-museum": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20200110%20National%20Museum%20of%20China-1.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20200110%20National%20Museum%20of%20China-2.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20200110%20National%20Museum%20of%20China-3.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20200110%20National%20Museum%20of%20China-4.jpg?width=1200"
  ],
  "jingshan": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Forbidden%20City%20Viewed%20from%20Jingshan%20Park%20(10553754905).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Jingshan%20Park%20Pavilion%20(10553761515).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Jingshan%20Park%20Pavilion%20(10553770266).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Jingshan%20Park%20View%20of%201991%20Skyline%20(10553984093).jpg?width=1200"
  ],
  "temple-heaven": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20200110%20Temple%20of%20Heaven-1.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%2C%20Tiantan%2C%20Imperial%20Vault%20of%20Heaven%20WLF%202023.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Temple%20of%20Heaven%2C%20Beijing%2C%20China%20(26434809999).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Temple%20of%20Heaven%2C%20Beijing%2C%20China%20(36243505613).jpg?width=1200"
  ],
  "summer-palace": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20090530%20Beijing%20Summer%20Palace%208467.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/A%20girl%20in%20traditional%20Chinese%20dress%20at%20the%20Summer%20Palace%2C%20Beijing.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing-1978%20Lake%20Summer%20Palace%20Paul%20Burns.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20China%20Summer-Palace-01.jpg?width=1200"
  ],
  "yuanmingyuan": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/20090731%20Remains%20of%20the%20Old%20Summer%20Palace%2002.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/A%20male%20mandarin%20duck%20in%20the%20Yuanmingyuan%20Wetland%20in%20Beijing%20in%20March%202024.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Belvedere%20of%20the%20God%20of%20Literature%2C%20Summer%20Palace%2C%20Beijing%2C%206%E2%80%9318%20October%2C%201860.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/East%20Gate%20of%20Yuanmingyuan%20Park%20(20250426175242).jpg?width=1200"
  ],
  "beihai": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beihai%20Park%20Br%C3%BCcke-20110104-RM-105624.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beihai%20Park%20Br%C3%BCcke-20110104-RM-110001.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beihai%20Park%20Kunming%20Lake%20Winter-20110104-RM-140211.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beihai%20Park%20Tempel-20110104-RM-114911.jpg?width=1200"
  ],
  "prince-gong": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2014.08.17.154735%20Dingfu%20Jie%20Prince%20Gong's%20Mansion%20Beijing.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2014.08.17.154948%20Entrance%20Prince%20Gong's%20Mansion%20Beijing.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2014.08.17.155256%20Prince%20Gong's%20Mansion%20Beijing.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2014.08.17.160013%20Prince%20Gong's%20Mansion%20Beijing.jpg?width=1200"
  ],
  "lama-temple": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing-Lamakloster%20Yonghe-22-Hof2-Opfernde-gje.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing-Lamakloster%20Yonghe-30-Guide-gje.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing-Lamakloster%20Yonghe-46-Betender-gje.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing-Lamakloster%20Yonghe-52-Hof3-Seerosen-gje.jpg?width=1200"
  ],
  "shichahai": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2016-09-11%20Shichahai%20Beijing%20anagoria%2002.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2016-09-11%20Shichahai%20Beijing%20anagoria%2010.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2016-09-11%20Shichahai%20Beijing%20anagoria%2015.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2016-09-11%20Shichahai%20Beijing%20anagoria%2016.jpg?width=1200"
  ],
  "badaling": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Badalingchangcheng%20railway%20station%20building.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boarding%20channel%20of%20Badaling%20Great%20Wall%20Railway%20Station%20(20220109163307).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boarding%20escalator%20entrance%20of%20Badaling%20Great%20Wall%20Railway%20Station%20(20220109162828).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boarding%20faregates%20of%20Badaling%20Great%20Wall%20Railway%20Station%20(20220109162527).jpg?width=1200"
  ],
  "mutianyu": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/66954-The-Great-Wall%2C%20Mutianyu.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/67016-The-Great-Wall%2C%20Mutianyu.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/67052-The-Great-Wall%2C%20Mutianyu.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/67054-The-Great-Wall%2C%20Mutianyu.jpg?width=1200"
  ],
  "beijing-zoo": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ailuropoda%20melanoleuca%20-%20Beijing%20Zoo.JPG?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Zoo%20Giant%20Panda%20(9870661185).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Zoo%20Giant%20Panda%20(9870667604).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Zoo%20Giant%20Panda%20(9870667704).jpg?width=1200"
  ],
  "art-798": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/798%20Art%20District%20banner.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/798%20Art%20District%20beijing%20inside%20of%20a%20gallery.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/798%20Art%20Zone%20-%20panoramio%20(1).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20-%20Art%20789%20Zone%20-%20Mariage%20picture.jpg?width=1200"
  ],
  "olympic-park": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/%22Bird%20nest%22%20-%20Olympic%20Stadium%2C%20Beijing%2C%20China%20-%20panoramio.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%2C%20Birds%20Nest%20-%20National%20Stadium%20-%20panoramio.jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%2C%20Birds%20Nest%20-%20National%20Stadium%20-%20panoramio%20(1).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/Beijing%20Bird%20nest.jpg?width=1200"
  ],
  "universal": [
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/2633126%20at%20Universal%20Resort%2C%20Universal%20Blvd%20(20210826122908).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/5727621%20at%20Universal%20Resort%2C%20Universal%20Blvd%20(20210826122713).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/5727621%20at%20Universal%20Resort%2C%20Universal%20Blvd%20(20210826122714).jpg?width=1200",
    "https://commons.wikimedia.org/wiki/Special:Redirect/file/5735448%20at%20Universal%20Resort%2C%20Universal%20Blvd%20(20210826122124).jpg?width=1200"
  ]
};
  window.ATTRACTIONS?.forEach((item) => {
    if (attractionImages[item.id]) item.images = attractionImages[item.id];
  });
  window.RESTAURANT_IMAGE_URLS = {
  "yin-san": [
    "https://i2.hdslb.com/bfs/archive/ccc7580fddbf4fffadf27a22c2ac0cde16ec1201.jpg",
    "https://ak-d.tripcdn.com/images/1mi5q12000fzxo68080D2.jpg?proc=source%2Ftrip"
  ],
  "menkuang": [
    "https://i1.hdslb.com/bfs/archive/65a5d5b2a58fc2129ddfc8cfdd1eae1739170bd2.jpg",
    "https://i0.hdslb.com/bfs/archive/58f2b990ba1c90fed7354d907a78ed18a0909385.jpg"
  ],
  "duyichu": [
    "https://i2.hdslb.com/bfs/archive/496467aae395e3a4f04012fa0d1a2d3c9dfab5c1.jpg",
    "https://i2.hdslb.com/bfs/archive/7a119d711cac9244a76fdd0f3759256659cc1c3e.jpg"
  ],
  "huguosi": [
    "https://i0.hdslb.com/bfs/archive/0a84478ffd979d2175d096b96cd8d15b524aa899.jpg",
    "https://i1.hdslb.com/bfs/archive/48c7ee06fc43edc4a6e21fc7e8d14bb3f136c8f4.jpg"
  ],
  "liu-ji": [
    "https://i0.hdslb.com/bfs/archive/01499c3c29be1f0f60f53c02d3554ad286a26b4a.jpg",
    "https://i1.hdslb.com/bfs/archive/2f7e1666464cce6a880834d7f5fac2b1eb5079cc.jpg"
  ],
  "siji-minfu": [
    "https://i1.hdslb.com/bfs/archive/aaaed6d339a3d07dc14214cf7792380f8bae9f97.jpg",
    "https://i2.hdslb.com/bfs/archive/0df1e4ef04b96156bd265e4ed73f653bbb25d201.jpg"
  ],
  "nanmen": [
    "https://i2.hdslb.com/bfs/archive/4a2b8b404c447baf0caf066190b41787059d4f09.jpg",
    "https://i2.hdslb.com/bfs/archive/57251f04bc2ce9403b0a26ad6065458a49702192.jpg"
  ],
  "tingli": [
    "https://i0.hdslb.com/bfs/archive/0b0987768c42c2c96dc4f310051c0f615893bec2.jpg",
    "https://r1.visitbeijing.com.cn/vbj-korean/2021/1118/3e30cde8f0621b6f4fd5f351edbe5544.png"
  ],
  "dadong": [
    "https://i2.hdslb.com/bfs/archive/ac13213d25869ca349c9b53a1002d991817df851.jpg",
    "https://danielfooddiary.com/wp-content/uploads/2018/05/dadongduck3.jpg"
  ],
  "trb": [
    "https://i0.hdslb.com/bfs/archive/e4d3d399c10d741f8e170ddb5e0a99f5477f88f9.jpg",
    "https://oss-rs.visitbeijing.com.cn/imageDir/80706883de43c90618e629b9d1a710b8.png"
  ],
  "three-broomsticks": [
    "https://i0.hdslb.com/bfs/archive/4afd23de04208ec5d191e4bc9ed324716892c3c0.jpg",
    "https://i2.hdslb.com/bfs/archive/73cf16b44116a6846f9ef44cafc2bdd1ab2950b8.jpg"
  ],
  "commune-kitchen": [
    "https://i1.hdslb.com/bfs/archive/9ab2b77acbbd98f4f50f6e6f3b03d1ecab511e09.jpg",
    "https://i0.hdslb.com/bfs/archive/f2823191c17949b54f32771b5c6969bf9b934ad4.jpg"
  ],
  "jiangniu": [
    "https://i1.hdslb.com/bfs/archive/d0f7edd56018f325babbeffd7264ef5acac1c97a.jpg",
    "https://i0.hdslb.com/bfs/archive/92fc3a980bd9a2e4c33806e50f07eda9ae8d5a17.jpg"
  ],
  "hong-0871": [
    "https://i0.hdslb.com/bfs/archive/da8dc882eb01aa7668d8fd4fe026f68505e4c288.jpg",
    "https://i1.hdslb.com/bfs/archive/aabec03f56531de7fcf1078a929cfa7edc5332d1.jpg"
  ],
  "charcoal": [
    "https://i0.hdslb.com/bfs/archive/b06272d3a56da0208d5320d4af08731636409c85.jpg",
    "https://i0.hdslb.com/bfs/archive/77d13941024de929af97b6a7e1096676831bc99f.jpg"
  ],
  "fresco": [
    "https://i1.hdslb.com/bfs/archive/664b9e82a2145f91081f9f64e694c570d9b592b9.jpg",
    "https://i1.hdslb.com/bfs/archive/4d85e396714c22abaf6f21f47e49d6b9d22bb30b.jpg"
  ],
  "xinrongji": [
    "https://i0.hdslb.com/bfs/archive/85fd1306dffb2b70f933f041e141e2e9617d24ba.jpg",
    "https://i2.hdslb.com/bfs/archive/8f24a785ef3852b20ac7470fac895939d748ac03.jpg"
  ],
  "turkish-feast": [
    "https://i2.hdslb.com/bfs/archive/d682e4553a87011cbaea32217720cc5eddcb094c.jpg",
    "https://i0.hdslb.com/bfs/archive/109fdeb0b73b9695ecfba5c3822e4e8a35072bdb.jpg"
  ],
  "jinghualou": [
    "https://i1.hdslb.com/bfs/archive/909f1303d9483e53160270f2b5942705d0a43b3f.jpg",
    "https://i2.hdslb.com/bfs/archive/0fe6bf3c17a7317bdfdeb67f8c5a021067250819.jpg"
  ],
  "wulixiang": [
    "https://i2.hdslb.com/bfs/archive/5d280782b0823eb432675f43b701c657b245b6f8.jpg",
    "https://i2.hdslb.com/bfs/archive/d9b03db79de346f5220818673b0dc2f0a5850a2b.jpg"
  ],
  "side-street": [
    "https://i1.hdslb.com/bfs/archive/8e719d3dfbc94309e07ddf1f0bd4f3672173a57e.jpg",
    "https://i2.hdslb.com/bfs/archive/5aa33a7a7b6c0aba07adc736ba642fd4be75ad9c.jpg"
  ],
  "ujigawa": [
    "https://i2.hdslb.com/bfs/archive/bc3955668856f4e1e0d73c40a0c0eb99e4172610.jpg",
    "https://i2.hdslb.com/bfs/archive/f587b47257a5664eeb46162f7e37208d1e3255b4.jpg"
  ],
  "qulangyuan": [
    "https://i0.hdslb.com/bfs/archive/eb5056db8d04bb11e0a38ea9d8a4edab5f1039e2.jpg",
    "https://www.wabisabiissue.com/files/resize/1280/00afe0e3d86fa42c34d897f12a5753b9.jpg"
  ],
  "bistro108": [
    "https://i0.hdslb.com/bfs/archive/9e877ac810305dc242a137738eeba2f16990f145.jpg",
    "https://www.oushinet.com/image/2023-04-08/thumb/1094410006172557312.jpg"
  ],
  "chaoshangchao": [
    "https://i1.hdslb.com/bfs/archive/94aecdcce4f0dc16bf2445aeb0c4ae55aaa36d00.jpg",
    "https://img-rs.huanqiucdn.cn/dp/api/files/imageDir/805be4370984793a7250383ac0b1f1d2.png"
  ],
  "xiding": [
    "https://i1.hdslb.com/bfs/archive/c9ee32d2ca2a930d73daf50ef461b553b70c24b3.jpg",
    "https://i0.hdslb.com/bfs/archive/9490717f6efaa1df97fabc87f0ed844d0b303d87.jpg"
  ],
  "feifu": [
    "https://i1.hdslb.com/bfs/archive/0e6f97837fa7511da7bbd2e942110ff1f9db4002.jpg",
    "https://i1.hdslb.com/bfs/archive/33e54dfff2985b024e11b60115ba43918b8fcfe5.jpg"
  ],
  "five-guys": [
    "https://i1.hdslb.com/bfs/archive/c0ad04bfd2c7e6e86702b294757e1a7ebea8257c.jpg",
    "https://dynl.mktgcdn.com/p/_cHZXE9XpwDMdnEtTaqssEBuvqIGYKHRpWyIksydSjY/600x356.png"
  ],
  "yisitan": [
    "https://i1.hdslb.com/bfs/archive/2b7e49019238d6c5e551c814f4e3bf5c88b9a563.jpg",
    "https://i2.hdslb.com/bfs/archive/56e0ec9b5b204799de6f7a6f1fe68be1adbbac82.jpg"
  ],
  "argentina-estate": [
    "https://i2.hdslb.com/bfs/archive/6a699d3e317e377ac77cba1dbffae962fc4b7690.jpg",
    "https://i1.hdslb.com/bfs/archive/555b9862b09d08e65cae226e435b8e4c67ce8a61.jpg"
  ],
  "laofang-bbq": [
    "https://i2.hdslb.com/bfs/archive/b64268d26ee8d94890c25bd65a69ebc7f9de7d04.jpg",
    "https://i0.hdslb.com/bfs/archive/9e2dfe05553898f28e894353269f198a21a45717.jpg"
  ],
  "taipo": [
    "https://i0.hdslb.com/bfs/archive/f112e00ec410eb1180c9aaadc7a4e48233fbd058.jpg",
    "https://i1.hdslb.com/bfs/archive/4b870ad4b29558b343b905403346cb248a6243e1.jpg"
  ],
  "chaishi": [
    "https://i1.hdslb.com/bfs/archive/2b85c91a1832d1405f806e3c0bbcea8e2965a5c4.jpg",
    "https://i1.hdslb.com/bfs/archive/d40dde74c941b99788315ad9f14a023dcc2ea4f1.jpg"
  ],
  "huifeng": [
    "https://i1.hdslb.com/bfs/archive/29c8efbea6bc0d81c1fb1e8e14d4296bc9f214fc.jpg",
    "https://qcloud.dpfile.com/pc/RdgOoQZRMiJRJ2T3-m3IzWkbs4WTV-jQ_ixWoJC7lI73XErsVVN0DbGQszSKsvw_l0cm-Lf9tDMlLZpO7rb3bg.jpg"
  ],
  "maiden-tower": [
    "https://i1.hdslb.com/bfs/archive/a5e4c723b964d020dceb4db5a3fbc6e924ae0afe.jpg",
    "https://japanese.beijing.gov.cn/specials/musteatmeals/exoticrestaurants/202411/W020241106554265119612.jpg"
  ],
  "xiaojie-zhushou": [
    "https://i2.hdslb.com/bfs/archive/f70d4407149ee1d32e2494cf86a52303a2e390d8.jpg",
    "https://i2.hdslb.com/bfs/archive/875a525ec3d6a99b41ab688f35d6e5be572675e5.jpg"
  ],
  "xiangchangxiang": [
    "https://i2.hdslb.com/bfs/archive/3161f38598f3f0a5f3158bf4b9037f43bc20c052.jpg",
    "https://dimg04.c-ctrip.com/images/1mh5f12000ais3tdf7AAD_W_640_10000.jpg?proc=autoorient"
  ],
  "mai-thai": [
    "https://ak-d.tripcdn.com/images/0103t120009gg6p8c9B93_D_750_520_Q90.jpg?proc=autoorient",
    "https://ak-d.tripcdn.com/images/0104w120009tyxzog785A_D_750_520_Q90.jpg?proc=autoorient"
  ],
  "taco-bar": [
    "https://i0.hdslb.com/bfs/archive/8f93c47c6d7730265fa759893c69fc818612481c.jpg",
    "https://i2.hdslb.com/bfs/archive/440de86ddf7e087a98fe2f606c649a49536e9e29.jpg"
  ]
};
})();
