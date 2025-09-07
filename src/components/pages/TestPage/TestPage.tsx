'use client';

import { IconDownload } from '@/common/constants/icons.ts';
import { Button } from '@/components/UI/Button/Button.tsx';
import { Checkbox } from '@/components/UI/Checkbox/Checkbox';
import { Datalist } from '@/components/UI/Datalist/Datalist';
import { Input } from '@/components/UI/Input/Input';
import { Radio } from '@/components/UI/Radio/Radio.tsx';
import { Select } from '@/components/UI/Select/Select';
import { useState, type ReactNode } from 'react';
import style from './TestPage.module.scss';

export default function TestPage(): ReactNode {
  const [name, setName] = useState('');

  return (
    <div className={style.wrapper}>
      {/* Text */}
      <div>
        <h2>Text Input example</h2>
        <label className={style.label}>
          name
          <Input
            error='Some error message'
            placeholder='input name...'
            value={name}
            onChange={setName}
          />
        </label>
      </div>
      {/* Password */}
      <div>
        <h2>Password Input example</h2>
        <label className={style.label}>
          password
          <Input type='password' error='Invalid password' placeholder='input password...' />
        </label>
      </div>
      {/* Datalist */}
      <div>
        <h2>Datalist Input example</h2>
        <label className={style.label}>
          fruits
          <Datalist
            items={['apple', 'banana', 'orange', 'grape']}
            listId='some-id'
            placeholder='choose fruit...'
          />
        </label>
      </div>
      {/* Select */}
      <div>
        <h2>Select example</h2>
        <label className={style.label}>
          numbers
          <Select
            labelValuePairs={{ 'Choose number': 'none', one: 1, two: 2, three: 3 }}
            onChange={v => {
              console.log('selected value:', v);
            }}
          />
        </label>
      </div>
      {/* Button */}
      <div>
        <h2>Button example</h2>
        <Button label='Download'>
          <IconDownload size={16} />
        </Button>
      </div>
      {/* Other */}
      <h2>Other examples</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <Checkbox label='One' />
        <Checkbox label='Two' />
        <Checkbox label='Three' />
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <Radio label='one' name='numbers' />
        <Radio label='two' name='numbers' />
        <Radio label='three' name='numbers' />
      </div>
    </div>
  );
}
