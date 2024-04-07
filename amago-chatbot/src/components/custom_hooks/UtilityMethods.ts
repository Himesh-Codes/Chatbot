export function differenceInSeconds(inputDateStr: string): number {
        const inputDate: Date = new Date(inputDateStr);
        const currentDate: Date = new Date();
        const diffMilliseconds = Math.abs(inputDate.getTime() - currentDate.getTime());
        return Math.floor(diffMilliseconds / 1000);
    }


export function intersection<T>(array1: T[], array2: T[]): T[] {
    return array1.filter(value => array2.includes(value));
}