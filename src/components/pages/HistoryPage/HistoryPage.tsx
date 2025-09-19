'use client';

import { Button } from '@/components/UI/Button/Button.tsx';
import { Input } from '@/components/UI/Input/Input.tsx';
import '@/services/firebase/admin/request-history/actions';
import { useRequestHistory } from '@/services/firebase/admin/request-history/useRequestHistory.ts';
import { historyEntryMock } from '@/services/firebase/admin/request-history/utils.ts';
import { useState, type ReactNode } from 'react';

export default function SignupPage(): ReactNode {
  const [value, setValue] = useState('');
  const { addEntry, deleteEntry, queryEntries } = useRequestHistory();

  return (
    <section>
      <h1>Request history</h1>
      <p>Saved queries are stored here.</p>
      <Button
        label='Add entry'
        onClick={() => {
          void addEntry(historyEntryMock).then(console.debug);
        }}
      />
      <Button
        label='Get ALL'
        onClick={() => {
          void queryEntries().then(console.debug);
        }}
      />
      <Button
        label='Delete entry'
        onClick={() => {
          void deleteEntry(value).then(console.debug);
        }}
      />
      <Input
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
    </section>
  );
}
