<script setup>

//#region __import__

import {
    onMounted,
    ref
} from 'vue'
import {
    useRouter,
    useRoute
} from 'vue-router'
import html2canvas from 'html2canvas'
import {
    debounce
} from 'lodash'
import BouncingBall from '../components/icons/IconBouncingBall.vue'
import SkeletonDiv  from '../components/SkeletonDiv.vue'

//#endregion
//#region __variables___

const location = useRoute()
const currentFullPath = window.location.pathname
const currentRoutePath = location.path
const remainingPath = currentFullPath.replace(currentRoutePath, '')
const router = useRouter()
const url = ref(null)
const elFrame = ref(null)
const imgSrc = ref(null)
const isCapturing = ref(false)
const isStartup = ref(true)

const routes = router.getRoutes().filter((route) => {
    return route.name !== undefined && route.name !== '404' && route.name !== 'fiddle' ? true : false
})

let extendedRoutes = []
let nakedRoutes = []
let previewName = null
let previewRoute = null

//#endregion
//#region __event-handlers__

const handleIframeLoad = debounce(async (args) => {
    await captureImage(previewName)
    setTimeout(() => {
        generateNextPreview()
    }, 8000)
}, 500)

const onRegenerateClick = () => {
    localStorage.clear()
    window.location.reload()
}

//#endregion
//#region __internals__

const captureImage = debounce(async (previewName) => {
    if (previewName) {
        const iframe = document.getElementById('targetPage')
        const canvas = await html2canvas(iframe.contentWindow.document.body)
        const ctx = canvas.getContext('2d')
        ctx.filter = "blur(5px) grayscale(100%) contrast(200%)"
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
        debugger
        const imgStr = canvas.toDataURL('image/png')
        imgSrc.value = imgStr
        localStorage.setItem(previewName, imgStr);
        extendedRoutes.push({
            name: String(previewRoute.name),
            preview: String(imgStr),
            path: String(previewRoute.path)
        })
    }
}, 4000)

const generateRoutes = () => {
    extendedRoutes = []
    nakedRoutes = []
    routes.forEach((route) => {
        const savedImageURL = localStorage.getItem(route.name + '-preview')
        if (savedImageURL) {
            extendedRoutes.push({
                name: String(route.name),
                preview: String(savedImageURL),
                path: String(route.path)
            })
        } else {
            debugger
            nakedRoutes.push({
                name: String(route.name),
                preview: null,
                path: String(route.path)
            })
        }
    })

}

const generateNextPreview = debounce(() => {
    if (nakedRoutes.length) {
        const targetRoute = nakedRoutes.pop()
        isCapturing.value = true
        isStartup.value = false
        if (targetRoute.name) {
            previewRoute = targetRoute
            previewName = targetRoute.name + '-preview'
            url.value = window.location.protocol + '//' + window.location.host + '/' + remainingPath + targetRoute.name
            imgSrc.value = null
            console.log(previewName, url.value)
        } else {
            console.log('targetRoute', targetRoute)
            previewRoute = null
            previewName = null
            url.value = null
        }
    } else {
        generateRoutes()
        isCapturing.value = false
        isStartup.value = false
    }
}, 1000)

//#endregion
//#region __life-cycle__

onMounted(() => {
    generateRoutes()
    generateNextPreview()
})

//#endregion

</script>

<template>
<SkeletonDiv v-if="isStartup"></SkeletonDiv>
<Transition name="fade" mode="out-in">
  <div>
    <div class="dashboards" v-if="!isCapturing && !isStartup">
        <router-link v-for="route in extendedRoutes" :key="route.path" :to="route.path">
            <div class="dashboard square" :style="{
          backgroundImage: `url(${route.preview})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          border: 'dashed 1px gray'
        }"></div>
            <h4 style="text-align: center; padding-top: 10px">{{ route.name }}</h4>
        </router-link>
        <div>
            <div class="dashboard square" style="border: dashed 1px gray;" @click="onRegenerateClick">
                <img style="width: 100%;" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iNSIgcng9IjkiIHJ5PSIzIi8+PHBhdGggZD0iTTIxIDEyYzAgMS42Ni00IDMtOSAzcy05LTEuMzQtOS0zIi8+PHBhdGggZD0iTTMgNXYxNGMwIDEuNjYgNCAzIDkgM3M5LTEuMzQgOS0zVjUiLz48L2c+PC9zdmc+' />
            </div>
            <h4 class="psuedoLink" style="text-align: center; padding-top: 10px" @click="onRegenerateClick">Clear Local Storage</h4>
        </div>
    </div>
    <div v-if="isCapturing && !isStartup">
        <p>
            <BouncingBall />
            &nbsp;<h3>Generting previews ...</h3>
        </p>
        <div style="padding: 10px;">
            <div style="width: 100%">
                <i>{{ url }}</i>
            </div>
            <table style="border: dotted 2px gray; width: 60%; min-width: 1024px;">
                <thead style="padding: 10px;">
                    <th style="border: solid 1px gainsboro; text-align: left; vertical-align: middle; padding: 10px; filter: invert(100%);">
                        <h5>I F R A M E</h5>
                    </th>
                    <th style="border: solid 1px gainsboro; text-align: right; vertical-align: middle; padding: 10px; filter: invert(100%);">
                        <h5>P R E V I E W </h5>
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td style="vertical-align: top; text-align: left;">
                            <iframe id="targetPage" ref="elFrame" style="height: 400px; width: 600px;" @load="handleIframeLoad" :src="url"></iframe>
                        </td>
                        <td style="vertical-align: top; text-align: right;">
                            <img :src="imgSrc" style="width: 200px" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>

</Transition>
</template>

<style scoped>
.dashboards {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
    opacity: 0.9;
}

.dashboard {
    position: relative;
    background-color: #e5e8ea;
    box-shadow: 0px 3px 5px rgba(100, 100, 100, 0.49);
}

.dashboard:hover {
    box-shadow: none;
}

.square {
    width: 100%;
    height: 100%;
    background: linear-gradient(#fff, #e5e8ea);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1b75bc;
    overflow: hidden;
}

.square:hover {
    background: none;
    background-color: #e5e8ea;
    color: black;
    font-weight: 700;
}

.psuedoLink {
    text-decoration: underline;
    cursor: pointer;
}

a,
.psuedoLink {
    color: #1b75bc;
    cursor: pointer;

}

a:hover,
.psuedoLink:hover {
    color: black;
    font-weight: 700;
}

frame {
    width: 1024px;
    height: 768px;
}
</style>
