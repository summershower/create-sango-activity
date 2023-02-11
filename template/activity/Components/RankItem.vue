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
        reportEvent('<%= chineseName %>', '点击用户头像', `打开${props.userId}的个人主页`);
    }
}
</script>
<style lang="scss" scoped>
.rank-item {
    position: relative;
    display: grid;
    grid-template-columns: 131px 88px 1fr 200px;
    align-items: center;
    margin: 13.5px auto 0;
    width: 693px;
    height: 108px;
    color: #fbbd81;
    background: url('@/assets/images/octoberGifts/rank.png') center center / 100% 100% no-repeat;

    .rank {
        justify-self: center;
        font-weight: 700;
        font-size: 24px;
        text-align: center;
        color: #fbbd81;
    }

    .username {
        @extend .text-ellipsis;
        justify-self: start;
        direction: ltr;
        padding: 0 30px;
        max-width: 340px;
        font-weight: 600;
        font-size: 25px;
        text-align: center;
    }

    .portrait {
        img {
            display: block;
            padding: 0;
            margin: 0;
            width: 86px;
            height: 86px;
            object-fit: contain;
            border-radius: 50%;
            border: 2px solid #fff;
        }
    }

    .score {
        @extend .flex-center;
        justify-self: center;
        position: relative;
        font-weight: 600;
        font-size: 25px;
    }
}
</style>
