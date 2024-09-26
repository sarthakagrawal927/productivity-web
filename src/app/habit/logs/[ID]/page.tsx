import React from 'react';
import SingleHabit from "@/components/Habit/SingleHabit";
import ErrorComponent from "@/components/common/ErrorComponent";
import FetchDataSSR from "@/components/common/FetchDataSSR";
import { HabitWithLogs } from "@/types";

export default function Page({ params }: { params: { ID: string } }) {
  return (
    <FetchDataSSR<[HabitWithLogs]>
      fetchUrls={[`/api/habit/logs/${params.ID}`]}
      onSuccess={(habitWithLogs) => {
        const [{ habit, logs }] = habitWithLogs;
        return <SingleHabit habit={habit} logs={logs} />;
      }}
    />
  );
}