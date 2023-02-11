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
    grid-template-columns: 134px 94px 1fr 220px;
    align-items: center;
    width: 100%;
    height: 150px;

    .rank {
        justify-self: center;
        font-weight: 700;
        font-size: 26px;
        text-align: center;
        color: #7b4000;
    }

    .username {
        @extend .text-ellipsis;
        justify-self: start;
        direction: ltr;
        padding: 0 30px;
        max-width: 340px;
        font-weight: 400;
        font-size: 25px;
        text-align: center;
        color: #7b4000;
    }

    .portrait {
        img {
            display: block;
            padding: 0;
            margin: 0;
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 50%;
            border: 2px solid #f2eac3;
        }
    }

    .score {
        @extend .flex-center;
        justify-self: center;
        position: relative;
        font-size: 32px;
    }
}
</style>
