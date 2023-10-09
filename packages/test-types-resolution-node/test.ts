import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { expectTypeOf } from 'expect-type'

setup(QUnit.assert);

expectTypeOf(QUnit.assert.dom).parameter(0).toEqualTypeOf<string | Element | null | undefined>();
// @ts-expect-error - there is only one parameter
expectTypeOf(QUnit.assert.dom).parameter(1).toEqualTypeOf<never>();

