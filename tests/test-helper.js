import resolver from './helpers/resolver';
import { setResolver } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setResolver(resolver);
start();
