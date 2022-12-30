import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale('zh-tw', {
    calendar: {
        sameElse: 'YYYY/MM/DD',
    },
});

export default dayjs;
