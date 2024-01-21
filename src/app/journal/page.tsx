import JournalComponent from '@/components/Journal/index';
import { Journal } from '@/types';
import { HTTP_METHOD, callApi } from '@/utils/api';

async function getJournals() {
  const { data, err } = await callApi('/api/journal', {}, HTTP_METHOD.GET)
  if (err) throw new Error(err.statusText);
  return data.data
}

export default async function Home() {
  const journalEntries: Journal[] = await getJournals();
  return (
    <JournalComponent journalEntries={journalEntries} />
  )
}