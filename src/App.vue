<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { campuses, categories, defaultPlacePhoto, placePhotos, places, routes, sources } from './data/campus'

const activeCampus = ref('main')
const activeCategory = ref('all')
const query = ref('')
const selectedId = ref('library')
const selectedRouteId = ref('freshman')
const mapMode = ref('official')
const mapElement = ref(null)
const hasFocusedPlace = ref(false)

let map
let baseLayer
let markerLayer
let routeLayer

const campus = computed(() => campuses.find((item) => item.id === activeCampus.value))
const campusPlaces = computed(() => places.filter((place) => place.campus === activeCampus.value))
const selectedRoute = computed(() => routes.find((route) => route.id === selectedRouteId.value))
const routeStops = computed(() => new Set(selectedRoute.value?.stops ?? []))
const routePlaces = computed(() =>
  (selectedRoute.value?.stops ?? [])
    .map((id) => places.find((place) => place.id === id))
    .filter((place) => place?.campus === activeCampus.value)
)

const filteredPlaces = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  return campusPlaces.value.filter((place) => {
    const matchCategory = activeCategory.value === 'all' || place.category === activeCategory.value
    const matchKeyword =
      !keyword ||
      [place.name, place.code, place.intro, ...place.usefulFor, ...place.facilities]
        .join(' ')
        .toLowerCase()
        .includes(keyword)

    return matchCategory && matchKeyword
  })
})

const selectedPlace = computed(() => {
  const direct = places.find((place) => place.id === selectedId.value)
  return direct?.campus === activeCampus.value ? direct : filteredPlaces.value[0] ?? campusPlaces.value[0]
})
const selectedPhoto = computed(() => placePhotos[selectedPlace.value?.id] ?? defaultPlacePhoto)
const focusPanelActive = computed(() => hasFocusedPlace.value && selectedPlace.value)

const stats = computed(() => [
  { label: '校區', value: campuses.length },
  { label: '地點', value: places.length },
  { label: '新生路線', value: routes.length }
])

function selectCampus(id) {
  activeCampus.value = id
  const firstPlace = places.find((place) => place.campus === id)
  selectedId.value = firstPlace?.id ?? selectedId.value
  hasFocusedPlace.value = false

  if (!selectedRoute.value?.stops.some((stop) => places.find((p) => p.id === stop)?.campus === id)) {
    selectedRouteId.value =
      routes.find((route) => route.stops.some((stop) => places.find((p) => p.id === stop)?.campus === id))?.id ??
      'freshman'
  }
}

function selectPlace(id, focus = true) {
  selectedId.value = id
  hasFocusedPlace.value = focus
}

function clearFocusPanel() {
  hasFocusedPlace.value = false
}

function pointForPlace(place) {
  const currentCampus = campuses.find((item) => item.id === place.campus)
  const bounds = currentCampus.bounds
  const lat = bounds.north - (place.y / 100) * (bounds.north - bounds.south)
  const lng = bounds.west + (place.x / 100) * (bounds.east - bounds.west)
  return [lat, lng]
}

function boundsForCampus(targetCampus) {
  return [
    [targetCampus.bounds.south, targetCampus.bounds.west],
    [targetCampus.bounds.north, targetCampus.bounds.east]
  ]
}

function baseLayerForMode(mode) {
  if (mode === 'official') {
    return L.imageOverlay(campus.value.mapImage, boundsForCampus(campus.value), {
      opacity: 1,
      zIndex: 1,
      attribution: '<a href="https://www.fcu.edu.tw/map/">逢甲大學校園地圖</a>'
    })
  }

  if (mode === 'street') {
    return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  }

  return L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
  })
}

function createMarkerIcon(place) {
  const isSelected = selectedPlace.value?.id === place.id
  const isMuted = !filteredPlaces.value.some((item) => item.id === place.id)
  const isRouted = routeStops.value.has(place.id)

  return L.divIcon({
    className: [
      'leaflet-campus-marker',
      `marker-${place.category}`,
      isSelected ? 'is-selected' : '',
      isSelected && hasFocusedPlace.value ? 'is-focused' : '',
      isMuted ? 'is-muted' : '',
      isRouted ? 'is-routed' : ''
    ]
      .filter(Boolean)
      .join(' '),
    html: `<span>${place.code}</span>`,
    iconSize: [48, 38],
    iconAnchor: [24, 19],
    popupAnchor: [0, -22]
  })
}

function renderMarkers() {
  if (!map || !markerLayer) return

  markerLayer.clearLayers()

  campusPlaces.value.forEach((place) => {
    const marker = L.marker(pointForPlace(place), {
      icon: createMarkerIcon(place),
      keyboard: true,
      title: place.name
    })

    marker.bindTooltip(`${place.name}｜${place.code}`, {
      direction: 'top',
      offset: [0, -18],
      opacity: 0.95
    })

    marker.on('click', () => selectPlace(place.id, true))
    markerLayer.addLayer(marker)
  })
}

function renderRoute() {
  if (!map) return
  if (routeLayer) routeLayer.remove()

  const points = routePlaces.value.map(pointForPlace)
  if (points.length < 2) return

  routeLayer = L.polyline(points, {
    color: '#f3b941',
    weight: 5,
    opacity: 0.95,
    dashArray: '10 8',
    lineCap: 'round'
  }).addTo(map)
}

function syncMapToCampus() {
  if (!map || !campus.value) return

  map.fitBounds(boundsForCampus(campus.value), {
    animate: true,
    maxZoom: campus.value.zoom,
    padding: [34, 34]
  })
  renderMarkers()
  renderRoute()
  nextTick(() => map.invalidateSize())
}

function syncBaseLayer() {
  if (!map) return
  if (baseLayer) baseLayer.remove()

  baseLayer = baseLayerForMode(mapMode.value).addTo(map)
}

onMounted(() => {
  map = L.map(mapElement.value, {
    center: campus.value.center,
    zoom: campus.value.zoom,
    zoomControl: false,
    scrollWheelZoom: true
  })

  L.control.zoom({ position: 'bottomright' }).addTo(map)
  markerLayer = L.layerGroup().addTo(map)
  syncBaseLayer()
  syncMapToCampus()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = undefined
  }
})

watch(mapMode, () => {
  syncBaseLayer()
  syncMapToCampus()
})
watch(activeCampus, () => {
  syncBaseLayer()
  syncMapToCampus()
})

watch([activeCategory, query, selectedRouteId], () => {
  syncMapToCampus()
})

watch(selectedPlace, (place) => {
  if (!map || !place) return
  renderMarkers()
  const targetZoom = hasFocusedPlace.value ? Math.max(map.getZoom(), campus.value.zoom + 1) : map.getZoom()
  map.flyTo(pointForPlace(place), targetZoom, { animate: true, duration: 0.72 })
})

watch(hasFocusedPlace, () => {
  renderMarkers()
  if (map && hasFocusedPlace.value && selectedPlace.value) {
    map.flyTo(pointForPlace(selectedPlace.value), Math.max(map.getZoom(), campus.value.zoom + 1), {
      animate: true,
      duration: 0.72
    })
  }
})
</script>

<template>
  <main class="shell">
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">Feng Chia University Campus Navigator</p>
        <h1>逢甲大學動態校園地圖</h1>
        <p>
          把教學大樓、宿舍、圖書館、體育與社團活動空間整理成一張可搜尋、可篩選、可走路線的學生導覽圖。
        </p>
      </div>

      <div class="hero__panel" aria-label="專案統計">
        <div v-for="item in stats" :key="item.label" class="metric">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </section>

    <section class="workspace" aria-label="互動校園地圖">
      <aside class="sidebar">
        <div>
          <p class="section-kicker">校區</p>
          <div class="campus-tabs">
            <button
              v-for="item in campuses"
              :key="item.id"
              type="button"
              :class="{ active: activeCampus === item.id }"
              @click="selectCampus(item.id)"
            >
              <span class="tab-dot" :style="{ backgroundColor: item.color }"></span>
              {{ item.name }}
            </button>
          </div>
        </div>

        <label class="search">
          <span>搜尋地點、用途或設備</span>
          <input v-model="query" type="search" placeholder="例如：圖書館、體育、宿舍" />
        </label>

        <div>
          <p class="section-kicker">分類</p>
          <div class="filters">
            <button
              v-for="item in categories"
              :key="item.id"
              type="button"
              :class="{ active: activeCategory === item.id }"
              @click="activeCategory = item.id"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <div>
          <p class="section-kicker">快速路線</p>
          <select v-model="selectedRouteId" class="route-select">
            <option v-for="route in routes" :key="route.id" :value="route.id">
              {{ route.name }}
            </option>
          </select>
          <p class="route-description">{{ selectedRoute?.description }}</p>
        </div>

        <div class="place-list" aria-label="地點列表">
          <button
            v-for="place in filteredPlaces"
            :key="place.id"
            type="button"
            :class="{ active: selectedPlace?.id === place.id }"
            @click="selectPlace(place.id, true)"
          >
            <span>
              <strong>{{ place.name }}</strong>
              <small>{{ place.code }} · {{ categories.find((item) => item.id === place.category)?.label }}</small>
            </span>
            <i v-if="routeStops.has(place.id)">路線</i>
          </button>
        </div>
      </aside>

      <section class="map-card">
        <div class="map-toolbar">
          <div>
            <p class="section-kicker">{{ campus?.name }}</p>
            <h2>{{ campus?.address }}</h2>
          </div>
          <div class="map-toolbar__right">
            <p>{{ campus?.summary }}</p>
            <div class="map-mode" aria-label="地圖底圖切換">
              <button type="button" :class="{ active: mapMode === 'official' }" @click="mapMode = 'official'">
                校園圖
              </button>
              <button type="button" :class="{ active: mapMode === 'satellite' }" @click="mapMode = 'satellite'">
                衛星
              </button>
              <button type="button" :class="{ active: mapMode === 'street' }" @click="mapMode = 'street'">
                街圖
              </button>
            </div>
          </div>
        </div>

        <div class="map-wrap" :class="{ 'is-place-focused': focusPanelActive }">
          <div ref="mapElement" class="real-campus-map" role="application" aria-label="逢甲大學真實俯視互動地圖"></div>

          <article v-if="focusPanelActive" class="landmark-focus-card" aria-live="polite">
            <button class="focus-close" type="button" aria-label="收起地標快覽" @click="clearFocusPanel">×</button>
            <figure>
              <img :src="selectedPhoto.url" :alt="`${selectedPlace.name}實景照片`" />
              <figcaption>
                {{ selectedPhoto.caption }}
                <a :href="selectedPhoto.source" target="_blank" rel="noreferrer">{{ selectedPhoto.credit }}</a>
              </figcaption>
            </figure>
            <div class="focus-copy">
              <p class="section-kicker">地標快覽</p>
              <h3>{{ selectedPlace.name }}</h3>
              <p>{{ selectedPlace.intro }}</p>
              <div class="focus-meta">
                <span>{{ selectedPlace.code }}</span>
                <span>{{ categories.find((item) => item.id === selectedPlace.category)?.label }}</span>
                <span>{{ campus?.name }}</span>
              </div>
            </div>
          </article>

          <div class="map-legend">
            <span><i class="legend-building"></i> 地點標記</span>
            <span><i class="legend-route"></i> 推薦路線</span>
            <span><i class="legend-road"></i> 真實底圖</span>
          </div>
        </div>
      </section>

      <aside class="detail-card" v-if="selectedPlace">
        <figure class="detail-photo">
          <img :src="selectedPhoto.url" :alt="`${selectedPlace.name}參考照片`" />
          <figcaption>{{ selectedPhoto.caption }}</figcaption>
        </figure>
        <p class="section-kicker">目前選取</p>
        <h2>{{ selectedPlace.name }}</h2>
        <p class="code">{{ selectedPlace.code }} · {{ campus?.name }}</p>
        <p class="intro">{{ selectedPlace.intro }}</p>

        <div class="info-block">
          <h3>學生常用</h3>
          <ul>
            <li v-for="item in selectedPlace.usefulFor" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="info-block">
          <h3>場地與設備</h3>
          <div class="chips">
            <span v-for="item in selectedPlace.facilities" :key="item">{{ item }}</span>
          </div>
        </div>

        <div class="tip">
          <strong>小提醒</strong>
          <p>{{ selectedPlace.tip }}</p>
        </div>
      </aside>
    </section>

    <section class="source-band">
      <div>
        <p class="section-kicker">資料備註</p>
        <h2>目前是校園導覽原型，可再接正式樓層、教室與即時公告資料。</h2>
      </div>
      <div class="sources">
        <a v-for="source in sources" :key="source.url" :href="source.url" target="_blank" rel="noreferrer">
          {{ source.label }}
        </a>
      </div>
    </section>
  </main>
</template>
