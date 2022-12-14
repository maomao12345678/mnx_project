import { type ExtractPropTypes } from 'vue';
import type { ListDirection } from './types';
declare const listProps: {
    error: BooleanConstructor;
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    errorText: StringConstructor;
    direction: {
        type: import("vue").PropType<ListDirection>;
        default: ListDirection;
    };
    loadingText: StringConstructor;
    finishedText: StringConstructor;
    immediateCheck: {
        type: BooleanConstructor;
        default: true;
    };
};
export declare type ListProps = ExtractPropTypes<typeof listProps>;
declare const _default: import("vue").DefineComponent<{
    error: BooleanConstructor;
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    errorText: StringConstructor;
    direction: {
        type: import("vue").PropType<ListDirection>;
        default: ListDirection;
    };
    loadingText: StringConstructor;
    finishedText: StringConstructor;
    immediateCheck: {
        type: BooleanConstructor;
        default: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("load" | "update:error" | "update:loading")[], "load" | "update:error" | "update:loading", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    error: BooleanConstructor;
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    loading: BooleanConstructor;
    finished: BooleanConstructor;
    errorText: StringConstructor;
    direction: {
        type: import("vue").PropType<ListDirection>;
        default: ListDirection;
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
    direction: ListDirection;
    finished: boolean;
    immediateCheck: boolean;
}>;
export default _default;
