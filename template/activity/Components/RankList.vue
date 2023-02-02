<template>
    <!-- 排行榜 -->
    <div class="rank">
         <van-pull-refresh
             v-model="refreshing"
             @refresh="onRefresh"
             pulling-text=" "
             loosing-text=" "
             loading-text=" "
             success-text=" ">
             <van-list
                 v-model:loading="loading"
                 :finished="finished"
                 finished-text=" "
                 loading-text=" "
                 error-text=" "
                 @load="getData">
                 <rank-item
                     :rank="item?.rank || 0"
                     :username="item?.userInfo?.nickname || ''"
                     :score="item?.score || 0"
                     :portrait="item?.userInfo?.avatarUrl || AVATAR"
                     :user-id="item?.userInfo?.userId || ''"
                     v-for="(item, index) in rankData"
                     :key="item.rank"
                     class="flipAnimation"
                     :style="{
                         animationDelay: `${(index % 20) * 0.03}s`,
                     }" />
             </van-list>
         </van-pull-refresh>
        <!-- 我的排名 -->
        <MyRank
            :rank="myRank?.rank || 0"
            :portrait="myRank?.headImgUrl || ''"
            :score="myRank?.score || 0"
            :user-name="myRank?.nickname || ''"
            :user-id="myRank?.userId || ''"
            />
    </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import AVATAR from '@/assets/images/avatar.png';
    import RankItem from './RankItem.vue';
    import { getRankData } from '../requests';
    import MyRank from './MyRank.vue';

    const props = defineProps();

    const page = ref(1);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const rankData = ref([]);
    const myRank = ref();
    // 获取排行榜内容
    async function getData(isRefresh = false) {
        isRefresh && (rankData.value = []);
        const { rankInfoList = [], myRankInfo = {} } = await getRankData(page.value++);
        myRank.value = myRankInfo;
        rankData.value = rankData.value.concat(rankInfoList);
        loading.value = false;
        if (rankInfoList.length < 20 || page.value === 6) finished.value = true;
        refreshing.value = false;
    }
    // 刷新事件
    function onRefresh() {
        finished.value = false;
        loading.value = true;
        refreshing.value = true;
        page.value = 1;
        getData(true);
    }
</script>
<style lang="scss" scoped>
    @keyframes flip {
        from {
            opacity: 0;
            transform: rotate3d(1, 1, 0, 15deg) translateY(-10px) scale(0.95);
        }

        to {
            opacity: 1;
            transform: rotate3d(0, 0, 0) translateY(0) scale(1);
        }
    }

    .flipAnimation {
        opacity: 0;
        animation: flip 0.3s forwards;
    }
</style>
