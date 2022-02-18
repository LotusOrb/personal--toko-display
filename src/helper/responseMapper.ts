interface IResponseMapper<T> {
    validation:any
    payload: {
        data: Array<T> | T,
        meta: {
            pagination: {
                page: number
                limit: number
            },
            sort: {
                by: "ASC" | "DESC",
                name: keyof T
            }
            filter: {[i:string]:string}
        }
    },
    message?: string
}


export const responseMapper = <T>(param: IResponseMapper<T>): any => {

}