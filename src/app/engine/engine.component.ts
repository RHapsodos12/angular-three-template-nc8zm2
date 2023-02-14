import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EngineService } from './engine.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html'
})
export class EngineComponent implements OnInit {
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas: ElementRef<HTMLCanvasElement>;
  public frames = 0;
  public disabled = false;

  public constructor(private engServ: EngineService) { }

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }

  public refresh() {
    this.disabled = true;
    this.engServ.render();
    this.frames++;
  }
  public destroy() {
    this.engServ.ngOnDestroy();
    this.engServ.render();
  }
  public remove() {
    if (this.frames > 0) {
      this.engServ.ngOnDestroy();
      this.frames--;
    }
    if (this.frames === 0) this.disabled = false;
  }
}