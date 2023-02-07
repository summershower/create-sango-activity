import { type MetaType, authMeta } from '@/routes/MetaModule';

export default [
    // <%= chineseName %>
    {
        path: '/<%= lineName %>',
        name: '<%= projectName %>',
        component: () => import('@pages/<%= id %>/index.vue'),
        meta: <MetaType>{
            ...authMeta,
            pageTitle: '<%= projectName %>',
            noBasePath: true,
            t: '<%= projectName %>',
            requireAuth: false,
        },
    },<%if (isNeedRoomPlug.toLowerCase() === 'y') { %>
    // <%= chineseName %>房间插件
    {
        path: '/<%= lineName %>/roomPlug',
        name: '<%= projectName %>RoomPlug',
        component: () => import('@pages/<%= id %>/roomPlug.vue'),
        meta: <MetaType>{
            ...authMeta,
            pageTitle: '<%= projectName %>',
            noBasePath: true,
            t: '<%= projectName %>',
        },
    },<% } %><%if (isNeedLandingPage.toLowerCase() === 'y') { %>
        // <%= chineseName %>分享落地页
        {
            path: '/<%= lineName %>/landingPage',
            name: '<%= projectName %>LandingPage',
            component: () => import('@pages/<%= id %>/landingPage.vue'),
            meta: <MetaType>{
                ...authMeta,
                pageTitle: '<%= projectName %>',
                noBasePath: true,
                t: '<%= projectName %>',
                requireAuth: false,
            },
        },<% } %>
];
