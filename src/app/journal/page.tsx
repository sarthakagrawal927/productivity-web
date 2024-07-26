import JournalComponent from '@/components/Journal/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { Journal } from '@/types';
import { baseServerSideFetch } from '@/utils/ssr';

export default async function JournalPage() {
  const { data: journalEntries, err } = await baseServerSideFetch<Journal[]>('/api/journal');
  if (err || !journalEntries) {
    return <ErrorComponent message={err.message} />
  }
  return (
    <JournalComponent journalEntries={journalEntries} />
  )
}