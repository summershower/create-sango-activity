<template>
    <!-- 我的排名 -->
    <div class="my-rank">
        <div class="rank">{{ props?.rank || '-' }}</div>
        <div class="portrait" @click="handleClickPortrait">
            <img :src="props?.portrait" />
        </div>
        <div class="username">{{ props?.username || '' }}</div>
        <div class="score">
            {{ props?.score || 0 }}

        </div>
    </div>

</template>
<script lang="ts" setup>
import { openPersonageInfo, reportEvent } from '@/utils/NativeUtils';

const props = defineProps({
    rank: {
        type: [String, Number],
        default: 0,
    },
    portrait: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        default: '',
    },
    score: {
        type: [String, Number],
        default: 0,
    },
    userId: {
        type: String,
        default: '',
    },
});

// 点击我的头像
function handleClickPortrait() {
    if (props?.userId) {
        openPersonageInfo(props.userId);
        reportEvent('<%= chineseName %>', '点击我的头像', `打开我的的个人主页`);
    }
}
</script>
<style lang="scss" scoped>
.my-rank {
    position: fixed;
    z-index: 5;
    bottom: 0;
    display: grid;
    grid-template-columns: pxToRem(134, 75) pxToRem(94, 75) 1fr pxToRem(220, 75);
    align-items: center;
    width: 100%;
    height: pxToRem(150, 75);

    .rank {
        justify-self: center;
        font-weight: 700;
        font-size: pxToRem(26, 75);
        text-align: center;
        color: #7b4000;
    }

    .username {
        @extend .text-ellipsis;
        justify-self: start;
        direction: ltr;
        padding: 0 pxToRem(30, 75);
        max-width: pxToRem(340, 75);
        font-weight: 400;
        font-size: pxToRem(25, 75);
        text-align: center;
        color: #7b4000;
    }

    .portrait {
        img {
            display: block;
            padding: 0;
            margin: 0;
            width: pxToRem(90, 75);
            height: pxToRem(90, 75);
            object-fit: contain;
            border-radius: 50%;
            border: pxToRem(2, 75) solid #f2eac3;
        }
    }

    .score {
        @extend .flex-center;
        justify-self: center;
        position: relative;
        font-size: pxToRem(32, 75);
    }
}
</style>
