import fs from "fs/promises";
import fetch from "node-fetch";

const trees = [
  {
    name: "コナラ",
    latin: "Quercus serrata",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara5.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara6.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara6a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara7.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/konara/konara8.jpg",
    ],
  },
  {
    name: "アラカシ",
    latin: "Quercus glauca",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi6a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi7.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/a/arakashi/arakashi8.jpg",
    ],
  },
  {
    name: "シラカシ",
    latin: "Quercus myrsinifolia",
    url:
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi4a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi4b.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi5.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi6.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi6a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/shirakashi/shirakashi7.jpg",
    ],
  },
  {
    name: "ケヤキ",
    latin: "Zelkova serrata",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki4a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki4b.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki4c.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki4d.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki5.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki6.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki7.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki8a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/keyaki/keyaki8.jpg",
    ],
  },
  {
    name: "スダジイ",
    latin: "Castanopsis sieboldii",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii2a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii5.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii6.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/s/sudajii/sudajii7.jpg",
    ],
  },
  {
    name: "ハリギリ",
    latin: "Kalopanax septemlobus",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri2.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/h/harigiri/harigiri8.jpg",
    ],
  },
  {
    name: "ホタルブクロ",
    latin: "Campanula punctata",
    url: "http://plants.minibird.jp/",
    images: [
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro01_01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro01_02.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_radicalLeaves.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_flrAge.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_corolla.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_calyx.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_tube.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_fruitAge.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_seeds.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_habitat01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_habitat02.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ha/con_ho/hotaruBukuro/images/hotaruBukuro_habitat03.jpg",
    ],
  },
  {
    name: "キヅタ",
    latin: "Hedera rhombea",
    url: "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta.html",
    images: [
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta0.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta1.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta2a.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta2b.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta3.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta4.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta5.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta6.jpg",
      "http://www.chiba-museum.jp/jyumoku2014/dat/k/kiduta/kiduta7.jpg",
    ],
  },
  {
    name: "キンラン",
    latin: "Cephalanthera falcata",
    url: "http://plants.minibird.jp/",
    images: [
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan_leaf.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan_inflore.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan_flr.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan_habitat01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/kinRan/images/kinRan_habitat02.jpg",
    ],
  },
  {
    name: "ギンラン",
    latin: "Cephalanthera erecta",
    url: "http://plants.minibird.jp/",
    images: [
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan_leaf.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan_inflore.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan_flr.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan_habitat01.jpg",
      "http://plants.minibird.jp/kansai/kansai50/kansai_ka/con_ki/ginRan/images/ginRan_habitat02.jpg",
    ],
  },
];

await Promise.all(
  trees.map(async (res) => {
    await fs.mkdir(`./out/${res.name}`);
    if (res.images)
      return await Promise.all(
        res.images.map(async (image) => {
          const response = await fetch(image);
          const buffer = await response.arrayBuffer();
          fs.writeFile(
            `./out/${res.name}/${res.images?.findIndex(
              (src) => src === image
            )}.jpg`,
            Buffer.from(buffer)
          );
        })
      );
  })
);
