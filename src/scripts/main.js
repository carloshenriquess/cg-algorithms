import { navigationFactory, setupViews } from './setup.js';

const navigate = navigationFactory();
navigate.to('circle');
setupViews();
