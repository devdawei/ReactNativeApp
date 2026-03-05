import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  post(name: string, body: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeNotify',
) as Spec;
