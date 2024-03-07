import { ScrollViewProps } from 'react-native';

declare module 'react-native' {
    interface ScrollViewProps {
        headerRefreshing?: boolean;
        onHeaderRefresh?: (() => void) | undefined;
        footerLoading?: boolean;
        onFooterLoad?: (() => void) | undefined;
        recognizeSimultaneously?: boolean;
    }
}