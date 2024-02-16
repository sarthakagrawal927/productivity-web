import SingleHabit from "@/components/Habit/SingleHabit";
import { HabitWithLogs } from "@/types";
import { baseServerSideFetch } from "@/utils/api";

export default async function Page({ params }: { params: { ID: string } }) {
  const habitWithLogs: HabitWithLogs = await baseServerSideFetch(`/api/habit/logs/${params.ID}`);
  const { habit, logs } = habitWithLogs;
  return <SingleHabit habit={habit} logs={logs} />
}