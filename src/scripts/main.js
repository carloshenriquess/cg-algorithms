import { navigationFactory, setupViews } from './setup.js';

const navigate = navigationFactory();
const params = new URLSearchParams(window.location.search);
const paramItem = params.get('item');
navigate.to(paramItem || 'dda');
setupViews();
