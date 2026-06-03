import {PageRoute} from 'enums/navigation/PageRoute';
import {EnumMap} from 'libs/EnumMap';

// 主要內容頁（包在 AppContainer 下）
export const pageRouteMap = new EnumMap(PageRoute, {
    QUESTION_DETAIL: {
        path: 'q/:questionId',
        component: () => import('components/pages/question/QuestionDetail.vue'),
        meta: {title: '送命題'},
    },
});

// 錯誤頁
export const errorPageRouteMap = new EnumMap(PageRoute, {
    NOT_FOUND: {
        path: '404',
        component: () => import('components/pages/error/NotFound.vue'),
        meta: {title: '404'},
    },
});
