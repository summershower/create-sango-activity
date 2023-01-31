<template>
    <div class="<%= projectName %>"><%if (isNeedHalfMode.toLowerCase() === 'y') { %>
         <!-- 透明占位 -->
        <div
            class="placeholder"
            v-if="!isFullMode"
            @click="handleClose"></div>
        <div
            class="container"
            :class="!isFullMode && 'br'"
            ref="containerRef"
            :style="{
                height: isFullMode ? '100vh' : '80vh',
            }"
            id="container">
            <!-- 半屏手势指示条 -->
            <div
                class="line"
                v-if="!isFullMode"
                id="slidingBar"></div>
        </div><% } %>
        <%if (isNeedHalfMode.toLowerCase() !== 'y') { %><%= projectName %><% } %>
    </div>
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';<%if (isNeedPinia.toLowerCase() === 'y') { %>
    import { useStore } from './store';
    const store = useStore();<% } %>
    <%if (isNeedHalfMode.toLowerCase() === 'y') { %>import { useTopLineGestureSliding,usePageGestureSliding } from './hooks';
    import { useRoute } from 'vue-router';
    import { closeWebview, reportEvent } from '@utils/NativeUtils';<% } %><%if (isNeedHalfMode.toLowerCase() !== 'y') { %>import { reportEvent } from '@utils/NativeUtils';<% } %> 
    const { t } = useI18n();
    <%if (isNeedHalfMode.toLowerCase() === 'y') { %>
      // 判断是半屏模式还是全屏模式
    const route = useRoute();
    const { mode = false } = route.query;
    const isFullMode = ref(false);
    if (mode === 'full') isFullMode.value = true;

    const containerRef = ref(null);
    function handleClose() {
        containerRef.value.style.transform = 'translate3d(0, 80vh, 0)';
        setTimeout(() => {
            closeWebview();
        }, 300);
    }
  
    onMounted(() => {
        // 非全屏模式，页面透明+追加滑动手势
        document.body.style.background = 'transparent';
        if (!isFullMode.value) {
            const styles = [
                'position: fixed',
                'width: 100%',
                'top: 20vh',
                'height: 80vh',
                'overflow-y: auto',
            ];
            containerRef.value.style.cssText = styles.join(';');
            useTopLineGestureSliding('#slidingBar', '#container', () =>
                setTimeout(() => {
                    closeWebview();
                }, 300)
            );
            // 页面滑动
            usePageGestureSliding('#container', () =>
                setTimeout(() => {
                    closeWebview();
                }, 300)
            );
        }
    });<% } %>
    reportEvent('<%= chineseName %>', '首页', '进入首页');
</script>
<style lang="scss" scoped><%if (isNeedHalfMode.toLowerCase() === 'y') { %>
 .<%= lineName %> {
        height: 100vh;
        .placeholder {
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            height: 20vh;
            background: transparent;
        }
        .container {
            position: relative;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #fff8ef -0.39%, #ffeecf 64.07%);
            border-top: 0.1px solid transparent;
            transition: all 0.3s ease;
            overflow-x: hidden;
            overflow-y: visible;
            &.br {
                border-radius: pxToRem(20, 75) pxToRem(20, 75) 0 0;
            }
            .line {
                position: absolute;
                top: pxToRem(20, 75);
                z-index: 100;
                left: 50%;
                transform: translateX(-50%);
                width: pxToRem(100, 75);
                height: pxToRem(15, 75);
                background: rgba(255, 255, 255, 0.8);
                border-radius: pxToRem(30, 75);
            }
        }
    }<% } %></style>
