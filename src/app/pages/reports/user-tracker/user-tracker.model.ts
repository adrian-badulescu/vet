export class user_tracker {
    id: string;
    startDate: Date;
    endDate: Date;
    user: string;
    module: string;
};

export class dataCls {
    result: Array<user_tracker>;
    page_total: number;
    total: number;
}