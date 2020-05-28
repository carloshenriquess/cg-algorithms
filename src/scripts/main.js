import { navigationFactory, setupViews } from './setup.js';

const navigation = navigationFactory();
navigation.to('bresenham');
setupViews();
