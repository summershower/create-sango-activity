<template>
    <div class="landing-page">
        <h1><%= chineseName %>落地页</h1>
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import { useRtl, useShareId } from '@/utils/hooks';
    import { getAppVersion, reportEvent } from '@/utils/NativeUtils';

    useRtl();

    const [jump, shareData] = useShareId();

    getAppVersion()
        .then(() => {
            reportEvent('<%= chineseName %>', 'IM消息落地页', `进入IM消息落地页'`);
        })
        .catch(() => {
            reportEvent('<%= chineseName %>', '端外分享落地页', '进端外分享落地页');
        });
</script>
<style lang="scss" scoped></style>
