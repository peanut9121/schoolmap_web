export const categories = [
  { id: 'all', label: '全部' },
  { id: 'learning', label: '教學' },
  { id: 'service', label: '行政服務' },
  { id: 'life', label: '學生生活' },
  { id: 'sports', label: '運動場地' },
  { id: 'dorm', label: '宿舍' }
]

export const campuses = [
  {
    id: 'main',
    name: '校本部',
    address: '臺中市西屯區文華路100號',
    summary: '多數教學、行政、圖書與社團活動集中於此。',
    color: '#8f1f2f',
    mapImage:
      'https://s3.ap-southeast-1.amazonaws.com/web-content.fcu.edu.tw/wp-content/uploads/2025/05/28163923/%E6%A0%A1%E5%9C%92%E5%9C%B0%E5%9C%96_%E6%A0%A1%E6%9C%AC%E9%83%A8_800x1400.png',
    center: [24.18005, 120.64765],
    zoom: 17,
    bounds: {
      north: 24.18285,
      south: 24.17715,
      west: 120.64455,
      east: 120.65035
    }
  },
  {
    id: 'fuxing',
    name: '福星校區',
    address: '臺中市西屯區福星北路98號',
    summary: '宿舍與生活機能重點區，靠近逢甲商圈。',
    color: '#2f7f6f',
    mapImage:
      'https://s3.ap-southeast-1.amazonaws.com/web-content.fcu.edu.tw/wp-content/uploads/2020/11/06221347/%E6%A0%A1%E5%9C%92%E5%9C%B0%E5%9C%96_%E4%BA%8C%E6%A0%A1%E5%8D%80_%E7%B8%AE%E5%B0%8F-01.png',
    center: [24.1814, 120.6428],
    zoom: 17,
    bounds: {
      north: 24.1835,
      south: 24.1794,
      west: 120.6408,
      east: 120.6447
    }
  },
  {
    id: 'ctsp',
    name: '中科校區',
    address: '臺中市西屯區東大路一段951號',
    summary: '科研大樓與產研相關使用空間。',
    color: '#355c9f',
    mapImage:
      'https://s3.ap-southeast-1.amazonaws.com/web-content.fcu.edu.tw/wp-content/uploads/2021/07/20153055/%E6%A0%A1%E5%9C%92%E5%9C%B0%E5%9C%96_%E4%B8%AD%E7%A7%91%E6%A0%A1%E5%8D%80_1100720.png',
    center: [24.2078, 120.6092],
    zoom: 16,
    bounds: {
      north: 24.2103,
      south: 24.2053,
      west: 120.6066,
      east: 120.6118
    }
  }
]

export const places = [
  {
    id: 'admin',
    campus: 'main',
    name: '行政大樓',
    code: 'ADM',
    category: 'service',
    x: 18,
    y: 82,
    size: 'm',
    intro: '校務行政與校內洽公常用據點。',
    usefulFor: ['註冊與行政洽詢', '校內文件辦理', '新生入學相關問題'],
    facilities: ['服務櫃台', '行政辦公室', '公告資訊'],
    tip: '第一次辦理行政流程時，建議先查好承辦單位，現場會快很多。'
  },
  {
    id: 'memorial',
    campus: 'main',
    name: '丘逢甲紀念館',
    code: 'MEM',
    category: 'service',
    x: 49,
    y: 84,
    size: 's',
    intro: '校史與紀念性空間，也是認識逢甲精神的入口。',
    usefulFor: ['校史參觀', '校園導覽', '重要典禮集合'],
    facilities: ['展示空間', '紀念場域'],
    tip: '適合放進校園導覽路線，讓新生先有學校方位感。'
  },
  {
    id: 'library',
    campus: 'main',
    name: '圖書館',
    code: 'LIB',
    category: 'life',
    x: 44,
    y: 70,
    size: 'l',
    intro: '查資料、自習、借書與安靜讀書的核心地點。',
    usefulFor: ['期中期末自習', '借閱圖書與電子資源', '小組資料查找'],
    facilities: ['閱覽區', '館藏查詢', '資訊檢索'],
    tip: '考前座位熱門，提早規劃讀書時段會比較穩。'
  },
  {
    id: 'science-aero',
    campus: 'main',
    name: '科學與航太館',
    code: 'SA',
    category: 'learning',
    x: 57,
    y: 79,
    size: 'm',
    intro: '工程與科技相關課程、實驗與專業教室常見區域。',
    usefulFor: ['工程課程', '實驗課', '專題討論'],
    facilities: ['實驗室', '專業教室', '自修空間'],
    tip: '實驗課常需要提早到場，預留找教室與設備準備時間。'
  },
  {
    id: 'business',
    campus: 'main',
    name: '商學大樓',
    code: 'BUS',
    category: 'learning',
    x: 73,
    y: 80,
    size: 'l',
    intro: '商管、會計、行銷與管理課程的高頻教學據點。',
    usefulFor: ['商管課程', '專題報告', '企業講座'],
    facilities: ['一般教室', '研討空間', '院系辦公室'],
    tip: '跨院選修常會來這裡，上課前先記樓層與教室代碼。'
  },
  {
    id: 'zhongqin',
    campus: 'main',
    name: '忠勤樓',
    code: 'ZQ',
    category: 'learning',
    x: 77,
    y: 55,
    size: 'm',
    intro: '一般課程與教學活動使用頻率高的大樓。',
    usefulFor: ['通識課', '共同科目', '大型課程'],
    facilities: ['一般教室', '討論空間'],
    tip: '課表若出現不熟的教室代碼，可先用這份地圖定位。'
  },
  {
    id: 'architecture',
    campus: 'main',
    name: '建築館',
    code: 'ARC',
    category: 'learning',
    x: 78,
    y: 66,
    size: 'm',
    intro: '設計、建築與評圖相關活動的特色空間。',
    usefulFor: ['建築設計課', '模型製作', '作品評圖'],
    facilities: ['設計教室', '評圖區', '工作空間'],
    tip: '作品展示期間很值得繞過去看，能快速感受系所氛圍。'
  },
  {
    id: 'language',
    campus: 'main',
    name: '語文大樓',
    code: 'LAN',
    category: 'learning',
    x: 62,
    y: 67,
    size: 's',
    intro: '語文課程、外語學習與相關教學活動地點。',
    usefulFor: ['英文課', '第二外語', '語言檢定準備'],
    facilities: ['語言教室', '一般教室'],
    tip: '外語課很看出席與互動，別低估從上一堂課走過來的時間。'
  },
  {
    id: 'engineering',
    campus: 'main',
    name: '工學館',
    code: 'ENG',
    category: 'learning',
    x: 20,
    y: 63,
    size: 'm',
    intro: '工程與實作課程常見的教學據點。',
    usefulFor: ['工程課', '專題實作', '助教討論'],
    facilities: ['專業教室', '實驗室', '討論區'],
    tip: '專題週期長，建議把常用教室和系辦位置加到收藏。'
  },
  {
    id: 'renyan',
    campus: 'main',
    name: '人言大樓',
    code: 'RY',
    category: 'learning',
    x: 39,
    y: 48,
    size: 'l',
    intro: '跨領域課程、講座與大型活動常見場域。',
    usefulFor: ['大型課程', '演講活動', '跨院交流'],
    facilities: ['大型教室', '活動空間', '研討區'],
    tip: '熱門講座常在這附近，活動前可以順便確認教室動線。'
  },
  {
    id: 'ciee',
    campus: 'main',
    name: '資訊電機館',
    code: 'IE',
    category: 'learning',
    x: 63,
    y: 59,
    size: 'm',
    intro: '資訊、電機、通訊與程式實作相關課程常用區域。',
    usefulFor: ['程式設計課', '硬體實驗', '專題開發'],
    facilities: ['電腦教室', '實驗室', '系所辦公室'],
    tip: '帶筆電上課前先確認充電與網路，實作課會舒服很多。'
  },
  {
    id: 'humanities',
    campus: 'main',
    name: '人文社會館',
    code: 'HS',
    category: 'learning',
    x: 55,
    y: 48,
    size: 'm',
    intro: '人文、社會、通識與討論型課程常見場域。',
    usefulFor: ['通識課', '小組討論', '社會議題課程'],
    facilities: ['一般教室', '研討教室'],
    tip: '討論課常需要事前閱讀，這裡也適合作為小組集合點。'
  },
  {
    id: 'activity',
    campus: 'main',
    name: '育樂館',
    code: 'ACT',
    category: 'life',
    x: 78,
    y: 30,
    size: 'm',
    intro: '社團、學生自治與活動排練常用空間。',
    usefulFor: ['社團活動', '排練集合', '學生會活動'],
    facilities: ['活動教室', '社團空間'],
    tip: '開學社團博覽會期間，這一帶會是認識社團最快的地方。'
  },
  {
    id: 'sports',
    campus: 'main',
    name: '體育館',
    code: 'GYM',
    category: 'sports',
    x: 62,
    y: 17,
    size: 'l',
    intro: '體育課、校隊訓練與運動活動的主要空間。',
    usefulFor: ['體育課', '運動活動', '賽事集合'],
    facilities: ['室內場地', '體育課空間', '運動服務'],
    tip: '體育課通常有服裝與集合規定，第一週務必看清楚課程公告。'
  },
  {
    id: 'civil',
    campus: 'main',
    name: '土木水利館',
    code: 'CW',
    category: 'learning',
    x: 29,
    y: 74,
    size: 's',
    intro: '土木、水利與建設相關課程和實驗使用空間。',
    usefulFor: ['土木水利課程', '實驗課', '專業討論'],
    facilities: ['專業教室', '實驗室'],
    tip: '需要量測或戶外實作的課程，記得先看老師公告。'
  },
  {
    id: 'science',
    campus: 'main',
    name: '理學大樓',
    code: 'SCI',
    category: 'learning',
    x: 23,
    y: 18,
    size: 's',
    intro: '基礎科學與理學相關課程地點。',
    usefulFor: ['數理課程', '基礎科學', '實驗討論'],
    facilities: ['一般教室', '專業教室'],
    tip: '共同基礎課可能跨院學生很多，提前確認座位與教室。'
  },
  {
    id: 'xuesi',
    campus: 'main',
    name: '學思樓',
    code: 'XS',
    category: 'life',
    x: 47,
    y: 86,
    size: 'm',
    intro: '學習、交流與校園生活記憶點之一。',
    usefulFor: ['自習集合', '小組討論', '課間休息'],
    facilities: ['學習空間', '交流空間'],
    tip: '很適合作為朋友集合點，地圖辨識度高。'
  },
  {
    id: 'creative',
    campus: 'main',
    name: '文華創意中心',
    code: 'CC',
    category: 'life',
    x: 13,
    y: 72,
    size: 's',
    intro: '創意、展演與跨域活動相關空間。',
    usefulFor: ['展覽活動', '創意課程', '跨域交流'],
    facilities: ['展演空間', '活動空間'],
    tip: '想找課外活動或展覽，可以把這裡列入巡覽點。'
  },
  {
    id: 'fuxing-a-d',
    campus: 'fuxing',
    name: '逢甲學舍 A-D',
    code: 'FD',
    category: 'dorm',
    x: 22,
    y: 42,
    size: 'l',
    intro: '福星校區主要住宿空間之一。',
    usefulFor: ['住宿生活', '新生搬宿', '夜間返校'],
    facilities: ['宿舍', '生活服務', '公共空間'],
    tip: '住宿生建議把往返校本部的步行時間抓進課表。'
  },
  {
    id: 'female-dorm',
    campus: 'fuxing',
    name: '女生宿舍',
    code: 'FDW',
    category: 'dorm',
    x: 48,
    y: 31,
    size: 'm',
    intro: '學生住宿與生活管理空間。',
    usefulFor: ['住宿', '生活洽詢', '門禁管理'],
    facilities: ['寢室', '公共空間', '管理服務'],
    tip: '搬宿日人潮多，行李動線可以先規劃。'
  },
  {
    id: 'male-dorm',
    campus: 'fuxing',
    name: '男生宿舍',
    code: 'FDM',
    category: 'dorm',
    x: 65,
    y: 50,
    size: 'm',
    intro: '學生住宿與日常生活支援據點。',
    usefulFor: ['住宿', '生活洽詢', '門禁管理'],
    facilities: ['寢室', '公共空間', '管理服務'],
    tip: '夜間返宿時，注意校區周邊動線與安全。'
  },
  {
    id: 'excellent',
    campus: 'fuxing',
    name: '精采學舍',
    code: 'EX',
    category: 'dorm',
    x: 78,
    y: 68,
    size: 'm',
    intro: '福星校區住宿生活區之一。',
    usefulFor: ['住宿', '交流活動', '生活服務'],
    facilities: ['宿舍', '公共空間'],
    tip: '可把宿舍、校本部、逢甲商圈設定成新生生活三角。'
  },
  {
    id: 'research',
    campus: 'ctsp',
    name: '科研大樓',
    code: 'RES',
    category: 'learning',
    x: 49,
    y: 47,
    size: 'l',
    intro: '中科校區科研與產學合作相關空間。',
    usefulFor: ['研究活動', '產學合作', '專題參訪'],
    facilities: ['研究空間', '會議空間', '產研場域'],
    tip: '前往中科校區前，先確認交通時間與集合位置。'
  }
]

export const routes = [
  {
    id: 'freshman',
    name: '新生半日熟悉路線',
    stops: ['admin', 'library', 'business', 'renyan', 'activity'],
    description: '行政報到、讀書資源、常見教室與社團生活一次看懂。'
  },
  {
    id: 'study',
    name: '上課不迷路路線',
    stops: ['ciee', 'engineering', 'science-aero', 'business', 'zhongqin'],
    description: '整理工程、資訊、商學與共同課程常用大樓。'
  },
  {
    id: 'life',
    name: '生活支援路線',
    stops: ['library', 'xuesi', 'sports', 'activity', 'creative'],
    description: '自習、運動、社團與展演活動的日常路線。'
  },
  {
    id: 'dorm',
    name: '住宿生動線',
    stops: ['fuxing-a-d', 'female-dorm', 'male-dorm', 'excellent'],
    description: '福星校區宿舍與住宿生活快速定位。'
  }
]

export const defaultPlacePhoto = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rain_in_West_Gate%2C_FCU_Main_Campus_20190817.jpg/900px-Rain_in_West_Gate%2C_FCU_Main_Campus_20190817.jpg',
  caption: '逢甲大學校門與西門周邊視角',
  credit: 'Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:Rain_in_West_Gate,_FCU_Main_Campus_20190817.jpg'
}

export const placePhotos = {
  library: {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Feng%20Chia%20University%20Library%2020111101%20night.jpg',
    caption: '逢甲大學圖書館入口實景',
    credit: 'Foxt Who / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Feng_Chia_University_Library_20111101_night.jpg'
  },
  memorial: {
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chiu%20Feng%20Chia%20Memorial%20Hall%2C%20Feng%20Chia%20University.jpg',
    caption: '丘逢甲紀念館正面實景',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Chiu_Feng_Chia_Memorial_Hall,_Feng_Chia_University.jpg'
  },
  admin: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rain_in_West_Gate%2C_FCU_Main_Campus_20190817.jpg/900px-Rain_in_West_Gate%2C_FCU_Main_Campus_20190817.jpg',
    caption: '逢甲大學校門周邊實景，作為行政洽公入口參考',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Rain_in_West_Gate,_FCU_Main_Campus_20190817.jpg'
  }
}

export const sources = [
  {
    label: '逢甲大學校園地圖',
    url: 'https://www.fcu.edu.tw/map/'
  },
  {
    label: '逢甲大學官網',
    url: 'https://www.fcu.edu.tw/'
  },
  {
    label: '逢甲大學圖書館',
    url: 'https://web.lib.fcu.edu.tw/library'
  },
  {
    label: 'OpenStreetMap Tile Usage Policy',
    url: 'https://operations.osmfoundation.org/policies/tiles/'
  },
  {
    label: 'Esri World Imagery',
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  },
  {
    label: 'Wikimedia Commons 校園照片',
    url: 'https://commons.wikimedia.org/wiki/Category:Feng_Chia_University'
  }
]
