import { ListProps } from './List';
export declare const List: import("../utils").WithInstall<import("vue").DefineComponent<{
    error: BooleanConstructor;
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    errorText: StringConstructor;
    direction: {
        type: import("vue").PropType<import("./types").ListDirection>;
        default: import("./types").ListDirection;
    };
    loadingText: StringConstructor;
    finishedText: StringConstructor;
    immediateCheck: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("load" | "update:error" | "update:loading")[], "load" | "update:error" | "update:loading", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    error: BooleanConstructor;
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    errorText: StringConstructor;
    direction: {
        type: import("vue").PropType<import("./types").ListDirection>;
        default: import("./types").ListDirection;
    };
    loadingText: StringConstructor;
    finishedText: StringConstructor;
    immediateCheck: {
        type: BooleanConstructor;
        default: true;
    };
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
    "onUpdate:error"?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
}, {
    offset: string | number;
    error: boolean;
    loading: boolean;
    direction: import("./types").ListDirection;
    finished: boolean;
    immediateCheck: boolean;
}>>;
export default List;
export type { ListProps };
export type { ListInstance, ListDirection } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanList: typeof List;
    }
}
