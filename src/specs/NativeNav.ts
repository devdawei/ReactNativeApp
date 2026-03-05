import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  open(
    pageName: string,
    fromPageID: string | undefined,
    mode: number | undefined,
    params?: { [key: string]: unknown } | undefined
  ): void;
  close(pageID: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeNav',
) as Spec;
