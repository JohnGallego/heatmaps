import {
  Component, Input, Output,
  EventEmitter, ViewChild, ElementRef
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() accept: string;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  file: File;

  constructor() { }

  nativeInputFileSelect($event): void {
    if ($event.srcElement.files[0]) {
      this.file = $event.srcElement.files[0];
      this.fileSelected.emit(this.file);
    }
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

}
