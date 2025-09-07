'use client';

import { Checkbox } from '@/components/UI/Checkbox/Checkbox';
import { Datalist } from '@/components/UI/Datalist/Datalist';
import { Input } from '@/components/UI/Input/Input';
import { Radio } from '@/components/UI/Radio/Radio.tsx';
import { Select } from '@/components/UI/Select/Select';
import { useState, type ReactNode } from 'react';
import style from './TestPage.module.scss';

export default function TestPage(): ReactNode {
  const [passValue, setPassValue] = useState('');

  return (
    <div className={style.wrapper}>
      <b>Password Input example</b>
      <Input
        type='password'
        value={passValue}
        onChange={e => {
          setPassValue(e.target.value);
        }}
        label='Passwordssssssssssssssssssssssssssssssssssssssssssssssssssss'
        error='Invalid password'
      />

      <Datalist
        options={['aa', 'bb', 'cc']}
        listId='some-id'
        label='Fruits:'
        labelPosition='left'
      />

      <Checkbox label='blaa' />
      <Select
        labelValuePairs={{ 'Choose sss': 'value', label1: 'value1' }}
        label='ssss'
        labelPosition='left'
      />
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
        <Radio label='onessssssssssssssssssssssssss' name='count' />
        <Radio label='twoddddddddddddddddddddddddddddddddddddddddddd' name='count' />
      </div>
    </div>
  );
}
