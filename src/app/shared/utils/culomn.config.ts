
export interface TableColumnConfig {
    id?: string;
    defKey?: string;
    title?: string

    headerInput?: {
        type?: 'drop-down' | 'search' | 'date-range' | 'date';
        placeHolder?: string;
        getList?: any[];
        loading?: boolean;
    }
    isSortable?: boolean;
    sortingParam?: string;
    sortOrder?: 'none' | 'asc' | 'desc';
    sequence: number;
    getData: any;
    onClick?: boolean;

    inlineEditValidation?: {
        required?: boolean;
        minValue?: number;
        maxValue?: number;
    }
}
