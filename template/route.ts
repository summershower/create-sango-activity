import { type MetaType, authMeta } from '@/routes/MetaModule';

export default [
    // <%= chineseName %>
    {
        path: '/<%= lineName %>',
        name: '<%= projectName %>',
        component: () => import('@pages/<%= projectName %>/index.vue'),
        meta: <MetaType>{
            ...authMeta,
            pageTitle: '<%= projectName %>',
            noBasePath: true,
            t: '<%= projectName %>',
        },
    },<%if (isNeedRoomPlug.toLowerCase() === 'y') { %>
    // <%= chineseName %>房间插件
    {
        path: '/<%= lineName %>/roomPlug',
        name: '<%= projectName %>RoomPlug',
        component: () => import('@pages/<%= projectName %>/roomPlug.vue'),
        meta: <MetaType>{
            ...authMeta,
            pageTitle: '<%= projectName %>',
            noBasePath: true,
            t: '<%= projectName %>',
        },
    },<% } %>
];
