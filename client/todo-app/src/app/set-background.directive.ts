import {Directive, DoCheck, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[setBackground]'
})
export class SetBackgroundDirective implements OnInit, OnChanges, DoCheck {
  @Input() setBackground: any = 'blue';
  constructor(private host: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    //this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  }

  ngOnChanges(changes: SimpleChanges) {
    //this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  }

  ngDoCheck() {
    this.renderer.setStyle(this.host.nativeElement, 'background-color', this.setBackground);
  }
}
