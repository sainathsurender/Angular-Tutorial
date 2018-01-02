import { FilesListDto } from './files-list-dto';

export class Step1ListDTO {
    constructor(
        public ExtractedFiles ?:Array<FilesListDto>,
        public CDMSFiles ?:Array<FilesListDto>,
    ){}
}