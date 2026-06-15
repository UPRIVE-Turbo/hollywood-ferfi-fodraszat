import * as migration_20260615_090553_initial from './20260615_090553_initial';

export const migrations = [
  {
    up: migration_20260615_090553_initial.up,
    down: migration_20260615_090553_initial.down,
    name: '20260615_090553_initial'
  },
];
