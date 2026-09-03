(function () {
  const attractionImages = {
  "palace-museum": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Beijing_pano.jpg/1280px-Beijing_pano.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Corner_Tower_of_Forbidden_City_%2820240627%29.jpg/1280px-Corner_Tower_of_Forbidden_City_%2820240627%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Forbidden_City_Panorama%2C_Beijing_-_panoramio.jpg/1280px-Forbidden_City_Panorama%2C_Beijing_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Forbidden_City_Panorama_1.jpg/1280px-Forbidden_City_Panorama_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "tiananmen": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Beijing_-Tiananmen_Square_2016_pic04.jpg/1280px-Beijing_-Tiananmen_Square_2016_pic04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Beijing_China_Tiananmen-Square-01.jpg/1280px-Beijing_China_Tiananmen-Square-01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Beijing_China_Tiananmen-Square-02.jpg/1280px-Beijing_China_Tiananmen-Square-02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Beijing_China_Tiananmen-Square-03.jpg/1280px-Beijing_China_Tiananmen-Square-03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "national-museum": [
    "https://upload.wikimedia.org/wikipedia/commons/5/59/20200110_National_Museum_of_China-1.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/20200110_National_Museum_of_China-2.jpg/1280px-20200110_National_Museum_of_China-2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/20200110_National_Museum_of_China-3.jpg/1280px-20200110_National_Museum_of_China-3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/20200110_National_Museum_of_China-4.jpg/1280px-20200110_National_Museum_of_China-4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "jingshan": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Beijing_Forbidden_City_Viewed_from_Jingshan_Park_%2810553754905%29.jpg/1280px-Beijing_Forbidden_City_Viewed_from_Jingshan_Park_%2810553754905%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Beijing_Jingshan_Park_Pavilion_%2810553761515%29.jpg/1280px-Beijing_Jingshan_Park_Pavilion_%2810553761515%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Beijing_Jingshan_Park_Pavilion_%2810553770266%29.jpg/1280px-Beijing_Jingshan_Park_Pavilion_%2810553770266%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Beijing_Jingshan_Park_View_of_1991_Skyline_%2810553984093%29.jpg/1280px-Beijing_Jingshan_Park_View_of_1991_Skyline_%2810553984093%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "temple-heaven": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/20200110_Temple_of_Heaven-1.jpg/1280px-20200110_Temple_of_Heaven-1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Beijing%2C_Tiantan%2C_Imperial_Vault_of_Heaven_WLF_2023.jpg/1280px-Beijing%2C_Tiantan%2C_Imperial_Vault_of_Heaven_WLF_2023.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/5/55/Temple_of_Heaven%2C_Beijing%2C_China_%2826434809999%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://upload.wikimedia.org/wikipedia/commons/3/35/Temple_of_Heaven%2C_Beijing%2C_China_%2836243505613%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
  ],
  "summer-palace": [
    "https://upload.wikimedia.org/wikipedia/commons/f/fb/20090530_Beijing_Summer_Palace_8467.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/A_girl_in_traditional_Chinese_dress_at_the_Summer_Palace%2C_Beijing.jpg/1280px-A_girl_in_traditional_Chinese_dress_at_the_Summer_Palace%2C_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Beijing-1978_Lake_Summer_Palace_Paul_Burns.jpg/1280px-Beijing-1978_Lake_Summer_Palace_Paul_Burns.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Beijing_China_Summer-Palace-01.jpg/1280px-Beijing_China_Summer-Palace-01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "yuanmingyuan": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/20090731_Remains_of_the_Old_Summer_Palace_02.jpg/1280px-20090731_Remains_of_the_Old_Summer_Palace_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://newbbs-fd.zol-img.com.cn/t_s800x2000/g8/M00/02/0B/ChMkLWlskLKIE46DAATRzj0v0-YAAHLTwMz7yUABNHm793.jpg",
    "https://p1.ssl.qhimg.com/t01b6b3c100c39385bf.jpg",
    "https://youimg1.c-ctrip.com/target/100q0x000000lfjon24FD_D_10000_1200.jpg?proc=autoorient"
  ],
  "beihai": [
    "https://d2mgzmtdeipcjp.cloudfront.net/files/good/2024/12/05/17333696006843.jpg?s=1360x1032",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Beihai_Park_Br%C3%BCcke-20110104-RM-110001.jpg/1280px-Beihai_Park_Br%C3%BCcke-20110104-RM-110001.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Beihai_Park_Kunming_Lake_Winter-20110104-RM-140211.jpg/1280px-Beihai_Park_Kunming_Lake_Winter-20110104-RM-140211.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Beihai_Park_Kunming_Lake_Winter-20110104-RM-140223.jpg/1280px-Beihai_Park_Kunming_Lake_Winter-20110104-RM-140223.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "prince-gong": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/2014.08.17.154735_Dingfu_Jie_Prince_Gong%27s_Mansion_Beijing.jpg/1280px-2014.08.17.154735_Dingfu_Jie_Prince_Gong%27s_Mansion_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/2014.08.17.154948_Entrance_Prince_Gong%27s_Mansion_Beijing.jpg/1280px-2014.08.17.154948_Entrance_Prince_Gong%27s_Mansion_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/2014.08.17.160013_Prince_Gong%27s_Mansion_Beijing.jpg/1280px-2014.08.17.160013_Prince_Gong%27s_Mansion_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/2014.08.17.160114_Prince_Gong%27s_Mansion_Beijing.jpg/1280px-2014.08.17.160114_Prince_Gong%27s_Mansion_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "lama-temple": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Beijing-Lamakloster_Yonghe-22-Hof2-Opfernde-gje.jpg/1280px-Beijing-Lamakloster_Yonghe-22-Hof2-Opfernde-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Beijing-Lamakloster_Yonghe-30-Guide-gje.jpg/1280px-Beijing-Lamakloster_Yonghe-30-Guide-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Beijing-Lamakloster_Yonghe-46-Betender-gje.jpg/1280px-Beijing-Lamakloster_Yonghe-46-Betender-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Beijing-Lamakloster_Yonghe-52-Hof3-Seerosen-gje.jpg/1280px-Beijing-Lamakloster_Yonghe-52-Hof3-Seerosen-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "shichahai": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/2016-09-11_Shichahai_Beijing_anagoria_02.jpg/1280px-2016-09-11_Shichahai_Beijing_anagoria_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/2016-09-11_Shichahai_Beijing_anagoria_10.jpg/1280px-2016-09-11_Shichahai_Beijing_anagoria_10.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/2016-09-11_Shichahai_Beijing_anagoria_11.jpg/1280px-2016-09-11_Shichahai_Beijing_anagoria_11.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/2016-09-11_Shichahai_Beijing_anagoria_16.jpg/1280px-2016-09-11_Shichahai_Beijing_anagoria_16.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "badaling": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Badalingchangcheng_railway_station_building.jpg/1280px-Badalingchangcheng_railway_station_building.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://www.chinevoyage.com/image/a-large-size/pekin/grande-muraille-badaling-3-1920x700.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Boarding_escalator_entrance_of_Badaling_Great_Wall_Railway_Station_%2820220109162828%29.jpg/1280px-Boarding_escalator_entrance_of_Badaling_Great_Wall_Railway_Station_%2820220109162828%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Boarding_faregates_of_Badaling_Great_Wall_Railway_Station_%2820220109162527%29.jpg/1280px-Boarding_faregates_of_Badaling_Great_Wall_Railway_Station_%2820220109162527%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "mutianyu": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/66954-The-Great-Wall%2C_Mutianyu.jpg/1280px-66954-The-Great-Wall%2C_Mutianyu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://p5crires.cri.cn/photoworkspace/cri/contentimg/2024/10/30/2024103021051480737.jpg",
    "https://p1crires.cri.cn/photoworkspace/cri/contentimg/2022/10/27/2022102711564062565.jpeg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/67054-The-Great-Wall%2C_Mutianyu.jpg/1280px-67054-The-Great-Wall%2C_Mutianyu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "beijing-zoo": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Ailuropoda_melanoleuca_-_Beijing_Zoo.JPG/1280px-Ailuropoda_melanoleuca_-_Beijing_Zoo.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Beijing_Zoo_Giant_Panda_%289870661185%29.jpg/1280px-Beijing_Zoo_Giant_Panda_%289870661185%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Beijing_Zoo_Giant_Panda_%289870667604%29.jpg/1280px-Beijing_Zoo_Giant_Panda_%289870667604%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://kr.people.com.cn/NMediaFile/2023/0705/FOREIGN1688538113759I29IZH5KEX.jpg"
  ],
  "art-798": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/798_Art_District_banner.jpg/1280px-798_Art_District_banner.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/798_Art_District_beijing_inside_of_a_gallery.jpg/1280px-798_Art_District_beijing_inside_of_a_gallery.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/798_Art_Zone_-_panoramio_%281%29.jpg/1280px-798_Art_Zone_-_panoramio_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://www.fodors.com/assets/destinations/1092608/modern-art-museum-dashanzi-art-district-chaoyang-district-beijing.jpg"
  ],
  "olympic-park": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/%22Bird_nest%22_-_Olympic_Stadium%2C_Beijing%2C_China_-_panoramio.jpg/1280px-%22Bird_nest%22_-_Olympic_Stadium%2C_Beijing%2C_China_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Beijing%2C_Birds_Nest_-_National_Stadium_-_panoramio.jpg/1280px-Beijing%2C_Birds_Nest_-_National_Stadium_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Beijing%2C_Birds_Nest_-_National_Stadium_-_panoramio_%281%29.jpg/1280px-Beijing%2C_Birds_Nest_-_National_Stadium_-_panoramio_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Beijing_Bird_nest.jpg/1280px-Beijing_Bird_nest.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "universal": [
    "https://am.zdmimg.com/202307/20/64b90210bdac04945.jpg_e1080.jpg",
    "https://images.chinahighlights.com/allpicture/2025/02/40d618922eb54b96b1c9e511cd6c0d03_cut_750x400_446_1739374904.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/5727621_at_Universal_Resort%2C_Universal_Blvd_%2820210826122714%29.jpg/1280px-5727621_at_Universal_Resort%2C_Universal_Blvd_%2820210826122714%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/5735448_at_Universal_Resort%2C_Universal_Blvd_%2820210826122124%29.jpg/1280px-5735448_at_Universal_Resort%2C_Universal_Blvd_%2820210826122124%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "tiananmen-rostrum": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/1996_-247-15a_Beijing_Tiananmen_Gate_%285068462443%29.jpg/1280px-1996_-247-15a_Beijing_Tiananmen_Gate_%285068462443%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Beijing-Verbotene_Stadt-Mittagstor-02-Tiananmen-gje.jpg/1280px-Beijing-Verbotene_Stadt-Mittagstor-02-Tiananmen-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Beijing-Verbotene_Stadt-Mittagstor-04-Tiananmen-gje.jpg/1280px-Beijing-Verbotene_Stadt-Mittagstor-04-Tiananmen-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Beijing-Verbotene_Stadt-Mittagstor-08-Tiananmen-gje.jpg/1280px-Beijing-Verbotene_Stadt-Mittagstor-08-Tiananmen-gje.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "mao-memorial": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%281%29.jpg/1280px-Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%282%29.jpg/1280px-Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%283%29.jpg/1280px-Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%283%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%284%29.jpg/1280px-Alberto_Fern%C3%A1ndez_visited_the_Chairman_Mao_Memorial_Hall_%284%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "confucius-guozijian": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/Beijing_Confucius_Temple_2009-07-03_16-18-40_DSC-H2_DSC06609_%2846306706965%29.jpg/1280px-Beijing_Confucius_Temple_2009-07-03_16-18-40_DSC-H2_DSC06609_%2846306706965%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Beijing_Confucius_Temple_2009-07-03_16-19-03_DSC-H2_DSC06610_%2840256080623%29.jpg/1280px-Beijing_Confucius_Temple_2009-07-03_16-19-03_DSC-H2_DSC06610_%2840256080623%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Beijing_Confucius_Temple_2009-07-03_16-21-39_DSC-H2_DSC06614_%2840256081763%29.jpg/1280px-Beijing_Confucius_Temple_2009-07-03_16-21-39_DSC-H2_DSC06614_%2840256081763%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Beijing_Confucius_Temple_2009-07-03_16-22-44_DSC-H2_DSC06616_%2847168993202%29.jpg/1280px-Beijing_Confucius_Temple_2009-07-03_16-22-44_DSC-H2_DSC06616_%2847168993202%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "military-museum": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/2019_Chinese_People%27s_Revolutionary_Military_Museum.jpg/1280px-2019_Chinese_People%27s_Revolutionary_Military_Museum.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://r1.visitbeijing.com.cn/vbj-s/2021/1124/20211124095608576.jpeg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/64702-Beijing-Military-Museum_%2828608638322%29.jpg/1280px-64702-Beijing-Military-Museum_%2828608638322%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/64724-Beijing-Military-Museum_%2828096787684%29.jpg/1280px-64724-Beijing-Military-Museum_%2828096787684%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "science-museum": [
    "https://www.beijing.gov.cn/renwen/rwzyd/qxdw/shaozhcqychy/zhgkxjshg/202309/W020240902569552086508.png",
    "https://ak-d.tripcdn.com/images/1mi6g12000mjxs4zf38DC.jpg?proc=source%2Ftrip",
    "https://www.stdaily.com/web/English/pic/2022-06/09/1890142_88c5a28b4f44941c9a67a6ea4bb8.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Beijing_science_and_technology_museum_14_Aug_2010.jpg/1280px-Beijing_science_and_technology_museum_14_Aug_2010.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "natural-history": [
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Beijing_Museum_of_Natural_History_2.jpg/1280px-Beijing_Museum_of_Natural_History_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Bubalus_wansjocki_NNHM.jpg/1280px-Bubalus_wansjocki_NNHM.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://r1.visitbeijing.com.cn/vbj-s/2024/0630/2e1ce91661ecc03ea1f584f67fccf5f5.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Chleuastochoerus_NNHM.jpg/1280px-Chleuastochoerus_NNHM.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "archaeology-museum": [
    "https://www.news.cn/photo/2023-09/15/1129864885_16947665648231n.JPG",
    "https://www.news.cn/2023-09/15/1129865475_16947722673031n.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/b/b8/Bone_spoon_and_adze%2C_Neolithic%2C_9000-7000_BC%2C_Donghulin_site%2C_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://upload.wikimedia.org/wikipedia/commons/e/e2/Bone_spoon_and_stone%2C_Neolithic%2C_9000-7000_BC%2C_Donghulin_site%2C_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
  ],
  "xiangshan": [
    "https://russian.beijing.gov.cn/specials/parktours/guidevisitors/fragranthillspark/tips/202301/W020230105700594555916.jpg",
    "https://img-rs.huanqiucdn.cn/dp/api/files/image/1e079443e0eb13540f53457bdf8fc400c5.jpg",
    "https://img1.bjd.com.cn/2022/11/03/9f5e81f1d9b10a73e4dea9eb7c76a74e7aa2a759.jpeg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Entrance_of_Shuangqing_Villa_%2820190918150857%29.jpg/1280px-Entrance_of_Shuangqing_Villa_%2820190918150857%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "ming-tombs": [
    "https://img1.qunarzz.com/travel/d6/1803/1d/df962624168921b5.jpg",
    "https://newbbs-fd.zol-img.com.cn/t_s1200x5000/g7/M00/0F/0A/ChMkLGQX-feIVzZ_AARh-O3KMN4AAN9kQPuXmYABGIQ979.jpg",
    "https://mmbiz.qpic.cn/sz_mmbiz_jpg/0ia4rhRSGjaKiauic1F4zR0Mkjvc3I8iaWlgvjZ2YznWXyKRmxu7xr7dKORzk3X8lwsBhDZ1CJNtdpalZickSeuztNA/640?wx_fmt=jpeg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/East_Skyline_of_Ming_Tomb_Reservoir.jpg/1280px-East_Skyline_of_Ming_Tomb_Reservoir.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
  ],
  "grand-canal-museum": [
    "https://r1.visitbeijing.com.cn/vbj-s/2024/0102/e527ea5520c814835535c64539ed97b5.jpg",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/The_Grand_Canal_Museum_of_Beijing.jpg/1280px-The_Grand_Canal_Museum_of_Beijing.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/The_Grand_Canal_Museum_of_Beijing_1.jpg/1280px-The_Grand_Canal_Museum_of_Beijing_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/The_Grand_Canal_Museum_of_Beijing_2.jpg/1280px-The_Grand_Canal_Museum_of_Beijing_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
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
  "liu-ji": [
    "https://i0.hdslb.com/bfs/archive/01499c3c29be1f0f60f53c02d3554ad286a26b4a.jpg",
    "https://i1.hdslb.com/bfs/archive/2f7e1666464cce6a880834d7f5fac2b1eb5079cc.jpg"
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
  ],
  "shaguoju": [
    "https://i2.hdslb.com/bfs/archive/5cb2ffd02fa2e5e563b0b44e1071b01d050ea89a.jpg",
    "https://img-rs.huanqiucdn.cn/dp/api/files/imageDir/66b5b6fa3f56b872927f3a2cee3e3df6.png"
  ]
};
})();

