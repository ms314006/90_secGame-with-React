import * as React from 'react'
import { render, cleanup } from '@testing-library/react';
import { toBeInTheDocument } from 'jest-dom';
import Main from '../../../src/component/Main';

expect.extend({ toBeInTheDocument, });

describe('<Main />', () => {
  test('測試有沒有正常 render', () => {
    const { getByTestId, } = render(<Main />);
    expect(getByTestId('mainBlock')).toBeInTheDocument();
  });
});
