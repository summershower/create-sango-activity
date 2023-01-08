import { onBeforeUnmount, watch, ref } from 'vue';
import { useStore } from './store';

const store = useStore();<%if (isNeedHalfMode.toLowerCase() === 'y') { %>
/**
 *  用于给半屏页面增加滑动关闭手势(用在顶部小白条上)
 * @param headerDom 标题栏DOM元素
 * @param slidingDOM 目标滑动DOM
 * @param closeFn 关闭后的回调函数
 */
export function useTopLineGestureSliding(
    headerDom: HTMLElement | string,
    slidingDOM: HTMLElement | string,
    closeFn: Function
) {
    const header: HTMLElement | null =
        typeof headerDom === 'string' ? document.querySelector(headerDom) : headerDom;
    const container: HTMLElement | null =
        typeof slidingDOM === 'string' ? document.querySelector(slidingDOM) : slidingDOM;
    let touchStartY;
    let defaultTransition;

    if (header && container) {
        defaultTransition = container.style.transition;
        header.addEventListener('touchstart', handleTouchStart);
        header.addEventListener('touchmove', handleTouchMove);
        header.addEventListener('touchend', handleTouchEnd);
    }

    onBeforeUnmount(() => {
        header && header.removeEventListener('touchstart', handleTouchStart);
        header && header.removeEventListener('touchmove', handleTouchMove);
        header && header.removeEventListener('touchend', handleTouchEnd);
    });

    function handleTouchStart(event: TouchEvent) {
        event.stopPropagation();
        container.style.transition = 'none';
        touchStartY = event.targetTouches[0].clientY;
    }
    function handleTouchMove(event: TouchEvent) {
        event.stopPropagation();
        event.preventDefault();
        if (event.targetTouches[0].clientY > touchStartY) {
            container.style.transform = `translateY(${
                (event.targetTouches[0].clientY - touchStartY) / 35
            }rem)`;
        }
    }
    function handleTouchEnd(event: TouchEvent) {
        event.stopPropagation();
        container.style.transition = defaultTransition;
        if (event.changedTouches[0].clientY - touchStartY > 120) {
            container.style.transform = 'translateY(80vh)';
            closeFn();
        } else {
            container.style.transform = '';
        }
    }
}

/**
 *  用于给半屏页面增加滑动关闭手势(用在整个页面，当页面滑动到顶部的时候就往下拉)
 * @param slidingDOM 目标滑动DOM
 * @param closeFn 关闭后的回调函数
 */
export function usePageGestureSliding(slidingDOM: HTMLElement | string, closeFn: Function) {
    const container: HTMLElement | null =
        typeof slidingDOM === 'string' ? document.querySelector(slidingDOM) : slidingDOM;
    let touchStartY;
    let defaultTransition;
    let touchStartScrollY;

    if (container) {
        defaultTransition = container.style.transition;
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchmove', handleTouchMove);
        container.addEventListener('touchend', handleTouchEnd);
    }

    onBeforeUnmount(() => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
    });

    function handleTouchStart(event: TouchEvent) {
        container.style.transition = 'none';
        touchStartY = event.targetTouches[0].clientY;
        touchStartScrollY = container.scrollTop;
    }
    function handleTouchMove(event: TouchEvent) {
        if (event.targetTouches[0].clientY > touchStartY && container.scrollTop === 0) {
            event.preventDefault();
            event.stopPropagation();
            container.style.transform = `translate3d(0, ${
                (event.targetTouches[0].clientY - touchStartY - touchStartScrollY) / 35
            }rem, 0)`;
        }
    }
    function handleTouchEnd(event: TouchEvent) {
        container.style.transition = defaultTransition;
        if (event.changedTouches[0].clientY - touchStartY - touchStartScrollY > 150) {
            container.style.transform = 'translate3d(0, 80vh, 0)';
            closeFn();
        } else {
            container.style.transform = '';
        }
    }
}<% } %>

/**
 *  用于给Vant的Sheet标题栏增加手势滑动隐藏功能
 * @param headerDom 标题栏DOM元素
 * @param sheetDom Vant的Sheet控件DOM
 * @param closeFn 关闭Sheet控件的方法
 */
export function useVantSheetGestureSliding(
    headerDom: HTMLElement | string,
    sheetDom: HTMLElement | string,
    closeFn: Function
) {
    const header: HTMLElement | null =
        typeof headerDom === 'string' ? document.querySelector(headerDom) : headerDom;
    const sheet: HTMLElement | null =
        typeof sheetDom === 'string' ? document.querySelector(sheetDom) : sheetDom;
    let touchStartY;
    let defaultTransition;

    if (header && sheet) {
        defaultTransition = sheet.style.transition;
        header.addEventListener('touchstart', handleTouchStart);
        header.addEventListener('touchmove', handleTouchMove);
        header.addEventListener('touchend', handleTouchEnd);
    }

    onBeforeUnmount(() => {
        header && header.removeEventListener('touchstart', handleTouchStart);
        header && header.removeEventListener('touchmove', handleTouchMove);
        header && header.removeEventListener('touchend', handleTouchEnd);
    });

    function handleTouchStart(event: TouchEvent) {
        event.stopPropagation();
        sheet.style.transition = 'none';
        touchStartY = event.targetTouches[0].clientY;
    }
    function handleTouchMove(event: TouchEvent) {
        event.stopPropagation();
        event.preventDefault();
        if (event.targetTouches[0].clientY > touchStartY) {
            sheet.style.transform = `translateY(${
                (event.targetTouches[0].clientY - touchStartY) / 35
            }rem)`;
        }
    }
    function handleTouchEnd(event: TouchEvent) {
        event.stopPropagation();
        sheet.style.transition = defaultTransition;
        if (event.changedTouches[0].clientY - touchStartY > 120) {
            sheet.style.transform = '';
            closeFn();
        } else {
            sheet.style.transform = '';
        }
    }
}
