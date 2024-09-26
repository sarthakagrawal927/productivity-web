import React from 'react';
import JournalComponent from '@/components/Journal/index';
import FetchDataSSR from '@/components/common/FetchDataSSR';
import { Journal } from '@/types';

export default function JournalPage() {
  return (
    <FetchDataSSR<[Journal[]]>
      fetchUrls={['/api/journal']}
      onSuccess={([journalEntries]) => (
        <JournalComponent journalEntries={journalEntries} />
      )}
    />
  );
}