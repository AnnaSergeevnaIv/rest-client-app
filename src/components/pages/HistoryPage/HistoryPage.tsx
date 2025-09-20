/* eslint-disable max-len */
'use client';

import { useAuth } from '@/components/ProvidersWrapper/AuthProvider/AuthContext.tsx';
import { Button } from '@/components/UI/Button/Button.tsx';
import { Input } from '@/components/UI/Input/Input.tsx';
import '@/services/firebase/admin/request-history/actions';
import { addRequestHistoryEntry } from '@/services/firebase/admin/request-history/add-entry.ts';
import { useRequestHistoryQuery } from '@/services/firebase/admin/request-history/useRequestHistoryQuery';
import { historyEntryMock } from '@/services/firebase/admin/request-history/utils.ts';
import { useState, type ReactNode } from 'react';

export default function HistoryPage(): ReactNode {
  const [value, setValue] = useState('');
  const { currentUser } = useAuth();
  const { deleteEntry, queryEntries } = useRequestHistoryQuery({ currentUser });

  return (
    <section>
      <h1>Request history</h1>
      <p>Saved queries are stored here.</p>
      <Button
        label='Add entry'
        onClick={() => {
          void addRequestHistoryEntry(currentUser, historyEntryMock).then(console.debug);
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
