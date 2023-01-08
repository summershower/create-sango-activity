<template>
    <div class="rank-item">
        <div class="rank">
            {{ props?.rank || '-' }}
        </div>
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
        type: Number,
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
        type: Number,
        default: 0,
    },
    userId: {
        type: String,
        default: '',
    },
});
// 点击用户头像
function handleClickPortrait() {
    if (props.userId) {
        openPersonageInfo(props.userId);
        reportEvent('<% chineseName %>', '点击用户头像', `打开${props.userId}的个人主页`);
    }
}
</script>
<style lang="scss" scoped>
.rank-item {
    position: relative;
    display: grid;
    grid-template-columns: pxToRem(131, 75) pxToRem(88, 75) 1fr pxToRem(200, 75);
    align-items: center;
    margin: pxToRem(13.5, 75) auto 0;
    width: pxToRem(693, 75);
    height: pxToRem(108, 75);
    color: #fbbd81;
    background: url('@/assets/images/octoberGifts/rank.png') center center / 100% 100% no-repeat;

    .rank {
        justify-self: center;
        font-weight: 700;
        font-size: pxToRem(24, 75);
        text-align: center;
        color: #fbbd81;
    }

    .username {
        @extend .text-ellipsis;
        justify-self: start;
        direction: ltr;
        padding: 0 pxToRem(30, 75);
        max-width: pxToRem(340, 75);
        font-weight: 600;
        font-size: pxToRem(25, 75);
        text-align: center;
    }

    .portrait {
        img {
            display: block;
            padding: 0;
            margin: 0;
            width: pxToRem(86, 75);
            height: pxToRem(86, 75);
            object-fit: contain;
            border-radius: 50%;
            border: pxToRem(2, 75) solid #fff;
        }
    }

    .score {
        @extend .flex-center;
        justify-self: center;
        position: relative;
        font-weight: 600;
        font-size: pxToRem(25, 75);
    }
}
</style>
