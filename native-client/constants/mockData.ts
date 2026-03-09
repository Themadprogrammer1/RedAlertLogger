import { AlertData } from "@/interfaces/alert";

// Fake Database for the UI typed with the interface
export const FAKE_ALERTS: AlertData[] = [
    {
        id: '1',
        date: '09/03/2026',
        time: '14:32',
        location: 'Petah Tikva',
        type: 'ירי טילים ורקטות',
    },
    { id: '2', date: '09/03/2026', time: '14:30', location: 'Tel Aviv', type: 'ירי טילים ורקטות' },
    { id: '3', date: '09/03/2026', time: '12:15', location: 'Sderot', type: 'חדירת כלי טיס עוין' },
];
