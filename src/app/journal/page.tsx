import JournalComponent from '@/components/Journal/index';
import { Journal } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function Journal() {
  const journalEntries: Journal[] = await baseServerSideFetch('/api/journal');
  return (
    <JournalComponent journalEntries={journalEntries} />
  )
}