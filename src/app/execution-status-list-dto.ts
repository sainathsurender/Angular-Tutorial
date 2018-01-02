export class ExecutionStatusListDto {
    constructor(
        public FundName	:string,
        public FundCode :string,
        public BatchDate :string,
        public LogStatus :string,
        public DateCreated :string
    ){}
}
