<template>
    <div
        class="room-plug"
        @click="handleJump">
        <h1><%= chineseName %></h1>
    </div>
</template>
<script setup lang="ts">
    import { routeAppView, reportEvent } from '@/utils/NativeUtils';

    function handleJump() {
        reportEvent('<%= chineseName %>', '点击房间插件', '跳转到活动主页面');
        routeAppView(`Sango://Web/NORMAL_MODE?url=${window.location.origin}/<%= lineName %>`);
    }
    reportEvent('<%= chineseName %>', '房间插件', '进入房间插件');
</script>
<style lang="scss" scoped>
    .room-plug {
        width: 100%;
        height: pxToRem(900, 75);
        background: skyblue;
        overflow: hidden;
    }
</style>
<style>
    body,
    #app {
        background-color: transparent;
    }
</style>
