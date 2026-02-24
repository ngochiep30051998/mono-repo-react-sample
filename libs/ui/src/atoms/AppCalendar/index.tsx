import type { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';

export default function AppCalendar(props: CalendarProps<Dayjs>) {
  return <Calendar {...props} />;
}
