import SingleHabit from "@/components/Habit/SingleHabit";
import ErrorComponent from "@/components/common/ErrorComponent";
import { HabitWithLogs } from "@/types";
import { baseServerSideFetch } from "@/utils/api";

export default async function Page({ params }: { params: { ID: string } }) {
  const { data: habitWithLogs, err } = await baseServerSideFetch<HabitWithLogs>(`/api/habit/logs/${params.ID}`);
  if (err) {
    return <ErrorComponent message={err.message} />
  }
  const { habit, logs } = habitWithLogs;
  return <SingleHabit habit={habit} logs={logs} />
}